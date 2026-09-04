// 훅 셀프테스트: 우회 8경로는 BLOCKED, 정상 5경로는 allowed 여야 한다.  node scripts/selftest/hook.mjs → 13/13
// 검토 안 된 글이 작업 트리에 하나도 없으면 "막혀야 함" 쪽은 allowed 가 나온다 (막을 글이 없으니 정상). 그땐 글 하나의 review 를 잠시 지우고 돌린다.
// hook-push-guard.mjs 를 고쳤으면 반드시 돌린다. 명령줄에 git 단어가 들어가면 실제 훅이 테스트를 막으므로 파일로 둔다.
import { spawnSync } from 'node:child_process';
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
