// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: grace-period-loan
const round = Math.round;

function calc_gracePeriodLoan(input) {
  const r = input.rate / 12;
  const graceMonths = input.graceYears * 12;
  const repayMonths = input.repayYears * 12;
  const graceMonthlyInterest = round(input.principal * r);
  const totalGraceInterest = graceMonthlyInterest * graceMonths;
  const pow = Math.pow(1 + r, repayMonths);
  const M = input.principal * r * pow / (pow - 1);
  const repayMonthly = round(M);
  const totalRepayPayment = round(M * repayMonths);
  return { graceMonthlyInterest, totalGraceInterest, repayMonthly, totalInterest: totalGraceInterest + totalRepayPayment - input.principal };
}

module.exports = { calc: calc_gracePeriodLoan };
