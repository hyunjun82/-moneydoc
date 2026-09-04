// 빌드 시점 검사 셀프테스트: 라이브까지 나갔던 오류를 고의로 되살려 빌드가 막히는지 본다.
//   node scripts/selftest/build-checks.mjs   → "검출 4/4" 여야 한다
// answer-check.mjs 나 factcheck.mjs 를 고쳤으면 반드시 돌린다. "작동한다" 는 말 대신 이 숫자를 댄다.
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

const A = 'scripts/article-template/articles';
const build = (slug) => {
  const r = spawnSync(process.execPath, ['scripts/article-template/build.mjs', slug], { encoding: 'utf8' });
  return (r.stdout ?? '') + (r.stderr ?? '');
};

const CASES = [
  { name: '일수-총액 불일치 (total 4개월=120일에 150일 금액)',
    file: `${A}/unemployment-total-guide.mjs`, slug: 'unemployment-total-guide',
    from: 'won(ub(3e6, 0.5).totalBenefit)', to: 'won(ub(3e6, 1).totalBenefit)',
    expect: '일수와 총액이 안 맞는다' },
  { name: '회피 답 (payday 언제 들어오나요)',
    file: `${A}/unemployment-payday-guide.mjs`, slug: 'unemployment-payday-guide',
    from: "ans: '통상 실업인정을 받은 다음 날에 본인이 지정한 계좌로 들어와요.'",
    to: "ans: '인정일이 사람마다 달라서 입금일도 사람마다 달라요.'",
    expect: '답이 회피다' },
  { name: '회피 답일 때 근거를 들이대는가',
    file: `${A}/unemployment-payday-guide.mjs`, slug: 'unemployment-payday-guide',
    from: "ans: '통상 실업인정을 받은 다음 날에 본인이 지정한 계좌로 들어와요.'",
    to: "ans: '인정일이 사람마다 달라서 입금일도 사람마다 달라요.'",
    expect: '근거 ' },
  { name: '단위 겹침 (만만원)',
    file: `${A}/unemployment-by-salary-guide.mjs`, slug: 'unemployment-by-salary-guide',
    from: '${man(2e6)}원', to: '${man(2e6)}만원',
    expect: null, gate: '단위가 겹쳐 붙었다' },
];

let pass = 0;
for (const c of CASES) {
  const orig = fs.readFileSync(c.file, 'utf8');
  if (!orig.includes(c.from)) { console.log(`✗ ${c.name} — 기준 문장을 못 찾음 (글이 바뀌었으면 이 테스트도 고친다)`); continue; }
  fs.writeFileSync(c.file, orig.replace(c.from, c.to));
  try {
    let out = build(c.slug);
    if (c.gate) {
      const g = spawnSync(process.execPath, ['scripts/gate.mjs', 'unemployment', '--quick'], { encoding: 'utf8' });
      out += (g.stdout ?? '') + (g.stderr ?? '');
    }
    const want = c.expect ?? c.gate;
    const ok = out.includes(want);
    if (ok) pass++;
    console.log(`${ok ? '✓' : '✗'} ${c.name}`);
    if (!ok) console.log(`    "${want}" 가 출력에 없다`);
  } finally {
    fs.writeFileSync(c.file, orig);
    build(c.slug);   // 원래 상태로 다시 빌드
  }
}
console.log(`\n검출 ${pass}/${CASES.length}`);
process.exit(pass === CASES.length ? 0 : 1);
