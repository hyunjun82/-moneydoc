// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: housing-subscription
const round = Math.round;

function calc_housingSubscription(input, data) {
  const p = input.monthlyDeposit * input.months;
  const interest = round(input.monthlyDeposit * (input.rate / 12) * input.months * (input.months + 1) / 2);
  const tax = round(interest * data.constants.INTEREST_TAX_RATE);
  return { principal: p, interest, tax, maturity: p + interest - tax };
}

module.exports = { calc: calc_housingSubscription };
