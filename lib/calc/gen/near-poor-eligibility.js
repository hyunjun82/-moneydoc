// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: near-poor-eligibility
const round = Math.round;

function calc_nearPoor(input, data) {
  const median100 = data.tables.median100[input.householdSize] || 7618369;
  const threshold = round(median100 * 0.50);
  return {
    threshold,
    isEligible: input.incomeAmount <= threshold,
    incomePct: Math.round(input.incomeAmount / median100 * 1000) / 10
  };
}

module.exports = { calc: calc_nearPoor };
