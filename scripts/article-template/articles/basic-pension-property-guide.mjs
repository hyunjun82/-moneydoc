/**
 * 스포크 글: 기초연금 재산기준 (/basic-pension/property/)
 *   허브(/basic-pension/)의 하위 글. "집과 예금이 얼마까지면 받나" 를 보도자료 산식과 계산기 상수로 답한다.
 *
 *   이 글만의 답: 재산기준은 금액 하나가 아니라 산식이다. 일반재산에서 지역 기본재산액(1억 3,500만·8,500만·7,250만원),
 *   금융재산에서 2,000만원, 그리고 부채를 뺀 뒤 4% ÷ 12 로 월 금액이 된다. 다른 소득이 없으면 공제하고 남은 재산
 *   단독 7억 4,100만원·부부 11억 8,560만원이 한도이고, 대도시 단독은 집 가액 8억 7,600만원까지다(가액 기준은 근거에 없음).
 *   4,000만원 이상 고급 자동차는 가액 전액이 월 소득인정액에 들어가 그것만으로 선정기준액을 넘고, 고급 회원권은 금액 기준 없이
 *   가액 전액이 들어간다. 빚 3,000만원마다 월 소득인정액 100,000원 감소.
 *     · 산식·기본재산액·금융 2,000만원·P값·선정기준액: 보건복지부 보도자료 2025-12-31 (근거 7)
 *     · 시행령 제3조①1(임차보증금·자동차·선박·항공기·입주권·분양권·회원권)·①3(증여·처분)·②, 제14조①1·2 (근거 8)
 *     · 소득인정액 정의(제2조4), 선정기준액 이하 지급(제3조①), 근처 감액(제8조②), 금융정보·채무액 동의(제10조②), 조사 자료(제11조②),
 *       금융정보 제공(제12조), 조사 후 결정(제13조①): 기초연금법 (근거 6)
 *   근거 폴더: basic-pension-spoke-guide (6 = 기초연금법, 7 = 2026 선정기준액 보도자료, 8 = 기초연금법 시행령).
 *   시행령 제3조(일반재산 범위·증여 처분 재산), 제14조(평균잔액 3개월·저축성예금 잔액, 신용정보 범위)로 답한다.
 *   근거에 없는 것: 재산가액 산정 방법(보건복지부령), 지역 구분 기준, 남는 공제·부채 초과의 처리.
 *   위젯은 남는 공제·부채 초과를 범위로 계산한다. 상단은 0 으로 자른 값, 하단은 음수를 고급 자산 가액과 소득평가액까지
 *   모두 상계한 값이다(근로소득편 위젯과 같은 가정). 범위 전체가 기준 아래면 '대상', 위면 '대상 아님', 걸치면 판정하지 않는다.
 *   엔진 basic-pension 은 근처 감액·국민연금 연계 감액을 계산하지 않는다(ENGINE-ISSUES #24). 그래서 금액은 단독 소득인정액
 *   2,120,300원·부부 3,392,480원 이하이고 국민연금이 없는 예시에서만 쓰고, 그 밖에는 대상 여부(isEligible)만 쓴다. 파생값은 정수 산술.
 *   검색어 근거: scripts/keyword-data/terms.basic-pension.json (네이버 자동완성 2026-09-13)
 */
import { won, man } from '../render.mjs';

export default function article({ calculators, loadSpec, VERIFIED, derive = (v) => v }) {
  const spec = loadSpec('government/basic-pension');
  const C = spec.constants;
  const bp = (householdType, incomeAmount) => calculators['basic-pension']({ householdType, incomeAmount }, spec);
  const TH_S = C.INCOME_THRESHOLD_SINGLE;
  const TH_C = C.INCOME_THRESHOLD_COUPLE;
  const B = bp('single', 1e6).monthlyPension;                 // 계산기 상수 2026년 기준연금액 (감액 없는 단독)
  const COUPLE = bp('couple', 2e6).monthlyPension;            // 둘 다 받는 부부 합계
  const startS = derive(TH_S - B);                            // 이 소득인정액까지는 근처 감액이 없다 (단독, 국민연금 없음)
  const startC = derive(TH_C - COUPLE);                       // 둘 다 받는 부부

  // 근거 7: {(일반재산 − 기본재산액) + (금융재산 − 2,000만원) − 부채} × 4% ÷ 12 + P
  const BASE = { metro: 135000000, city: 85000000, rural: 72500000 };
  const FIN = 20000000;
  const conv = (rest) => derive((rest * 4) / 1200);          // 4% ÷ 12개월. 예시는 300 으로 나누어떨어지는 금액만 쓴다
  const REM_S = derive(TH_S * 300);                           // 다른 소득이 없을 때 공제하고 남은 재산 한도 (단독)
  const REM_C = derive(TH_C * 300);
  const eok = (n) => {
    const e = Math.floor(n / 1e8), r = n % 1e8;
    if (e) derive(e * 1e8);
    if (r) derive(r);
    return e ? `${e}억${r ? ` ${man(r)}` : ''}원` : `${man(r)}원`;
  };
  const REGIONS = [['대도시', BASE.metro], ['중소도시', BASE.city], ['농어촌', BASE.rural]]
    .map(([name, base]) => ({ name, base, single: derive(REM_S + base), couple: derive(REM_C + base) }));
  const FIN_S = derive(REM_S + FIN);
  const TH_S_2025 = 2280000;                                   // 근거 7 표 '’25년 228만 원'
  const remUp = derive((TH_S - TH_S_2025) * 300);              // 선정기준액 19만원 인상 → 남은 재산 한도 증가분

  // 대표 예시: 대도시 단독, 집 5억원 + 예금 3,000만원 (다른 소득·국민연금 없음)
  const HOUSE = 5e8, DEP = 3e7;
  const rest0 = derive(HOUSE - BASE.metro + (DEP - FIN));
  const ex = conv(rest0);
  const R = bp('single', ex);                                 // ex ≤ startS 라 엔진 금액을 그대로 쓸 수 있다
  if (!(ex <= startS && R.isEligible)) throw new Error('대표 예시가 근처 감액 구간에 들어갔다');
  const DEBT = 1.5e8;
  const exDebt = conv(derive(rest0 - DEBT));
  const per3k = conv(3e7);                                    // 빚 3,000만원당 줄어드는 월 소득인정액
  const DEPOSITS = [2e7, 5e7, 1.1e8, 3.2e8, FIN_S].map((v) => ({ v, rest: derive(v - FIN), m: conv(derive(v - FIN)), ok: bp('single', conv(derive(v - FIN))).isEligible }));
  // 부부 예시: 중소도시, 집 4억원 + 예금 5,000만원 (둘 다 65세 이상으로 둘 다 받고, 다른 소득·국민연금 없음)
  const cRest = derive(4e8 - BASE.city + (5e7 - FIN));
  const cx = conv(cRest);
  const RC = bp('couple', cx);
  if (!(cx <= startC && RC.isEligible)) throw new Error('부부 예시가 근처 감액 구간에 들어갔다');
  // 전세 예시: 대도시 단독, 집 없이 전세보증금 3억원 (다른 재산·소득·국민연금 없음)
  const JEONSE = 3e8;
  const exJ = conv(derive(JEONSE - BASE.metro));
  if (!(exJ <= startS && bp('single', exJ).isEligible)) throw new Error('전세 예시가 근처 감액 구간');
  const city1 = derive(1e8 - BASE.city), rural1 = derive(1e8 - BASE.rural);   // 1억원짜리 집에서 기본재산액을 넘는 부분
  const LUX = 4e7;
  if (bp('single', LUX).isEligible || bp('couple', LUX).isEligible) throw new Error('고급 자동차 예시가 엔진과 어긋난다');

  // 위젯 대조용 산식 (스펙 쪽). 상단: 남는 공제·부채 초과를 0 으로 자름. 하단: 그 음수를 고급 자산 가액·소득평가액까지 모두 상계
  const propCalc = (region, gen, fin, debt, lux, earn) => {
    let g = gen - BASE[region], f = fin - FIN;
    const a = [];
    if (g < 0) { a.push('base'); g = 0; }
    if (f < 0) { a.push('fin'); f = 0; }
    let s = g + f - debt;
    if (s < 0) { a.push('debt'); s = 0; }
    const up = (s * 4) / 1200 + lux + earn;
    const lo = Math.max(0, ((gen - BASE[region] + fin - FIN - debt) * 4) / 1200 + lux + earn);
    return { up, lo, assume: a };
  };
  const verdict = (type, r) => (bp(type, r.up).isEligible ? 'ok' : !bp(type, r.lo).isEligible ? 'out' : 'unknown');

  return {
    slug: 'basic-pension-property-guide', cat: 'government', catLabel: '정부지원금', crumb: '기초연금 재산기준',
    title: '기초연금 재산기준, 집과 예금이 얼마까지면 받나요',
    description: `기초연금 재산기준은 집값 한도 하나가 아니에요. 집에서 지역 기본재산액, 예금에서 2,000만원, 빚을 뺀 뒤 4%를 곱하고 12로 나눠 월 소득으로 봐요. 다른 소득이 없으면 이렇게 남은 재산이 단독 ${eok(REM_S)}까지 대상이에요.`,
    datePublished: '2026-10-30', verified: VERIFIED, basis: '2026년 기준', readMinutes: 6,
    badge: `기초연금법·시행령·보도자료 재산 산식 원문 대조 · ${VERIFIED}`,
    calc: { href: '/basic-pension/calculator/', label: '기초연금 계산기 바로가기' },
    hero: {
      tag: '정부지원금', line1: '기초연금 재산기준', line2: '집값 한도는?',
      sub1: '집·예금 공제 뒤 4%로 월 소득 환산',
      sub2: '전세보증금과 자동차도 재산이에요',
      foot: `기초연금법·시행령·보건복지부 보도자료 원문 대조 · ${VERIFIED} 검증`,
      card: { label: '공제하고 남은 재산 한도', big: eok(REM_S).replace(/원$/, ''), unit: '원 (단독)', l1: '다른 소득이 없을 때', l2: `부부는 ${eok(REM_C)}` },
      alt: `기초연금 재산기준. 다른 소득이 없으면 공제하고 남은 재산 단독 ${eok(REM_S)}까지 대상`,
    },
    intro: `기초연금 재산기준은 집값 한도 하나로 정해져 있지 않아요. 집과 예금에서 정해진 금액을 빼고 빚도 뺀 뒤, 4%를 곱하고 12개월로 나눠 월 소득으로 바꿔요. 다른 소득이 없으면 이렇게 남은 재산이 단독 ${eok(REM_S)}, 부부 ${eok(REM_C)}까지 대상이에요. 지역별 집값 한도, 전세보증금, 예금과 통장잔액, 빚, 자동차와 회원권을 차례로 정리했어요.`,
    answer: {
      label: '재산 상황을 골라 보세요 (2026년, 다른 소득이 없을 때)',
      quick: [
        { chip: '대도시 집만', selected: true, big: eok(REGIONS[0].single).replace(/원$/, ''), unit: '원까지는 대상 (단독)', sub: '집 가액을 매기는 방법은 보건복지부령에 따로 있어요' },
        { chip: '예금만', big: eok(FIN_S).replace(/원$/, ''), unit: '원까지는 대상 (단독)', sub: '2,000만원을 뺀 나머지를 환산해요' },
        { chip: '고급 자동차', big: '대상 아님', unit: '단독·부부 모두', sub: '자동차 가액이 그대로 월 소득인정액에 더해져요' },
      ],
      boxes: [
        { title: '집 가액 산정 방법은 따로 정해요', text: '재산가액을 매기는 방법은 보건복지부령에 맡겨져 있어 시세인지 공시가격인지 이 산식만으로는 알 수 없어요' },
        { title: '빚은 남은 재산에서 빼요', text: '공제하고 남은 재산에서 부채를 뺀 뒤 환산해요' },
      ],
    },
    keyPoints: {
      title: '한눈에 보는 기초연금 재산기준',
      rows: [
        ['선정기준액 (2026년 월 소득인정액 상한)', `단독 ${won(TH_S)}원, 부부 ${won(TH_C)}원`],
        ['기본재산액 (일반재산에서 빼는 금액)', `대도시 ${eok(BASE.metro)}, 중소도시 ${eok(BASE.city)}, 농어촌 ${eok(BASE.rural)}`],
        ['전세보증금 3억원 (대도시 단독, 집 없음)', `월 ${won(exJ)}원으로 환산`],
        ['예금 평가', '요구불예금은 3개월 이내 평균잔액, 저축성예금은 잔액이나 총 납입액'],
        ['빚 (남은 재산 이하일 때)', `3,000만원마다 월 소득인정액 ${won(per3k)}원 감소`],
        ['고급 자동차', '가액이 그대로 소득, 그것만으로 선정기준액 초과'],
        ['증여·처분한 재산', '2011년 7월 1일 이후 것도 재산으로 봐요'],
        ['감액 없이 받는 소득인정액 (국민연금 없음)', `단독 ${won(startS)}원, 둘 다 받는 부부 ${won(startC)}원까지`],
      ],
    },
    sections: [
      { id: 's1', h2: '기초연금 재산기준은 얼마인가요', sub: '집값 하나가 아니라 공제 뒤 환산하는 산식이에요', blocks: [
        { type: 'p', lead: true, ans: `다른 소득이 없으면 집과 예금에서 공제하고 빚까지 뺀 남은 재산이 단독 ${eok(REM_S)}, 부부 ${eok(REM_C)} 이하면 받아요.`, text: '재산기준은 집값 한도로 정해져 있지 않고 산식으로 정해요. 남은 재산에 소득 환산율 4%를 곱하고 12개월로 나눈 금액이 선정기준액과 같아지는 지점이에요.' },
        { type: 'note', title: '말 풀이', text: '선정기준액은 기초연금을 받는 월 소득인정액의 상한이에요. 소득인정액은 소득평가액에 재산의 소득환산액을 더한 금액이에요. 기본재산액은 주거유지 비용으로 빼 주는 금액이고, 가액은 그 재산의 값이에요. 소득 환산율은 재산을 소득으로 바꾸는 비율로 4%예요.' },
        { type: 'flow', label: '재산이 월 소득인정액이 되는 순서', steps: [
          { label: '일반재산', value: '기본재산액을 빼요', sub: '집·땅·전세보증금·자동차 등', op: '+' },
          { label: '금융재산', value: '공제 뒤 남는 금액', sub: '예금·적금·주식 등', op: '−' },
          { label: '부채', value: '채무액만큼', sub: '신용정보로 조회', op: '× 4% ÷ 12' },
          { label: '월 환산액', value: '월 금액', sub: '남은 재산을 소득으로', op: '+' },
          { label: '고급 자동차·회원권', value: '가액 전액', sub: '나누지 않고 그대로', op: '=' },
          { label: '재산의 소득환산액', value: '월 금액', sub: '소득평가액과 더해요' },
        ] },
        { type: 'p', ans: `대도시에 혼자 사는 분이 집 5억원과 예금 3,000만원만 있으면 재산의 소득환산액은 월 ${won(ex)}원이에요.`, text: `집에서 ${eok(BASE.metro)}, 예금에서 공제액을 빼면 ${eok(rest0)}이 남고, 여기에 4%를 곱하고 12로 나눈 금액이에요. 국민연금 같은 다른 소득이 없으면 대상이고, 계산기의 2026년 기준연금액 ${won(R.monthlyPension)}원을 감액 없이 받아요.` },
        { type: 'p', ans: '소득이 있으면 이 금액에 소득평가액을 더해요.', text: '근로소득은 116만원을 빼고 남은 금액의 70%만 소득인정액에 들어가요.', link: { href: '/basic-pension/earned-income/', label: '기초연금 근로소득기준' } },
      ] },

      { id: 's2', h2: '집과 예금이 얼마까지면 기초연금을 받나요', sub: '집만 있으면 남은 재산 한도에 지역 공제액을 더해요', blocks: [
        { type: 'p', lead: true, ans: `집만 있고 다른 소득이 없다면 대도시 단독가구는 집 가액 ${eok(REGIONS[0].single)}까지는 대상이에요.`, text: '집 가액을 매기는 방법은 보건복지부령에 맡겨져 있어요. 대도시·중소도시·농어촌을 가르는 기준과 함께 정부 안내에는 나와 있지 않아요.' },
        { type: 'table', net: 2, caption: '집만 있고 다른 소득과 재산이 없을 때 대상이 되는 집 가액 (2026년)', headers: ['지역', '기본재산액', '단독가구', '부부가구'],
          rows: REGIONS.map((r, i) => ({ hi: i === 0, cells: [r.name, eok(r.base), eok(r.single), eok(r.couple)] })),
          fn: '남은 재산 한도에 지역 기본재산액을 더한 값이에요. 쓰지 않은 예금 공제를 집에서 더 빼 준다면 한도는 오르기만 하니, 표 금액 안이면 그 처리와 상관없이 대상이에요.' },
        { type: 'p', ans: `2026년 선정기준액이 단독 19만원 올라 남은 재산 한도도 ${eok(remUp)} 늘었어요.`, text: '선정기준액이 1원 오를 때마다 남은 재산 한도는 300원씩 늘어요.' },
        { type: 'p', ans: '전세나 월세 보증금도 일반재산이에요.', text: `주택이나 상가를 빌리며 낸 임차보증금은 전세금을 포함해 집과 같은 칸에 들어가요. 대도시에서 집 없이 전세보증금 3억원만 있는 단독가구라면 월 ${won(exJ)}원으로 환산해요.` },
        { type: 'p', ans: '자녀에게 넘기거나 팔아 버린 재산도 재산으로 봐요.', text: '2011년 7월 1일 이후 다른 사람에게 증여하거나 처분한 재산이 대상이에요. 판 돈으로 다른 재산을 사거나 빚을 갚거나 의료비를 내는 등 본인과 배우자를 위해 쓴 사실이 입증되면 빼요.' },
        { type: 'p', ans: '1억원짜리 집 하나뿐이면 대도시에서는 지역 공제액보다 적어 집 때문에 늘어나는 소득인정액이 없어요.', text: `중소도시는 ${eok(city1)}, 농어촌은 ${eok(rural1)}만 공제액을 넘어서 그만큼만 환산해요.` },
        { type: 'p', ans: '부부는 두 사람 재산을 합쳐 한 번 계산해요.', text: `중소도시에 사는 부부가 집 4억원과 예금 5,000만원을 가졌다면 재산의 소득환산액은 월 ${won(cx)}원이에요. 두 사람 모두 65세 이상으로 둘 다 받고 국민연금 같은 다른 소득이 없으면, 둘이 합쳐 ${won(RC.monthlyPension)}원을 받아요.` },
        { type: 'p', ans: '대상이어도 선정기준액에 가까우면 기초연금이 줄 수 있어요.', text: `국민연금이 없을 때 단독은 소득인정액 ${won(startS)}원, 둘 다 받는 부부는 ${won(startC)}원을 넘으면 감액될 수 있어요. 얼마로 줄어드는지는 부부감액 편에서 금액 예시로 이어 봐요.`, link: { href: '/basic-pension/couple/', label: '기초연금 부부감액' } },
        { type: 'widget', label: '내 재산으로 대상 여부 보기', title: '재산과 소득을 넣어 소득인정액 보기', note: '보도자료 산식으로 계산해요. 집·땅이 기본재산액보다 적거나, 예금이 공제액보다 적거나, 빚이 남은 재산보다 크면 남는 금액을 어떻게 처리하는지 정해져 있지 않아요. 그때는 0으로 자른 값과 남는 금액을 고급 자산과 소득까지 모두 상계한 값 사이의 범위로 보여 주고, 범위가 기준에 걸치면 판정하지 않아요.',
          inputs: [
            { id: 'ph', label: '가구 유형', type: 'select', value: 'single', options: [['single', '단독가구'], ['couple', '부부가구']] },
            { id: 'pr', label: '사는 곳 (대도시·중소도시·농어촌)', type: 'select', value: 'metro', options: [['metro', '대도시'], ['city', '중소도시'], ['rural', '농어촌']] },
            { id: 'pg', label: '집·땅·보증금·자동차 같은 일반재산 가액 (만원)', type: 'number', value: 50000, min: 0, max: 500000, step: 1000 },
            { id: 'pf', label: '예금 같은 금융재산 (만원)', type: 'number', value: 3000, min: 0, max: 200000, step: 100 },
            { id: 'pd', label: '부채 (만원)', type: 'number', value: 0, min: 0, max: 500000, step: 1000 },
            { id: 'pl', label: '고급 자동차·고급 회원권 가액 (만원)', type: 'number', value: 0, min: 0, max: 100000, step: 10 },
            { id: 'pe', label: '월 소득평가액 (만원)', type: 'number', value: 0, min: 0, max: 1000, step: 1 },
          ],
          outputs: [{ id: 'pok', label: '2026년 판정' }, { id: 'pinc', label: '소득인정액 (월)' }, { id: 'pas', label: '처리가 정해지지 않아 범위로 본 부분' }],
          port: `
  var TH={single:${TH_S},couple:${TH_C}}, BASE={metro:${BASE.metro},city:${BASE.city},rural:${BASE.rural}}, FIN=${FIN};
  var ASSUME={base:'기본재산액보다 적은 일반재산',fin:'공제액보다 적은 예금',debt:'남은 재산보다 큰 빚'};
  function propCalc(region,gen,fin,debt,lux,earn){ var g=gen-BASE[region], f=fin-FIN, a=[]; if(g<0){a.push('base');g=0;} if(f<0){a.push('fin');f=0;} var s=g+f-debt; if(s<0){a.push('debt');s=0;}
    var up=s*4/1200+lux+earn; var lo=(gen-BASE[region]+fin-FIN-debt)*4/1200+lux+earn; if(lo<0)lo=0; return {up:up, lo:lo, assume:a}; }
  function verdict(type,r){ if(r.up<=TH[type]) return 'ok'; if(r.lo>TH[type]) return 'out'; return 'unknown'; }`,
          js: `
  function prender(){ var v=function(id){return (+document.getElementById(id).value||0)*1e4}; var t=document.getElementById('ph').value, r=propCalc(document.getElementById('pr').value,v('pg'),v('pf'),v('pd'),v('pl'),v('pe')), d=verdict(t,r);
    document.getElementById('pok').textContent=d==='ok'?'대상이에요':d==='out'?'대상이 아니에요':'판정 못 해요';
    document.getElementById('pinc').textContent=Math.floor(r.lo)===Math.floor(r.up)?won(Math.floor(r.up))+'원':won(Math.floor(r.lo))+'원부터 '+won(Math.floor(r.up))+'원 사이';
    document.getElementById('pas').textContent=r.assume.length?r.assume.map(function(k){return ASSUME[k]}).join(', ')+'. 남는 금액을 고급 자산과 소득에서 빼는지 정해져 있지 않아요':'없음'; }
  ['ph','pr','pg','pf','pd','pl','pe'].forEach(function(id){var el=document.getElementById(id); el.addEventListener('input',prender); el.addEventListener('change',prender);}); prender();`,
          check: (port) => {
            let n = 0, bad = 0;
            for (const t of ['single', 'couple']) for (const region of ['metro', 'city', 'rural'])
              for (let gen = 0; gen <= 1.5e9; gen += 5e7) for (const fin of [0, 1e7, 3e7, 2e8, 7.61e8, 8e8]) for (const debt of [0, 1e8, 2e9]) for (const lux of [0, 2.8e6, 4e7]) for (const earn of [0, 5e5]) {
                n++;
                const w = port.propCalc(region, gen, fin, debt, lux, earn);
                const s = propCalc(region, gen, fin, debt, lux, earn);
                if (w.up !== s.up || w.lo !== s.lo || w.assume.join() !== s.assume.join() || port.verdict(t, w) !== verdict(t, s)) bad++;
              }
            return { n, bad };
          },
        },
      ] },

      { id: 's3', h2: '예금과 통장잔액도 재산으로 보나요', sub: '2,000만원을 넘는 금융재산만 환산해요', blocks: [
        { type: 'p', lead: true, ans: '봐요. 예금은 금융재산이라 공제 뒤 남는 부분을 환산해 월 소득인정액에 더해요.', text: '보통예금 같은 요구불예금은 3개월 이내 평균잔액, 정기예금이나 적금 같은 저축성예금은 잔액이나 총 납입액으로 봐요. 주식은 최종 시세가액이에요. 배우자 이름의 예금도 합쳐요.' },
        { type: 'table', net: 2, caption: '예금만 있을 때 월 소득환산액과 대상 여부 (단독가구, 다른 소득 없음)', headers: ['예금', '공제하고 남은 금액', '월 소득환산액', '대상 여부'],
          rows: DEPOSITS.map((d) => ({ hi: d.v === 5e7, cells: [eok(d.v), d.rest ? eok(d.rest) : '0원', `${won(d.m)}원`, d.ok ? (d.m === TH_S ? '대상 (선정기준액과 같음)' : '대상') : '대상 아님'] })),
          fn: '다른 소득과 일반재산이 없는 단독가구예요. 부부는 선정기준액이 커서 같은 예금이면 모두 대상이에요.' },
        { type: 'p', ans: '집이 없을 때 남는 기본재산액을 예금에서 더 빼 주는지는 정부 안내에 없어요.', text: '그래서 이 표는 금융재산 공제만 뺀 금액이에요. 더 빼 준다면 결과는 낮아지기만 하니, 이 표 금액 안이면 그 처리와 상관없이 대상이에요.' },
        { type: 'steps', items: [
          { title: '동의 서면 제출', text: '신청할 때 본인과 배우자가 금융정보, 신용정보, 보험정보를 넘기는 데 동의하는 서면을 내요', meta: '신청할 때' },
          { title: '금융회사에 요청', text: '정부가 동의 서면을 근거로 금융회사에 그 정보를 직접 요청해요', meta: '조사' },
          { title: '금융회사 제공', text: '요청받은 금융회사는 그 명의인의 정보를 내야 해요', meta: '제공 의무' },
          { title: '조사 뒤 결정', text: '시·군·구청장이 조사를 마친 뒤 수급권을 결정해요', meta: '결정' },
        ] },
        { type: 'p', ans: '신청 직전에 통장에서 돈을 빼도 요구불예금은 3개월 평균으로 잡혀요.', text: '그래서 통장잔액 하루치만 보고 대상인지 판단하면 조사 결과와 다를 수 있어요.' },
      ] },

      { id: 's4', h2: '빚이 있으면 재산에서 빼 주나요', sub: '공제하고 남은 재산에서 부채를 빼요', blocks: [
        { type: 'p', lead: true, ans: '빼 줘요. 일반재산과 금융재산에서 공제한 뒤 남은 재산에서 부채를 한 번 더 빼고 환산해요.', text: '신청할 때 신용정보를 넘기는 데에도 동의해요. 정부가 받는 신용정보는 대출 현황과 연체 내용, 신용카드 미결제금액이에요. 배우자의 신용정보도 같은 동의서로 함께 받아요.' },
        { type: 'p', ans: `집 5억원과 예금 3,000만원이 있는 대도시 단독가구에 빚이 1억 5,000만원이면 월 소득환산액은 ${won(exDebt)}원이에요.`, text: `빚이 없을 때보다 ${won(derive(ex - exDebt))}원 낮아요. 빚이 3,000만원 늘 때마다 월 소득인정액이 ${won(per3k)}원씩 줄어드는 셈이에요.` },
        { type: 'p', ans: '빚이 공제하고 남은 재산보다 크면 남는 빚을 어떻게 처리하는지는 정해져 있지 않아요.', text: '이 글의 계산기는 그때 결과를 범위로 보여 주고, 범위가 기준에 걸치면 판정하지 않아요.' },
      ] },

      { id: 's5', h2: '자동차와 골프 회원권은 어떻게 계산하나요', sub: '고급 자동차와 고급 회원권은 4%로 나누지 않아요', blocks: [
        { type: 'p', lead: true, ans: '4,000만원 이상 고급 자동차와 골프·승마·콘도 같은 고급 회원권은 가액 전액을 월 소득인정액에 더해요.', text: '4%를 곱하고 12로 나누지 않아요. 그래서 고급 자동차는 그 가액만으로 단독과 부부 선정기준액을 모두 넘어요.' },
        { type: 'table', text: true, caption: '자동차와 회원권, 그 밖의 일반재산이 들어가는 방식 (2026년)', headers: ['재산', '구분', '들어가는 방식'], rows: [
          { hi: true, cells: ['고급 자동차', '4,000만원 이상', '4%로 나누지 않고 더해요'] },
          { cells: ['고급 회원권', '골프·승마·콘도 등. 그 밖에 어떤 회원권이 고급인지는 정해져 있지 않아요', '4%로 나누지 않고 더해요'] },
          { cells: ['고급이 아닌 자동차', '일반재산', '집과 같은 칸에서 4%로 환산해요'] },
          { cells: ['선박·항공기·조합원입주권·분양권', '일반재산', '같은 방식으로 환산해요'] },
          { cells: ['등록 장애인의 자동차 등', '고시 기준에 맞으면 제외', '재산에서 빠져요'] },
        ] },
        { type: 'p', ans: '고급 회원권은 가액이 선정기준액보다 크면 그것만으로 대상이 아니에요.', text: `가액이 단독 ${won(TH_S)}원, 부부 ${won(TH_C)}원 이하인 회원권이면 다른 재산과 소득을 더해 따져요.` },
        { type: 'p', ans: '자동차 가액을 어떻게 매기는지는 보건복지부령에 맡겨져 있어요.', text: '상이등급을 받은 국가유공자의 차나 비과세 차량도 고시 기준에 맞으면 재산에서 빠져요. 그 고시 기준은 정부 안내에 없어요.' },
      ] },
    ],
    faqFixed: 2,
    faq: [
      ['주택 공시가격이 오르면 선정기준액도 바뀌나요?', '바뀔 수 있어요. 선정기준액은 노인가구의 소득과 재산 수준, 생활실태, 주택 공시가격, 물가상승률을 고려해 매년 조정해요. 새 기준은 매년 12월 말에 확정해요.'],
      ['선정기준액은 해마다 얼마나 올랐나요?', '단독가구 기준 2021년 169만원, 2023년 202만원, 2025년 228만원, 2026년 247만원이에요. 작년에 재산 때문에 넘었던 분도 올해는 대상이 될 수 있어요.'],
    ],
    summary: [
      '집 가액을 매기는 방법이 따로 있으니 경계에 가까우면 신청해서 조사 결과로 판단받으세요.',
      `다른 소득이 없다면 예금만으로는 ${eok(FIN_S)} 안쪽까지 공제 처리와 상관없이 대상이에요.`,
      '전세보증금과 증여한 재산도 재산이니 집이 없다고 재산이 없다고 여기지 마세요.',
      '고급 자동차는 그것만으로 탈락이고, 회원권은 가액이 선정기준액보다 크면 탈락이에요.',
    ],
    sources: [
      ['법령', '기초연금법 제2조제4호(소득인정액은 본인과 배우자의 소득평가액과 재산의 소득환산액 합산), 제3조제1항(선정기준액 이하 지급), 제8조제2항(선정기준액 근처 감액), 제10조제2항(금융정보·신용정보·보험정보 제공 동의), 제11조제2항(자료 요청), 제12조(금융정보등의 제공), 제13조제1항(조사 후 결정). 같은 법 시행령 제3조(재산의 범위, 증여·처분 재산, 재산가액 산정은 보건복지부령), 제14조(금융정보·신용정보의 범위).'],
      ['정부 안내', `보건복지부 보도자료 「2026년 노인 단독가구, 소득인정액 월 247만 원 이하면 기초연금 받는다」(2025.12.31 배포, 대한민국 정책브리핑) 붙임1 소득인정액 산식, 기본재산액, 금융재산 2,000만원 공제, 고급 자동차·회원권. 선정기준액과 2026년 기준연금액 ${won(B)}원, 부부 합계 ${won(COUPLE)}원은 기초연금 계산기 상수예요 (${VERIFIED} 기준).`],
    ],
    claims: [
      { src: 7, quote: '(일반재산 – 기본재산액 공제*) +', note: '일반재산에서 기본재산액 공제' },
      { src: 7, quote: '(금융재산 – 2,000만원 공제) - 부채}', note: '금융재산 2,000만원 공제, 부채 차감' },
      { src: 7, quote: '× 소득 환산율(4%) ÷ 12개월 + P**', note: '4% ÷ 12, 고급 자산 P 는 그대로 더함' },
      { src: 7, quote: '주거유지 비용 공제(대도시 1억 3,500만원, 중소도시 8,500만원, 농어촌 7,250만원)', note: '지역별 기본재산액' },
      { src: 7, quote: '고급 회원권(골프, 승마, 콘도 등) 및 고급 자동차(4,000만원 이상)는 가액 전액을 소득 반영', note: 'P값 (자동차만 4,000만원 기준)' },
      { src: 7, quote: '소득인정액이 단독가구 월 247만원, 부부가구 월 395.2만 원 이하인 경우 수급 가능합니다', note: '2026년 선정기준액' },
      { src: 7, quote: '노인가구의 소득재산 수준과 생활실태, 주택 공시가격, 물가상승률 등을 고려하여 매년 조정', note: 'FAQ 공시가격' },
      { src: 7, quote: '기초연금 연도별 선정기준액', note: 'FAQ 연도별 선정기준액 표 (2021~2026)' },
      { src: 6, quote: '“소득인정액”이란 본인 및 배우자의 소득평가액과 재산의 소득환산액을 합산한 금액을 말한다', note: '소득인정액 정의 (제2조4)' },
      { src: 6, quote: '기초연금은 65세 이상인 사람으로서 소득인정액이 보건복지부장관이 정하여 고시하는 금액', note: '선정기준액 이하 지급 (제3조①)' },
      { src: 6, quote: '본인과 그 배우자가 모두 기초연금 수급권자인 경우에는 각각의 기초연금액에서 기초연금액의 100분의 20에 해당하는 금액을 감액한다', note: '부부 합계는 둘 다 받을 때 (제8조①)' },
      { src: 6, quote: '선정기준액을 초과하는 금액의 범위에서 기초연금액의 일부를 감액할 수 있다', note: '근처 감액 (제8조②)' },
      { src: 6, quote: '기초연금 수급희망자와 그 배우자는 제1항에 따른 신청을 할 때', note: '본인과 배우자 동의 서면 (제10조②)' },
      { src: 6, quote: '기초연금 수급희망자와 그 배우자의 금융정보ㆍ신용정보 또는 보험정보(이하 “금융정보등”이라 한다)를 제공하도록 요청할 수 있다', note: '금융회사에 요청 (제12조①)' },
      { src: 6, quote: '해당 명의인의 금융정보등을 제공하여야 한다', note: '금융회사 제공 의무 (제12조③)' },
      { src: 6, quote: '제11조에 따른 조사를 한 후 기초연금 수급권의 발생ㆍ변경ㆍ상실 등을 결정한다', note: '조사 후 결정 (제13조①)' },
      { src: 8, quote: '마. 「지방세법」 제104조제1호부터 제3호까지의 규정에 따른 토지, 건축물 및 주택', note: '일반재산 토지·건축물·주택 (시행령 제3조①1마)' },
      { src: 8, quote: '바. 주택ㆍ상가ㆍ건물 등에 대한 임차보증금(전세금을 포함한다)', note: '임차보증금 (시행령 제3조①1바)' },
      { src: 8, quote: '자. 「지방세법」 제124조에 따른 자동차', note: '자동차 (시행령 제3조①1자)' },
      { src: 8, quote: '「장애인복지법」에 따라 등록한 장애인이 소유한 자동차', note: '장애인 자동차 (시행령 제3조①1자 단서)' },
      { src: 8, quote: '보건복지부장관이 정하여 고시하는 기준에 해당하는 자동차는 제외한다', note: '고시 기준 제외 (시행령 제3조①1자 단서)' },
      { src: 8, quote: '아. 「지방세법」 제104조제4호 및 제5호에 따른 항공기 및 선박', note: '선박·항공기 (시행령 제3조①1아)' },
      { src: 8, quote: '라. 「소득세법」 제89조제2항에 따른 조합원입주권', note: '조합원입주권 (시행령 제3조①1라)' },
      { src: 8, quote: '사. 건물이 완성되는 때에 그 건물과 이에 부수되는 토지를 취득할 수 있는 권리', note: '분양권 (시행령 제3조①1사)' },
      { src: 8, quote: '다. 「지방세법」 제6조제14호부터 제18호까지의 규정에 따른 회원권', note: '회원권 (시행령 제3조①1다)' },
      { src: 8, quote: '2011년 7월 1일 이후 다른 사람에게 증여한 재산 또는 처분한 재산', note: '증여·처분 재산 (시행령 제3조①3)' },
      { src: 8, quote: '본인 및 배우자를 위하여 소비한 사실이 입증된 경우는 제외한다', note: '소비 입증 시 제외 (시행령 제3조①3)' },
      { src: 8, quote: '제1항에 따른 재산가액의 산정방법은 보건복지부령으로 정한다', note: '가액 산정 방법 (시행령 제3조②)' },
      { src: 8, quote: '가. 보통예금, 저축예금, 자유저축예금 등 요구불예금: 3개월 이내의 평균잔액', note: '요구불예금 3개월 평균 (시행령 제14조①1가)' },
      { src: 8, quote: '나. 정기예금, 정기적금, 정기저축 등 저축성예금: 잔액 또는 총 납입액', note: '저축성예금 (시행령 제14조①1나)' },
      { src: 8, quote: '다. 주식, 수익증권, 출자금, 출자지분: 최종 시세가액', note: '주식 (시행령 제14조①1다)' },
      { src: 8, quote: '가. 대출 현황 및 연체 내용', note: '신용정보 (시행령 제14조①2가)' },
      { src: 8, quote: '나. 신용카드 미결제금액', note: '신용정보 (시행령 제14조①2나)' },
    ],
    related: [
      { kind: '주제 홈', label: '기초연금 무엇이 궁금하세요', href: '/basic-pension/' },
      { kind: '다음 질문', label: '기초연금 근로소득기준', href: '/basic-pension/earned-income/' },
      { kind: '다음 질문', label: '기초연금 부부감액', href: '/basic-pension/couple/' },
    ],
  };
}
