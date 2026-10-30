// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: fixed-deposit
const round = Math.round;

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — installment-savings
// ═══════════════════════════════════════════════════════════════
// 비과세종합저축은 1명당 저축원금 5,000만원 이하만 (조특법 §88의2①). 넘는 원금은 일반 과세 계좌로 보고
// 그 비율만큼의 이자에 이자소득세를 뗀다. 이자는 원금(월 납입액)에 비례하므로 비율로 나누면 두 계좌로 나눈 것과 같다
const TAX_FREE_SAVINGS_LIMIT = 50000000;

function taxableInterestOf(interest, principal, taxFree) {
  if (taxFree !== 'yes') return interest;
  if (principal <= TAX_FREE_SAVINGS_LIMIT) return 0;
  return round(interest * (principal - TAX_FREE_SAVINGS_LIMIT) / principal);
}

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — fixed-deposit
// ═══════════════════════════════════════════════════════════════
function calc_fixedDeposit(input, data) {
  const { principal, years, rate, taxFree = 'no' } = input;
  const interest = round(principal * rate * years);
  const taxableInterest = taxableInterestOf(interest, principal, taxFree);
  const tax = round(taxableInterest * data.constants.INTEREST_TAX_RATE);
  const maturity = principal + interest - tax;
  return { interest, ...(taxFree === 'yes' ? { taxableInterest } : {}), tax, maturity };
}

module.exports = { calc: calc_fixedDeposit };
