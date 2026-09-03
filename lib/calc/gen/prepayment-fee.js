// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: prepayment-fee
const round = Math.round;

function calc_prepaymentFee(input) {
  const { remainingBalance, totalMonths, remainingMonths, rate } = input;
  const fee = round(remainingBalance * rate * remainingMonths / totalMonths);
  return { fee, feePct: rate, rateInRange: true };
}

module.exports = { calc: calc_prepaymentFee };
