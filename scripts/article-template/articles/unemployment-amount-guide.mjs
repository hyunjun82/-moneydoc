/**
 * 스포크 글: 실업급여 상한액 하한액 (/unemployment/amount/)
 *   허브(/unemployment/)의 하위 글. 하루 얼마인지 하나만 다룬다.
 *   시각 장치는 table 로 간다 (월급 구간별로 어디서 상한과 하한에 걸리는지가 답이라).
 *   계산기 버튼을 다는 편이다. 계산기가 내는 일액이 곧 이 글의 답이다.
 */
import { won, man } from '../render.mjs';

export default function article({ calculators, loadSpec, VERIFIED, derive = (v) => v }) {
  const spec = loadSpec('government/unemployment-benefit');
  const C = spec.constants;
  const ub = (monthlySalary, insuredYears = 3, isElderlyOrDisabled = false) =>
    calculators['unemployment-benefit']({ monthlySalary, insuredYears, isElderlyOrDisabled }, spec);

  const WAGES = [1.5e6, 2e6, 2.5e6, 3e6, 3.5e6, 4e6, 5e6, 7e6].map((w) => {
    const r = ub(w);
    const hit = r.rawBenefit < C.DAILY_LOWER_LIMIT ? '하한액 적용'
      : r.dailyBenefit === C.DAILY_UPPER_LIMIT ? '상한액 적용' : '그대로 적용';
    return { w, raw: r.rawBenefit, daily: r.dailyBenefit, hit };
  });

  const GAP = derive(C.DAILY_UPPER_LIMIT - C.DAILY_LOWER_LIMIT);
  const MONTH_LOW = derive(C.DAILY_LOWER_LIMIT * 30);
  const MONTH_HIGH = derive(C.DAILY_UPPER_LIMIT * 30);
  const MONTH_GAP = derive(MONTH_HIGH - MONTH_LOW);
  const MIN_WAGE = 10320;                                    // 2026년 최저임금 시급 (최저임금위원회)
  const LOWER_CALC = derive(Math.round(MIN_WAGE * 0.8 * 8)); // 최저기초일액 × 100분의 80
  // 엔진은 평균임금을 monthlySalary*3/90, 즉 월급÷30 으로 잡는다. 이 글의 표도 같은 기준이다.
  // 여기만 30.4 를 쓰는 바람에 상한 도달 월급이 45,400원 어긋나 있었다 (2026-09-04 검토에서 발견).
  const CAP_WAGE = derive(Math.round(C.BASE_DAILY_WAGE_CAP * 30));
  const R = ub(3e6);
  const EI = 'https://www.ei.go.kr';

  return {
    slug: 'unemployment-amount-guide', cat: 'government', catLabel: '정부지원금', crumb: '실업급여 상한액 하한액',
    title: '2026년 실업급여 상한액 하한액, 하루 얼마까지 받나요',
    description: `2026년 실업급여는 하루 최대 ${won(C.DAILY_UPPER_LIMIT)}원, 최소 ${won(C.DAILY_LOWER_LIMIT)}원이에요. 둘 차이가 ${won(GAP)}원뿐이라 월급이 달라도 받는 금액은 비슷해요. 월급 구간별로 정리했어요.`,
    datePublished: '2026-09-04', verified: VERIFIED, basis: '2026년 9월 기준', readMinutes: 6,
    badge: `고용보험법 구직급여일액 원문 대조 · ${VERIFIED}`,
    calc: { href: '/unemployment/calculator/', label: '내 하루 지급액 계산해 보기' },
    hero: {
      tag: '정부지원금', line1: '2026년 실업급여 상한액 하한액', line2: '하루 얼마까지 받나요',
      sub1: `하루 최대 ${won(C.DAILY_UPPER_LIMIT)}원, 최소 ${won(C.DAILY_LOWER_LIMIT)}원이에요`,
      sub2: `둘 차이가 ${won(GAP)}원뿐이라 월급이 달라도 금액이 비슷해요`,
      foot: `고용보험법 구직급여일액 원문 대조 · ${VERIFIED} 검증`,
      card: { label: '2026년 하루 상한액', big: won(C.DAILY_UPPER_LIMIT), unit: '원', l1: `하한액은 ${won(C.DAILY_LOWER_LIMIT)}원`, l2: `한 달 30일이면 ${won(MONTH_HIGH)}원` },
      alt: `2026년 실업급여 상한액 ${won(C.DAILY_UPPER_LIMIT)}원과 하한액 ${won(C.DAILY_LOWER_LIMIT)}원`,
    },
    intro: `실업급여는 원래 평균임금의 60퍼센트예요. 그런데 위아래로 막아 둔 금액이 있어서, 실제로 받는 하루 금액은 대부분 두 값 중 하나예요. 2026년 상한액은 ${won(C.DAILY_UPPER_LIMIT)}원, 하한액은 ${won(C.DAILY_LOWER_LIMIT)}원이고 차이는 ${won(GAP)}원밖에 나지 않아요. 월급이 얼마여야 어디에 걸리는지, 월로 치면 얼마인지 정리했어요.`,
    answer: {
      label: '내 월급을 눌러 확인해 보세요',
      quick: [
        { chip: `월 ${man(2e6)}원`, selected: true, big: `${won(ub(2e6).dailyBenefit)}원`, unit: '하루 지급액', sub: '하한액이 적용돼요' },
        { chip: `월 ${man(3e6)}원`, selected: false, big: `${won(R.dailyBenefit)}원`, unit: '하루 지급액', sub: `60퍼센트로 치면 ${won(R.rawBenefit)}원이라 하한액이 적용돼요` },
        { chip: `월 ${man(5e6)}원`, selected: false, big: `${won(ub(5e6).dailyBenefit)}원`, unit: '하루 지급액', sub: '상한액이 적용돼요' },
      ],
      boxes: [
        { title: '상한과 하한 차이가 작아요', text: `하루 ${won(GAP)}원, 한 달 30일로 쳐도 ${won(MONTH_GAP)}원 차이예요` },
        { title: '평균임금의 60퍼센트가 원칙이에요', text: '그 값이 하한보다 낮으면 하한액을, 상한을 넘으면 상한액을 줘요' },
      ],
    },
    keyPoints: {
      title: '한눈에 보는 상한액 하한액',
      rows: [
        ['2026년 상한액', `하루 ${won(C.DAILY_UPPER_LIMIT)}원`],
        ['2026년 하한액', `하루 ${won(C.DAILY_LOWER_LIMIT)}원`],
        ['둘의 차이', `하루 ${won(GAP)}원`],
        ['원칙', '평균임금의 100분의 60'],
        ['하한액 근거', '최저기초일액의 100분의 80'],
        ['월로 치면', `30일 기준 ${won(MONTH_LOW)}원에서 ${won(MONTH_HIGH)}원`],
      ],
    },
    sections: [
      { id: 's1', h2: '2026년 실업급여 하루 상한액은 얼마인가요', sub: `하루 ${won(C.DAILY_UPPER_LIMIT)}원`, blocks: [
        { type: 'p', lead: true, ans: `2026년 실업급여 하루 상한액은 ${won(C.DAILY_UPPER_LIMIT)}원이에요.`, text: `평균임금의 60퍼센트가 이 금액을 넘어도 더 주지 않아요. 기초일액 자체에도 한도가 있어서 하루 ${won(C.BASE_DAILY_WAGE_CAP)}원까지만 인정해요. 월급을 30으로 나눠 보면 월 ${won(CAP_WAGE)}원부터는 더 올라도 하루 금액이 그대로예요. 실제 평균임금은 3개월 임금 총액을 그 기간 총 일수로 나누기 때문에 며칠 차이로 조금씩 달라져요.` },
        { type: 'p', ans: '그래서 고소득자일수록 대체율이 낮아져요.', text: `월 ${man(5e6)}원을 받던 사람도 하루 ${won(ub(5e6).dailyBenefit)}원이고, 월 ${man(7e6)}원을 받던 사람도 같은 ${won(ub(7e6).dailyBenefit)}원이에요. 실업급여는 생활을 최소한 받쳐 주는 제도라 위쪽을 막아 둔 거예요.` },
        { type: 'note', title: '상한액은 해마다 정해져요', text: '기초일액의 상한액은 대통령령으로 정하도록 되어 있어서 매년 바뀔 수 있어요. 이 글의 금액은 2026년 기준이에요.' },
      ] },

      { id: 's2', h2: '하한액은 어떻게 정해지나요', sub: '최저임금에서 나와요', blocks: [
        { type: 'p', lead: true, ans: `하한액은 최저임금과 연결돼 있어서 2026년은 하루 ${won(C.DAILY_LOWER_LIMIT)}원이에요.`, text: `평균임금이 아주 낮으면 최저기초일액을 기초일액으로 쓰고, 여기에 100분의 80을 곱한 금액을 최저구직급여일액으로 해요. 2026년 최저임금 시급 ${won(MIN_WAGE)}원에 8시간을 곱하고 다시 80퍼센트를 곱하면 ${won(LOWER_CALC)}원이 나와요.` },
        { type: 'p', ans: '60퍼센트로 계산한 값이 이보다 낮으면 하한액을 줘요.', text: '법이 그렇게 정해 두었어요. 그래서 월급이 아주 적었던 사람도 하한액만큼은 받아요. 반대로 말하면 월급이 어느 선 아래면 얼마를 받았든 같은 금액이 나와요.' },
        { type: 'note', title: '1일 소정근로시간이 짧으면 달라져요', text: '최저기초일액은 이직 전 1일 소정근로시간에 최저임금을 곱해 구해요. 하루 8시간보다 짧게 일했다면 하한액도 그만큼 낮아져요.' },
      ] },

      { id: 's3', h2: '상한액과 하한액은 왜 있나요', sub: '월급이 달라도 금액이 비슷해지는 이유', blocks: [
        { type: 'p', lead: true, ans: `위아래를 막아 두었기 때문에 실제로 받는 금액은 ${won(C.DAILY_LOWER_LIMIT)}원에서 ${won(C.DAILY_UPPER_LIMIT)}원 사이로 좁아져요.`, text: `차이가 하루 ${won(GAP)}원이라, 월급이 두 배 차이 나도 실업급여는 거의 같아요. 이 점을 모르고 월급이 많으니 실업급여도 많겠지 하고 생활비를 잡으면 어긋나요.` },
        { type: 'table', net: 2, caption: '월급별 하루 지급액과 상한 하한 적용 여부', headers: ['월 평균임금', '60퍼센트로 계산', '실제 하루 지급액', '적용'],
          rows: WAGES.map((r) => ({ hi: r.w === 3e6, cells: [`${man(r.w)}원`, `${won(r.raw)}원`, `${won(r.daily)}원`, r.hit] })),
          fn: '구직급여일액은 기초일액의 100분의 60이고, 그 값이 최저구직급여일액보다 낮으면 최저구직급여일액을 지급해요. 기초일액에는 상한이 있어요.' },
        { type: 'note', title: '금액보다 일수가 총액을 가릅니다', text: '하루 금액은 사람마다 크게 다르지 않아요. 총액을 가르는 건 소정급여일수예요. 가입기간과 나이로 120일에서 270일 사이로 정해져요.', link: { href: '/unemployment/days/', label: '소정급여일수 표' } },
      ] },

      { id: 's4', h2: '하루 금액을 월로 치면 얼마인가요', sub: `30일 기준 ${won(MONTH_LOW)}원에서 ${won(MONTH_HIGH)}원`, blocks: [
        { type: 'p', lead: true, ans: `한 달을 30일로 보면 ${won(MONTH_LOW)}원에서 ${won(MONTH_HIGH)}원이에요.`, text: `다만 실제로는 딱 30일씩 들어오지 않아요. 실업인정일 간격에 따라 28일치가 들어오는 달도 있고 다른 달도 있어요. 첫 회차는 대기기간 7일이 빠져서 더 적게 들어와요.` },
        { type: 'p', ans: '세금은 떼지 않아요.', text: '실업급여는 근로소득이 아니라서 소득세를 원천징수하지 않아요. 통장에 찍히는 금액이 그대로 손에 쥐는 금액이에요.' },
        { type: 'note', title: '회차마다 금액이 달라 보이는 이유', text: '하루 금액이 바뀐 게 아니라 인정된 날수가 달라서예요. 며칠치인지 확인하면 계산이 맞아떨어져요. 내 월급대가 어디에 걸리는지는 구간별 표로 보면 빨라요.', link: { href: '/unemployment/by-salary/', label: '월급 구간별 표' } },
      ] },

      { id: 's5', h2: '작년과 얼마나 달라졌나요', sub: '하한액은 최저임금을 따라 움직여요', blocks: [
        { type: 'p', lead: true, ans: '하한액은 최저임금이 오르면 같이 올라요.', text: '최저기초일액이 최저임금에서 나오기 때문이에요. 그래서 최저임금 인상률을 보면 하한액이 얼마나 오를지 가늠할 수 있어요. 상한액은 대통령령으로 따로 정해서 별개로 움직여요.' },
        { type: 'p', ans: '적용 기준은 이직일이에요.', text: '금액은 신청한 날이 아니라 회사를 그만둔 날을 기준으로 정해져요. 연말이나 연초에 퇴사했다면 어느 해 기준이 적용되는지 확인해 보세요.' },
        { type: 'table', text: true, caption: '금액과 관련해 확인할 것', headers: ['확인할 것', '어디서 보나요'], rows: [
          { cells: ['이직 전 평균임금', '회사가 낸 이직확인서에 적혀요'], link: { label: '고용보험 홈페이지', href: EI } },
          { cells: ['이직 전 1일 소정근로시간', '이직확인서. 하한액 계산에 쓰여요'] },
          { cells: ['정해진 하루 지급액', '수급자격 인정 통지와 수급자격증'] },
          { cells: ['적용 연도', '이직일이 속한 해의 기준으로 정해져요'] },
          { cells: ['총 얼마 받는지', '하루 지급액에 소정급여일수를 곱해요'], link: { href: '/unemployment/total/', label: '총 수령액 계산' } },
        ], fn: '이직확인서의 평균임금이나 소정근로시간이 잘못 적히면 금액이 달라져요. 신청 전에 확인하세요.' },
      ] },
    ],
    faq: [
      ['2026년 실업급여 상한액은 얼마인가요?', `하루 ${won(C.DAILY_UPPER_LIMIT)}원이에요. 평균임금의 60퍼센트가 이보다 커도 이 금액까지만 줘요.`],
      ['실업급여 하한액은 얼마인가요?', `하루 ${won(C.DAILY_LOWER_LIMIT)}원이에요. 최저임금에 연결되어 있어서 최저임금이 오르면 같이 올라요.`],
      ['월급이 많으면 실업급여도 많나요?', `한도가 있어서 크게 다르지 않아요. 상한액과 하한액 차이가 하루 ${won(GAP)}원뿐이에요.`],
      ['한 달에 얼마를 받나요?', `30일 기준으로 ${won(MONTH_LOW)}원에서 ${won(MONTH_HIGH)}원이에요. 실제로는 인정된 날수만큼 들어와요.`],
      ['실업급여에서 세금을 떼나요?', '떼지 않아요. 근로소득이 아니라서 소득세를 원천징수하지 않아요.'],
      ['금액은 언제 기준으로 정해지나요?', '신청한 날이 아니라 회사를 그만둔 날을 기준으로 정해져요.'],
    ],
    summary: [
      `2026년 실업급여는 하루 최대 ${won(C.DAILY_UPPER_LIMIT)}원, 최소 ${won(C.DAILY_LOWER_LIMIT)}원이에요.`,
      `둘 차이가 ${won(GAP)}원뿐이라 월급이 달라도 받는 금액은 비슷해요.`,
      '하한액은 최저임금에서 나와서 최저임금이 오르면 같이 올라요.',
      '총액을 가르는 건 하루 금액이 아니라 소정급여일수예요.',
    ],
    sources: [
      ['법령', '고용보험법 제45조(급여의 기초가 되는 임금일액, 최저기초일액과 상한), 제46조(구직급여일액과 최저구직급여일액), 고용보험법 시행령 제68조(기초일액의 상한액).'],
      ['정부 도구', `최저임금위원회의 2026년 최저임금과 고용24 실업급여 모의계산 결과를 대조했어요 (${VERIFIED} 확인).`],
    ],
    claims: [
      { src: 1, quote: '그 수급자격자의 기초일액에 100분의 60을 곱한 금액', note: '구직급여일액의 원칙 (고용보험법 제46조①1호)' },
      { src: 1, quote: '그 수급자격자의 기초일액에 100분의 80을 곱한 금액(이하 “최저구직급여일액”이라 한다)', note: '최저구직급여일액 (제46조①2호)' },
      { src: 1, quote: '산정된 구직급여일액이 최저구직급여일액보다 낮은 경우에는 최저구직급여일액을 그 수급자격자의 구직급여일액으로 한다', note: '하한액 적용 (제46조②)' },
      { src: 1, quote: '이직 전 1일 소정근로시간에 이직일 당시 적용되던 「최저임금법」에 따른 시간 단위에 해당하는 최저임금액을 곱한 금액', note: '최저기초일액의 계산 (제45조④)' },
      { src: 1, quote: '대통령령으로 정하는 금액을 초과하는 경우에는 대통령령으로 정하는 금액을 기초일액으로 한다', note: '기초일액 상한 (제45조⑤)' },
      { src: 10, quote: '10,320 82,560 2,156,880', note: '2026년 최저임금 시급과 일급·월급 (최저임금위원회)' },
    ],
    related: [
      { kind: '주제 홈', label: '2026년 실업급여 얼마나 받나요', href: '/unemployment/' },
      { kind: '계산기', label: '실업급여 계산기', href: '/unemployment/calculator/' },
      { kind: '다음 질문', label: '실업급여 소정급여일수 표, 나이와 가입기간별 며칠 받나', href: '/unemployment/days/' },
    ],
  };
}
