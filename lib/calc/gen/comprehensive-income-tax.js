// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: comprehensive-income-tax
const round = Math.round;

const max = Math.max;

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — comprehensive-income-tax
// ═══════════════════════════════════════════════════════════════
function calc_compIncome(input, data) {
  const C = data.constants, T = data.tables;
  const { income, dependents, kids, extraDeduction = 0, extraTaxCredit = 0 } = input;
  const personalDeduction = dependents * C.PERSONAL_DEDUCTION;
  const taxableIncome = max(0, income - personalDeduction - extraDeduction);

  let taxBeforeCredit = 0;
  for (const b of T.incomeTaxBrackets.brackets) {
    if (b.upperBound === null || taxableIncome <= b.upperBound) {
      taxBeforeCredit = round(taxableIncome * b.rate - b.progressiveDeduction);
      break;
    }
  }

  let childCredit = 0;
  const arr = T.childTaxCredit.amounts;
  const f = arr.find(a => a.kids === kids);
  if (f) childCredit = f.credit;
  else {
    const last = arr[arr.length - 1];
    childCredit = last.credit + (kids - last.kids) * T.childTaxCredit.additionalPerKid;
  }

  const standardCredit = C.STANDARD_TAX_CREDIT || 70000;
  const decisionTax = round(max(0, taxBeforeCredit - childCredit - standardCredit - extraTaxCredit));
  const localTax = round(decisionTax * C.LOCAL_TAX_RATE);
  const totalTax = decisionTax + localTax;

  return { taxableIncome, taxBeforeCredit, childCredit, standardCredit, decisionTax, localTax, totalTax };
}

module.exports = { calc: calc_compIncome };
