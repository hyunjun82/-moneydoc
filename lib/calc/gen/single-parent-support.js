// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: single-parent-support
function calc_singleParentSupport(input, data) {
  const isEligible = input.medianIncomePct <= 60 && input.childAge < 18;
  const monthlySupport = isEligible ? data.constants.MONTHLY_SUPPORT : 0;
  return { isEligible, monthlySupport, annualSupport: monthlySupport * 12 };
}

function calc_singleParentSupport(input, data) {
  const isEligible = input.medianIncomePct <= 60 && input.childAge < 18;
  const monthlySupport = isEligible ? data.constants.MONTHLY_SUPPORT : 0;
  return { isEligible, monthlySupport, annualSupport: monthlySupport * 12 };
}

module.exports = { calc: calc_singleParentSupport };
