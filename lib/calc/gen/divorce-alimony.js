// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: divorce-alimony
const round = Math.round;

function calc_divorceAlimony(input) {
  let baseAmount;
  if (input.marriageYears < 5) baseAmount = 10000000;
  else if (input.marriageYears < 10) baseAmount = 20000000;
  else if (input.marriageYears < 20) baseAmount = 20000000;
  else baseAmount = 33333333;
  const fd = input.faultDegree;
  const faultMultiplier = (fd === "high" || fd === "높음") ? 1.5 : ((fd === "medium" || fd === "보통") ? 1.0 : 0.5);
  return { baseAmount, faultMultiplier, estimatedAmount: round(baseAmount * faultMultiplier) };
}

module.exports = { calc: calc_divorceAlimony };
