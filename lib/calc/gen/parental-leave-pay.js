// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: parental-leave-pay
const round = Math.round;

const min = Math.min;

const max = Math.max;

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — parental-leave-pay
// ═══════════════════════════════════════════════════════════════
function calc_parentalLeavePay(input, data) {
  const C = data.constants;
  const { monthlySalary, leaveMonths } = input;
  // 2026 육아휴직 3단계 (1~3개월/4~6개월/7~12개월)
  const phase1Monthly = max(min(monthlySalary * C.PHASE1_RATE, C.PHASE1_UPPER), C.MIN_PAY);
  const phase2Monthly = max(min(monthlySalary * C.PHASE2_RATE, C.PHASE2_UPPER), C.MIN_PAY);
  const phase3Monthly = max(min(monthlySalary * C.PHASE3_RATE, C.PHASE3_UPPER), C.MIN_PAY);
  const phase1Months = min(leaveMonths, C.PHASE1_MONTHS);
  const phase2Months = max(0, min(leaveMonths - C.PHASE1_MONTHS, C.PHASE2_MONTHS));
  const phase3Months = max(0, leaveMonths - C.PHASE1_MONTHS - C.PHASE2_MONTHS);
  const totalPay = round(phase1Monthly * phase1Months + phase2Monthly * phase2Months + phase3Monthly * phase3Months);
  return {
    phase1Monthly: round(phase1Monthly),
    phase2Monthly: round(phase2Monthly),
    phase3Monthly: round(phase3Monthly),
    totalPay
  };
}

module.exports = { calc: calc_parentalLeavePay };
