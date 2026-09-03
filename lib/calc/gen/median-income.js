// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: median-income
const round = Math.round;

// ═══════════════════════════════════════════════════════════════
//  복지 신규 3개 (중위소득·차상위·기초생활수급자)
// ═══════════════════════════════════════════════════════════════
function calc_medianIncome(input, data) {
  const median100 = data.tables.median100[input.householdSize] || 7618369;
  return {
    median100,
    median50: round(median100 * 0.50),
    median48: round(median100 * 0.48),
    median40: round(median100 * 0.40),
    median32: round(median100 * 0.32),
    userPct: +(input.incomeAmount / median100 * 100).toFixed(1)
  };
}

module.exports = { calc: calc_medianIncome };
