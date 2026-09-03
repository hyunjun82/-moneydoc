// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: industrial-accident-pay
const round = Math.round;

const max = Math.max;

function calc_industrialAccidentPay(input, data) {
  // 산재보험법 §52 — 평균임금 × 70%, 최저보상 적용 (2026 최저시급 10,320 × 8h = 82,560원/일)
  const C = data.constants;
  const dailyAvgWage = round(input.monthlySalary / 30);
  const dailyBenefit = max(round(dailyAvgWage * C.BENEFIT_RATE), C.DAILY_MIN_2026 || 82560);
  return { dailyAvgWage, dailyBenefit, totalBenefit: dailyBenefit * input.injuryDays };
}

module.exports = { calc: calc_industrialAccidentPay };
