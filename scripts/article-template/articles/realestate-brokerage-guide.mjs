/**
 * 글 스펙: 부동산 중개수수료 (부동산, 중개수수료 계산기의 첫 가이드 글)
 *   주택 금액은 전부 엔진(brokerage-fee, vatIncluded:false)이 만든다. 엔진 요율표 12행은 시행규칙 별표 1(근거 4)과 같다.
 *   엔진은 주택만 계산한다. 오피스텔(별표 2, 근거 5)과 그 밖의 물건(시행규칙 제20조④2, 근거 3) 금액은 법정 요율 × 거래금액의 derive 다.
 *   금액은 "별표 1 상한요율로 계산한 바깥 한도"다. 주택의 실제 한도는 그 안에서 시·도 조례가 정하는데 조례는 근거에 없다.
 *   부가가치세가 한도 안인지 밖인지는 근거에 없다. 금액에 "제외"라는 말을 붙이지 않고, 계산기 선택 항목이라는 안내 한 번만 둔다.
 *
 *   계산기 가이드(JSON guide)에도 있는 것 (제목의 답이라 뺄 수 없어 다시 싣는다): 12개 구간의 요율과 한도액 자체,
 *   매매 1억 6,000만원부터 80만원이라는 사실, 월세 100배·70배 규칙, 오피스텔 0.5%·0.4%와 그 밖 0.9%, 조례 한 줄, 부가가치세 선택 항목.
 *   계산기 가이드에 없는 것:
 *     1절 구간마다 상한이 움직이는 범위(구간 첫 금액의 상한 ~ 끝 직전의 상한)와 다음 구간으로 넘어갈 때 이어지는지·얼마 뛰는지 6줄, 교환 예시
 *        (가이드는 구간당 예시 1개와 매매 9·12·15억의 1,000만원 아래 값뿐이다)
 *     2절 전세·월세와 매매 요율을 거래금액 한 격자 8줄에 놓은 표, 임대차 상한 범위 (가이드는 3억 한 점, 5.9억·6억 한 쌍)
 *     3절 월세 계약 6건 환산표, 한도액 30만원에 묶이는 월세 범위, 보증금 없는 월세가 조문에 없다는 사실
 *     4절 오피스텔 요건 판정, 주택 대 오피스텔이 높고·같고·낮은 금액대 전체, 상가·토지 금액, 사무소 요율표, 섞인 건물, 원룸
 *     5절 지급시기 조문 그대로, 금액을 미리 볼 수 있는 네 자리, 협의 예시 둘, 양쪽 각각, 조례 구조, 계약이 깨졌을 때
 *     6절 조례 한도와 실비 기준의 처벌, 처분 넷, 신고센터 절차 4단계와 종결 사유 넷, 실비 청구 상대
 *   쓰지 않은 것(근거 없음): 시·도별 조례 요율, 부가가치세를 누가 내는지와 한도 안팎, 카드·현금영수증, 지원 제도, 전세 재계약 복비,
 *   의뢰인 사정으로 계약이 깨졌을 때, 더 낸 돈을 돌려받는 방법, 신고센터 주소, 임대차의 거래대금 지급 완료일 풀이, 약정의 형식.
 */
import { createRequire } from 'node:module';
import { won } from '../render.mjs';

// 위젯 대조와 일반화 문장 검산은 감싸지 않은 엔진으로 돈다. build.mjs 가 넘기는 calculators 는 부른 값을 전부
// 사실 대조 허용 목록에 넣는다. 격자 수천 건이 거기 섞이면 본문 숫자 검사가 느슨해진다.
const RAW = createRequire(import.meta.url)('../../../lib/calc/engine.js').calculators['brokerage-fee'];

export default function article({ calculators, loadSpec, VERIFIED, derive = (v) => v }) {
  const D = loadSpec('realestate/brokerage-fee');
  const SALE = D.tables.saleRates.brackets, RENT = D.tables.rentRates.brackets;
  const bf = (input) => calculators['brokerage-fee']({ price: 0, monthlyRent: 0, deposit: 0, vatIncluded: false, ...input }, D);
  const sale = (price) => bf({ type: 'sale', price });
  const jeonse = (price) => bf({ type: 'rent_jeonse', price });
  const monthly = (deposit, monthlyRent) => bf({ type: 'rent_monthly', deposit, monthlyRent });
  const raw = (type, price, deposit = 0, monthlyRent = 0) => RAW({ type, price, deposit, monthlyRent, vatIncluded: false }, D);
  const pct = (r) => `${+(r * 100).toFixed(1)}%`;
  // 금액 표기: 1억 6,000만 (억과 만을 따로 적는다. 나눈 두 조각은 같은 금액의 몫과 나머지다)
  const kw = (n) => {
    const eok = Math.floor(n / 1e8), rest = n % 1e8;
    if (!eok) return `${(n / 1e4).toLocaleString('ko-KR')}만`;
    if (!rest) return `${eok}억`;
    derive(eok * 1e8); derive(rest);
    return `${eok}억 ${(rest / 1e4).toLocaleString('ko-KR')}만`;
  };

  // 주택 외 요율은 엔진에 없다. 근거 5(별표 2) 1천분의 5·1천분의 4, 근거 3(제20조④2) 1천분의 9.
  const OFFI_SALE = [5, 1000], OFFI_RENT = [4, 1000], ETC = [9, 1000];
  const by = (amount, [n, d]) => derive(amount * n / d);
  const ratio = ([n, d]) => pct(n / d);

  // 대표 예시
  const J4 = jeonse(4e8);                  // 전세 4억 → 0.3% 120만
  const M = monthly(1e7, 6e5);             // 보증금 1,000만 + 월세 60만 → 환산 7,000만, 0.4% 28만
  const S6 = sale(6e8);                    // 매매 6억 → 0.4% 240만
  const J5 = jeonse(5e8);                  // 전세 5억 → 150만 (양쪽 각각 · 협의 예시)
  const S7 = sale(7e8);                    // 교환 예시: 7억과 5억을 바꾸면 7억 → 280만
  const S8 = sale(8e8);                    // FAQ: 매매 8억 → 320만

  // 한도액에 걸려 상한이 멈추기 시작하는 금액 (한도액 ÷ 요율, 만원 올림)
  const capFrom = (b) => derive(Math.ceil(Math.round(b.limit / b.rate) / 1e4) * 1e4);
  const SC1 = capFrom(SALE[0]), SC2 = capFrom(SALE[1]);   // 4,167만 · 1억 6,000만
  const RC1 = capFrom(RENT[0]), RC2 = capFrom(RENT[1]);   // 4,000만 · 7,500만

  // 구간(또는 격자 칸) [lo, hi) 에서 상한이 움직이는 범위. 첫 금액의 상한은 엔진, 끝 직전의 상한은 끝 금액 × 요율(한도액이 있으면 작은 쪽).
  const band = (type, B, lo, hi) => {
    const b = B.find((x) => x.upperBound === null || lo < x.upperBound);
    const call = type === 'sale' ? sale : jeonse;
    const start = lo ? call(lo).fee : null;
    const sup = hi ? derive(Math.min(Math.round(hi * b.rate), b.limit ?? Infinity)) : null;
    const next = hi ? call(hi).fee : null;
    return { b, start, sup, jump: hi ? derive(next - sup) : null };
  };
  const rangeText = (x, lo, hi, capAt, unitWord) => {
    if (!lo) return `${unitWord} × ${pct(x.b.rate)}. 약 ${kw(capAt)}원부터는 ${won(x.b.limit)}원`;
    if (x.b.limit && hi === x.b.upperBound) return `${won(x.start)}원에서 시작해 ${kw(capAt)}원부터는 ${won(x.b.limit)}원`;
    if (!hi) return `${won(x.start)}원부터`;
    return `${won(x.start)}원부터 ${won(x.sup)}원 미만`;
  };
  const bandLabel = (lo, hi) => (!lo ? `${kw(hi)}원 미만` : !hi ? `${kw(lo)}원 이상` : `${kw(lo)}원 이상 ${kw(hi)}원 미만`);

  // 1절: 매매 6구간
  const SALE_ROWS = SALE.map((b, i) => {
    const lo = i ? SALE[i - 1].upperBound : 0, hi = b.upperBound;
    const x = band('sale', SALE, lo, hi);
    return { lo, hi, x, text: rangeText(x, lo, hi, i === 0 ? SC1 : SC2, '매매가') };
  });
  // 2절: 매매와 임대차 경계를 합친 격자 8칸
  const GRID = [...new Set([...SALE, ...RENT].map((b) => b.upperBound).filter(Boolean))].sort((a, b) => a - b);
  const RENT_ROWS = [0, ...GRID].map((lo, i) => {
    const hi = GRID[i] ?? null;
    const x = band('rent_jeonse', RENT, lo, hi);
    const s = SALE.find((b) => b.upperBound === null || lo < b.upperBound);
    return { lo, hi, x, s, text: rangeText(x, lo, hi, i === 0 ? RC1 : RC2, '보증금').replace('약 ', '') };
  });

  // 월세 계약 6건
  const RENTS = [[5e6, 4e5], [1e7, 3.9e5], [1e7, 4e5], [2e7, 7e5], [3e7, 8e5], [5e7, 1e6]].map(([dep, rent]) => {
    const r = monthly(dep, rent), hundred = derive(dep + rent * 100);
    return { dep, rent, r, hundred, seventy: r.amount !== hundred };
  });
  // 한도액 30만원에 묶이는 월세 범위 (보증금 1,000만원일 때)
  const FLAT_LO = derive((RC2 - 1e7) / 100), FLAT_HI = derive((RENT[1].upperBound - 1e7) / 100);   // 65만 · 90만
  // 같은 집의 두 조건 (가정): 전세 3억 5,000만 또는 보증금 5,000만에 월세 100만
  const J35 = jeonse(3.5e8), MW = RENTS[5].r;

  // 본문의 일반화 문장을 엔진으로 지킨다
  {
    const W = 1e4, fail = (m) => { throw new Error(`realestate-brokerage-guide: ${m}`); };
    // ① 한도액 구간: 시작 금액부터 구간 끝까지 상한이 한도액, 바로 아래는 한도액 미만
    for (const [type, b, from] of [['sale', SALE[0], SC1], ['sale', SALE[1], SC2], ['rent_jeonse', RENT[0], RC1], ['rent_jeonse', RENT[1], RC2]]) {
      if (raw(type, from).fee !== b.limit || raw(type, from - W).fee >= b.limit || raw(type, b.upperBound - W).fee !== b.limit) fail('한도액 구간 문장이 엔진과 어긋난다');
    }
    // ② 표의 "이어져요 / 뛰어요": 요율이 내려가거나 그대로인 경계는 0, 오르는 경계는 경계 금액 × 요율 차이
    SALE_ROWS.forEach(({ hi, x }, i) => { if (hi && (x.jump > 0) !== (SALE[i + 1].rate > SALE[i].rate)) fail('매매 경계 문장이 엔진과 어긋난다'); });
    RENT_ROWS.forEach(({ hi, x }) => { if (hi && x.jump < 0) fail('임대차 경계가 내려간다'); });
    const checkRange = (type, rows) => rows.forEach(({ lo, hi, x }) => {
      if (!lo || !hi || x.b.limit) return;
      for (let a = lo; a < hi; a += 1e6) { const f = raw(type, a).fee; if (f < x.start || f >= x.sup) fail(`범위 문장이 엔진과 어긋난다 (${type} ${a})`); }
    });
    checkRange('sale', SALE_ROWS); checkRange('rent_jeonse', RENT_ROWS);
    // 격자 요율: 임대차 요율은 매매 요율보다 낮거나 같고, 같은 칸은 하나(굵은 줄)다
    if (RENT_ROWS.some((r) => r.x.b.rate > r.s.rate) || RENT_ROWS.filter((r) => r.x.b.rate === r.s.rate).length !== 1) fail('격자 요율 문장이 엔진과 어긋난다');
    if ([2, 3, 4].map((i) => SALE_ROWS[i].hi).join() !== '900000000,1200000000,1500000000' || [3, 5, 6].map((i) => RENT_ROWS[i].hi).join() !== '600000000,1200000000,1500000000') fail('핵심콕콕의 경계 금액이 표와 다르다');
    // ③ 금액대가 같으면 임대차 상한은 매매보다 낮거나 같다
    for (let a = 1e7; a <= 30e8; a += 5e6) if (raw('rent_jeonse', a).fee > raw('sale', a).fee) fail(`전세 대 매매 문장이 엔진과 어긋난다 (${a})`);
    // ④ 환산 거래금액 7,500만 ~ 1억은 상한이 한도액으로 같다 (보증금 1,000만원, 월세 65만 ~ 90만)
    for (let r = FLAT_LO; r <= FLAT_HI; r += W) if (raw('rent_monthly', 0, 1e7, r).fee !== RENT[1].limit) fail('월세 한도액 범위 문장이 엔진과 어긋난다');
    if (raw('rent_monthly', 0, 1e7, FLAT_LO - W).fee >= RENT[1].limit || raw('rent_monthly', 0, 1e7, FLAT_HI + W).fee <= RENT[1].limit) fail('월세 한도액 범위의 끝이 엔진과 어긋난다');
    // ⑤ 월세 표: 둘째 줄만 70배, 첫째 줄도 70배
    if (JSON.stringify(RENTS.map((x) => x.seventy)) !== JSON.stringify([true, true, false, false, false, false])) fail('월세 표의 배수가 설명과 다르다');
    // ⑥ 주택 대 오피스텔: 높고 · 같고 · 낮은 금액대
    for (let a = 1e7; a <= 30e8; a += 1e6) {
      const hs = raw('sale', a).fee, os = a * OFFI_SALE[0] / OFFI_SALE[1];
      const wantS = a > SC2 && a < SALE[2].upperBound ? 1 : (a < SALE[0].upperBound || a >= SALE[3].upperBound) ? -1 : 0;
      if (Math.sign(os - hs) !== wantS) fail(`오피스텔 대 주택 매매 문장이 엔진과 어긋난다 (${a})`);
      const hr = raw('rent_jeonse', a).fee, or = a * OFFI_RENT[0] / OFFI_RENT[1];
      const wantR = a > RC2 && a < RENT[2].upperBound ? 1 : (a < RENT[0].upperBound || a >= RENT[3].upperBound) ? -1 : 0;
      if (Math.sign(or - hr) !== wantR) fail(`오피스텔 대 주택 임대차 문장이 엔진과 어긋난다 (${a})`);
      if (a * ETC[0] / ETC[1] <= hs || a * ETC[0] / ETC[1] <= hr) fail(`상가·토지 문장이 엔진과 어긋난다 (${a})`);
    }
  }

  // 4절 예시 4건 (주택만 엔진)
  const CMP = [
    ['매매', sale(2.5e8), OFFI_SALE],
    ['전세', J35, OFFI_RENT],
    ['월세 (보증금 1,000만원, 월 55만원)', monthly(1e7, 5.5e5), OFFI_RENT],
    ['월세 (보증금 500만원, 월 40만원)', RENTS[0].r, OFFI_RENT],
  ].map(([kind, house, offiRate]) => {
    const offi = by(house.amount, offiRate), etc = by(house.amount, ETC);
    return { kind, amount: house.amount, house: house.fee, offi, etc, vs: offi > house.fee ? '높아요' : offi < house.fee ? '낮아요' : '같아요' };
  });
  if (new Set(CMP.map((c) => c.vs)).size !== 3) throw new Error('realestate-brokerage-guide: 비교표에 높다·같다·낮다가 모두 있어야 한다');

  // 협의 예시: 6억 매매를 0.3%로, 전세 5억을 상한의 절반으로
  const NEGO_RATE = RENT[2].rate;                          // 0.3% (요율표에 있는 값)
  const nego = derive(Math.round(6e8 * NEGO_RATE));
  const negoHalf = derive(J5.fee / 2);

  return {
    slug: 'realestate-brokerage-guide', cat: 'realestate', catLabel: '부동산', crumb: '부동산 중개수수료',
    faqFixed: 2,
    title: '부동산 중개수수료, 전세 월세 복비는 얼마인가요',
    description: `주택 중개수수료 상한은 거래금액에 구간별 상한요율을 곱한 금액이고, 낮은 구간은 한도액에서 멈춰요. 전세 4억원은 ${won(J4.fee)}원, 매매 6억원은 ${won(S6.fee)}원이에요. 월세 환산, 오피스텔과 상가 요율, 내는 때, 넘겨 받았을 때의 처벌을 법령 원문으로 정리했어요.`,
    datePublished: '2026-11-18', verified: VERIFIED, basis: '2026년 11월 기준', readMinutes: 10,
    badge: `공인중개사법 시행규칙 요율표 원문 대조 · ${VERIFIED}`,
    calc: { href: '/brokerage/', label: '중개수수료 계산기 바로가기' },
    hero: {
      tag: '부동산', line1: '부동산 중개수수료', line2: '전세 월세 복비',
      sub1: `전세 4억원이면 상한 ${won(J4.fee)}원`,
      sub2: `매매 6억원이면 상한 ${won(S6.fee)}원`,
      foot: `공인중개사법 시행규칙 요율표 · ${VERIFIED} 검증`,
      card: { label: '전세 4억원 상한', big: won(J4.fee), unit: '원', l1: `보증금 × ${pct(J4.rate)}`, l2: '한 사람이 내는 한도' },
      alt: `부동산 중개수수료, 전세 월세 복비는 얼마인가요. 주택 전세 4억원이면 상한 ${won(J4.fee)}원, 매매 6억원이면 ${won(S6.fee)}원`,
    },
    intro: `복비는 부동산 중개수수료를 흔히 부르는 말이고, 법령에 적힌 이름은 중개보수예요. 주택은 거래금액에 구간별 상한요율을 곱한 금액이 한 사람이 내는 상한이에요. 낮은 금액 구간에는 한도액이 따로 있어서 곱한 값이 더 커도 한도액까지만 받아요. 전세 보증금 4억원이면 ${pct(J4.rate)}를 곱한 ${won(J4.fee)}원이에요.`,
    answer: {
      label: '거래를 고르면 주택 상한요율표로 계산한 금액을 보여 줘요',
      quick: [
        { chip: '전세 4억', selected: true, big: `${won(J4.fee)}원`, unit: '한 사람이 내는 상한', sub: `보증금 4억원 × 상한요율 ${pct(J4.rate)}` },
        { chip: '월세 1,000만에 60만', big: `${won(M.fee)}원`, unit: '한 사람이 내는 상한', sub: `환산 거래금액 ${kw(M.amount)}원 × 상한요율 ${pct(M.rate)}` },
        { chip: '매매 6억', big: `${won(S6.fee)}원`, unit: '한 사람이 내는 상한', sub: `매매가 6억원 × 상한요율 ${pct(S6.rate)}` },
      ],
      boxes: [
        { title: '중개사무소는 요율·한도액표를 붙여 둬야 해요', text: '주택의 실제 한도는 이 금액 안에서 시·도 조례가 정해요. 표는 사무소 안 보기 쉬운 곳에 있어야 해요' },
        { title: '오피스텔 요율에는 조건이 붙어요', text: `전용 85㎡ 이하에 부엌·화장실·목욕시설을 갖추면 매매 ${ratio(OFFI_SALE)}, 전세·월세 ${ratio(OFFI_RENT)}예요. 못 갖춘 오피스텔과 상가·토지는 ${ratio(ETC)} 이내예요` },
      ],
    },
    keyPoints: {
      title: '한눈에 보는 부동산 중개수수료',
      rows: [
        ['주택 금액 예시', `전세 4억원 ${won(J4.fee)}원, 보증금 1,000만원에 월세 60만원 ${won(M.fee)}원, 매매 6억원 ${won(S6.fee)}원`],
        ['주택 상한요율', `매매 ${pct(SALE[2].rate)}~${pct(SALE[5].rate)}, 전세·월세 ${pct(RENT[2].rate)}~${pct(RENT[5].rate)}. 매매 2억원 미만과 전세·월세 1억원 미만은 한도액도 있어요`],
        ['요율이 오르는 금액', `매매 9억·12억·15억원에서 ${[2, 3, 4].map((i) => kw(SALE_ROWS[i].x.jump)).join('·')}원, 전세·월세 6억·12억·15억원에서 ${[3, 5, 6].map((i) => kw(RENT_ROWS[i].x.jump)).join('·')}원씩 올라요`],
        ['월세 환산', `보증금 + 월세 × 100. 합이 ${kw(RENT[0].upperBound)}원 미만이면 보증금 + 월세 × 70`],
        ['오피스텔', `전용 85㎡ 이하에 부엌·화장실·목욕시설을 갖추면 매매 ${ratio(OFFI_SALE)}, 전세·월세 ${ratio(OFFI_RENT)}. 못 갖추면 ${ratio(ETC)} 이내`],
        ['상가·토지 등', `거래금액의 ${ratio(ETC)} 이내. 6억원이면 ${won(by(6e8, ETC))}원까지`],
        ['양쪽이 각각', `전세 5억원이면 집주인과 세입자가 저마다 ${won(J5.fee)}원까지`],
        ['넘겨 받으면', '1년 이하 징역 또는 1천만원 이하 벌금. 등록취소, 업무정지, 자격정지도 할 수 있어요'],
      ],
    },
    sections: [
      { id: 's1', h2: '부동산 중개수수료는 매매가 구간마다 얼마인가요', sub: '구간마다 상한 금액의 범위와 다음 구간으로 넘어갈 때의 변화', blocks: [
        { type: 'p', lead: true, ans: `주택 매매는 매매가에 구간별 상한요율 ${pct(SALE[2].rate)}~${pct(SALE[5].rate)}를 곱한 금액이 중개수수료 상한이에요.`, text: '상한요율은 넘지 못하게 정해 둔 가장 높은 요율이에요. 2억원 미만 두 구간에는 한도액이 있어서 곱한 값이 더 커도 그 금액에서 멈춰요. 사는 사람과 파는 사람이 각각 내는 한도예요.' },
        { type: 'table', id: 'saleTbl', text: true, caption: '주택 매매 중개수수료 구간별 상한요율과 상한 금액의 범위', headers: ['매매가 구간', '상한요율', '이 구간의 상한 금액', '다음 구간으로 넘어가면'],
          rows: SALE_ROWS.map(({ lo, hi, x, text }) => ({ cells: [bandLabel(lo, hi), x.b.limit ? `${pct(x.b.rate)} (한도액 ${kw(x.b.limit)}원)` : pct(x.b.rate), text, !hi ? '마지막 구간' : x.jump ? `${kw(x.jump)}원 뛰어요` : '같은 금액으로 이어져요'] })),
          fn: '공인중개사법 시행규칙 제20조①, 별표 1의 매매·교환. 구간 첫 금액의 상한은 계산기 값, 끝 금액은 구간 끝 × 요율이에요.' },
        { type: 'p', ans: '집을 맞바꾸는 교환도 매매와 같은 줄을 써요.', text: `두 집 가운데 비싼 쪽 값이 거래금액이에요. 7억원 집과 5억원 집을 바꾸면 7억원으로 계산해서 상한이 ${won(S7.fee)}원이에요.` },
        { type: 'widget', label: '주택 중개수수료 상한 계산', title: '내 거래금액으로 바로 보기', note: '주택 요율표로 계산해요. 오피스텔과 상가, 토지는 요율이 달라요.',
          inputs: [
            { id: 'bt', label: '거래 유형', type: 'select', value: 'sale', options: [['sale', '매매'], ['rent_jeonse', '전세'], ['rent_monthly', '월세']] },
            { id: 'ba', label: '매매가 또는 보증금 (만원)', type: 'number', value: 60000, min: 0, max: 500000, step: 100 },
            { id: 'br', label: '월 임대료 (만원, 월세일 때만)', type: 'number', value: 0, min: 0, max: 5000, step: 1 },
          ],
          outputs: [{ id: 'bfee', label: '수수료 상한' }, { id: 'bamt', label: '거래금액 (월세는 환산)' }, { id: 'brate', label: '상한요율' }, { id: 'blim', label: '구간 한도액' }],
          // 브라우저 산식 포트. build.mjs 가 아래 check 로 엔진과 대조한다.
          port: `var BSALE=${JSON.stringify(SALE)}, BRENT=${JSON.stringify(RENT)};
  function bf(t,a,r){ var amt=a; if(t==='rent_monthly'&&(r>0||a>0)){ amt=a+r*100; if(amt<50000000) amt=a+r*70; } var B=t==='sale'?BSALE:BRENT, b=B[B.length-1]; for(var i=0;i<B.length;i++){ if(B[i].upperBound===null||amt<B[i].upperBound){ b=B[i]; break; } } var fee=Math.round(amt*b.rate); if(b.limit!==null&&b.limit!==undefined) fee=Math.min(fee,b.limit); return {amt:amt,rate:b.rate,fee:fee,lim:b.limit}; }`,
          js: `
  function brender(){ var t=document.getElementById('bt').value, a=(+document.getElementById('ba').value||0)*1e4, r=t==='rent_monthly'?(+document.getElementById('br').value||0)*1e4:0; if(a<=0&&r<=0)return; var x=bf(t,a,r);
    document.getElementById('bfee').textContent=won(x.fee)+'원'; document.getElementById('bamt').textContent=won(x.amt)+'원'; document.getElementById('brate').textContent=(Math.round(x.rate*1000)/10)+'%'; document.getElementById('blim').textContent=x.lim?won(x.lim)+'원':'없음'; }
  ['bt','ba','br'].forEach(function(id){document.getElementById(id).addEventListener('input',brender)}); brender();`,
          check: (port) => {
            let n = 0, bad = 0;
            const same = (w, e) => w.fee === e.fee && w.amt === e.amount && w.rate === e.rate;
            const amts = [4166, 4167, 4999, 5000, 7499, 7500, 9999, 10000, 15999, 16000, 19999, 20000, 59999, 60000, 89999, 90000, 119999, 120000, 149999, 150000];
            for (let m = 100; m <= 500000; m += 370) amts.push(m);
            for (const t of ['sale', 'rent_jeonse']) for (const m of amts) { n++; if (!same(port.bf(t, m * 1e4, 0), raw(t, m * 1e4))) bad++; }
            for (const dep of [0, 300, 500, 1000, 2000, 3000, 4999, 5000, 10000, 30000, 60000]) for (let r = 0; r <= 500; r++) {
              n++; if (!same(port.bf('rent_monthly', dep * 1e4, r * 1e4), raw('rent_monthly', 0, dep * 1e4, r * 1e4))) bad++;
            }
            return { n, bad };
          },
        },
        { type: 'note', title: '부가가치세는 계산기의 선택 항목이에요', text: '중개수수료 계산기에는 "부가가치세 10% 더해 보기"라는 선택 칸이 있어요. 켜면 수수료에 그만큼을 더한 금액을 보여 줘요. 부가가치세가 상한 안에 들어 있는지, 따로 붙는지는 공인중개사법과 그 시행령·시행규칙에 적혀 있지 않아요.' },
      ] },

      { id: 's2', h2: '전세 중개수수료율은 보증금 구간마다 몇 퍼센트인가요', sub: '전세와 월세는 임대차라는 같은 요율표를 써요', blocks: [
        { type: 'p', lead: true, ans: `주택 전세는 보증금 1억원 이상 6억원 미만이면 ${pct(RENT[2].rate)}이고, 전체로는 ${pct(RENT[2].rate)}에서 ${pct(RENT[5].rate)}까지예요.`, text: '요율표에는 전세와 월세가 임대차라는 한 이름으로 묶여 있어요. 거래금액대가 같으면 매매 요율보다 낮거나 같고, 같은 곳은 표의 굵은 줄 하나예요.' },
        { type: 'table', id: 'rentTbl', text: true, caption: '거래금액대별 주택 전세·월세 상한요율과 상한 금액, 같은 금액대의 매매 요율', headers: ['거래금액', '전세·월세 상한요율', '전세·월세 상한 금액', '매매라면 요율'],
          rows: RENT_ROWS.map(({ lo, hi, x, s, text }) => ({ hi: x.b.rate === s.rate, cells: [bandLabel(lo, hi), x.b.limit ? `${pct(x.b.rate)} (한도액 ${kw(x.b.limit)}원)` : pct(x.b.rate), text, pct(s.rate)] })),
          fn: '공인중개사법 시행규칙 별표 1의 임대차 등과 매매·교환. 거래금액은 전세면 보증금, 월세면 환산 거래금액이에요.' },
      ] },

      { id: 's3', h2: '월세 복비는 거래금액을 어떻게 환산하나요', sub: '매달 내는 돈을 보증금처럼 바꿔 더한 금액이 거래금액이에요', blocks: [
        { type: 'p', lead: true, ans: '월세는 보증금에 월세의 100배를 더한 금액을 거래금액으로 봐요.', text: `더한 금액이 ${kw(RENT[0].upperBound)}원 미만이면 100배 대신 70배를 곱해서 다시 더해요.` },
        { type: 'flow', label: '월세 환산 거래금액과 중개수수료 상한 계산 순서', steps: [
          { label: '보증금', value: `${kw(1e7)}원`, sub: '계약서에 적는 보증금', op: `+ 월 ${kw(6e5)}원 × 100` },
          { label: '환산 거래금액', value: `${kw(M.amount)}원`, sub: `${kw(RENT[0].upperBound)}원 이상이라 그대로`, op: `× ${pct(M.rate)}` },
          { label: '수수료 상한', value: `${won(M.fee)}원`, sub: `한도액 ${kw(RENT[1].limit)}원보다 적어요` },
        ] },
        { type: 'table', id: 'monthTbl', net: 4, caption: '주택 월세 계약 여섯 가지의 환산 거래금액과 중개수수료 상한', headers: ['보증금', '월세', '환산 거래금액', '상한요율', '수수료 상한'],
          rows: RENTS.map(({ dep, rent, r, seventy }) => ({ hi: seventy, cells: [`${kw(dep)}원`, `${kw(rent)}원`, seventy ? `${kw(r.amount)}원 (70배)` : `${kw(r.amount)}원`, pct(r.rate), Math.round(r.amount * r.rate) > r.fee ? `${won(r.fee)}원 (한도액 ${kw(r.fee)}원 적용)` : `${won(r.fee)}원`] })),
          fn: `공인중개사법 시행규칙 제20조⑤. 70배 줄은 월세의 100배를 더한 금액이 ${kw(RENTS[0].hundred)}원, ${kw(RENTS[1].hundred)}원이라 다시 계산했어요.` },
        { type: 'p', ans: `환산 거래금액이 ${kw(RC2)}원부터 1억원까지면 월세가 달라도 상한이 ${kw(RENT[1].limit)}원으로 같아요.`, text: `보증금 ${kw(1e7)}원이라면 월세 ${kw(FLAT_LO)}원부터 ${kw(FLAT_HI)}원까지가 모두 여기에 해당해요. 조문은 보증금 말고 월세가 더 있는 임대차를 두고 적혀 있어요. 보증금이 아예 없는 월세는 조문에 따로 없고, 계산기는 보증금을 0원으로 놓고 같은 식을 써요.` },
        { type: 'p', ans: '같은 집이라도 전세로 계약할 때와 월세로 계약할 때 복비 상한이 달라요.', text: `전세 ${kw(3.5e8)}원으로도, 보증금 ${kw(5e7)}원에 월세 ${kw(1e6)}원으로도 나온 집을 가정해 볼게요. 전세라면 ${won(J35.fee)}원, 월세라면 환산 거래금액이 ${kw(MW.amount)}원이라 ${won(MW.fee)}원이에요. 전세를 월세로 돌릴 때 월세가 얼마가 되는지는 전월세 전환율 계산기에서 볼 수 있어요.`, link: { href: '/jeonse-conversion/', label: '전월세 전환율 계산기' } },
      ] },

      { id: 's4', h2: '오피스텔과 상가 중개수수료는 주택과 얼마나 다른가요', sub: '주택이 아니면 금액 구간도 한도액도 없는 다른 요율을 써요', blocks: [
        { type: 'p', lead: true, ans: `전용 85㎡ 이하에 부엌·화장실·목욕시설을 갖춘 오피스텔은 매매 ${ratio(OFFI_SALE)}, 임대차 ${ratio(OFFI_RENT)}가 상한이에요.`, text: `이 요건을 못 갖춘 오피스텔과 상가, 토지는 거래금액의 ${ratio(ETC)} 이내예요. 아래 세 가지가 모두 예일 때만 오피스텔 요율을 써요.` },
        { type: 'tree', id: 'rateTree', questions: [
          { q: '① 오피스텔인가요?', hint: '아파트 같은 주택이나 상가, 토지면 아니오', no: { title: '오피스텔 요율 대상이 아니에요', text: `주택이면 앞의 주택 요율표를 쓰고, 상가나 토지는 거래금액의 ${ratio(ETC)} 이내예요.` } },
          { q: '② 전용면적이 85㎡ 이하인가요?', hint: '넘으면 오피스텔 요율을 쓰지 못해요', no: { title: `면적이 넘어 ${ratio(ETC)} 이내예요`, text: '전용 85㎡를 넘는 오피스텔은 상가나 토지와 같은 요율로 계산해요.' } },
          { q: '③ 전용 입식 부엌, 전용 수세식 화장실, 목욕시설을 모두 갖췄나요?', hint: '상하수도 시설이 갖춰진 부엌이어야 해요. 화장실에 목욕시설이 함께 있어도 돼요', no: { title: `시설이 빠져 ${ratio(ETC)} 이내예요`, text: '부엌, 화장실, 목욕시설 가운데 하나라도 없으면 오피스텔 요율을 쓰지 못해요.' } },
        ], ok: { title: '세 가지가 모두 예라면 오피스텔 요율이에요', text: `매매와 교환은 ${ratio(OFFI_SALE)}, 임대차는 ${ratio(OFFI_RENT)}가 상한이에요. 금액 구간과 한도액은 없어요.` } },
        { type: 'table', id: 'cmpTbl', caption: '같은 거래금액일 때 주택, 요건을 갖춘 오피스텔, 상가·토지의 중개수수료 상한', headers: ['거래', '거래금액', '주택', '오피스텔', `상가·토지 등 (${ratio(ETC)}일 때)`, '오피스텔은 주택보다'],
          rows: CMP.map((c) => ({ cells: [c.kind, `${kw(c.amount)}원`, `${won(c.house)}원`, `${won(c.offi)}원`, `${won(c.etc)}원`, c.vs] })),
          fn: `시행규칙 제20조④, 별표 2. 주택 열만 계산기 값이고 나머지는 법정 요율 ${ratio(OFFI_SALE)}, ${ratio(OFFI_RENT)}, ${ratio(ETC)}를 곱한 값이에요.` },
        { type: 'p', ans: `매매는 ${kw(SC2)}원을 넘고 9억원에 못 미치는 금액에서 오피스텔이 주택보다 높아요.`, text: `${kw(SALE[0].upperBound)}원 미만과 12억원 이상에서는 오피스텔 쪽이 낮고, 나머지 금액대는 같아요. 전세·월세는 ${kw(RC2)}원을 넘고 6억원에 못 미칠 때 오피스텔이 높고, 낮아지는 금액대는 매매와 같아요. 상가와 토지는 ${ratio(ETC)}를 다 받는다면 어느 금액에서나 주택보다 높아요.` },
        { type: 'p', ans: '주택이 아닌 물건은 중개사가 받으려는 상한요율을 사무소 요율표에 따로 적어 둬야 해요.', text: '법정 요율 안에서 적어야 하고, 적어 둔 요율을 넘겨 받지 못해요. 월세를 거래금액으로 바꾸는 방법은 오피스텔과 상가도 주택과 같아요.' },
        { type: 'p', ans: '원룸은 요율표에 따로 없는 말이라, 그 건물이 주택인지, 오피스텔인지, 그 밖의 물건인지로 갈려요.', text: '건물의 종류와 용도, 면적은 확인·설명서에 적혀 나와요. 중개사는 설명할 때 건축물대장 같은 근거자료도 내보여야 해요. 주택과 다른 용도가 섞인 건물은 주택 면적이 절반 이상이면 주택 요율표를 써요. 넓이가 같은 3층 건물에서 1층만 상가이고 2층과 3층이 주택이면 주택 요율이에요. 1층과 2층이 상가라면 주택이 아닌 물건의 요율이에요.' },
        { type: 'note', title: '계산기는 주택만 계산해요', text: '중개수수료 계산기에는 물건 종류를 고르는 칸이 없어요. 오피스텔이나 상가 금액을 넣어도 주택 요율로 나와요. 위 표의 오피스텔과 상가·토지 금액은 계산기 결과가 아니에요.' },
      ] },

      { id: 's5', h2: '복비는 언제 내고 중개수수료 협의는 어디까지 되나요', sub: '내는 날은 약정이 먼저이고, 조문의 날짜는 약정이 없을 때만 써요', blocks: [
        { type: 'p', lead: true, ans: '복비는 중개사와 약정한 날에 내고, 약정이 없으면 거래대금 지급이 완료된 날에 내요. 금액은 한도 안에서 중개사와 협의해 정해요.', text: '약정은 중개사와 미리 정해 둔 약속이에요. 조문은 매매와 임대차를 가르지 않고 이렇게만 적어요. 전세와 월세에서 지급이 완료된 날이 언제인지, 약정을 어떤 형식으로 하는지는 조문에 풀이가 없어요.' },
        { type: 'timeline', label: '계약까지 중개수수료 금액을 미리 볼 수 있는 네 자리', items: [
          { step: '사무소에 들어설 때', title: '요율·한도액표', text: '사무소는 중개수수료와 실비(권리관계 확인 등에 든 비용)의 요율·한도액표를 보기 쉬운 곳에 붙여 둬야 해요. 안 붙이면 100만원 이하 과태료 대상이에요' },
          { step: '중개를 맡길 때', title: '일반중개계약서', text: '맡기는 사람이 써 달라고 요청할 수 있어요. 물건의 위치와 규모, 거래예정가격, 그 가격에 맞춰 정한 중개수수료를 적어요', tag: '요청할 수 있음' },
          { step: '계약 전', title: '중개사의 설명', text: '중개사는 사려는 쪽이나 빌리려는 쪽에게 중개수수료와 실비의 금액, 산출내역(계산한 내용)을 설명해야 해요' },
          { step: '계약서 쓰는 날', title: '확인·설명서', text: '설명한 사항을 적은 서류를 거래 당사자에게 내줘요. 앞서 들은 금액과 같은지 견줘 볼 수 있어요', mark: true },
        ] },
        { type: 'fn', text: '공인중개사법 제17조, 제22조, 제25조, 제51조③. 같은 법 시행령 제21조①3, 제27조의2. 시행규칙 제10조.' },
        { type: 'p', ans: `6억원 매매에서 요율을 ${pct(NEGO_RATE)}로 합의하면 ${won(S6.fee)}원이 ${won(nego)}원으로 내려가요.`, text: `전세 5억원을 상한의 절반으로 합의하면 ${won(negoHalf)}원이에요. 법령은 넘지 못할 금액만 정했고, 얼마로 합의할지는 정해 두지 않았어요.` },
        { type: 'p', ans: '복비는 양쪽이 반씩 나누는 돈이 아니라 저마다 따로 내는 돈이에요.', text: `중개사는 거래 양쪽에서 각각 받고, 표의 금액은 한쪽이 내는 한도예요. 전세 5억원이면 집주인도 세입자도 ${won(J5.fee)}원까지예요.` },
        { type: 'p', ans: '주택의 실제 한도는 시·도 조례가 정해요.', text: '국토교통부령(시행규칙) 요율표가 바깥 한도이고, 그 안에서 특별시, 광역시, 도, 특별자치도가 조례로 한도를 정해요. 앞의 표에 나온 주택 금액은 조례도 넘지 못하는 금액이에요. 시·도별 요율은 조례에 있고 공인중개사법령 본문에는 실려 있지 않아요. 오피스텔과 상가처럼 주택이 아닌 물건의 요율은 조례가 아니라 국토교통부령이 바로 정해요.' },
        { type: 'note', title: '계약이 깨졌을 때', text: '중개사의 고의나 과실로 거래가 무효가 되거나 취소, 해제되면 중개사는 중개수수료를 받지 못해요. 그 밖의 사정으로 계약이 깨졌을 때 어떻게 하는지는 조문에 따로 없어요.' },
      ] },

      { id: 's6', h2: '중개사가 상한보다 많은 중개수수료를 받으면 처벌받나요', sub: '사례나 증여로 이름을 바꿔 더 받아도 법이 막아요', blocks: [
        { type: 'p', lead: true, ans: '처벌받아요. 한도나 실비를 넘겨 금품을 받으면 1년 이하 징역이나 1천만원 이하 벌금 대상이에요.', text: '사례(고마움의 표시로 건네는 돈)나 증여, 그 밖의 어떤 명목이어도 같아요. 주택에서 넘으면 안 되는 선은 요율표 금액이 아니라 그 안에서 시·도 조례가 정한 한도예요. 요율표 금액까지는 받아도 괜찮다는 뜻이 아니에요.' },
        { type: 'p', ans: '법령이 정해 둔 것은 중개사가 받는 처벌과 처분이에요.', text: '더 낸 돈을 돌려받는 방법은 공인중개사법과 그 시행령·시행규칙에 나와 있지 않아요.' },
        { type: 'table', text: true, caption: '한도나 실비를 넘겨 받았을 때 대상별 처벌과 처분', headers: ['대상', '처벌·처분', '내용'], rows: [
          { cells: ['넘겨 받은 사람', '1년 이하 징역 또는 1천만원 이하 벌금', '개업공인중개사, 소속공인중개사, 중개보조원(공인중개사가 아닌 보조 직원), 개업공인중개사인 법인의 사원·임원이 대상이에요'] },
          { cells: ['개업공인중개사 (사무소를 등록한 중개사)', '등록취소 또는 업무정지', '등록관청(시장·군수·구청장)이 사무소 등록을 취소할 수 있어요. 6개월 범위에서 업무를 멈추게 할 수도 있어요'] },
          { cells: ['소속공인중개사 (사무소에 소속된 공인중개사)', '자격정지', '시·도지사가 6개월 범위에서 기간을 정해 자격을 정지할 수 있어요'] },
          { cells: ['넘겨 받은 사람이 속한 개업공인중개사', '1천만원 이하 벌금', '소속공인중개사, 중개보조원, 법인의 사원·임원이 중개 업무에서 어기면 그 개업공인중개사도 벌금형을 받아요. 주의와 감독을 게을리하지 않았으면 빠져요'] },
        ], fn: '공인중개사법 제32조④, 제33조①3, 제49조①10, 제38조②9, 제39조①11, 제36조①7, 제50조.' },
        { type: 'p', ans: '넘겨 받는 일을 봤다면 누구든지 부동산거래질서교란행위 신고센터에 신고할 수 있어요.', text: '신고센터는 국토교통부장관이 두고 한국부동산원이 업무를 맡아요. 신고센터의 주소나 누리집은 조문에 없어요. 사무소에 요율·한도액표를 붙이지 않은 일도 신고 대상이에요.' },
        { type: 'steps', items: [
          { title: '신고 내용 내기', text: '신고하는 사람과 상대방의 인적사항, 일이 생긴 일시·장소·내용, 증거자료나 참고인의 인적사항을 서면이나 전자문서로 내요', meta: '서면·전자문서' },
          { title: '신고센터의 조사 요구', text: '신고센터는 시·도지사와 등록관청 등에 조사와 조치를 요구해야 해요. 모자란 내용은 기간을 정해 보완해 달라고 할 수 있어요', meta: '신고센터' },
          { title: '기관이 신고센터에 통보', text: '요구받은 기관은 조사와 조치를 신속하게 마치고, 마친 날부터 10일 안에 결과를 신고센터에 알려야 해요', meta: '마친 뒤 10일' },
          { title: '신고한 사람에게 통보', text: '신고센터가 처리 결과를 신고한 사람에게 알려야 해요. 조사에 걸리는 기간과 이 통보의 기한은 조문에 없어요', meta: '기한 규정 없음' },
        ] },
        { type: 'fn', text: '공인중개사법 제47조의2, 같은 법 시행령 제37조①~⑦.' },
        { type: 'p', ans: '신고센터가 하는 일은 접수와 상담, 조사와 조치 요구, 결과 통보까지예요.', text: '등록취소나 업무정지, 자격정지는 "할 수 있다"로 적혀 있어서 신고가 곧 처분은 아니에요. 신고센터는 네 가지 경우에 국토교통부장관 승인을 받아 처리를 끝낼 수 있어요. 신고 내용이 명백히 거짓일 때와 보완 요청에 응하지 않았을 때가 그래요. 결과를 통보받은 일을 새 사실이나 증거 없이 정당한 사유 없이 다시 신고했을 때도 해당해요. 이미 수사나 재판이 진행 중이거나 판결로 확정된 일도 마찬가지예요.' },
        { type: 'note', title: '실비는 복비와 따로 청구할 수 있어요', text: '권리관계(소유권, 저당권 같은 권리의 상태)를 확인하거나 계약금 등의 반환을 보장하는 데 든 비용이 실비예요. 중개사가 영수증을 붙여 청구해요. 권리관계 확인 비용은 파는 쪽과 빌려주는 쪽에, 반환 보장 비용은 사는 쪽과 빌리는 쪽에 청구할 수 있어요. 실비의 한도도 시·도 조례가 정해요.' },
      ] },
    ],
    faq: [
      ['매매와 전세를 한 번에 계약하면 복비를 두 번 내나요?', `같은 집을 두고 같은 당사자끼리 같은 기회에 매매와 임대차를 함께 계약하면 매매 금액으로만 계산해요. 8억원에 판 사람이 그 집에 전세로 남는 계약이 함께 이뤄졌다면 8억원의 상한 ${won(S8.fee)}원만 적용돼요. 같은 기회가 어디까지인지는 조문에 풀이가 없어요.`],
      ['중개사무소가 다른 시·도에 있으면 어느 지역 요율을 따르나요?', '중개사무소가 있는 시·도의 기준을 따라요. 집이 있는 곳과 사무소가 있는 곳이 다르면 중개사는 사무소 소재지 조례대로 중개수수료와 실비를 받아야 해요.'],
    ],
    summary: [
      '요율표 금액은 바깥 한도예요. 내 거래의 한도는 사무소 요율·한도액표와 확인·설명서의 산출내역으로 견줘 보세요.',
      `매매가나 보증금이 요율이 오르는 금액 근처인지부터 보세요. 그 금액에 닿는 순간 ${kw(RENT_ROWS[3].x.jump)}원에서 ${kw(SALE_ROWS[4].x.jump)}원이 한 번에 올라요.`,
      `월세는 환산 거래금액이 ${kw(RC2)}원에서 1억원 사이면 월세가 조금 달라도 복비 상한이 같아요.`,
      `오피스텔은 면적과 시설 요건부터 보세요. 요건을 못 갖추면 ${ratio(OFFI_SALE)}나 ${ratio(OFFI_RENT)}가 아니라 ${ratio(ETC)} 이내가 돼요.`,
    ],
    sources: [
      ['법령', '공인중개사법 제17조, 제22조, 제25조, 제32조, 제33조, 제36조, 제38조, 제39조, 제47조의2, 제49조, 제50조, 제51조. 같은 법 시행령 제21조, 제27조의2, 제37조. 같은 법 시행규칙 제10조, 제20조, 별표 1(주택 중개보수 상한요율), 별표 2(오피스텔 중개보수 요율).'],
      ['정부 안내', '국가법령정보센터(law.go.kr)의 현행 조문과 별표를 2026-11-18에 읽고 옮겼어요. 시·도 조례는 이 글의 근거에 들어 있지 않아요.'],
      ['계산', `주택 금액은 중개수수료 계산기 산식(거래금액 × 상한요율, 한도액이 있으면 둘 중 작은 금액)으로 계산했어요. 오피스텔과 상가·토지 금액은 계산기 값이 아니라 법정 요율을 곱한 값이에요 (${VERIFIED}).`],
    ],
    claims: [
      { src: 4, quote: '1. 매매 교환 5천만원 미만 | 1천분의6 | 25만원', note: '매매 1구간 요율·한도액' },
      { src: 4, quote: '5천만원 이상2억원미만 | 1천분의5 | 80만원', note: '매매 2구간' },
      { src: 4, quote: '2억원 이상9억원미만 | 1천분의4', note: '매매 3구간' },
      { src: 4, quote: '9억원 이상12억원 미만 | 1천분의5', note: '매매 4구간' },
      { src: 4, quote: '12억원이상 15억원미만 | 1천분의6', note: '매매 5구간' },
      { src: 4, quote: '15억원이상 | 1천분의7', note: '매매 6구간' },
      { src: 4, quote: '2. 임대차등 | 5천만원 미만 | 1천분의5 | 20만원', note: '임대차 1구간' },
      { src: 4, quote: '5천만원 이상 1억원 미만 | 1천분의 4 | 30만원', note: '임대차 2구간' },
      { src: 4, quote: '1억원 이상6억원미만 | 1천분의3', note: '임대차 3구간' },
      { src: 4, quote: '6억원 이상12억원 미만 | 1천분의4', note: '임대차 4구간' },
      { src: 4, quote: '12억원이상 15억원미만 | 1천분의5', note: '임대차 5구간' },
      { src: 4, quote: '15억원이상 | 1천분의6', note: '임대차 6구간' },
      { src: 3, quote: '①법 제32조제4항에 따른 주택의 중개에 대한 보수는 중개의뢰인 쌍방으로부터 각각 받되, 그 일방으로부터 받을 수 있는 한도는 별표 1과 같으며, 그 금액은 법 제32조제4항에 따라 시ㆍ도의 조례로 정하는 요율한도 이내에서 중개의뢰인과 개업공인중개사가 서로 협의하여 결정한다.', note: '양쪽 각각 · 한도 · 조례 · 협의' },
      { src: 1, quote: '④주택(부속토지를 포함한다. 이하 이 항에서 같다)의 중개에 대한 보수와 제2항에 따른 실비의 한도 등에 관하여 필요한 사항은 국토교통부령으로 정하는 범위 안에서 특별시ㆍ광역시ㆍ도 또는 특별자치도(이하 “시ㆍ도”라 한다)의 조례로 정하고, 주택 외의 중개대상물의 중개에 대한 보수는 국토교통부령으로 정한다.', note: '주택 보수와 실비 한도는 조례, 주택 외는 국토교통부령' },
      { src: 3, quote: '1. 임대차 중 보증금 외에 차임이 있는 경우에는 월 단위의 차임액에 100을 곱한 금액을 보증금에 합산한 금액을 거래금액으로 한다. 다만, 본문의 규정에 따라 합산한 금액이 5천만원 미만인 경우에는 본문의 규정에 불구하고 월 단위의 차임액에 70을 곱한 금액과 보증금을 합산한 금액을 거래금액으로 한다.', note: '월세 100배·70배 환산 (보증금 외에 차임이 있는 경우)' },
      { src: 3, quote: '2. 교환계약의 경우에는 교환대상 중개대상물 중 거래금액이 큰 중개대상물의 가액을 거래금액으로 한다.', note: '교환' },
      { src: 3, quote: '3. 동일한 중개대상물에 대하여 동일 당사자간에 매매를 포함한 둘 이상의 거래가 동일 기회에 이루어지는 경우에는 매매계약에 관한 거래금액만을 적용한다.', note: 'FAQ 매매와 임대차 동시 계약' },
      { src: 3, quote: '⑤제1항 및 제4항의 경우 거래금액의 계산은 다음 각 호에 따른다.', note: '환산 규칙은 주택 외에도 같다' },
      { src: 3, quote: '1. 「건축법 시행령」 별표 1 제14호나목2)에 따른 오피스텔(다음 각 목의 요건을 모두 갖춘 경우에 한정한다): 중개의뢰인 쌍방으로부터 각각 받되, 별표 2의 상한요율 이내에서 중개의뢰인과 개업공인중개사가 서로 협의하여 결정한다.', note: '오피스텔 요율은 요건을 모두 갖춘 경우만' },
      { src: 3, quote: '가. 전용면적이 85제곱미터 이하일 것', note: '오피스텔 요건 1' },
      { src: 3, quote: '나. 상ㆍ하수도 시설이 갖추어진 전용입식 부엌, 전용수세식 화장실 및 목욕시설(전용수세식 화장실에 목욕시설을 갖춘 경우를 포함한다)을 갖출 것', note: '오피스텔 요건 2' },
      { src: 5, quote: 'ㆍ 교 환 | 1천분의 5', note: '오피스텔 매매·교환 요율' },
      { src: 5, quote: '2 | 임대차 등 | 1천분의 4', note: '오피스텔 임대차 요율' },
      { src: 3, quote: '2. 제1호 외의 경우: 중개의뢰인 쌍방으로부터 각각 받되, 거래금액의 1천분의 9 이내에서 중개의뢰인과 개업공인중개사가 서로 협의하여 결정한다.', note: '요건을 못 갖춘 오피스텔과 그 밖의 물건' },
      { src: 3, quote: '⑥중개대상물인 건축물 중 주택의 면적이 2분의 1이상인 경우에는 제1항의 규정을 적용하고, 주택의 면적이 2분의 1미만인 경우에는 제4항의 규정을 적용한다.', note: '주택 면적 절반 규칙' },
      { src: 3, quote: '실제 자기가 받고자 하는 중개보수의 상한요율을 제10조제2호의 규정에 따른 중개보수ㆍ실비의 요율 및 한도액표에 명시하여야 하며, 이를 초과하여 중개보수를 받아서는 아니 된다.', note: '주택 외 물건의 사무소 요율표' },
      { src: 1, quote: '토지대장 등본 또는 부동산종합증명서, 등기사항증명서, 신탁원부, 건축물대장 등본 등 설명의 근거자료를 제시하여야 한다.', note: '설명 때 내보이는 건축물대장' },
      { src: 2, quote: '1. 중개대상물의 종류ㆍ소재지ㆍ지번ㆍ지목ㆍ면적ㆍ용도ㆍ구조 및 건축연도 등 중개대상물에 관한 기본적인 사항', note: '확인·설명 사항: 종류·면적·용도' },
      { src: 2, quote: '2. 소유권ㆍ전세권ㆍ저당권ㆍ지상권 및 임차권 등 중개대상물의 권리관계에 관한 사항', note: '권리관계 풀이' },
      { src: 2, quote: '법 제32조제3항에 따른 중개보수의 지급시기는 개업공인중개사와 중개의뢰인간의 약정에 따르되, 약정이 없을 때에는 중개대상물의 거래대금 지급이 완료된 날로 한다.', note: '지급시기 (매매·임대차 구분 없음)' },
      { src: 1, quote: '개업공인중개사는 중개사무소등록증ㆍ중개보수표 그 밖에 국토교통부령으로 정하는 사항을 해당 중개사무소 안의 보기 쉬운 곳에 게시하여야 한다.', note: '요율표 게시' },
      { src: 3, quote: '2. 중개보수ㆍ실비의 요율 및 한도액표', note: '게시 대상' },
      { src: 1, quote: '1. 제17조를 위반하여 중개사무소등록증 등을 게시하지 아니한 자', note: '게시 위반 100만원 이하 과태료(제51조③)' },
      { src: 1, quote: '③ 다음 각 호의 어느 하나에 해당하는 자에게는 100만원 이하의 과태료를 부과한다.', note: '제51조③ 머리' },
      { src: 1, quote: '중개의뢰인은 중개의뢰내용을 명확하게 하기 위하여 필요한 경우에는 개업공인중개사에게 다음 각 호의 사항을 기재한 일반중개계약서의 작성을 요청할 수 있다.', note: '일반중개계약서는 의뢰인이 요청' },
      { src: 1, quote: '1. 중개대상물의 위치 및 규모', note: '일반중개계약서 기재 사항 1' },
      { src: 1, quote: '3. 거래예정가격에 대하여 제32조에 따라 정한 중개보수', note: '일반중개계약서 기재 사항 3' },
      { src: 1, quote: '중개가 완성되기 전에 다음 각 호의 사항을 확인하여 이를 해당 중개대상물에 관한 권리를 취득하고자 하는 중개의뢰인에게 성실ㆍ정확하게 설명하고', note: '계약 전 설명 의무' },
      { src: 2, quote: '3. 거래예정금액ㆍ중개보수 및 실비의 금액과 그 산출내역', note: '확인·설명 사항' },
      { src: 2, quote: '중개대상물 확인ㆍ설명서에 제1항 각 호의 사항을 적어 거래당사자에게 발급해야 한다.', note: '확인·설명서 발급' },
      { src: 1, quote: '①개업공인중개사는 중개업무에 관하여 중개의뢰인으로부터 소정의 보수를 받는다. 다만, 개업공인중개사의 고의 또는 과실로 인하여 중개의뢰인간의 거래행위가 무효ㆍ취소 또는 해제된 경우에는 그러하지 아니하다.', note: '중개사 잘못으로 계약이 깨진 경우' },
      { src: 1, quote: '3. 사례ㆍ증여 그 밖의 어떠한 명목으로도 제32조에 따른 보수 또는 실비를 초과하여 금품을 받는 행위', note: '금지행위: 제32조에 따른 보수 또는 실비 초과' },
      { src: 1, quote: '①다음 각 호의 어느 하나에 해당하는 자는 1년 이하의 징역 또는 1천만원 이하의 벌금에 처한다.', note: '벌칙(제49조①)' },
      { src: 1, quote: '10. 제33조제1항제1호부터 제4호까지의 규정을 위반한 자', note: '벌칙 대상(제49조①10)' },
      { src: 1, quote: '등록관청은 개업공인중개사ㆍ소속공인중개사ㆍ중개보조원 및 개업공인중개사인 법인의 사원ㆍ임원(이하 “개업공인중개사등”이라 한다)', note: '금지행위 대상의 범위' },
      { src: 1, quote: '②등록관청은 개업공인중개사가 다음 각 호의 어느 하나에 해당하는 경우에는 중개사무소의 개설등록을 취소할 수 있다.', note: '등록취소는 할 수 있다(제38조②)' },
      { src: 1, quote: '9. 제33조제1항 각 호에 규정된 금지행위를 한 경우', note: '등록취소 사유' },
      { src: 1, quote: '11. 제38조제2항 각 호의 어느 하나에 해당하는 경우', note: '업무정지 사유(제39조①11)' },
      { src: 1, quote: '6개월의 범위 안에서 기간을 정하여 업무의 정지를 명할 수 있다.', note: '업무정지' },
      { src: 1, quote: '6개월의 범위 안에서 기간을 정하여 그 자격을 정지할 수 있다.', note: '소속공인중개사 자격정지(제36조①)' },
      { src: 1, quote: '7. 제33조제1항 각 호에 규정된 금지행위를 한 경우', note: '자격정지 사유' },
      { src: 1, quote: '소속공인중개사ㆍ중개보조원 또는 개업공인중개사인 법인의 사원ㆍ임원이 중개업무에 관하여 제48조 또는 제49조의 규정에 해당하는 위반행위를 한 때에는 그 행위자를 벌하는 외에 그 개업공인중개사에 대하여도 해당 조에 규정된 벌금형을 과한다. 다만, 그 개업공인중개사가 그 위반행위를 방지하기 위하여 해당 업무에 관하여 상당한 주의와 감독을 게을리하지 아니한 경우에는 그러하지 아니하다.', note: '양벌규정(제50조)' },
      { src: 1, quote: '① 국토교통부장관은 부동산 시장의 건전한 거래질서를 조성하기 위하여 부동산거래질서교란행위 신고센터(이하 이 조에서 “신고센터”라 한다)를 설치ㆍ운영할 수 있다.', note: '신고센터 설치(제47조의2①)' },
      { src: 1, quote: '라 한다)를 발견하는 경우 그 사실을 신고센터에 신고할 수 있다.', note: '누구든지 신고(제47조의2②)' },
      { src: 1, quote: '4. 개업공인중개사등이 제12조제2항, 제29조제2항 또는 제33조제1항을 위반하는 행위', note: '신고 대상: 금지행위' },
      { src: 1, quote: '3. 개업공인중개사가 제12조제1항, 제13조제1항ㆍ제2항, 제14조제1항, 제15조제3항, 제17조, 제18조, 제19조, 제25조제1항, 제25조의3 또는 제26조제3항을 위반하는 행위', note: '신고 대상: 요율표 미게시(제17조)' },
      { src: 1, quote: '1. 부동산거래질서교란행위 신고의 접수 및 상담', note: '신고센터 업무 1' },
      { src: 1, quote: '2. 신고사항에 대한 확인 또는 시ㆍ도지사 및 등록관청 등에 신고사항에 대한 조사 및 조치 요구', note: '신고센터 업무 2 (조사·조치 요구까지)' },
      { src: 1, quote: '3. 신고인에 대한 신고사항 처리 결과 통보', note: '신고센터 업무 3' },
      { src: 2, quote: '를 신고하려는 자는 다음 각 호의 사항을 서면(전자문서를 포함한다)으로 제출해야 한다.', note: '신고 방법(시행령 제37조①)' },
      { src: 2, quote: '1. 신고인 및 피신고인의 인적사항', note: '신고 때 내는 것 1' },
      { src: 2, quote: '2. 부동산거래질서교란행위의 발생일시ㆍ장소 및 그 내용', note: '신고 때 내는 것 2' },
      { src: 2, quote: '3. 신고 내용을 증명할 수 있는 증거자료 또는 참고인의 인적사항', note: '신고 때 내는 것 3' },
      { src: 2, quote: '② 신고센터는 제1항에 따라 신고받은 사항에 대해 보완이 필요한 경우 기간을 정하여 신고인에게 보완을 요청할 수 있다.', note: '보완 요청' },
      { src: 2, quote: '③ 신고센터는 제1항에 따라 제출받은 신고사항에 대해 시ㆍ도지사 및 등록관청 등에 조사 및 조치를 요구해야 한다. 다만, 다음 각 호의 어느 하나에 해당하는 경우에는 국토교통부장관의 승인을 받아 접수된 신고사항의 처리를 종결할 수 있다.', note: '조사·조치 요구와 종결(장관 승인)' },
      { src: 2, quote: '1. 신고내용이 명백히 거짓인 경우', note: '종결 사유 1' },
      { src: 2, quote: '2. 신고인이 제2항에 따른 보완을 하지 않은 경우', note: '종결 사유 2' },
      { src: 2, quote: '3. 제5항에 따라 신고사항의 처리결과를 통보받은 사항에 대하여 정당한 사유 없이 다시 신고한 경우로서 새로운 사실이나 증거자료가 없는 경우', note: '종결 사유 3' },
      { src: 2, quote: '4. 신고내용이 이미 수사기관에서 수사 중이거나 재판이 계속 중이거나 법원의 판결에 의해 확정된 경우', note: '종결 사유 4' },
      { src: 2, quote: '④ 제3항 본문에 따른 요구를 받은 시ㆍ도지사 및 등록관청 등은 신속하게 조사 및 조치를 완료하고, 완료한 날부터 10일 이내에 그 결과를 신고센터에 통보해야 한다.', note: '10일은 기관이 신고센터에 알리는 기한' },
      { src: 2, quote: '⑤ 신고센터는 제4항에 따라 시ㆍ도지사 및 등록관청 등으로부터 처리 결과를 통보받은 경우 신고인에게 신고사항 처리 결과를 통보해야 한다.', note: '신고인 통보 (기한 없음)' },
      { src: 2, quote: '신고센터의 업무를 「한국부동산원법」에 따른 한국부동산원(이하 “한국부동산원”이라 한다)에 위탁한다.', note: '한국부동산원 위탁' },
      { src: 3, quote: '개업공인중개사가 영수증 등을 첨부하여 매도ㆍ임대 그 밖의 권리를 이전하고자 하는 중개의뢰인(계약금 등의 반환채무이행 보장에 소요되는 실비의 경우에는 매수ㆍ임차 그 밖의 권리를 취득하고자 하는 중개의뢰인을 말한다)에게 청구할 수 있다.', note: '실비 청구' },
      { src: 3, quote: '중개사무소의 소재지를 관할하는 시ㆍ도의 조례에서 정한 기준에 따라 중개보수 및 실비를 받아야 한다.', note: 'FAQ 사무소 소재지 조례' },
    ],
    related: [
      { kind: '계산기', label: '부동산 중개수수료 계산기', href: '/brokerage/' },
      { kind: '부동산 계산기', label: '전월세 전환율 계산기', href: '/jeonse-conversion/' },
      { kind: '부동산 가이드', label: '취득세 세율과 계산', href: '/acquisition-tax/guide/' },
      { kind: '대출 가이드', label: '전세대출 이자계산', href: '/jeonse-loan/guide/' },
    ],
  };
}
