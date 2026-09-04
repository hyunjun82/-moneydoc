// 훅 셀프테스트: 우회 8경로는 BLOCKED, 정상 5경로는 allowed 여야 한다.  node scripts/selftest/hook.mjs → 13/13
// hook-push-guard.mjs 를 고쳤으면 반드시 돌린다.
// 명령줄에 git 단어가 들어가면 실제 훅이 이 테스트를 막으므로 파일로 둔다.
//
// 저장소가 깨끗하면 "막혀야 함" 쪽이 통과해 버린다(막을 글이 없으니 훅은 맞게 동작한 것).
// 그래서 테스트가 **스스로** 게이트 실패 상황을 만든다. 계획서에서 검토 기록 하나를 잠시 지우고,
// 끝나면 반드시 되돌린다(finally). 저장소 상태에 기대는 테스트는 테스트가 아니다.
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';

const PLAN = 'scripts/title-system/titles.unemployment-v2.json';
const planOrig = fs.readFileSync(PLAN, 'utf8');
// 검토 기록 하나를 지워 게이트가 반드시 FAIL 하는 상태를 만든다
{
  const d = JSON.parse(planOrig);
  let hit = null;
  (function w(o) { if (Array.isArray(o)) o.forEach(w); else if (o && typeof o === 'object') { if (o.slug === 'waiting') hit = o; else Object.values(o).forEach(w); } })(d);
  if (!hit) { console.error('계획서에 waiting 이 없다'); process.exit(1); }
  delete hit.review;
  fs.writeFileSync(PLAN, JSON.stringify(d, null, 2) + String.fromCharCode(10));
}
// 훅은 "지금 무엇이 바뀌었나" 로 판단한다. 그래서 테스트가 쓸 파일도 스스로 더럽힌다.
// (저장소가 깨끗하면 "막혀야 함" 경로가 통과해 버리는데, 그건 훅이 맞게 동작한 것이지 통과가 아니다)
const DIRTY = ['scripts/article-template/articles/unemployment-days-guide.mjs', 'app/unemployment/waiting/page.tsx'];
const dirtyOrig = DIRTY.map((f) => [f, fs.readFileSync(f, 'utf8')]);
for (const [f, t] of dirtyOrig) fs.writeFileSync(f, t + '// selftest' + String.fromCharCode(10));
const restore = () => { fs.writeFileSync(PLAN, planOrig); for (const [f, t] of dirtyOrig) fs.writeFileSync(f, t); };
process.on('exit', restore);
process.on('SIGINT', () => { restore(); process.exit(1); });
const G = 'git';
let ok = 0, n = 0;
const t = (want, name, cmd, tool) => {
  n++;
  const r = spawnSync(process.execPath, ['scripts/hook-push-guard.mjs'], { input: JSON.stringify({ tool_name: tool || 'Bash', tool_input: { command: cmd }, cwd: process.cwd() }), encoding: 'utf8' });
  const got = r.status === 2 ? 'BLOCKED' : 'allowed';
  if (got === want) ok++;
  console.log((got === want ? '✓' : '✗'), got.padEnd(7), '|', name, '|', (r.stderr || r.stdout).trim().split('\n')[0].slice(0, 70));
};
console.log('--- 막혀야 함 ---');
t('BLOCKED', 'add 글파일 && commit', `${G} add scripts/article-template/articles/unemployment-days-guide.mjs && ${G} commit -m x`);
t('BLOCKED', 'add 글폴더/ && commit', `${G} add scripts/article-template/articles/ && ${G} commit -m x`);
t('BLOCKED', 'commit 경로 직접', `${G} commit -m x scripts/article-template/articles/unemployment-days-guide.mjs`);
t('BLOCKED', 'add app && commit', `${G} add app && ${G} commit -m x`);
t('BLOCKED', 'push-changes.bat', 'cmd /c push-changes.bat');
t('BLOCKED', 'PowerShell 도구 commit -a', `${G} commit -a -m x`, 'PowerShell');
t('BLOCKED', 'add . && commit', `${G} add . && ${G} commit -m x`);
t('BLOCKED', 'add 계획서 && commit', `${G} add scripts/title-system/titles.unemployment-v2.json && ${G} commit -m x`);
console.log('--- 통과해야 함 ---');
t('allowed', '시스템 파일만 add && commit', `${G} add scripts/hook-push-guard.mjs scripts/gate.mjs CLAUDE.md && ${G} commit -m x`);
t('allowed', '스테이지 없음 commit', `${G} commit -m x`);
t('allowed', '히어독 안에 -a 글귀', `${G} commit -q -F - <<'MSG'\ncommit -a 를 막는다\nMSG`);
t('allowed', '.gitignore add', `${G} add .gitignore && ${G} commit -m x`);
t('allowed', 'push (origin 과 차이 없음)', `${G} push origin main`);
console.log(`\n${ok}/${n}`);
