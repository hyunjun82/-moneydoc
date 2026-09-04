/**
 * 스포크 글: 월급별 실업급여 1일 수령액 (/unemployment/by-salary/)
 *   허브(/unemployment/)의 하위 글. 내 월급이면 얼마인지 표 하나로 답한다.
 *   시각 장치는 table 로 간다 (구간별 금액표가 이 글의 답이라).
 *   계산기 버튼을 다는 편이다. 표에 없는 월급은 직접 넣어 봐야 한다.
 */
import { won, man } from '../render.mjs';

export default function article({ calculators, loadSpec, VERIFIED, derive = (v) => v }) {
  const spec = loadSpec('government/unemployment-benefit');
  const C = spec.constants;
  const ub = (monthlySalary, insuredYears = 3) =>
    calculators['unemployment-benefit']({ monthlySalary, insuredYears, isElderlyOrDisabled: false }, spec);

  const ROWS = [1.8e6, 2e6, 2.2e6, 2.5e6, 2.8e6, 3e6, 3.3e6, 3.6e6, 4e6, 4.5e6, 5e6, 6e6].map((w) => {
    const r = ub(w);
    return {
      w, raw: r.rawBenefit, daily: r.dailyBenefit,
      month: derive(r.dailyBenefit * 30),
      hit: r.rawBenefit < C.DAILY_LOWER_LIMIT ? '하한액' : r.dailyBenefit === C.DAILY_UPPER_LIMIT ? '상한액' : '그대로',
    };
  });

  const LOWEST = ROWS[0];
  const HIGHEST = ROWS[ROWS.length - 1];
  const GAP = derive(HIGHEST.daily - LOWEST.daily);
  const WAGE_GAP = derive(HIGHEST.w - LOWEST.w);
  const R3 = ub(3e6);
  const EI = 'https://www.ei.go.kr';

  return {
    slug: 'unemployment-by-salary-guide', cat: 'government', catLabel: '정부지원금', crumb: '월급별 실업급여',
    title: '월급별 실업급여 1일 수령액 표, 내 월급이면 얼마인가요',
    description: `월급별로 실업급여 하루 얼마를 받는지 표로 정리했어요. 월 ${man(LOWEST.w)}만원이든 ${man(HIGHEST.w)}만원이든 하루 차이는 ${won(GAP)}원뿐이에요. 상한과 하한에 걸리는 지점을 함께 봤어요.`,
    datePublished: '2026-09-04', verified: VERIFIED, basis: '2026년 9월 기준', readMinutes: 6,
    badge: `고용보험법 구직급여일액 원문 대조 · ${VERIFIED}`,
    calc: { href: '/unemployment/calculator/', label: '표에 없는 월급 계산해 보기' },
    hero: {
      tag: '정부지원금', line1: '월급별 실업급여 1일 수령액', line2: '내 월급이면 얼마인가요',
      sub1: `월 ${man(LOWEST.w)}만원과 ${man(HIGHEST.w)}만원의 하루 차이가 ${won(GAP)}원이에요`,
      sub2: '월급이 두 배 넘게 차이 나도 받는 돈은 비슷해요',
      foot: `고용보험법 구직급여일액 원문 대조 · ${VERIFIED} 검증`,
      card: { label: `월 ${man(3e6)}만원이면`, big: won(R3.dailyBenefit), unit: '원', l1: '하루 지급액', l2: `한 달 30일이면 ${won(derive(R3.dailyBenefit * 30))}원` },
      alt: `월급별 실업급여 1일 수령액 표. 월 ${man(3e6)}만원이면 하루 ${won(R3.dailyBenefit)}원`,
    },
    intro: `실업급여가 하루 얼마인지는 평균임금으로 정해져요. 원칙은 평균임금의 60퍼센트인데, 위아래로 막아 둔 금액이 있어서 실제로는 좁은 범위에 몰려요. 월급별로 하루 얼마를 받는지 표로 만들었어요. 어느 구간에서 하한액에 걸리고 어디부터 상한액에 걸리는지 한눈에 보여요.`,
    answer: {
      label: '내 월급대를 눌러 확인해 보세요',
      quick: [
        { chip: `월 ${man(2e6)}만원`, selected: true, big: `${won(ub(2e6).dailyBenefit)}원`, unit: '하루', sub: '하한액이 적용돼요' },
        { chip: `월 ${man(3e6)}만원`, selected: false, big: `${won(R3.dailyBenefit)}원`, unit: '하루', sub: `60퍼센트로는 ${won(R3.rawBenefit)}원이라 하한액이 적용돼요` },
        { chip: `월 ${man(5e6)}만원`, selected: false, big: `${won(ub(5e6).dailyBenefit)}원`, unit: '하루', sub: '상한액이 적용돼요' },
      ],
      boxes: [
        { title: '월급 차이만큼 벌어지지 않아요', text: `월급이 ${won(WAGE_GAP)}원 차이 나도 하루 지급액은 ${won(GAP)}원 차이예요` },
        { title: '평균임금이지 월급이 아니에요', text: '이직 전 3개월 임금 총액을 그 기간 총 일수로 나눈 금액이 기준이에요' },
      ],
    },
    keyPoints: {
      title: '한눈에 보는 월급별 금액',
      rows: [
        ['계산 원칙', '기초일액의 100분의 60'],
        ['기초일액', '이직 전 3개월 임금 총액 ÷ 그 기간 총 일수'],
        ['하한액', `하루 ${won(C.DAILY_LOWER_LIMIT)}원`],
        ['상한액', `하루 ${won(C.DAILY_UPPER_LIMIT)}원`],
        [`월 ${man(3e6)}만원이면`, `하루 ${won(R3.dailyBenefit)}원`],
        ['총액을 가르는 것', '하루 금액이 아니라 소정급여일수'],
      ],
    },
    sections: [
      { id: 's1', h2: '실업급여 1일 수령액은 어떻게 정해지나요', sub: '기초일액의 60퍼센트', blocks: [
        { type: 'p', lead: true, ans: '기초일액에 100분의 60을 곱한 금액이 구직급여일액이에요.', text: '기초일액은 이직 당시의 평균임금이에요. 이직 전 3개월간 지급된 임금 총액을 그 기간의 총 일수로 나눈 금액이라, 월급을 30으로 나눈 값과 비슷하게 나와요. 여기에 60퍼센트를 곱해요.' },
        { type: 'p', ans: '그 값이 하한보다 낮으면 하한액을 줘요.', text: '계산 결과가 최저구직급여일액보다 낮으면 최저구직급여일액을 지급해요. 반대로 기초일액이 정해진 상한을 넘으면 상한까지만 인정해요. 그래서 실제 금액은 두 값 사이에 몰려요.' },
        { type: 'note', title: '통상임금이 더 크면 그쪽을 써요', text: '산정한 평균임금이 통상임금보다 적으면 통상임금을 기초일액으로 해요. 마지막 이직 당시 일용근로자였다면 이 규정은 적용되지 않아요.' },
      ] },

      { id: 's2', h2: '월급별 1일 수령액 표는 어떻게 되나요', sub: '구간별로 정리했어요', blocks: [
        { type: 'p', lead: true, ans: `월 ${man(LOWEST.w)}만원부터 ${man(HIGHEST.w)}만원까지 하루 지급액을 계산했어요.`, text: `표의 60퍼센트 값이 하한액보다 낮으면 하한액이 적용되고, 상한을 넘으면 상한액이 적용돼요. 어느 구간에서 갈리는지 표에서 바로 보여요.` },
        { type: 'table', net: 2, caption: '월급별 실업급여 1일 수령액과 월 환산', headers: ['월 평균임금', '60퍼센트로 계산', '하루 지급액', '30일 환산', '적용'],
          rows: ROWS.map((r) => ({ hi: r.w === 3e6, cells: [`${man(r.w)}만원`, `${won(r.raw)}원`, `${won(r.daily)}원`, `${won(r.month)}원`, r.hit] })),
          fn: '구직급여일액은 기초일액의 100분의 60이고, 그 값이 최저구직급여일액보다 낮으면 최저구직급여일액을 지급해요. 30일 환산은 이해를 돕기 위한 값이고 실제로는 인정된 날수만큼 지급돼요.' },
        { type: 'note', title: '표에 없는 월급은 계산기로 보세요', text: '평균임금과 가입기간, 나이를 넣으면 하루 금액과 소정급여일수, 총액이 함께 나와요.' },
      ] },

      { id: 's3', h2: '월급이 높아도 더 못 받는 구간이 있나요', sub: '상한액에 걸려요', blocks: [
        { type: 'p', lead: true, ans: `있어요. 일정 구간을 넘으면 월급이 아무리 올라도 하루 ${won(C.DAILY_UPPER_LIMIT)}원에서 멈춰요.`, text: `기초일액 자체에 상한이 있어서 하루 ${won(C.BASE_DAILY_WAGE_CAP)}원까지만 인정해요. 그 위로는 계산에 반영되지 않아요. 표에서 상한액이라고 표시된 구간이 여기예요.` },
        { type: 'p', ans: '그래서 고소득일수록 대체율이 낮아져요.', text: `월 ${man(4e6)}만원을 받던 사람도 월 ${man(6e6)}만원을 받던 사람도 하루 금액이 같아요. 실업급여는 생활을 최소한 받쳐 주는 제도라 위쪽을 막아 둔 거예요.` },
        { type: 'note', title: '퇴직 전에 월급을 올려도 소용없어요', text: '상한에 이미 걸리는 구간이라면 평균임금이 올라도 하루 금액은 그대로예요.' },
      ] },

      { id: 's4', h2: '월급이 적으면 얼마를 보장받나요', sub: '하한액이 바닥을 받쳐요', blocks: [
        { type: 'p', lead: true, ans: `계산값이 낮아도 하루 ${won(C.DAILY_LOWER_LIMIT)}원은 받아요.`, text: `최저기초일액은 이직 전 1일 소정근로시간에 최저임금을 곱해 구하고, 여기에 100분의 80을 곱한 금액이 최저구직급여일액이에요. 60퍼센트로 계산한 값이 이보다 낮으면 이 금액이 적용돼요.` },
        { type: 'p', ans: '다만 하루 8시간을 기준으로 한 금액이에요.', text: '하루 소정근로시간이 8시간보다 짧았다면 최저기초일액도 그만큼 작아져서 하한액이 낮아져요. 단시간으로 일했다면 표의 하한액보다 적게 나올 수 있어요.' },
        { type: 'note', title: '월급 대신 평균임금을 확인하세요', text: '기준은 세전 월급이 아니라 이직 전 3개월 평균임금이에요. 이직확인서에 적힌 값을 보는 게 정확해요.' },
      ] },

      { id: 's5', h2: '한 달에 실제로 얼마가 들어오나요', sub: '인정된 날수만큼이에요', blocks: [
        { type: 'p', lead: true, ans: '한 달치가 고정으로 나오는 게 아니라 인정된 날수에 하루 금액을 곱해서 나와요.', text: `실업인정일 간격이 28일이면 28일치가 들어와요. 첫 회차는 대기기간 7일이 빠져서 적고, 4차부터는 간격이 7일에서 28일 사이라 회차마다 달라져요. 표의 30일 환산은 감을 잡기 위한 값이에요.` },
        { type: 'p', ans: '세금은 떼지 않아요.', text: '실업급여는 근로소득이 아니라서 소득세를 원천징수하지 않아요. 통장에 찍히는 금액이 그대로예요.' },
        { type: 'table', text: true, caption: '금액과 관련해 확인할 것', headers: ['확인할 것', '어디서 보나요'], rows: [
          { cells: ['이직 전 평균임금', '회사가 낸 이직확인서'], link: { label: '고용보험 홈페이지', href: EI } },
          { cells: ['이직 전 1일 소정근로시간', '이직확인서. 하한액에 영향을 줘요'] },
          { cells: ['정해진 하루 지급액', '수급자격 인정 통지와 수급자격증'] },
          { cells: ['이번 회차 인정 일수', '실업인정 결과'] },
          { cells: ['총 수령액', '하루 금액 × 소정급여일수'] },
        ], fn: '이직확인서의 평균임금이나 소정근로시간이 잘못 적히면 금액이 달라져요. 신청 전에 확인하세요.' },
      ] },
    ],
    faq: [
      ['월 300만원이면 실업급여가 하루 얼마인가요?', `${won(R3.dailyBenefit)}원이에요. 60퍼센트로 계산하면 ${won(R3.rawBenefit)}원인데 하한액이 적용돼요.`],
      ['월급이 두 배면 실업급여도 두 배인가요?', `아니에요. 월 ${man(LOWEST.w)}만원과 ${man(HIGHEST.w)}만원의 하루 차이가 ${won(GAP)}원뿐이에요.`],
      ['실업급여는 월급의 몇 퍼센트인가요?', '기초일액의 60퍼센트가 원칙이에요. 다만 상한과 하한에 걸리면 그 금액이 적용돼요.'],
      ['월급이 적으면 얼마를 받나요?', `하루 ${won(C.DAILY_LOWER_LIMIT)}원이 하한이에요. 다만 하루 소정근로시간이 8시간보다 짧으면 더 낮아질 수 있어요.`],
      ['한 달에 얼마가 들어오나요?', '인정된 날수에 하루 금액을 곱한 금액이에요. 회차마다 날수가 달라서 금액도 달라져요.'],
      ['월급이 아니라 평균임금이라는 게 무슨 뜻인가요?', '이직 전 3개월 임금 총액을 그 기간 총 일수로 나눈 금액이에요. 이직확인서에 적혀 있어요.'],
    ],
    summary: [
      '구직급여일액은 기초일액의 60퍼센트이고 상한과 하한에 막혀요.',
      `월 ${man(LOWEST.w)}만원과 ${man(HIGHEST.w)}만원의 하루 차이가 ${won(GAP)}원뿐이에요.`,
      '기준은 세전 월급이 아니라 이직 전 3개월 평균임금이에요.',
      '총액을 가르는 건 하루 금액이 아니라 소정급여일수예요.',
    ],
    sources: [
      ['법령', '고용보험법 제45조(급여의 기초가 되는 임금일액), 제46조(구직급여일액), 고용보험법 시행령 제68조(기초일액의 상한액).'],
      ['정부 도구', `고용24 실업급여 모의계산 결과와 월급 구간별 금액을 대조했어요 (${VERIFIED} 확인).`],
    ],
    claims: [
      { src: 1, quote: '그 수급자격자의 기초일액에 100분의 60을 곱한 금액', note: '구직급여일액 (고용보험법 제46조①1호)' },
      { src: 1, quote: '산정된 구직급여일액이 최저구직급여일액보다 낮은 경우에는 최저구직급여일액을 그 수급자격자의 구직급여일액으로 한다', note: '하한액 적용 (제46조②)' },
      { src: 1, quote: '지급된 임금 총액을 그 산정의 기준이 되는 3개월의 총 일수로 나눈 금액을 기초일액으로 한다', note: '기초일액 계산 (제45조① 단서)' },
      { src: 1, quote: '산정된 금액이 「근로기준법」에 따른 그 근로자의 통상임금보다 적을 경우에는 그 통상임금액을 기초일액으로 한다', note: '통상임금 비교 (제45조②)' },
      { src: 1, quote: '이직 전 1일 소정근로시간에 이직일 당시 적용되던 「최저임금법」에 따른 시간 단위에 해당하는 최저임금액을 곱한 금액', note: '최저기초일액 (제45조④)' },
      { src: 1, quote: '대통령령으로 정하는 금액을 초과하는 경우에는 대통령령으로 정하는 금액을 기초일액으로 한다', note: '기초일액 상한 (제45조⑤)' },
      { src: 10, quote: '10,320 82,560 2,156,880', note: '2026년 최저임금 시급과 일급·월급 (최저임금위원회)' },
    ],
    related: [
      { kind: '주제 홈', label: '2026년 실업급여 얼마나 받나요', href: '/unemployment/' },
      { kind: '계산기', label: '실업급여 계산기', href: '/unemployment/calculator/' },
      { kind: '다음 질문', label: '2026년 실업급여 상한액 하한액, 하루 얼마까지 받나요', href: '/unemployment/amount/' },
      { kind: '다음 질문', label: '실업급여 소정급여일수 표, 나이와 가입기간별 며칠 받나', href: '/unemployment/days/' },
    ],
  };
}
