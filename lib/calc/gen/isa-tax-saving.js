// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: isa-tax-saving
const round = Math.round;

function calc_isaTaxSaving(input, data) {
  const C = data.constants;
  const { totalInterest, accountType = 'general' } = input;
  const limit = accountType === 'lowincome' ? C.ISA_EXEMPT_LIMIT_LOWINCOME : C.ISA_EXEMPT_LIMIT_GENERAL;
  const generalTax = round(totalInterest * C.GENERAL_RATE);
  const isaTax = totalInterest <= limit ? 0 : round((totalInterest - limit) * C.ISA_RATE);
  return { generalTax, isaTax, savings: generalTax - isaTax };
}

module.exports = { calc: calc_isaTaxSaving };
