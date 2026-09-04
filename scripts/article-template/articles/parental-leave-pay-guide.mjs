/**
 * 글 스펙: 육아휴직 급여
 *   금액은 전부 엔진(parental-leave-pay)이 만든다.
 *   기간·요건·특례 상한은 claims 로 법령 원문을 인용해 둔다.
 */
import { won, man } from '../render.mjs';

export default function article({ calculators, loadSpec, VERIFIED, derive = (v) => v }) {
  const spec = loadSpec('government/parental-leave-pay');
  const pl = (monthlySalary, leaveMonths) => calculators['parental-leave-pay']({ monthlySalary, leaveMonths }, spec);
  const C = spec.constants;

  const R = pl(3e6, 12);                                  // 대표: 통상임금 300만원, 12개월
  const SAL = [1.5e6, 2e6, 2.5e6, 3e6, 4e6].map((m) => ({ m, r: pl(m, 12) }));
  const MONTHS = [3, 6, 12, 18].map((l) => ({ l, r: pl(3e6, l) }));
  const LOW = pl(8e5, 12);                                // 하한 적용
  const monthAvg = derive(Math.round(R.totalPay / 12));
  const extra6 = derive(pl(3e6, 18).totalPay - R.totalPay);
  const EI = 'https://www.ei.go.kr';

  return {
    slug: 'parental-leave-pay-guide', cat: 'government', catLabel: '정부지원금', crumb: '육아휴직 급여',
    title: '2026년 육아휴직 급여 조건과 금액, 신청 방법부터 6+6 특례까지',
    description: `통상임금 300만원이면 육아휴직 12개월 동안 ${won(R.totalPay)}원을 받아요. 첫 3개월은 월 ${won(R.phase1Monthly)}원, 4개월째부터는 ${won(R.phase2Monthly)}원이에요. 지급 조건, 월별 상한, 신청 방법, 부모가 함께 쓰는 특례를 정리했어요.`,
    datePublished: '2026-09-03', verified: VERIFIED, basis: '2026년 9월 기준', readMinutes: 7,
    badge: `고용보험법 시행령 지급액 기준과 1원 단위 일치 · ${VERIFIED}`,
    calc: { href: '/parental-leave/calculator/', label: '육아휴직 급여 계산기 바로가기' },
    hero: {
      tag: '정부지원금', line1: '육아휴직 급여 조건과 금액', line2: '얼마 받나요',
      sub1: `통상임금 300만원 · 12개월 → ${won(R.totalPay)}원`,
      sub2: `첫 3개월 월 ${won(R.phase1Monthly)}원, 7개월째부터 ${won(R.phase3Monthly)}원`,
      foot: `고용보험법 시행령 지급액 기준과 1원 단위 일치 · ${VERIFIED} 검증`,
      card: { label: '12개월 합계', big: won(R.totalPay), unit: '원', l1: '통상임금 300만원', l2: `월평균 약 ${won(monthAvg)}원` },
      alt: `육아휴직 급여. 통상임금 300만원이면 12개월 동안 ${won(R.totalPay)}원`,
    },
    intro: `육아휴직 급여는 통상임금을 기준으로 주되 기간에 따라 상한이 달라져요. 통상임금이 300만원이라면 첫 3개월은 월 ${won(R.phase1Monthly)}원, 4개월째부터 6개월째까지는 ${won(R.phase2Monthly)}원, 7개월째부터는 ${won(R.phase3Monthly)}원이에요. 12개월을 다 쓰면 ${won(R.totalPay)}원이에요. 누가 쓸 수 있는지, 월별로 얼마인지, 부모가 함께 쓰면 얼마나 늘어나는지, 어디에 신청하는지 정리했어요.`,
    answer: {
      label: '내 통상임금을 눌러 12개월 합계를 확인해 보세요',
      quick: [2e6, 3e6, 4e6].map((m) => {
        const r = pl(m, 12);
        return { chip: `${man(m)}원`, selected: m === 3e6, big: `${won(r.totalPay)}원`, unit: '12개월 합계', sub: `첫 3개월 ${won(r.phase1Monthly)}원 · 7개월째부터 ${won(r.phase3Monthly)}원` };
      }),
      boxes: [
        { title: '고용보험 180일이 필요해요', text: '육아휴직을 시작하기 전 피보험 단위기간이 합쳐서 180일 이상이어야 해요' },
        { title: '기간은 1년, 조건 맞으면 1년 6개월', text: `부모가 각각 3개월 이상 쓰면 6개월을 더 쓸 수 있어 ${won(extra6)}원을 더 받아요` },
      ],
    },
    keyPoints: {
      title: '한눈에 보는 육아휴직 급여',
      rows: [
        ['대상 자녀', '만 8세 이하 또는 초등학교 2학년 이하'],
        ['고용보험 요건', '육아휴직 시작 전 피보험 단위기간 합산 180일 이상'],
        ['기간', '1년 이내. 조건을 채우면 6개월을 더 써서 1년 6개월'],
        ['1~3개월', `통상임금 전액. 상한 ${won(C.PHASE1_UPPER)}원, 하한 ${won(C.MIN_PAY)}원`],
        ['4~6개월', `통상임금 전액. 상한 ${won(C.PHASE2_UPPER)}원`],
        ['7개월째부터', `통상임금의 80%. 상한 ${won(C.PHASE3_UPPER)}원`],
        ['300만원 12개월', `합계 ${won(R.totalPay)}원`],
        ['신청 기한', '휴직 시작 1개월 뒤부터 끝난 날 이후 12개월 이내'],
      ],
    },
    sections: [
      { id: 's1', h2: '육아휴직 조건, 누가 얼마나 쓸 수 있나요', sub: '자녀 나이와 고용보험 가입 기간을 봐요', blocks: [
        { type: 'p', lead: true, ans: '만 8세 이하 또는 초등학교 2학년 이하 자녀를 키우는 근로자면 신청할 수 있어요.', text: '임신 중인 여성 근로자도 모성 보호를 위해 쓸 수 있어요. 급여를 받으려면 육아휴직을 시작하기 전 고용보험 피보험 단위기간이 합쳐서 180일 이상이어야 해요.' },
        { type: 'table', text: true, caption: '육아휴직 사용 조건', headers: ['항목', '기준'], rows: [
          { cells: ['자녀 나이', '만 8세 이하 또는 초등학교 2학년 이하'] },
          { cells: ['고용보험', '휴직 시작 전 피보험 단위기간 합산 180일 이상'] },
          { cells: ['최소 기간', '30일 이상 부여받아야 급여 대상이에요'] },
          { cells: ['기본 기간', '1년 이내'] },
          { cells: ['연장 조건', '부모가 각각 3개월 이상 사용했거나 한부모, 장애아동 부모면 6개월 추가'] },
          { cells: ['분할 사용', '나눠서 쓸 수 있고 합산한 기간으로 급여를 계산해요'] },
          { cells: ['해고 금지', '육아휴직을 이유로 해고하거나 불리하게 대우할 수 없어요'] },
        ], fn: '육아휴직 요건은 남녀고용평등법 제19조, 급여 요건은 고용보험법 제70조제1항에 있어요.' },
        { type: 'note', title: '복직 후 같은 자리로 돌아가야 해요', text: '사업주는 휴직 전과 같은 업무나 같은 수준의 임금을 주는 직무에 복귀시켜야 해요. 육아휴직 기간은 근속기간에 들어가요.' },
      ] },

      { id: 's2', h2: '육아휴직 급여, 월마다 얼마 나오나요', sub: '기간이 지날수록 상한이 낮아져요', blocks: [
        { type: 'p', lead: true, ans: `통상임금 300만원이면 첫 3개월 월 ${won(R.phase1Monthly)}원, 4~6개월 ${won(R.phase2Monthly)}원, 7개월째부터 ${won(R.phase3Monthly)}원이에요.`, text: `상한에 걸리지 않으면 통상임금을 그대로 받아요. 통상임금이 200만원이면 첫 6개월은 ${won(pl(2e6, 12).phase1Monthly)}원을 받고, 7개월째부터는 80%인 ${won(pl(2e6, 12).phase3Monthly)}원이에요.` },
        { type: 'h3', text: '급여 상한과 하한은 얼마인가요' },
        { type: 'table', net: 2, caption: '육아휴직 급여 구간별 지급 기준', headers: ['기간', '지급률', '상한', '하한'], rows: [
          { hi: true, cells: ['1~3개월', '통상임금 전액', `${won(C.PHASE1_UPPER)}원`, `${won(C.MIN_PAY)}원`] },
          { cells: ['4~6개월', '통상임금 전액', `${won(C.PHASE2_UPPER)}원`, `${won(C.MIN_PAY)}원`] },
          { cells: ['7개월째부터', '통상임금의 80%', `${won(C.PHASE3_UPPER)}원`, `${won(C.MIN_PAY)}원`] },
        ], fn: '고용보험법 시행령 제95조제1항의 월별 지급액 기준이에요. 한 달을 채우지 못하면 휴직한 일수에 비례해 계산해요.' },
        { type: 'flow', label: '통상임금 300만원일 때 받는 흐름', steps: [
          { label: '1~3개월', value: `${won(R.phase1Monthly)}원`, sub: '월 상한 적용', op: '→' },
          { label: '4~6개월', value: `${won(R.phase2Monthly)}원`, sub: '상한이 낮아져요', op: '→' },
          { label: '7~12개월', value: `${won(R.phase3Monthly)}원`, sub: '통상임금의 80%', op: '=' },
          { label: '12개월 합계', value: `${won(R.totalPay)}원`, sub: `월평균 약 ${won(monthAvg)}원` },
        ] },
        { type: 'table', id: 'salTbl3', compact: true, x: [1, 2], net: 4, caption: '통상임금별 육아휴직 급여 (12개월 기준)', headers: ['통상임금', '1~3개월', '4~6개월', '7개월째부터', '12개월 합계'],
          rows: SAL.map(({ m, r }) => ({ hi: m === 3e6, cells: [`${man(m)}원`, won(r.phase1Monthly), won(r.phase2Monthly), won(r.phase3Monthly), won(r.totalPay)] })),
          moreLabel: '구간별 금액까지 보기',
          fn: `단위: 원. 통상임금이 낮아도 월 ${won(C.MIN_PAY)}원은 보장돼요. 통상임금 80만원이면 12개월에 ${won(LOW.totalPay)}원이에요.` },
        { type: 'widget', label: '내 육아휴직 급여 계산', title: '내 통상임금으로 바로 보기', note: '월 통상임금과 휴직 개월수를 넣으면 구간별 금액과 합계가 나와요. 부모가 함께 쓰는 특례는 반영하지 않은 금액이에요.',
          inputs: [
            { id: 'pm', label: '월 통상임금 (만원)', type: 'number', value: 300, min: 70, max: 1000, step: 10 },
            { id: 'pl', label: '휴직 개월수', type: 'number', value: 12, min: 1, max: 18, step: 1 },
          ],
          outputs: [{ id: 'pp1', label: '1~3개월' }, { id: 'pp2', label: '4~6개월' }, { id: 'pp3', label: '7개월째부터' }, { id: 'ptot', label: '합계' }],
          port: `
  function leavePay(monthly, months){
    var p1 = Math.max(Math.min(monthly * ${C.PHASE1_RATE}, ${C.PHASE1_UPPER}), ${C.MIN_PAY});
    var p2 = Math.max(Math.min(monthly * ${C.PHASE2_RATE}, ${C.PHASE2_UPPER}), ${C.MIN_PAY});
    var p3 = Math.max(Math.min(monthly * ${C.PHASE3_RATE}, ${C.PHASE3_UPPER}), ${C.MIN_PAY});
    var m1 = Math.min(months, ${C.PHASE1_MONTHS});
    var m2 = Math.max(0, Math.min(months - ${C.PHASE1_MONTHS}, ${C.PHASE2_MONTHS}));
    var m3 = Math.max(0, months - ${C.PHASE1_MONTHS} - ${C.PHASE2_MONTHS});
    return { p1: Math.round(p1), p2: Math.round(p2), p3: Math.round(p3), total: Math.round(p1 * m1 + p2 * m2 + p3 * m3) };
  }`,
          js: `
  function plrender(){ var m=(+document.getElementById('pm').value||0)*1e4, l=+document.getElementById('pl').value||1; if(m<=0)return; var r=leavePay(m,l);
    document.getElementById('pp1').textContent=won(r.p1)+'원'; document.getElementById('pp2').textContent=won(r.p2)+'원'; document.getElementById('pp3').textContent=won(r.p3)+'원'; document.getElementById('ptot').textContent=won(r.total)+'원'; }
  ['pm','pl'].forEach(function(id){document.getElementById(id).addEventListener('input',plrender)}); plrender();`,
          check: (port) => {
            let n = 0, bad = 0;
            for (let mw = 70; mw <= 800; mw += 5) for (let l = 1; l <= 18; l++) {
              n++;
              const e = pl(mw * 1e4, l);
              const q = port.leavePay(mw * 1e4, l);
              if (q.total !== e.totalPay || q.p1 !== e.phase1Monthly || q.p3 !== e.phase3Monthly) bad++;
            }
            return { n, bad };
          },
        },
      ] },

      { id: 's3', h2: '6+6 부모육아휴직제는 얼마나 더 받나요', sub: '부모가 함께 쓰면 상한이 크게 올라가요', blocks: [
        { type: 'p', lead: true, ans: '자녀가 태어난 뒤 18개월이 될 때까지 부모가 모두 육아휴직을 쓰면 첫 6개월 상한이 올라가요.', text: '첫 달과 둘째 달은 각각 250만원, 셋째 달 300만원, 넷째 달 350만원, 다섯째 달 400만원, 여섯째 달 450만원까지 받을 수 있어요. 부모 각각에게 적용되기 때문에 두 사람이 합치면 금액이 커져요.' },
        { type: 'table', net: 1, caption: '부모가 함께 쓸 때 첫 6개월 상한 (각자 기준)', headers: ['사용 개월', '월 상한'], rows: [
          { cells: ['첫 번째 달', '250만원'] },
          { cells: ['두 번째 달', '250만원'] },
          { cells: ['세 번째 달', '300만원'] },
          { cells: ['네 번째 달', '350만원'] },
          { cells: ['다섯 번째 달', '400만원'] },
          { hi: true, cells: ['여섯 번째 달', '450만원'] },
        ], fn: '고용보험법 시행령 제95조의3제1항의 상한액이에요. 7개월째부터는 통상임금의 80%에 상한 160만원이 적용돼요.' },
        { type: 'tips', items: [
          { title: '같은 시기에 쓰지 않아도 돼요', text: '부모의 휴직 기간이 겹치지 않아도 적용돼요. 순서대로 써도 특례를 받을 수 있어요.' },
          { title: '자녀가 18개월이 되기 전이어야 해요', text: '출생 후 18개월이 지나면 이 특례는 적용되지 않아요. 시기를 미리 계획하세요.' },
          { title: '한부모는 첫 3개월 상한이 달라요', text: '한부모가족지원법상 모 또는 부는 첫 3개월 상한이 300만원이에요.' },
        ] },
        { type: 'p', ans: `기간을 1년 6개월로 늘리면 ${won(extra6)}원을 더 받아요.`, text: `통상임금 300만원 기준으로 12개월이면 ${won(R.totalPay)}원, 18개월이면 ${won(pl(3e6, 18).totalPay)}원이에요. 부모가 각각 3개월 이상 사용해야 6개월을 더 쓸 수 있어요.` },
      ] },

      { id: 's4', h2: '육아휴직 급여 신청 방법은 어떻게 되나요', sub: '고용보험 홈페이지나 고용센터', blocks: [
        { type: 'p', lead: true, ans: '육아휴직을 시작한 날 이후 1개월부터 끝난 날 이후 12개월 이내에 신청해야 해요.', text: '고용보험 홈페이지에서 온라인으로 내거나 거주지 관할 고용센터에 방문해 낼 수 있어요. 보통 한 달 단위로 신청하고, 회사가 확인서를 먼저 제출해야 처리돼요.' },
        { type: 'steps', items: [
          { title: '회사에 육아휴직 신청', text: '휴직 시작 예정일 30일 전까지 회사에 신청해요', meta: '30일 전' },
          { title: '회사가 확인서 제출', text: '사업주가 육아휴직 확인서를 고용센터에 내요', meta: '회사 몫' },
          { title: '급여 신청', text: '휴직 시작 1개월 뒤부터 고용보험 홈페이지에서 신청해요', meta: '매월', link: { label: '고용보험 바로가기', href: EI } },
          { title: '지급', text: '심사를 거쳐 계좌로 입금돼요. 금액을 미리 확인해 두면 좋아요', meta: '보통 2주 안', link: { label: '육아휴직 급여 계산기', href: '/parental-leave/' } },
        ] },
        { type: 'table', text: true, caption: '신청할 때 챙길 것', headers: ['항목', '내용'], rows: [
          { cells: ['신청 기한', '휴직 시작 1개월 뒤부터 끝난 날 이후 12개월 이내'] },
          { cells: ['필요 서류', '육아휴직 급여 신청서, 사업주가 낸 확인서'] },
          { cells: ['통상임금 증빙', '급여명세서나 근로계약서가 필요할 수 있어요'] },
          { cells: ['휴직 중 취업', '이직하거나 정해진 기준 이상 일했다면 신청서에 적어야 해요'] },
          { cells: ['입금 계좌', '본인 명의 계좌로만 받을 수 있어요'] },
        ], fn: '신청 기한은 고용보험법 제70조제2항이에요. 기한을 넘기면 받지 못할 수 있어요.' },
      ] },

      { id: 's5', h2: '복직 후와 육아기 근로시간 단축은 어떻게 되나요', sub: '전일 휴직 대신 시간을 줄일 수도 있어요', blocks: [
        { type: 'p', lead: true, ans: '휴직 대신 근로시간을 줄이는 육아기 근로시간 단축을 쓸 수 있어요.', text: '일을 계속하면서 줄인 시간만큼 급여를 지원받는 제도예요. 육아휴직을 쓰지 않고 남겨 둔 기간을 단축으로 바꿔 쓸 수도 있어요. 소득이 크게 줄지 않아 복직 부담이 적어요.' },
        { type: 'tips', items: [
          { title: '휴직 기간도 근속으로 쳐요', text: '퇴직금과 연차를 셀 때 그대로 포함돼요. 퇴직금과 연차 계산에서 불이익이 없어요.' },
          { title: '건강보험료는 낮춰 줘요', text: '휴직 기간에는 보험료 경감 제도가 있어요. 복직 후 정산되니 미리 확인해 두세요.' },
          { title: '해고나 불이익은 금지예요', text: '육아휴직을 이유로 해고하거나 불리하게 대우하면 법 위반이에요. 노동청에 신고할 수 있어요.' },
          { title: '복직 후 같은 업무로', text: '휴직 전과 같은 업무나 같은 수준의 임금을 주는 자리로 복귀시켜야 해요.' },
        ] },
        { type: 'table', net: 1, caption: '휴직 개월수에 따른 급여 합계 (통상임금 300만원 기준)', headers: ['휴직 기간', '합계'],
          rows: MONTHS.map(({ l, r }) => ({ hi: l === 12, cells: [`${l}개월`, `${won(r.totalPay)}원`] })),
          fn: '18개월은 부모가 각각 3개월 이상 사용한 경우처럼 연장 요건을 채운 경우예요.' },
      ] },
    ],
    faq: [
      ['육아휴직 급여는 얼마 받나요?', `통상임금 300만원이면 첫 3개월 월 ${won(R.phase1Monthly)}원, 12개월 합계 <b>${won(R.totalPay)}원</b>이에요.`],
      ['육아휴직 급여 상한은 얼마인가요?', `1~3개월은 ${won(C.PHASE1_UPPER)}원, 4~6개월은 ${won(C.PHASE2_UPPER)}원, 7개월째부터는 ${won(C.PHASE3_UPPER)}원이에요. 하한은 ${won(C.MIN_PAY)}원이에요.`],
      ['육아휴직 조건이 어떻게 되나요?', '만 8세 이하 또는 초등학교 2학년 이하 자녀를 키우면 쓸 수 있어요. 급여는 고용보험 피보험 단위기간 180일 이상이어야 받아요.'],
      ['육아휴직을 1년 6개월 쓸 수 있나요?', `같은 자녀에 대해 부모가 각각 3개월 이상 썼거나 한부모, 장애아동 부모면 6개월을 더 쓸 수 있어요. 통상임금 300만원이면 ${won(extra6)}원을 더 받아요.`],
      ['6+6 부모육아휴직제가 뭔가요?', '자녀 출생 후 18개월 안에 부모가 모두 육아휴직을 쓰면 첫 6개월 상한이 250만원에서 450만원까지 올라가는 제도예요.'],
      ['육아휴직 급여 신청 방법은 어떻게 되나요?', '휴직 시작 1개월 뒤부터 고용보험 홈페이지나 고용센터에서 신청해요. 끝난 날 이후 12개월 이내에 내야 해요.'],
      ['육아휴직 기간도 근속에 들어가나요?', '들어가요. 퇴직금과 연차 계산에서 불이익이 없고, 복직 후에는 같은 업무나 같은 수준의 임금을 주는 자리로 돌아가야 해요.'],
    ],
    summary: [
      `첫 3개월은 통상임금 전액에 상한 ${won(C.PHASE1_UPPER)}원, 4~6개월은 ${won(C.PHASE2_UPPER)}원이에요.`,
      `7개월째부터는 통상임금의 80%에 상한 ${won(C.PHASE3_UPPER)}원이에요. 300만원이면 12개월에 ${won(R.totalPay)}원이에요.`,
      '부모가 함께 쓰면 첫 6개월 상한이 250만원에서 450만원까지 올라가요.',
      '신청은 휴직 시작 1개월 뒤부터, 끝난 날 이후 12개월 이내에 해야 해요.',
    ],
    sources: [
      ['법령', '남녀고용평등과 일·가정 양립 지원에 관한 법률 제19조(육아휴직 대상과 1년, 부모 각각 3개월 이상 사용 시 6개월 추가, 해고 금지, 복귀 의무), 제19조의2(육아기 근로시간 단축). 고용보험법 제70조(육아휴직 급여 요건 180일, 신청 기한). 고용보험법 시행령 제95조(구간별 지급액과 상한·하한), 제95조의3(출생 후 18개월 이내 부모 모두 사용 시 특례 상한).'],
      ['정부 도구', `고용보험 육아휴직 급여 모의계산과 이 글의 금액이 같은 기준이에요 (${VERIFIED} 대조).`],
    ],
    claims: [
      { src: 1, quote: '육아휴직의 기간은 1년 이내로 한다', note: '기본 기간 1년 (남녀고용평등법 제19조②)' },
      { src: 1, quote: '같은 자녀를 대상으로 부모가 모두 육아휴직을 각각 3개월 이상 사용한 경우의 부 또는 모', note: '6개월 추가 요건 (제19조②1)' },
      { src: 1, quote: '육아휴직을 마친 후에는 휴직 전과 같은 업무 또는 같은 수준의 임금을 지급하는 직무에 복귀시켜야 한다', note: '복직 의무 (제19조④)' },
      { src: 2, quote: '피보험 단위기간이 합산하여 180일 이상인 피보험자에게 육아휴직 급여를 지급한다', note: '고용보험 180일 요건 (고용보험법 제70조①)' },
      { src: 2, quote: '육아휴직을 시작한 날 이후 1개월부터 육아휴직이 끝난 날 이후 12개월 이내에 신청하여야 한다', note: '신청 기한 (제70조②)' },
      { src: 3, quote: '육아휴직 시작일부터 3개월까지: 육아휴직 시작일을 기준으로 한 월 통상임금에 해당하는 금액', note: '1~3개월 지급 기준 (시행령 제95조①1)' },
      { src: 3, quote: '육아휴직 7개월째부터 종료일까지: 육아휴직 시작일을 기준으로 한 월 통상임금의 100분의 80에 해당하는 금액', note: '7개월째부터 80% (제95조①3)' },
      { src: 3, quote: '부모가 육아휴직을 사용한 기간이 각각 6개월인 경우: 부모 각각에 대하여 첫 번째 달과 두 번째 달은 월 250만원, 세 번째 달은 월 300만원, 네 번째 달은 월 350만원, 다섯 번째 달은 월 400만원, 여섯 번째 달은 월 450만원', note: '부모 함께 사용 시 상한 (제95조의3①1바)' },
    ],
    related: [
      { kind: '계산기', label: '육아휴직 급여 계산기', href: '/parental-leave/' },
      { kind: '정부지원금 계산기', label: '출산휴가 급여 계산기', href: '/maternity/' },
      { kind: '정부지원금 가이드', label: '2026년 실업급여 얼마나 받나요', href: '/unemployment/' },
    ],
  };
}
