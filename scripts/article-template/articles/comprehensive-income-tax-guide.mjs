/**
 * 글 스펙: 종합소득세
 *   숫자는 전부 엔진(comprehensive-income-tax)이 만든다.
 *   신고 대상·기한·가산세 문장은 claims 로 법령 원문을 인용해 둔다.
 */
import { won, man } from '../render.mjs';

export default function article({ calculators, loadSpec, VERIFIED, derive = (v) => v }) {
  const spec = loadSpec('tax/comprehensive-income-tax');
  const tax = (income, dependents = 1, kids = 0, extraDeduction = 0, extraTaxCredit = 0) =>
    calculators['comprehensive-income-tax']({ income, dependents, kids, extraDeduction, extraTaxCredit }, spec);

  const BR = spec.tables.incomeTaxBrackets.brackets;
  const R = tax(5e7);                       // 대표: 종합소득금액 5,000만원, 부양가족 본인 1명
  const INCOMES = [2e7, 3e7, 5e7, 8e7, 1e8, 1.5e8].map((i) => ({ i, r: tax(i) }));
  const QUICK = [3e7, 5e7, 1e8].map((i) => ({ i, r: tax(i) }));
  const FAM = [1, 2, 3, 4].map((d) => ({ d, r: tax(5e7, d) }));
  const KID = tax(5e7, 3, 2);               // 부양가족 3명 중 자녀 2명
  const PEN = tax(5e7, 1, 0, 5e6);          // 국민연금·연금저축 등 추가 공제 500만원

  const famGain = derive(R.totalTax - FAM[3].r.totalTax);
  const penGain = derive(R.totalTax - PEN.totalTax);
  const kidGain = derive(tax(5e7, 3).totalTax - KID.totalTax);
  const effRate = (R.totalTax / 5e7 * 100).toFixed(1);
  const noFile = derive(Math.round(R.decisionTax * 0.2));           // 무신고 가산세 20%
  const noFileTotal = derive(R.decisionTax + noFile);
  const late1 = derive(noFile - Math.round(noFile * 0.5));          // 1개월 이내 기한 후 신고 시 50% 감면
  const late3 = derive(noFile - Math.round(noFile * 0.3));
  const late6 = derive(noFile - Math.round(noFile * 0.2));
  const HOMETAX = 'https://www.hometax.go.kr';

  return {
    slug: 'comprehensive-income-tax-guide', cat: 'tax', catLabel: '세금', crumb: '종합소득세',
    title: '종합소득세 세율과 계산 방법, 신고 대상부터 5월 홈택스 신고까지',
    description: `종합소득금액 5,000만원이면 종합소득세는 지방소득세까지 ${won(R.totalTax)}원이에요. 세율 구간표, 과세표준 계산 순서, 신고 대상 판정, 홈택스 신고 순서, 신고를 놓쳤을 때 가산세까지 한 번에 정리했어요.`,
    datePublished: '2026-09-03', verified: VERIFIED, basis: '2026년 9월 기준', readMinutes: 8,
    badge: `소득세법 누진세율표와 1원 단위 일치 · ${VERIFIED}`,
    calc: { href: '/tax/comprehensive-income-tax/', label: '종합소득세 계산기 바로가기' },
    hero: {
      tag: '세금', line1: '종합소득세 세율과 계산', line2: '내 세금 얼마',
      sub1: `종합소득금액 5,000만원 → ${won(R.totalTax)}원`,
      sub2: `과세표준 ${won(R.taxableIncome)}원에 세율을 곱하고 누진공제를 빼요`,
      foot: `소득세법 누진세율표 그대로 계산 · ${VERIFIED} 검증`,
      card: { label: '종합소득세', big: won(R.totalTax), unit: '원', l1: '종합소득금액 5,000만원', l2: '지방소득세 포함' },
      alt: `종합소득세 세율과 계산 방법. 종합소득금액 5,000만원이면 세금 ${won(R.totalTax)}원`,
    },
    intro: `종합소득세는 한 해 동안 번 이자, 배당, 사업, 근로, 연금, 기타 소득을 모두 합쳐 한 번에 매기는 세금이에요. 세율은 소득이 클수록 높아지는 계단 구조라서, 소득 전체에 높은 세율이 붙는 게 아니라 구간마다 다른 세율이 붙어요. 종합소득금액 5,000만원에 부양가족이 본인 한 명이면 과세표준은 ${won(R.taxableIncome)}원이고, 세금은 지방소득세까지 합쳐 ${won(R.totalTax)}원이에요. 세율표, 계산 순서, 신고 대상, 5월 홈택스 신고 순서를 차례대로 정리했어요.`,
    answer: {
      label: '내 종합소득금액을 눌러서 세금을 확인해 보세요 (부양가족 본인 1명 기준)',
      quick: QUICK.map(({ i, r }) => ({ chip: `${man(i)}원`, selected: i === 5e7, big: `${won(r.totalTax)}원`, unit: '종합소득세', sub: `과세표준 ${won(r.taxableIncome)}원 · 지방소득세 ${won(r.localTax)}원 포함` })),
      boxes: [
        { title: '5월 1일부터 5월 31일까지', text: '작년에 번 소득을 올해 5월에 신고하고 내요. 성실신고확인 대상 사업자는 6월 30일까지예요' },
        { title: `실제 부담률은 약 ${effRate}%`, text: `종합소득금액 5,000만원 기준이에요. 세율 구간이 15%여도 누진공제 덕분에 실제 부담은 더 낮아요` },
      ],
    },
    keyPoints: {
      title: '한눈에 보는 종합소득세',
      rows: [
        ['합산하는 소득', '이자, 배당, 사업, 근로, 연금, 기타소득 여섯 가지'],
        ['과세표준', '종합소득금액에서 인적공제와 연금보험료 같은 소득공제를 뺀 금액'],
        ['세율', '6%부터 45%까지 여덟 구간. 구간별 세율을 곱하고 누진공제를 빼요'],
        ['5,000만원이면', `과세표준 ${won(R.taxableIncome)}원, 세금 ${won(R.totalTax)}원 (지방소득세 포함)`],
        ['지방소득세', '결정세액의 10%를 따로 더 내요. 신고는 같이 해요'],
        ['신고 기간', '다음 해 5월 1일부터 5월 31일까지'],
        ['안 하면', `무신고 가산세 20%. 5,000만원 기준 ${won(noFile)}원이 더 붙어요`],
        ['환급 나는 경우', '떼인 원천징수 세금이 실제 세금보다 많으면 차액을 돌려받아요'],
      ],
    },
    sections: [
      { id: 's1', h2: '종합소득세 세율 몇 퍼센트인가요', sub: '6%부터 45%까지 여덟 구간이에요', blocks: [
        { type: 'p', lead: true, ans: '과세표준 1,400만원까지는 6%, 5,000만원까지는 15%, 8,800만원까지는 24%예요.', text: '소득 전체에 한 세율이 붙는 게 아니에요. 구간을 넘어선 부분에만 높은 세율이 붙고, 그 차이를 한 번에 빼 주는 금액이 누진공제예요.' },
        { type: 'table', net: 2, caption: '종합소득세 세율표와 누진공제액 (과세표준 기준)', headers: ['과세표준', '세율', '누진공제액'],
          rows: BR.map((b) => ({ hi: b.upperBound === 50000000,
            cells: [b.upperBound === null ? '10억원 초과' : `${man(b.upperBound)}원 이하`, `${(b.rate * 100).toFixed(0)}%`, b.progressiveDeduction === 0 ? '없음' : `${won(b.progressiveDeduction)}원`] })),
          fn: '소득세법 제55조제1항 세율표예요. 과세표준이 구간 경계에 걸쳐도 세금이 갑자기 뛰지 않도록 누진공제가 맞춰져 있어요.' },
        { type: 'note', title: '구간을 넘어도 손해가 아니에요', text: '과세표준이 5,000만원을 조금 넘어 세율이 24%가 되어도, 넘은 금액에만 24%가 붙어요. 누진공제가 그만큼 커져서 세금이 뒤집히는 일은 없어요.' },
      ] },

      { id: 's2', h2: '종합소득세 계산, 과세표준은 어떻게 구하나요', sub: '소득금액에서 공제를 빼면 과세표준이에요', blocks: [
        { type: 'p', lead: true, ans: `종합소득금액 5,000만원에서 인적공제 150만원을 빼면 과세표준 ${won(R.taxableIncome)}원이고, 세금은 ${won(R.totalTax)}원이에요.`, text: `과세표준에 세율 15%를 곱하고 누진공제 ${won(BR[1].progressiveDeduction)}원을 빼면 산출세액 ${won(R.taxBeforeCredit)}원이 나와요. 여기서 세액공제를 빼면 결정세액이고, 결정세액의 10%가 지방소득세예요.` },
        { type: 'flow', label: '종합소득세 계산 순서', steps: [
          { label: '종합소득금액', value: '5,000만원', sub: '총수입에서 필요경비를 뺀 금액', op: '−' },
          { label: '소득공제', value: `${won(spec.constants.PERSONAL_DEDUCTION)}원`, sub: '본인 1명 인적공제', op: '=' },
          { label: '과세표준', value: `${won(R.taxableIncome)}원`, sub: '세율 15% 구간', op: '→' },
          { label: '종합소득세', value: `${won(R.totalTax)}원`, sub: `결정세액 ${won(R.decisionTax)}원 + 지방소득세 ${won(R.localTax)}원` },
        ] },
        { type: 'table', id: 'incTbl', compact: true, x: [2, 3], net: 5, caption: '종합소득금액별 종합소득세 (부양가족 본인 1명 기준)', headers: ['종합소득금액', '과세표준', '산출세액', '결정세액', '지방소득세', '총 세금'],
          rows: INCOMES.map(({ i, r }) => ({ hi: i === 5e7, cells: [`${man(i)}원`, won(r.taxableIncome), won(r.taxBeforeCredit), won(r.decisionTax), won(r.localTax), won(r.totalTax)] })),
          moreLabel: '산출세액까지 보기',
          fn: '단위: 원. 인적공제 150만원과 표준세액공제 7만원만 반영한 금액이에요. 의료비나 기부금 같은 공제가 있으면 더 줄어요.' },
        { type: 'h3', text: '부양가족과 자녀가 있으면 얼마나 줄어드나요' },
        { type: 'p', ans: `부양가족이 본인 포함 4명이면 세금이 ${won(famGain)}원 줄어요.`, text: `한 명당 150만원씩 과세표준이 줄어들기 때문이에요. 자녀 세액공제는 여기에 더해 세금을 직접 깎아 줘요. 부양가족 3명 중 자녀가 2명이면 ${won(kidGain)}원이 더 줄어요.` },
        { type: 'table', net: 3, caption: '부양가족 수에 따른 종합소득세 (종합소득금액 5,000만원 기준)', headers: ['부양가족', '인적공제', '과세표준', '총 세금'],
          rows: FAM.map(({ d, r }) => ({ hi: d === 1, cells: [`${d}명`, `${won(d * spec.constants.PERSONAL_DEDUCTION)}원`, `${won(r.taxableIncome)}원`, `${won(r.totalTax)}원`] })),
          fn: '부양가족은 나이와 소득 요건을 채워야 해요. 배우자와 부양가족은 연간 소득금액이 100만원 이하여야 해요.' },
        { type: 'widget', label: '내 종합소득세 계산', title: '내 소득으로 바로 보기', note: '종합소득금액과 부양가족 수, 자녀 수를 넣으면 과세표준과 세금이 바로 나와요. 인적공제와 표준세액공제만 반영한 값이라, 의료비나 연금저축 공제가 있으면 실제 세금은 더 적어요.',
          inputs: [
            { id: 'ci', label: '종합소득금액 (만원)', type: 'number', value: 5000, min: 0, max: 200000, step: 100 },
            { id: 'cd', label: '부양가족 수 (본인 포함)', type: 'number', value: 1, min: 1, max: 10, step: 1 },
            { id: 'ck', label: '자녀 수', type: 'number', value: 0, min: 0, max: 8, step: 1 },
          ],
          outputs: [{ id: 'cbase', label: '과세표준' }, { id: 'cout', label: '결정세액' }, { id: 'cloc', label: '지방소득세' }, { id: 'ctot', label: '총 세금' }],
          port: `
  var CBR = ${JSON.stringify(BR.map((b) => [b.upperBound, b.rate, b.progressiveDeduction]))};
  var CKID = ${JSON.stringify(spec.tables.childTaxCredit.amounts.map((a) => [a.kids, a.credit]))}, CKADD = ${spec.tables.childTaxCredit.additionalPerKid};
  function citax(income, dependents, kids){
    var base = Math.max(0, income - dependents * ${spec.constants.PERSONAL_DEDUCTION});
    var before = 0;
    for (var i = 0; i < CBR.length; i++) { if (CBR[i][0] === null || base <= CBR[i][0]) { before = Math.round(base * CBR[i][1] - CBR[i][2]); break; } }
    var credit = null;
    for (var j = 0; j < CKID.length; j++) if (CKID[j][0] === kids) credit = CKID[j][1];
    if (credit === null) credit = CKID[CKID.length - 1][1] + (kids - CKID[CKID.length - 1][0]) * CKADD;
    var decision = Math.round(Math.max(0, before - credit - ${spec.constants.STANDARD_TAX_CREDIT}));
    var local = Math.round(decision * ${spec.constants.LOCAL_TAX_RATE});
    return { base: base, before: before, decision: decision, local: local, total: decision + local };
  }`,
          js: `
  function crender(){ var inc=(+document.getElementById('ci').value||0)*1e4, d=+document.getElementById('cd').value||1, k=+document.getElementById('ck').value||0; var r=citax(inc,d,k);
    document.getElementById('cbase').textContent=won(r.base)+'원'; document.getElementById('cout').textContent=won(r.decision)+'원'; document.getElementById('cloc').textContent=won(r.local)+'원'; document.getElementById('ctot').textContent=won(r.total)+'원'; }
  ['ci','cd','ck'].forEach(function(id){document.getElementById(id).addEventListener('input',crender)}); crender();`,
          check: (port) => {
            let n = 0, bad = 0;
            for (let mw = 0; mw <= 30000; mw += 250) for (const d of [1, 2, 3, 4]) for (const k of [0, 1, 2, 4]) {
              n++;
              const e = tax(mw * 1e4, d, k);
              const p = port.citax(mw * 1e4, d, k);
              if (p.total !== e.totalTax || p.base !== e.taxableIncome || p.decision !== e.decisionTax) bad++;
            }
            return { n, bad };
          },
        },
      ] },

      { id: 's3', h2: '종합소득세 신고 대상은 누구인가요', sub: '작년에 소득이 있었으면 대부분 대상이에요', blocks: [
        { type: 'p', lead: true, ans: '사업소득이나 프리랜서 소득이 있으면 금액과 상관없이 신고 대상이에요.', text: '회사에서 연말정산을 끝낸 근로소득만 있다면 따로 신고하지 않아도 돼요. 다만 근로소득에 다른 소득이 하나라도 더 있으면 5월에 합쳐서 신고해야 해요.' },
        { type: 'tree', id: 'filingTree', ok: { title: '신고 대상이에요', text: ' 5월 1일부터 5월 31일까지 홈택스에서 신고하면 돼요. 소득이 적어도 신고해 두면 환급이 나올 수 있어요.' },
          questions: [
            { q: '작년에 소득이 있었나요?', hint: '사업, 프리랜서, 임대, 이자, 배당, 연금, 기타소득 가운데 하나라도 있으면 예',
              no: { title: '신고하지 않아도 돼요', text: ' 소득이 전혀 없었다면 신고 의무가 없어요. 다만 원천징수로 떼인 세금이 있다면 신고해야 돌려받아요.' } },
            { q: '연말정산한 근로소득 말고 다른 소득이 있나요?', hint: '회사 급여만 있고 연말정산을 마쳤다면 아니오',
              no: { title: '신고 안 해도 돼요', text: ' 연말정산으로 끝난 근로소득만 있으면 확정신고 대상이 아니에요. 회사를 여러 곳 다녔고 합산 정산을 못 했다면 예를 선택하세요.' } },
            { q: '그 소득이 분리과세로 끝나지 않았나요?', hint: '이자와 배당을 합쳐 2천만원 이하이거나, 기타소득금액이 300만원 이하로 원천징수됐다면 아니오',
              no: { title: '합산 신고는 안 해도 돼요', text: ' 분리과세로 세금이 이미 끝난 소득은 합산하지 않아요. 다만 합산하는 쪽이 유리하면 직접 합쳐서 신고할 수 있어요.' } },
          ] },
        { type: 'table', text: true, caption: '종합소득세 신고 대상과 제외 대상', headers: ['상황', '신고 여부'], rows: [
          { cells: ['프리랜서로 3.3% 떼고 받은 소득', '신고 대상. 떼인 세금이 많으면 환급이 나와요'] },
          { cells: ['개인사업자, 배달, 대리운전', '신고 대상. 매출이 적어도 신고해야 해요'] },
          { cells: ['주택 임대소득', '신고 대상. 임대수입이 연 2천만원 이하면 분리과세를 고를 수 있어요'] },
          { cells: ['회사 급여만 있고 연말정산 완료', '신고 안 해도 돼요'] },
          { cells: ['회사 급여와 프리랜서 소득이 함께 있는 경우', '신고 대상. 두 소득을 합쳐서 신고해요'] },
          { cells: ['이자와 배당 합계 2천만원 이하', '분리과세로 끝나요. 넘으면 합산 신고'] },
          { cells: ['기타소득금액 300만원 이하 원천징수', '분리과세를 고를 수 있어요'] },
          { cells: ['소득이 전혀 없었던 경우', '신고 의무 없음'] },
        ], fn: '연말정산한 근로소득만 있는 사람의 확정신고 예외는 소득세법 제73조제1항에 있어요.' },
        { type: 'tips', items: [
          { title: '중도 퇴사했다면 꼭 보세요', text: '연말정산을 못 하고 퇴사했다면 5월에 신고해야 공제를 받아요. 이때 환급이 나오는 경우가 많아요.' },
          { title: '소득이 적어도 신고하세요', text: '떼인 원천징수 세금이 실제 세금보다 많으면 차액을 돌려받아요. 신고하지 않으면 그 돈은 그대로 국고에 남아요.' },
          { title: '매출 규모가 크면 확인 절차가 붙어요', text: '업종별 수입금액 기준을 넘는 사업자는 세무대리인의 확인서를 내야 하고, 신고 기한이 6월 30일까지로 늘어나요.' },
        ] },
      ] },

      { id: 's4', h2: '홈택스 신고 순서, 5월에 뭐부터 하나요', sub: '자료 확인부터 납부까지 다섯 단계', blocks: [
        { type: 'p', lead: true, ans: '홈택스에 로그인해 미리 채워진 자료를 확인하고, 공제를 넣고, 세액을 확인한 뒤 납부하면 끝이에요.', text: '국세청이 원천징수 자료와 사업장 매출 자료를 미리 채워 두기 때문에 대부분 확인만 하면 돼요. 모바일 손택스에서도 같은 순서로 할 수 있어요.' },
        { type: 'steps', items: [
          { title: '홈택스 로그인', text: '공동인증서나 간편인증으로 들어가 종합소득세 신고 메뉴를 고르세요', meta: '5월 1일부터', link: { label: '홈택스 바로가기', href: HOMETAX } },
          { title: '미리 채워진 자료 확인', text: '원천징수 내역과 매출 자료가 자동으로 들어와 있어요. 빠진 소득이 없는지 보세요', meta: '5분' },
          { title: '필요경비와 공제 입력', text: '장부를 쓰면 실제 경비를, 안 쓰면 업종별 경비율을 적용해요. 부양가족과 연금보험료도 넣어요', meta: '10분' },
          { title: '세액 확인', text: '결정세액과 지방소득세를 확인하세요. 이미 낸 세금이 많으면 환급으로 바뀌어요', meta: '3분', link: { label: '종합소득세 계산기로 확인', href: '/tax/comprehensive-income-tax/' } },
          { title: '신고서 제출과 납부', text: '제출한 뒤 계좌이체나 카드로 내요. 지방소득세는 위택스로 넘어가 따로 내요', meta: '5월 31일까지' },
        ] },
        { type: 'tips', items: [
          { title: '세금이 부담되면 나눠 낼 수 있어요', text: '낼 세금이 1천만원을 넘으면 일부를 두 달 뒤까지 나눠 낼 수 있어요. 신고할 때 분납을 신청하면 돼요.' },
          { title: '지방소득세를 빠뜨리지 마세요', text: '홈택스에서 국세를 내도 지방소득세는 남아요. 위택스에서 따로 내야 체납이 안 생겨요.' },
          { title: '장부를 쓰면 세금이 줄어요', text: '실제 경비가 업종별 경비율보다 크면 장부를 쓰는 쪽이 유리해요. 적자가 났다면 다음 해로 넘겨 공제받을 수 있어요.' },
        ] },
      ] },

      { id: 's5', h2: '종합소득세 신고 안 하면 어떻게 되나요', sub: '무신고 가산세 20%에 납부지연 이자가 붙어요', blocks: [
        { type: 'p', lead: true, ans: `신고를 안 하면 낼 세금의 20%가 가산세로 붙어요. 5,000만원 기준이면 ${won(noFile)}원이에요.`, text: '거짓 장부처럼 부정한 방법을 쓴 경우에는 40%까지 올라가요. 여기에 납부가 늦어진 날수만큼 이자 성격의 가산세가 하루 단위로 더 붙어요.' },
        { type: 'table', net: 2, caption: `기한을 넘겼을 때 붙는 가산세 (종합소득금액 5,000만원, 세금 ${won(R.decisionTax)}원 기준)`, headers: ['신고 시점', '가산세 감면', '더 내는 금액'], rows: [
          { cells: ['5월 31일까지 신고', '가산세 없음', '0원'] },
          { hi: true, cells: ['1개월 이내 기한 후 신고', '50% 감면', `${won(late1)}원`] },
          { cells: ['1개월 초과 3개월 이내', '30% 감면', `${won(late3)}원`] },
          { cells: ['3개월 초과 6개월 이내', '20% 감면', `${won(late6)}원`] },
          { cells: ['6개월 넘겨서 신고', '감면 없음', `${won(noFile)}원`] },
        ], fn: '기한 후 신고 감면율은 국세기본법 제48조제2항제2호에 있어요. 납부지연 가산세는 따로 하루 단위로 붙어요.' },
        { type: 'note', title: '늦었어도 빨리 내는 쪽이 훨씬 싸요', text: `6개월을 넘기면 가산세만 ${won(noFile)}원이지만, 한 달 안에 기한 후 신고를 하면 ${won(late1)}원으로 줄어요. 세금까지 합치면 ${won(noFileTotal)}원과 차이가 커요.` },
      ] },

      { id: 's6', h2: '종합소득세 환급받으려면 뭘 챙겨야 하나요', sub: '공제를 넣을수록 세금이 줄어요', blocks: [
        { type: 'p', lead: true, ans: `국민연금과 연금저축으로 500만원을 더 공제받으면 세금이 ${won(penGain)}원 줄어요.`, text: '프리랜서처럼 3.3%를 미리 떼인 사람은 실제 세금보다 많이 낸 경우가 많아요. 이때는 신고해야 차액이 환급으로 돌아와요. 환급금은 보통 신고한 달의 다음 달에 계좌로 들어와요.' },
        { type: 'tips', items: [
          { title: '소득공제로 과세표준을 줄이기', text: '국민연금 보험료는 전액, 개인연금저축은 한도 안에서 공제돼요. 노란우산공제도 사업자에게 큰 항목이에요.' },
          { title: '세액공제로 세금을 직접 깎기', text: '자녀 세액공제, 기부금, 의료비, 표준세액공제가 여기에 들어가요. 산출세액에서 바로 빼기 때문에 효과가 커요.' },
          { title: '경비 증빙을 모아 두기', text: '사업용 카드와 세금계산서, 현금영수증을 모아 두면 필요경비로 인정받아요. 사업용 계좌를 따로 쓰면 정리가 쉬워요.' },
          { title: '환급 계좌를 정확히 넣기', text: '신고서에 본인 명의 계좌를 적어야 환급이 들어와요. 계좌를 잘못 적으면 지급이 미뤄져요.' },
        ] },
      ] },
    ],
    faq: [
      ['종합소득세 세율이 몇 퍼센트인가요?', '과세표준에 따라 6%부터 45%까지예요. 1,400만원까지 6%, 5,000만원까지 15%, 8,800만원까지 24%이고, 구간별 누진공제액을 빼요.'],
      ['종합소득세 계산은 어떻게 하나요?', `종합소득금액에서 소득공제를 빼 과세표준을 구하고, 세율을 곱한 뒤 누진공제와 세액공제를 빼요. 5,000만원이면 세금은 <b>${won(R.totalTax)}원</b>이에요.`],
      ['종합소득세 신고 대상은 누구인가요?', '사업소득, 프리랜서 소득, 임대소득이 있으면 신고 대상이에요. 연말정산을 마친 근로소득만 있으면 신고하지 않아도 돼요.'],
      ['종합소득세 신고 기간이 언제인가요?', '다음 해 5월 1일부터 5월 31일까지예요. 세무대리인의 확인서를 내는 성실신고확인 대상 사업자는 6월 30일까지예요.'],
      ['종합소득세 홈택스 신고는 어떻게 하나요?', '홈택스에 로그인해 종합소득세 신고 메뉴에서 미리 채워진 자료를 확인하고, 공제를 넣고, 세액을 확인한 뒤 제출하면 돼요.'],
      ['종합소득세를 안 내면 어떻게 되나요?', `무신고 가산세 20%가 붙고 납부지연 가산세가 하루 단위로 더해져요. 5,000만원 기준이면 가산세만 ${won(noFile)}원이에요.`],
      ['지방소득세는 따로 내야 하나요?', '네. 결정세액의 10%를 지방소득세로 더 내요. 홈택스에서 신고한 뒤 위택스에서 따로 납부해요.'],
    ],
    summary: [
      `세율은 6%부터 45%까지 여덟 구간이에요. 과세표준 5,000만원 이하는 15%에 누진공제 ${won(BR[1].progressiveDeduction)}원이에요.`,
      `계산 순서는 종합소득금액에서 소득공제를 빼 과세표준을 구하고, 세율을 곱한 뒤 세액공제를 빼는 흐름이에요. 5,000만원이면 ${won(R.totalTax)}원이에요.`,
      '사업소득이나 프리랜서 소득이 있으면 금액과 상관없이 5월에 신고해야 해요.',
      '기한을 넘기면 가산세 20%가 붙어요. 한 달 안에 기한 후 신고하면 절반으로 줄어요.',
    ],
    sources: [
      ['법령', '소득세법 제14조(과세표준의 계산), 제50조(기본공제 1명당 연 150만원), 제55조(세율), 제59조의2(자녀세액공제), 제70조(5월 1일부터 5월 31일 확정신고), 제70조의2(성실신고확인서 제출 시 6월 30일), 제73조(확정신고의 예외). 국세기본법 제47조의2(무신고가산세), 제47조의4(납부지연가산세), 제48조(가산세 감면). 지방세법 제91조(개인지방소득세 과세표준), 제92조(세율).'],
      ['정부 도구', `홈택스 종합소득세 신고 화면의 세율표와 이 글의 계산이 같은 값이에요 (${VERIFIED} 대조).`],
    ],
    claims: [
      { src: 1, quote: '그 종합소득 과세표준을 그 과세기간의 다음 연도 5월 1일부터 5월 31일까지', note: '신고 기간 (소득세법 제70조①)' },
      { src: 1, quote: '1명당 연 150만원을 곱하여 계산한 금액을 그 거주자의 해당 과세기간의 종합소득금액에서 공제한다', note: '인적공제 150만원 (제50조①)' },
      { src: 1, quote: '종합소득과세표준 확정신고를 그 과세기간의 다음 연도 5월 1일부터 6월 30일까지 하여야 한다', note: '성실신고확인 대상은 6월 30일 (제70조의2②)' },
      { src: 1, quote: '다음 각 호의 어느 하나에 해당하는 거주자는 제70조 및 제71조에도 불구하고 해당 소득에 대하여 과세표준확정신고를 하지 아니할 수 있다', note: '확정신고 예외 (제73조①)' },
      { src: 1, quote: '기타소득금액이 300만원 이하이면서', note: '기타소득 분리과세 기준 (제14조③)' },
      { src: 1, quote: '거주자의 종합소득 및 퇴직소득에 대한 과세표준은 각각 구분하여 계산한다', note: '과세표준 구분 계산 (제14조①)' },
      { src: 3, quote: '법정신고기한이 지난 후 1개월 이내에 기한 후 신고를 한 경우: 해당 가산세액의 100분의 50에 상당하는 금액', note: '기한 후 신고 감면 (국세기본법 제48조②2가)' },
      { src: 3, quote: '법정신고기한이 지난 후 3개월 초과 6개월 이내에 기한 후 신고를 한 경우: 해당 가산세액의 100분의 20에 상당하는 금액', note: '기한 후 신고 감면 (제48조②2다)' },
      { src: 4, quote: '거주자의 종합소득에 대한 개인지방소득세 산출세액은 해당 연도의 과세표준에 제1항 및 제2항의 세율을 적용하여 산출한 금액으로 한다', note: '지방소득세는 같은 과세표준에 별도 세율 (지방세법 제92조③)' },
    ],
    related: [
      { kind: '계산기', label: '종합소득세 계산기', href: '/tax/comprehensive-income-tax/' },
      { kind: '세금 계산기', label: '프리랜서 3.3% 계산기', href: '/tax/freelancer-tax/' },
      { kind: '세금 가이드', label: '연봉 실수령액 계산법', href: '/tax/salary-net-pay-guide/' },
    ],
  };
}
