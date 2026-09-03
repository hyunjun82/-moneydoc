// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: annual-leave-allowance
const round = Math.round;

function calc_annualLeaveAllowance(input, data) {
  const C = data.constants;
  const hourlyWage = round(input.monthlySalary / C.MONTHLY_HOURS);
  const dailyWage = hourlyWage * C.DAILY_HOURS;
  return { hourlyWage, dailyWage, allowance: dailyWage * input.unusedDays };
}

module.exports = { calc: calc_annualLeaveAllowance };
