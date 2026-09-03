// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: balloon-payment
const round = Math.round;

function calc_balloonPayment(input) {
  const monthlyInterest = round(input.principal * input.rate / 12);
  const totalInterest = round(monthlyInterest * input.years * 12);
  return { monthlyInterest, totalInterest, totalPayment: input.principal + totalInterest };
}

module.exports = { calc: calc_balloonPayment };
