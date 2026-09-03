// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: loan-decline
const round = Math.round;

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — loan-decline
// ═══════════════════════════════════════════════════════════════
function calc_loanDecline(input) {
  const { principal, years, rate } = input;
  const r = rate / 12;
  const n = years * 12;
  const monthlyPrincipal = round(principal / n);
  const firstInterest = round(principal * r);
  const firstPayment = monthlyPrincipal + firstInterest;
  const lastInterest = round(monthlyPrincipal * r);
  const lastPayment = monthlyPrincipal + lastInterest;
  const totalInterest = round(principal * r * (n + 1) / 2);
  const totalPayment = principal + totalInterest;
  return { firstPayment, lastPayment, totalInterest, totalPayment };
}

module.exports = { calc: calc_loanDecline };
