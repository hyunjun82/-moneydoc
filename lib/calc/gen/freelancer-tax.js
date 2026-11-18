// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: freelancer-tax
function calc_freelancerTax(input, data) {
  const C = data.constants;
  // 끝수: 10원 미만은 계산하지 않는다 (국고금 관리법 §47①, 지방소득세는 지방세기본법 §59 로 준용)
  const floor10 = (v) => Math.floor(v / 10 + 1e-9) * 10;
  const incomeTax = floor10(input.grossPayment * C.INCOME_TAX_RATE);
  const localTax = floor10(input.grossPayment * C.LOCAL_TAX_RATE);
  const totalTax = incomeTax + localTax;
  return { incomeTax, localTax, totalTax, netPayment: input.grossPayment - totalTax };
}

module.exports = { calc: calc_freelancerTax };
