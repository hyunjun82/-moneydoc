// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: noranumbrella-tax-saving
const round = Math.round;

const min = Math.min;

function calc_noranumbrellaTaxSaving(input) {
  let limit;
  if (input.businessIncome <= 40000000) limit = 6000000;
  else if (input.businessIncome <= 60000000) limit = 5000000;
  else if (input.businessIncome <= 100000000) limit = 4000000;
  else limit = 2000000;
  const applied = min(input.annualDeposit, limit);
  let marginalRate = 0.06;
  if (input.businessIncome > 14000000) marginalRate = 0.15;
  if (input.businessIncome > 50000000) marginalRate = 0.24;
  if (input.businessIncome > 88000000) marginalRate = 0.35;
  if (input.businessIncome > 150000000) marginalRate = 0.38;
  return { limit, applied, marginalRate, taxSaving: round(applied * marginalRate) };
}

module.exports = { calc: calc_noranumbrellaTaxSaving };
