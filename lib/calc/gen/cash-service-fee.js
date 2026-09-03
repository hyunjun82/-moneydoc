// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: cash-service-fee
const round = Math.round;

function calc_cashServiceFee(input) {
  const interest = round(input.amount * (input.annualRate / 365) * input.days);
  return { interest, totalRepayment: input.amount + interest };
}

module.exports = { calc: calc_cashServiceFee };
