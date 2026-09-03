// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: installment-fee
const round = Math.round;

function calc_installmentFee(input) {
  const { principal, months, annualRate } = input;
  const r = annualRate / 12;
  const M = principal * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1);
  const monthlyPayment = round(M);
  const totalPayment = round(M * months);
  return { monthlyPayment, totalPayment, totalFee: totalPayment - principal };
}

module.exports = { calc: calc_installmentFee };
