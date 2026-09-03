// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: tax-free-savings
const round = Math.round;

// ═══════════════════════════════════════════════════════════════
//  BATCH 4 산식 함수
// ═══════════════════════════════════════════════════════════════
function calc_taxFreeSavings(input) {
  const { monthlyDeposit, months, rate, mode = 'simple' } = input;
  const principal = monthlyDeposit * months;
  const r_m = rate / 12;
  let interest;
  if (mode === 'simple') {
    interest = round(monthlyDeposit * r_m * months * (months + 1) / 2);
  } else {
    if (r_m === 0) interest = 0;
    else {
      const future = monthlyDeposit * (Math.pow(1 + r_m, months) - 1) / r_m * (1 + r_m);
      interest = round(future - principal);
    }
  }
  return { principal, interest, maturity: principal + interest };
}

module.exports = { calc: calc_taxFreeSavings };
