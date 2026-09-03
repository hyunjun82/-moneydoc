// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: real-estate-roi
function calc_realEstateROI(input) {
  const totalReturn = input.totalRentIncome + input.capitalGain;
  const totalROI = +(totalReturn / input.investedCapital * 100).toFixed(2);
  return { totalReturn, totalROI, annualROI: +(totalROI / input.holdingYears).toFixed(2) };
}

module.exports = { calc: calc_realEstateROI };
