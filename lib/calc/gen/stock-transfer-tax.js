// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: stock-transfer-tax
const min = Math.min;

const max = Math.max;

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — stock-transfer-tax
// ═══════════════════════════════════════════════════════════════
function calc_stockTransferTax(input, data) {
  // 소득세법 §104①11: 국내 대주주 과세표준 3억 이하 20%, 3억 초과분 25% (초과분에만 25% — 전체가 아니다)
  //   비상장·장외 소액주주 20%, 해외주식 20% (모두 지방소득세 10% 가산 → 22%/27.5%). 국내 상장주식 장내 소액주주 양도는 비과세.
  //   기본공제 연 250만원 (§103①). 중소기업 소액주주 10% 등 특례는 반영하지 않는다.
  const C = data.constants;
  const { stockType = 'domestic', gain = 0, isMajor = false } = input;
  const taxableBase = max(0, gain - C.BASIC_DEDUCTION);
  const major = stockType === 'domestic' && isMajor;
  const lowPart = major ? min(taxableBase, C.MAJOR_HIGH_THRESHOLD) : taxableBase;
  const highPart = major ? max(0, taxableBase - C.MAJOR_HIGH_THRESHOLD) : 0;
  const incomeTax = Math.floor(lowPart * 0.20 + highPart * 0.25);
  const localTax = Math.floor(incomeTax * 0.10);
  return { taxableBase, incomeTax, localTax, totalTax: incomeTax + localTax };
}

module.exports = { calc: calc_stockTransferTax };
