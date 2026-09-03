/**
 * 글 스펙: 연차수당
 *   금액은 전부 엔진(annual-leave-allowance)이 만든다.
 *   발생 일수·촉진 절차·소멸 문장은 claims 로 근로기준법 원문을 인용해 둔다.
 */
import { won, man } from '../render.mjs';

export default function article({ calculators, loadSpec, VERIFIED, derive = (v) => v }) {
  const spec = loadSpec('law/annual-leave-allowance');
  const al = (monthlySalary, unusedDays) => calculators['annual-leave-allowance']({ monthlySalary, unusedDays }, spec);

  const R = al(3e6, 5);                                  // 대표: 월 통상임금 300만원, 미사용 5일
  const SAL = [2.5e6, 3e6, 3.5e6, 4e6, 5e6].map((m) => ({ m, d5: al(m, 5), d10: al(m, 10), d15: al(m, 15) }));
  const DAYS = [1, 5, 10, 15].map((d) => ({ d, r: al(3e6, d) }));
  const YEARS = [['1년', 15], ['3년', 16], ['5년', 17], ['10년', 20], ['21년 이상', 25]];
  const LABOR = 'https://labor.moel.go.kr/anmtDclrCntr/main.do';

  return {
    slug: 'annual-leave-allowance-guide', cat: 'law', catLabel: '법률', crumb: '연차수당',
    title: '연차수당 계산과 발생 기준, 입사 1년부터 미사용 수당 지급까지',
    description: `월 통상임금 300만원이면 연차 하루가 ${won(R.dailyWage)}원이라 5일을 못 쓰면 ${won(R.allowance)}원을 받아요. 연차가 며칠 생기는지, 1년 미만은 어떻게 되는지, 미사용 수당은 언제 받는지 정리했어요.`,
    datePublished: '2026-09-03', verified: VERIFIED, basis: '2026년 9월 기준', readMinutes: 7,
    badge: `근로기준법 연차 규정과 통상임금 산정 기준 대조 · ${VERIFIED}`,
    calc: { href: '/annual-leave/calculator/', label: '연차수당 계산기 바로가기' },
    hero: {
      tag: '법률', line1: '연차수당 계산', line2: '내 하루 얼마',
      sub1: `월 통상임금 300만원 → 하루 ${won(R.dailyWage)}원`,
      sub2: `5일을 못 쓰면 ${won(R.allowance)}원을 받아요`,
      foot: `근로기준법 연차 규정과 통상임금 산정 기준 대조 · ${VERIFIED} 검증`,
      card: { label: '연차수당', big: won(R.allowance), unit: '원', l1: '월 통상임금 300만원', l2: '미사용 연차 5일' },
      alt: `연차수당 계산. 월 통상임금 300만원이면 하루 ${won(R.dailyWage)}원, 5일이면 ${won(R.allowance)}원`,
    },
    intro: `연차는 1년간 80퍼센트 이상 출근하면 15일이 생겨요. 다 쓰지 못하고 남으면 돈으로 받는데, 이게 연차수당이에요. 월 통상임금이 300만원이면 시간당 ${won(R.hourlyWage)}원, 하루 ${won(R.dailyWage)}원이라 5일이 남으면 ${won(R.allowance)}원을 받아요. 며칠이 생기는지, 1년을 못 채운 신입은 어떻게 되는지, 수당은 언제 어떻게 받는지 순서대로 정리했어요.`,
    answer: {
      label: '내 월 통상임금을 눌러 연차 하루 값을 확인해 보세요',
      quick: [2.5e6, 3e6, 4e6].map((m) => {
        const r = al(m, 5);
        return { chip: `${man(m)}원`, selected: m === 3e6, big: `${won(r.dailyWage)}원`, unit: '연차 하루', sub: `시간당 ${won(r.hourlyWage)}원 · 5일이면 ${won(r.allowance)}원` };
      }),
      boxes: [
        { title: '1년 채우면 15일이 생겨요', text: '그 전에도 한 달을 개근할 때마다 하루씩 생겨서 첫해에 최대 11일을 쓸 수 있어요' },
        { title: '통상임금으로 계산해요', text: '월 통상임금을 209시간으로 나눈 시급에 하루 8시간을 곱한 값이 하루치예요' },
      ],
    },
    keyPoints: {
      title: '한눈에 보는 연차수당',
      rows: [
        ['기본 연차', '1년간 80퍼센트 이상 출근하면 15일'],
        ['1년 미만', '한 달 개근할 때마다 1일씩. 첫해에 최대 11일'],
        ['가산 연차', '3년 이상이면 2년마다 1일씩 늘어 최대 25일'],
        ['하루 계산', '월 통상임금 ÷ 209시간 × 8시간'],
        ['월 300만원이면', `시간당 ${won(R.hourlyWage)}원, 하루 ${won(R.dailyWage)}원`],
        ['소멸', '생긴 날부터 1년 안에 쓰지 않으면 사라져요'],
        ['수당 청구', '임금이라서 3년 안에 청구할 수 있어요'],
        ['주 15시간 미만', '4주 평균 주 15시간 미만이면 연차 규정이 적용되지 않아요'],
      ],
    },
    sections: [
      { id: 's1', h2: '연차 발생 기준, 며칠 생기나요', sub: '1년을 채우면 15일부터 시작해요', blocks: [
        { type: 'p', lead: true, ans: '1년간 80퍼센트 이상 출근하면 15일이 생겨요.', text: '3년 이상 일하면 2년마다 하루씩 늘어나고, 가산분을 합쳐 최대 25일까지 늘어요. 육아휴직 기간이나 업무상 부상으로 쉰 기간은 출근한 것으로 봐 주기 때문에 출근율 계산에서 불이익이 없어요.' },
        { type: 'table', text: true, caption: '근속 기간에 따른 연차 일수', headers: ['근속 기간', '연차 일수'],
          rows: YEARS.map(([label, days]) => ({ hi: label === '1년', cells: [label, `${days}일`] })),
          fn: '근로기준법 제60조제1항과 제4항 기준이에요. 가산휴가를 포함한 총 일수는 25일이 한도예요.' },
        { type: 'tips', items: [
          { title: '출근율은 80퍼센트가 기준이에요', text: '1년 동안 소정근로일의 80퍼센트 이상 나왔는지로 판단해요. 미달하면 개근한 달마다 하루씩만 생겨요.' },
          { title: '쉬어도 출근으로 보는 기간', text: '업무상 부상이나 질병으로 쉰 기간, 출산전후휴가, 육아휴직 기간은 출근한 것으로 봐요.' },
          { title: '주 15시간 미만은 제외예요', text: '4주를 평균해 1주 소정근로시간이 15시간 미만이면 연차 규정 자체가 적용되지 않아요.' },
        ] },
      ] },

      { id: 's2', h2: '1년 미만 신입은 연차가 어떻게 되나요', sub: '한 달 개근하면 하루씩 생겨요', blocks: [
        { type: 'p', lead: true, ans: '입사 후 한 달을 개근할 때마다 유급휴가 1일이 생겨요.', text: '첫해에는 이렇게 최대 11일을 쓸 수 있어요. 1년을 채우는 순간 15일이 새로 생기기 때문에, 첫해에 받은 휴가를 아껴 두면 입사 2년차에 쓸 수 있는 날이 늘어나요.' },
        { type: 'table', text: true, caption: '입사 첫해와 2년차 연차', headers: ['시점', '생기는 연차'], rows: [
          { cells: ['입사 1개월 개근', '1일'] },
          { cells: ['입사 11개월까지', '개근한 달마다 1일씩, 최대 11일'] },
          { cells: ['만 1년이 되는 날', '15일이 새로 생겨요'] },
          { cells: ['1년 미만 연차의 소멸', '최초 1년의 근로가 끝날 때까지 쓰지 않으면 사라져요'] },
          { cells: ['출근율 80퍼센트 미만', '1년을 넘겨도 개근한 달마다 1일씩만 생겨요'] },
        ], fn: '1년 미만 근로자의 연차는 근로기준법 제60조제2항, 소멸 시점은 같은 조 제8항에 있어요.' },
        { type: 'note', title: '1년 미만 연차도 못 쓰면 돈으로 받아요', text: '회사가 사용 촉진 절차를 밟지 않았다면 남은 일수만큼 수당으로 줘야 해요. 퇴사할 때 정산해서 받는 경우가 많아요.' },
      ] },

      { id: 's3', h2: '연차수당 계산, 통상임금으로 하루 얼마인가요', sub: '월 통상임금 ÷ 209시간 × 8시간', blocks: [
        { type: 'p', lead: true, ans: `월 통상임금 300만원이면 시간당 ${won(R.hourlyWage)}원, 하루 ${won(R.dailyWage)}원이에요.`, text: '월급을 한 달 소정근로시간인 209시간으로 나눠 시급을 구하고, 하루 근로시간 8시간을 곱해요. 기본급뿐 아니라 정기적이고 일률적으로 주는 수당도 통상임금에 들어가요.' },
        { type: 'flow', label: '연차수당 계산 순서', steps: [
          { label: '월 통상임금', value: `${man(3e6)}원`, sub: '기본급 + 고정 수당', op: '÷' },
          { label: '209시간', value: '209', sub: '한 달 소정근로시간', op: '=' },
          { label: '시간당 통상임금', value: `${won(R.hourlyWage)}원`, sub: '× 8시간', op: '=' },
          { label: '연차 하루', value: `${won(R.dailyWage)}원`, sub: `5일이면 ${won(R.allowance)}원` },
        ] },
        { type: 'table', id: 'salTbl', compact: true, x: [1], net: 4, caption: '월 통상임금별 연차수당', headers: ['월 통상임금', '시간당', '하루', '5일치', '10일치'],
          rows: SAL.map(({ m, d5, d10 }) => ({ hi: m === 3e6, cells: [`${man(m)}원`, won(d5.hourlyWage), won(d5.dailyWage), won(d5.allowance), won(d10.allowance)] })),
          moreLabel: '시간당 금액까지 보기',
          fn: '단위: 원. 하루 8시간, 한 달 209시간을 기준으로 계산했어요. 회사 규정이 다르면 그 기준을 따라요.' },
        { type: 'widget', label: '내 연차수당 계산', title: '내 통상임금으로 바로 보기', note: '월 통상임금과 남은 연차 일수를 넣으면 받을 금액이 바로 나와요. 기본급에 정기적으로 받는 수당을 더한 금액을 넣으세요.',
          inputs: [
            { id: 'am', label: '월 통상임금 (만원)', type: 'number', value: 300, min: 100, max: 2000, step: 10 },
            { id: 'ad', label: '미사용 연차 (일)', type: 'number', value: 5, min: 0, max: 30, step: 1 },
          ],
          outputs: [{ id: 'ahour', label: '시간당 통상임금' }, { id: 'aday', label: '연차 하루' }, { id: 'asum', label: '받을 연차수당' }, { id: 'amon', label: '월급 대비' }],
          port: `
  function leave(monthly, days){
    var hourly = Math.round(monthly / ${spec.constants.MONTHLY_HOURS});
    var daily = hourly * ${spec.constants.DAILY_HOURS};
    return { hourly: hourly, daily: daily, sum: daily * days };
  }`,
          js: `
  function alrender(){ var m=(+document.getElementById('am').value||0)*1e4, d=+document.getElementById('ad').value||0; if(m<=0)return; var r=leave(m,d);
    document.getElementById('ahour').textContent=won(r.hourly)+'원'; document.getElementById('aday').textContent=won(r.daily)+'원'; document.getElementById('asum').textContent=won(r.sum)+'원';
    document.getElementById('amon').textContent=(r.sum/m*100).toFixed(0)+'%'; }
  ['am','ad'].forEach(function(id){document.getElementById(id).addEventListener('input',alrender)}); alrender();`,
          check: (port) => {
            let n = 0, bad = 0;
            for (let mw = 100; mw <= 1500; mw += 10) for (const d of [0, 1, 3, 5, 8, 10, 15, 25]) {
              n++;
              const e = al(mw * 1e4, d);
              const q = port.leave(mw * 1e4, d);
              if (q.sum !== e.allowance || q.hourly !== e.hourlyWage || q.daily !== e.dailyWage) bad++;
            }
            return { n, bad };
          },
        },
        { type: 'table', net: 1, caption: '미사용 일수별 연차수당 (월 통상임금 300만원 기준)', headers: ['미사용 연차', '연차수당'],
          rows: DAYS.map(({ d, r }) => ({ hi: d === 5, cells: [`${d}일`, `${won(r.allowance)}원`] })),
          fn: '하루치 금액에 일수를 곱한 값이에요. 회사가 연차를 돈으로 사 주는 시점의 통상임금을 기준으로 해요.' },
      ] },

      { id: 's4', h2: '미사용 연차수당은 언제 받나요', sub: '연차가 사라진 다음 달 급여에 들어가요', blocks: [
        { type: 'p', lead: true, ans: '연차가 소멸한 뒤 첫 임금 지급일에 함께 받는 것이 원칙이에요.', text: '회사마다 회계연도 기준으로 정산하는 곳도 있고 입사일 기준으로 하는 곳도 있어요. 퇴사할 때는 남은 연차를 모두 계산해 마지막 급여나 퇴직 정산에 넣어 줘야 해요.' },
        { type: 'table', text: true, caption: '연차수당을 받는 시점', headers: ['상황', '지급 시점'], rows: [
          { cells: ['재직 중이고 연차가 소멸했을 때', '소멸한 다음 임금 지급일에 함께 받아요'] },
          { cells: ['퇴사할 때', '남은 연차 전부를 정산해 마지막 급여에 넣어요'] },
          { cells: ['회계연도 기준 회사', '연말이나 연초에 정산하는 경우가 많아요'] },
          { cells: ['못 받았을 때', '임금이라서 노동청에 진정을 낼 수 있어요'] },
          { cells: ['청구 기한', '임금채권이라 3년 안에 청구해야 해요'] },
        ], fn: '임금채권의 소멸시효는 근로기준법 제49조에 있어요. 연차수당도 임금이라 같은 기준을 따라요.' },
        { type: 'tips', items: [
          { title: '급여명세서를 확인하세요', text: '연차수당 항목이 따로 표시돼요. 일수와 단가가 맞는지 확인하면 계산 오류를 잡을 수 있어요.' },
          { title: '퇴직금 계산에도 들어가요', text: '전년도에 받은 미사용 연차수당의 4분의 1이 평균임금에 반영돼요. 퇴직금이 그만큼 늘어요.' },
          { title: '못 받았다면 진정을 내세요', text: '고용노동부 노동포털에서 온라인으로 낼 수 있어요. 무료이고 관할 노동청이 조사해요.', },
        ] },
        { type: 'steps', items: [
          { title: '남은 일수 확인', text: '연차 대장이나 인사 시스템에서 미사용 일수를 확인해요', meta: '5분' },
          { title: '금액 계산', text: '월 통상임금과 일수를 넣어 받을 금액을 확인해요', meta: '1분', link: { label: '연차수당 계산기', href: '/annual-leave/' } },
          { title: '회사에 서면으로 요청', text: '메일이나 문자로 요청하고 기록을 남겨요', meta: '기록 필수' },
          { title: '안 주면 진정 접수', text: '노동포털에서 임금체불 진정을 내면 관할 노동청이 조사해요', meta: '무료 · 온라인', link: { label: '임금체불 진정', href: LABOR } },
        ] },
      ] },

      { id: 's5', h2: '연차촉진을 하면 수당을 못 받나요', sub: '회사가 절차를 지켰을 때만이에요', blocks: [
        { type: 'p', lead: true, ans: '회사가 법에 정해진 촉진 절차를 모두 지켰다면 수당을 주지 않아도 돼요.', text: '말로 권유하는 정도로는 안 되고, 서면으로 남은 일수를 알려 주고 사용 시기를 정해 통보받는 절차를 밟아야 해요. 한 단계라도 빠지면 수당을 줘야 해요.' },
        { type: 'timeline', label: '연차 사용 촉진 절차', items: [
          { step: '6개월 전', title: '남은 일수 서면 통지', text: '연차가 소멸하기 6개월 전을 기준으로 10일 안에 남은 일수를 알리고 사용 시기를 정해 달라고 서면으로 촉구해요' },
          { step: '10일 이내', title: '근로자가 시기 통보', text: '촉구를 받은 근로자가 언제 쓸지 정해 회사에 알려요' },
          { step: '2개월 전', title: '회사가 시기 지정', text: '근로자가 통보하지 않으면 회사가 사용 시기를 정해 서면으로 알려요', mark: true, tag: '서면 필수' },
          { step: '소멸 시점', title: '수당 지급 여부 결정', text: '절차를 모두 지켰다면 보상 의무가 없고, 하나라도 빠지면 수당을 줘야 해요' },
        ] },
        { type: 'tips', items: [
          { title: '1년 미만 연차는 기준이 달라요', text: '첫해 연차는 최초 1년이 끝나기 3개월 전을 기준으로 촉구하는 등 일정이 따로 정해져 있어요.' },
          { title: '서면이 아니면 효력이 없어요', text: '구두 안내나 사내 게시만으로는 촉진으로 인정되지 않아요. 개별 서면 통지가 필요해요.' },
          { title: '회사가 출근을 시켰다면', text: '지정된 휴가일에 나와서 일했고 회사가 이를 막지 않았다면 촉진 효과가 부정될 수 있어요.' },
        ] },
      ] },
    ],
    faq: [
      ['연차수당 계산은 어떻게 하나요?', `월 통상임금을 209시간으로 나눈 시급에 8시간을 곱해요. 월 300만원이면 하루 <b>${won(R.dailyWage)}원</b>이에요.`],
      ['연차는 언제부터 15일이 생기나요?', '1년간 80퍼센트 이상 출근하면 15일이 생겨요. 3년 이상이면 2년마다 하루씩 늘어 최대 25일이에요.'],
      ['1년 미만이면 연차가 없나요?', '있어요. 한 달을 개근할 때마다 1일씩 생겨서 첫해에 최대 11일을 쓸 수 있어요.'],
      ['미사용 연차수당은 언제 받나요?', '연차가 소멸한 뒤 첫 임금 지급일에 받아요. 퇴사할 때는 남은 일수를 모두 정산해 마지막 급여에 넣어요.'],
      ['연차수당을 못 받으면 어떻게 하나요?', '임금이라서 노동청에 진정을 낼 수 있어요. 임금채권 소멸시효가 3년이라 그 안에 청구해야 해요.'],
      ['연차촉진을 하면 수당을 못 받나요?', '회사가 서면 통지와 시기 지정 절차를 모두 지켰다면 보상 의무가 없어요. 절차가 빠지면 수당을 받아야 해요.'],
      ['연차수당에도 세금이 붙나요?', '임금이라 근로소득에 포함돼요. 받는 달의 급여와 합쳐 원천징수하고 연말정산으로 정산해요.'],
    ],
    summary: [
      `하루치는 월 통상임금 ÷ 209시간 × 8시간이에요. 월 300만원이면 ${won(R.dailyWage)}원이에요.`,
      '연차는 1년 80퍼센트 출근으로 15일, 3년부터 2년마다 1일씩 늘어 최대 25일이에요.',
      '1년 미만은 한 달 개근마다 1일씩 생겨 첫해에 최대 11일을 쓸 수 있어요.',
      '남은 연차는 소멸 후 첫 급여일에 수당으로 받고, 3년 안에 청구할 수 있어요.',
    ],
    sources: [
      ['법령', '근로기준법 제60조(연차 유급휴가, 1년 80퍼센트 출근 시 15일, 1년 미만 월 개근 1일, 3년 이상 가산과 25일 한도, 1년 미사용 시 소멸), 제61조(연차 유급휴가의 사용 촉진), 제49조(임금채권 3년 소멸시효), 제18조제3항(주 15시간 미만 적용 제외). 근로기준법 시행령 제6조(통상임금 시간급 산정).'],
      ['정부 도구', `고용노동부 연차수당 산정 기준과 이 글의 계산이 같은 방식이에요 (${VERIFIED} 대조).`],
    ],
    claims: [
      { src: 1, quote: '사용자는 1년간 80퍼센트 이상 출근한 근로자에게 15일의 유급휴가를 주어야 한다', note: '기본 연차 15일 (근로기준법 제60조①)' },
      { src: 1, quote: '계속하여 근로한 기간이 1년 미만인 근로자 또는 1년간 80퍼센트 미만 출근한 근로자에게 1개월 개근 시 1일의 유급휴가를 주어야 한다', note: '1년 미만 월 1일 (제60조②)' },
      { src: 1, quote: '가산휴가를 포함한 총 휴가 일수는 25일을 한도로 한다', note: '가산 연차 25일 한도 (제60조④)' },
      { src: 1, quote: '1년간(계속하여 근로한 기간이 1년 미만인 근로자의 제2항에 따른 유급휴가는 최초 1년의 근로가 끝날 때까지의 기간을 말한다) 행사하지 아니하면 소멸된다', note: '연차 소멸 (제60조⑧)' },
      { src: 1, quote: '사용자는 그 사용하지 아니한 휴가에 대하여 보상할 의무가 없고', note: '촉진 절차를 지킨 경우 보상 의무 없음 (제61조①)' },
      { src: 1, quote: '이 법에 따른 임금채권은 3년간 행사하지 아니하면 시효로 소멸한다', note: '임금채권 3년 시효 (제49조)' },
      { src: 1, quote: '1주 동안의 소정근로시간이 15시간 미만인 근로자에 대하여는 제55조와 제60조를 적용하지 아니한다', note: '주 15시간 미만 적용 제외 (제18조③)' },
      { src: 2, quote: '월급 금액으로 정한 임금은 그 금액을 월의 통상임금 산정 기준시간 수', note: '월급의 시간급 환산 (시행령 제6조②4)' },
    ],
    related: [
      { kind: '계산기', label: '연차수당 계산기', href: '/annual-leave/' },
      { kind: '법률 계산기', label: '퇴직금 계산기', href: '/severance/' },
      { kind: '법률 가이드', label: '퇴직금 계산 방법과 지급기준', href: '/severance/' },
    ],
  };
}
