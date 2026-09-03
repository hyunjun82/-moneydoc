// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: transfer-tax-multi
const round = Math.round;

const min = Math.min;

const max = Math.max;

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — transfer-tax-multi
// ═══════════════════════════════════════════════════════════════
function calc_transferTaxMulti(input, data) {
  const C = data.constants, T = data.tables;
  const { salePrice, acquisitionPrice, expense, holdingYears } = input;
  const gain = salePrice - acquisitionPrice - expense;

  // LBC 일반표
  let ltbcRate = 0;
  if (holdingYears >= 3) {
    ltbcRate = min(0.06 + (holdingYears - 3) * 0.02, 0.30);
  }

  const incomeAmount = round(gain * (1 - ltbcRate));
  const taxableBase = max(0, incomeAmount - C.BASIC_DEDUCTION);

  let taxBeforeLocal = 0;
  if (holdingYears < 1) {
    taxBeforeLocal = round(taxableBase * C.SHORT_TERM_UNDER_1Y_RATE);
  } else if (holdingYears < 2) {
    taxBeforeLocal = round(taxableBase * C.SHORT_TERM_1Y_TO_2Y_RATE);
  } else {
    for (const b of T.incomeTaxBrackets.brackets) {
      if (b.upperBound === null || taxableBase <= b.upperBound) {
        taxBeforeLocal = round(taxableBase * b.rate - b.progressiveDeduction);
        break;
      }
    }
  }
  taxBeforeLocal = max(0, taxBeforeLocal);
  const localTax = round(taxBeforeLocal * C.LOCAL_TAX_RATE);
  const totalTax = taxBeforeLocal + localTax;
  return { gain, ltbcRate: +ltbcRate.toFixed(4), incomeAmount, taxableBase, taxBeforeLocal, localTax, totalTax };
}

module.exports = { calc: calc_transferTaxMulti };
