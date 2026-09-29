/**
 * 글 스펙: 전기차·경차 자동차세 (보험·자동차 카테고리 4편)
 *   경차(배기량 과세) 금액은 자동차세 계산기 엔진(auto-tax)이 만든다.
 *   전기차는 엔진에 없는 정액(그 밖의 승용자동차 비영업용 10만원, 영업용 2만원)이라 서울시 세율표 원문 값에 지방교육세 30%를 derive 로 붙인다.
 *   연세액 10만원 이하 6월 일괄 부과(하반기 5% 공제)는 지방세법 제128조④·서울시 안내 원문. 공제액은 어림으로 밝힌다.
 */
import { won } from '../render.mjs';

export default function article({ calculators, loadSpec, VERIFIED, derive = (v) => v }) {
  const spec = loadSpec('insurance/auto-tax');
  const at = (engineCC, vehicleAge = 0, isCommercial = false) => calculators['auto-tax']({ engineCC, vehicleAge, isCommercial }, spec);
  const EDU = spec.constants.EDU_TAX_RATE;

  const EV = 100000, EVC = 20000;                    // 그 밖의 승용자동차 비영업용·영업용 (서울시 세율표)
  const EVE = derive(EV * EDU), EVT = derive(EV + EVE);
  const K = at(998), K1000 = at(1000), M = at(1598), B = at(1999);
  const AGES = [0, 2, 4, 9, 11].map((y) => ({ y, r: at(998, y) }));
  // 연세액 10만원 이하 6월 일괄: 하반기 세액의 5% 공제 (자동차세만, 어림)
  const KH = derive(K.autoTax / 2), KD = derive(Math.round(KH * 0.05)), KJUNE = derive(K.autoTax - KD);
  const EH = derive(EV / 2), ED = derive(EH * 0.05), EJUNE = derive(EV - ED);
  const GAP = derive(EVT - K.totalTax), GAPM = derive(M.totalTax - EVT);
  const EVJAN = derive(Math.floor(EVT * 0.05 * 334 / 365 / 10) * 10);
  const EDGE = [1000, 1001, 1600, 1601].map((cc) => ({ cc, r: at(cc) }));
  // 차령 경감 뒤 자동차세가 10만원 이하로 떨어지는 가장 큰 배기량 (12년차 이후 50%)
  let OLDMAX = 1000; for (let cc = 1001; cc <= 3000; cc++) if (at(cc, 11).autoTax <= 100000) OLDMAX = cc;
  const OM = at(OLDMAX, 11);
  const KJUNET = derive(Math.floor(KJUNE * (1 + EDU) / 10) * 10);
  const EDT = derive(ED * (1 + EDU));
  const EVMAR = derive(Math.floor(EVT * 0.05 * 275 / 365 / 10) * 10);

  return {
    slug: 'insurance-ev-tax-guide', cat: 'insurance', catLabel: '보험·자동차', crumb: '전기차·경차 자동차세',
    faqFixed: 2,
    title: '전기차 자동차세, 경차와 비교하면 1년에 얼마 내나요',
    description: `전기차 자동차세는 배기량이 없어 1년 100,000원 정액이고 지방교육세를 더하면 ${won(EVT)}원이에요. 998cc 경차는 ${won(K.totalTax)}원이에요. 둘 다 6월에 한 번 부과되는 이유, 차령 경감 차이, 취득세 감면까지 지방세법 원문으로 정리했어요.`,
    datePublished: '2026-09-29', verified: VERIFIED, basis: '2026년 9월 기준', readMinutes: 8,
    badge: `지방세법 제127조·제128조 원문 대조 · ${VERIFIED}`,
    calc: { href: '/auto-tax/', label: '자동차세 계산기 바로가기' },
    hero: {
      tag: '보험·자동차', line1: '전기차 자동차세', line2: '경차와 비교',
      sub1: '전기차는 배기량 없이 정액',
      sub2: '경차는 오래 탈수록 줄어요',
      foot: `지방세법 제127조 · ${VERIFIED} 검증`,
      card: { label: '비영업용 전기차 1년 (지방교육세 포함)', big: won(EVT), unit: '원', l1: `998cc 경차 신차 ${won(K.totalTax)}원`, l2: '전기차는 차령 경감이 없어요' },
      alt: `비영업용 전기차 자동차세 1년 ${won(EVT)}원, 998cc 경차 신차 ${won(K.totalTax)}원`,
    },
    intro: '전기차는 배기량이 없어서 지방세법이 그 밖의 승용자동차로 분류하고 정해진 금액을 매겨요. 경차는 배기량에 시시당 80원을 곱해요. 둘 다 자동차세가 1년 10만원 이하라서 6월에 한 번에 부과되는 것도 같아요. 그런데 오래 탈수록 차이가 벌어지고, 차를 살 때 받는 감면도 달라요. 금액과 차이를 정리했어요.',
    answer: {
      label: '차 종류별 1년 자동차세 (비영업용 신차, 지방교육세 포함)',
      quick: [
        { chip: '전기차', selected: true, big: `${won(EVT)}원`, unit: '1년', sub: '정액 10만원 + 지방교육세' },
        { chip: '998cc 경차', big: `${won(K.totalTax)}원`, unit: '1년', sub: `자동차세 ${won(K.autoTax)}원 + 지방교육세` },
        { chip: '1,598cc', big: `${won(M.totalTax)}원`, unit: '1년', sub: '시시당 140원' },
        { chip: '1,999cc', big: `${won(B.totalTax)}원`, unit: '1년', sub: '시시당 200원' },
      ],
      boxes: [
        { title: '전기차는 경차보다 조금 더 내요', text: `신차 기준 1년에 ${won(GAP)}원 차이이고, 1,598cc보다는 ${won(GAPM)}원 적어요` },
        { title: '차종 감면은 취득세예요', text: '경차는 취득세 75만원까지, 전기차는 140만원까지 감면돼요' },
      ],
    },
    keyPoints: {
      title: '한눈에 보는 전기차·경차 자동차세',
      rows: [
        ['전기차 1월 연납', `공제 약 ${won(EVJAN)}원 (6월 일괄 공제보다 커요)`],
        ['전기차 세액', '비영업용 10만원, 영업용 2만원 정액'],
        ['경차 세액', '비영업용 배기량 × 80원 (1,000cc 이하)'],
        ['지방교육세', '비영업용 승용차만 자동차세의 30%'],
        ['부과 횟수', '자동차세 10만원 이하면 6월에 한 번, 하반기 몫 5% 공제'],
        ['차령 경감', '비영업용 배기량 차만 3년차부터 5%씩, 전기차는 없음'],
        ['경차 취득세', '75만원까지 면제·공제 (2027년 12월 31일까지)'],
        ['전기차 취득세', '140만원까지 면제·공제 (2026년 12월 31일까지)'],
      ],
    },
    sections: [
      { id: 's1', h2: '전기차 자동차세는 1년에 얼마인가요', sub: '배기량이 없어 정액이에요', blocks: [
        { type: 'p', lead: true, ans: `비영업용 전기차 자동차세는 1년 100,000원이고, 지방교육세 ${won(EVE)}원을 더해 ${won(EVT)}원을 내요.`, text: '지방세법 시행령은 승용자동차 중 전기·태양열·알코올을 이용하는 차를 그 밖의 승용자동차로 나눠요. 이 차는 배기량 대신 정해진 금액을 1대당 연세액으로 매겨요. 택시 같은 영업용은 20,000원이고 지방교육세가 붙지 않아요.' },
        { type: 'p', ans: '수소전기차도 전기를 이용하는 승용차라면 같은 정액이에요.', text: '시행령은 전기·태양열·알코올을 이용하는 승용차를 그 밖의 승용자동차로 봐요. 내 차에 매겨진 금액은 위택스나 스마트 위택스 앱에 로그인하면 바로 조회할 수 있어요.' },
        { type: 'widget', label: '내 차 자동차세', title: '전기차와 배기량 차를 바로 비교하기', note: '배기량 차는 자동차세 계산기 엔진과 같은 산식이고, 전기차는 정액이에요. 조례 가산은 반영하지 않아요.',
          inputs: [
            { id: 'ek', label: '차 종류', type: 'select', value: 'ev', options: [['ev', '전기차 (그 밖의 승용자동차)'], ['cc', '배기량 차']] },
            { id: 'ec', label: '배기량 (cc, 배기량 차만)', type: 'number', value: 998, min: 50, max: 6000, step: 1 },
            { id: 'ey', label: '과세연도 − 등록 연도', type: 'number', value: 0, min: 0, max: 20, step: 1 },
            { id: 'eb', label: '용도', type: 'select', value: '0', options: [['0', '비영업용'], ['1', '영업용']] },
          ],
          outputs: [{ id: 'eo1', label: '자동차세' }, { id: 'eo2', label: '지방교육세' }, { id: 'eo3', label: '1년 합계' }, { id: 'eo4', label: '부과 횟수' }],
          port: `
  function carTax(kind, cc, age, com){
    function cut10(n){ return Math.floor(n / 10) * 10; }
    function sfloor(x){ return Math.floor(Math.round(x * 1e6) / 1e6); }
    if (kind === 'ev') { var a = com ? ${EVC} : ${EV}; var e = com ? 0 : Math.round(a * ${EDU}); return { auto: a, edu: e, total: a + e }; }
    var rate = cc <= 1000 ? (com ? 18 : ${spec.constants.RATE_UNDER_1000}) : cc <= 1600 ? (com ? 18 : ${spec.constants.RATE_1000_1600}) : (com ? (cc <= 2000 ? 19 : 24) : ${spec.constants.RATE_OVER_1600});
    var base = Math.round(cc * rate), usage = age + 1, disc = 0;
    if (!com && usage >= 3 && usage < 12) disc = +((usage - 2) * 0.05).toFixed(2); else if (!com && usage >= 12) disc = 0.5;
    var ha = cut10(sfloor((base * (1 - disc)) / 2)), he = com ? 0 : cut10(sfloor(ha * ${EDU}));
    return { auto: ha * 2, edu: he * 2, total: (ha + he) * 2 };
  }`,
          js: `
  function erender(){ var k=document.getElementById('ek').value, cc=+document.getElementById('ec').value||0, y=+document.getElementById('ey').value||0, com=document.getElementById('eb').value==='1'; var r=carTax(k,cc,y,com);
    document.getElementById('eo1').textContent=won(r.auto)+'원'; document.getElementById('eo2').textContent=won(r.edu)+'원'; document.getElementById('eo3').textContent=won(r.total)+'원';
    document.getElementById('eo4').textContent=r.auto<=100000?'6월에 한 번':'6월·12월 두 번'; }
  ['ek','ec','ey','eb'].forEach(function(id){document.getElementById(id).addEventListener('input',erender);document.getElementById(id).addEventListener('change',erender)}); erender();`,
          check: (port) => {
            let n = 0, bad = 0;
            for (let cc = 100; cc <= 5000; cc += 50) for (let y = 0; y <= 15; y++) for (const com of [false, true]) {
              n++; const e = at(cc, y, com); const q = port.carTax('cc', cc, y, com);
              if (q.total !== e.totalTax || q.auto !== e.autoTax || q.edu !== e.eduTax) bad++;
            }
            for (const com of [false, true]) { n++; const q = port.carTax('ev', 0, 5, com); if (q.total !== (com ? EVC : EVT)) bad++; }
            return { n, bad };
          },
        },
        { type: 'p', ans: `택시나 렌터카 같은 영업용 전기차는 1년 ${won(EVC)}원만 내요.`, text: '영업용은 그 밖의 승용자동차 세액이 2만원이고, 지방교육세는 비영업용 승용차에만 붙어서 더해지는 돈이 없어요. 영업용 배기량 차도 시시당 18~24원이라 비영업용보다 훨씬 낮아요.' },
        { type: 'p', ans: '6월 고지서는 1년 합계보다 조금 작을 수 있어요.', text: '자동차세가 10만원 이하인 전기차와 경차는 6월에 한꺼번에 부과되면서 하반기 몫의 5%를 빼 주기 때문이에요. 그 밖에 지방자치단체가 조례로 자동차세 세율을 표준세율의 50%까지 더 높일 수 있어요. 이 글의 금액은 표준세율 기준이에요.' },
        { type: 'p', ans: '2010년 경형 전기차 시판 때 정부는 경차와 비슷한 수준인 연세액 10만원으로 정했다고 밝혔어요.', text: '지금 지방세법 시행령은 전기차를 크기와 상관없이 그 밖의 승용자동차로 보고 1대당 정해진 금액을 매겨요. 그래서 소형 전기차와 대형 전기차가 같은 금액을 내고, 차값이 비싸도 자동차세는 같아요.' },
      ] },

      { id: 's2', h2: '경차 자동차세는 얼마인가요', sub: '배기량에 80원을 곱해요', blocks: [
        { type: 'p', lead: true, ans: `998cc 경차 신차의 자동차세는 1년 ${won(K.autoTax)}원이고, 지방교육세를 더하면 ${won(K.totalTax)}원이에요.`, text: '비영업용 승용차 중 배기량 1,000cc 이하는 시시당 80원으로 가장 낮은 구간이에요. 영업용이 아니면 여기에 지방교육세 30%가 붙어요.' },
        { type: 'table', net: 2, caption: '배기량 구간 경계에서 자동차세가 뛰는 곳 (비영업용 신차, 자동차세 계산기 산식)', headers: ['배기량', '시시당 세액', '자동차세', '1년 합계', '부과'],
          rows: EDGE.map((x) => ({ hi: x.cc === 1001, cells: [`${x.cc.toLocaleString('ko-KR')}cc`, x.cc <= 1000 ? '80원' : x.cc <= 1600 ? '140원' : '200원', won(x.r.autoTax), won(x.r.totalTax), x.r.autoTax <= 100000 ? '6월 한 번' : '6월·12월'] })),
          fn: '단위: 원. 1년 합계는 지방교육세를 포함해요. 1cc 차이로 구간이 바뀌면 시시당 세액이 달라져요.' },
        { type: 'table', net: 2, caption: '차령별 998cc 경차와 전기차 1년 자동차세 (비영업용, 지방교육세 포함)', headers: ['등록 후 햇수', '경차 경감률', '998cc 경차', '전기차'],
          rows: AGES.map((x) => ({ hi: x.y === 9, cells: [`${x.y}년`, `${Math.round(x.r.discountRate * 100)}%`, won(x.r.totalTax), won(EVT)] })),
          fn: '단위: 원. 차령은 햇수가 아니라 연도 차로 세요. 과세연도에서 차령 기산일이 속한 연도를 빼고 1을 더하고, 하반기에 기산일이 있는 차는 제1기분 차령이 1 작아요.' },
        { type: 'p', ans: '경차는 오래 탈수록 줄고, 전기차는 그대로예요.', text: `지방세법은 배기량으로 과세하는 비영업용 승용차에만 차령 3년차부터 5%씩, 12년차 이후 50%까지 경감을 줘요. 998cc 경차는 등록하고 11년이 지나면 1년 ${won(AGES[4].r.totalTax)}원까지 내려가요. 전기차는 이 경감이 없어요.` },
        { type: 'p', ans: `등록하고 11년이 지나면 전기차가 998cc 경차보다 1년에 ${won(derive(EVT - AGES[4].r.totalTax))}원 더 내요.`, text: `신차일 때 차이는 ${won(GAP)}원이지만, 경차는 해마다 경감이 커지고 전기차는 그대로라 차이가 벌어져요. 오래 탈 계획이라면 유지비를 비교할 때 보험료, 연료비와 함께 이 차이도 넣어 보세요.` },
        { type: 'p', ans: `1,000cc와 1,001cc는 1cc 차이지만 1년 합계가 ${won(derive(EDGE[1].r.totalTax - EDGE[0].r.totalTax))}원 달라요.`, text: '1,000cc 이하 구간을 넘으면 시시당 세액이 80원에서 140원으로 올라요. 신차라면 자동차세가 10만원을 넘어 두 번 나눠 내요. 시시당 80원은 배기량만 보고 적용하니 자동차등록증의 배기량을 확인하세요.' },
        { type: 'note', title: '다른 배기량도 궁금하다면', text: '배기량 구간별 자동차세와 차령 경감 계산은 자동차세 계산 글에 정리했어요.', link: { href: '/auto-tax/guide/', label: '자동차세 계산 보기' } },
      ] },

      { id: 's3', h2: '경차 자동차세는 1년에 몇번 내나요', sub: '자동차세 10만원 이하는 한꺼번에 부과돼요', blocks: [
        { type: 'p', lead: true, ans: '경차 자동차세는 1년에 한 번, 6월에 부과돼요.', text: '자동차세는 원래 6월과 12월에 절반씩 내요. 그런데 지방교육세를 빼고 자동차세가 1년 10만원 이하면 6월에 상반기 세액과 하반기 세액을 합쳐 한 번만 부과하고, 하반기 세액의 5%를 빼 줘요.' },
        { type: 'flow', label: '998cc 경차 신차의 6월 자동차세 (자동차세만, 어림)', steps: [
          { label: '1년 자동차세', value: `${won(K.autoTax)}원`, sub: '998 × 80원', op: '→' },
          { label: '하반기 몫', value: `${won(KH)}원`, sub: '7월~12월', op: '×' },
          { label: '5% 공제', value: `${won(KD)}원`, sub: '미리 내는 몫', op: '=' },
          { label: '6월 부과', value: `약 ${won(KJUNE)}원`, sub: `지방교육세까지 약 ${won(KJUNET)}원` },
        ] },
        { type: 'p', ans: '표준세율이면 1,000cc 이하 차와 비영업용 전기차는 모두 여기에 들어가요.', text: `1,000cc 차의 자동차세는 ${won(K1000.autoTax)}원이라 표준세율이면 1,000cc 이하는 언제나 10만원 이하예요. 전기차는 딱 100,000원이라 하반기 몫 ${won(EH)}원의 5%인 ${won(ED)}원을 뺀 약 ${won(EJUNE)}원이 부과돼요. 1,000cc를 넘는 차도 차령 경감 뒤 10만원 이하가 되면 같아요. 12년차 이후 50% 경감이면 ${won(OLDMAX)}cc까지 10만원 이하예요(${won(OLDMAX)}cc는 ${won(OM.autoTax)}원).` },
        { type: 'p', ans: '경차 자동차세 조회는 위택스나 스마트 위택스 앱에서 해요.', text: '간편인증으로 로그인하면 따로 입력하지 않아도 낼 자동차세가 바로 조회돼요. 고지서 번호를 다시 입력할 필요가 없고, 결제 수단을 고르면 공휴일이나 저녁에도 낼 수 있어요. 서울은 위택스와 이택스를 함께 쓸 수 있어요.' },
      ] },

      { id: 's4', h2: '전기차 자동차세 감면과 경차 감면은 무엇이 있나요', sub: '차를 살 때 내는 취득세를 깎아 줘요', blocks: [
        { type: 'p', lead: true, ans: '경차와 전기차에 붙는 감면은 차를 살 때 내는 취득세 감면이에요.', text: '지방세특례제한법이 취득세를 일정 금액까지 면제하거나 공제해요. 자동차세 면제는 장애인이나 국가유공자가 생업·보철용으로 등록한 차 1대처럼 사람을 기준으로 한 규정이 따로 있어요.' },
        { type: 'table', text: true, caption: '경차·전기차 취득세 감면 (지방세특례제한법 제66조·제67조)', headers: ['차', '감면 방식', '기한'], rows: [
          { hi: true, cells: ['경형 승용차 (비영업용)', '취득세 75만원 이하면 면제, 넘으면 75만원 공제', '2027년 12월 31일'] },
          { cells: ['전기차 (고시된 차)', '취득세 140만원 이하면 면제, 넘으면 140만원 공제', '2026년 12월 31일'] },
          { cells: ['경형 승합·화물차', '취득세 면제', '2027년 12월 31일'] },
        ], fn: '경형 승용차를 산 뒤 1년 안에 영업용으로 쓰면 감면받은 취득세를 다시 걷어요. 전기차 감면은 환경친화적 자동차법에 따라 고시된 차만 받아요.' },
        { type: 'p', ans: '전기차 취득세 감면은 경차보다 1년 먼저 끝나요.', text: '연장 여부는 법 개정으로 정해지니 구입 시기를 정할 때 지방세특례제한법 개정 소식을 확인하세요. 수소전기차 취득세 감면은 같은 140만원 한도지만 기한이 2027년 12월 31일이에요.' },
      ] },

      { id: 's5', h2: '전기차 자동차세 연납은 어떻게 하나요', sub: '1월에 신청하면 공제가 가장 커요', blocks: [
        { type: 'p', lead: true, ans: '연납은 1·3·6·9월 16일부터 말일까지 신청할 수 있지만, 6월에 한꺼번에 부과되는 전기차는 사실상 1월이나 3월이 대상이에요.', text: '연납 공제율은 5%예요. 1월에 내면 2월부터 12월까지 몫에, 3월에 내면 4월부터 12월까지 몫에 붙어요. 이미 연납해 온 사람은 1월에 공제가 반영된 납부서를 받을 수 있어요.' },
        { type: 'steps', items: [
          { title: '위택스 로그인', text: '누리집이나 스마트 위택스 앱에 간편인증으로 들어가요', meta: '1단계' },
          { title: '자동차세 조회', text: '내 차 자동차세가 바로 조회돼요', meta: '2단계' },
          { title: '연납 신청', text: '공제가 반영된 금액을 확인하고 신청해요', meta: '3단계' },
          { title: '결제', text: '계좌이체, 간편결제, 금융앱으로 내요', meta: '4단계' },
          { title: '다음 해 확인', text: '공제 반영 납부서가 오면 기한 안에 내요', meta: '매년 1월' },
        ] },
        { type: 'p', ans: `비영업용 전기차를 1월에 연납하면 약 ${won(EVJAN)}원을 덜 내요.`, text: `1년 합계 ${won(EVT)}원 중 2월 1일부터 12월 31일까지 334일 몫에 5%를 곱해 10원 미만을 버린 어림이에요. 영업용 전기차는 연세액이 ${won(EVC)}원이라 공제도 그만큼 작아요.` },
        { type: 'p', ans: `6월 일괄 부과 때 빼 주는 돈은 지방교육세까지 약 ${won(EDT)}원이라 1월 연납 공제가 더 커요.`, text: `1월 연납은 1년 세금의 약 4.58%, 6월 일괄 공제는 하반기 몫의 5%라 1년 세금으로 치면 2.5%예요. 10만원 이하 차는 6월에 1년 치가 한꺼번에 부과될 수 있으니, 공제를 더 받으려면 1월이나 3월 연납을 따져 보세요. 3월 연납 공제는 어림으로 약 ${won(EVMAR)}원이에요. 연납은 선택이라 안 해도 가산세는 없어요.` },
        { type: 'note', title: '연납 공제를 자세히 보려면', text: '신청 월별 공제율과 연납 뒤 차를 팔 때 환급은 자동차세 연납 글에 정리했어요.', link: { href: '/auto-tax/annual/', label: '자동차세 연납 보기' } },
      ] },
    ],
    faq: [
      ['전기차 자동차세금 기준은 차값이나 무게인가요?', '아니에요. 지방세법은 그 밖의 승용자동차에 1대당 정해진 연세액을 매겨서 차값, 무게, 배터리 크기와 상관없이 같아요. 비영업용과 영업용만 금액이 달라요.'],
      ['경차 자동차세 환급은 언제 받나요?', '6월에 1년 치를 낸 뒤 차를 팔면 소유권 이전 등록일 기준으로, 폐차하면 말소등록일 기준으로 일할 계산해요. 그래서 남은 기간 몫을 돌려받아요.'],
    ],
    summary: [
      `비영업용 전기차 자동차세는 1년 10만원 정액이고, 지방교육세를 더해 ${won(EVT)}원이에요.`,
      `998cc 경차 신차는 1년 ${won(K.totalTax)}원이고, 차령 경감으로 해마다 줄어요.`,
      '자동차세가 10만원 이하라 둘 다 6월에 한꺼번에 부과될 수 있고, 하반기 몫의 5%를 빼 줘요.',
      '경차·전기차라서 받는 감면은 취득세에 있어요. 경차 75만원, 전기차 140만원까지예요.',
    ],
    sources: [
      ['법령', '지방세법 제127조(세율·차령 경감), 제128조(납기, 연세액 10만원 이하 일괄 부과, 연납), 제151조(지방교육세). 지방세법 시행령 제123조(그 밖의 승용자동차). 지방세특례제한법 제66조④(전기자동차 취득세), 제67조(경형자동차 취득세).'],
      ['정부 발표', '행정안전부 보도자료 「자동차세 연납 2월 4일 마감, 5% 공제 혜택 챙기세요!」(2026.1), 「2025년 자동차세 연납 할인율 5% 혜택 유지!」(2025.1). 대한민국 정책브리핑 「경형 전기차 취·등록세 면제」(2010.4).'],
      ['정부 안내', '서울특별시 세목별 안내 자동차세·지방교육세(세율표, 10만원 이하 6월 일괄 부과), 대한민국 정책브리핑 「스마트 위택스로 자동차세 납부」.'],
      ['계산', `배기량 과세 차의 금액은 자동차세 계산기 산식(위택스 반기별 10원 절사)으로 계산했어요. 전기차는 정액 100,000원에 지방교육세 30%를 더했고, 6월 일괄 부과 공제는 하반기 몫 5%로 어림했어요 (${VERIFIED}).`],
    ],
    claims: [
      { src: 2, quote: '그 밖의 승용자동차: 제1호의 승용자동차 중 전기ㆍ태양열 및 알코올을 이용하는 자동차', note: '전기차 분류' },
      { src: 4, quote: '그 밖의 승용자동차 그 밖의 승용자동차 영 업 용 비 영 업 용 20,000원 100,000원', note: '전기차 세액' },
      { src: 4, quote: '1,000시시 이하 80원', note: '경차 세율' },
      { src: 4, quote: '비영업용 승용자동차에는 지방교육세 30%가 부가됩니다', note: '지방교육세' },
      { src: 4, quote: '연세액이 10만원 이하(지방교육세 별도)의 자동차세는 6월 상반기 세액에 하반기 세액(7.1.~12.31.)의 5%를 공제한 금액을 합산하여 1회만 부과합니다', note: '6월 일괄' },
      { src: 1, quote: '연세액이 10만원 이하인 자동차세는 제1항 및 제2항에도 불구하고 제1기분을 부과할 때 전액을 부과ㆍ징수할 수 있다', note: '10만원 이하 법' },
      { src: 1, quote: '제1호에 따른 비영업용 승용자동차 중 대통령령으로 정하는 차령(이하 이 호에서 “차령”이라 한다)이 3년 이상인 자동차에 대하여는', note: '차령 경감 대상' },
      { src: 1, quote: '조례로 정하는 바에 따라 자동차세의 세율을 배기량 등을 고려하여 제1항의 표준세율의 100분의 50까지 초과하여 정할 수 있다', note: '조례 가산' },
      { src: 3, quote: '1. 취득세액이 75만원 이하인 경우 취득세를 면제한다. 2. 취득세액이 75만원을 초과하는 경우 취득세액에서 75만원을 공제한다', note: '경차 취득세' },
      { src: 3, quote: '다만, 취득일부터 1년 이내에 영업용으로 사용하는 경우에는 감면된 취득세를 추징한다', note: '경차 추징' },
      { src: 3, quote: '2026년 12월 31일까지 취득세액이 140만원 이하인 경우 취득세를 면제하고, 취득세액이 140만원을 초과하는 경우 취득세액에서 140만원을 공제한다', note: '전기차 취득세' },
      { src: 3, quote: '중 대통령령으로 정하는 규모의 자동차를 취득하는 경우에는 취득세를 2027년 12월 31일까지 면제한다', note: '경형 승합·화물' },
      { src: 3, quote: '먼저 감면을 신청하는 1대에 대해서는 취득세 및 자동차세를 각각 2027년 12월 31일까지 면제한다', note: '장애인 자동차세 면제' },
      { src: 3, quote: '2027년 12월 31일까지 취득세액이 140만원 이하인 경우 취득세를 면제하고, 취득세액이 140만원을 초과하는 경우 취득세액에서 140만원을 공제한다', note: '수소차 취득세' },
      { src: 2, quote: '가. 제1기분 차령 = 과세연도 - 기산일이 속하는 연도 나. 제2기분 차령 = 과세연도 - 기산일이 속하는 연도 + 1', note: '차령 계산' },
      { src: 1, quote: '해당 기분(期分)의 세액을 이전등록일 또는 말소등록일을 기준으로 대통령령으로 정하는 바에 따라 일할 계산하여 그 등록일에 신고납부할 수 있다', note: '이전·말소 일할' },
      { src: 7, quote: '경형전기자동차에 대한 자동차세도 현행 경형승용자동차의 자동차세와 비슷한 수준의 세부담인 연세액 10만원이 부과된다고 밝혔다', note: '2010 정액 도입' },
      { src: 8, quote: '올해 1월에 연납할 경우, 1월분을 제외한 나머지 기간(2월~12월)에 대해 5% 공제율이 적용되어, 결과적으로 연간 세액의 4.58%를 할인받는 효과를 누릴 수 있다', note: '연납 4.58%' },
      { src: 8, quote: '만약 연납으로 세금을 낸 후 차량을 양도하거나 폐차할 경우, 보유하지 않은 기간만큼의 세금은 일할 계산되어 다시 돌려받을 수 있다', note: '환급' },
      { src: 9, quote: '앱을 설치하고 간편인증으로 로그인하니, 별도로 정보를 입력하지 않아도 내가 내야 할 자동차세가 바로 조회됐다', note: '조회' },
      { src: 10, quote: '자동차세 연납은 1월 외에도 3월, 6월, 9월에 신청할 수 있으며, 신고․납부 기간은 해당 월의 16일부터 말일까지다', note: '연납 시기' },
      { src: 10, quote: '연납 납부를 하지 않아도 가산세는 없으며, 정기납(6월, 12월)으로도 납부 가능', note: '가산세 없음' },
    ],
    related: [
      { kind: '계산기', label: '자동차세 계산기', href: '/auto-tax/' },
      { kind: '보험·자동차 가이드', label: '자동차세 연납', href: '/auto-tax/annual/' },
    ],
  };
}
