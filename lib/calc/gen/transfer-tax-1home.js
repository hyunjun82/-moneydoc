// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: transfer-tax-1home
const round = Math.round;

const min = Math.min;

const max = Math.max;

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — transfer-tax-1home
// ═══════════════════════════════════════════════════════════════
function calc_transferTax(input, data) {
  const C = data.constants, T = data.tables;
  const { salePrice, acquisitionPrice, expense, holdingYears, livedYears } = input;
  // 계산기 UI는 taxMode('1home'|'multi'|'adjusted')만 전달한다.
  // 명시적 isOneHome이 없으면 taxMode로 1세대1주택 여부를 판단한다.
  const isOneHome = input.isOneHome !== undefined
    ? input.isOneHome
    : (input.taxMode || '1home') === '1home';

  const gain = salePrice - acquisitionPrice - expense;
  // 소득세법 시행령 §154① — 비과세 요건은 보유 2년.
  // 취득 당시 조정대상지역 주택만 '보유 2년 + 거주 2년'을 함께 요구한다.
  const inAdjustedArea = input.adjustedArea === 'yes' || input.adjustedArea === true;
  const meetsExemption = isOneHome && holdingYears >= 2 && (!inAdjustedArea || livedYears >= 2);
  const isNonTaxable = meetsExemption && salePrice <= C.NON_TAXABLE_LIMIT;

  if (isNonTaxable) {
    return { gain, isNonTaxable: true, taxableGain: 0, ltbcRate: 0, incomeAmount: 0, taxableBase: 0, taxBeforeLocal: 0, localTax: 0, totalTax: 0 };
  }

  // 과세분
  let taxableGain;
  if (meetsExemption && salePrice > C.NON_TAXABLE_LIMIT) {
    taxableGain = round(gain * (salePrice - C.NON_TAXABLE_LIMIT) / salePrice);
  } else {
    taxableGain = gain;
  }

  // LBC율
  let ltbcRate = 0;
  if (isOneHome && holdingYears >= 2 && livedYears >= 2) {
    const holdingPart = min(min(holdingYears, 10) * 0.04, 0.40);
    const livedPart = min(min(livedYears, 10) * 0.04, 0.40);
    ltbcRate = min(holdingPart + livedPart, 0.80);
  } else {
    if (holdingYears >= 3) {
      ltbcRate = min(0.06 + (holdingYears - 3) * 0.02, 0.30);
    } else {
      ltbcRate = 0;
    }
  }

  const incomeAmount = round(taxableGain * (1 - ltbcRate));
  const taxableBase = max(0, incomeAmount - C.BASIC_DEDUCTION);

  let taxBeforeLocal = 0;
  // 단기 양도 (보유 2년 미만): 단기세율 적용
  if (holdingYears < 1) {
    taxBeforeLocal = round(taxableBase * 0.70);
  } else if (holdingYears < 2) {
    taxBeforeLocal = round(taxableBase * 0.60);
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

  return {
    gain, isNonTaxable: false, taxableGain,
    ltbcRate: +ltbcRate.toFixed(4),
    incomeAmount, taxableBase, taxBeforeLocal, localTax, totalTax
  };
}

module.exports = { calc: calc_transferTax };
