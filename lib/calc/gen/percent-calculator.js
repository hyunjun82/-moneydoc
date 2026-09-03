// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: percent-calculator
// ═══════════════════════════════════════════════════════════════
//  도구성 5개 (퍼센트·나이·날짜·할부·현금서비스)
// ═══════════════════════════════════════════════════════════════
function calc_percent(input) {
  const { mode, a, b } = input;
  if (mode === "percentOf") return { result: +(a * b / 100).toFixed(2) };
  if (mode === "ratio") return { result: +(a / b * 100).toFixed(2) };
  if (mode === "increase") return { result: +((b - a) / a * 100).toFixed(2) };
  if (mode === "afterIncrease") return { result: +(a * (1 + b/100)).toFixed(2) };
  return { result: 0 };
}

module.exports = { calc: calc_percent };
