/**
 * 글 스펙: 대출 이자 계산법 공식 (대출 카테고리 4편)
 *   월 상환액·총 이자는 대출 계산기 엔진(loan-amortization: 원리금균등·원금균등·만기일시·거치식)이 만든다.
 *   상환방법 정의는 한국주택금융공사 월별상환원리금 계산기, 금리 예시는 디딤돌 2026.9 금리, 최고이자율은 이자제한법 원문.
 *   2026-09-29 적대 검토 반영: 원금균등 마지막 회차 정산 버그를 엔진에서 고침(총 이자 불변, 마지막 달 278,704→278,624),
 *   이자제한법 적용 제외(인가·등록 금융회사·대부업), 디딤돌 우대금리 조건, 근거 없는 단정(전세 만기일시·체증식·"가장") 삭제.
 */
import { won, man } from '../render.mjs';

export default function article({ calculators, loadSpec, VERIFIED, derive = (v) => v }) {
  const LA = loadSpec('loan/loan-amortization');
  const L = (principal, years, rate, mode = 'amortization', graceYears = 0) => calculators['loan-amortization']({ principal, years, rate, mode, graceYears, calcMethod: 'standard', loanDate: '2026-10-01', paymentDay: 1 }, LA);

  const A = L(1e8, 30, 0.04), D = L(1e8, 30, 0.04, 'decline'), B = L(1e8, 30, 0.04, 'balloon'), G = L(1e8, 30, 0.04, 'grace', 1);
  const A20 = L(1e8, 20, 0.04), A3 = L(1e8, 30, 0.03), AD = L(1e8, 30, 0.031);
  const firstInt = derive(Math.round(1e8 * 0.04 / 12));
  const firstPrin = derive(A.monthly - firstInt);
  const gapAD = derive(A.totalInterest - D.totalInterest);
  const gap3020 = derive(A.totalInterest - A20.totalInterest);
  const gapRate = derive(A.totalInterest - A3.totalInterest);
  const gapGrace = derive(G.totalInterest - A.totalInterest);
  const gapBalloon = derive(B.totalInterest - A.totalInterest);
  const mp = derive(Math.round(1e8 / 360));
  const lastPrin = derive(1e8 - mp * 359);
  const lastInt = derive(D.lastPayment - lastPrin);
  // 원금균등이 원리금균등보다 적게 내기 시작하는 회차
  let cross = 0; { let bal = 1e8; for (let i = 1; i <= 360; i++) { const pay = (i === 360 ? bal : mp) + Math.round(bal * 0.04 / 12); if (pay < A.monthly) { cross = i; break; } bal -= mp; } }
  cross = derive(cross);
  const crossYears = derive(Math.floor((cross - 1) / 12));
  const AMTS = [1e8, 2e8, 4e8, 5e8, 6e8];
  const RATES = [0.03, 0.04, 0.05];
  const I5 = L(5e8, 30, 0.04);

  return {
    slug: 'loan-repayment-guide', cat: 'loan', catLabel: '대출', crumb: '대출 이자 계산법',
    faqFixed: 2,
    title: '대출 이자 계산법 공식, 원리금균등 원금균등 차이는 얼마나 되나요',
    description: `대출 이자는 남은 원금 × 연 금리 ÷ 12로 매달 계산해요. 1억을 30년·연 4%로 빌리면 원리금균등과 원금균등의 총 이자가 ${won(gapAD)}원 차이 나요. 공식, 1억~6억 월 상환액, 상환방식별 표를 정리했어요.`,
    datePublished: '2026-09-29', verified: VERIFIED, basis: '2026년 9월 기준', readMinutes: 8,
    badge: `한국주택금융공사 상환방법 정의 · 이자제한법 원문 대조 · ${VERIFIED}`,
    calc: { href: '/repayment/', label: '대출 이자 계산기 바로가기' },
    hero: {
      tag: '대출', line1: '대출 이자 계산법', line2: '1억 · 30년 · 4%',
      sub1: '원리금균등은 매달 같은 금액',
      sub2: `원금균등이면 총 이자 ${man(derive(Math.round(gapAD / 1e4) * 1e4))}원 적게`,
      foot: `상환방법 정의 한국주택금융공사 · ${VERIFIED} 검증`,
      card: { label: '원리금균등 총 이자', big: won(A.totalInterest), unit: '원', l1: `원금균등 ${won(D.totalInterest)}원`, l2: '1억 · 30년 · 연 4%' },
      alt: `대출 이자 계산법 공식. 1억을 30년 연 4%로 빌리면 원리금균등 총 이자 ${won(A.totalInterest)}원, 원금균등 ${won(D.totalInterest)}원`,
    },
    intro: `대출 이자는 매달 남은 원금에 연 금리를 곱하고 12로 나눠요. 원금을 어떻게 나눠 갚느냐가 상환방식이고, 방식에 따라 매달 내는 돈과 총 이자가 달라져요. 1억을 30년·연 4%로 빌리면 원리금균등은 총 이자 ${won(A.totalInterest)}원, 원금균등은 ${won(D.totalInterest)}원이에요.`,
    answer: {
      label: '1억 · 30년 · 연 4% 상환방식별 비교',
      quick: [
        { chip: '원리금균등', selected: true, big: `${won(A.monthly)}원`, unit: '매달 같은 금액', sub: `총 이자 ${won(A.totalInterest)}원` },
        { chip: '원금균등', big: `${won(D.firstPayment)}원`, unit: '첫 달 상환액', sub: `매달 줄어 마지막 달 ${won(D.lastPayment)}원` },
        { chip: '만기일시', big: `${won(B.monthlyInterest)}원`, unit: '매달 이자만', sub: `총 이자 ${won(B.totalInterest)}원 · 원금은 만기에` },
      ],
      boxes: [
        { title: '한 달 이자 = 남은 원금 × 연 금리 ÷ 12', text: '원금이 줄수록 이자도 줄어요. 은행 실제 납부액은 달의 일수에 따라 조금 달라질 수 있어요' },
        { title: `원금균등이 총 이자 ${won(gapAD)}원 적어요`, text: `대신 처음 ${crossYears}년 넘게는 매달 내는 돈이 원리금균등보다 많아요` },
      ],
    },
    keyPoints: {
      title: '한눈에 보는 대출 이자 계산',
      rows: [
        ['한 달 이자', '남은 원금 × 연 금리 ÷ 12'],
        ['1억 · 30년 · 4% 원리금균등', `매달 ${won(A.monthly)}원, 총 이자 ${won(A.totalInterest)}원`],
        ['같은 조건 원금균등', `첫 달 ${won(D.firstPayment)}원 → 마지막 달 ${won(D.lastPayment)}원`],
        ['1억 · 4% · 30년 → 20년', `총 이자 ${won(gap3020)}원 감소 (원리금균등)`],
        ['1억 · 30년 · 4% → 3%', `총 이자 ${won(gapRate)}원 감소 (원리금균등)`],
        ['1억 · 30년 · 4% 거치 1년', `총 이자 ${won(gapGrace)}원 늘어나요`],
        ['디딤돌 30년 금리 (2026.9)', '3.10 ~ 4.15 (단위 %), 생애최초 신혼 2.80 ~ 3.85, 지방 주택 0.2%p 차감'],
        ['이자제한법 최고이자율', '연 20%, 인가·등록 금융회사와 대부업에는 적용 안 해요'],
      ],
    },
    sections: [
      { id: 's1', h2: '대출 이자 계산법 공식은 무엇인가요', sub: '매달 남은 원금에 월이율을 곱해요', blocks: [
        { type: 'p', lead: true, ans: '한 달 이자는 남은 원금 × 연 금리 ÷ 12예요.', text: '원리금균등은 이 이자에 원금을 더한 합계가 매달 같도록 월 상환액을 먼저 정해요. 그래서 처음에는 이자 비중이 크고, 갈수록 원금 비중이 커져요.' },
        { type: 'flow', label: '원리금균등 첫 달 상환액 나누기 (1억, 30년, 연 4%)', steps: [
          { label: '월 상환액', value: `${won(A.monthly)}원`, sub: '30년 동안 같은 금액', op: '−' },
          { label: '첫 달 이자', value: `${won(firstInt)}원`, sub: '1억 × 4% ÷ 12', op: '=' },
          { label: '첫 달 원금 상환', value: `${won(firstPrin)}원`, sub: '남은 원금에서 빠지는 돈' },
        ] },
        { type: 'p', ans: '원리금균등 월 상환액은 대출금 × 월이율 × A ÷ (A − 1)이에요.', text: '월이율은 연 금리를 12로 나눈 값이고, A는 1에 월이율을 더한 수를 대출 개월 수만큼 거듭 곱한 값이에요. 이 글의 표는 매달 이자를 원 단위로 반올림하고 마지막 달에 남은 원금을 정산한 값이에요.' },
        { type: 'p', ans: '은행에 실제로 내는 금액은 달의 일수에 따라 조금 달라질 수 있어요.', text: '한국주택금융공사는 30일 이하인 달은 계산값보다 조금 적게, 31일인 달은 조금 많게 낼 수 있지만 만기까지 내는 총액은 같다고 안내해요.' },
      ] },

      { id: 's2', h2: '1억 대출 이자 계산하면 한 달에 얼마인가요', sub: '첫 달 이자와 원리금을 나눠서 봐요', blocks: [
        { type: 'p', lead: true, ans: `연 4%면 1억의 첫 달 이자는 ${won(firstInt)}원이에요.`, text: `원금까지 함께 갚는 30년 원리금균등이면 매달 ${won(A.monthly)}원을 내요. 처음에는 상환액의 대부분이 이자이고, 원금이 줄면서 이자 몫이 줄어요.` },
        { type: 'table', id: 'amtTbl', net: 2, caption: '대출금과 금리별 원리금균등 월 상환액 (30년)', headers: ['대출금', '연 3%', '연 4%', '연 5%'],
          rows: AMTS.map((p) => ({ hi: p === 1e8, cells: [`${man(p)}원`, ...RATES.map((r) => won(L(p, 30, r).monthly))] })),
          fn: '단위: 원. 원리금균등 30년, 매달 이자를 원 단위로 반올림한 상환표 값이에요.' },
        { type: 'table', net: 2, caption: '대출금과 금리별 30년 총 이자 (원리금균등)', headers: ['대출금', '연 3%', '연 4%', '연 5%'],
          rows: AMTS.map((p) => ({ hi: p === 1e8, cells: [`${man(p)}원`, ...RATES.map((r) => won(L(p, 30, r).totalInterest))] })),
          fn: `단위: 원. 5억을 연 4%로 30년 빌리면 총 이자가 ${won(I5.totalInterest)}원이에요.` },
        { type: 'widget', label: '대출 이자 계산', title: '내 대출로 바로 보기', note: '이 글의 표와 같은 산식이에요. 대출금, 금리, 기간, 상환방식을 고르세요.',
          inputs: [
            { id: 'lp', label: '대출금 (만원)', type: 'number', value: 10000, min: 100, max: 100000, step: 100 },
            { id: 'lr', label: '연 금리 (%)', type: 'number', value: 4, min: 0.5, max: 20, step: 0.05 },
            { id: 'ly', label: '대출 기간', type: 'select', value: 30, options: [[5, '5년'], [10, '10년'], [15, '15년'], [20, '20년'], [30, '30년'], [40, '40년']] },
            { id: 'lm', label: '상환방식', type: 'select', value: 0, options: [[0, '원리금균등'], [1, '원금균등'], [2, '만기일시']] },
          ],
          outputs: [{ id: 'lo1', label: '첫 달 상환액' }, { id: 'lo2', label: '총 이자' }, { id: 'lo3', label: '총 상환액' }],
          port: `function lam(p,y,rate,m){ var r=rate/12, n=y*12, ti=0, bal=p, first=0, i, it;
    if(m===0){ var pw=Math.pow(1+r,n), P=Math.round(p*r*pw/(pw-1)); for(i=1;i<=n;i++){ it=Math.round(bal*r); var pr=(i===n)?bal:P-it; bal-=pr; ti+=it; } return {f:P, t:ti}; }
    if(m===1){ var mp=Math.round(p/n); for(i=1;i<=n;i++){ it=Math.round(bal*r); var q=(i===n)?bal:mp; if(i===1)first=q+it; bal-=q; ti+=it; } return {f:first, t:ti}; }
    var mi=Math.round(p*r); return {f:mi, t:mi*n}; }`,
          js: `
  function lrender(){ var p=(+document.getElementById('lp').value||0)*1e4, r=(+document.getElementById('lr').value||0)/100, y=+document.getElementById('ly').value, m=+document.getElementById('lm').value; if(p<=0||r<=0)return; var x=lam(p,y,r,m);
    document.getElementById('lo1').textContent=won(x.f)+'원'; document.getElementById('lo2').textContent=won(x.t)+'원'; document.getElementById('lo3').textContent=won(p+x.t)+'원'; }
  ['lp','lr','ly','lm'].forEach(function(id){document.getElementById(id).addEventListener('input',lrender)}); lrender();`,
          check: (port) => {
            let n = 0, bad = 0;
            for (let pm = 100; pm <= 100000; pm += 3300) for (let bp = 50; bp <= 2000; bp += 45) for (const y of [5, 10, 20, 30, 40]) {
              const p = pm * 1e4, r = bp / 10000;
              const e0 = L(p, y, r), e1 = L(p, y, r, 'decline'), e2 = L(p, y, r, 'balloon');
              const w0 = port.lam(p, y, r, 0), w1 = port.lam(p, y, r, 1), w2 = port.lam(p, y, r, 2);
              n += 3;
              if (w0.f !== e0.monthly || w0.t !== e0.totalInterest) bad++;
              if (w1.f !== e1.firstPayment || w1.t !== e1.totalInterest) bad++;
              if (w2.f !== e2.monthlyInterest || w2.t !== e2.totalInterest) bad++;
            }
            return { n, bad };
          },
        },
        { type: 'note', title: '전세대출이라면', text: '전세자금대출의 한 달 이자와 한도는 따로 정리했어요.', link: { href: '/jeonse-loan/guide/', label: '전세자금대출 이자 보기' } },
      ] },

      { id: 's3', h2: '원리금균등 원금균등 차이는 얼마나 되나요', sub: '매달 내는 돈의 모양과 총 이자가 달라요', blocks: [
        { type: 'p', lead: true, ans: `1억·30년·연 4%면 원금균등이 총 이자 ${won(gapAD)}원 적어요.`, text: `원금균등은 원금을 매달 같게 갚아 남은 원금이 빨리 줄기 때문이에요. 대신 ${cross}회차 전까지, 약 ${crossYears}년 동안은 원리금균등보다 매달 더 내요.` },
        { type: 'table', text: true, caption: '상환방식 뜻 (한국주택금융공사 용어 안내)', headers: ['상환방식', '매달 내는 돈'], rows: [
          { cells: ['원리금균등분할상환', '대출일부터 만기일까지 매달 상환하는 원금과 이자의 합계가 같아요'] },
          { cells: ['원금균등(체감식)분할상환', '매달 같은 원금을 갚고 이자는 남은 잔액으로 계산해서 합계가 줄어들어요'] },
          { cells: ['체증식분할상환', '매달 상환하는 원금과 이자의 합계가 늘어나요'] },
        ] },
        { type: 'p', ans: `1억 30년이면 원금균등의 매달 원금은 ${won(mp)}원이에요.`, text: `마지막 달에는 남은 원금 ${won(lastPrin)}원과 이자 ${won(lastInt)}원만 내서 ${won(D.lastPayment)}원이에요.` },
        { type: 'table', net: 2, caption: '대출금별 원리금균등과 원금균등 비교 (30년, 연 4%)', headers: ['대출금', '원리금균등 매달', '원금균등 첫 달', '원리금균등 총 이자', '원금균등 총 이자'],
          rows: AMTS.map((p) => { const a = L(p, 30, 0.04), d = L(p, 30, 0.04, 'decline'); return { hi: p === 1e8, cells: [`${man(p)}원`, won(a.monthly), won(d.firstPayment), won(a.totalInterest), won(d.totalInterest)] }; }),
          fn: '단위: 원. 대출금이 클수록 두 방식의 총 이자 차이도 거의 비례해서 커져요.' },
        { type: 'tree', id: 'rpTree', questions: [
          { q: `① 첫 달 ${won(D.firstPayment)}원(1억 기준)부터 시작하는 상환액을 낼 수 있나요?`, hint: `원금균등은 이 금액에서 매달 조금씩 줄어요`, no: { title: '원리금균등이 맞아요', text: '매달 같은 금액이라 생활비 계획을 세우기 쉬워요. 총 이자는 조금 더 내요.' } },
          { q: '② 총 이자를 줄이는 게 매달 부담보다 중요한가요?', hint: '원금균등은 갈수록 매달 내는 돈이 줄어요', no: { title: '원리금균등도 괜찮아요', text: '매달 부담이 일정한 쪽을 고르고, 여유가 생기면 일부를 먼저 갚는 방법도 있어요.' } },
        ], ok: { title: '원금균등이 맞아요', text: `같은 조건에서 총 이자가 적어요. 처음 ${crossYears}년 넘게 이어지는 더 큰 상환액을 미리 확인하세요.` } },
      ] },

      { id: 's4', h2: '거치식과 만기일시 상환은 이자가 얼마나 더 나오나요', sub: '원금을 늦게 갚을수록 이자가 늘어요', blocks: [
        { type: 'p', lead: true, ans: `1억·30년·연 4%를 만기일시로 갚으면 총 이자가 원리금균등보다 ${won(gapBalloon)}원 많아요.`, text: '만기일시는 매달 이자만 내고 원금은 만기에 한 번에 갚아서, 30년 내내 1억 전체에 이자가 붙어요.' },
        { type: 'p', ans: `1년 거치하면 총 이자가 거치 없는 원리금균등보다 ${won(gapGrace)}원 늘어요.`, text: `거치기간은 원금을 갚지 않고 이자만 내는 기간이에요. 그동안은 첫 달 이자와 같은 금액만 내고, 거치가 끝나면 남은 29년 동안 매달 ${won(G.repayMonthly)}원을 내요.` },
        { type: 'table', net: 2, caption: '상환방식별 총 이자와 총 상환액 (1억, 30년, 연 4%)', headers: ['상환방식', '매달 내는 돈', '총 이자', '총 상환액'], rows: [
          { hi: true, cells: ['원리금균등', won(A.monthly), won(A.totalInterest), won(A.totalPayment)] },
          { cells: ['원금균등', `${won(D.firstPayment)} → ${won(D.lastPayment)}`, won(D.totalInterest), won(D.totalPayment)] },
          { cells: ['거치 1년 + 원리금균등', `${won(G.graceMonthlyInterest)} → ${won(G.repayMonthly)}`, won(G.totalInterest), won(G.totalPayment)] },
          { cells: ['만기일시', `${won(B.monthlyInterest)} (이자만)`, won(B.totalInterest), won(B.totalPayment)] },
        ], fn: '단위: 원. 매달 이자를 원 단위로 반올림하고 마지막 달에 남은 원금을 정산한 상환표 기준이에요.' },
        { type: 'p', ans: '만기일시 이자는 은행별 금리로 계산한 예시를 따로 정리했어요.', text: '전세대출 이자계산 글에서 1억을 은행별 공시 금리로 계산한 한 달 이자를 볼 수 있어요.', link: { label: '전세대출 이자계산', href: '/jeonse-loan/guide/' } },
      ] },

      { id: 's5', h2: '대출 이자를 줄이려면 무엇을 바꿔야 하나요', sub: '기간, 금리, 상환방식, 먼저 갚기를 봐요', blocks: [
        { type: 'p', lead: true, ans: `1억·연 4% 원리금균등을 30년에서 20년으로 줄이면 총 이자가 ${won(gap3020)}원 줄어요.`, text: `대신 매달 내는 돈은 ${won(A20.monthly)}원으로 늘어요. 같은 30년에서 금리를 연 4%에서 3%로 낮추면 총 이자가 ${won(gapRate)}원 줄어요. 상환방식을 원금균등으로 바꾸는 것도 총 이자를 줄이는 방법이에요.` },
        { type: 'table', net: 3, caption: '디딤돌대출 금리 (2026년 9월, 고정금리 또는 5년 단위 변동금리, 단위 %)', headers: ['부부합산 연소득', '10년', '15년', '20년', '30년'], rows: [
          { cells: ['2천만원 이하', '2.85', '2.95', '3.05', '3.10'] },
          { cells: ['2천만원 초과 ~ 4천만원 이하', '3.20', '3.30', '3.40', '3.45'] },
          { cells: ['4천만원 초과 ~ 7천만원 이하', '3.55', '3.65', '3.75', '3.80'] },
          { cells: ['7천만원 초과 ~ 8.5천만원 이하', '3.90', '4.00', '4.10', '4.15'] },
        ], fn: '한국주택금융공사 공시(2026.9.1). 지방 주택은 0.2%p 내려가요. 생애최초로 집을 사는 신혼가구는 30년 2.80~3.85로 금리표가 따로 있어요.' },
        { type: 'p', ans: `디딤돌 기본 금리표의 30년 최저 연 3.10%로 1억을 빌리면 매달 ${won(AD.monthly)}원이에요.`, text: `같은 1억을 연 4%로 빌릴 때보다 30년 총 이자가 ${won(derive(A.totalInterest - AD.totalInterest))}원 적어요.` },
        { type: 'tips', items: [
          { title: '디딤돌 기본 우대금리 (이 가운데 하나)', text: '다자녀 가구 0.7%p, 연소득 6천만원 이하 한부모 가구 0.5%p, 2자녀 가구 0.5%p, 1자녀 가구 0.3%p예요. 다문화·장애인·생애최초 구입·신혼가구는 0.2%p예요. 자녀 우대는 자녀 1명당 5년간, 생애최초·신혼 우대는 대출실행일부터 5년간 적용돼요.' },
          { title: '함께 받을 수 있는 우대금리', text: '청약저축 가입 기간에 따라 0.3~0.5%p, 부동산 전자계약 0.1%p(2026년 12월 31일 신규 접수분까지)예요. 대출 심사로 정한 대출 가능 금액의 30% 이하만 신청하면 0.1%p예요. 대부분 대출실행일부터 5년간 적용돼요.' },
          { title: '우대금리 상한과 최저금리', text: '우대금리는 합쳐서 최대 0.5%p(다자녀 가구 0.7%p)까지이고, 최종 금리는 최저금리 1.5%보다 낮아지지 않아요.' },
          { title: '여유가 생기면 먼저 갚기', text: '먼저 갚은 만큼 남은 원금이 줄어 다음 달부터 이자가 줄어요.' },
        ] },
        { type: 'p', ans: '먼저 갚기 전에는 중도상환수수료를 확인하세요.', text: '계약 성립 뒤 3년이 지나면 원칙적으로 중도상환수수료가 없어요. 3년 안이면 남은 기간에 비례해 수수료가 붙어요.', link: { label: '중도상환수수료 계산 방법', href: '/prepayment/guide/' } },
        { type: 'note', title: '금리를 낮추려면', text: '더 낮은 금리로 옮기는 조건과 일찍 갚을 때 수수료를 함께 보세요.', link: { href: '/refinance/guide/', label: '대환대출 조건과 방법 보기' } },
      ] },
    ],
    faq: [
      ['대출 이자는 매달 똑같이 나오나요?', `원리금균등은 원금과 이자를 합친 금액이 같을 뿐, 이자만 보면 매달 줄어요. 1억·30년·연 4%의 첫 달 이자는 ${won(firstInt)}원이지만, 원금을 갚아 나갈수록 이자 몫이 작아지고 원금 몫이 커져요.`],
      ['법으로 정한 최고 이자율이 있나요?', '이자제한법은 금전대차 계약의 최고이자율을 연 20%로 정하고 넘는 부분을 무효로 해요. 다만 인가·등록을 마친 금융회사와 대부업에는 이 법을 적용하지 않아요. 은행 대출은 계약 전에 금리와 변동 여부를 설명받게 돼 있으니 상품설명서로 확인하세요.'],
    ],
    summary: [
      '이자는 남은 원금에 붙어요. 원금을 빨리 갚는 방식일수록 총 이자가 줄어요.',
      '원리금균등은 매달 같은 금액, 원금균등은 첫 부담이 크지만 총 이자가 적어요.',
      '만기일시와 거치식은 원금을 늦게 갚는 만큼 총 이자가 늘어요.',
      '기간을 줄이거나 금리를 낮추면 총 이자가 크게 달라져요. 매달 감당할 수 있는 금액부터 정하세요.',
    ],
    sources: [
      ['법령', '이자제한법 제2조(이자의 최고한도, 초과 부분 무효, 10만원 미만 제외), 제7조(인가·허가·등록 금융업과 대부업 적용 제외). 이자제한법 제2조제1항의 최고이자율에 관한 규정(연 20퍼센트). 금융소비자 보호에 관한 법률 제20조 제1항 제4호 나목(중도상환수수료 3년).'],
      ['정부 안내', '한국주택금융공사 월별상환원리금 계산기 용어 안내(원리금균등·원금균등·체증식 분할상환, 거치기간, 달별 납부액 차이). 한국주택금융공사 디딤돌대출 금리안내(2026.9.1 공시, 우대금리). 전국은행연합회 소비자포털 가계대출금리 비교공시(기준금리·가산금리·가감조정금리 구분), 대출금리에 대한 이해.'],
      ['계산', `월 상환액과 총 이자는 대출 계산기 산식(원리금균등·원금균등·만기일시·거치식, 매달 이자 원 단위 반올림, 마지막 달 잔액 정산)으로 계산했어요 (${VERIFIED}).`],
    ],
    claims: [
      { src: 1, quote: '원리금 균등분할상환 : 대출일부터 만기일까지 매월 상환하는 원금과 이자의 합계가 동일', note: '원리금균등 정의' },
      { src: 1, quote: '매월 동일한 원금이 상환되고 이자는 대출잔액에 따라 계산되어, 매월 상환하는 원금과 이자의 합계가 감소', note: '원금균등 정의' },
      { src: 1, quote: '체증식 분할상환 : 대출일부터 만기일까지 매월 상환하는 원금과 이자의 합계가 증가', note: '체증식 정의' },
      { src: 1, quote: '거치기간 : 원금 상환없이 이자만 납부하는 기간', note: '거치기간 정의' },
      { src: 1, quote: '대출만기까지 납부하시는 총 금액에는 차이가 없습니다', note: '달별 납부액 차이' },
      { src: 6, quote: '금전대차에 관한 계약상의 최고이자율은 연 20퍼센트로 한다', note: '최고이자율' },
      { src: 5, quote: '계약상의 이자로서 제1항에서 정한 최고이자율을 초과하는 부분은 무효로 한다', note: '초과 이자 무효' },
      { src: 5, quote: '다른 법률에 따라 인가ㆍ허가ㆍ등록을 마친 금융업 및 대부업', note: '적용 제외' },
      { src: 5, quote: '대차원금이 10만원 미만인 대차의 이자에 관하여는 제1항을 적용하지 아니한다', note: '10만원 미만 제외' },
      { src: 3, quote: '대출금리(기준금리, 가산금리 및 가감조정금리로 구분)', note: '대출금리 구분' },
      { src: 4, quote: '20백만원 이하 2.85 2.95 3.05 3.10', note: '디딤돌 금리 2026.9' },
      { src: 4, quote: '현재 최저금리 1.5%이며 우대금리 적용 상한은 최대 0.5%p. 단, 다자녀 가구는 최대 0.7%p', note: '디딤돌 우대 상한' },
      { src: 7, quote: '1) 대출계약이 성립한 날부터 3년 이내에 상환하는 경우', note: '중도상환수수료 3년' },
    ],
    related: [
      { kind: '계산기', label: '대출 이자 계산기', href: '/repayment/' },
      { kind: '대출 가이드', label: '대환대출 조건과 방법', href: '/refinance/guide/' },
      { kind: '대출 가이드', label: '중도상환수수료 계산 방법', href: '/prepayment/guide/' },
    ],
  };
}
