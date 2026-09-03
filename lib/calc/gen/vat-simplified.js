// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: vat-simplified
const round = Math.round;

function calc_vatSimplified(input) {
  return { payable: round(input.sales * input.vatRate * 0.10) };
}

module.exports = { calc: calc_vatSimplified };
