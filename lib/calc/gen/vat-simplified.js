// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: vat-simplified
const round = Math.round;

function calc_vatSimplified(input, data) {
  // 납부세액 = 공급대가 × 업종별 부가가치율 × 10% (부가가치세법 §63②).
  // 해당 과세기간 공급대가 합계가 4,800만원 미만이면 납부의무 면제 (§69①).
  const C = (data && data.constants) || {};
  const computed = round(input.sales * input.vatRate * 0.10);
  const exempt = input.sales < (C.EXEMPT_THRESHOLD || 48000000);
  return { computed, exempt, payable: exempt ? 0 : computed };
}

module.exports = { calc: calc_vatSimplified };
