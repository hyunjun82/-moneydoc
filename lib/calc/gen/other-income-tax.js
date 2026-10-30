// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: other-income-tax
const round = Math.round;

function calc_otherIncomeTax(input, data) {
  const C = data.constants;
  const expense = round(input.revenue * C.EXPENSE_RATE);
  const incomeAmount = input.revenue - expense;
  const minTaxable = C.MIN_TAXABLE || 50000;
  // 소득세법 §84 3호: 기타소득금액이 건별로 5만원 "이하"면 과세하지 않는다
  const incomeTax = incomeAmount <= minTaxable ? 0 : round(incomeAmount * C.INCOME_TAX_RATE);
  const localTax = incomeAmount <= minTaxable ? 0 : round(incomeAmount * C.LOCAL_TAX_RATE);
  return { expense, incomeAmount, incomeTax, localTax, totalTax: incomeTax + localTax };
}

module.exports = { calc: calc_otherIncomeTax };
