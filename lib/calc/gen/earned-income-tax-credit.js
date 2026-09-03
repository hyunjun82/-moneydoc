// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: earned-income-tax-credit
const round = Math.round;

const max = Math.max;

function calc_earnedIncomeTaxCredit(input, data) {
  // 정부 2026 점증·평탄·점감 3단계 (조특법 §100의3)
  const limits = data.tables.limits[input.householdType];
  const limit = limits.income, maxAmount = limits.max;
  const phaseIn = limits.phaseIn, phaseFlatEnd = limits.phaseFlatEnd;
  const isEligible = input.totalIncome <= limit;
  let estimatedAmount = 0;
  if (isEligible) {
    if (input.totalIncome <= phaseIn) estimatedAmount = round(maxAmount * (input.totalIncome / phaseIn));
    else if (input.totalIncome <= phaseFlatEnd) estimatedAmount = maxAmount;
    else estimatedAmount = round(maxAmount * (1 - (input.totalIncome - phaseFlatEnd) / (limit - phaseFlatEnd)));
  }
  return { limit, maxAmount, isEligible, estimatedAmount };
}

module.exports = { calc: calc_earnedIncomeTaxCredit };
