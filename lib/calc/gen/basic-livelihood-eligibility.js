// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: basic-livelihood-eligibility
const round = Math.round;

function calc_basicLivelihood(input, data) {
  const median100 = data.tables.median100[input.householdSize] || 7618369;
  // 2026년 급여별 선정기준 (보건복지부): 생계 32% / 의료 40% / 주거 48% / 교육 50%
  const livelihood32 = round(median100 * 0.32);
  const medical40 = round(median100 * 0.40);
  const housing48 = round(median100 * 0.48);
  const education50 = round(median100 * 0.50);
  return {
    median100,
    livelihood: { threshold: livelihood32, isEligible: input.incomeAmount <= livelihood32 },
    medical: { threshold: medical40, isEligible: input.incomeAmount <= medical40 },
    housing: { threshold: housing48, isEligible: input.incomeAmount <= housing48 },
    education: { threshold: education50, isEligible: input.incomeAmount <= education50 }
  };
}

module.exports = { calc: calc_basicLivelihood };
