// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: unemployment-benefit
const round = Math.round;

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — unemployment-benefit
// ═══════════════════════════════════════════════════════════════
function calc_unemployment(input, data) {
  const C = data.constants, T = data.tables;
  const { monthlySalary, insuredYears, isElderlyOrDisabled } = input;
  const rawDailyWage = round(monthlySalary * 3 / 90);
  const rawBenefit = round(rawDailyWage * C.BENEFIT_RATE);
  let dailyBenefit = rawBenefit;
  // 2026: 하한 = 최저임금 10,320×8×80% = 66,048 / 상한 = 기초일액 상한 113,500×60% = 68,100 (시행령 §68, 2025.12.23 개정)
  const lowerLimit = C.DAILY_LOWER_LIMIT;
  const upperLimit = C.DAILY_UPPER_LIMIT;
  if (dailyBenefit < lowerLimit) dailyBenefit = lowerLimit;
  if (dailyBenefit > upperLimit) dailyBenefit = upperLimit;

  let benefitDays = 120;
  for (const r of T.benefitDays.rules) {
    const lower = r.minYears <= insuredYears;
    const upper = r.maxYears === null || insuredYears < r.maxYears;
    if (lower && upper) { benefitDays = r.days; break; }
  }
  // 고용보험법 별표1: 50세 이상·장애인 가산 30일은 가입 1년 이상부터 (1년 미만은 120일 동일) — 고용24 모의계산 대조
  if (isElderlyOrDisabled && insuredYears >= 1) benefitDays += C.ELDERLY_DISABLED_BONUS_DAYS;

  const totalBenefit = dailyBenefit * benefitDays;
  return { rawDailyWage, rawBenefit, dailyBenefit, benefitDays, totalBenefit };
}

module.exports = { calc: calc_unemployment };
