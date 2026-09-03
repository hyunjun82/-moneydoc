// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: simple-vs-compound
const round = Math.round;

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — simple-vs-compound
// ═══════════════════════════════════════════════════════════════
function calc_simpleVsCompound(input) {
  const { principal, years, rate } = input;
  const simpleInterest = round(principal * rate * years);
  const simpleMaturity = principal + simpleInterest;
  const r = rate / 12;
  const n = years * 12;
  const compoundMaturity = round(principal * Math.pow(1 + r, n));
  const compoundInterest = compoundMaturity - principal;
  const diff = compoundInterest - simpleInterest;
  return { simpleInterest, simpleMaturity, compoundInterest, compoundMaturity, diff };
}

module.exports = { calc: calc_simpleVsCompound };
