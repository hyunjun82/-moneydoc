// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: business-income-tax-simple
const round = Math.round;

const max = Math.max;

function calc_businessIncomeTaxSimple(input) {
  const profit = round(input.revenue * (1 - input.expenseRate));
  const taxable = max(0, profit - input.dependents * 1500000);
  let baseTax = 0;
  // 소득세법 §55① 8단계 누진세율 (5억 초과 42%, 10억 초과 45% 포함)
  const br = [[14000000, 0.06, 0], [50000000, 0.15, 1260000], [88000000, 0.24, 5760000], [150000000, 0.35, 15440000], [300000000, 0.38, 19940000], [500000000, 0.40, 25940000], [1000000000, 0.42, 35940000], [Infinity, 0.45, 65940000]];
  for (const [u, rt, d] of br) { if (taxable <= u) { baseTax = round(taxable * rt - d); break; } }
  baseTax = max(0, baseTax);
  // 표준세액공제 7만 (소득세법 §59의4 ⑨)
  const tax = max(0, baseTax - 70000);
  const localTax = round(tax * 0.10);
  return { profit, taxable, tax, localTax, total: tax + localTax };
}

module.exports = { calc: calc_businessIncomeTaxSimple };
