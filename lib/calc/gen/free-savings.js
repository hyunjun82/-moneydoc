// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: free-savings
const round = Math.round;

function calc_freeSavings(input, data) {
  const { monthlyDeposit, months, rate, taxFree = 'no' } = input;
  const p = monthlyDeposit * months;
  const interest = round(monthlyDeposit * (rate / 12) * months * (months + 1) / 2);
  const taxRate = taxFree === 'yes' ? 0 : data.constants.INTEREST_TAX_RATE;
  const tax = round(interest * taxRate);
  return { principal: p, interest, tax, maturity: p + interest - tax };
}

module.exports = { calc: calc_freeSavings };
