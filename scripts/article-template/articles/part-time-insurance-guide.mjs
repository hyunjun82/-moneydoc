/**
 * 글 스펙: 아르바이트 4대보험
 *   숫자는 엔진(four-major-insurance)이 만든다. 가입 기준은 법령 원문 인용(claims)으로 못 박는다.
 *   시각화는 이 글의 성격(조건 판정)에 맞춰 판정 트리 하나만 쓰고, 나머지는 표로 간다.
 */
import { won, man } from '../render.mjs';

export default function article({ calculators, loadSpec, VERIFIED, derive = (v) => v }) {
  const spec = loadSpec('tax/four-major-insurance');
  const C = spec.constants;
  const ins = (monthlySalary) => calculators['four-major-insurance']({ monthlySalary, nontaxable: 0, workCompRate: 0.007 }, spec);

  // 2026 최저임금 시급 10,320원 기준 월 보수 (주 15시간·20시간·30시간·40시간)
  const WAGE = 10320;
  const monthly = (weekHours) => derive(Math.round(WAGE * (weekHours + (weekHours >= 15 ? weekHours / 5 : 0)) * 52 / 12 / 10) * 10); // 주휴 포함(15시간 이상)
  const H = [15, 20, 30, 40].map((h) => { const m = monthly(h); return { h, m, r: ins(m) }; });
  const R20 = H[1], R40 = H[3];
  const QUICK = H.slice(0, 3).map(({ h, m, r }) => ({ h, m, r }));
  const pct = (v) => `${+(v * 100).toFixed(4)}%`;

  const yearGain = derive(R20.r.employeeTotal * 12);
  const employerFor20 = R20.r.employerTotal;
  const INSURE4 = 'https://www.4insure.or.kr/pbiz/main/main.do';
  const MOEL_MIN = 'https://www.minimumwage.go.kr/minWage/policy/decisionMain.do';

  return {
    slug: 'part-time-insurance-guide', cat: 'tax', catLabel: '세금', crumb: '아르바이트 4대보험',
    title: '아르바이트 4대보험 가입 기준과 보험료, 주 15시간부터 퇴사 후까지',
    description: `한 달 60시간, 주 15시간이 아르바이트 4대보험 가입을 가르는 기준이에요. 주 20시간 일하면 월 보수 ${won(R20.m)}원에 보험료 ${won(R20.r.employeeTotal)}원을 내요. 가입 기준과 시간별 보험료, 사업주 의무, 퇴사 후 건강보험까지 정리했어요.`,
    datePublished: '2026-09-03', verified: VERIFIED, basis: '2026년 9월 기준', readMinutes: 6,
    badge: `법령 가입 기준 원문 확인 · ${VERIFIED}`,
    calc: { href: '/four-insurance/calculator/', label: '4대보험료 계산기 바로가기' },
    hero: {
      tag: '급여·세금', line1: '아르바이트 4대보험', line2: '가입 기준과 보험료',
      sub1: `한 달 60시간 또는 주 15시간이 기준이에요`,
      sub2: `주 20시간이면 월 보수 ${won(R20.m)}원, 보험료 ${won(R20.r.employeeTotal)}원`,
      foot: `국민연금·건강보험·고용보험 시행령 원문 확인 · ${VERIFIED}`,
      card: { label: '주 20시간 보험료', big: won(R20.r.employeeTotal), unit: '원', l1: `월 보수 ${won(R20.m)}원`, l2: '2026년 최저임금 기준' },
      alt: `아르바이트 4대보험 가입 기준. 주 20시간이면 월 보수 ${won(R20.m)}원에 보험료 ${won(R20.r.employeeTotal)}원`,
    },
    intro: `아르바이트라고 4대보험에서 빠지는 건 아니에요. 한 달 소정근로시간 60시간, 주 15시간이 가입을 가르는 기준이고, 이 시간을 넘으면 정규직과 같은 요율로 가입해요. 2026년 최저임금으로 주 20시간 일하면 월 보수가 ${won(R20.m)}원이고 보험료는 ${won(R20.r.employeeTotal)}원이에요. 보험별 가입 기준과 시간대별 보험료, 사장님이 해야 할 일, 그만둔 뒤 건강보험을 정리했어요.`,
    answer: {
      label: '주당 근무시간을 고르면 보험료가 나와요 (2026년 최저임금 기준)',
      quick: QUICK.map(({ h, m, r }) => ({ chip: `주 ${h}시간`, selected: h === 20, big: `${won(r.employeeTotal)}원`, unit: '월 보험료', sub: `월 보수 ${won(m)}원 · 회사도 ${won(r.employerTotal)}원 부담` })),
      boxes: [
        { title: '한 달 60시간이 첫 번째 기준', text: '국민연금과 건강보험은 한 달 소정근로시간 60시간 미만이면 직장가입에서 빠져요' },
        { title: '주 15시간이 두 번째 기준', text: '고용보험은 주 15시간 미만이어도 3개월 넘게 계속 일하면 가입해요. 산재보험은 시간과 무관하게 적용돼요' },
      ],
    },
    keyPoints: {
      title: '한눈에 보는 알바 4대보험',
      rows: [
        ['국민연금·건강보험', '한 달 소정근로시간 60시간 이상이면 가입'],
        ['고용보험', '한 달 60시간 또는 주 15시간 이상. 미만이어도 3개월 이상 계속 일하면 가입'],
        ['산재보험', '근로자를 쓰는 모든 사업에 적용. 하루만 일해도 보호받아요'],
        ['주 20시간 보험료', `월 보수 ${won(R20.m)}원에 근로자 ${won(R20.r.employeeTotal)}원, 회사 ${won(employerFor20)}원`],
        ['주휴수당', '주 15시간 이상이면 주휴수당이 생기고 그만큼 보수도 올라가요'],
        ['연차', '주 15시간 미만이면 연차유급휴가 규정이 적용되지 않아요'],
        ['퇴직금', '1년 이상 일하고 주 15시간 이상이면 알바도 퇴직금을 받아요'],
        ['그만둔 뒤', '지역가입자로 바뀌어요. 보험료가 오르면 임의계속가입을 신청할 수 있어요'],
      ],
    },
    sections: [
      { id: 's1', h2: '아르바이트 4대보험 가입 기준, 몇 시간부터인가요', sub: '보험마다 기준이 조금씩 달라요', blocks: [
        { type: 'p', lead: true, ans: '한 달 소정근로시간 60시간이 기준이에요. 고용보험은 주 15시간도 함께 봐요.', text: '내 근무 조건을 넣어 보면 어떤 보험에 가입하는지 바로 나와요.' },
        { type: 'tree', id: 'tree', questions: [
          { q: '① 한 달 소정근로시간이 60시간 이상인가요?', hint: '주 15시간씩 4주면 약 60시간이에요. 근로계약서에 적힌 시간으로 봐요', no: { title: '국민연금과 건강보험은 빠져요', text: '한 달 60시간 미만이면 직장가입 대상이 아니에요. 다만 고용보험은 3개월 이상 계속 일하면 가입하고, 산재보험은 시간과 상관없이 적용돼요. 국민연금과 건강보험은 지역가입자로 따로 내거나 가족의 피부양자가 돼요.' } },
          { q: '② 주 소정근로시간이 15시간 이상인가요?', hint: '15시간을 넘으면 주휴수당과 연차도 함께 생겨요', no: { title: '4대보험은 되지만 주휴수당과 연차는 없어요', text: '한 달 60시간을 넘으면 국민연금과 건강보험에는 가입해요. 다만 주 15시간 미만이면 주휴수당과 연차유급휴가 규정이 적용되지 않아요.' } },
          { q: '③ 3개월 이상 계속 일할 예정인가요?', hint: '짧게 일해도 3개월을 넘기면 고용보험이 따라와요', no: { title: '지금 조건이면 4대보험에 가입해요', text: '한 달 60시간과 주 15시간을 모두 넘으면 근무 기간과 상관없이 국민연금·건강보험·고용보험·산재보험에 가입해요.' } },
        ], ok: { title: '4대보험 모두 가입해요', text: '정규직과 같은 요율로 가입하고, 회사도 같은 비율을 함께 내요. 아래에서 시간대별 보험료를 확인하세요.' } },
        { type: 'table', text: true, caption: '보험별 아르바이트 가입 기준', headers: ['보험', '가입 기준', '예외'], rows: [
          { cells: ['국민연금', '한 달 소정근로시간 60시간 이상', '60시간 미만이어도 3개월 이상 계속 일하고 본인이 원하면 가입 가능'] },
          { cells: ['건강보험', '한 달 소정근로시간 60시간 이상', '60시간 미만이면 지역가입자 또는 가족의 피부양자'] },
          { cells: ['고용보험', '한 달 60시간 또는 주 15시간 이상', '미만이어도 3개월 이상 계속 일하면 가입. 일용직 4대보험은 근로내용확인신고로 가입'] },
          { cells: ['산재보험', '근로자를 쓰는 모든 사업', '시간·기간과 무관하게 적용'] },
        ], fn: '소정근로시간은 근로계약서에 적힌 일하기로 한 시간이에요. 실제로 더 일했다면 그 시간도 따져요.' },
      ] },

      { id: 's2', h2: '알바 보험료 계산, 주 몇 시간이면 얼마인가요', sub: '2026년 최저임금 시급 10,320원 기준', blocks: [
        { type: 'p', ans: `주 20시간이면 월 보수 ${won(R20.m)}원에 보험료 ${won(R20.r.employeeTotal)}원, 주 40시간이면 월 보수 ${won(R40.m)}원에 ${won(R40.r.employeeTotal)}원이에요.`, text: '요율은 정규직과 같아요. 주 15시간 이상이면 주휴수당이 붙어 보수가 올라가고 보험료도 그만큼 늘어요.' },
        { type: 'table', net: 2, caption: '주당 근무시간별 월 보수와 4대보험료 (2026년 최저임금 기준)', headers: ['주 근무시간', '월 보수', '근로자 보험료', '회사 부담', '실수령'],
          rows: H.map(({ h, m, r }) => ({ hi: h === 20, cells: [`주 ${h}시간`, won(m), won(r.employeeTotal), won(r.employerTotal), won(derive(m - r.employeeTotal))] })),
          fn: `단위: 원. 시급 10,320원에 주휴수당을 더해 월로 환산했어요. 소득세는 월 보수가 낮으면 대부분 0원이라 제외했어요.` },
        { type: 'widget', label: '내 알바 보험료 계산', title: '내 근무시간으로 보기', note: '주당 시간과 시급을 넣으면 월 보수와 보험료가 바로 나와요.',
          inputs: [
            { id: 'wh', label: '주 근무시간', type: 'number', value: 20, min: 1, max: 52, step: 1 },
            { id: 'wg', label: '시급 (원)', type: 'number', value: WAGE, min: 10320, max: 100000, step: 100 },
          ],
          outputs: [{ id: 'wpay', label: '월 보수' }, { id: 'wemp', label: '근로자 보험료' }, { id: 'wer', label: '회사 부담' }, { id: 'wnet', label: '실수령' }],
          port: `
  var NP_RATE=${C.NP_RATE}, NP_CAP=${C.NP_CAP}, NP_FLOOR=${C.NP_FLOOR}, HI_RATE=${C.HI_RATE}, EI_RATE=${C.EI_RATE}, EI_EMP=${C.EI_RATE_EMPLOYER}, LTC=${C.LTC_INCOME_RATE}, WC=0.007;
  function partTime(hours, wage){
    var cut=function(n){return Math.floor(n/10)*10}, fl=function(x){return Math.floor(Math.round(x*1e6)/1e6)};
    var weekly = hours + (hours >= 15 ? hours/5 : 0);            // 주 15시간 이상이면 주휴수당
    var pay = Math.round(wage * weekly * 52 / 12 / 10) * 10;
    var npb = pay < NP_FLOOR ? NP_FLOOR : (pay >= NP_CAP ? NP_CAP : pay);
    var np=cut(fl(npb*NP_RATE)), hi=cut(fl(pay*HI_RATE)), ltc=cut(fl(pay*LTC/2)), ei=cut(fl(pay*EI_RATE));
    var er=np+hi+ltc+cut(fl(pay*EI_EMP))+cut(fl(pay*WC));
    var emp=np+hi+ltc+ei;
    return { pay: pay, emp: emp, er: er, net: pay-emp };
  }`,
          js: `
  function prender(){ var h=+document.getElementById('wh').value||0, g=+document.getElementById('wg').value||0; if(h<=0||g<=0)return; var r=partTime(h,g);
    document.getElementById('wpay').textContent=won(r.pay)+'원'; document.getElementById('wemp').textContent=won(r.emp)+'원'; document.getElementById('wer').textContent=won(r.er)+'원'; document.getElementById('wnet').textContent=won(r.net)+'원'; }
  ['wh','wg'].forEach(function(id){document.getElementById(id).addEventListener('input',prender)}); prender();`,
          check: (port) => {
            let n = 0, bad = 0;
            for (let h = 1; h <= 52; h++) for (const g of [10320, 12000, 15000, 20000]) {
              n++;
              const p = port.partTime(h, g);
              const weekly = h + (h >= 15 ? h / 5 : 0);
              const pay = Math.round(g * weekly * 52 / 12 / 10) * 10;
              const e = ins(pay);
              if (p.pay !== pay || p.emp !== e.employeeTotal || p.er !== e.employerTotal) bad++;
            }
            return { n, bad };
          },
        },
        { type: 'note', title: '주 15시간을 넘기면 보수가 크게 올라요', text: `주휴수당이 붙기 때문이에요. 주 14시간과 주 15시간은 한 시간 차이지만 월 보수는 주휴수당만큼 벌어져요. 대신 4대보험료도 함께 늘어요.` },
      ] },

      { id: 's3', h2: '알바 4대보험 사업주 의무, 신고와 부담은 어디까지인가요', sub: '가입 신고와 보험료 절반 부담이에요', blocks: [
        { type: 'p', ans: '가입 기준을 넘는 알바는 반드시 신고해야 하고, 보험료 절반과 산재보험 전액을 회사가 내요.', text: `주 20시간 알바 한 명이면 회사가 매달 ${won(employerFor20)}원을 부담해요. 신고하지 않으면 나중에 소급해서 한꺼번에 내야 하고 과태료도 붙어요.` },
        { type: 'table', text: true, caption: '사업주가 해야 할 일과 기한', headers: ['해야 할 일', '기한', '안 하면'], rows: [
          { cells: ['자격취득 신고', '입사한 달의 다음 달 15일까지', '소급 부과와 과태료'] },
          { cells: ['보험료 납부', '매달 10일까지', '연체금 부과'] },
          { cells: ['자격상실 신고', '퇴사한 달의 다음 달 15일까지', '보험료가 계속 부과됨'] },
          { cells: ['근로계약서 작성·교부', '근로를 시작할 때', '500만원 이하 과태료'] },
        ], fn: '4대보험은 4대사회보험 정보연계센터에서 한 번에 신고할 수 있어요. 산재보험은 근로자를 쓰는 모든 사업에 적용돼 신고 대상에서 뺄 수 없어요.' },
        { type: 'note', title: '알바 4대보험 안 들면 어떻게 되나요', text: '적발되면 가입해야 했던 기간만큼 소급해서 부과돼요. 근로자 몫까지 회사가 먼저 내고 나중에 정산하는 일이 생겨요. 일용직 4대보험도 마찬가지라 근로내용확인신고서로 매달 신고해야 해요.' },
        { type: 'tips', items: [
          { title: '알바가 가입을 원하지 않아도', text: '가입은 법으로 정해진 의무라 근로자와 사업주가 합의해서 빼기로 할 수 없어요. 나중에 적발되면 소급해서 부과돼요.' },
          { title: '여러 곳에서 일하는 알바라면', text: '각 사업장에서 시간을 따로 따져요. 두 곳 모두 기준을 넘으면 양쪽에서 가입해요.' },
          { title: '1년 이상 일하면', text: '주 15시간 이상 근무한 알바도 퇴직금을 받아요. 4대보험 가입 여부와 별개예요.' },
        ] },
      ] },

      { id: 's4', h2: '알바를 그만두면 건강보험은 어떻게 되나요', sub: '지역가입자로 바뀌고, 임의계속가입을 쓸 수 있어요', blocks: [
        { type: 'p', ans: '직장가입자 자격이 끝나 지역가입자로 바뀌어요.', text: '지역가입자 보험료는 소득뿐 아니라 재산과 자동차까지 보고 매겨서, 직장 다닐 때보다 오르는 경우가 있어요. 이럴 때 쓰는 게 임의계속가입이에요.' },
        { type: 'table', text: true, caption: '알바를 그만둔 뒤 건강보험 선택지', headers: ['방법', '조건', '보험료'], rows: [
          { cells: ['가족의 피부양자로 들어가기', '소득과 재산이 기준 아래일 것', '따로 안 냄'] },
          { cells: ['지역가입자', '피부양자가 안 되면 자동으로 전환', '소득·재산·자동차로 계산'] },
          { cells: ['임의계속가입', '직장가입 기간이 1년 이상', '직장 다닐 때 내던 수준으로 최대 36개월'] },
        ], fn: '임의계속가입은 신청 뒤 첫 보험료를 납부기한부터 2개월 안에 내야 자격이 유지돼요.' },
        { type: 'tips', items: [
          { title: '국민연금은 어떻게 되나요', text: '납부예외를 신청하면 소득이 없는 동안 보험료를 내지 않아도 돼요. 다만 그 기간은 가입기간으로 쌓이지 않아요.' },
          { title: '고용보험은 남아 있어요', text: '가입기간이 18개월 안에 180일을 넘고 비자발적으로 그만뒀다면 알바도 실업급여를 받을 수 있어요.' },
        ] },
      ] },
      { id: 's5', h2: '알바도 퇴직금과 실업급여를 받을 수 있나요', sub: '4대보험 가입과 별개로 따지는 기준이 있어요', blocks: [
        { type: 'p', ans: '퇴직금은 1년 이상 주 15시간 이상, 실업급여는 고용보험 180일 이상이면 받아요.', text: '두 기준은 4대보험 가입 여부와 별개예요. 가입은 됐는데 기간이 짧으면 못 받고, 짧게 여러 곳에서 일했어도 기간을 합치면 받을 수 있어요.' },
        { type: 'table', text: true, caption: '아르바이트가 받을 수 있는 것과 조건', headers: ['받는 것', '조건', '어디서'], rows: [
          { cells: ['퇴직금', '1년 이상 계속 근무, 4주 평균 주 15시간 이상. 초단시간 근로자는 퇴직금 대상이 아니에요', '회사가 퇴사 14일 안에 지급'] },
          { cells: ['주휴수당', '주 15시간 이상 근무하고 그 주를 개근', '주급·월급에 포함해 지급'] },
          { cells: ['연차유급휴가', '주 15시간 이상, 1년 미만이면 한 달 개근에 1일', '회사에 신청'] },
          { cells: ['실업급여', '퇴사 전 18개월 중 고용보험 180일 이상, 비자발적 퇴사', '고용센터에 수급자격 신청'] },
        ], fn: '여러 곳에서 일한 고용보험 기간은 합쳐서 계산해요. 실제 가입 이력은 4대사회보험 정보연계센터에서 확인할 수 있어요.' },
      ] },
    ],
    faq: [
      ['주 15시간 미만 알바도 4대보험에 가입하나요?', '국민연금과 건강보험은 한 달 60시간 미만이면 빠져요. 고용보험은 3개월 이상 계속 일하면 가입하고, 산재보험은 시간과 상관없이 적용돼요.'],
      ['주 20시간 알바면 보험료가 얼마인가요?', `2026년 최저임금 기준 월 보수 ${won(R20.m)}원에 근로자 부담이 <b>${won(R20.r.employeeTotal)}원</b>이에요. 회사는 산재보험까지 더해 ${won(employerFor20)}원을 내요.`],
      ['사장님이 4대보험을 안 넣어 주는데 어떻게 하나요?', '가입은 법으로 정해진 의무라 합의로 뺄 수 없어요. 4대사회보험 정보연계센터에서 내 가입 이력을 확인하고, 누락됐다면 공단에 확인 청구를 하거나 고용노동청에 신고할 수 있어요.'],
      ['알바도 퇴직금을 받나요?', '1년 이상 계속 일하고 4주 평균 주 15시간 이상이면 받아요. 4대보험 가입 여부와는 별개예요.'],
      ['알바를 그만두면 건강보험료가 오르나요?', '지역가입자로 바뀌면서 소득뿐 아니라 재산과 자동차까지 보고 계산해요. 직장가입 기간이 1년 이상이면 임의계속가입으로 직장 수준을 최대 36개월 유지할 수 있어요.'],
      ['여러 곳에서 알바하면 4대보험은 어떻게 되나요?', '각 사업장에서 근무시간을 따로 따져요. 두 곳 모두 기준을 넘으면 양쪽에서 가입하고, 국민연금은 소득을 합쳐 상한 안에서 부과해요.'],
    ],
    summary: [
      '한 달 소정근로시간 60시간이 국민연금·건강보험 가입 기준이에요.',
      '고용보험은 한 달 60시간 또는 주 15시간 이상, 미만이어도 3개월 넘게 일하면 가입해요.',
      `주 20시간이면 월 보수 ${won(R20.m)}원에 보험료 ${won(R20.r.employeeTotal)}원, 회사도 ${won(employerFor20)}원을 내요.`,
      '그만두면 지역가입자로 바뀌고, 직장가입 1년 이상이면 임의계속가입을 쓸 수 있어요.',
    ],
    sources: [
      ['법령', '국민연금법 시행령 제2조(1개월 소정근로시간 60시간 미만 단시간근로자 제외, 3개월 이상 계속 근로 시 예외). 국민건강보험법 시행령 제9조(60시간 미만 단시간근로자 직장가입 제외), 국민건강보험법 제110조(임의계속가입). 고용보험법 시행령 제3조(1개월 60시간 또는 1주 15시간 미만 적용 제외, 3개월 이상 계속 근로와 일용근로자는 적용). 근로기준법 제18조(4주 평균 주 15시간 미만은 주휴일·연차 미적용). 산업재해보상보험법 제6조(근로자를 사용하는 모든 사업 적용).'],
      ['행정규칙·정부 안내', '최저임금위원회 2026년 최저임금 결정현황(시급 10,320원). 4대사회보험 정보연계센터 자격 신고와 가입내역 조회.'],
      ['정부 도구', `보험료는 4대보험료 계산기 엔진으로 계산했고 4대사회보험 모의계산과 대조했어요 (${VERIFIED}).`],
    ],
    claims: [
      { src: 2, quote: '1개월 동안의 소정근로시간이 60시간 미만인 단시간근로자', note: '국민연금 제외 기준 (시행령 제2조)' },
      { src: 2, quote: '3개월 이상 계속하여 근로를 제공하는 사람으로서 사용자의 동의를 받아 근로자로 적용되기를 희망하는 사람', note: '국민연금 예외 가입' },
      { src: 2, quote: '1개월 동안의 근로일수가 8일 이상', note: '일용근로자 국민연금 가입 기준' },
      { src: 4, quote: '비상근 근로자 또는 1개월 동안의 소정(所定)근로시간이 60시간 미만인 단시간근로자', note: '건강보험 직장가입 제외 (시행령 제9조)' },
      { src: 6, quote: '1개월간 소정근로시간이 60시간 미만이거나 1주간의 소정근로시간이 15시간 미만인 근로자', note: '고용보험 적용 제외 (시행령 제3조①)' },
      { src: 6, quote: '해당 사업에서 3개월 이상 계속하여 근로를 제공하는 근로자', note: '고용보험 적용 예외 (시행령 제3조②)' },
      { src: 7, quote: '4주 동안(4주 미만으로 근로하는 경우에는 그 기간)을 평균하여 1주 동안의 소정근로시간이 15시간 미만인 근로자에 대하여는 제55조와 제60조를 적용하지 아니한다', note: '주휴일·연차 미적용 (근로기준법 제18조③)' },
      { src: 8, quote: '이 법은 근로자를 사용하는 모든 사업 또는 사업장', note: '산재보험 전면 적용 (제6조)' },
      { src: 3, quote: '신청 후 최초로 내야 할 직장가입자 보험료를 그 납부기한부터 2개월이 지난 날까지 내지 아니한 경우에는 그 자격을 유지할 수 없다', note: '임의계속가입 자격 유지 조건 (제110조②)' },
      { src: 9, quote: "'26.01.01 ~'26.12.31 10,320", note: '2026년 최저임금 시급 10,320원 (최저임금위원회 결정현황)' },
    ],
    related: [
      { kind: '계산기', label: '4대보험료 계산기', href: '/four-insurance/' },
      { kind: '세금 가이드', label: '2026 4대보험 요율과 계산', href: '/four-insurance/' },
      { kind: '법률 가이드', label: '퇴직금 계산 방법과 지급기준', href: '/severance/' },
    ],
  };
}
