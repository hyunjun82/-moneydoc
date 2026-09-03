// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: jeonse-loan
const round = Math.round;

const min = Math.min;

function calc_jeonseLoan(input) {
  const { deposit, ratio, limit } = input;
  const raw = round(deposit * ratio);
  return { depositRatio: raw, appliedLimit: min(raw, limit) };
}

module.exports = { calc: calc_jeonseLoan };
