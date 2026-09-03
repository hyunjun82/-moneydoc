// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: crypto-transfer-tax
const round = Math.round;

const max = Math.max;

function calc_cryptoTransferTax(input, data) {
  const C = data.constants;
  const taxableBase = max(0, input.gain - C.BASIC_DEDUCTION);
  const incomeTax = round(taxableBase * C.INCOME_TAX_RATE);
  const localTax = round(taxableBase * C.LOCAL_TAX_RATE);
  return { taxableBase, incomeTax, localTax, totalTax: incomeTax + localTax };
}

function calc_cryptoTransferTax(input, data) {
  const C = data.constants;
  const taxableBase = max(0, input.gain - C.BASIC_DEDUCTION);
  const incomeTax = round(taxableBase * C.INCOME_TAX_RATE);
  const localTax = round(taxableBase * C.LOCAL_TAX_RATE);
  return { taxableBase, incomeTax, localTax, totalTax: incomeTax + localTax };
}

module.exports = { calc: calc_cryptoTransferTax };
