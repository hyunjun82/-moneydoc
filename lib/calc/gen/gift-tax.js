// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: gift-tax
const min = Math.min;

const max = Math.max;

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — gift-tax
// ═══════════════════════════════════════════════════════════════
function calc_giftTax(input, data) {
  // 홈택스 증여세 간편계산과 1:1 (scripts/verify-system/adapters/hometax-gift-tax.mjs 로 0원 대조)
  // 산출세액·신고세액공제(3%, 상증세법 §69)는 원단위 절사
  const C = data.constants || {}, T = data.tables;
  const { giftAmount, relation } = input;
  const rule = T.deductions.rules.find(r => r.relation === relation);
  const deduction = min(rule ? rule.deduction : 0, giftAmount);
  const taxableBase = max(0, giftAmount - deduction);
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
  return { deduction, taxableBase, tax, filingCredit, payableTax };
}

module.exports = { calc: calc_giftTax };
