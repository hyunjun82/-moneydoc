/**
 * 글 스펙: 적금 정기예금 금리 비교 (저축 카테고리, 적금 스포크)
 *   적금 이자는 적금 엔진(installment-savings, 단리: 월납입 × 연이율/12 × n(n+1)/2, 세금 15.4% 원 미만 버림 Math.floor),
 *   예금 이자는 정기예금 엔진(fixed-deposit: 원금 × 연이율 × 년수, 세금 15.4% 반올림),
 *   자유적금은 자유적금 엔진(free-savings: 월 평균 기준 단리, 세금 반올림)이 만든다. 세 엔진의 세금 처리는 같지 않으므로 각 값을 그대로 쓴다.
 *   세율·공시 금리 안내는 evidence/savings-compare-guide 의 소득세법·지방세법·조특법·은행연합회 원문에서만. 금리(연 4% 등)는 가정이다.
 *   2026-10-31 적대 검토 반영: "원 단위를 버림" → "원 미만을 버림", 엔진 비교 없는 결론(매달 생기는 돈 원칙·만기 짧게) 삭제,
 *   남은 돈 이자 0 가정 명시, 두 열 표 → 문장, FAQ 새 질문, 용어 풀이, 되풀이 정리.
 */
import { won, man } from '../render.mjs';

export default function article({ calculators, loadSpec, VERIFIED, derive = (v) => v }) {
  const IS = loadSpec('savings/installment-savings');
  const FD = loadSpec('savings/fixed-deposit');
  const FS = loadSpec('savings/free-savings');
  const C = IS.constants;
  const sv = (monthlyDeposit, months, rate, mode = 'simple', taxFree = 'no') => calculators['installment-savings']({ monthlyDeposit, months, rate, mode, taxFree }, IS);
  const dep = (principal, years, rate, taxFree = 'no') => calculators['fixed-deposit']({ principal, years, rate, taxFree }, FD);
  const fr = (monthlyDeposit, months, rate) => calculators['free-savings']({ monthlyDeposit, months, rate, taxFree: 'no' }, FS);
  const net = (r) => derive(r.maturity - r.principal);
  const netD = (r, p) => derive(r.maturity - p);

  const R = 0.04;
  // 같은 총원금 · 같은 금리로 적금(월납)과 예금(한 번에) 비교
  const CMP = [
    { m: 12, md: 1e6, label: '12개월 · 1,200만원 (월 100만원)' },
    { m: 24, md: 5e5, label: '24개월 · 1,200만원 (월 50만원)' },
    { m: 36, md: 1e6, label: '36개월 · 3,600만원 (월 100만원)' },
  ].map((c) => {
    const s = sv(c.md, c.m, R); const p = c.md * c.m; const d = dep(p, c.m / 12, R);
    return { ...c, p, s, d, gap: derive(d.interest - s.interest), netGap: derive(netD(d, p) - net(s)) };
  });
  const S12 = CMP[0].s, D12 = CMP[0].d;
  const MONTHS_S = derive(12 * 13 / 2);      // 적금에 이자가 붙는 개월 수 합계 (12+11+…+1)
  const MONTHS_D = derive(12 * 12);          // 예금 1,200만원 = 월 100만원 × 12 에 12개월씩
  const MONTHS_S36 = derive(36 * 37 / 2), MONTHS_D36 = derive(36 * 36);
  const ratio12 = derive(Math.round(S12.interest / D12.interest * 100) / 100);
  const ratio36 = derive(Math.round(CMP[2].s.interest / CMP[2].d.interest * 100) / 100);
  const COMP12 = sv(1e6, 12, R, 'compound');
  const compGap = derive(COMP12.interest - S12.interest);

  // 손익분기: 적금 이자 = 예금 이자 가 되는 적금 금리. 배율 = 2n / (n + 1)
  const bep = (n, r = R) => derive(Math.round(r * 2 * n / (n + 1) * 10000) / 10000);
  const mult = (n) => derive(2 * n / (n + 1));
  const B12 = bep(12), B24 = bep(24), B36 = bep(36);
  const S12b = sv(1e6, 12, B12), S24b = sv(5e5, 24, B24), S36b = sv(1e6, 36, B36);
  const RATE_ROWS = [0.04, 0.05, 0.06, 0.07, B12, 0.08].map((r) => { const s = sv(1e6, 12, r); return { r, s, diff: derive(D12.interest - s.interest) }; });
  const R7 = RATE_ROWS[3], R8 = RATE_ROWS[5];
  const pct = (r) => `${+(r * 100).toFixed(2)}%`;

  // 자유적금 vs 적금: 같은 입력, 같은 단리 산식. 세금 끝자리만 다를 수 있다 (원 미만 버림 vs 반올림)
  const F12 = fr(1e6, 12, R);
  const T_S = sv(3e5, 12, 0.035), T_F = fr(3e5, 12, 0.035);
  const T_RAW = derive(T_S.interest * C.INTEREST_TAX_RATE);
  // 예금 3% 기준 손익분기와, 예금 3% vs 적금 4%
  const B12_3 = bep(12, 0.03);
  const S12_3 = sv(1e6, 12, B12_3);
  const D3 = dep(1.2e7, 1, 0.03);
  const d3gap = derive(D3.interest - S12.interest);

  return {
    slug: 'savings-compare-guide', cat: 'savings', catLabel: '저축', crumb: '적금 정기예금 금리 비교',
    faqFixed: 2,
    title: '적금 정기예금 금리 비교, 같은 금리면 이자 차이는 얼마인가요',
    description: `적금 정기예금 금리 비교. 같은 연 4%라도 월 100만원 적금 12개월 이자는 ${won(S12.interest)}원, 1,200만원 예금은 ${won(D12.interest)}원으로 ${won(CMP[0].gap)}원 차이예요. 적금은 매달 넣은 돈마다 남은 개월만큼만 이자가 붙기 때문이에요. 손익분기 금리 ${pct(B12)}, 자유적금 계산기 차이, 목돈 넣는 곳을 정리했어요.`,
    datePublished: '2026-10-31', verified: VERIFIED, basis: '2026년 10월 기준', readMinutes: 8,
    badge: `적금·정기예금 계산기 산식 대조 · ${VERIFIED}`,
    calc: { href: '/installment/', label: '적금 이자 계산기 바로가기' },
    hero: {
      tag: '저축', line1: '적금 정기예금 금리 비교', line2: '같은 4%인데',
      sub1: `월 100만원 적금 12개월 이자 ${won(S12.interest)}원`,
      sub2: `1,200만원 예금 1년 이자 ${won(D12.interest)}원`,
      foot: `적금·정기예금 계산기 산식 · ${VERIFIED} 검증`,
      card: { label: '연 4% · 12개월 이자 차이', big: won(CMP[0].gap), unit: '원', l1: `적금 ${won(S12.interest)}원`, l2: `예금 ${won(D12.interest)}원` },
      alt: `적금 정기예금 금리 비교. 같은 연 4%로 12개월이면 월 100만원 적금 이자 ${won(S12.interest)}원, 1,200만원 예금 이자 ${won(D12.interest)}원`,
    },
    intro: '적금과 정기예금은 같은 연 4%라도 받는 이자가 크게 달라요. 적금은 매달 넣은 돈마다 남은 개월만큼만 이자가 붙고, 예금은 처음부터 원금 전체에 붙기 때문이에요. 이 글은 총원금(적금은 월 납입액 × 개월 수, 예금은 처음 넣은 돈)이 같을 때를 12개월, 24개월, 36개월로 비교했어요. 적금 금리가 몇 %여야 예금 이자를 따라잡는지, 자유적금 계산기는 무엇이 다른지, 목돈은 어디에 넣을지도 정리했어요. 금리는 모두 가정이고, 적금은 단리(원금에만 이자가 붙는 방식)로 계산했어요.',
    answer: {
      label: '기간을 눌러 같은 총원금·같은 연 4%(가정)일 때 이자 차이를 보세요',
      quick: CMP.map((c, i) => ({ chip: `${c.m}개월`, selected: i === 0, big: `${won(c.gap)}원`, unit: '이자 차이 (예금이 더 많아요)', sub: `${man(c.md)}원씩 ${c.m}개월 적금 vs 같은 돈을 예금에, 연 4%` })),
      boxes: [
        { title: '같은 4%인데 왜 다른가요', text: `적금은 돈이 들어가 있는 기간이 짧아서예요. 12개월 적금은 이자가 붙는 기간이 ${MONTHS_S}개월분, 예금은 ${MONTHS_D}개월분이에요` },
        { title: '손익분기 금리는 예금의 두 배 가까이예요', text: '손익분기 금리는 적금 이자가 예금 이자와 같아지는 적금 금리예요. 기간이 길수록 더 높은 배율이 필요해요' },
      ],
    },
    keyPoints: {
      title: '한눈에 보는 적금과 정기예금 이자 차이',
      rows: [
        ['이자가 붙는 개월 수', `12개월 적금 ${MONTHS_S}개월분 (12+11+…+1), 예금 ${MONTHS_D}개월분 (12×12)`],
        ['연 4% · 12개월', `월 100만원 적금 ${won(S12.interest)}원 vs 1,200만원 예금 ${won(D12.interest)}원`],
        ['이자 차이', `${won(CMP[0].gap)}원. 15.4% 세금을 뗀 뒤에는 ${won(CMP[0].netGap)}원`],
        ['24개월 · 36개월', `차이 ${won(CMP[1].gap)}원 · ${won(CMP[2].gap)}원 (총원금 ${man(CMP[1].p)}원 · ${man(CMP[2].p)}원)`],
        ['손익분기 금리', `12개월이면 적금이 예금의 ${mult(12).toFixed(2)}배. 예금 4%면 적금 ${pct(B12)}`],
        ['기간별 배율', `24개월 ${mult(24).toFixed(2)}배 (${pct(B24)}), 36개월 ${mult(36).toFixed(2)}배 (${pct(B36)})`],
        ['월복리로 해도', `12개월 ${won(COMP12.interest)}원. 단리보다 ${won(compGap)}원 많을 뿐`],
        ['자유적금 계산기', '월 평균 납입액으로 같은 단리 식. 세금만 원 미만 버림과 반올림이 달라 1원 차이 가능'],
      ],
    },
    sections: [
      { id: 's1', h2: '적금 정기예금 금리 비교, 같은 금리인데 왜 이자가 다른가요', sub: '적금은 돈마다 이자가 붙는 기간이 달라요', blocks: [
        { type: 'p', lead: true, ans: '예금은 원금 전체에 12개월치 이자가 붙지만, 적금은 매달 넣은 돈마다 남은 개월만큼만 붙기 때문이에요.', text: `월 100만원 적금은 첫 달 돈이 12개월치, 마지막 달 돈은 한 달치 이자만 받아요. 모든 달의 이자 기간을 합하면 ${MONTHS_S}개월분이고, 같은 총원금을 처음부터 예금에 넣으면 ${MONTHS_D}개월분이에요. 그래서 같은 연 4%여도 적금 이자가 예금의 절반 남짓이에요.` },
        { type: 'flow', label: '적금과 예금에 이자가 붙는 개월 수 (월 100만원 · 연 4% · 12개월)', steps: [
          { label: '적금에 이자가 붙는 개월 수', value: `${MONTHS_S}개월분`, sub: '12 + 11 + … + 1', op: '→' },
          { label: '적금 이자', value: `${won(S12.interest)}원`, sub: `100만원 × 4% ÷ 12 × ${MONTHS_S}`, op: 'vs' },
          { label: '예금에 이자가 붙는 개월 수', value: `${MONTHS_D}개월분`, sub: '원금 전체에 12개월', op: '→' },
          { label: '예금 이자', value: `${won(D12.interest)}원`, sub: '원금 × 4% × 1년' },
        ] },
        { type: 'p', ans: `월복리(다달이 붙은 이자에 다시 이자가 붙는 방식)로 계산해도 적금 이자는 ${won(COMP12.interest)}원이라 차이가 거의 그대로예요.`, text: `단리보다 ${won(compGap)}원 많을 뿐이에요. 적금 이자가 적은 이유는 이자 방식이 아니라 돈이 들어가 있는 기간이기 때문이에요. 단리와 복리의 차이 자체는 적금 이자 글에 있어요.`, link: { href: '/installment/guide/', label: '적금 이자 계산 보기' } },
        { type: 'fn', text: '소득세법 제16조 제1항 제3호(예금의 이자에 적금·부금·예탁금 포함). 적금 산식: 월납입 × 연이율 ÷ 12 × 개월수 × (개월수 + 1) ÷ 2 (단리).' },
        { type: 'fn', text: '정기예금 산식: 원금 × 연이율 × 년수. 두 산식 모두 이 사이트 계산기의 산식이에요.' },
      ] },

      { id: 's2', h2: '같은 금리면 월 100만원 적금과 1,200만원 예금 이자 차이는 얼마인가요', sub: '총원금이 같으면 예금 이자가 두 배 가까이예요', blocks: [
        { type: 'p', lead: true, ans: `연 4%로 12개월이면 적금 이자 ${won(S12.interest)}원, 예금 이자 ${won(D12.interest)}원으로 ${won(CMP[0].gap)}원 차이예요.`, text: `세금 15.4%를 떼면 적금은 ${won(net(S12))}원, 예금은 ${won(netD(D12, CMP[0].p))}원을 받아 ${won(CMP[0].netGap)}원 차이예요. 24개월, 36개월로 늘려도 총원금이 같으면 예금 쪽이 늘 많아요.` },
        { type: 'table', id: 'cmpTbl', net: 3, caption: '같은 총원금·같은 연 4%로 적금과 정기예금 이자 비교 (단리)', headers: ['기간 · 총원금', '적금 이자', '예금 이자', '이자 차이', '세후 차이'],
          rows: CMP.map((c, i) => ({ hi: i === 0, cells: [c.label, won(c.s.interest), won(c.d.interest), won(c.gap), won(c.netGap)] })),
          fn: '단위: 원. 예금은 적금 총원금과 같은 금액을 처음부터 같은 기간 맡긴 값이에요. 세후 차이는 각 계산기의 세후 이자 차이예요. 연 4%는 가정이에요.' },
        { type: 'p', ans: '기간이 길어질수록 차이 금액은 커지고, 비율로도 예금 쪽이 두 배에 더 가까워져요.', text: `36개월이면 적금은 ${won(MONTHS_S36)}개월분, 예금은 ${won(MONTHS_D36)}개월분에 이자가 붙어요. 적금 이자를 예금 이자로 나누면 12개월은 ${ratio12}, 36개월은 ${ratio36}이에요.` },
        { type: 'p', ans: '예금은 원금·금리별 세후 이자 표가 따로 있어요.', text: '원금과 금리별로 1년 맡길 때 받는 세후 이자와 기간별 이자를 정기예금 글에 정리했어요.', link: { href: '/deposit/guide/', label: '정기예금 이자 계산 보기' } },
        { type: 'note', title: '세금은 예금·적금 모두 이자의 15.4%예요', text: '한 해 이자와 배당이 2천만원을 넘을 때 달라지는 것은 예금 이자 세금 글에 있어요.', link: { href: '/deposit/interest-tax/', label: '예금 이자 세금 보기' } },
        { type: 'widget', label: '적금 예금 이자 차이 계산', title: '내 금액으로 적금과 예금 이자 차이 보기', note: '같은 총원금을 적금으로 나눠 넣을 때와 예금에 한 번에 넣을 때를 각 계산기 산식으로 계산해요. 적금은 단리이고, 세금은 적금 계산기가 원 미만을 버리고 정기예금 계산기가 반올림해요.',
          inputs: [
            { id: 'cm', label: '월 납입액 (만원)', type: 'number', value: 100, min: 1, max: 3000, step: 1 },
            { id: 'cn', label: '개월 수', type: 'number', value: 12, min: 1, max: 120, step: 1 },
            { id: 'cr', label: '연 금리 (%)', type: 'number', value: 4, min: 0.1, max: 20, step: 0.1 },
          ],
          outputs: [{ id: 'co1', label: '이자 차이 (예금 − 적금)' }, { id: 'co2', label: '적금 이자 · 세후' }, { id: 'co3', label: '예금 이자 · 세후' }],
          port: `var CT=${C.INTEREST_TAX_RATE};
  function cmp(m,n,r){ var p=m*n; var si=Math.round(m*(r/12)*n*(n+1)/2); var st=Math.floor(si*CT); var di=Math.round(p*r*(n/12)); var dt=Math.round(di*CT); return {p:p, si:si, st:st, sm:p+si-st, di:di, dt:dt, dm:p+di-dt}; }`,
          js: `
  function crender(){ var m=(+document.getElementById('cm').value||0)*1e4, n=+document.getElementById('cn').value||1, r=(+document.getElementById('cr').value||0)/100; if(m<=0||r<=0)return; var x=cmp(m,n,r);
    document.getElementById('co1').textContent=won(x.di-x.si)+'원'; document.getElementById('co2').textContent=won(x.si)+'원 · '+won(x.sm-x.p)+'원'; document.getElementById('co3').textContent=won(x.di)+'원 · '+won(x.dm-x.p)+'원'; }
  ['cm','cn','cr'].forEach(function(id){document.getElementById(id).addEventListener('input',crender);document.getElementById(id).addEventListener('change',crender)}); crender();`,
          check: (port) => {
            let n = 0, bad = 0;
            for (let m = 1; m <= 300; m += 7) for (const mo of [1, 6, 12, 18, 24, 36, 60, 120]) for (const rt of [0.02, 0.035, 0.04, 0.05, 0.0738, 0.12]) {
              n++;
              const q = port.cmp(m * 1e4, mo, rt);
              const s = sv(m * 1e4, mo, rt); const d = dep(m * 1e4 * mo, mo / 12, rt);
              if (q.si !== s.interest || q.st !== s.tax || q.sm !== s.maturity || q.di !== d.interest || q.dt !== d.tax || q.dm !== d.maturity) bad++;
            }
            return { n, bad };
          },
        },
        { type: 'fn', text: '소득세법 제129조 제1항 제1호 라목(이자소득 원천징수세율 100분의 14), 제130조(지급할 때 원천징수).' },
        { type: 'fn', text: '지방세법 제103조의13(원천징수 소득세의 100분의 10을 개인지방소득세로 특별징수).' },
      ] },

      { id: 's3', h2: '적금 금리가 몇 %여야 예금 이자와 같아지나요', sub: '12개월이면 예금 금리의 두 배 가까이 필요해요', blocks: [
        { type: 'p', lead: true, ans: `12개월 적금은 금리가 예금의 ${mult(12).toFixed(2)}배여야 이자가 같아져요. 예금이 연 4%면 적금은 연 ${pct(B12)}예요.`, text: `그 금리로 월 100만원을 12개월 넣으면 이자가 ${won(S12b.interest)}원이라 예금 연 4%와 거의 같아요. 배율은 개월 수만으로 정해지는데, 12개월이면 2 × 12 ÷ 13이에요. 예금 금리가 몇 %든 배율은 같아요.` },
        { type: 'table', id: 'rateTbl', net: 3, caption: '적금 금리별 12개월 이자와 예금 연 4% 비교 (월 100만원, 단리)', headers: ['적금 금리', '적금 이자', '세금', '세후 이자', '예금 4%와 비교'],
          rows: RATE_ROWS.map(({ r, s, diff }) => ({ hi: r === B12, cells: [`연 ${pct(r)}`, won(s.interest), won(s.tax), won(net(s)), diff >= 0 ? `${won(diff)} 적음` : `${won(-diff)} 많음`] })),
          fn: `단위: 원. 예금은 총원금 1,200만원을 연 4%로 1년 맡길 때 이자 ${won(D12.interest)}원 기준이에요. 적금 금리는 가정이에요.` },
        { type: 'table', net: 2, caption: '기간별 손익분기 배율과 예금 연 4%일 때 적금 금리 (단리)', headers: ['기간', '배율 2n ÷ (n + 1)', '적금 금리', '그 금리의 적금 이자', '예금 4% 이자'], rows: [
          { hi: true, cells: ['12개월 (월 100만원)', `${mult(12).toFixed(2)}배`, `연 ${pct(B12)}`, won(S12b.interest), won(D12.interest)] },
          { cells: ['24개월 (월 50만원)', `${mult(24).toFixed(2)}배`, `연 ${pct(B24)}`, won(S24b.interest), won(CMP[1].d.interest)] },
          { cells: ['36개월 (월 100만원)', `${mult(36).toFixed(2)}배`, `연 ${pct(B36)}`, won(S36b.interest), won(CMP[2].d.interest)] },
        ], fn: '단위: 원. 개월 수를 n이라 하면 배율은 2n ÷ (n + 1)이에요. 금리는 0.01%p 단위로 반올림해 이자가 몇백 원 어긋날 수 있어요.' },
        { type: 'p', ans: '기간이 길수록 적금에 필요한 금리가 더 높아져요.', text: '24개월은 예금 금리의 두 배에 가깝고, 36개월은 더 가까워져요. 돈이 들어가 있는 평균 기간이 예금의 절반에 가까워지기 때문이에요.' },
        { type: 'fn', text: '손익분기 배율은 적금 단리 산식(월납입 × 연이율 ÷ 12 × n(n + 1) ÷ 2)과 예금 산식(월납입 × n × 연이율 × n ÷ 12)을 같다고 놓고 푼 값이에요.' },
        { type: 'fn', text: '적금 연이율 = 예금 연이율 × 2n ÷ (n + 1). 금리는 0.01%p 단위로 반올림했어요.' },
      ] },

      { id: 's4', h2: '자유적금 이자 계산기는 적금 계산기와 무엇이 다른가요', sub: '월 평균 납입액을 넣는다는 점이 달라요', blocks: [
        { type: 'p', lead: true, ans: '자유적금 계산기는 매달 다른 금액을 넣는 적금을 월 평균 납입액 하나로 계산해요.', text: '월 평균 납입액은 달마다 넣은 돈을 다 더해 개월 수로 나눈 금액이에요. 이자 산식은 적금 계산기의 단리 산식과 같아서, 월 평균 100만원을 12개월 연 4%로 넣으면 적금 계산기와 같은 값이 나와요. 달마다 넣는 금액이 다르면 평균을 내서 넣으면 돼요.', link: { href: '/free-savings/', label: '자유적금 계산기' } },
        { type: 'p', ans: '두 계산기의 이자 산식은 같고, 다른 점은 입력과 이자 방식, 세금 끝자리예요.', text: '적금 계산기는 매달 같은 금액을 받고 단리와 월복리를 고를 수 있어요. 자유적금 계산기는 월 평균 납입액을 받고 단리만 계산해요. 세금 15.4%는 적금 계산기가 원 미만을 버리고, 자유적금 계산기와 정기예금 계산기는 반올림해요. 비과세종합저축을 고르면 셋 다 원금 5천만원까지 세금이 0이고 넘는 원금 몫만 과세해요.' },
        { type: 'p', ans: '그래서 같은 입력에도 세금이 1원 다를 수 있어요.', text: `월 30만원을 12개월 연 3.5%로 넣으면 이자 ${won(T_S.interest)}원에 세금이 적금 계산기는 ${won(T_S.tax)}원, 자유적금 계산기는 ${won(T_F.tax)}원이에요. 이자 × 15.4%가 ${T_RAW.toLocaleString('ko-KR')}원이기 때문이에요. 두 계산기의 세금을 같은 산식으로 보지 말고 각각의 값으로 보세요.` },
        { type: 'p', ans: '월 평균이 같으면 돈을 앞쪽 달에 많이 넣었는지 뒤쪽에 넣었는지는 계산기가 구분하지 않아요.', text: '그래서 자유적금 결과는 평균을 기준으로 한 어림값(대략 맞춘 값)이에요. 매달 같은 금액이 정해져 있으면 적금 계산기를, 금액이 달마다 다르면 자유적금 계산기를 쓰면 돼요.' },
        { type: 'fn', text: '자유적금 계산기 산식: 월 평균 × (이자율 ÷ 12) × 개월수 × (개월수 + 1) ÷ 2, 세금은 이자 × 15.4% 반올림.' },
        { type: 'fn', text: '적금 계산기 단리 산식은 같고 세금은 원 미만 버림. 비과세 한도는 조세특례제한법 제88조의2(1명당 저축원금 5천만원).' },
      ] },

      { id: 's5', h2: '목돈이 있으면 예금과 적금 중 어디에 넣어야 하나요', sub: '같은 금리면 한 번에 넣는 예금 이자가 많아요', blocks: [
        { type: 'p', lead: true, ans: '이미 손에 있는 목돈은 예금에 한 번에 넣는 쪽이 같은 금리에서 이자가 더 많아요.', text: `1,200만원을 월 100만원씩 적금으로 나눠 넣는 것과 한 번에 1년 예금에 넣는 것은 위 표의 12개월 행과 같은 비교예요. 이 비교는 적금에 아직 넣지 않은 돈에 이자가 붙지 않는다고 놓은 계산이에요. 적금 금리가 예금 금리보다 높을 때는 앞의 손익분기 배율로 가려요.` },
        { type: 'tree', id: 'pickTree', questions: [
          { q: '① 넣을 돈이 지금 한 번에 있나요?', hint: '월급처럼 매달 생기는 돈이면 아니오', no: { title: '적금 계산기로 월 납입 기준 이자를 봐요', text: '매달 생기는 돈은 예금에 한 번에 넣을 수 없어요. 월 납입액, 개월 수, 금리를 적금 계산기에 넣으면 이자와 세후 만기액이 나와요.' } },
          { q: '② 적금 금리가 예금 금리의 1.85배(12개월) 이상인가요?', hint: '24개월은 1.92배, 36개월은 1.95배 이상', no: { title: '예금 이자가 많아요', text: `위 표처럼 적금 7%는 이자 ${won(R7.s.interest)}원으로 예금 4%보다 ${won(R7.diff)}원 적어요. 배율을 못 채우면 같은 목돈으로는 예금 이자가 커요.` } },
        ], ok: { title: '적금 이자가 예금과 같거나 많아요', text: `위 표에서 적금 8%는 이자 ${won(R8.s.interest)}원으로 예금 4%보다 ${won(-R8.diff)}원 많아요.` } },
        { type: 'p', ans: '공시 금리는 세금을 떼기 전 금리라, 적금이든 예금이든 15.4%를 뺀 값이 손에 쥐는 이자예요.', text: '전국은행연합회 소비자포털은 예금금리와 적금금리를 따로 공시해요. 단리와 복리, 만기 1개월부터 36개월까지 골라 기본금리와 최고금리를 비교할 수 있어요. 두 금리의 뜻은 공시 화면이 따로 적지 않고, 우대금리 항목이 함께 있어요.' },
        { type: 'fn', text: '전국은행연합회 소비자포털 예금금리 비교공시(공시된 금리는 세금공제전 금리, 예금금리·적금금리 메뉴).' },
        { type: 'fn', text: '같은 공시 화면의 선택 항목: 이자 계산방식 단리·복리, 만기 1개월부터 36개월, 기본금리·최고금리, 우대금리.' },
      ] },
    ],
    faq: [
      ['예금 금리가 연 3%면 적금은 몇 %여야 이자가 같아지나요?', `12개월이면 연 ${pct(B12_3)}예요. 월 100만원씩 연 ${pct(B12_3)}로 넣으면 이자 ${won(S12_3.interest)}원으로, 총원금 1,200만원 예금 연 3%의 ${won(D3.interest)}원과 거의 같아요. 배율 2n ÷ (n + 1)은 금리와 상관없이 개월 수만으로 정해져요.`],
      ['예금 금리가 적금 금리보다 낮아도 예금이 나은가요?', `목돈 1,200만원이면 연 3% 예금 이자가 ${won(D3.interest)}원이라 연 4% 적금 이자 ${won(S12.interest)}원보다 ${won(d3gap)}원 많아요. 예금 금리가 낮아도 배율을 못 채운 적금보다 이자가 커요. 다만 매달 생기는 돈은 한 번에 넣을 수 없으니 적금 계산기로 따로 보세요.`],
    ],
    summary: [
      '적금 이자가 적은 건 금리 탓이 아니라 돈이 들어가 있는 기간이 짧기 때문이에요.',
      `같은 돈·같은 금리면 적금 이자는 예금 이자의 ${ratio12}배(12개월)이고, 36개월이면 ${ratio36}배예요.`,
      '적금 금리가 예금 금리의 2n ÷ (n + 1)배는 돼야 이자가 같아요. 기간이 길수록 배율이 올라가요.',
      '자유적금 계산기는 월 평균으로 어림잡는 도구이고, 세금은 각 계산기 값으로 보세요.',
    ],
    sources: [
      ['법령', '소득세법 제16조 제1항 제3호(예금의 이자에 적금·부금·예탁금 포함), 제129조 제1항 제1호 라목(이자소득 원천징수세율 100분의 14), 제130조(지급할 때 원천징수), 제14조 제3항 제6호(이자·배당 합계 2천만원 이하 분리과세). 지방세법 제103조의13(원천징수 소득세의 100분의 10 특별징수). 조세특례제한법 제88조의2(비과세종합저축 1명당 저축원금 5천만원).'],
      ['정부 안내', '전국은행연합회 소비자포털 예금금리 비교공시(예금금리·적금금리, 공시된 금리는 세금공제전 금리, 이자 계산방식 단리·복리, 만기 1개월부터 36개월, 기본금리·최고금리).'],
      ['계산', `적금 이자는 적금 계산기 산식(월납입 × 연이율 ÷ 12 × 개월수 × (개월수 + 1) ÷ 2, 세금은 이자의 15.4% 원 미만 버림), 예금 이자는 정기예금 계산기 산식(원금 × 연이율 × 년수, 세금은 15.4% 반올림), 자유적금은 자유적금 계산기 산식(월 평균 기준 단리, 세금 반올림)으로 계산했어요 (${VERIFIED}). 금리는 가정이에요.`],
    ],
    claims: [
      { src: 1, quote: '그 밖의 이자소득에 대해서는 100분의 14', note: '이자소득 원천징수세율' },
      { src: 1, quote: '3. 국내에서 받는 예금(적금ㆍ부금ㆍ예탁금 및 우편대체를 포함한다. 이하 같다)의 이자', note: '예금 이자에 적금 포함, 같은 이자소득' },
      { src: 1, quote: '제16조(이자소득) ① 이자소득은 해당 과세기간에 발생한 다음 각 호의 소득으로 한다', note: '이자소득의 범위' },
      { src: 1, quote: '원천징수의무자가 이자소득 또는 배당소득을 지급할 때에는 그 지급금액에 원천징수세율을 적용하여 계산한 소득세를 원천징수한다', note: '지급할 때 원천징수' },
      { src: 1, quote: '그 소득의 합계액이 2천만원(이하 “이자소득등의 종합과세기준금액”이라 한다)', note: '종합과세기준금액 2천만원' },
      { src: 3, quote: '100분의 10에 해당하는 금액을 소득세 원천징수와 동시에 개인지방소득세로 특별징수하여야 한다', note: '지방소득세 10%' },
      { src: 2, quote: '1명당 저축원금이 5천만원', note: '비과세종합저축 한도' },
      { src: 4, quote: '공시된 금리는 세금공제전 금리이며', note: '공시 금리는 세전' },
      { src: 4, quote: '예금금리 적금금리', note: '예금금리·적금금리 공시 메뉴' },
      { src: 4, quote: '이자 계산방식 단리 복리', note: '공시 화면의 단리·복리 선택' },
      { src: 4, quote: '만기 1개월 3개월 6개월 12개월 24개월 36개월', note: '공시 화면의 만기 선택' },
      { src: 4, quote: '기본금리 최고금리', note: '공시 화면의 기본금리·최고금리' },
      { src: 4, quote: '상품 만기시 적용되는 우대금리는 포함되지 않습니다', note: '우대금리' },
    ],
    related: [
      { kind: '계산기', label: '적금 이자 계산기', href: '/installment/' },
      { kind: '계산기', label: '정기예금 계산기', href: '/deposit/' },
      { kind: '계산기', label: '자유적금 계산기', href: '/free-savings/' },
      { kind: '저축 가이드', label: '적금 이자 계산', href: '/installment/guide/' },
    ],
  };
}
