/**
 * 글 스펙: 2026 퇴직금
 *   숫자는 전부 엔진(severance-pay: 고용노동부 계산기 1:1)이 만든다.
 *   조건·기한·사유 문장은 claims 로 법령 원문을 인용해 둔다.
 */
import { won, man, docs } from '../render.mjs';

export default function article({ calculators, loadSpec, VERIFIED, derive = (v) => v }) {
  const spec = loadSpec('law/severance-pay');
  const sev = (hireDate, retireDate, monthlySalary, annualBonus = 0, unusedAnnualLeavePay = 0) =>
    calculators['severance-pay']({ hireDate, retireDate, monthlySalary, annualBonus, unusedAnnualLeavePay }, spec);

  // 대표: 월급 300만원, 근속 5년. 입사일은 재직일수가 정확히 5×365=1,825일이 되도록 잡아 위젯과 표가 같은 숫자를 낸다
  const R = sev('2021-01-02', '2026-01-01', 3e6);
  const R1 = sev('2025-01-01', '2026-01-01', 3e6);                    // 1년
  const R3 = sev('2023-01-02', '2026-01-01', 3e6);                    // 3년 (1,095일)
  const R10 = sev('2016-01-04', '2026-01-01', 3e6);                   // 10년 (3,650일)
  const RB = sev('2021-01-02', '2026-01-01', 3e6, 6e6, 1.2e6);        // 상여·연차수당 포함
  const YEARS = [['1년', R1], ['3년', R3], ['5년', R], ['10년', R10]];
  const SALARY = [2e6, 2.5e6, 3e6, 3.5e6, 4e6, 5e6].map((m) => ({ m, r: sev('2021-01-02', '2026-01-01', m) }));
  const QUICK = [2.5e6, 3e6, 4e6].map((m) => ({ m, r: sev('2021-01-02', '2026-01-01', m) }));

  const bonusGain = derive(RB.severance - R.severance);
  const yearOne = derive(Math.round(R.severance / 5));                 // 근속 1년당 대략 금액
  const daysIn3M = R.sumday;                                           // 퇴사 직전 3개월 총일수
  const R89 = sev('2021-03-02', '2026-03-01', 3e6);                    // 3개월 총일수가 짧은 경우 (12~2월 = 90일)
  const dailyGap = derive(Math.round(R89.avgDailyWage - R.avgDailyWage));
  const LABOR = 'https://labor.moel.go.kr/anmtDclrCntr/main.do';
  // 근로기준법 제37조 지연이자 연 20% (퇴사 14일 경과 후부터)
  const LATE = [30, 60, 90, 180].map((d) => ({ d, interest: derive(Math.floor(R.severance * 0.2 * d / 365)) }));

  return {
    slug: 'severance-pay-guide', cat: 'law', catLabel: '법률', crumb: '퇴직금',
    title: '퇴직금 계산 방법과 지급기준, 평균임금부터 14일 지급기한까지',
    description: `월급 300만원으로 5년 일하고 그만두면 퇴직금은 ${won(R.severance)}원이에요. 퇴직금은 평균임금 기준이라 상여금과 연차수당까지 들어가요. 계산 순서, 근속별·월급별 금액표, 14일 지급기한, 못 받았을 때 신고 방법을 정리했어요.`,
    datePublished: '2026-09-03', verified: VERIFIED, basis: '2026년 9월 기준', readMinutes: 7,
    badge: `고용노동부 퇴직금 계산기와 1원 단위 일치 · ${VERIFIED}`,
    calc: { href: '/severance/calculator/', label: '퇴직금 계산기 바로가기' },
    hero: {
      tag: '법률', line1: '퇴직금 계산 방법과 지급기준', line2: '평균임금부터 14일까지',
      sub1: `월급 300만원 · 5년 근무 → ${won(R.severance)}원`,
      sub2: `하루 평균임금 ${won(R.avgDailyWage)}원 × 30일 × (재직일수 ÷ 365)`,
      foot: `고용노동부 퇴직금 계산기와 1원 단위 일치 · ${VERIFIED} 검증`,
      card: { label: '퇴직금', big: won(R.severance), unit: '원', l1: `월급 300만원`, l2: `근속 5년 (${R.termDays}일)` },
      alt: `퇴직금 계산 방법. 월급 300만원으로 5년 일하면 퇴직금 ${won(R.severance)}원`,
    },
    intro: `퇴직금은 "월급 곱하기 근속연수"가 아니에요. 퇴사 직전 3개월 평균임금으로 계산하고, 그 안에 상여금과 연차수당까지 들어가요. 월급 300만원으로 5년 일했다면 ${won(R.severance)}원이고, 같은 조건에서 상여금 600만원과 연차수당이 있으면 ${won(RB.severance)}원으로 늘어요. 계산 순서, 근속별 금액표, 지급 기한과 못 받았을 때 할 일을 순서대로 정리했어요.`,
    answer: {
      label: '퇴사 전 월급을 고르면 바로 답해요 (5년 근무 기준)',
      quick: QUICK.map(({ m, r }) => ({ chip: `${man(m)}원`, selected: m === 3e6, big: `${won(r.severance)}원`, unit: '퇴직금', sub: `하루 평균임금 ${won(r.avgDailyWage)}원 × 30일 × 5년` })),
      boxes: [
        { title: '1년 이상 일해야 받아요', text: '계속근로기간 1년 미만이거나 4주 평균 주 15시간 미만이면 퇴직금 의무가 없어요' },
        { title: `근속 1년당 약 ${won(yearOne)}원`, text: `월급 300만원 기준. 정확히는 하루 평균임금 ${won(R.avgDailyWage)}원 × 30일이에요` },
      ],
    },
    keyPoints: {
      title: '한눈에 보는 퇴직금',
      rows: [
        ['받는 조건', '계속근로 1년 이상, 4주 평균 주 15시간 이상 근무'],
        ['계산식', '하루 평균임금 × 30일 × (재직일수 ÷ 365)'],
        ['평균임금', '퇴사 전 3개월 임금 총액 ÷ 그 기간 총일수'],
        ['월급 300만·5년', `${won(R.severance)}원 (하루 평균임금 ${won(R.avgDailyWage)}원)`],
        ['상여·연차수당', `연간 상여의 3/12, 전년 미사용 연차수당의 3/12이 평균임금에 들어가요`],
        ['지급 기한', '퇴사한 날부터 14일 안에 지급, 합의하면 연장 가능'],
        ['안 주면', '고용노동부 임금체불 진정. 지연이자 연 20%'],
        ['세금', '퇴직소득세는 근속연수공제와 환산급여공제를 거쳐 따로 계산해요'],
      ],
    },
    sections: [
      { id: 's1', h2: '퇴직금 계산 방법, 어떻게 계산하나요', sub: '하루 평균임금 × 30일 × (재직일수 ÷ 365)', blocks: [
        { type: 'p', lead: true, ans: `월급 300만원으로 5년(${R.termDays}일) 일했다면 퇴직금은 ${won(R.severance)}원이에요.`, text: `퇴사 직전 3개월 임금 ${won(R.threeMonthTotal)}원을 그 기간 총일수 ${daysIn3M}일로 나눈 ${won(R.avgDailyWage)}원이 하루 평균임금이고, 여기에 30일과 근속연수를 곱해요.` },
        { type: 'flow', label: '퇴직금 계산 순서', steps: [
          { label: '퇴사 전 3개월 임금', value: `${won(R.threeMonthTotal)}원`, sub: `${daysIn3M}일치`, op: '÷' },
          { label: '3개월 총일수', value: `${daysIn3M}일`, sub: '달력 날짜 그대로', op: '=' },
          { label: '하루 평균임금', value: `${won(R.avgDailyWage)}원`, sub: '× 30일 × 재직일수 ÷ 365', op: '=' },
          { label: '퇴직금', value: `${won(R.severance)}원`, sub: `근속 ${R.termDays}일` },
        ] },
        { type: 'table', net: 3, caption: '근속기간별 퇴직금 (월급 300만원 기준)', headers: ['근속기간', '재직일수', '하루 평균임금', '퇴직금'],
          rows: YEARS.map(([label, r]) => ({ hi: label === '5년', cells: [label, `${r.termDays}일`, `${won(r.avgDailyWage)}원`, `${won(r.severance)}원`] })),
          fn: '재직일수는 입사일부터 퇴사일까지 달력 날짜예요. 1년을 못 채우면 퇴직금 지급 의무가 없어요.' },
        { type: 'note', title: '퇴사 날짜에 따라 금액이 달라져요', text: `3개월 총일수가 며칠이냐로 하루 평균임금이 바뀌어요. 같은 월급 300만원인데 3월 퇴사(직전 3개월 90일)는 하루 ${won(R89.avgDailyWage)}원, 1월 퇴사(${daysIn3M}일)는 ${won(R.avgDailyWage)}원이에요.` },
      ] },

      { id: 's2', h2: '월급별 퇴직금 얼마인가요 (5년 근무 기준)', sub: '월급 200만원부터 500만원까지', blocks: [
        { type: 'p', ans: `월급 200만원이면 ${won(SALARY[0].r.severance)}원, 300만원이면 ${won(R.severance)}원, 500만원이면 ${won(SALARY[5].r.severance)}원이에요.`, text: '기본급만 넣은 금액이라, 상여금이나 연차수당이 있으면 이보다 늘어요.' },
        { type: 'table', id: 'salTbl', compact: true, moreLabel: '전체 항목 보기', x: [2, 3], net: 1, caption: '월급별 퇴직금 표 (근속 5년, 상여금 없음 기준)', headers: ['퇴사 전 월급', '퇴직금', '하루 평균임금', '3개월 임금'],
          rows: SALARY.map(({ m, r }) => ({ hi: m === 3e6, cells: [`${man(m)}원`, won(r.severance), won(r.avgDailyWage), won(r.threeMonthTotal)] })),
          fn: `단위: 원. 근속 5년(${R.termDays}일) 기준. 고용노동부 퇴직금 계산기와 1원 단위까지 같은 값이에요.` },
        { type: 'widget', label: '내 퇴직금 계산', title: '내 조건으로 바로 보기', note: '퇴사 전 3개월 평균 월급, 근속 연수, 연간 상여금을 넣으면 바로 계산해요. 근속 연수 × 365일 기준이라, 윤년이 낀 실제 입사일로 계산하면 하루치가 더해질 수 있어요.',
          inputs: [
            { id: 'ws', label: '퇴사 전 월급 (만원)', type: 'number', value: 300, min: 100, max: 2000, step: 10 },
            { id: 'wy', label: '근속 연수', type: 'number', value: 5, min: 1, max: 40, step: 1 },
            { id: 'wb', label: '연간 상여금 (만원)', type: 'number', value: 0, min: 0, max: 5000, step: 50 },
          ],
          outputs: [{ id: 'wsev', label: '퇴직금' }, { id: 'wavg', label: '하루 평균임금' }, { id: 'wdays', label: '재직일수' }, { id: 'wmon', label: '월급 대비' }],
          port: `
  // 고용노동부 계산기 산식 (retire_cal.js): 평균임금은 소수 둘째자리 올림, 퇴직금은 반올림 후 버림
  function sevCalc(monthly, years, bonus){
    var days = Math.round(years * 365);
    var sumday = 92;                       // 1월 1일 퇴사 기준 직전 3개월(10~12월)
    var three = monthly * 3 + bonus * 0.25;
    var avg = Math.ceil((three / sumday) * 100) / 100;
    var sev = Math.floor(Math.round(avg * 30 * days / 365));
    return { sev: sev, avg: avg, days: days, three: three };
  }`,
          js: `
  function srender(){ var m=(+document.getElementById('ws').value||0)*1e4, y=+document.getElementById('wy').value||1, bn=(+document.getElementById('wb').value||0)*1e4; if(m<=0)return; var r=sevCalc(m,y,bn);
    document.getElementById('wsev').textContent=won(r.sev)+'원'; document.getElementById('wavg').textContent=won(r.avg)+'원'; document.getElementById('wdays').textContent=r.days+'일'; document.getElementById('wmon').textContent=(r.sev/m).toFixed(1)+'개월치'; }
  ['ws','wy','wb'].forEach(function(id){document.getElementById(id).addEventListener('input',srender)}); srender();`,
          check: (port) => {
            // 퇴사일 2026-01-01 (직전 3개월 = 10~12월 92일), 입사일은 재직일수가 정확히 years×365 가 되도록 역산
            let n = 0, bad = 0;
            for (let mw = 100; mw <= 800; mw += 10) for (const y of [1, 2, 3, 5, 10, 20]) for (const bn of [0, 300, 600]) {
              n++;
              const hire = new Date(Date.UTC(2026, 0, 1) - y * 365 * 86400000).toISOString().slice(0, 10);
              const e = sev(hire, '2026-01-01', mw * 1e4, bn * 1e4, 0);
              const p = port.sevCalc(mw * 1e4, y, bn * 1e4);
              if (p.sev !== e.severance || p.days !== e.termDays) bad++;
            }
            return { n, bad };
          },
        },
      ] },

      { id: 's3', h2: '퇴직금에 상여금과 연차수당도 들어가나요', sub: '평균임금이라 기본급만이 아니에요', blocks: [
        { type: 'p', lead: true, ans: `들어가요. 연간 상여금 600만원과 전년 미사용 연차수당 120만원이 있으면 퇴직금이 ${won(R.severance)}원에서 ${won(RB.severance)}원으로 ${won(bonusGain)}원 늘어요.`, text: '1년치 금액을 그대로 더하는 게 아니라 3개월치에 해당하는 4분의 1(3/12)만 평균임금에 들어가요.' },
        { type: 'table', net: 3, caption: '상여금·연차수당이 있을 때 퇴직금 차이 (월급 300만원, 근속 5년)', headers: ['구분', '3개월 임금 총액', '하루 평균임금', '퇴직금'], rows: [
          { cells: ['기본급만', won(R.threeMonthTotal), won(R.avgDailyWage), won(R.severance)] },
          { hi: true, cells: ['상여 600만 + 연차수당 120만 포함', won(RB.threeMonthTotal), won(RB.avgDailyWage), won(RB.severance)] },
        ], fn: '평균임금에 들어가는 임금은 근로의 대가로 받은 모든 금품이에요. 식대·교통비 같은 고정 수당도 포함돼요.' },
        { type: 'tips', items: [
          { title: '평균임금에 들어가는 것', text: '기본급, 고정 수당(식대·교통비·직책수당), 연장·야간·휴일근로수당, 연간 상여금의 3/12, 전년 미사용 연차수당의 3/12.' },
          { title: '들어가지 않는 것', text: '경조사비처럼 은혜적으로 준 금품, 실비 변상 성격의 출장비, 퇴직 후 지급되는 성과급 등이에요.' },
          { title: '평균임금이 통상임금보다 적으면', text: '통상임금을 평균임금으로 써요. 결근이 많아 3개월 임금이 적어진 사람을 보호하는 규정이에요.' },
        ] },
      ] },

      { id: 's4', h2: '퇴직금 지급기준과 지급기한, 언제까지 줘야 하나요', sub: '퇴사한 날부터 14일, 늦으면 지연이자 연 20%', blocks: [
        { type: 'p', lead: true, ans: '퇴사한 날부터 14일 안에 줘야 해요.', text: `당사자가 합의하면 기일을 늦출 수 있지만, 합의 없이 넘기면 체불이에요. 지연이자는 연 20%라 늦어질수록 붙는 금액이 커져요.` },
        { type: 'table', net: 2, caption: `퇴직금 ${won(R.severance)}원을 못 받았을 때 붙는 지연이자`, headers: ['지연 기간', '지연이자 (연 20%)', '받을 금액'],
          rows: LATE.map(({ d, interest }) => ({ hi: d === 90, cells: [`${d}일`, `${won(interest)}원`, `${won(derive(R.severance + interest))}원`] })),
          fn: '지연이자는 퇴사 14일이 지난 다음 날부터 계산해요. 회사가 도산하거나 천재지변 같은 사정이 있으면 이자가 붙지 않는 기간이 있어요.' },
        { type: 'tips', items: [
          { title: '먼저 서면으로 요청하세요', text: '문자나 메일로 지급을 요청하고 기록을 남기세요. 나중에 진정이나 소송에서 증거가 돼요. 근로계약서와 급여명세서도 챙겨 두세요.' },
          { title: '안 주면 노동청에 진정', text: `고용노동부 노동포털에서 온라인으로 낼 수 있어요. 무료이고 10분이면 접수돼요. 관할 고용노동청이 회사를 불러 조사해요.` },
          { title: '회사가 도산했다면', text: '국가가 대신 주는 대지급금 제도가 있어요. 도산 사실과 미지급 사실을 확인받아야 하고, 한도가 정해져 있어요.' },
        ] },
        { type: 'steps', items: [
          { title: '받을 금액 계산', text: '입사일과 퇴사일, 퇴사 전 3개월 임금을 넣으면 정확한 금액이 나와요', meta: '3분', link: { label: '퇴직금 계산기', href: '/severance/' } },
          { title: '진정 접수', text: '노동포털에서 임금체불 진정을 접수하면 관할 고용노동청이 조사해요', meta: '무료 · 온라인 10분', link: { label: '임금체불 진정', href: LABOR } },
        ] },
      ] },

      { id: 's5', h2: '퇴직금 중간정산은 언제 되나요', sub: '법에 정해진 사유만 가능해요', blocks: [
        { type: 'p', ans: '무주택자의 주택 구입, 전세금·보증금 부담, 6개월 이상 요양 의료비, 파산선고, 개인회생, 임금피크제 같은 사유만 돼요.', text: '회사가 마음대로 해 주거나, 근로자가 원한다고 아무 때나 받을 수 있는 게 아니에요. 중간정산을 하면 그 시점부터 근속기간이 새로 시작돼요.' },
        { type: 'table', text: true, caption: '퇴직금 중간정산이 되는 사유', headers: ['사유', '조건'], rows: [
          { cells: ['무주택자 주택 구입', '본인 명의로 사는 경우'] },
          { cells: ['무주택자 전세금·보증금', '주거 목적. 한 회사에서 1회만'] },
          { cells: ['6개월 이상 요양 의료비', '본인·배우자·부양가족. 연간 임금총액의 1천분의 125를 넘게 부담할 때'] },
          { cells: ['파산선고·개인회생', '신청일부터 거꾸로 5년 안에 결정을 받은 경우'] },
          { cells: ['임금피크제', '정년 연장·보장 조건으로 임금을 줄이는 제도를 시행할 때'] },
          { cells: ['근로시간 단축', '하루 1시간 또는 주 5시간 이상 줄여 3개월 이상 일하기로 한 경우'] },
          { cells: ['재난 피해', '고용노동부장관이 정해 고시하는 사유'] },
        ], fn: '중간정산 뒤 퇴직금 계산을 위한 계속근로기간은 정산 시점부터 새로 계산해요.' },
      ] },

      { id: 's6', h2: '퇴직금에도 세금 내나요', sub: '퇴직소득세는 다른 소득과 따로 계산해요', blocks: [
        { type: 'p', ans: '내요. 다만 근속연수공제와 환산급여공제를 거쳐 세금이 크게 줄어요.', text: '퇴직소득은 다른 소득과 합치지 않고 따로 계산해요. 오래 일할수록 공제가 커져서 같은 금액이어도 세금이 적어져요. 회사가 원천징수하고 남은 금액을 줘요.' },
        { type: 'tips', items: [
          { title: '퇴직연금(DB·DC)이면', text: 'DB형은 퇴직금과 계산이 같고, DC형은 회사가 매년 넣어 준 금액과 운용 수익이 내 돈이에요. 운용 성과에 따라 금액이 달라져요.' },
          { title: 'IRP로 옮기면', text: '퇴직금을 개인형퇴직연금(IRP) 계좌로 받으면 당장은 세금을 떼지 않고, 나중에 연금으로 받을 때 세금이 30~40% 줄어요.' },
          { title: '55세 이후 퇴직이면', text: 'IRP 이전 의무가 없어 계좌로 바로 받을 수 있어요.' },
        ] },
      ] },
    ],
    faq: [
      ['퇴직금 계산은 어떻게 하나요?', `하루 평균임금 × 30일 × (재직일수 ÷ 365)예요. 월급 300만원으로 5년 일했다면 하루 평균임금 ${won(R.avgDailyWage)}원, 퇴직금 <b>${won(R.severance)}원</b>이에요.`],
      ['1년 미만 일해도 퇴직금 받나요?', '못 받아요. 계속근로기간이 1년 미만이면 퇴직급여 제도를 설정할 의무가 없어요. 4주를 평균해 주 15시간 미만으로 일한 경우도 마찬가지예요.'],
      ['퇴직금 지급기한이 언제까지인가요?', '퇴사한 날부터 14일 안이에요. 당사자가 합의하면 늦출 수 있지만, 합의 없이 넘기면 임금체불이고 지연이자 연 20%가 붙어요.'],
      ['퇴직금에 상여금이 포함되나요?', `포함돼요. 1년치 상여금의 3/12이 평균임금에 들어가요. 월급 300만원에 상여 600만원과 연차수당 120만원이 있으면 퇴직금이 ${won(bonusGain)}원 늘어요.`],
      ['퇴직금을 못 받으면 어떻게 하나요?', '고용노동부 노동포털에서 임금체불 진정을 온라인으로 낼 수 있어요. 무료이고, 관할 고용노동청이 조사해요. 회사가 도산했다면 국가가 대신 주는 대지급금 제도가 있어요.'],
      ['퇴직금 중간정산을 아무 때나 받을 수 있나요?', '아니에요. 무주택자 주택 구입, 전세금 부담, 6개월 이상 요양 의료비, 파산선고, 개인회생, 임금피크제 같은 법에 정해진 사유만 돼요.'],
    ],
    summary: [
      `계산식: 하루 평균임금 × 30일 × (재직일수 ÷ 365). 월급 300만원·5년이면 ${won(R.severance)}원.`,
      '조건: 계속근로 1년 이상, 4주 평균 주 15시간 이상. 둘 중 하나라도 안 되면 의무가 없어요.',
      '평균임금에는 상여금과 연차수당의 3/12이 들어가요. 기본급만 계산하면 적게 나와요.',
      '지급 기한은 퇴사일부터 14일. 안 주면 노동포털에서 진정을 낼 수 있어요.',
    ],
    sources: [
      ['법령', '근로자퇴직급여 보장법 제4조(퇴직급여제도의 설정, 1년 미만·주 15시간 미만 제외), 제8조(계속근로기간 1년에 대하여 30일분 이상의 평균임금), 제9조(퇴사일부터 14일 이내 지급). 같은 법 시행령 제3조(중간정산 사유). 근로기준법 제2조(평균임금 정의, 평균임금이 통상임금보다 적으면 통상임금). 소득세법(퇴직소득 계산).'],
      ['정부 도구', `고용노동부 퇴직금 계산기와 이 글의 금액이 1원 단위까지 같아요 (${VERIFIED} 대조).`],
    ],
    claims: [
      { src: 1, quote: '계속근로기간 1년에 대하여 30일분 이상의 평균임금을 퇴직금으로 퇴직 근로자에게 지급할 수 있는 제도를 설정하여야 한다', note: '퇴직금 계산식 (제8조①)' },
      { src: 1, quote: '그 지급사유가 발생한 날부터 14일 이내에 퇴직금을 지급하여야 한다', note: '지급 기한 14일 (제9조①)' },
      { src: 1, quote: '계속근로기간이 1년 미만인 근로자, 4주간을 평균하여 1주간의 소정근로시간이 15시간 미만인 근로자에 대하여는 그러하지 아니하다', note: '적용 제외 (제4조① 단서)' },
      { src: 1, quote: '미리 정산하여 지급한 후의 퇴직금 산정을 위한 계속근로기간은 정산시점부터 새로 계산한다', note: '중간정산 후 근속 재시작 (제8조②)' },
      { src: 2, quote: '이를 산정하여야 할 사유가 발생한 날 이전 3개월 동안에 그 근로자에게 지급된 임금의 총액을 그 기간의 총일수로 나눈 금액', note: '평균임금 정의 (근로기준법 제2조)' },
      { src: 2, quote: '통상임금보다 적으면 그 통상임금액을 평균임금으로 한다', note: '평균임금 최저 보장' },
      { src: 3, quote: '무주택자인 근로자가 본인 명의로 주택을 구입하는 경우', note: '중간정산 사유 1 (시행령 제3조)' },
      { src: 3, quote: '본인 연간 임금총액의 1천분의 125를 초과하여 부담하는 경우', note: '중간정산 사유: 의료비 기준' },
      { src: 3, quote: '소정근로시간을 1일 1시간 또는 1주 5시간 이상 단축함으로써', note: '중간정산 사유: 근로시간 단축' },
      { src: 5, quote: '퇴직전 3개월 임금 총액 계산(세전금액)', note: '고용노동부 계산기도 퇴사 전 3개월 세전 임금 기준' },
      { src: 5, quote: '퇴직일자는 마지막으로 근무한 날의 1일 후 날짜를 기재', note: '퇴사일 입력 기준 (마지막 근무일 다음 날)' },
    ],
    related: [
      { kind: '계산기', label: '퇴직금 계산기', href: '/severance/' },
      { kind: '세금 계산기', label: '퇴직소득세 계산기', href: '/retirement-tax/' },
      { kind: '법률 가이드', label: '연차수당 계산법', href: '/annual-leave/' },
    ],
  };
}
