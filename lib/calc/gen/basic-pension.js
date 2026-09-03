// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: basic-pension
// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — basic-pension
// ═══════════════════════════════════════════════════════════════
function calc_basicPension(input, data) {
  const C = data.constants;
  const { householdType, incomeAmount } = input;
  const threshold = householdType === 'single' ? C.INCOME_THRESHOLD_SINGLE : C.INCOME_THRESHOLD_COUPLE;
  const isEligible = incomeAmount <= threshold;
  const monthlyPension = isEligible
    ? (householdType === 'single'
        ? (C.MAX_SINGLE_2026 ?? C.MAX_SINGLE_2025)
        : (C.MAX_COUPLE_2026 ?? C.MAX_COUPLE_2025))
    : 0;
  return { isEligible, monthlyPension };
}

module.exports = { calc: calc_basicPension };
