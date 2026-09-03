// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: rental-yield
// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — rental-yield
// ═══════════════════════════════════════════════════════════════
function calc_rentalYield(input) {
  const { purchasePrice, deposit, monthlyRent, annualExpense } = input;
  const investedCapital = purchasePrice - deposit;
  const annualRentIncome = monthlyRent * 12;
  const netAnnualIncome = annualRentIncome - annualExpense;
  const grossYieldPct = +(annualRentIncome / investedCapital * 100).toFixed(2);
  const netYieldPct = +(netAnnualIncome / investedCapital * 100).toFixed(2);
  return { investedCapital, annualRentIncome, netAnnualIncome, grossYieldPct, netYieldPct };
}

module.exports = { calc: calc_rentalYield };
