// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: freelancer-tax
const round = Math.round;

function calc_freelancerTax(input, data) {
  const C = data.constants;
  const incomeTax = round(input.grossPayment * C.INCOME_TAX_RATE);
  const localTax = round(input.grossPayment * C.LOCAL_TAX_RATE);
  const totalTax = incomeTax + localTax;
  return { incomeTax, localTax, totalTax, netPayment: input.grossPayment - totalTax };
}

module.exports = { calc: calc_freelancerTax };
