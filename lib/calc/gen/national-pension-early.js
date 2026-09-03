// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: national-pension-early
const round = Math.round;

function calc_nationalPensionEarly(input, data) {
  const C = data.constants;
  const yearsEarly = C.NORMAL_AGE - input.startAge;
  const reductionRate = +(yearsEarly * C.REDUCTION_PER_YEAR).toFixed(2);
  return { yearsEarly, reductionRate, reducedPension: round(input.normalPension * (1 - reductionRate)) };
}

module.exports = { calc: calc_nationalPensionEarly };
