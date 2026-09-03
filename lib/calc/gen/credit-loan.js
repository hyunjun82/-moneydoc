// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: credit-loan
const round = Math.round;

function calc_creditLoan(input) {
  return { maxLoan: round(input.annualIncome * input.multiplier) };
}

module.exports = { calc: calc_creditLoan };
