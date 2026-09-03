// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: retirement-income-tax
const round = Math.round;

const max = Math.max;

function calc_retirementIncomeTax(input) {
  const yrs = input.workYears;
  let yearsDed;
  if (yrs <= 5) yearsDed = 1000000 * yrs;
  else if (yrs <= 10) yearsDed = 5000000 + 2000000 * (yrs - 5);
  else if (yrs <= 20) yearsDed = 15000000 + 2500000 * (yrs - 10);
  else yearsDed = 40000000 + 3000000 * (yrs - 20);
  const annualConverted = (input.severance - yearsDed) * 12 / yrs;
  if (annualConverted <= 0) return { yearsDed, annualConverted: 0, taxableBase: 0, tax: 0 };
  let convDed;
  if (annualConverted <= 8000000) convDed = annualConverted;
  else if (annualConverted <= 70000000) convDed = 8000000 + (annualConverted - 8000000) * 0.6;
  else if (annualConverted <= 100000000) convDed = 45200000 + (annualConverted - 70000000) * 0.55;
  else if (annualConverted <= 300000000) convDed = 61700000 + (annualConverted - 100000000) * 0.45;
  else convDed = 151700000 + (annualConverted - 300000000) * 0.35;
  const taxable = max(0, annualConverted - convDed);
  let baseTax = 0;
  const br = [[14000000, 0.06, 0], [50000000, 0.15, 1260000], [88000000, 0.24, 5760000], [150000000, 0.35, 15440000], [300000000, 0.38, 19940000], [500000000, 0.40, 25940000], [1000000000, 0.42, 35940000], [Infinity, 0.45, 65940000]];
  for (const [u, rt, d] of br) { if (taxable <= u) { baseTax = taxable * rt - d; break; } }
  const tax = round(baseTax / 12 * yrs);
  const localTax = round(tax * 0.10);
  return { yearsDed, annualConverted: round(annualConverted), taxableBase: round(taxable), tax, localTax, totalTax: tax + localTax };
}

module.exports = { calc: calc_retirementIncomeTax };
