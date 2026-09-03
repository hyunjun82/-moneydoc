// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: unpaid-wages
const round = Math.round;

function calc_unpaidWages(input, data) {
  const interest = round(input.unpaidAmount * data.constants.DELAY_RATE * input.delayDays / 365);
  return { unpaidAmount: input.unpaidAmount, interest, total: input.unpaidAmount + interest };
}

module.exports = { calc: calc_unpaidWages };
