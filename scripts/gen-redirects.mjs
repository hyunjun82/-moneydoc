#!/usr/bin/env node
/**
 * 옛 주소 → 새 주소 301 넘김을 public/_redirects 에 채운다.
 *
 *   node scripts/gen-redirects.mjs [--check | --dup]
 *
 * 왜 필요한가 (2026-09-07).
 *   convert-v2 는 url-map.json 에 등록되기 전의 글을 /{cat}/{slug}/ 로 냈다.
 *   등록 뒤에는 /{hub}/{spoke}/ 로 옮겨 가는데, 옛 주소를 그냥 지우면 색인과 백링크가 죽는다.
 *   실제로 스포크 48개 중 43개가 _redirects 에 없었다.
 *
 *   그리고 파일 끝에 포괄 규칙 `/government/*  /gov/:splat` 이 있다.
 *   Cloudflare 는 먼저 맞는 규칙을 쓰므로, 개별 넘김은 반드시 그 앞에 넣어야 한다.
 *   안 그러면 옛 주소가 /gov/... 라는 또 다른 없는 페이지로 넘어간다.
 *
 * 손으로 적은 줄은 건드리지 않는다. 빠진 줄만 표시 구간 안에 채운다.
 *
 * 같은 옛 주소는 한 줄만 (2026-09-15).
 *   손으로 적은 줄과 이 스크립트가 채운 줄에 /law/certified-mail-guide/ 등 5개가 똑같이 들어가
 *   Cloudflare 배포 로그에 "Ignoring duplicate rule" 이 찍혔다. 이 스크립트가 손으로 적은 줄을 안 봤기 때문이다.
 *   이제 손으로 적은 주소는 채우지 않고, 파일에 같은 옛 주소가 둘 이상이면 FAIL 로 멈춘다.
 *   --dup 은 중복만 본다(파일을 쓰지 않는다). hook-push-guard 가 커밋·푸시 때 부른다.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const FILE = path.join(ROOT, 'public/_redirects');
const BEGIN = '# --- 스포크 옛 주소 (gen-redirects.mjs 가 채운다. 손대지 말 것) ---';
const END = '# --- 스포크 옛 주소 끝 ---';
const check = process.argv.includes('--check');
const dupOnly = process.argv.includes('--dup');

/** 규칙 줄의 옛 주소(첫 칸)만 뽑는다. 주석과 빈 줄은 뺀다 */
const sourcesOf = (text) => text.split('\n').map((l) => l.trim()).filter((l) => l.startsWith('/')).map((l) => l.split(/\s+/)[0]);

/** 같은 옛 주소가 둘 이상이면 뒤의 줄은 Cloudflare 가 무시한다. 쌓이기 전에 막는다 */
function failOnDuplicates(text) {
  const seen = new Map();
  for (const from of sourcesOf(text)) seen.set(from, (seen.get(from) ?? 0) + 1);
  const dup = [...seen].filter(([, n]) => n > 1);
  if (!dup.length) return;
  console.log(`FAIL 같은 옛 주소가 두 번 이상 있다 ${dup.length}개. 손으로 적은 줄에서 하나만 남겨라`);
  for (const [from, n] of dup) console.log(`  ${from} × ${n}`);
  process.exit(1);
}

const before = fs.readFileSync(FILE, 'utf8').replace(/\r\n/g, '\n');
if (dupOnly) {
  failOnDuplicates(before);
  console.log(`PASS 옛 주소 ${sourcesOf(before).length}줄 중복 0`);
  process.exit(0);
}

const map = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/url-map.json'), 'utf8'));
const spokes = map['_계산기없는허브'] ?? {};

/**
 * 표시 구간(BEGIN 부터 END 줄까지)을 insert 로 바꾼다. 구간이 없으면 null.
 * 정규식으로 찾으면 안 된다. BEGIN 의 괄호와 점이 메타문자라 한 번도 맞지 않았고,
 * 그래서 옛 코드는 구간을 새로 쓰지 못했고 --check 는 늘 PASS 였다 (2026-09-15 발견).
 */
function replaceBlock(text, insert) {
  const i = text.indexOf(BEGIN);
  const j = i < 0 ? -1 : text.indexOf(END, i);
  if (j < 0) return null;
  let k = j + END.length;
  if (text[k] === String.fromCharCode(10)) k++;
  return text.slice(0, i) + insert + text.slice(k);
}
// 표시 구간 밖, 곧 손으로 적은 줄의 옛 주소. 이 주소는 채우지 않는다
const manual = new Set(sourcesOf(replaceBlock(before, '') ?? before));

// `government/unemployment-merge-periods-guide` -> `unemployment/merge-periods`
const lines = [];
let skipped = 0;
for (const [oldKey, route] of Object.entries(spokes)) {
  const target = `/${route}/`;
  const withGuide = `/${oldKey}/`;                      // /government/unemployment-merge-periods-guide/
  const noGuide = `/${oldKey.replace(/-guide$/, '')}/`; // /government/unemployment-merge-periods/
  for (const from of new Set([withGuide, noGuide])) {
    if (from === target) continue;
    if (manual.has(from)) { skipped++; continue; }
    lines.push(`${from.padEnd(56)}${target}  301`);
  }
}
lines.sort();

let src = before;
const block = `${BEGIN}\n${lines.join('\n')}\n${END}\n`;

const replaced = replaceBlock(src, block);
if (replaced !== null) {
  src = replaced;
} else {
  // 포괄 규칙(/government/*) 앞에 넣는다. 없으면 파일 끝에.
  const anchor = src.indexOf('# 카테고리 이름 변경');
  src = anchor > 0 ? src.slice(0, anchor) + block + '\n' + src.slice(anchor) : `${src.trimEnd()}\n\n${block}`;
}

failOnDuplicates(src);

if (check) {
  console.log(before === src ? `PASS 넘김 ${lines.length}줄 최신 · 중복 0` : `FAIL 넘김이 낡았다 (${lines.length}줄 필요). node scripts/gen-redirects.mjs 로 갱신해라`);
  process.exit(before === src ? 0 : 1);
}
fs.writeFileSync(FILE, src, 'utf8');
console.log(`스포크 옛 주소 ${lines.length}줄 기록${skipped ? ` (손으로 적은 ${skipped}줄은 건너뜀)` : ''} · 중복 0 · ${path.relative(ROOT, FILE)}`);
