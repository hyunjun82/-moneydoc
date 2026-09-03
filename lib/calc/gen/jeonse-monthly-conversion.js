// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: jeonse-monthly-conversion
const round = Math.round;

function calc_jeonseMonthlyConversion(input) {
  const conversionAmount = input.jeonseDeposit - input.securityDeposit;
  return { conversionAmount, monthlyRent: round(conversionAmount * input.conversionRate / 12) };
}

module.exports = { calc: calc_jeonseMonthlyConversion };
