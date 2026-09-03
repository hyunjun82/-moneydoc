/**
 * 글 스펙: 2026년 실업급여 (기준 샘플)
 *   숫자는 전부 엔진(unemployment-benefit)이 만든다. 이 파일에는 문장·구조·출처만 있다.
 *   위젯 산식(port)은 build.mjs 가 엔진과 1,910개 조합으로 대조한다.
 */
import { won, man, docs } from '../render.mjs';

export default function article({ calculators, loadSpec, VERIFIED, derive = (v) => v }) {
  const spec = loadSpec('government/unemployment-benefit');
  const C = spec.constants;
  const ub = (monthlySalary, insuredYears, isElderlyOrDisabled = false) => calculators['unemployment-benefit']({ monthlySalary, insuredYears, isElderlyOrDisabled }, spec);

  const R = ub(3e6, 5);
  const SAL = [2e6, 2.5e6, 3e6, 3.5e6, 4e6, 5e6].map((m) => ({ m, r: ub(m, 5) }));
  const YEARS = [[0.5, '1년 미만'], [2, '1~3년'], [4, '3~5년'], [7, '5~10년'], [12, '10년 이상']];
  const DAYS = YEARS.map(([y, label]) => ({ label, u: ub(3e6, y, false).benefitDays, o: ub(3e6, y, true).benefitDays }));
  const QUICK = [2.5e6, 3e6, 4e6].map((m) => ({ m, r: ub(m, 5) }));
  const capSalary = derive(Math.ceil(C.DAILY_UPPER_LIMIT / 0.6 * 30 / 1e4) * 1e4);   // 상한이 걸리기 시작하는 월급 (상한 ÷ 60% × 30일, 만원 올림)
  const floorSalary = derive(Math.floor(C.DAILY_LOWER_LIMIT / 0.6 * 30 / 1e4) * 1e4); // 하한이 걸리는 월급 상단
  const capMonth = derive(C.DAILY_UPPER_LIMIT * 30);                                  // 상한 × 30일
  const MINWAGE_2025 = 10030;                                                        // 2025 최저임금 시급 (근거: 최저임금위원회 결정현황)
  const LOW_2025 = derive(MINWAGE_2025 * 8 * 0.8);                                   // 2025 하한 = 시급 × 8시간 × 80%
  const TOOL_CAP = 66048;
  const mo = (d) => `약 ${Math.round(d / 30)}개월`;

  const WORK24 = 'https://www.work24.go.kr/cm/main.do';
  const D = {
    insure4: { label: '4대보험 가입내역확인서', href: 'https://www.4insure.or.kr/pbiz/main/main.do' },
    labor: (l) => ({ label: l, href: 'https://labor.moel.go.kr/anmtDclrCntr/main.do' }),
    history: { label: '고용보험 이력내역서 (고용24)', href: WORK24 },
    chobon: { label: '주민등록초본 발급 (정부24)', href: 'https://www.gov.kr/mw/AA020InfoCappView.do?CappBizCD=13100000015' },
    family: { label: '가족관계증명서 발급 (대법원)', href: 'https://efamily.scourt.go.kr/index.jsp' },
  };

  return {
    slug: 'unemployment-benefit-guide', cat: 'government', catLabel: '정부지원금', crumb: '실업급여',
    title: '2026년 실업급여 얼마나 받나요, 조건부터 금액과 신청 방법까지',
    description: `2026년 기준 월급 300만원에 5년 일했다면 실업급여는 하루 ${won(R.dailyBenefit)}원씩 ${R.benefitDays}일, 모두 ${won(R.totalBenefit)}원이에요. 받는 조건 세 가지 판정, 월급별 금액표, 가입기간별 일수, 신청 4단계를 고용24 모의계산과 맞춰 정리했어요.`,
    datePublished: '2026-09-02', verified: VERIFIED, basis: '2026년 9월 기준', readMinutes: 8,
    badge: `고용24 모의계산 일치 · 시행령 §68 확인 · ${VERIFIED}`,
    calc: { href: '/unemployment/calculator/', label: '실업급여 계산기 바로가기' },
    hero: {
      tag: '정부지원금', line1: '2026년 실업급여', line2: '얼마나 받나요',
      sub1: `월급 300만원 · 5년 근무 → 하루 ${won(R.dailyBenefit)}원 × ${R.benefitDays}일 = ${won(R.totalBenefit)}원`,
      sub2: `2026년 하한 ${won(C.DAILY_LOWER_LIMIT)}원 · 상한 ${won(C.DAILY_UPPER_LIMIT)}원 (하루)`,
      foot: `고용24 모의계산 일치 · 고용보험법 시행령 §68 · ${VERIFIED} 검증`,
      card: { label: '총 지급액', big: won(R.totalBenefit), unit: '원', l1: `하루 ${won(R.dailyBenefit)}원`, l2: `${R.benefitDays}일 (${mo(R.benefitDays)})` },
      alt: `2026년 실업급여 얼마나 받나요. 월 급여 300만원 5년 근무면 하루 ${won(R.dailyBenefit)}원, ${R.benefitDays}일, 총 ${won(R.totalBenefit)}원`,
    },
    intro: `퇴사를 앞두고 제일 먼저 궁금한 건 "나는 받을 수 있는지, 받으면 얼마를 몇 개월 받는지"예요. 2026년 기준으로 월급 300만원에 5년 일했다면 하루 ${won(R.dailyBenefit)}원씩 ${R.benefitDays}일, 모두 ${won(R.totalBenefit)}원을 받아요. 이 글은 받는 조건을 세 가지 질문으로 판정하고, 월급별 금액과 가입기간별 일수를 표로 보여주고, 신청 4단계를 순서대로 정리했어요.`,
    answer: {
      label: '퇴사 전 월급을 고르면 바로 답해요 (5년 근무 · 50세 미만 기준)',
      quick: QUICK.map(({ m, r }) => ({ chip: `${man(m)}원`, selected: m === 3e6, big: `${won(r.totalBenefit)}원`, unit: '총 지급액', sub: `하루 ${won(r.dailyBenefit)}원 × ${r.benefitDays}일 (${mo(r.benefitDays)})` })),
      boxes: [
        { title: `하루 ${won(C.DAILY_LOWER_LIMIT)}원이 바닥이에요`, text: `2026년 하한. 월급 ${man(floorSalary)}원 이하면 누구나 이 금액을 받아요 (최저임금 10,320원 × 8시간 × 80%)` },
        { title: `하루 ${won(C.DAILY_UPPER_LIMIT)}원이 천장이에요`, text: `2026년 상한. 월급 약 ${man(capSalary)}원부터는 더 안 올라가요` },
      ],
    },
    keyPoints: {
      title: '한눈에 보는 2026 실업급여',
      rows: [
        ['받는 조건', '비자발적 퇴사, 퇴사 전 18개월 중 고용보험 180일 이상, 일할 의사와 능력'],
        ['하루 금액', `퇴사 전 3개월 평균임금의 60% (하한 ${won(C.DAILY_LOWER_LIMIT)}원 · 상한 ${won(C.DAILY_UPPER_LIMIT)}원)`],
        ['받는 기간', '120~240일 (50세 이상·장애인은 150~270일), 가입기간과 나이로 결정'],
        ['월급 300만·5년', `하루 ${won(R.dailyBenefit)}원 × ${R.benefitDays}일 = ${won(R.totalBenefit)}원`],
        ['신청 기한', '퇴사 다음 날부터 12개월 안에 다 받아야 하니 퇴사 직후 신청'],
        ['신청 순서', '이직확인서 확인, 워크넷 구직등록, 고용센터 수급자격 신청, 실업인정(4주마다)'],
        ['자발적 퇴사', '원칙 불가. 임금체불·통근 3시간·질병 등 정당한 사유는 예외'],
        ['검증', `고용24 실업급여 모의계산과 일치, 상한액은 시행령 §68 원문 확인 (${VERIFIED})`],
      ],
    },
    sections: [
      { id: 's1', h2: '실업급여 조건, 나도 받을 수 있나요 (수급자격 판정)', sub: '세 가지만 맞으면 받을 수 있어요', blocks: [
        { type: 'p', lead: true, ans: '회사 사정으로 그만뒀고, 퇴사 전 18개월 동안 고용보험에 180일 이상 들어 있었고, 다시 일할 생각이 있으면 받을 수 있어요.', text: '아래에서 내 상황을 체크해 보세요.' },
        { type: 'tree', id: 'tree', questions: [
          { q: '① 퇴사 이유가 회사 쪽 사정인가요?', hint: '권고사직·계약만료·폐업·정리해고 = 예. 자발적 퇴사는 원칙 아니오 (단, 임금체불·통근 3시간·질병은 예)', no: { title: '원칙적으로는 어려워요', text: '자발적 퇴사는 제외예요. 다만 임금체불 2개월 이상, 회사 이전으로 왕복 3시간 이상, 질병으로 업무 불가(의사 소견), 육아로 휴직이 안 될 때 같은 "정당한 사유"가 있으면 예외예요. 증빙을 챙겨 고용센터에 상담하세요.' } },
          { q: '② 퇴사 전 18개월 안에 고용보험 180일 이상인가요?', hint: '주 5일 근무면 대략 7개월. 여러 회사를 합쳐도 돼요', no: { title: '가입기간이 모자라요', text: '퇴사 전 18개월 안에 180일이 안 되면 못 받아요. 이전 회사 가입기간도 합산되니 고용24에서 피보험자격 이력을 확인해 보세요.' } },
          { q: '③ 지금 일할 수 있고, 구직활동을 할 건가요?', hint: '질병·출산으로 당장 못 하면 "수급기간 연기" 신청 후 나중에 받아요', no: { title: '지금은 못 받지만, 나중에 받을 수 있어요', text: '질병·부상·출산·군복무로 당장 일할 수 없으면 "수급기간 연기 신고"를 해두면 나중에 받을 권리가 유지돼요.' } },
        ], ok: { title: '받을 수 있어요', text: '고용센터에 수급자격을 신청하세요. 아래 4단계대로 하면 돼요.' } },
        { type: 'h3', id: 'reasons', text: '자발적 퇴사인데 실업급여 받는 경우, 정당한 이직 사유 전체' },
        { type: 'p', ans: '아래 사유 중 하나면 스스로 사표를 냈어도 받을 수 있어요.', text: '법에 정해진 목록 그대로예요. 핵심은 서류예요. 온라인으로 뗄 수 있는 서류는 발급 페이지로 바로 연결해 뒀고, 병원·회사에서만 받을 수 있는 건 어디서 받는지 적었어요.' },
        { type: 'table', text: true, caption: '자발적 퇴사여도 실업급여를 받을 수 있는 정당한 이직 사유 (시행규칙 별표2)', headers: ['구분', '사유', '준비 서류 (발급처)'], rows: [
          { docs: true, cells: ['임금·근로조건', '퇴사 전 1년 안에 2개월 이상: 임금체불, 최저임금 미달, 채용 때 약속보다 낮아진 근로조건, 연장근로 제한 위반, 휴업으로 평균임금 70% 미만 지급', docs([{ label: '급여명세서·근로계약서 (회사)' }, D.insure4, D.labor('임금체불 진정 (노동포털)')])] },
          { docs: true, cells: ['괴롭힘·차별', '종교·성별·장애·노조활동 차별, 성희롱·성폭력, 직장 내 괴롭힘', docs([{ label: '녹취·메신저 기록·동료 진술' }, D.labor('괴롭힘 신고 (노동포털)')])] },
          { docs: true, cells: ['회사 사정', '도산·폐업이 확실하거나 대량 감원 예정, 양도·합병·업종전환·조직 축소·경영악화로 권고사직이나 희망퇴직 모집', docs([{ label: '회사 공지·희망퇴직 안내문' }, D.history])] },
          { docs: true, cells: ['통근 3시간 이상', '사업장 이전, 다른 지역 전근, 배우자·부양가족과 동거를 위한 이사 등으로 왕복 통근이 3시간 이상', docs([{ label: '사업장 이전 공지' }, D.chobon])] },
          { docs: true, cells: ['가족 간병', '부모·동거 친족의 질병·부상으로 30일 이상 본인이 간호해야 하는데 휴가·휴직이 안 될 때', docs([{ label: '진단서 (병원)' }, D.family, { label: '휴직 불허 자료 (회사)' }])] },
          { docs: true, cells: ['본인 건강', '질병·부상·체력 부족·심신장애로 업무가 곤란한데 업무 전환이나 휴직이 안 될 때 (의사 소견서와 사업주 의견으로 확인)', docs([{ label: '진단서·의사 소견서 (병원)' }, { label: '사업주 의견서 (회사)' }])] },
          { docs: true, cells: ['임신·출산·육아·병역', '임신, 출산, 8세 이하(초2 이하) 자녀 육아, 의무복무로 계속 근무가 어려운데 휴가·휴직이 안 될 때', docs([{ label: '임신확인서 (병원)' }, D.family, { label: '휴직 불허 자료 (회사)' }])] },
          { docs: true, cells: ['안전·위법', '중대재해 사업장이 시정명령을 안 지켜 같은 위험에 노출, 회사 업무가 법 개정으로 위법이 되거나 금지 재화를 만들게 된 경우', docs([{ label: '시정명령서 (노동청 통지)' }, { label: '관련 공문 (회사)' }])] },
          { docs: true, cells: ['정년·계약만료', '정년 도래, 계약기간 만료로 계속 다닐 수 없게 된 경우 (본인이 재계약을 거절하면 제외)', docs([{ label: '근로계약서 (회사)' }, D.history])] },
          { docs: true, cells: ['그 밖에', '같은 여건이면 보통의 다른 근로자도 그만뒀을 것이라고 객관적으로 인정되는 경우', docs([{ label: '상황을 보여주는 자료' }, { label: '고용센터 상담 (고용24)', href: WORK24 }])] },
        ], fn: '출처: 고용보험법 시행규칙 제101조②·별표2, 법제처 생활법령정보 2026.8.15 기준.' },
      ] },

      { id: 's2', h2: '실업급여 얼마나 받나요 (월급별 하루 금액 표)', sub: '퇴사 전 3개월 평균임금의 60%, 단 하한·상한 안에서', blocks: [
        { type: 'p', lead: true, ans: `월급 300만원이면 하루 ${won(R.dailyBenefit)}원이에요.`, text: `300만원의 60%는 60,000원인데, 2026년 하한이 ${won(C.DAILY_LOWER_LIMIT)}원이라 하한을 받아요. 월급 ${man(floorSalary)}원까지는 다 같은 금액이고, 그 위부터 조금씩 올라가다가 월급 약 ${man(capSalary)}원에서 상한 ${won(C.DAILY_UPPER_LIMIT)}원에 닿아요.` },
        { type: 'flow', label: '실업급여 하루 금액 계산 순서', steps: [
          { label: '퇴사 전 3개월 평균', value: `하루 ${won(R.rawDailyWage)}원`, sub: '월급 300만원 × 3 ÷ 90일', op: '×60%' },
          { label: '법정 비율', value: `${won(R.rawBenefit)}원`, sub: '하한보다 적어요', op: '→' },
          { label: '하한 적용', value: `${won(R.dailyBenefit)}원`, sub: `2026년 하한 ${won(C.DAILY_LOWER_LIMIT)}원` },
        ] },
        { type: 'table', id: 'salTbl', compact: true, moreLabel: '총액까지 보기', x: [5], net: 3, caption: '2026년 실업급여 월급별 하루 금액 표 (퇴사 전 월급 200만원부터 500만원까지)', headers: ['퇴사 전 월급', '하루 평균임금', '60%', '실제 하루 금액', '적용', '5년 근무 총액'],
          rows: SAL.map(({ m, r }) => ({ hi: m === 3e6, cells: [`${man(m)}원`, won(r.rawDailyWage), won(r.rawBenefit), won(r.dailyBenefit), r.rawBenefit < C.DAILY_LOWER_LIMIT ? '하한 적용' : r.rawBenefit > C.DAILY_UPPER_LIMIT ? '상한 적용' : '60% 그대로', won(r.totalBenefit)] })),
          fn: `단위: 원. 하루 평균임금 = 3개월 임금 ÷ 90일. 총액은 5년 근무·50세 미만(${R.benefitDays}일) 기준. 고용24 모의계산 결과와 같아요.` },
        { type: 'widget', label: '내 실업급여 계산', title: '내 월급으로 바로 보기', note: '이 글의 표와 같은 산식이에요. 퇴사 전 3개월 평균 월급, 고용보험 가입기간, 나이만 고르세요.',
          inputs: [
            { id: 'ws', label: '퇴사 전 월급 (만원)', type: 'number', value: 300, min: 100, max: 2000, step: 10 },
            { id: 'wy', label: '고용보험 가입기간', type: 'select', value: 7, options: [[0.5, '1년 미만'], [2, '1년 이상 3년 미만'], [4, '3년 이상 5년 미만'], [7, '5년 이상 10년 미만'], [12, '10년 이상']] },
            { id: 'wo', label: '퇴사 당시 나이', type: 'select', value: 0, options: [[0, '50세 미만'], [1, '50세 이상 또는 장애인']] },
          ],
          outputs: [{ id: 'wt', label: '총 지급액' }, { id: 'wdaily', label: '하루 금액' }, { id: 'wdays', label: '지급 일수' }, { id: 'wmon', label: '한 달(30일) 기준' }],
          // 브라우저 산식 포트. build.mjs 가 아래 check 로 엔진과 대조한다.
          port: `var RULES=${JSON.stringify(spec.tables.benefitDays.rules)}, LOW=${C.DAILY_LOWER_LIMIT}, HIGH=${C.DAILY_UPPER_LIMIT}, BONUS=${C.ELDERLY_DISABLED_BONUS_DAYS};
  function ub(m,y,old){ var raw=Math.round(Math.round(m*3/90)*0.6); var d=raw<LOW?LOW:(raw>HIGH?HIGH:raw); var days=120; for(var i=0;i<RULES.length;i++){var r=RULES[i]; if(r.minYears<=y&&(r.maxYears===null||y<r.maxYears)){days=r.days;break;}} if(old&&y>=1)days+=BONUS; return {d:d,days:days,t:d*days}; }`,
          js: `
  function wrender(){ var m=(+document.getElementById('ws').value||0)*1e4, y=+document.getElementById('wy').value, o=+document.getElementById('wo').value; if(m<=0)return; var r=ub(m,y,o);
    document.getElementById('wt').textContent=won(r.t)+'원'; document.getElementById('wdaily').textContent=won(r.d)+'원'; document.getElementById('wdays').textContent=r.days+'일 (약 '+Math.round(r.days/30)+'개월)'; document.getElementById('wmon').textContent=won(r.d*30)+'원'; }
  ['ws','wy','wo'].forEach(function(id){document.getElementById(id).addEventListener('input',wrender)}); wrender();`,
          check: (port) => {
            let n = 0, bad = 0;
            for (let mw = 100; mw <= 2000; mw += 10) for (const y of [0.5, 2, 4, 7, 12]) for (const o of [false, true]) {
              n++; const w = port.ub(mw * 1e4, y, o); const e = ub(mw * 1e4, y, o);
              if (w.t !== e.totalBenefit || w.d !== e.dailyBenefit || w.days !== e.benefitDays) bad++;
            }
            return { n, bad };
          },
        },
        { type: 'note', title: '월급이 달라도 금액이 같은 이유', text: `하한 ${won(C.DAILY_LOWER_LIMIT)}원 때문이에요. 2026년 최저임금이 올라 하한이 커지면서, 월급 ${man(floorSalary)}원 이하는 모두 같은 금액을 받아요.` },
      ] },

      { id: 's3', h2: '실업급여 몇 개월 받나요 (가입기간·나이별 일수)', sub: '일수는 월급이 아니라 고용보험 가입기간과 나이로 정해져요', blocks: [
        { type: 'p', lead: true, ans: `5년 근무·50세 미만이면 ${DAYS[3].u}일(${mo(DAYS[3].u)}), 50세 이상이면 ${DAYS[3].o}일이에요.`, text: '여러 회사 가입기간을 다 더해서 계산해요.' },
        { type: 'table', net: 2, caption: '실업급여 지급 일수 표 (고용보험 가입기간과 나이별)', headers: ['고용보험 가입기간', '50세 미만', '50세 이상 · 장애인'],
          rows: DAYS.map(({ label, u, o }, i) => ({ hi: i === 3, cells: [label, `${u}일 (${mo(u)})`, `${o}일 (${mo(o)})`] })),
          fn: '고용보험법 별표1. 1년 미만은 50세 이상이어도 가산이 없어요(고용24 모의계산 확인).' },
      ] },

      { id: 's4', h2: '2026년 실업급여 상한액 하한액, 왜 다들 66,048원인가요', sub: '법과 정부 계산기가 다른 드문 경우라 어느 쪽이 맞는지 확인했어요', blocks: [
        { type: 'p', lead: true, ans: `2026년 상한은 하루 ${won(C.DAILY_UPPER_LIMIT)}원이 맞아요.`, text: `고용보험법 시행령이 2025년 12월 23일 개정돼 기초일액 상한이 113,500원이 됐고, 그 60%가 ${won(C.DAILY_UPPER_LIMIT)}원이에요. 그런데 고용24 간편 모의계산은 아직 옛 상한(66,000원)으로 계산해서, 월급이 아무리 높아도 ${won(TOOL_CAP)}원으로 나와요. 이 글과 계산기는 법령을 따라요.` },
        { type: 'table', net: 2, caption: '2025년과 2026년 실업급여 상한액 하한액 비교', headers: ['구분', '2025년', '2026년', '근거'], rows: [
          { cells: ['하루 하한', won(LOW_2025), won(C.DAILY_LOWER_LIMIT), `최저임금(2025년 ${won(MINWAGE_2025)}원, 2026년 10,320원) × 8시간 × 80%`] },
          { cells: ['하루 상한', '개정 전 기준', won(C.DAILY_UPPER_LIMIT), '시행령 §68 기초일액 113,500 × 60% (2025.12.23 개정)'] },
          { cells: ['한 달(30일) 최대', won(LOW_2025 * 30 > 0 ? derive(LOW_2025 * 30) : 0) + ' (하한 기준)', won(capMonth), '상한 × 30일'] },
        ] },
      ] },

      { id: 's5', h2: '실업급여 신청 방법 4단계 (이직확인서부터 첫 지급까지)', sub: '퇴사 다음 날부터 12개월 안에 다 받아야 하니 바로 시작하세요', blocks: [
        { type: 'p', lead: true, ans: '이직확인서 확인, 워크넷 구직등록, 고용센터 수급자격 신청, 4주마다 실업인정. 이 네 단계예요.', text: '첫 돈은 보통 신청 후 2~3주 뒤에 들어와요.' },
        { type: 'steps', items: [
          { title: '이직확인서 확인', text: '회사가 고용보험에 제출해요. 고용24에서 처리 여부를 확인하고, 안 냈으면 회사에 요청하세요(요청받은 날부터 10일 내 제출 의무)', meta: '준비물: 없음 · 퇴사 후 바로', link: { label: '이직확인서 확인', href: 'https://www.work24.go.kr/cm/f/c/0100/selectUnifySearch.do?topQuerySearchArea=all&topQueryData=%EC%9D%B4%EC%A7%81%ED%99%95%EC%9D%B8%EC%84%9C' } },
          { title: '워크넷 구직등록', text: '고용24(옛 워크넷)에서 이력서 등록 후 구직 신청. 온라인 수급자격 교육(약 1시간)도 미리 들어두면 빨라요', meta: '준비물: 공동인증서 · 10분', link: { label: '구직등록 바로가기', href: WORK24 } },
          { title: '고용센터 수급자격 신청', text: '거주지 관할 고용센터 방문(첫 회는 방문 필수). 신분증 지참. 여기서 1차 실업인정일이 정해져요', meta: '준비물: 신분증 · 30분', link: { label: '고용센터 찾기', href: WORK24 } },
          { title: '실업인정 (4주마다)', text: '구직활동 증빙(입사지원·면접·교육)을 내면 그 기간 급여가 지급돼요. 2·3차부터는 온라인 가능', meta: '첫 지급: 신청 후 약 2~3주' },
        ] },
      ] },

      { id: 's5b', h2: '실업급여 구직활동 몇 번 해야 하나요 (실업인정 회차별 기준)', sub: '회차마다 해야 할 일이 달라요. 1차와 4차는 고용센터에 직접 가야 해요', blocks: [
        { type: 'p', ans: '일반 수급자는 2~4차엔 4주에 1번, 5차부터는 4주에 2번 재취업활동을 해야 하고, 5차부터는 그중 1번은 꼭 입사지원·면접 같은 구직활동이어야 해요.', text: '1차 실업인정일은 실업신고일부터 14일째, 2·3차는 직전 인정일 다음 날부터 28일째로 잡혀요. 실업인정을 받은 다음 날 통장에 들어와요.' },
        { type: 'timeline', label: '실업인정 회차별 일정', items: [
          { step: '1차', title: '실업신고 후 14일째', text: '고용센터 출석, 집체교육', tag: '출석', mark: true },
          { step: '2·3차', title: '28일마다', text: '4주에 재취업활동 1회 이상', tag: '온라인 가능' },
          { step: '4차', title: '7~28일 뒤 지정', text: '4주에 1회 이상', tag: '출석', mark: true },
          { step: '5차~', title: '보통 4주마다', text: '4주에 2회 이상, 구직활동 1회 필수', tag: '온라인 가능' },
        ] },
        { type: 'table', text: true, caption: '실업인정 회차별 출석과 재취업활동 최소 횟수 (일반 수급자)', headers: ['회차', '언제', '출석', '해야 할 재취업활동'], rows: [
          { cells: ['1차', '실업신고 후 14일째', '고용센터 출석', '집체교육 수강 (활동 증빙 없음)'] },
          { cells: ['2·3차', '직전 인정일 다음 날부터 28일째', '온라인 가능', '4주에 1회 이상 (구직활동 또는 구직외활동)'] },
          { cells: ['4차', '직전 인정일 후 7~28일, 담당자 지정', '고용센터 출석', '4주에 1회 이상'] },
          { cells: ['5차부터', '담당자 지정 (보통 4주)', '온라인 가능', '4주에 2회 이상, 그중 1회는 반드시 구직활동'] },
        ], fn: '1차 14일, 2·3차 28일, 4차 이후 7~28일은 고용노동부 예규 「실업인정 및 재취업지원규정」 제12조(2026.9.1 시행) 기준이에요. 회차와 주기는 사람마다 달라서 수급자격증에 적힌 날짜가 우선이에요.' },
        { type: 'table', text: true, caption: '반복·장기 수급자와 60세 이상은 재취업활동 기준이 달라요', headers: ['수급자 유형', '강화된 기준'], rows: [
          { cells: ['반복 수급자 (5년에 3회 이상)', '2차부터 구직활동만 인정, 4차부터 4주에 2회'] },
          { cells: ['장기 수급자 (210일 이상)', '5~7차 4주에 2회(구직활동 1회 포함), 8차부터 1주에 1회 구직활동만'] },
          { cells: ['60세 이상·장애인', '2차부터 4주에 1회, 자원봉사 같은 활동도 더 넓게 인정'] },
        ] },
        { type: 'tips', items: [
          { title: '구직활동으로 인정되는 것', text: '입사지원(고용24 온라인 지원은 횟수 제한 없음), 면접 응시, 채용박람회 참여. 같은 날 여러 건은 1건만 쳐요.' },
          { title: '구직외활동으로 인정되는 것', text: '고용센터 취업특강·프로그램, 정부 지원 직업훈련(출결 관리되는 과정), 직업심리검사(전체 기간 1회), 단기특강(전체 기간 3회까지), 자영업 준비활동(점포 계약·시장조사 자료).' },
          { title: '인정 안 되는 것', text: '어학학원 수강, 취업 의사 없이 같은 회사만 반복 지원, 정당한 사유 없는 면접 불참. <em>허위 구직활동은 그 기간 부지급, 2회 적발이면 남은 기간 전체 지급정지예요.</em> 형식적 구직활동은 1회 경고, 2회면 그 기간 부지급이에요.' },
          { title: '다른 사람이 대신 신청하면', text: '실업인정은 본인이 고용센터 방문 또는 온라인·모바일로 직접 해야 해요. 가족이 대신 하면 부정수급이에요.' },
        ] },
      ] },

      { id: 's6', h2: '실업급여 받다가 취업하면, 알바하면 어떻게 되나요', sub: '일찍 취업하면 남은 돈의 절반을 보너스로, 알바는 신고하면 돼요', blocks: [
        { type: 'p', lead: true, ans: '받을 날이 절반 이상 남았을 때 취업해서 12개월 다니면, 남은 금액의 50%를 "조기재취업수당"으로 한 번에 받아요.', text: `예를 들어 ${R.benefitDays}일 중 ${Math.floor(R.benefitDays / 2)}일 이상 남기고 취업하면 남은 ${won(R.dailyBenefit)}원 × 남은 일수의 절반이에요.` },
        { type: 'tips', items: [
          { title: '알바·단기 일을 했다면', text: '실업인정일에 일한 날을 신고하면 돼요. 월 60시간(주 15시간) 미만이고 3개월 미만인 단기 일은 "취업"으로 보지 않아요. 그래서 수급은 이어져요. 다만 그날 소득이 구직급여 하루 금액 이상이면 그날 급여는 안 나와요. 신고 없이 받으면 부정수급이에요.' },
          { title: '실업급여 받는 동안 건강보험', text: '지역가입자로 바뀌어요. 보험료가 오르면 "임의계속가입"으로 직장 보험료 수준을 최대 36개월 유지할 수 있어요. 신청 뒤 첫 보험료를 납부기한부터 2개월 안에 내야 자격이 유지돼요.' },
          { title: '국민연금', text: '실업크레딧을 신청하면 보험료의 75%를 국가가 대신 내주고 가입기간으로 인정돼요 (최대 12개월).' },
        ] },
      ] },
    ],
    faq: [
      ['자발적으로 퇴사하면 실업급여 못 받나요?', '원칙은 못 받아요. 다만 임금체불 2개월 이상, 회사 이전으로 통근 3시간 이상, 질병으로 업무 불가(의사 소견) 같은 "정당한 이직 사유"면 자발적 퇴사여도 받을 수 있어요. 사유 증빙이 핵심이에요.'],
      ['월급 300만원이면 실업급여 얼마인가요?', `하루 ${won(R.dailyBenefit)}원, 5년 가입·50세 미만이면 ${R.benefitDays}일 동안 총 <b>${won(R.totalBenefit)}원</b>이에요. 월급 300만원의 60%는 하루 60,000원인데 2026년 하한 ${won(C.DAILY_LOWER_LIMIT)}원이 더 커서 하한이 적용돼요.`],
      ['실업급여 신청은 퇴사 후 언제까지 해야 하나요?', '퇴사 다음 날부터 12개월 안에 받을 수 있는 날수를 다 써야 해요. 늦게 신청하면 그만큼 못 받는 날이 생기니 퇴사 후 바로 워크넷 구직등록과 고용센터 신청을 하세요.'],
      ['계약 만료도 실업급여 되나요?', '돼요. 계약 기간이 끝나 회사가 재계약을 안 한 경우는 비자발적 이직이에요. 본인이 재계약을 거절했다면 안 돼요.'],
      ['실업급여 받는 동안 4대보험은 어떻게 되나요?', '직장 건강보험은 퇴사와 함께 지역가입자로 바뀌어요. 보험료가 부담되면 "임의계속가입"으로 직장 보험료 수준을 최대 36개월 유지할 수 있어요. 신청 뒤 첫 보험료를 납부기한부터 2개월 안에 내야 자격이 유지돼요. 국민연금은 실업크레딧으로 보험료의 75%를 지원받을 수 있어요.'],
    ],
    summary: [
      '조건: 비자발적 퇴사, 18개월 중 180일 이상 가입, 일할 의사. 자발적 퇴사는 정당한 사유가 있을 때만.',
      `금액: 평균임금의 60%, 2026년 하루 하한 ${won(C.DAILY_LOWER_LIMIT)}원·상한 ${won(C.DAILY_UPPER_LIMIT)}원. 월급 300만원·5년이면 ${won(R.totalBenefit)}원.`,
      '기간: 가입기간·나이로 120~270일. 퇴사 다음 날부터 12개월 안에 다 받아야 해요.',
      '신청: 이직확인서 확인, 워크넷 구직등록, 고용센터 신청, 4주마다 실업인정.',
    ],
    sources: [
      ['법령', '고용보험법 제40조(수급요건), 제46조(구직급여일액), 제48조(수급기간 12개월), 제50조 및 별표1(소정급여일수), 제58조(이직 사유 제한), 제64조(조기재취업수당). 시행령 제68조(기초일액 상한 113,500원, 2025.12.23 개정), 제84조(조기재취업수당 요건과 금액). 시행규칙 제92조(취업 인정 기준), 별표2(정당한 이직 사유). 국민건강보험법 제110조(임의계속가입). 하한은 최저임금법에 따른 2026년 최저임금 10,320원.'],
      ['행정규칙·정부 안내', '고용노동부 예규 「실업인정 및 재취업지원규정」 제249호 제10조·제12조(2026.9.1 시행, 실업인정일 지정 기준과 재취업활동 인정 범위). 고용노동부 「실업급여 지급 요건 강화, 무엇이 달라지나」 정책브리핑(2022.6.29, 회차별 재취업활동 횟수, 2022.7.1 시행). 고용24 실업급여 제도 안내(신청 절차, 허위·형식적 구직활동 제재). 법제처 생활법령정보 실업급여(2026.8.15 기준, 정당한 이직 사유 목록).'],
      ['정부 도구', `고용24 실업급여 간편 모의계산과 하한·일수 케이스 5건 일치 (${VERIFIED}). 상한 케이스는 도구가 개정 전 값을 써서 법령 원문을 기준으로 했어요.`],
    ],
    // 조건·기준 문장의 원문 인용. src = brief.sources 번호. 글자 그대로 근거 텍스트에 있어야 빌드 통과.
    claims: [
      { src: 1, quote: '18개월로 하되, 근로자인 피보험자가 다음 각 호의 어느 하나에 해당하는 경우에는', note: '수급요건: 기준기간은 이직일 이전 18개월 (제40조②)' },
      { src: 1, quote: '이하 같다)이 합산하여 180일 이상일 것', note: '수급요건: 피보험 단위기간 180일 (제40조①1)' },
      { src: 1, quote: '100분의 60을 곱한 금액으로 한다', note: '구직급여일액 = 기초일액 × 60% (제46조)' },
      { src: 1, quote: '이직일의 다음 날부터 계산하기 시작하여 12개월 내에', note: '수급기간 12개월' },
      { src: 2, quote: '임금일액이 11만3500원을 초과하는 경우에는 11만3500원을 해당 임금일액으로 한다', note: '기초일액 상한 (2025.12.23 개정)' },
      { src: 6, quote: '1차 실업인정일: 실업신고일부터 14일이 되는 날', note: '실업인정일 지정' },
      { src: 6, quote: '2차 및 3차 실업인정일: 직전 실업인정일의 다음 날부터 28일이 되는 날', note: '실업인정일 지정' },
      { src: 7, quote: '5차 실업 인정일부터 : 재취업 활동 최소 4주 2회 이상', note: '회차별 재취업활동' },
      { src: 4, quote: '통근 시 이용할 수 있는 통상의 교통수단으로는 사업장으로의 왕복에 드는 시간이 3시간 이상인 경우', note: '정당한 이직 사유: 통근 곤란' },
      { src: 9, quote: '신청 후 최초로 내야 할 직장가입자 보험료를 그 납부기한부터 2개월이 지난 날까지 내지 아니한 경우에는 그 자격을 유지할 수 없다', note: '임의계속가입: 첫 보험료를 납부기한 2개월 안에 내야 자격 유지 (제110조②)' },
    ],
    related: [
      { kind: '계산기', label: '실업급여 계산기', href: '/unemployment/' },
      { kind: '법률 가이드', label: '퇴직금 계산과 평균임금', href: '/severance/' },
      { kind: '정부지원금 가이드', label: '육아휴직급여 2026', href: '/parental-leave/' },
    ],
  };
}
