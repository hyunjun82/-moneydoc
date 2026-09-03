/**
 * 글 스펙: 재산세
 *   숫자는 전부 엔진(property-tax)이 만든다.
 *   과세기준일·납기·분할납부 문장은 claims 로 법령 원문을 인용해 둔다.
 */
import { won, man } from '../render.mjs';

export default function article({ calculators, loadSpec, VERIFIED, derive = (v) => v }) {
  const spec = loadSpec('realestate/property-tax');
  const pt = (publicValue, isOneHomeUnder9Eok = false) =>
    calculators['property-tax']({ publicValue, isOneHomeUnder9Eok }, spec);

  const VALUES = [1e8, 2e8, 3e8, 5e8, 8e8].map((v) => ({ v, gen: pt(v), one: pt(v, true) }));
  const R = pt(5e8);                                   // 대표: 공시가격 5억, 1세대 1주택이 아닌 경우
  const R1 = pt(5e8, true);                            // 같은 공시가격, 1세대 1주택 특례
  const BIG = pt(1e9);
  const oneGap = derive(R.totalTax - R1.totalTax);
  const half = derive(Math.round(R.totalTax / 2));
  const BR = spec.tables.brackets.brackets;
  const BR1 = spec.tables.bracketsOneHomeUnder9Eok.brackets;
  const WETAX = 'https://www.wetax.go.kr';
  const REALTY = 'https://www.realtyprice.kr';

  return {
    slug: 'property-tax-guide', cat: 'realestate', catLabel: '부동산', crumb: '재산세',
    title: '재산세 계산과 납부, 공시가격부터 특례세율과 7월 9월 분납까지',
    description: `공시가격 5억원인 집의 재산세는 지방교육세까지 ${won(R.totalTax)}원이에요. 1세대 1주택 특례세율을 받으면 ${won(R1.totalTax)}원으로 줄어요. 과세표준 계산, 세율 구간, 7월과 9월 납기, 조회와 카드 납부를 정리했어요.`,
    datePublished: '2026-09-03', verified: VERIFIED, basis: '2026년 9월 기준', readMinutes: 7,
    badge: `지방세법 세율표와 공정시장가액비율 대조 · ${VERIFIED}`,
    calc: { href: '/property-tax/calculator/', label: '재산세 계산기 바로가기' },
    hero: {
      tag: '부동산', line1: '재산세 계산과 납부', line2: '올해 얼마 나오나',
      sub1: `공시가격 5억 → ${won(R.totalTax)}원`,
      sub2: `1세대 1주택 특례를 받으면 ${won(R1.totalTax)}원`,
      foot: `지방세법 세율표와 공정시장가액비율 대조 · ${VERIFIED} 검증`,
      card: { label: '재산세 합계', big: won(R.totalTax), unit: '원', l1: '공시가격 5억원', l2: '지방교육세 포함' },
      alt: `재산세 계산. 공시가격 5억원인 집의 재산세는 ${won(R.totalTax)}원`,
    },
    intro: `재산세는 6월 1일에 집을 갖고 있는 사람에게 붙는 세금이에요. 시세가 아니라 공시가격을 기준으로 하고, 거기에 공정시장가액비율을 곱해 과세표준을 만들어요. 공시가격 5억원인 집이라면 과세표준은 ${won(R.taxableBase)}원이고, 재산세 ${won(R.propertyTax)}원에 지방교육세 ${won(R.educationTax)}원을 더해 ${won(R.totalTax)}원이에요. 1세대 1주택이고 공시가격이 9억원 이하면 세율이 더 낮아져 ${won(R1.totalTax)}원이 돼요. 과세표준, 세율, 납기, 조회 방법을 차례로 정리했어요.`,
    answer: {
      label: '내 공시가격을 눌러서 재산세를 확인해 보세요',
      quick: [2e8, 5e8, 8e8].map((v) => {
        const r = pt(v);
        return { chip: `${man(v)}원`, selected: v === 5e8, big: `${won(r.totalTax)}원`, unit: '재산세 합계', sub: `재산세 ${won(r.propertyTax)}원 + 지방교육세 ${won(r.educationTax)}원` };
      }),
      boxes: [
        { title: '6월 1일 소유자가 1년치를 내요', text: '5월 31일에 팔면 안 내고, 6월 2일에 팔아도 그해 재산세는 내야 해요' },
        { title: `1세대 1주택이면 ${won(oneGap)}원 적어요`, text: '공시가격 9억원 이하인 한 채라면 낮은 특례세율이 적용돼요' },
      ],
    },
    keyPoints: {
      title: '한눈에 보는 재산세',
      rows: [
        ['과세 기준일', '매년 6월 1일. 그날의 소유자가 그해 재산세를 내요'],
        ['과세표준', '공시가격에 공정시장가액비율을 곱한 금액'],
        ['공정시장가액비율', '주택은 60%. 1세대 1주택은 공시가격에 따라 43%에서 45%'],
        ['세율', '과세표준 구간에 따라 0.1%부터 0.4%까지'],
        ['특례세율', '1세대 1주택으로 공시가격 9억원 이하면 0.05%부터 0.35%'],
        ['공시가 5억이면', `재산세 ${won(R.propertyTax)}원, 지방교육세 ${won(R.educationTax)}원, 합계 ${won(R.totalTax)}원`],
        ['납기', '주택은 7월과 9월에 절반씩. 세액이 20만원 이하면 7월에 한 번'],
        ['분할납부', '납부세액이 250만원을 넘으면 일부를 3개월 안에 나눠 낼 수 있어요'],
      ],
    },
    sections: [
      { id: 's1', h2: '재산세 과세표준, 공시가격에서 어떻게 정해지나요', sub: '공시가격에 공정시장가액비율을 곱해요', blocks: [
        { type: 'p', lead: true, ans: `공시가격 5억원에 60%를 곱한 ${won(R.taxableBase)}원이 과세표준이에요.`, text: '실제 거래 시세가 아니라 정부가 매년 정하는 공시가격이 출발점이에요. 여기에 공정시장가액비율을 곱해 과세표준을 낮춰 주고, 그 과세표준에 세율을 적용해요.' },
        { type: 'flow', label: '재산세 계산 순서', steps: [
          { label: '공시가격', value: '5억원', sub: '매년 정부가 공시', op: '×' },
          { label: '공정시장가액비율', value: '60%', sub: '1주택은 43~45%', op: '=' },
          { label: '과세표준', value: `${won(R.taxableBase)}원`, sub: '세율을 곱하는 금액', op: '→' },
          { label: '재산세 합계', value: `${won(R.totalTax)}원`, sub: `지방교육세 ${won(R.educationTax)}원 포함` },
        ] },
        { type: 'table', text: true, caption: '주택 재산세 공정시장가액비율', headers: ['구분', '비율'], rows: [
          { cells: ['일반 주택', '공시가격의 60%'] },
          { cells: ['1세대 1주택, 공시가격 3억원 이하', '공시가격의 43%'] },
          { cells: ['1세대 1주택, 3억원 초과 6억원 이하', '공시가격의 44%'] },
          { cells: ['1세대 1주택, 6억원 초과', '공시가격의 45%'] },
        ], fn: '지방세법 시행령 제109조제1항제2호 기준이에요. 1세대 1주택 우대 비율은 공시가격이 9억원을 넘는 주택에도 적용돼요.' },
        { type: 'note', title: '내 공시가격은 어디서 보나요', text: '부동산공시가격 알리미에서 주소를 넣으면 공동주택가격과 개별주택가격을 볼 수 있어요. 매년 4월 말에 새 가격이 공시돼요.' },
      ] },

      { id: 's2', h2: '재산세 계산, 공시가격별로 얼마인가요', sub: '과세표준 구간마다 세율이 달라요', blocks: [
        { type: 'p', lead: true, ans: `공시가격 3억원이면 ${won(VALUES[2].gen.totalTax)}원, 5억원이면 ${won(R.totalTax)}원, 8억원이면 ${won(VALUES[4].gen.totalTax)}원이에요.`, text: '지방교육세를 포함한 금액이에요. 지방교육세는 재산세의 20%로 따로 붙고, 고지서에 함께 나와요.' },
        { type: 'table', net: 2, caption: '주택 재산세 표준세율 (과세표준 기준)', headers: ['과세표준', '세율', '누진공제액'],
          rows: BR.map((b) => ({ cells: [b.upperBound === null ? '3억원 초과' : `${man(b.upperBound)}원 이하`, `${(b.rate * 100).toFixed(2)}%`, b.progressiveDeduction === 0 ? '없음' : `${won(b.progressiveDeduction)}원`] })),
          fn: '지방세법 제111조제1항제3호의 주택 표준세율이에요. 과세표준은 공시가격에 공정시장가액비율을 곱한 금액이에요.' },
        { type: 'table', id: 'valTbl', compact: true, x: [1], net: 4, caption: '공시가격별 재산세 (1세대 1주택이 아닌 경우)', headers: ['공시가격', '과세표준', '재산세', '지방교육세', '합계'],
          rows: VALUES.map(({ v, gen }) => ({ hi: v === 5e8, cells: [`${man(v)}원`, won(gen.taxableBase), won(gen.propertyTax), won(gen.educationTax), won(gen.totalTax)] })),
          moreLabel: '과세표준까지 보기',
          fn: '단위: 원. 도시지역분과 지방자치단체 조례에 따른 가감은 넣지 않은 금액이에요.' },
        { type: 'widget', label: '내 재산세 계산', title: '내 공시가격으로 바로 보기', note: '공시가격을 넣고 1세대 1주택인지 고르면 과세표준과 세금이 바로 나와요. 도시지역분과 조례에 따른 가감은 넣지 않은 금액이에요.',
          inputs: [
            { id: 'pv', label: '공시가격 (만원)', type: 'number', value: 50000, min: 0, max: 500000, step: 1000 },
            { id: 'po', label: '1세대 1주택 (9억원 이하)', type: 'select', value: '0', options: [['0', '아니오'], ['1', '예']] },
          ],
          outputs: [{ id: 'pbase', label: '과세표준' }, { id: 'ptax', label: '재산세' }, { id: 'pedu', label: '지방교육세' }, { id: 'ptot', label: '합계' }],
          port: `
  var PBR = ${JSON.stringify(BR.map((b) => [b.upperBound, b.rate, b.progressiveDeduction]))};
  var PBR1 = ${JSON.stringify(BR1.map((b) => [b.upperBound, b.rate, b.progressiveDeduction]))};
  function proptax(value, oneHome){
    var fmr = ${spec.constants.FAIR_MARKET_RATIO};
    if (oneHome) fmr = value <= 300000000 ? ${spec.constants.FMR_ONE_HOME_UNDER_3EOK} : value <= 600000000 ? ${spec.constants.FMR_ONE_HOME_3_TO_6EOK} : ${spec.constants.FMR_ONE_HOME_OVER_6EOK};
    var base = Math.round(value * fmr);
    var br = oneHome ? PBR1 : PBR, tax = 0;
    for (var i = 0; i < br.length; i++) { if (br[i][0] === null || base <= br[i][0]) { tax = Math.round(base * br[i][1] - br[i][2]); break; } }
    tax = Math.max(0, tax);
    var edu = Math.round(tax * ${spec.constants.EDUCATION_TAX_RATE});
    return { base: base, tax: tax, edu: edu, total: tax + edu };
  }`,
          js: `
  function prender(){ var v=(+document.getElementById('pv').value||0)*1e4, one=document.getElementById('po').value==='1'; if(one && v>900000000) one=false; var r=proptax(v,one);
    document.getElementById('pbase').textContent=won(r.base)+'원'; document.getElementById('ptax').textContent=won(r.tax)+'원'; document.getElementById('pedu').textContent=won(r.edu)+'원'; document.getElementById('ptot').textContent=won(r.total)+'원'; }
  ['pv','po'].forEach(function(id){document.getElementById(id).addEventListener('input',prender);document.getElementById(id).addEventListener('change',prender)}); prender();`,
          check: (port) => {
            let n = 0, bad = 0;
            for (let v = 0; v <= 200000; v += 500) for (const one of [false, true]) {
              n++;
              const value = v * 1e4;
              const e = pt(value, one && value <= 900000000);
              const q = port.proptax(value, one && value <= 900000000);
              if (q.total !== e.totalTax || q.base !== e.taxableBase || q.tax !== e.propertyTax) bad++;
            }
            return { n, bad };
          },
        },
      ] },

      { id: 's3', h2: '1세대 1주택 특례세율은 얼마나 줄여 주나요', sub: '공시가격 9억원 이하 한 채만', blocks: [
        { type: 'p', lead: true, ans: `공시가격 5억원이면 ${won(R.totalTax)}원에서 ${won(R1.totalTax)}원으로 ${won(oneGap)}원 줄어요.`, text: '세율이 낮아지는 것뿐 아니라 공정시장가액비율도 60%에서 44%로 내려가기 때문이에요. 두 가지가 함께 적용돼 체감 차이가 커요.' },
        { type: 'table', net: 2, caption: '1세대 1주택 특례세율 (공시가격 9억원 이하)', headers: ['과세표준', '특례세율', '표준세율'],
          rows: BR1.map((b, i) => ({ cells: [b.upperBound === null ? '3억원 초과' : `${man(b.upperBound)}원 이하`, `${(b.rate * 100).toFixed(2)}%`, `${(BR[i].rate * 100).toFixed(2)}%`] })),
          fn: '지방세법 제111조의2의 1세대 1주택 세율 특례예요. 시가표준액 9억원 이하인 한 채에만 적용돼요.' },
        { type: 'table', id: 'oneTbl', compact: true, x: [1], net: 3, caption: '1세대 1주택 특례를 받을 때와 받지 않을 때', headers: ['공시가격', '특례 과세표준', '특례 적용', '일반', '차이'],
          rows: VALUES.map(({ v, gen, one }) => ({ hi: v === 5e8, cells: [`${man(v)}원`, won(one.taxableBase), won(one.totalTax), won(gen.totalTax), won(derive(gen.totalTax - one.totalTax))] })),
          moreLabel: '과세표준까지 보기',
          fn: '단위: 원. 지방교육세를 포함한 금액이에요. 공시가격이 9억원을 넘으면 특례세율은 적용되지 않아요.' },
        { type: 'note', title: '9억원을 넘어도 비율 우대는 남아요', text: `공시가격이 9억원을 넘는 1세대 1주택은 특례세율은 못 받지만 공정시장가액비율 45%는 그대로 적용돼요. 공시가격 10억원인 일반 주택이라면 재산세가 ${won(BIG.propertyTax)}원이에요.` },
        { type: 'tips', items: [
          { title: '세대 기준으로 판단해요', text: '주민등록상 같은 세대인 가족이 가진 주택을 모두 세어요. 세대원이 다른 집을 갖고 있으면 특례를 못 받아요.' },
          { title: '신탁한 집도 내 주택 수에 들어가요', text: '신탁으로 넘긴 주택은 맡긴 사람의 주택 수에 다시 더해서 판단해요.' },
          { title: '다른 감면과 겹치면 하나만', text: '감면 제도가 겹치면 둘 중 효과가 큰 하나만 적용돼요. 중복으로 받을 수는 없어요.' },
        ] },
      ] },

      { id: 's4', h2: '재산세 납부, 7월과 9월에 나눠 내나요', sub: '주택은 절반씩 두 번이에요', blocks: [
        { type: 'p', lead: true, ans: '주택 재산세는 7월과 9월에 절반씩 나눠 내요.', text: `공시가격 5억원이면 7월에 약 ${won(half)}원, 9월에 나머지를 내요. 다만 그해 세액이 20만원 이하면 7월에 한 번에 부과할 수 있어요.` },
        { type: 'timeline', label: '재산세 한 해 일정', items: [
          { step: '4월', title: '공시가격 공시', text: '공동주택가격과 개별주택가격이 정해져 열람과 의견 제출을 할 수 있어요' },
          { step: '6월 1일', title: '과세기준일', text: '이날 등기부상 소유자가 그해 재산세를 전부 내요', mark: true, tag: '소유자 확정' },
          { step: '7월', title: '1기분 납부', text: '주택분의 절반을 16일부터 31일까지 내요' },
          { step: '9월', title: '2기분 납부', text: '나머지 절반을 16일부터 30일까지 내요. 토지분도 이때예요' },
        ] },
        { type: 'table', text: true, caption: '재산세 납기와 분할납부', headers: ['구분', '내용'], rows: [
          { cells: ['주택', '7월 16일부터 31일까지 절반, 9월 16일부터 30일까지 나머지'] },
          { cells: ['세액 20만원 이하', '조례에 따라 7월에 한 번으로 합쳐 부과할 수 있어요'] },
          { cells: ['건축물', '7월 16일부터 31일까지'] },
          { cells: ['토지', '9월 16일부터 30일까지'] },
          { cells: ['분할납부', '납부세액이 250만원을 넘으면 일부를 기한 후 3개월 안에 낼 수 있어요'] },
          { cells: ['납부유예', '1세대 1주택 고령자나 장기보유자는 조건을 채우면 미룰 수 있어요'] },
        ], fn: '납기는 지방세법 제115조제1항, 분할납부는 제118조, 납부유예는 제118조의2에 있어요.' },
        { type: 'note', title: '잔금일을 6월 1일 앞뒤로 맞춰 보세요', text: '집을 파는 사람은 5월 31일까지 잔금을 받으면 그해 재산세를 내지 않아요. 사는 사람은 6월 2일 이후에 잔금을 치르면 그해는 안 내요.' },
      ] },

      { id: 's5', h2: '재산세 조회와 카드 납부는 어떻게 하나요', sub: '위택스에서 조회하고 바로 낼 수 있어요', blocks: [
        { type: 'p', lead: true, ans: '위택스에 로그인하면 고지서를 조회하고 계좌이체나 카드로 낼 수 있어요.', text: '고지서를 잃어버렸어도 전자고지로 확인할 수 있어요. 서울은 이택스에서 같은 절차로 처리해요.' },
        { type: 'steps', items: [
          { title: '공시가격 확인', text: '부동산공시가격 알리미에서 내 집의 공시가격을 확인해요', meta: '4월 이후', link: { label: '공시가격 알리미', href: REALTY } },
          { title: '세액 미리 계산', text: '공시가격을 넣어 올해 재산세가 얼마인지 확인해요', meta: '1분', link: { label: '재산세 계산기', href: '/property-tax/' } },
          { title: '고지서 조회', text: '위택스에서 지방세 납부 메뉴로 들어가 고지 내역을 확인해요', meta: '7월과 9월', link: { label: '위택스 바로가기', href: WETAX } },
          { title: '납부', text: '계좌이체나 카드로 내요. 자동이체를 걸면 세액공제를 받는 지역도 있어요', meta: '납기 안에' },
        ] },
        { type: 'tips', items: [
          { title: '전자고지와 자동이체 공제', text: '전자고지를 신청하거나 자동이체를 걸면 지방자치단체에 따라 세액을 조금 깎아 줘요.' },
          { title: '기한을 넘기면 가산금이 붙어요', text: '납기를 넘기면 가산금이 붙고, 계속 밀리면 중가산금이 더해져요. 미리 알림을 걸어 두세요.' },
          { title: '고지서가 안 왔다면', text: '주소가 바뀌었거나 전자고지로 전환됐을 수 있어요. 위택스에서 직접 조회해 보세요.' },
        ] },
      ] },
    ],
    faq: [
      ['재산세 얼마 나오나요?', `공시가격 5억원인 집이면 재산세 ${won(R.propertyTax)}원에 지방교육세 ${won(R.educationTax)}원을 더해 <b>${won(R.totalTax)}원</b>이에요. 1세대 1주택이면 ${won(R1.totalTax)}원이에요.`],
      ['재산세 과세표준은 어떻게 정해지나요?', '공시가격에 공정시장가액비율을 곱해요. 주택은 60%이고, 1세대 1주택은 공시가격에 따라 43%에서 45%예요.'],
      ['재산세 과세기준일이 언제인가요?', '매년 6월 1일이에요. 그날 소유자가 그해 재산세를 전부 내요. 6월 2일에 팔아도 그해분은 판 사람이 내요.'],
      ['1세대 1주택 특례세율은 얼마인가요?', `공시가격 9억원 이하 한 채면 0.05%부터 0.35%까지 낮은 세율이 적용돼요. 공시가격 5억원이면 ${won(oneGap)}원이 줄어요.`],
      ['재산세는 언제 내나요?', '주택은 7월 16일부터 31일까지 절반, 9월 16일부터 30일까지 나머지를 내요. 세액이 20만원 이하면 7월에 한 번에 낼 수 있어요.'],
      ['재산세를 나눠 낼 수 있나요?', '납부세액이 250만원을 넘으면 일부를 납부기한이 지난 날부터 3개월 안에 나눠 낼 수 있어요.'],
      ['재산세 카드 납부가 되나요?', '돼요. 위택스나 서울 이택스에서 고지서를 조회하고 카드나 계좌이체로 낼 수 있어요.'],
    ],
    summary: [
      `과세표준은 공시가격에 공정시장가액비율을 곱한 금액이에요. 공시가 5억이면 ${won(R.taxableBase)}원이에요.`,
      `세율은 0.1%부터 0.4%까지예요. 공시가 5억이면 지방교육세까지 ${won(R.totalTax)}원이에요.`,
      `1세대 1주택으로 공시가격 9억원 이하면 특례세율이 붙어 ${won(R1.totalTax)}원으로 줄어요.`,
      '6월 1일 소유자가 내고, 주택은 7월과 9월에 절반씩 나눠 내요.',
    ],
    sources: [
      ['법령', '지방세법 제110조(과세표준), 제111조(세율), 제111조의2(1세대 1주택 세율 특례), 제114조(과세기준일 6월 1일), 제115조(납기), 제118조(분할납부 250만원), 제118조의2(납부유예), 제151조(지방교육세). 지방세법 시행령 제109조(공정시장가액비율). 부동산 가격공시에 관한 법률(공동주택가격 공시).'],
      ['정부 도구', `위택스 지방세 조회 화면의 세율 구조와 이 글의 계산이 같은 값이에요 (${VERIFIED} 대조).`],
    ],
    claims: [
      { src: 1, quote: '재산세의 과세기준일은 매년 6월 1일로 한다', note: '과세기준일 (지방세법 제114조)' },
      { src: 1, quote: '해당 연도에 부과ㆍ징수할 세액의 2분의 1은 매년 7월 16일부터 7월 31일까지, 나머지 2분의 1은 9월 16일부터 9월 30일까지', note: '주택 재산세 납기 (제115조①3)' },
      { src: 1, quote: '해당 연도에 부과할 세액이 20만원 이하인 경우에는 조례로 정하는 바에 따라 납기를 7월 16일부터 7월 31일까지로 하여 한꺼번에 부과ㆍ징수할 수 있다', note: '20만원 이하 일괄 부과 (제115조①3 단서)' },
      { src: 1, quote: '재산세의 납부세액이 250만원을 초과하는 경우에는 대통령령으로 정하는 바에 따라 납부할 세액의 일부를 납부기한이 지난 날부터 3개월 이내에 분할납부하게 할 수 있다', note: '분할납부 (제118조)' },
      { src: 1, quote: '시가표준액이 9억원 이하인 주택에 한정한다', note: '1세대 1주택 특례세율 범위 (제111조의2①)' },
      { src: 2, quote: '주택: 시가표준액의 100분의 60', note: '주택 공정시장가액비율 60% (시행령 제109조①2)' },
      { src: 2, quote: '시가표준액이 3억원 이하인 주택: 시가표준액의 100분의 43', note: '1세대 1주택 우대 비율 (제109조①2가)' },
    ],
    related: [
      { kind: '계산기', label: '재산세 계산기', href: '/property-tax/' },
      { kind: '부동산 계산기', label: '종합부동산세 계산기', href: '/comprehensive-tax/' },
      { kind: '부동산 가이드', label: '집 살 때 취득세 세율과 계산', href: '/acquisition-tax/' },
    ],
  };
}
