// 게이트 셀프테스트: 검토가 끝난 글(round-4)의 계획서를 고의로 8가지로 망가뜨리고 gate 가 전부 잡는지 본다. 끝나면 원본 복구.
//   node scripts/selftest/gate.mjs        → "검출 8/8 · 원본 복구: true" 여야 한다
// gate.mjs 를 고쳤으면 반드시 돌린다. 기준 글이 바뀌면 아래 slug 와 문장을 맞춘다.
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
const P = 'scripts/title-system/titles.unemployment-v2.json';
const orig = fs.readFileSync(P, 'utf8');
const find = (o) => { if (Array.isArray(o)) { for (const v of o) { const r = find(v); if (r) return r; } } else if (o && typeof o === 'object') { if (o.slug === 'round-4') return o; for (const v of Object.values(o)) { const r = find(v); if (r) return r; } } };
const run = () => { const r = spawnSync(process.execPath, ['scripts/gate.mjs', 'unemployment', '--quick'], { encoding: 'utf8' }); return (r.stdout + r.stderr).split('\n').filter((l) => l.includes('[round-4]')).join('\n'); };
const cases = [
  ['회피 답', (s) => { s.review.h2Answers[3].ans = '횟수는 사람마다 달라요. 고용센터에 확인해 보세요.'; }, '회피'],
  ['페이지에 없는 답', (s) => { s.review.h2Answers[0].ans = '4차는 집에서 인터넷으로 하면 돼요.'; }, '그대로 없다'],
  ['첫 화면 답 불일치', (s) => { s.review.firstScreenAnswer = '4차는 인터넷으로 신청해요.'; }, 'firstScreenAnswer'],
  ['답 개수 부족', (s) => { s.review.h2Answers.pop(); }, '개'],
  ['검토 뒤 글 변경(해시)', (s) => { s.review.specHash = '000000000000'; }, '바뀌었다'],
  ['링크 난발', (s) => { s.links = s.links.filter((l) => l.to !== 'round-1'); }, '난발'],
  ['시각 장치 누락', (s) => { s.shape = ['tree']; }, '장치'],
  ['검토 없음', (s) => { delete s.review; }, '검토 없음'],
];
let pass = 0;
try {
  for (const [name, mut, expect] of cases) {
    const d = JSON.parse(orig); mut(find(d)); fs.writeFileSync(P, JSON.stringify(d, null, 2) + '\n');
    const out = run(); const ok = out.includes(expect);
    pass += ok; console.log(`${ok ? '✓' : '✗'} ${name} → ${out.split('\n')[0]?.slice(0, 110) || '(round-4 출력 없음)'}`);
  }
} finally { fs.writeFileSync(P, orig); }
console.log(`\n검출 ${pass}/${cases.length} · 원본 복구:`, fs.readFileSync(P, 'utf8') === orig);
