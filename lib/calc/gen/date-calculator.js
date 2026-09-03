// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: date-calculator
function calc_dateDiff(input) {
  const start = new Date(input.startDate);
  const end = new Date(input.endDate);
  const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  const years = Math.floor(diff / 365);
  const months = Math.floor((diff % 365) / 30);
  const days = diff - years * 365 - months * 30;
  return { totalDays: diff, years, months, days };
}

module.exports = { calc: calc_dateDiff };
