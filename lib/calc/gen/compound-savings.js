// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: compound-savings
const round = Math.round;

// ═══════════════════════════════════════════════════════════════
//  BATCH 5 산식 함수 (51-70)
// ═══════════════════════════════════════════════════════════════
function calc_compoundSavings(input, data) {
  const r = input.rate / 12;
  const FV = input.monthlyDeposit * ((Math.pow(1 + r, input.months) - 1) / r);
  const principal = input.monthlyDeposit * input.months;
  const interest = round(FV) - principal;
  const tax = round(interest * data.constants.INTEREST_TAX_RATE);
  return { principal, interest, tax, maturity: principal + interest - tax };
}

module.exports = { calc: calc_compoundSavings };
