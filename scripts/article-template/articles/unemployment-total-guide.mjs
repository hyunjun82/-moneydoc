/**
 * 스포크 글: 실업급여 총 수령액 (/unemployment/total/)
 *   허브(/unemployment/)의 하위 글. 다 합쳐 얼마인지만 다룬다.
 *   시각 장치는 table 로 간다 (조건별 총액 비교가 이 글의 답이라).
 *   계산기 버튼을 다는 편이다. 총액이 계산기가 내는 값이다.
 */
import { won, man } from '../render.mjs';

export default function article({ calculators, loadSpec, VERIFIED, derive = (v) => v }) {
  const spec = loadSpec('government/unemployment-benefit');
  const ub = (w, y, e = false) =>
    calculators['unemployment-benefit']({ monthlySalary: w, insuredYears: y, isElderlyOrDisabled: e }, spec);

  const ROWS = [
    { w: 2e6, y: 1 }, { w: 2e6, y: 5 }, { w: 3e6, y: 1 }, { w: 3e6, y: 3 },
    { w: 3e6, y: 7 }, { w: 3e6, y: 12 }, { w: 4e6, y: 7 }, { w: 4e6, y: 12 },
  ].map((r) => {
    const x = ub(r.w, r.y);
    return { ...r, daily: x.dailyBenefit, days: x.benefitDays, total: x.totalBenefit,
      months: derive(Math.round((x.benefitDays / 30) * 10) / 10) };
  });

  const R = ub(3e6, 3);
  const R50 = ub(3e6, 3, true);
  const BONUS = derive(R50.totalBenefit - R.totalBenefit);
  const ROUND28 = derive(R.dailyBenefit * 28);
  const FIRST = derive(R.dailyBenefit * 7);
  const MONTHS = derive(Math.round((R.benefitDays / 30) * 10) / 10);
  const EI = 'https://www.ei.go.kr';

  return {
    slug: 'unemployment-total-guide', cat: 'government', catLabel: '정부지원금', crumb: '실업급여 총 수령액',
    title: '실업급여 총 수령액 계산, 한 달에 얼마씩 몇 달 받나요',
    description: `실업급여 총액은 하루 지급액에 소정급여일수를 곱한 금액이에요. 월 ${man(3e6)}만원에 가입 3년이면 ${R.benefitDays}일 동안 모두 ${won(R.totalBenefit)}원이에요. 조건별 총액을 표로 정리했어요.`,
    datePublished: '2026-09-04', verified: VERIFIED, basis: '2026년 9월 기준', readMinutes: 6,
    badge: `고용보험법 급여 산정 원문 대조 · ${VERIFIED}`,
    calc: { href: '/unemployment/calculator/', label: '내 총 수령액 계산해 보기' },
    hero: {
      tag: '정부지원금', line1: '실업급여 총 수령액', line2: '다 합치면 얼마인가요',
      sub1: `월 ${man(3e6)}만원에 가입 3년이면 모두 ${won(R.totalBenefit)}원이에요`,
      sub2: `${R.benefitDays}일을 회차로 나눠서 받아요`,
      foot: `고용보험법 급여 산정 원문 대조 · ${VERIFIED} 검증`,
      card: { label: '월 300만원 가입 3년', big: won(R.totalBenefit), unit: '원', l1: `하루 ${won(R.dailyBenefit)}원 × ${R.benefitDays}일`, l2: `한 달 30일로 치면 약 ${MONTHS}개월` },
      alt: `실업급여 총 수령액 계산. 월 300만원 가입 3년이면 ${won(R.totalBenefit)}원`,
    },
    intro: `실업급여를 얼마나 받을지 계획을 세우려면 총액을 알아야 해요. 총액은 간단해요. 하루 지급액에 소정급여일수를 곱하면 끝이에요. 그런데 하루 지급액은 상한과 하한에 막혀 있어서 사람마다 크게 다르지 않고, 총액을 가르는 건 사실상 소정급여일수예요. 조건별로 얼마가 되는지 표로 정리했어요.`,
    answer: {
      label: '내 조건을 눌러 확인해 보세요',
      quick: [
        { chip: `월 ${man(3e6)}만원 · 1년`, selected: true, big: won(ub(3e6, 1).totalBenefit), unit: '총 수령액', sub: `${ub(3e6, 1).benefitDays}일 동안 받아요` },
        { chip: `월 ${man(3e6)}만원 · 3년`, selected: false, big: won(R.totalBenefit), unit: '총 수령액', sub: `${R.benefitDays}일 동안 받아요` },
        { chip: `월 ${man(3e6)}만원 · 12년`, selected: false, big: won(ub(3e6, 12).totalBenefit), unit: '총 수령액', sub: `${ub(3e6, 12).benefitDays}일 동안 받아요` },
      ],
      boxes: [
        { title: '총액 = 하루 금액 × 일수', text: '두 숫자만 알면 계산이 끝나요' },
        { title: '총액을 가르는 건 일수예요', text: '하루 금액은 상한과 하한에 막혀 사람마다 비슷해요' },
      ],
    },
    keyPoints: {
      title: '한눈에 보는 총 수령액',
      rows: [
        ['계산식', '구직급여일액 × 소정급여일수'],
        ['하루 금액을 정하는 것', '이직 전 평균임금'],
        ['일수를 정하는 것', '고용보험 가입기간과 나이'],
        [`월 ${man(3e6)}만원 가입 3년`, `${won(R.totalBenefit)}원 (${R.benefitDays}일)`],
        ['50세 이상 가산', `같은 조건에서 ${won(BONUS)}원 더 받아요`],
        ['받는 방식', '한 번에 주지 않고 실업인정 회차마다 나눠서 지급해요'],
      ],
    },
    sections: [
      { id: 's1', h2: '총 수령액은 어떻게 계산하나요', sub: '하루 금액에 일수를 곱해요', blocks: [
        { type: 'p', lead: true, ans: '구직급여일액에 소정급여일수를 곱하면 총액이에요.', text: `하루 금액은 기초일액의 60퍼센트이고 상한과 하한에 막혀요. 일수는 고용보험 가입기간과 나이로 정해져요. 월 ${man(3e6)}만원에 가입 3년이면 하루 ${won(R.dailyBenefit)}원에 ${R.benefitDays}일이라 모두 ${won(R.totalBenefit)}원이에요.` },
        { type: 'p', ans: '한 번에 주지는 않아요.', text: `실업인정을 받은 일수분씩 나눠서 지급해요. 첫 회차는 대기기간 7일이 빠져 약 ${won(FIRST)}원이고, 인정일 간격이 28일인 회차는 약 ${won(ROUND28)}원이에요.` },
        { type: 'table', net: 2, caption: '조건별 실업급여 총 수령액', headers: ['월 평균임금', '가입기간', '하루 지급액', '소정급여일수', '총 수령액'],
          rows: ROWS.map((r) => ({ hi: r.w === 3e6 && r.y === 3, cells: [`${man(r.w)}만원`, `${r.y}년`, `${won(r.daily)}원`, `${r.days}일`, `${won(r.total)}원`] })),
          fn: '구직급여일액은 기초일액의 100분의 60이고 상한과 하한이 있어요. 소정급여일수는 피보험기간과 연령에 따라 정해져요. 50세 미만 기준이에요.' },
      ] },

      { id: 's2', h2: '실업급여 한달 얼마씩 들어오나요', sub: '회차마다 인정된 일수만큼이에요', blocks: [
        { type: 'p', lead: true, ans: '고정된 월급처럼 나오지 않고, 실업인정 회차마다 그 기간에 인정된 일수분이 들어와요.', text: `1차 인정일은 신고일부터 14일이 되는 날이고 대기기간 7일이 빠져 7일치예요. 2차와 3차는 28일 간격이라 28일치가 나와요. 4차부터는 간격이 7일에서 28일 사이에서 정해져서 회차마다 금액이 달라져요.` },
        { type: 'p', ans: '그래서 매달 같은 금액을 기대하면 어긋나요.', text: `월 ${man(3e6)}만원인 사람이 28일치를 받으면 약 ${won(ROUND28)}원인데, 간격이 짧게 잡힌 회차에는 그보다 적게 들어와요. 총액이 줄어드는 게 아니라 나눠지는 방식이 다를 뿐이에요.` },
        { type: 'note', title: '세금은 떼지 않아요', text: '실업급여는 근로소득이 아니라 소득세를 원천징수하지 않아요. 통장에 찍히는 금액이 그대로예요.' },
      ] },

      { id: 's3', h2: '실업급여 몇달 동안 받을 수 있나요', sub: '소정급여일수를 달로 환산해요', blocks: [
        { type: 'p', lead: true, ans: `소정급여일수를 30으로 나누면 대략적인 개월 수가 나와요. ${R.benefitDays}일이면 약 ${MONTHS}개월이에요.`, text: '가입기간이 1년 미만이면 가장 짧고, 10년 이상이면 가장 길어요. 나이가 50세 이상이거나 장애인이면 구간마다 가산이 붙어요.' },
        { type: 'p', ans: '다만 12개월 안에 다 써야 해요.', text: '이직일 다음 날부터 12개월이 지나면 일수가 남아 있어도 지급이 끝나요. 소정급여일수가 긴 사람이 늦게 신청하면 다 못 쓰고 끝날 수 있어요.' },
        { type: 'table', text: true, caption: '조건별로 몇 달인가요', headers: ['월 평균임금', '가입기간', '소정급여일수', '30일 기준 개월'],
          rows: ROWS.map((r) => ({ hi: r.y === 12, cells: [`${man(r.w)}만원`, `${r.y}년`, `${r.days}일`, `약 ${r.months}개월`] })),
          fn: '개월 수는 30일로 나눈 어림값이에요. 실제로는 인정일 간격에 따라 달라져요.' },
      ] },

      { id: 's4', h2: '첫 회차는 왜 적게 들어오나요', sub: '대기기간 7일이 빠져요', blocks: [
        { type: 'p', lead: true, ans: `1차 인정일이 신고일부터 14일째인데 앞의 7일이 대기기간이라 7일치만 인정돼요.`, text: `그래서 첫 회차는 약 ${won(FIRST)}원이에요. 계산이 틀린 게 아니라 이 구조 때문이에요. 2차부터는 인정되는 날수가 늘어서 금액도 커져요.` },
        { type: 'p', ans: '중간에 일한 날이 있으면 그만큼 빠져요.', text: '취업한 날은 실업으로 인정되지 않아 그 날치가 빠진 금액이 들어와요. 예상보다 적다면 신고한 일수를 먼저 확인해 보세요.' },
        { type: 'note', title: '건설일용근로자는 첫 회차가 달라요', text: '대기기간이 없어서 14일치가 그대로 인정돼요. 같은 날 신고해도 첫 입금액이 달라지는 이유예요.' },
      ] },

      { id: 's5', h2: '내 총 수령액은 어디서 확인하나요', sub: '수급자격증과 고용보험 홈페이지', blocks: [
        { type: 'p', lead: true, ans: '수급자격을 인정받으면 하루 지급액과 소정급여일수가 정해져 통지돼요. 둘을 곱하면 총액이에요.', text: '고용보험 홈페이지에서 회차별 지급 내역과 남은 일수도 볼 수 있어요. 실제로 받은 금액과 남은 금액을 함께 확인할 수 있어요.' },
        { type: 'p', ans: '50세 이상이거나 장애인이면 더 받아요.', text: `가입기간이 같아도 소정급여일수에 가산이 붙어요. 월 ${man(3e6)}만원에 가입 3년인 사람이라면 ${won(BONUS)}원을 더 받게 돼요. 1년 미만 구간에는 가산이 붙지 않아요.` },
        { type: 'table', text: true, caption: '총액과 관련해 확인할 것', headers: ['확인할 것', '어디서 보나요'], rows: [
          { cells: ['하루 지급액', '수급자격 인정 통지와 수급자격증'] },
          { cells: ['소정급여일수', '수급자격증에 적혀 있어요'] },
          { cells: ['지금까지 받은 금액', '고용보험 홈페이지 지급 내역'], link: { label: '고용보험 홈페이지', href: EI } },
          { cells: ['남은 일수', '회차마다 확인할 수 있어요'] },
          { cells: ['수급기간 종료일', '이직일 다음 날부터 12개월이 되는 날'] },
        ], fn: '평균임금이나 가입기간이 잘못 신고되면 총액이 달라져요. 이직확인서를 먼저 확인하세요.' },
      ] },
    ],
    faq: [
      ['실업급여 총 수령액은 어떻게 계산하나요?', `하루 지급액에 소정급여일수를 곱해요. 월 ${man(3e6)}만원에 가입 3년이면 ${won(R.dailyBenefit)}원 × ${R.benefitDays}일로 ${won(R.totalBenefit)}원이에요.`],
      ['실업급여 한 달에 얼마 받나요?', `고정 금액이 아니에요. 인정일 간격이 28일인 회차면 약 ${won(ROUND28)}원이고, 첫 회차는 대기기간이 빠져 약 ${won(FIRST)}원이에요.`],
      ['실업급여 몇 달 받나요?', `소정급여일수를 30으로 나눈 값이에요. ${R.benefitDays}일이면 약 ${MONTHS}개월이에요.`],
      ['실업급여 최대 금액은 얼마인가요?', `가입 10년 이상에 50세 이상이면 소정급여일수가 가장 길어요. 하루 상한액에 그 일수를 곱한 금액이 최대예요.`],
      ['실업급여 4개월이면 얼마인가요?', `4개월은 약 120일이에요. 가입 1년 미만 구간이 여기에 해당하고, 월 300만원이면 ${won(ub(3e6, 1).totalBenefit)}원이에요.`],
      ['실업급여 전체 얼마를 받는지 어떻게 아나요?', '수급자격증에 적힌 하루 지급액과 소정급여일수를 곱하면 전체 금액이 나와요.'],
      ['월급이 많으면 총액도 많나요?', '하루 금액이 상한과 하한에 막혀 있어서 크게 차이 나지 않아요. 총액을 가르는 건 소정급여일수예요.'],
      ['50세 이상이면 얼마나 더 받나요?', `구간마다 소정급여일수가 늘어나요. 월 ${man(3e6)}만원에 가입 3년이면 ${won(BONUS)}원을 더 받아요.`],
      ['총액을 다 못 받는 경우도 있나요?', '이직일 다음 날부터 12개월이 지나면 일수가 남아도 끝나요. 늦게 신청할수록 위험해요.'],
    ],
    summary: [
      '총액은 구직급여일액에 소정급여일수를 곱한 금액이에요.',
      `월 ${man(3e6)}만원에 가입 3년이면 ${R.benefitDays}일 동안 ${won(R.totalBenefit)}원이에요.`,
      '한 번에 주지 않고 실업인정 회차마다 인정된 일수분씩 지급해요.',
      '12개월 안에 다 써야 하니 늦게 신청하면 총액을 못 채울 수 있어요.',
    ],
    sources: [
      ['법령', '고용보험법 제46조(구직급여일액), 제48조(수급기간 및 수급일수), 제49조(대기기간), 제50조(소정급여일수), 제56조(지급일 및 지급 방법).'],
      ['정부 도구', `고용24 실업급여 모의계산 결과와 조건별 총액을 대조했어요 (${VERIFIED} 확인).`],
    ],
    claims: [
      { src: 1, quote: '그 수급자격자의 기초일액에 100분의 60을 곱한 금액', note: '구직급여일액 (고용보험법 제46조①1호)' },
      { src: 1, quote: '대기기간이 끝난 다음날부터 계산하기 시작하여 피보험기간과 연령에 따라 별표 1에서 정한 일수가 되는 날까지로 한다', note: '소정급여일수 (제50조①)' },
      { src: 1, quote: '이직일의 다음 날부터 계산하기 시작하여 12개월 내에', note: '수급기간 12개월 (제48조①)' },
      { src: 1, quote: '실업의 신고일부터 계산하기 시작하여 7일간은 대기기간으로 보아 구직급여를 지급하지 아니한다', note: '대기기간 (제49조①)' },
      { src: 1, quote: '구직급여는 대통령령으로 정하는 바에 따라 실업의 인정을 받은 일수분(日數分)을 지급한다', note: '회차별 지급 (제56조①)' },
      { src: 6, quote: '2차 및 3차 실업인정일: 직전 실업인정일의 다음 날부터 28일이 되는 날', note: '2·3차 간격 (예규 제12조②2호)' },
    ],
    related: [
      { kind: '주제 홈', label: '2026년 실업급여 얼마나 받나요', href: '/unemployment/' },
      { kind: '계산기', label: '실업급여 계산기', href: '/unemployment/calculator/' },
      { kind: '다음 질문', label: '실업급여 소정급여일수 표, 나이와 가입기간별 며칠 받나', href: '/unemployment/days/' },
      { kind: '다음 질문', label: '실업급여 지급일 언제 들어오나요, 회차별 입금 날짜', href: '/unemployment/payday/' },
    ],
  };
}
