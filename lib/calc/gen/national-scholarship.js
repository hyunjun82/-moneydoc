// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: national-scholarship
const min = Math.min;

function calc_nationalScholarship(input, data) {
  const tier = input.incomeTier;
  const tuition = input.semesterTuition;
  const tierSupport = data.tables.tierSupport[tier] || 0;
  return { tier, support: min(tierSupport, tuition) };
}

module.exports = { calc: calc_nationalScholarship };
