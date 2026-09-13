/**
 * 스포크 글: 기초연금 부부감액 (/basic-pension/couple/)
 *   허브(/basic-pension/)의 하위 글. "부부가 받으면 각자 얼마, 언제 더 깎이나" 를 법령 산식으로 답한다.
 *
 *   이 글만의 답: 둘 다 받으면 각자 20% 감액(감액 없을 때 한 사람 279,760원, 합계 559,520원), 한 명만 받으면 20% 감액은 없다.
 *   국민연금 감액이 있으면 줄어든 금액에서 20%를 깎아 부부 수령액이 달라진다. 소득인정액+기초연금이 선정기준액을 넘으면
 *   선정기준액까지 남은 금액만 받고(최소: 둘 다 받는 부부 합계 20%, 그 밖 10%), 부부는 감액한 두 사람 기초연금 비율대로 나눈다.
 *     · 부부감액 (기초연금법 제8조①), 선정기준액 근처 감액 (제8조②), 지급수준·배분 (시행령 제11조①②⑤)
 *     · 소득인정액은 본인과 배우자 합산 (제2조), 직역연금 수급권자와 배우자 제외 (제3조③)
 *   기초연금 계산기는 2026-09-13 기준 선정기준액 근처 감액을 계산하지 않는다(별도 작업). 금액은 계산기 상수의 산술 파생값만 쓴다.
 *   적대 검토(2026-09-13) 반영: 부부 배분(시행령 제11조⑤), 10% 최소는 "둘 다 받는 부부가 아니면", 한 명만 받아도 다른 감액은 붙음,
 *   감액 시작 소득인정액, 국민연금 감액 편 예시(324,550원)와 이어 붙임, 근거에 없는 "소득역전" 용어 삭제.
 *   계획서 calc.on=false 라 계산기 주소를 페이지 어디에도 걸지 않는다.
 *   검색어 근거: scripts/keyword-data/terms.basic-pension.json (네이버 자동완성 2026-09-13)
 */
import { won } from '../render.mjs';

export default function article({ calculators, loadSpec, VERIFIED, derive = (v) => v }) {
  const spec = loadSpec('government/basic-pension');
  const C = spec.constants;
  const B = calculators['basic-pension']({ householdType: 'single', incomeAmount: 1e6 }, spec).monthlyPension;      // 기준연금액
  const COUPLE = calculators['basic-pension']({ householdType: 'couple', incomeAmount: 1e6 }, spec).monthlyPension;  // 부부 합계
  const TH_S = C.INCOME_THRESHOLD_SINGLE;
  const TH_C = C.INCOME_THRESHOLD_COUPLE;
  const cut = derive(B * 0.2);                     // 한 사람당 부부감액
  const each = derive(B - cut);                    // 부부 한 사람
  const floorS = derive(B * 0.1);                  // 둘 다 받는 부부가 아닐 때 최소 (기준연금액의 10%)
  const floorC = derive(B * 0.2);                  // 둘 다 받는 부부 합계 최소 (기준연금액의 20%)
  const startS = derive(TH_S - B);                 // 단독 감액이 시작되는 소득인정액
  const startC = derive(TH_C - COUPLE);            // 둘 다 받는 부부 감액이 시작되는 소득인정액

  // 국민연금 감액 편 예시: A급여액 30만원, 국민연금 200% 초과 → 기초연금 324,550원
  const reducedSelf = derive(Math.min(B, Math.max(0, B - Math.round((derive(3e5) * 2) / 3)) + B / 2));
  const selfC = derive(reducedSelf * 0.8);
  const capU = derive(selfC + each);

  // 시행령 제11조. 소득인정액 + 기초연금액이 선정기준액을 넘을 때만 감액한다
  const single = (inc) => {
    const gap = derive(TH_S - inc);
    if (inc + B <= TH_S) return { gap, cut: false, pay: B };
    return { gap, cut: true, pay: derive(Math.min(B, gap <= floorS ? floorS : gap)) };
  };
  const couple = (inc, shares) => {
    const cap = derive(shares[0] + shares[1]);
    const gap = derive(TH_C - inc);
    const total = inc + cap <= TH_C ? cap : derive(Math.min(cap, gap <= floorC ? floorC : gap));
    const self = derive(Math.max(floorS, Math.round((total * shares[0]) / cap)));
    return { gap, cut: inc + cap > TH_C, total, self, spouse: derive(total - Math.round((total * shares[0]) / cap)) };
  };
  const EX = [
    { kind: '단독', inc: derive(2e6), r: single(2e6) },
    { kind: '단독', inc: derive(2.3e6), r: single(2.3e6) },
    { kind: '단독', inc: derive(2.45e6), r: single(2.45e6) },
    { kind: '부부', inc: derive(3.7e6), r: couple(3.7e6, [each, each]) },
    { kind: '부부', inc: derive(3.9e6), r: couple(3.9e6, [each, each]) },
  ];
  const E3 = couple(derive(3.7e6), [selfC, each]);

  return {
    slug: 'basic-pension-couple-guide', cat: 'government', catLabel: '정부지원금', crumb: '기초연금 부부감액',
    title: '기초연금 부부감액, 부부 수령액은 각자 얼마인가요',
    description: `부부가 둘 다 기초연금을 받으면 각자 20%씩 깎여 감액이 없을 때 둘이 합쳐 ${won(COUPLE)}원이에요. 한 명만 받으면 20% 감액은 없어요. 국민연금 감액이 있을 때 부부 수령액과 선정기준액 근처에서 둘이 나눠 받는 방법을 정리했어요.`,
    datePublished: '2026-09-13', verified: VERIFIED, basis: '2026년 9월 기준', readMinutes: 5,
    badge: `기초연금법 감액 조문 원문 대조 · ${VERIFIED}`,
    hero: {
      tag: '정부지원금', line1: '기초연금 부부감액', line2: '각자 20% 감액',
      sub1: '한 명만 받으면 20% 감액은 없어요',
      sub2: '국민연금 감액이 있으면 달라요',
      foot: `기초연금법 감액 조문 원문 대조 · ${VERIFIED} 검증`,
      card: { label: '부부 한 사람 수령액', big: won(each), unit: '원', l1: '2026년 감액 없을 때', l2: '기준연금액에서 20% 감액' },
      alt: `기초연금 부부감액. 둘 다 받으면 각자 20% 깎여 한 사람 ${won(each)}원`,
    },
    intro: `부부가 둘 다 기초연금을 받으면 각자의 기초연금에서 20%씩 깎여, 감액이 없을 때 둘이 합쳐 ${won(COUPLE)}원을 받아요. 한 명만 받으면 이 20% 감액은 없지만 다른 감액은 따로 붙을 수 있어요. 소득인정액이 선정기준액에 가까우면 남은 금액만 받고, 부부는 그 금액을 두 사람 기초연금 비율대로 나눠요.`,
    answer: {
      label: '부부 상황을 골라 보세요 (2026년)',
      quick: [
        { chip: '둘 다 수급', selected: true, big: won(each), unit: '원씩', sub: '국민연금 감액이 없을 때 20%를 깎은 금액' },
        { chip: '한 명만 수급', big: '없음', unit: '부부감액', sub: '국민연금 감액 같은 다른 감액은 따로 봐요' },
        { chip: '선정기준액 근처', big: '20%', unit: '합계 최소', sub: '둘 다 받는 부부는 기준연금액의 20%를 나눠 받아요' },
      ],
      boxes: [
        { title: '둘 다 받을 때만 20%', text: '본인과 배우자가 모두 기초연금 수급권자일 때 각자 20%를 감액해요' },
        { title: '감액분은 비율대로 나눠요', text: '선정기준액 근처라 줄어들면 두 사람 기초연금 비율대로 나눠 받아요' },
      ],
    },
    keyPoints: {
      title: '한눈에 보는 기초연금 부부감액',
      rows: [
        ['부부감액', '둘 다 받으면 각자 20%'],
        ['부부 한 사람 (감액 없을 때)', `${won(each)}원`],
        ['부부 합계 (감액 없을 때)', `${won(COUPLE)}원`],
        ['부부가구 선정기준액', `${won(TH_C)}원`],
        ['단독 감액 시작 소득인정액', `${won(startS)}원 초과`],
        ['부부 감액 시작 소득인정액', `${won(startC)}원 초과 (둘 다 받을 때)`],
        ['근처 감액 최소 (둘 다 받는 부부)', '둘이 합쳐 기준연금액의 20%'],
        ['근처 감액 최소 (그 밖)', '기준연금액의 10%'],
      ],
    },
    sections: [
      { id: 's1', h2: '기초연금 부부감액은 몇 퍼센트인가요', sub: '각자 20%예요', blocks: [
        { type: 'p', lead: true, ans: '20%예요. 부부가 둘 다 받으면 각자의 기초연금에서 20%를 깎아요.', text: `기준연금액 ${won(B)}원이라면 한 사람당 ${won(cut)}원이 깎여요.` },
        { type: 'p', ans: '국민연금 감액이 있으면 줄어든 금액에서 20%를 깎아요.', text: `국민연금 감액으로 기초연금이 ${won(reducedSelf)}원이 된 사람이 부부로 둘 다 받으면 ${won(selfC)}원이에요.`, link: { href: '/basic-pension/national-pension/', label: '기초연금 국민연금 감액' } },
      ] },

      { id: 's2', h2: '기초연금 부부 수령액은 각자 얼마인가요', sub: '둘의 기초연금이 다르면 수령액도 달라요', blocks: [
        { type: 'p', lead: true, ans: `국민연금 감액이 없는 부부라면 한 사람 ${won(each)}원씩, 둘이 합쳐 ${won(COUPLE)}원이에요.`, text: '한 사람만 국민연금 감액을 받으면 각자 줄어든 금액에서 20%를 깎아서 두 사람 수령액이 서로 달라요.' },
        { type: 'table', caption: '부부 수령액 예시 (2026년)', headers: ['부부 상황', '본인', '배우자', '합계'], rows: [
          { hi: true, cells: ['둘 다 받고 국민연금 감액 없음', won(each), won(each), won(COUPLE)] },
          { cells: ['둘 다 받고 본인만 국민연금 감액', won(selfC), won(each), won(capU)] },
          { cells: ['본인만 받음', `${won(B)} 이하`, '0', `${won(B)} 이하`] },
        ], fn: `단위: 원. 본인 국민연금 감액은 A급여액 30만원으로 기초연금이 ${won(reducedSelf)}원이 된 경우예요. 본인만 받아도 국민연금 감액이나 선정기준액 근처 감액은 붙을 수 있어요.` },
      ] },

      { id: 's3', h2: '부부 중 한 명만 받으면 감액되나요', sub: '20% 감액은 없고 다른 감액은 따로 봐요', blocks: [
        { type: 'p', lead: true, ans: '부부감액은 없어요. 부부감액은 본인과 배우자가 모두 기초연금 수급권자일 때만 적용돼요.', text: '배우자가 65세가 안 됐거나 수급 대상이 아니면 20%를 깎지 않아요. 국민연금 감액과 선정기준액 근처 감액은 따로 붙을 수 있어요.' },
        { type: 'p', ans: `한 명만 받는 부부의 선정기준액 근처 감액 최소 금액은 기준연금액의 10%인 ${won(floorS)}원이에요.`, text: '둘 다 받는 부부가 아니면 이 10% 기준을 써요.' },
      ] },

      { id: 's4', h2: '소득인정액이 선정기준액에 가까우면 더 깎이나요', sub: '선정기준액까지 남은 금액만 받아요', blocks: [
        { type: 'p', lead: true, ans: '깎여요. 소득인정액과 기초연금을 더한 금액이 선정기준액을 넘으면, 선정기준액에서 소득인정액을 뺀 금액만 받아요.', text: `단독가구는 소득인정액이 ${won(startS)}원을 넘을 때부터, 부부가 둘 다 받으면 ${won(startC)}원을 넘을 때부터 줄어요. 남은 금액이 단독 ${won(floorS)}원 이하면 ${won(floorS)}원, 부부 합계 ${won(floorC)}원 이하면 둘이 합쳐 ${won(floorC)}원이에요.` },
        { type: 'table', caption: '선정기준액 근처 감액 예시 (2026년, 국민연금 감액 없음)', headers: ['가구', '소득인정액', '남은 금액', '감액', '받는 기초연금', '부부 한 사람'],
          rows: EX.map((e, i) => ({ hi: i === 3, cells: [e.kind, won(e.inc), won(e.r.gap), e.r.cut ? '있음' : '없음', e.kind === '부부' ? won(e.r.total) : won(e.r.pay), e.kind === '부부' ? won(e.r.self) : '·'] })),
          fn: `단위: 원. 선정기준액은 단독 ${won(TH_S)}원, 부부 ${won(TH_C)}원이에요. 부부는 받는 기초연금이 둘의 합계이고, 감액한 두 사람 기초연금 비율대로 나눠요.` },
        { type: 'p', ans: '두 사람 기초연금이 다르면 받는 금액도 그 비율대로 나눠요.', text: `본인 ${won(selfC)}원, 배우자 ${won(each)}원인 부부가 소득인정액 370만원이면 둘이 합쳐 ${won(E3.total)}원을 받고, 본인 ${won(E3.self)}원과 배우자 ${won(E3.spouse)}원으로 나눠요.` },
      ] },
    ],
    faq: [
      ['부부 소득인정액은 합쳐서 보나요?', '합쳐서 봐요. 소득인정액은 본인과 배우자의 소득평가액과 재산의 소득환산액을 더한 금액이에요.'],
      ['부부 소득인정액이 선정기준액을 넘으면 한 명이라도 받을 수 있나요?', '받지 못해요. 두 사람 소득인정액을 합쳐 부부가구 선정기준액과 비교해서, 넘으면 둘 다 대상이 아니에요.'],
      ['나눈 금액이 한 사람만 아주 적게 나오면요?', `그 사람 몫이 기준연금액의 10%보다 적으면 10%인 ${won(floorS)}원을 줘요.`],
      ['배우자가 공무원연금을 받으면 어떻게 하나요?', '공무원연금 같은 직역연금을 받는 사람과 그 배우자는 원칙적으로 기초연금 대상이 아니에요.'],
      ['이혼하면 부부감액이 없어지나요?', '배우자가 없으면 부부감액 대상이 아니에요. 단독가구 기준으로 다시 봐요.'],
    ],
    summary: [
      '부부감액은 둘 다 받을 때만 20%예요. 한 명만 받으면 20% 감액은 없어요.',
      '국민연금 감액이 있으면 줄어든 금액에서 다시 20%를 깎아서 부부 수령액이 달라져요.',
      '소득인정액이 감액 시작 금액을 넘으면 선정기준액까지 남은 금액만 받는다고 보세요.',
      '부부가 둘 다 받을 때 줄어든 금액은 두 사람 기초연금 비율대로 나눠 받아요.',
    ],
    sources: [
      ['법령', '기초연금법 제2조(소득인정액의 뜻), 제3조(수급권자의 범위, 직역연금 수급권자와 배우자 제외), 제5조(기초연금액의 산정), 제8조(부부 감액, 선정기준액 근처 감액). 같은 법 시행령 제11조(감액에 따른 기초연금액 지급수준과 부부 배분).'],
      ['정부 안내', `기준연금액, 부부 합계, 선정기준액은 보건복지부 고시 값을 담은 기초연금 계산기 상수예요 (${VERIFIED} 기준). 선정기준액 근처 감액과 부부 배분 금액은 시행령 산식에 이 상수를 넣어 계산했어요.`],
    ],
    claims: [
      { src: 1, quote: '본인과 그 배우자가 모두 기초연금 수급권자인 경우에는 각각의 기초연금액에서 기초연금액의 100분의 20에 해당하는 금액을 감액한다', note: '부부감액 (제8조①)' },
      { src: 1, quote: '제1항이 적용되는 경우에는 그 감액분이 반영된 금액을 말한다', note: '부부감액 뒤 근처 감액 (제8조②)' },
      { src: 1, quote: '선정기준액을 초과하는 금액의 범위에서 기초연금액의 일부를 감액할 수 있다', note: '선정기준액 근처 감액 (제8조②)' },
      { src: 2, quote: '선정기준액에서 소득인정액을 뺀 금액이 기준연금액의 100분의 10 이하인 경우: 기준연금액의 100분의 10에 해당하는 금액', note: '최소 10% (시행령 제11조①1)' },
      { src: 2, quote: '선정기준액에서 소득인정액을 뺀 금액이 기준연금액의 100분의 10을 넘는 경우: 선정기준액에서 소득인정액을 뺀 금액', note: '남은 금액 (시행령 제11조①2)' },
      { src: 2, quote: '선정기준액에서 소득인정액을 뺀 금액이 기준연금액의 100분의 20 이하인 경우: 기준연금액의 100분의 20에 해당하는 금액', note: '둘 다 받는 부부 최소 20% (시행령 제11조②1)' },
      { src: 2, quote: '법 제8조제1항에 따라 감액한 본인 및 배우자의 기초연금액을 합산한 금액을 상한으로', note: '부부 합산 상한 (시행령 제11조②)' },
      { src: 2, quote: '감액한 본인 및 배우자의 기초연금액에 비례하도록 배분하여 본인 및 배우자에게 각각 지급한다', note: '부부 배분 (시행령 제11조⑤)' },
      { src: 2, quote: '본인과 배우자 중 1명에게 지급하는 금액이 기준연금액의 100분의 10 미만이 되는 경우에는', note: '한 사람 몫 최소 10% (시행령 제11조⑤ 단서)' },
      { src: 1, quote: '“소득인정액”이란 본인 및 배우자의 소득평가액과 재산의 소득환산액을 합산한 금액을 말한다', note: '부부 합산 소득인정액 (제2조)' },
      { src: 1, quote: '65세 이상인 사람으로서 소득인정액이 보건복지부장관이 정하여 고시하는 금액', note: '수급권자 (제3조①)' },
      { src: 1, quote: '「공무원연금법」 제28조', note: '직역연금 수급권자와 배우자 제외 (제3조③)' },
      { src: 1, quote: '부가연금액: 기준연금액의 2분의 1에 해당하는 금액', note: '국민연금 감액 예시의 부가연금액 (제5조⑤3)' },
    ],
    related: [
      { kind: '주제 홈', label: '기초연금 무엇이 궁금하세요', href: '/basic-pension/' },
      { kind: '다음 질문', label: '기초연금 국민연금 감액', href: '/basic-pension/national-pension/' },
      { kind: '연금 계산기', label: '국민연금 예상 수령액', href: '/national-pension/' },
    ],
  };
}
