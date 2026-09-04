#!/usr/bin/env node
/**
 * PreToolUse 후크 — git commit / git push / push-changes.bat 앞에서 게이트를 강제한다.
 *
 * 예전에는 push-changes.bat 만 봤다. git push 를 직접 치면 한 번도 안 돌았고,
 * 그 사이 검토 안 된 글 28편이 그대로 올라갔다. 이제 commit·push 도 잡는다.
 * 또 예전 훅은 셸 파이프(| tail)를 써서 이 환경(cmd.exe 없음)에선 아예 실행이 안 됐다.
 * 셸을 거치지 않고 node / git 을 바로 실행한다.
 *
 * 무엇을 돌리나
 *   1. 이번 commit/push 에 글이 들어 있으면 → node scripts/gate.mjs <hub>
 *      (사실 · 제목-소제목 · 계획 대조 · 죽은 링크 · 빵부스러기 · 독자 검토)
 *      글이 안 들어 있으면(스크립트·설정만) 글 게이트는 건너뛴다. 우회 플래그가 아니라
 *      "무엇이 바뀌었나" 로 정한다. git 이 답하니 속일 수 없다.
 *   2. verify-3way --all --no-gov  (계산기 369건) 는 항상.
 * 하나라도 FAIL 이면 exit 2 → 명령 자체가 막힌다. Claude 가 잊어도, 몰라도 못 넘어간다.
 *
 * 허브 목록은 scripts/title-system/titles.*-v2.json 에서 자동으로 찾는다. 새 주제를 만들면 저절로 들어간다.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const raw = fs.readFileSync(0, 'utf-8');
let input;
try { input = JSON.parse(raw); } catch { process.exit(0); }

// 히어독(<<'MSG' … MSG) 본문은 커밋 메시지다. 거기 적힌 "commit -a" 같은 글귀를 플래그로 읽으면 안 된다.
// 명령줄만 남기고 본문은 지운 뒤 검사한다.
const rawCmd = input.tool_input?.command || '';
const cmd = rawCmd.replace(/<<-?\s*(['"]?)(\w+)\1[\s\S]*?\n\s*\2\s*(?=\n|$)/g, ' ');
const isCommit = /(^|[\s;&|])git\s+commit\b/.test(cmd);
const isPush = /(^|[\s;&|])git\s+push\b|push-changes\.bat/.test(cmd);
if (!isCommit && !isPush) process.exit(0);

// cwd 가 Git Bash 식(/c/Users/...)으로 오면 spawnSync 가 ENOENT 를 낸다. Windows 경로로 바꾸고, 없으면 현재 디렉터리
const normCwd = (c) => {
  if (!c) return process.cwd();
  const m = c.match(/^\/([a-zA-Z])\/(.*)$/);
  const w = m ? `${m[1].toUpperCase()}:/${m[2]}` : c;
  return fs.existsSync(w) ? w : process.cwd();
};
const cwd = normCwd(input.cwd);
const exec = (file, args, ms) => execFileSync(file, args, { cwd, encoding: 'utf-8', timeout: ms, stdio: ['ignore', 'pipe', 'pipe'] });
const tail = (s, n) => String(s ?? '').trim().split('\n').slice(-n).join('\n');
const block = (title, detail) => { process.stderr.write(`[BLOCKED] ${title}\n${detail}\n`); process.exit(2); };

// 이번에 나가는 파일 목록. commit 이면 staged, push 면 origin 과의 차이
let changed = [];
try {
  changed = isPush
    ? exec('git', ['diff', '--name-only', 'origin/main..HEAD'], 20000).split('\n')
    : exec('git', ['diff', '--cached', '--name-only'], 20000).split('\n');
  // -a / --all 은 git commit 명령줄에 붙은 것만 본다 (같은 줄, 다른 명령으로 넘어가기 전까지)
  if (isCommit && /\bgit\s+commit\b[^\n;&|]*\s(-a\b|--all\b)/.test(cmd)) changed = changed.concat(exec('git', ['diff', '--name-only'], 20000).split('\n'));
  // `git add .` 이나 `git add -A` 처럼 전체를 올릴 때만 작업 트리를 센다.
  // `.gitignore` 같은 점으로 시작하는 파일명이 `git add .` 로 오인되지 않게 점이 단독 인수인 경우로 한정한다.
  if (isCommit && /\bgit\s+add\s+(-A\b|\.(?=\s|$))/.test(cmd)) changed = changed.concat(exec('git', ['status', '--porcelain'], 20000).split('\n').map((l) => l.slice(3)));
} catch { /* origin 이 없거나 첫 커밋이면 전부 검사한다 */ changed = ['app/']; }
changed = changed.map((x) => x.trim()).filter(Boolean);

// 글에 해당하는 경로. 여기가 바뀌면 글 게이트를 돈다
const CONTENT = /^(scripts\/article-template\/(articles|brief|evidence)\/|scripts\/title-system\/titles\.|app\/|moneydoc-data\/articles\/|public\/_preview\/)/;
const contentTouched = changed.some((f) => CONTENT.test(f));

// 1. 글 게이트 (글이 바뀐 경우에만)
const planDir = path.join(cwd, 'scripts/title-system');
const hubs = fs.existsSync(planDir)
  ? fs.readdirSync(planDir).map((f) => f.match(/^titles\.(.+)-v2\.json$/)?.[1]).filter(Boolean)
  : [];
if (contentTouched) {
  for (const hub of hubs) {
    try {
      exec(process.execPath, ['scripts/gate.mjs', hub, '--quick'], 120000);
    } catch (e) {
      block(`gate.mjs ${hub} FAIL — 글이 바뀐 commit/push 는 게이트를 통과해야 한다`,
        tail((e.stdout || '') + (e.stderr || ''), 25));
    }
  }
}

// 2. 계산기 전수 (항상)
try {
  // 'node' 는 훅 프로세스의 PATH 에 없을 수 있다. 지금 이 훅을 돌리는 node 를 그대로 쓴다
  const out = exec(process.execPath, ['scripts/verify-system/verify-3way.mjs', '--all', '--no-gov'], 180000);
  if (!/0 fail/.test(out)) block('verify-3way FAIL', tail(out, 5));
} catch (e) {
  block('verify-3way 실행 실패', tail((e.stdout || '') + (e.stderr || '') + (e.message || ''), 8));
}

process.stdout.write(`[allowed] ${contentTouched ? `gate PASS (${hubs.join(', ')})` : '글 변경 없음, 글 게이트 생략'} · verify-3way PASS\n`);
