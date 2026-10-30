// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: single-parent-support
function calc_singleParentSupport(input, data) {
  // 2026년 한부모가족 복지급여 대상: 소득인정액 기준 중위소득 65% 이하 (2025년 63% → 2026년 65%, 여성가족부·정책브리핑)
  const isEligible = input.medianIncomePct <= 65 && input.childAge < 18;
  const monthlySupport = isEligible ? data.constants.MONTHLY_SUPPORT : 0;
  return { isEligible, monthlySupport, annualSupport: monthlySupport * 12 };
}

function calc_singleParentSupport(input, data) {
  // 2026년 한부모가족 복지급여 대상: 소득인정액 기준 중위소득 65% 이하 (2025년 63% → 2026년 65%, 여성가족부·정책브리핑)
  const isEligible = input.medianIncomePct <= 65 && input.childAge < 18;
  const monthlySupport = isEligible ? data.constants.MONTHLY_SUPPORT : 0;
  return { isEligible, monthlySupport, annualSupport: monthlySupport * 12 };
}

module.exports = { calc: calc_singleParentSupport };
