/**
 * 글 스펙: 종합부동산세
 *   숫자는 전부 엔진(comprehensive-real-estate-tax)이 만든다.
 *   공제액·납부기간 문장은 claims 로 종합부동산세법 원문을 인용해 둔다.
 */
import { won, man } from '../render.mjs';

export default function article({ calculators, loadSpec, VERIFIED, derive = (v) => v }) {
  const spec = loadSpec('realestate/comprehensive-real-estate-tax');
  const cr = (o) => calculators['comprehensive-real-estate-tax']({ value1: 0, value2: 0, value3: 0, age: 50, holdingYears: 3, ...o }, spec);

  const R = cr({ value1: 1.5e9 });                       // 대표: 1주택 공시가 15억
  const NONE = cr({ value1: 1.2e9 });                    // 12억이면 0원
  const ONE = [1.2e9, 1.5e9, 2e9, 3e9].map((v) => ({ v, r: cr({ value1: v }) }));
  const TWO = cr({ value1: 1e9, value2: 8e8 });
  const THREE = cr({ value1: 1e9, value2: 8e8, value3: 6e8 });
  const A65 = cr({ value1: 3e9, age: 65, holdingYears: 10 });
  const A70 = cr({ value1: 3e9, age: 70, holdingYears: 15 });
  const BASE30 = cr({ value1: 3e9 });

  const agePct = derive(Math.round(A65.ageCredit / A65.calcTax * 100));       // 65세 이상 공제율
  const holdPct = derive(Math.round(A65.holdingCredit / A65.calcTax * 100));  // 10년 이상 공제율
  const agePct70 = derive(Math.round(A70.ageCredit / A70.calcTax * 100));
  const holdPct15 = derive(Math.round(A70.holdingCredit / A70.calcTax * 100));
  const creditGap = derive(BASE30.payableTax - A65.payableTax);
  const homeGap = derive(spec.constants.ONE_HOME_DEDUCTION - spec.constants.GENERAL_DEDUCTION);
  const HOMETAX = 'https://www.hometax.go.kr';

  return {
    slug: 'comprehensive-real-estate-tax-guide', cat: 'realestate', catLabel: '부동산', crumb: '종합부동산세',
    title: '종합부동산세 대상과 계산, 공시가 합산부터 1주택 공제까지',
    description: `가진 집의 공시가격을 합쳐 9억원, 1세대 1주택은 12억원을 넘으면 종합부동산세 대상이에요. 공시가 15억원인 한 채면 ${won(R.payableTax)}원이에요. 합산 기준, 세율, 재산세액공제, 고령자와 장기보유 공제를 정리했어요.`,
    datePublished: '2026-09-03', verified: VERIFIED, basis: '2026년 9월 기준', readMinutes: 8,
    badge: `종합부동산세법 공제액과 세율표 대조 · ${VERIFIED}`,
    calc: { href: '/realestate/comprehensive-real-estate-tax/', label: '종합부동산세 계산기 바로가기' },
    hero: {
      tag: '부동산', line1: '종합부동산세 대상과 계산', line2: '나도 내나요',
      sub1: '1세대 1주택은 공시가 12억원까지 세금이 없어요',
      sub2: `공시가 15억원 한 채면 농어촌특별세까지 ${won(R.payableTax)}원`,
      foot: `종합부동산세법 공제액과 세율표 대조 · ${VERIFIED} 검증`,
      card: { label: '종합부동산세', big: won(R.payableTax), unit: '원', l1: '1주택 공시가격 15억원', l2: '농어촌특별세 포함' },
      alt: `종합부동산세 계산. 공시가격 15억원인 1주택은 ${won(R.payableTax)}원`,
    },
    intro: `종합부동산세는 재산세를 낸 뒤 한 번 더 붙는 국세로, 줄여서 종부세라고 불러요. 6월 1일 기준으로 내가 가진 주택의 공시가격을 모두 더하고, 거기서 기본공제를 뺀 금액에만 붙어요. 1세대 1주택은 12억원, 그 밖에는 9억원을 빼 줘요. 공시가격 12억원인 한 채라면 세금이 0원이고, 15억원이면 ${won(R.payableTax)}원이에요. 대상 판단, 계산 순서, 재산세액공제, 고령자와 장기보유 공제를 차례로 정리했어요.`,
    answer: {
      label: '공시가격을 눌러서 1주택 종합부동산세를 확인해 보세요',
      quick: [1.5e9, 2e9, 3e9].map((v) => {
        const r = cr({ value1: v });
        return { chip: `${man(v)}원`, selected: v === 1.5e9, big: `${won(r.payableTax)}원`, unit: '종합부동산세', sub: `과세표준 ${won(r.taxableBase)}원 · 농어촌특별세 ${won(r.ruralTax)}원 포함` };
      }),
      boxes: [
        { title: '1주택은 12억까지 안 내요', text: `공시가격 12억원인 한 채라면 종합부동산세는 ${won(NONE.payableTax)}원이에요` },
        { title: '집이 여러 채면 공제가 9억원', text: `1세대 1주택보다 ${won(homeGap)}원 적게 빼 줘서 세금이 빨리 붙어요` },
      ],
    },
    keyPoints: {
      title: '한눈에 보는 종합부동산세',
      rows: [
        ['과세 기준일', '재산세와 같은 6월 1일이에요'],
        ['대상', '내가 가진 주택 공시가격 합계가 공제액을 넘는 사람. 다주택이면 더 빨리 넘어요'],
        ['기본공제', '1세대 1주택 12억원, 그 밖에는 9억원'],
        ['과세표준', '공제 후 남은 금액에 공정시장가액비율 60%를 곱해요'],
        ['세율', '과세표준 구간에 따라 0.5%부터 2.7%까지'],
        ['재산세액공제', '같은 집에 이미 낸 재산세만큼은 빼 줘요'],
        ['1주택 추가 공제', '60세 이상 고령자 공제와 5년 이상 장기보유 공제를 합쳐 최대 80%'],
        ['납부', '12월 1일부터 15일까지 내요. 농어촌특별세가 20% 더 붙어요'],
      ],
    },
    sections: [
      { id: 's1', h2: '종합부동산세 대상은 누구인가요', sub: '공시가격 합계가 공제액을 넘으면 대상이에요', blocks: [
        { type: 'p', lead: true, ans: '가진 집의 공시가격을 모두 더해 1세대 1주택은 12억원, 그 밖에는 9억원을 넘으면 대상이에요.', text: '시세가 아니라 공시가격 기준이고, 대출이나 전세보증금은 빼 주지 않아요. 6월 1일에 등기부상 소유자인 사람이 그해 대상자가 돼요.' },
        { type: 'table', text: true, caption: '종합부동산세 과세 대상 판단 기준', headers: ['상황', '대상 여부'], rows: [
          { cells: ['1세대 1주택, 공시가격 12억원 이하', '대상이 아니에요'] },
          { cells: ['1세대 1주택, 공시가격 12억원 초과', '넘는 금액에만 세금이 붙어요'] },
          { cells: ['부부 공동명의 한 채', '각자 지분만큼 나눠 판단해요. 특례를 신청할 수도 있어요'] },
          { cells: ['두 채 이상 보유', '합계가 9억원을 넘으면 대상이에요'] },
          { cells: ['등록 임대주택', '요건을 갖추면 합산에서 빼 줘요'] },
          { cells: ['지방 저가주택과 상속주택', '요건을 채우면 1주택 판정에서 빼 주는 특례가 있어요'] },
        ], fn: '기본공제와 합산 제외 주택은 종합부동산세법 제8조에 있어요. 납세의무자는 같은 법 제7조제1항이에요.' },
        { type: 'note', title: '재산세를 냈다고 끝이 아니에요', text: '종합부동산세는 재산세와 별개로 국세청이 따로 매겨요. 대신 같은 집에 이미 낸 재산세만큼은 빼 줘서 중복으로 내지는 않아요.' },
      ] },

      { id: 's2', h2: '종합부동산세 계산, 공시가 합산부터 어떻게 하나요', sub: '공제 후 금액에 60%를 곱해요', blocks: [
        { type: 'p', lead: true, ans: `공시가격 15억원인 한 채라면 과세표준은 ${won(R.taxableBase)}원이고 세금은 ${won(R.payableTax)}원이에요.`, text: `12억원을 뺀 ${won(R.excess)}원에 공정시장가액비율 60%를 곱해 과세표준을 만들어요. 여기에 세율을 적용한 뒤 이미 낸 재산세 ${won(R.propertyTaxCredit)}원을 빼고, 마지막에 농어촌특별세를 더해요.` },
        { type: 'flow', label: '종합부동산세 계산 순서', steps: [
          { label: '공시가격 합계', value: '15억원', sub: '가진 집을 모두 더해요', op: '−' },
          { label: '기본공제', value: '12억원', sub: '1세대 1주택 기준', op: '×' },
          { label: '공정시장가액비율', value: '60%', sub: `과세표준 ${won(R.taxableBase)}원`, op: '=' },
          { label: '납부할 세금', value: `${won(R.payableTax)}원`, sub: `재산세액공제와 농어촌특별세 반영` },
        ] },
        { type: 'table', net: 2, caption: '주택분 종합부동산세 세율 (2주택 이하 기준)', headers: ['과세표준', '세율', '누진공제액'],
          rows: spec.tables.bracketsBasic.brackets.map((b) => ({ cells: [b.upperBound === null ? '94억원 초과' : `${man(b.upperBound)}원 이하`, `${(b.rate * 100).toFixed(1)}%`, b.progressiveDeduction === 0 ? '없음' : `${won(b.progressiveDeduction)}원`] })),
          fn: '종합부동산세법 제9조제1항제1호의 세율이에요. 3주택 이상이고 과세표준이 12억원을 넘으면 더 높은 세율표를 써요.' },
        { type: 'table', id: 'crTbl', compact: true, x: [1, 2], net: 5, caption: '1주택 공시가격별 종합부동산세 (60세 미만, 보유 3년 기준)', headers: ['공시가격', '공제 후 금액', '과세표준', '재산세액공제', '농어촌특별세', '납부할 세금'],
          rows: ONE.map(({ v, r }) => ({ hi: v === 1.5e9, cells: [`${man(v)}원`, won(r.excess), won(r.taxableBase), won(r.propertyTaxCredit), won(r.ruralTax), won(r.payableTax)] })),
          moreLabel: '과세표준까지 보기',
          fn: '단위: 원. 고령자와 장기보유 공제를 넣지 않은 금액이에요. 조건을 채우면 크게 줄어요.' },
        { type: 'widget', label: '내 종합부동산세 계산', title: '1주택 기준으로 바로 보기', note: '공시가격과 나이, 보유 연수를 넣으면 세금이 바로 나와요. 1세대 1주택 한 채를 기준으로 계산하고, 합산 제외 주택이나 부부 공동명의 특례는 넣지 않았어요.',
          inputs: [
            { id: 'cv', label: '공시가격 (억원)', type: 'number', value: 15, min: 0, max: 200, step: 0.5 },
            { id: 'ca', label: '나이', type: 'number', value: 50, min: 20, max: 100, step: 1 },
            { id: 'cy', label: '보유 연수', type: 'number', value: 3, min: 0, max: 50, step: 1 },
          ],
          outputs: [{ id: 'cbase2', label: '과세표준' }, { id: 'ccalc', label: '재산세 공제 후' }, { id: 'ccred', label: '1주택 세액공제' }, { id: 'cpay', label: '납부할 세금' }],
          port: `
  var CBAS = ${JSON.stringify(spec.tables.bracketsBasic.brackets.map((b) => [b.upperBound, b.rate, b.progressiveDeduction]))};
  var CPT = ${JSON.stringify(spec.tables.propertyTaxBrackets.brackets.map((b) => [b.upperBound, b.rate, b.progressiveDeduction]))};
  function ptStd(base){ for (var i = 0; i < CPT.length; i++) { if (CPT[i][0] === null || base <= CPT[i][0]) return Math.max(0, Math.floor(base * CPT[i][1] - CPT[i][2])); } return 0; }
  function cret(value, age, hy){
    if (value <= 0) return { base: 0, calc: 0, credit: 0, pay: 0 };
    var fmr = value <= 300000000 ? ${spec.constants.PROPERTY_FMR_ONE_HOME_UNDER_3EOK} : value <= 600000000 ? ${spec.constants.PROPERTY_FMR_ONE_HOME_3_TO_6EOK} : ${spec.constants.PROPERTY_FMR_ONE_HOME_OVER_6EOK};
    var propertyTax = ptStd(Math.floor(value * fmr));
    var excess = Math.max(0, value - ${spec.constants.ONE_HOME_DEDUCTION});
    var base = Math.floor(excess * ${spec.constants.FAIR_MARKET_RATIO});
    var before = 0;
    if (base > 0) { for (var i = 0; i < CBAS.length; i++) { if (CBAS[i][0] === null || base <= CBAS[i][0]) { before = Math.max(0, Math.floor(base * CBAS[i][1] - CBAS[i][2])); break; } } }
    var pcred = 0;
    if (before > 0) {
      var aggPT = ptStd(Math.floor(value * fmr));
      var numerator = (base * Math.round(fmr * 1000) * Math.round(${spec.constants.PROPERTY_TOP_RATE} * 10000)) / 1e7;
      var ratio = aggPT > 0 ? Math.floor((numerator / aggPT) * 1e8) / 1e8 : 0;
      pcred = Math.floor(propertyTax * ratio);
    }
    var calc = Math.max(0, before - pcred);
    var ageRate = age >= 70 ? 0.40 : age >= 65 ? 0.30 : age >= 60 ? 0.20 : 0;
    var holdRate = hy >= 15 ? 0.50 : hy >= 10 ? 0.40 : hy >= 5 ? 0.20 : 0;
    var credit = Math.min(Math.floor(calc * ageRate) + Math.floor(calc * holdRate), Math.floor(calc * ${spec.constants.CREDIT_CAP}));
    var comp = calc - credit;
    var rural = Math.floor(comp * ${spec.constants.RURAL_TAX_RATE});
    return { base: base, calc: calc, credit: credit, pay: comp + rural };
  }`,
          js: `
  function crrender(){ var v=(+document.getElementById('cv').value||0)*1e8, a=+document.getElementById('ca').value||0, y=+document.getElementById('cy').value||0; var r=cret(v,a,y);
    document.getElementById('cbase2').textContent=won(r.base)+'원'; document.getElementById('ccalc').textContent=won(r.calc)+'원'; document.getElementById('ccred').textContent=won(r.credit)+'원'; document.getElementById('cpay').textContent=won(r.pay)+'원'; }
  ['cv','ca','cy'].forEach(function(id){document.getElementById(id).addEventListener('input',crrender)}); crrender();`,
          check: (port) => {
            let n = 0, bad = 0;
            for (let v = 0; v <= 60; v += 0.5) for (const a of [50, 60, 65, 70]) for (const y of [0, 5, 10, 15]) {
              n++;
              const e = cr({ value1: v * 1e8, age: a, holdingYears: y });
              const q = port.cret(v * 1e8, a, y);
              if (q.pay !== e.payableTax || q.base !== e.taxableBase || q.calc !== e.calcTax) bad++;
            }
            return { n, bad };
          },
        },
      ] },

      { id: 's3', h2: '1세대 1주택 12억 공제, 여러 채면 어떻게 되나요', sub: '집이 여러 채면 9억원이에요', blocks: [
        { type: 'p', lead: true, ans: `맞아요. 1세대 1주택은 12억원, 그 밖에는 9억원을 빼 줘요.`, text: `공제 차이가 ${won(homeGap)}원이라 다주택자는 종부세가 훨씬 빨리 붙어요. 공시가격 10억원과 8억원인 집 두 채를 갖고 있으면 합계 18억원에서 9억원만 빼서 세금이 ${won(TWO.payableTax)}원이에요.` },
        { type: 'table', net: 3, caption: '보유 주택 수에 따른 종합부동산세', headers: ['보유 상황', '공시가 합계', '기본공제', '과세표준', '납부할 세금'], rows: [
          { hi: true, cells: ['1주택 15억', `${won(R.totalValue)}원`, `${won(R.deduction)}원`, `${won(R.taxableBase)}원`, `${won(R.payableTax)}원`] },
          { cells: ['2주택 10억 + 8억', `${won(TWO.totalValue)}원`, `${won(TWO.deduction)}원`, `${won(TWO.taxableBase)}원`, `${won(TWO.payableTax)}원`] },
          { cells: ['3주택 10억 + 8억 + 6억', `${won(THREE.totalValue)}원`, `${won(THREE.deduction)}원`, `${won(THREE.taxableBase)}원`, `${won(THREE.payableTax)}원`] },
        ], fn: '기본공제 금액은 종합부동산세법 제8조제1항이에요. 3주택 이상이고 과세표준이 12억원을 넘으면 중과 세율표가 적용돼요.' },
        { type: 'tips', items: [
          { title: '부부 공동명의는 계산이 달라요', text: '각자 지분만큼 나눠 각각 9억원씩 빼는 방식과, 한 사람이 1주택자로 신청해 12억원을 빼고 고령자 공제를 받는 방식 중 유리한 쪽을 고를 수 있어요.' },
          { title: '합산에서 빠지는 집이 있어요', text: '요건을 갖춘 등록 임대주택, 사원용 주택, 미분양주택은 합산에서 빼 줘요. 매년 9월에 합산배제 신고를 해요.' },
          { title: '상속주택과 지방 저가주택', text: '조건을 채우면 1주택 판정에서 빼 줘요. 상속받은 지 얼마 안 된 집이 있다면 꼭 확인하세요.' },
        ] },
      ] },

      { id: 's4', h2: '재산세액공제와 고령자 장기보유 공제는 얼마인가요', sub: '이중과세를 막고 1주택을 더 깎아 줘요', blocks: [
        { type: 'p', lead: true, ans: `공시가 15억원 한 채면 이미 낸 재산세 중 ${won(R.propertyTaxCredit)}원을 빼 줘요.`, text: '같은 집에 재산세와 종합부동산세가 겹치는 부분을 덜어 주는 장치예요. 여기에 1세대 1주택이면 나이와 보유 기간에 따른 공제가 더해져요.' },
        { type: 'table', text: true, caption: '1세대 1주택 세액공제율', headers: ['구분', '공제율'], rows: [
          { cells: ['만 60세 이상', `산출세액의 ${derive(20)}%`] },
          { cells: ['만 65세 이상', `산출세액의 ${agePct}%`] },
          { cells: ['만 70세 이상', `산출세액의 ${agePct70}%`] },
          { cells: ['5년 이상 보유', `산출세액의 ${derive(20)}%`] },
          { cells: ['10년 이상 보유', `산출세액의 ${holdPct}%`] },
          { cells: ['15년 이상 보유', `산출세액의 ${holdPct15}%`] },
          { cells: ['두 공제를 함께 받으면', '합쳐서 최대 80%까지 받을 수 있어요'] },
        ], fn: '고령자 공제는 종합부동산세법 제9조제6항, 장기보유 공제는 같은 조 제8항이에요. 두 공제의 합계 한도는 같은 조 제5항에 있어요.' },
        { type: 'table', net: 3, caption: '공시가 30억원 한 채일 때 세액공제 효과', headers: ['조건', '재산세 공제 후', '세액공제', '납부할 세금'], rows: [
          { cells: ['50세 · 보유 3년', `${won(BASE30.calcTax)}원`, `${won(BASE30.creditTotal)}원`, `${won(BASE30.payableTax)}원`] },
          { hi: true, cells: ['65세 · 보유 10년', `${won(A65.calcTax)}원`, `${won(A65.creditTotal)}원`, `${won(A65.payableTax)}원`] },
          { cells: ['70세 · 보유 15년', `${won(A70.calcTax)}원`, `${won(A70.creditTotal)}원`, `${won(A70.payableTax)}원`] },
        ], fn: `농어촌특별세를 포함한 금액이에요. 65세에 10년을 보유했다면 세금이 ${won(creditGap)}원 줄어요.` },
        { type: 'note', title: '세부담 상한도 있어요', text: '재산세와 종합부동산세를 합친 금액이 지난해의 150%를 넘으면 넘는 부분은 없는 것으로 봐요. 공시가격이 갑자기 올라도 한 번에 뛰지 않아요.' },
      ] },

      { id: 's5', h2: '종합부동산세 언제 어떻게 내나요', sub: '12월 1일부터 15일까지', blocks: [
        { type: 'p', lead: true, ans: '국세청이 고지서를 보내 주면 12월 1일부터 15일까지 내면 돼요.', text: '따로 신고하지 않아도 고지서가 와요. 고지 내용이 다르다고 생각하면 같은 기간에 직접 신고하는 방식으로 바꿀 수 있어요.' },
        { type: 'timeline', label: '종합부동산세 한 해 일정', items: [
          { step: '6월 1일', title: '과세기준일', text: '이날 소유자가 그해 종합부동산세 대상자가 돼요' },
          { step: '9월', title: '합산배제 신고', text: '임대주택이나 사원용 주택을 합산에서 빼려면 이때 신고해요' },
          { step: '11월 말', title: '고지서 발송', text: '국세청이 과세표준과 세액을 적은 고지서를 보내요' },
          { step: '12월', title: '납부', text: '12월 1일부터 15일까지 내요. 금액이 크면 나눠 낼 수 있어요', mark: true, tag: '12월 1일부터 15일' },
        ] },
        { type: 'tips', items: [
          { title: '홈택스에서 미리 볼 수 있어요', text: '고지서가 오기 전에도 홈택스에서 과세 대상과 예상 세액을 확인할 수 있어요.' },
          { title: '농어촌특별세가 따로 붙어요', text: '종합부동산세액의 20%가 농어촌특별세로 함께 고지돼요. 고지서 합계 금액에 이미 들어가 있어요.' },
          { title: '금액이 크면 나눠 낼 수 있어요', text: '납부할 세액이 일정 금액을 넘으면 일부를 다음 해로 미뤄 낼 수 있어요. 고지서에 안내가 함께 나와요.' },
        ] },
        { type: 'steps', items: [
          { title: '공시가격 확인', text: '내가 가진 집의 공시가격을 모두 더해 공제액을 넘는지 봐요', meta: '4월 이후' },
          { title: '세액 미리 계산', text: '공시가격과 나이, 보유 기간을 넣어 예상 세액을 확인해요', meta: '2분', link: { label: '종합부동산세 계산기', href: '/realestate/comprehensive-real-estate-tax/' } },
          { title: '고지서 확인과 납부', text: '홈택스에서 고지 내용을 보고 12월 15일까지 납부해요', meta: '12월', link: { label: '홈택스 바로가기', href: HOMETAX } },
        ] },
      ] },
    ],
    faq: [
      ['종합부동산세 대상은 누구인가요?', '6월 1일 기준으로 가진 집의 공시가격 합계가 1세대 1주택은 12억원, 그 밖에는 9억원을 넘는 사람이에요.'],
      ['종합부동산세 계산은 어떻게 하나요?', `공시가격 합계에서 기본공제를 빼고 60%를 곱해 과세표준을 만들어요. 공시가 15억원 한 채면 <b>${won(R.payableTax)}원</b>이에요.`],
      ['1세대 1주택은 12억까지 공제되나요?', `맞아요. 공시가격 12억원인 한 채면 세금이 ${won(NONE.payableTax)}원이에요. 여러 채면 합계에서 9억원만 빼 줘요.`],
      ['재산세액공제는 무엇인가요?', `같은 집에 이미 낸 재산세 중 겹치는 부분을 빼 주는 제도예요. 공시가 15억원 한 채면 ${won(R.propertyTaxCredit)}원을 빼 줘요.`],
      ['고령자 장기보유 공제는 얼마인가요?', `1세대 1주택이면 60세부터 나이별로, 5년 이상 보유하면 기간별로 깎아 줘요. 둘을 합쳐 최대 80%까지 받아요.`],
      ['종합부동산세는 언제 내나요?', '12월 1일부터 15일까지 내요. 국세청이 고지서를 보내 주고, 직접 신고하는 방식으로 바꿀 수도 있어요.'],
      ['부부 공동명의가 유리한가요?', '경우에 따라 달라요. 각자 9억원씩 빼는 쪽과 한 사람이 1주택자로 12억원을 빼고 고령자 공제를 받는 쪽 중 유리한 것을 고르면 돼요.'],
    ],
    summary: [
      '공시가격 합계가 1세대 1주택 12억원, 그 밖에는 9억원을 넘으면 대상이에요.',
      `공제 후 금액에 60%를 곱해 과세표준을 만들어요. 공시가 15억원 한 채면 ${won(R.payableTax)}원이에요.`,
      '이미 낸 재산세는 빼 주고, 1주택은 고령자와 장기보유 공제를 최대 80%까지 더 받아요.',
      '12월 1일부터 15일까지 고지서로 내요. 농어촌특별세 20%가 함께 붙어요.',
    ],
    sources: [
      ['법령', '종합부동산세법 제7조(납세의무자), 제8조(과세표준과 기본공제 12억원·9억원, 합산배제), 제9조(세율, 재산세액공제, 고령자·장기보유 세액공제와 80% 한도), 제10조(세부담의 상한 150%), 제16조(12월 1일부터 15일까지 부과·징수). 종합부동산세법 시행령 제2조의4(공정시장가액비율 60%). 농어촌특별세법(종합부동산세액에 대한 농어촌특별세).'],
      ['정부 도구', `홈택스 종합부동산세 화면의 공제액과 세율 구조가 이 글의 계산과 같아요 (${VERIFIED} 대조).`],
    ],
    claims: [
      { src: 1, quote: '대통령령으로 정하는 1세대 1주택자(이하 “1세대 1주택자”라 한다): 12억원', note: '1세대 1주택 기본공제 12억원 (종합부동산세법 제8조①1)' },
      { src: 1, quote: '제1호 및 제2호에 해당하지 아니하는 자: 9억원', note: '그 밖의 기본공제 9억원 (제8조①3)' },
      { src: 1, quote: '주택분 과세표준 금액에 대하여 해당 과세대상 주택의 주택분 재산세로 부과된 세액', note: '재산세액공제 (제9조③)' },
      { src: 1, quote: '공제율 합계 100분의 80의 범위에서 중복하여 적용할 수 있다', note: '고령자·장기보유 공제 합계 한도 80% (제9조⑤)' },
      { src: 1, quote: '과세기준일 현재 만 60세 이상인 1세대 1주택자의 공제액', note: '고령자 세액공제 (제9조⑥)' },
      { src: 1, quote: '해당 연도 12월 1일부터 12월 15일(이하 “납부기간”이라 한다)까지 부과ㆍ징수한다', note: '납부기간 (제16조①)' },
      { src: 1, quote: '100분의 150을 초과하는 경우에는 그 초과하는 세액에 대해서는', note: '세부담 상한 150% (제10조)' },
      { src: 2, quote: '“대통령령으로 정하는 공정시장가액비율”이란 100분의 60을 말하되', note: '공정시장가액비율 60% (시행령 제2조의4①)' },
    ],
    related: [
      { kind: '계산기', label: '종합부동산세 계산기', href: '/realestate/comprehensive-real-estate-tax/' },
      { kind: '부동산 계산기', label: '재산세 계산기', href: '/realestate/property-tax/' },
      { kind: '부동산 가이드', label: '재산세 계산과 납부', href: '/realestate/property-tax-guide/' },
    ],
  };
}
