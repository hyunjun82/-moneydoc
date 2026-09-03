// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: national-pension
const round = Math.round;

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — national-pension
// ═══════════════════════════════════════════════════════════════
function calc_nationalPension(input, data) {
  const C = data.constants;
  const { monthsContributed, avgIncome } = input;
  const yearsContributed = monthsContributed / 12;
  let P;
  if (monthsContributed >= C.BASE_MONTHS) {
    P = 1 + C.BONUS_PER_YEAR_AFTER_20 * (yearsContributed - 20);
  } else {
    P = monthsContributed / C.BASE_MONTHS;
  }
  const monthlyPension = Math.floor(round(C.PROPORTION_2026 * (C.A_VALUE_2026 + avgIncome) * P / 12) / 10) * 10;
  const annualPension = monthlyPension * 12;
  return { P: +P.toFixed(4), monthlyPension, annualPension };
}

module.exports = { calc: calc_nationalPension };
