// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: comprehensive-real-estate-tax
const round = Math.round;

const min = Math.min;

const max = Math.max;

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — comprehensive-real-estate-tax
// ═══════════════════════════════════════════════════════════════
// 주택분 종합부동산세 — 홈택스 '종합부동산세 간이세액계산(주택)' 과 1:1 (adapters/hometax-comp-tax.mjs 로 0원 대조, 2026 귀속)
//  1) 공시가 합계 − 공제(1세대1주택 12억 / 그 외 9억) × 공정시장가액비율 60% = 과세표준 (원단위 절사)
//  2) 세율: 기본 누진세율. 3주택 이상이고 과표 12억 초과일 때만 중과세율 (종부세법 §9①)
//  3) 공제할 재산세액 = 실제 재산세 합계 × 비율, 비율 = (과표 × 재산세 공정시장가액비율 × 0.4%) / (합산 공시가를 한 채로 본 재산세)
//     — 비율은 소수 8자리 절사, 곱한 결과 원단위 절사 (홈택스 실측: 1주택 15억 → 323,999 / 2주택 20억 → 1,344,690)
//  4) 1세대1주택 세액공제: 고령자 60·65·70세 20/30/40%, 장기보유 5·10·15년 20/40/50%, 합계 80% 한도 (각각 원단위 절사)
//  5) 농어촌특별세 = 종부세액 × 20% (원단위 절사)
//  재산세는 표준세율(0.1~0.4%, 누진공제)로 주택별 계산. 1세대1주택은 공정시장가액비율 43/44/45% (공시가 3억·6억 기준), 그 외 60%.
//  세부담상한(150%)은 전년도 공시가 = 당해년도로 보아 반영하지 않는다 (홈택스도 같은 가정에서 상한 미적용).
function propertyTaxStandard(base, T) {
  for (const b of T.propertyTaxBrackets.brackets) {
    if (b.upperBound === null || base <= b.upperBound) return max(0, Math.floor(base * b.rate - b.progressiveDeduction));
  }
  return 0;
}

function compTaxDetail(input, data) {
  const C = data.constants, T = data.tables;
  const values = [input.value1, input.value2, input.value3].map((v) => Math.max(0, Math.round(v || 0))).filter((v) => v > 0);
  const homes = values.length;
  const total = values.reduce((a, b) => a + b, 0);
  const isOneHome = homes === 1;
  const fmrOf = (v) => !isOneHome ? C.PROPERTY_FMR_MULTI
    : v <= 300000000 ? C.PROPERTY_FMR_ONE_HOME_UNDER_3EOK
    : v <= 600000000 ? C.PROPERTY_FMR_ONE_HOME_3_TO_6EOK
    : C.PROPERTY_FMR_ONE_HOME_OVER_6EOK;
  const propertyTaxes = values.map((v) => propertyTaxStandard(Math.floor(v * fmrOf(v)), T));
  const propertyTaxTotal = propertyTaxes.reduce((a, b) => a + b, 0);
  const propertyEduTax = propertyTaxes.reduce((a, t) => a + Math.floor(t * C.EDUCATION_TAX_RATE), 0);

  const deduction = isOneHome ? C.ONE_HOME_DEDUCTION : C.GENERAL_DEDUCTION;
  const excess = max(0, total - deduction);
  const taxableBase = Math.floor(excess * C.FAIR_MARKET_RATIO);
  const heavy = homes >= C.HEAVY_MIN_HOMES && taxableBase > C.HEAVY_MIN_BASE;
  const brackets = heavy ? T.bracketsHeavy.brackets : T.bracketsBasic.brackets;
  let rate = 0, taxBeforePropertyCredit = 0;
  if (taxableBase > 0) {
    for (const b of brackets) {
      if (b.upperBound === null || taxableBase <= b.upperBound) { rate = b.rate; taxBeforePropertyCredit = max(0, Math.floor(taxableBase * b.rate - b.progressiveDeduction)); break; }
    }
  }
  let propertyTaxCredit = 0;
  if (taxBeforePropertyCredit > 0) {
    const aggFmr = fmrOf(total);
    const aggPropertyTax = propertyTaxStandard(Math.floor(total * aggFmr), T);
    // 정수 곱으로 부동소수 오차 차단: 과표 × (비율×1000) × (0.4%×10000) / 1e7
    const numerator = (taxableBase * Math.round(aggFmr * 1000) * Math.round(C.PROPERTY_TOP_RATE * 10000)) / 1e7;
    const ratio = aggPropertyTax > 0 ? Math.floor((numerator / aggPropertyTax) * 1e8) / 1e8 : 0;
    propertyTaxCredit = Math.floor(propertyTaxTotal * ratio);
  }
  const calcTax = max(0, taxBeforePropertyCredit - propertyTaxCredit);
  let ageRate = 0, holdRate = 0;
  if (isOneHome) {
    const age = input.age || 0, hy = input.holdingYears || 0;
    ageRate = age >= 70 ? 0.40 : age >= 65 ? 0.30 : age >= 60 ? 0.20 : 0;
    holdRate = hy >= 15 ? 0.50 : hy >= 10 ? 0.40 : hy >= 5 ? 0.20 : 0;
  }
  const ageCredit = Math.floor(calcTax * ageRate);
  const holdingCredit = Math.floor(calcTax * holdRate);
  const creditTotal = min(ageCredit + holdingCredit, Math.floor(calcTax * C.CREDIT_CAP));
  const compTax = calcTax - creditTotal;
  const ruralTax = Math.floor(compTax * C.RURAL_TAX_RATE);
  const payableTax = compTax + ruralTax;
  return {
    homes, totalValue: total, isOneHome, deduction, excess, taxableBase, ratePct: +(rate * 100).toFixed(2), heavy,
    taxBeforePropertyCredit, propertyTaxCredit, calcTax, ageCredit, holdingCredit, creditTotal, compTax, ruralTax, payableTax,
    propertyTaxTotal, propertyEduTax,
  };
}

function calc_propertyTaxComp(input, data) {
  const r = compTaxDetail(input, data);
  return {
    homes: r.homes, totalValue: r.totalValue, isOneHome: r.isOneHome, deduction: r.deduction, excess: r.excess, taxableBase: r.taxableBase, ratePct: r.ratePct, heavy: r.heavy,
    taxBeforePropertyCredit: r.taxBeforePropertyCredit, propertyTaxCredit: r.propertyTaxCredit, calcTax: r.calcTax,
    ageCredit: r.ageCredit, holdingCredit: r.holdingCredit, creditTotal: r.creditTotal, compTax: r.compTax, ruralTax: r.ruralTax, payableTax: r.payableTax,
    propertyTaxTotal: r.propertyTaxTotal,
  };
}

module.exports = { calc: calc_propertyTaxComp };
