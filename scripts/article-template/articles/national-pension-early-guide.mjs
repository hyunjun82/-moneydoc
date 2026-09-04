/**
 * 글 스펙: 국민연금 조기수령
 *   감액 금액은 엔진(national-pension-early)이 만들고,
 *   손익분기 나이는 엔진 값으로만 계산해 derive 로 등록한다.
 */
import { won, man } from '../render.mjs';

export default function article({ calculators, loadSpec, VERIFIED, derive = (v) => v }) {
  const spec = loadSpec('pension/national-pension-early');
  const ep = (normalPension, startAge) => calculators['national-pension-early']({ normalPension, startAge }, spec);
  const C = spec.constants;

  const NORMAL = 1e6;                                      // 대표: 정상수령 월 100만원
  const R = ep(NORMAL, 60);
  const AGES = [60, 61, 62, 63, 64].map((a) => ({ a, r: ep(NORMAL, a) }));
  const PENSIONS = [7e5, 1e6, 1.5e6, 2e6].map((p) => ({ p, r: ep(p, 60) }));

  // 손익분기: 조기 시작 나이부터 받은 누적액과 정상 개시 뒤 누적액이 같아지는 나이
  const breakEven = (startAge, normal, reduced) => {
    const a = (C.NORMAL_AGE * normal - startAge * reduced) / (normal - reduced);
    return derive(Math.round(a * 10) / 10);
  };
  const BE = AGES.map(({ a, r }) => ({ a, r, be: breakEven(a, NORMAL, r.reducedPension) }));
  const cut = derive(NORMAL - R.reducedPension);
  const early5 = derive(R.reducedPension * 12 * 5);        // 60세부터 5년간 먼저 받는 총액
  const pctOf = (v) => derive(Math.round(v * 1000) / 10);
  const deferMonthly = derive(Math.round(NORMAL * 0.36));  // 5년 연기 시 가산액 (월 0.6% × 60개월)
  const deferPension = derive(NORMAL + deferMonthly);
  const NPS = 'https://www.nps.or.kr';

  return {
    slug: 'national-pension-early-guide', cat: 'pension', catLabel: '연금', crumb: '국민연금 조기수령',
    title: '국민연금 조기수령 감액과 손익분기, 조건부터 연기연금 비교까지',
    description: `정상수령 월 100만원인 사람이 60세부터 받으면 ${won(R.reducedPension)}원으로 ${pctOf(R.reductionRate)}% 깎여요. 감액률표, 손익분기 나이, 신청 조건, 연기연금과의 비교를 한 번에 정리했어요.`,
    datePublished: '2026-09-03', verified: VERIFIED, basis: '2026년 9월 기준', readMinutes: 7,
    badge: `국민연금법 조기노령연금 지급률과 일치 · ${VERIFIED}`,
    calc: { href: '/pension-early/calculator/', label: '국민연금 조기수령 계산기 바로가기' },
    hero: {
      tag: '연금', line1: '국민연금 조기수령 감액', line2: '언제가 유리한가',
      sub1: `정상 100만원 → 60세 수령 시 ${won(R.reducedPension)}원`,
      sub2: `손익분기는 약 ${BE[0].be}세예요`,
      foot: `국민연금법 조기노령연금 지급률과 일치 · ${VERIFIED} 검증`,
      card: { label: '60세 조기수령액', big: won(R.reducedPension), unit: '원', l1: '정상수령 월 100만원', l2: `${pctOf(R.reductionRate)}% 감액` },
      alt: `국민연금 조기수령 감액. 정상 100만원이면 60세에 ${won(R.reducedPension)}원`,
    },
    intro: `국민연금은 정해진 나이보다 최대 5년 먼저 받을 수 있어요. 대신 1년 일찍 받을 때마다 6%씩 깎이고, 그 감액은 평생 이어져요. 정상수령액이 월 100만원인 사람이 5년 일찍 받으면 ${won(R.reducedPension)}원이라 매달 ${won(cut)}원이 줄어요. 대신 5년 동안 먼저 받는 돈이 ${won(early5)}원이라 오래 살수록 불리해지는 구조예요. 감액률, 조건, 손익분기 나이, 연기연금 비교를 정리했어요.`,
    answer: {
      label: '시작 나이를 눌러 감액된 연금을 확인해 보세요 (정상 100만원 기준)',
      quick: [60, 62, 64].map((a) => {
        const r = ep(NORMAL, a);
        return { chip: `${a}세 시작`, selected: a === 60, big: `${won(r.reducedPension)}원`, unit: '월 연금액', sub: `${pctOf(r.reductionRate)}% 감액 · 손익분기 약 ${breakEven(a, NORMAL, r.reducedPension)}세` };
      }),
      boxes: [
        { title: '1년에 6%씩 깎여요', text: '최대 5년까지 당길 수 있고 30%가 최대 감액이에요. 평생 그 금액으로 받아요' },
        { title: '오래 살수록 불리해요', text: `60세부터 받으면 손익분기가 약 ${BE[0].be}세라 그보다 오래 살면 손해예요` },
      ],
    },
    keyPoints: {
      title: '한눈에 보는 조기수령',
      rows: [
        ['조기수령 가능 시기', '정상 개시보다 최대 5년 일찍'],
        ['감액률', `1년마다 6%씩. 5년이면 ${pctOf(R.reductionRate)}%`],
        ['정상 100만원이면', `60세 ${won(R.reducedPension)}원, 62세 ${won(AGES[2].r.reducedPension)}원`],
        ['가입 기간', '10년 이상이어야 노령연금을 받아요'],
        ['소득 요건', '소득이 있는 업무에 종사하지 않아야 조기 신청이 가능해요'],
        ['손익분기', `60세 시작이면 약 ${BE[0].be}세`],
        ['연기연금', `1개월 미룰 때마다 0.6%씩 늘어 5년이면 ${won(deferPension)}원`],
        ['되돌리기', '조기수령을 시작하면 원칙적으로 되돌릴 수 없어요'],
      ],
    },
    sections: [
      { id: 's1', h2: '국민연금 조기수령 감액, 얼마나 깎이나요', sub: '1년에 6%씩 평생 줄어요', blocks: [
        { type: 'p', lead: true, ans: `5년 일찍 받으면 ${pctOf(R.reductionRate)}%가 깎여 월 ${won(R.reducedPension)}원이 돼요.`, text: `1년 일찍 받을 때마다 6%씩 줄어요. 한 번 정해진 감액률은 평생 그대로라서, 나중에 정상 나이가 되어도 원래 금액으로 돌아가지 않아요.` },
        { type: 'table', net: 2, caption: '시작 나이별 감액률과 월 연금액 (정상수령 100만원 기준)', headers: ['시작 나이', '감액률', '월 연금액', '줄어드는 금액'],
          rows: AGES.map(({ a, r }) => ({ hi: a === 60, cells: [`${a}세`, `${pctOf(r.reductionRate)}%`, `${won(r.reducedPension)}원`, `${won(derive(NORMAL - r.reducedPension))}원`] })),
          fn: '국민연금법 제63조제2항의 조기노령연금 지급률에 따른 금액이에요. 정상 개시 연령은 출생 연도에 따라 달라요.' },
        { type: 'table', id: 'penTbl', compact: true, x: [1], net: 2, caption: '정상수령액별 60세 조기수령 금액', headers: ['정상수령액', '감액분', '60세 수령액'],
          rows: PENSIONS.map(({ p, r }) => ({ hi: p === NORMAL, cells: [`${man(p)}원`, won(derive(p - r.reducedPension)), won(r.reducedPension)] })),
          moreLabel: '감액분까지 보기',
          fn: '단위: 원. 부양가족연금액은 감액 대상이 아니라 따로 더해져요.' },
        { type: 'widget', label: '내 조기수령액 계산', title: '내 연금으로 바로 보기', note: '정상수령 시 월 연금액과 받기 시작할 나이를 넣으면 감액된 금액과 손익분기 나이가 나와요.',
          inputs: [
            { id: 'np', label: '정상수령 월 연금액 (만원)', type: 'number', value: 100, min: 10, max: 500, step: 5 },
            { id: 'na', label: '받기 시작할 나이', type: 'number', value: 60, min: 60, max: 64, step: 1 },
          ],
          outputs: [{ id: 'nrate', label: '감액률' }, { id: 'nmon', label: '월 연금액' }, { id: 'ncut', label: '매달 줄어드는 금액' }, { id: 'nbe', label: '손익분기 나이' }],
          port: `
  function earlyPension(normal, startAge){
    var years = ${C.NORMAL_AGE} - startAge;
    var rate = +(years * ${C.REDUCTION_PER_YEAR}).toFixed(2);
    var reduced = Math.round(normal * (1 - rate));
    var be = (${C.NORMAL_AGE} * normal - startAge * reduced) / (normal - reduced);
    return { rate: rate, reduced: reduced, cut: normal - reduced, be: Math.round(be * 10) / 10 };
  }`,
          js: `
  function nrender(){ var p=(+document.getElementById('np').value||0)*1e4, a=+document.getElementById('na').value||60; if(p<=0)return; var r=earlyPension(p,a);
    document.getElementById('nrate').textContent=(r.rate*100).toFixed(0)+'%'; document.getElementById('nmon').textContent=won(r.reduced)+'원';
    document.getElementById('ncut').textContent=won(r.cut)+'원'; document.getElementById('nbe').textContent=r.be+'세'; }
  ['np','na'].forEach(function(id){document.getElementById(id).addEventListener('input',nrender)}); nrender();`,
          check: (port) => {
            let n = 0, bad = 0;
            for (let p = 10; p <= 500; p += 5) for (let a = 60; a <= 64; a++) {
              n++;
              const e = ep(p * 1e4, a);
              const q = port.earlyPension(p * 1e4, a);
              if (q.reduced !== e.reducedPension || q.rate !== e.reductionRate) bad++;
            }
            return { n, bad };
          },
        },
      ] },

      { id: 's2', h2: '조기노령연금 조건은 어떻게 되나요', sub: '가입 10년과 소득 요건을 봐요', blocks: [
        { type: 'p', lead: true, ans: '가입 기간이 10년 이상이고 소득이 있는 업무에 종사하지 않아야 신청할 수 있어요.', text: '정상 개시 연령은 출생 연도에 따라 달라요. 1969년 이후에 태어났다면 65세부터가 정상이고, 그보다 최대 5년 일찍 받을 수 있어요. 신청한 다음 달부터 지급이 시작돼요.' },
        { type: 'table', text: true, caption: '조기노령연금 신청 조건', headers: ['항목', '기준'], rows: [
          { cells: ['가입 기간', '10년 이상이어야 노령연금 수급권이 생겨요'] },
          { cells: ['나이', '정상 개시 연령보다 최대 5년 일찍'] },
          { cells: ['소득', '소득이 있는 업무에 종사하지 않아야 해요'] },
          { cells: ['신청', '본인이 희망해서 청구해야 지급돼요'] },
          { cells: ['특수직종 근로자', '광원과 부원은 개시 연령이 5년 빨라요'] },
          { cells: ['출생 연도', '1969년 이후 출생자는 정상 개시가 65세예요'] },
        ], fn: '조기노령연금은 국민연금법 제61조제2항, 개시 연령의 경과 규정은 같은 법 부칙 제8조에 있어요.' },
        { type: 'note', title: '조기수령 단점은 취소가 어렵다는 점이에요', text: '한 번 시작하면 조기연금 취소가 원칙적으로 안 되고 감액이 평생 이어져요. 목돈이 급하다는 이유만으로 결정하기 전에 다른 방법을 먼저 살펴보세요.' },
      ] },

      { id: 's3', h2: '조기수령 손익분기점, 몇 살인가요', sub: '먼저 받은 총액과 나중 총액이 같아지는 시점', blocks: [
        { type: 'p', lead: true, ans: `60세부터 받으면 손익분기가 약 ${BE[0].be}세예요.`, text: `60세부터 5년 동안 먼저 받는 돈이 ${won(early5)}원이고, 65세 이후에는 매달 ${won(cut)}원씩 덜 받아요. 이 차이가 메워지는 시점이 손익분기예요. 그보다 오래 살면 조기수령이 손해가 돼요.` },
        { type: 'flow', label: '손익분기가 정해지는 구조', steps: [
          { label: '60세부터 5년', value: `${won(early5)}원`, sub: '먼저 받는 총액', op: '÷' },
          { label: '매달 차이', value: `${won(cut)}원`, sub: '정상수령보다 적은 금액', op: '=' },
          { label: '따라잡는 기간', value: '약 12년', sub: '65세 이후 기준', op: '→' },
          { label: '손익분기', value: `약 ${BE[0].be}세`, sub: '이보다 오래 살면 손해' },
        ] },
        { type: 'table', net: 2, caption: '시작 나이별 손익분기 (정상수령 100만원 기준)', headers: ['시작 나이', '월 연금액', '손익분기 나이'],
          rows: BE.map(({ a, r, be }) => ({ hi: a === 60, cells: [`${a}세`, `${won(r.reducedPension)}원`, `약 ${be}세`] })),
          fn: '물가 상승에 따른 연금액 조정과 세금은 넣지 않은 단순 비교예요. 실제로는 조정률에 따라 조금씩 달라져요.' },
        { type: 'tips', items: [
          { title: '건강 상태를 함께 보세요', text: '기대여명이 손익분기보다 짧다고 보면 조기수령이 유리해요. 판단이 어렵다면 국민연금공단 상담을 받아 보세요.' },
          { title: '당장 소득이 없다면', text: '퇴직 후 소득이 끊긴 기간을 메우는 용도로는 의미가 있어요. 다만 평생 감액이라는 점을 잊지 마세요.' },
          { title: '기초연금과 함께 보세요', text: '국민연금 수령액이 늘면 기초연금이 줄 수 있어요. 두 연금을 함께 계산해 보는 편이 정확해요.' },
        ] },
      ] },

      { id: 's4', h2: '연기연금과 비교하면 어느 쪽이 낫나요', sub: '미루면 1개월에 0.6%씩 늘어요', blocks: [
        { type: 'p', lead: true, ans: `연금을 미루면 1개월마다 0.6%씩 늘어요. 5년을 미루면 ${won(deferPension)}원이 돼요.`, text: `조기수령이 1년에 6%씩 깎는 것과 반대로, 연기연금은 1개월 0.6%가 열두 달 쌓여요. 정상수령액이 100만원이면 5년 연기로 ${won(deferMonthly)}원이 더해져요. 소득이 있고 건강하다면 미루는 쪽이 유리할 수 있어요.` },
        { type: 'table', net: 2, caption: '조기수령과 연기연금 비교 (정상수령 100만원 기준)', headers: ['선택', '월 연금액', '정상 대비'], rows: [
          { cells: ['5년 조기수령', `${won(R.reducedPension)}원`, `${won(cut)}원 적음`] },
          { cells: ['3년 조기수령', `${won(AGES[2].r.reducedPension)}원`, `${won(derive(NORMAL - AGES[2].r.reducedPension))}원 적음`] },
          { hi: true, cells: ['정상수령', `${won(NORMAL)}원`, '기준'] },
          { cells: ['5년 연기수령', `${won(deferPension)}원`, `${won(deferMonthly)}원 많음`] },
        ], fn: '연기 가산은 국민연금법 제62조제2항의 1개월당 1천분의 6 기준이에요. 연기는 최대 5년까지 할 수 있어요.' },
        { type: 'note', title: '일부만 미룰 수도 있어요', text: '연금 전부가 아니라 절반이나 70% 같은 일부만 연기할 수도 있어요. 소득이 있는 기간에 맞춰 조절하면 부담이 줄어요.' },
      ] },

      { id: 's5', h2: '조기연금 소득 있으면 어떻게 되나요', sub: '60세부터 65세 사이에는 감액될 수 있어요', blocks: [
        { type: 'p', lead: true, ans: '일정 기준을 넘는 소득이 있으면 그 기간에는 연금이 줄어요.', text: '초과소득월액이 200만원 이상이면 구간에 따라 깎이고, 빼는 금액은 연금액의 절반을 넘지 않아요. 65세가 넘으면 소득이 있어도 감액하지 않아요.' },
        { type: 'table', text: true, caption: '소득이 있을 때 줄어드는 금액', headers: ['초과소득월액', '빼는 금액'], rows: [
          { cells: ['200만원 이상 300만원 미만', '15만원에 초과분의 15%를 더한 금액'] },
          { cells: ['300만원 이상 400만원 미만', '30만원에 초과분의 20%를 더한 금액'] },
          { cells: ['400만원 이상', '50만원에 초과분의 25%를 더한 금액'] },
          { cells: ['공통 한도', '빼는 금액은 연금액의 2분의 1을 넘지 않아요'] },
          { cells: ['65세 이후', '소득이 있어도 감액하지 않아요'] },
        ], fn: '소득활동에 따른 감액은 국민연금법 제63조의2에 있어요. 초과소득월액은 소득월액에서 정해진 금액을 뺀 값이에요.' },
        { type: 'tips', items: [
          { title: '조기수령 중 취업하면 정지될 수 있어요', text: '조기노령연금을 받는 동안 소득이 있는 업무에 종사하면 지급이 멈출 수 있어요. 취업 전에 공단에 확인하세요.' },
          { title: '연금도 소득세 대상이에요', text: '연금소득으로 잡혀 연말정산이나 종합소득세 신고에 반영돼요. 다른 소득과 합쳐 확인해 보세요.' },
          { title: '내 예상 연금액을 먼저 확인하세요', text: '국민연금공단 홈페이지에서 가입 내역과 예상 수령액을 볼 수 있어요.' },
        ] },
        { type: 'steps', items: [
          { title: '예상 연금액 확인', text: '국민연금공단에서 가입 기간과 정상수령 예상액을 확인해요', meta: '5분', link: { label: '국민연금공단', href: NPS } },
          { title: '감액과 손익분기 계산', text: '시작 나이별 금액과 손익분기 나이를 비교해요', meta: '2분', link: { label: '조기수령 계산기', href: '/pension-early/' } },
          { title: '청구', text: '공단 지사나 홈페이지에서 청구하면 다음 달부터 지급돼요', meta: '본인 청구' },
        ] },
      ] },
    ],
    faq: [
      ['국민연금 조기수령하면 얼마나 깎이나요?', `1년에 6%씩 깎여요. 5년 일찍 받으면 ${pctOf(R.reductionRate)}%가 줄어 정상 100만원이 <b>${won(R.reducedPension)}원</b>이 돼요.`],
      ['조기노령연금 조건이 뭔가요?', '가입 기간이 10년 이상이고 소득이 있는 업무에 종사하지 않아야 해요. 정상 개시보다 최대 5년 일찍 받을 수 있어요.'],
      ['조기수령 손익분기는 몇 살인가요?', `60세부터 받으면 약 ${BE[0].be}세예요. 그보다 오래 살면 정상수령이 유리해요.`],
      ['연기연금은 얼마나 늘어나나요?', `1개월 미룰 때마다 0.6%씩 늘어요. 5년을 미루면 ${won(deferMonthly)}원이 더해져 ${won(deferPension)}원이 돼요.`],
      ['조기수령을 다시 되돌릴 수 있나요?', '원칙적으로 어려워요. 한 번 정해진 감액률이 평생 이어지니 신중하게 결정해야 해요.'],
      ['소득이 있으면 연금이 깎이나요?', '60세부터 65세 사이에는 초과소득월액에 따라 줄어요. 빼는 금액은 연금액의 절반을 넘지 않고, 65세가 지나면 감액하지 않아요.'],
      ['정상 수령 나이가 몇 살인가요?', '출생 연도에 따라 달라요. 1969년 이후 출생자는 65세부터예요.'],
    ],
    summary: [
      `조기수령은 1년에 6%씩 깎여요. 5년이면 ${pctOf(R.reductionRate)}%가 줄어 평생 그 금액이에요.`,
      `정상 100만원이면 60세 수령은 ${won(R.reducedPension)}원이고 손익분기는 약 ${BE[0].be}세예요.`,
      '가입 10년 이상이어야 하고 소득이 있는 업무에 종사하지 않아야 신청할 수 있어요.',
      `반대로 미루면 1개월에 0.6%씩 늘어 5년 연기하면 ${won(deferPension)}원이 돼요.`,
    ],
    sources: [
      ['법령', '국민연금법 제61조(노령연금 수급권자와 조기노령연금 청구 요건), 제62조(지급의 연기에 따른 가산, 1개월당 1천분의 6), 제63조(노령연금액과 조기노령연금 지급률), 제63조의2(소득활동에 따른 노령연금액 감액), 부칙 제8조(출생 연도별 지급연령 경과 규정). 국민연금법 시행령(지급 개시와 청구 절차).'],
      ['정부 도구', `국민연금공단 예상연금 모의계산의 감액 구조와 이 글의 계산이 같아요 (${VERIFIED} 대조).`],
    ],
    claims: [
      { src: 1, quote: '가입기간이 10년 이상인 가입자 또는 가입자였던 자에 대하여는 60세(특수직종근로자는 55세)가 된 때부터 그가 생존하는 동안 노령연금을 지급한다', note: '노령연금 수급권 (국민연금법 제61조①)' },
      { src: 1, quote: '대통령령으로 정하는 소득이있는 업무에 종사하지 아니하는 경우 본인이 희망하면', note: '조기노령연금 소득 요건 (제61조②)' },
      { src: 1, quote: '연기되는 매 1개월마다 그 금액의 1천분의 6을 더한 액으로 한다', note: '연기연금 가산 (제62조②)' },
      { src: 1, quote: '55세부터 지급받는 경우에는 1천분의 700', note: '조기노령연금 지급률 (제63조②1)' },
      { src: 1, quote: '이 경우 빼는 금액은 노령연금액의 2분의 1을 초과할 수 없다', note: '소득활동 감액 한도 (제63조의2)' },
      { src: 1, quote: '1969년 이후 출생자는 5세를 각각 더한 연령을 적용한다', note: '지급연령 경과 규정 (부칙 제8조)' },
      { src: 2, quote: '조기노령연금의 수급권을 취득한 자', note: '조기노령연금 관련 시행령 규정' },
    ],
    related: [
      { kind: '계산기', label: '국민연금 조기수령 계산기', href: '/pension-early/' },
      { kind: '연금 계산기', label: '국민연금 예상 수령액', href: '/national-pension/' },
      { kind: '정부지원금 가이드', label: '2026년 기초연금 수급 조건과 금액', href: '/basic-pension/' },
    ],
  };
}
