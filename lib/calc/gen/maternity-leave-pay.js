// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: maternity-leave-pay
const round = Math.round;

const min = Math.min;

const max = Math.max;

function calc_maternityLeavePay(input) {
  // 고용보험법 §75 (2026: 월 220만 한도) - 고용24 모의계산 일치
  // 정부 산식: 월 통상임금 한도(220만) × 휴가일수 / 30 (월 단위 처리)
  // 우선지원대상기업: 90/120일 모두 정부 + 첫 60일 차액 사업주
  // 대기업: 60일 사업주 100% + 마지막 30/60일 정부 한도
  // 통상임금이 최저임금 월환산액(10,320원×209h = 2,156,880원, 2026)보다 낮으면 최저임금으로 산정 — 고용24 모의계산 실측(200만 → 2,156,880×3)
  const MIN_WAGE_MONTHLY = 2156880;
  const salary = max(input.monthlySalary, MIN_WAGE_MONTHLY);
  const days = input.isMultiple ? 120 : 90;
  const govDays = days - 60;
  const monthlyUpper = 2200000;
  const cappedMonthly = min(salary, monthlyUpper);
  const dailyWage = round(salary / 209 * 8);
  const isSME = input.isSME !== false;
  let govPay, companyPay;
  if (isSME) {
    // 우선지원대상기업: 정부 한도 × 일수/30
    govPay = round(cappedMonthly * days / 30);
    companyPay = round(max(0, salary - monthlyUpper) * 60 / 30);
  } else {
    // 대기업: 60일 사업주 100% + 마지막 30/60일 정부 한도
    companyPay = round(salary * 60 / 30);
    govPay = round(cappedMonthly * govDays / 30);
  }
  return { totalDays: days, appliedSalary: salary, dailyWage, govPay, companyPay, total: govPay + companyPay };
}

module.exports = { calc: calc_maternityLeavePay };
