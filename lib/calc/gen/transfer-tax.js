// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: transfer-tax
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

// ═══════════════════════════════════════════════════════════════
//  BATCH 6 산식 함수 (71-90)
// ═══════════════════════════════════════════════════════════════
function calc_transferTaxAdjusted(input, data) {
  const C = data.constants, T = data.tables;
  const gain = input.salePrice - input.acquisitionPrice;
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
  const totalIncomeTax = max(0, baseTax + surcharge);
  const localTax = round(totalIncomeTax * C.LOCAL_TAX_RATE);
  return { gain, ltbcRate: +ltbcRate.toFixed(4), incomeAmount, taxableBase, baseTax, surcharge, totalIncomeTax, localTax, totalTax: totalIncomeTax + localTax };
}

// ═══════════════════════════════════════════════════════════════
//  RUNNER
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — transfer-tax (통합: 1세대1주택/조정 다주택/다주택자)
// ═══════════════════════════════════════════════════════════════
function calc_transferTaxUnified(input, data) {
  const mode = input.taxMode || '1home';
  if (mode === 'adjusted') return calc_transferTaxAdjusted(input, data);
  if (mode === 'multi') return calc_transferTaxMulti(input, data);
  return calc_transferTax(input, data); // 1home (기본)
}

// ═══════════════════════════════════════════════════════════════
//  RUNNER
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — transfer-tax (통합: 1세대1주택/조정 다주택/다주택자)
// ═══════════════════════════════════════════════════════════════
function calc_transferTaxUnified(input, data) {
  const mode = input.taxMode || '1home';
  if (mode === 'adjusted') return calc_transferTaxAdjusted(input, data);
  if (mode === 'multi') return calc_transferTaxMulti(input, data);
  return calc_transferTax(input, data); // 1home (기본)
}

module.exports = { calc: calc_transferTaxUnified };
