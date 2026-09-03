// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: vat-general
function calc_vatGeneral(input) {
  return { payable: input.saleVat - input.purchaseVat };
}

module.exports = { calc: calc_vatGeneral };
