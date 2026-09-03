// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: fixed-deposit
const round = Math.round;

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — fixed-deposit
// ═══════════════════════════════════════════════════════════════
function calc_fixedDeposit(input, data) {
  const { principal, years, rate, taxFree = 'no' } = input;
  const interest = round(principal * rate * years);
  const taxRate = taxFree === 'yes' ? 0 : data.constants.INTEREST_TAX_RATE;
  const tax = round(interest * taxRate);
  const maturity = principal + interest - tax;
  return { interest, tax, maturity };
}

module.exports = { calc: calc_fixedDeposit };
