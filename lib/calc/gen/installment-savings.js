// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: installment-savings
const round = Math.round;

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — installment-savings
// ═══════════════════════════════════════════════════════════════
function calc_installmentSavings(input, data) {
  const { monthlyDeposit, months, rate, mode = 'compound', taxFree = 'no' } = input;
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
  const taxRate = taxFree === 'yes' ? 0 : data.constants.INTEREST_TAX_RATE;
  // 이자소득세는 floor (10원 미만 절사) — 한국 세법 표준
  const tax = Math.floor(interest * taxRate);
  const maturity = principal + interest - tax;
  return { principal, interest, tax, maturity };
}

module.exports = { calc: calc_installmentSavings };
