// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: transfer-tax-adjusted
const round = Math.round;

const max = Math.max;

// ═══════════════════════════════════════════════════════════════
//  BATCH 6 산식 함수 (71-90)
// ═══════════════════════════════════════════════════════════════
function calc_transferTaxAdjusted(input, data) {
  const C = data.constants, T = data.tables;
  const gain = input.salePrice - input.acquisitionPrice - (input.expense || 0);
  // 소득세법 §95②: 장기보유 특별공제 대상에서 §104⑦ 각 호(조정대상지역 다주택 중과 대상)는 제외한다.
  // 다주택 중과 유예는 2026.5.9 종료되어 2026.5.10 양도분부터 중과세율과 함께 장특공제 배제가 적용된다.
  const ltbcRate = 0;
  const incomeAmount = round(gain * (1 - ltbcRate));
  const taxableBase = max(0, incomeAmount - C.BASIC_DEDUCTION);
  let baseTax = 0;
  for (const b of T.incomeTaxBrackets.brackets) {
    if (b.upperBound === null || taxableBase <= b.upperBound) { baseTax = round(taxableBase * b.rate - b.progressiveDeduction); break; }
  }
  baseTax = max(0, baseTax);
  let surcharge = 0;
  // UI 입력 id 는 homeCount, 검증 케이스는 houseCount 를 쓴다 → 둘 다 허용
  const homes = input.houseCount ?? input.homeCount ?? 0;
  if (homes === 2) surcharge = round(taxableBase * 0.20);
  else if (homes >= 3) surcharge = round(taxableBase * 0.30);
  const heavyTax = max(0, baseTax + surcharge);
  // 소득세법 §104⑦ 후단: 보유 2년 미만이면 중과세율 세액과 단기세율(1년 미만 70%, 2년 미만 60%) 세액 중 큰 것
  const hy = input.holdingYears;
  const shortTermTax = homes >= 2 && hy !== undefined && hy < 2
    ? round(taxableBase * (hy < 1 ? C.SHORT_TERM_UNDER_1Y_RATE : C.SHORT_TERM_1Y_TO_2Y_RATE)) : 0;
  const totalIncomeTax = max(heavyTax, shortTermTax);
  const localTax = round(totalIncomeTax * C.LOCAL_TAX_RATE);
  return { gain, ltbcRate: +ltbcRate.toFixed(4), incomeAmount, taxableBase, baseTax, surcharge, shortTermTax, totalIncomeTax, localTax, totalTax: totalIncomeTax + localTax };
}

module.exports = { calc: calc_transferTaxAdjusted };
