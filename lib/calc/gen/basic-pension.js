// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: basic-pension
const round = Math.round;

const min = Math.min;

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — basic-pension
// ═══════════════════════════════════════════════════════════════
function calc_basicPension(input, data) {
  const C = data.constants;
  const { householdType, incomeAmount } = input;
  const threshold = householdType === 'single' ? C.INCOME_THRESHOLD_SINGLE : C.INCOME_THRESHOLD_COUPLE;
  const isEligible = incomeAmount <= threshold;
  const base = C.MAX_SINGLE_2026 ?? C.MAX_SINGLE_2025;   // 기준연금액 (국민연금 연계 감액 없는 경우)
  // 부부가구는 둘 다 받는 경우: 각자 20% 감액한 금액의 합 (법 §8①)
  const full = householdType === 'single' ? base : (C.MAX_COUPLE_2026 ?? C.MAX_COUPLE_2025);
  let monthlyPension = 0, incomeReduction = 0;
  if (isEligible) {
    monthlyPension = full;
    // 소득역전 방지 감액 (법 §8②, 시행령 §11①②): 소득인정액 + 기초연금액이 선정기준액을 넘으면
    // 선정기준액 − 소득인정액을 준다. 그 금액이 기준연금액의 10%(부부 20%) 이하면 10%(부부 20%)를 준다
    if (incomeAmount + full > threshold) {
      const gap = threshold - incomeAmount;
      const floorAmt = round(base * (householdType === 'single' ? 0.1 : 0.2));
      monthlyPension = min(full, gap <= floorAmt ? floorAmt : gap);
      incomeReduction = full - monthlyPension;
    }
  }
  return { isEligible, monthlyPension, incomeReduction };
}

module.exports = { calc: calc_basicPension };
