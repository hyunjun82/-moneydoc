// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: inheritance-tax
const min = Math.min;

const max = Math.max;

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — inheritance-tax
// ═══════════════════════════════════════════════════════════════
function calc_inheritanceTax(input, data) {
  // 홈택스 상속세 간편계산과 1:1 (scripts/verify-system/adapters/hometax-inheritance-tax.mjs 로 0원 대조)
  //  - 장례비용 최소 500만원 공제 (상증세법 시행령 §9) → 과세가액 = 상속재산 − 장례비
  //  - 배우자공제 = max(5억, min(법정지분(절사), 30억)), 배우자가 법정지분 이상 실제 상속한다고 가정
  //  - 상속공제 합계는 과세가액을 넘지 못함 (상증세법 §24)
  //  - 산출세액·신고세액공제(3%)는 원단위 절사
  const C = data.constants, T = data.tables;
  const { totalEstate, hasSpouse, children, parents } = input;
  const funeral = C.FUNERAL_MIN_DEDUCTION || 5000000;
  const taxableValue = max(0, totalEstate - funeral);
  let spouseDeduction = 0;
  if (hasSpouse) {
    let spouseShareRatio = 1.0;
    if (children > 0) spouseShareRatio = 1.5 / (children * 1.0 + 1.5);
    else if (parents > 0) spouseShareRatio = 1.5 / (parents * 1.0 + 1.5);
    const legalShare = Math.floor(totalEstate * spouseShareRatio);
    spouseDeduction = min(C.SPOUSE_MAX, max(C.SPOUSE_MIN, legalShare));
  }
  const personalDed = (children * (C.CHILD_DEDUCTION_PER || 50000000)) +
    ((input.minorYearsTotal || 0) * (C.MINOR_DEDUCTION_PER_YEAR || 10000000)) +
    ((input.elderlyCount || 0) * (C.ELDERLY_DEDUCTION_PER || 50000000)) +
    ((input.disabledExpectedYears || 0) * (C.DISABLED_DEDUCTION_PER_YEAR || 10000000));
  const baseDed = Math.max(C.LUMP_SUM_DEDUCTION || 500000000, C.BASIC_DEDUCTION + personalDed);
  const deductionSum = baseDed + spouseDeduction;
  const deduction = min(deductionSum, taxableValue);
  const taxableBase = max(0, taxableValue - deduction);
  let tax = 0;
  if (taxableBase > 0) {
    for (const b of T.brackets.brackets) {
      if (b.upperBound === null || taxableBase <= b.upperBound) {
        tax = Math.floor(taxableBase * b.rate - b.progressiveDeduction);
        break;
      }
    }
    tax = max(0, tax);
  }
  const filingCredit = Math.floor(tax * (C.FILING_CREDIT_RATE || 0.03));
  const payableTax = tax - filingCredit;
  return { funeral, taxableValue, deduction, spouseDeduction, taxableBase, tax, filingCredit, payableTax };
}

module.exports = { calc: calc_inheritanceTax };
