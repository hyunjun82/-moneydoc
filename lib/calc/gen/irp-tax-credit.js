// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: irp-tax-credit
const round = Math.round;

const min = Math.min;

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — irp-tax-credit
// ═══════════════════════════════════════════════════════════════
function calc_irpTaxCredit(input, data) {
  const C = data.constants;
  const { irpAmount, pensionAmount, totalSalary } = input;
  const pensionApplied = min(pensionAmount, C.PENSION_LIMIT);
  const combined = pensionApplied + irpAmount;
  const appliedAmount = min(combined, C.TOTAL_LIMIT);
  const rate = totalSalary <= C.INCOME_THRESHOLD ? C.RATE_LOW : C.RATE_HIGH;
  const taxCredit = round(appliedAmount * rate);
  return { appliedAmount, rate, taxCredit };
}

module.exports = { calc: calc_irpTaxCredit };
