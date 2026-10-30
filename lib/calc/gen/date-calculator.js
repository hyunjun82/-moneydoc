// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: date-calculator
const round = Math.round;

const min = Math.min;

function calc_dateDiff(input) {
  const start = new Date(input.startDate);
  const end = new Date(input.endDate);
  const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  // 년·개월·일은 달력으로 센다 (예전엔 365일=1년, 30일=1개월로 나눠 2024.1.1~2025.1.1 이 "1년 0개월 1일"로 나왔다)
  // 날짜 문자열을 UTC 로 읽고 UTC 로만 다뤄 시간대와 상관없게 한다
  let a = start, b = end, sign = 1;
  if (b < a) { a = end; b = start; sign = -1; }
  // 개월 수: 끝 날짜의 '일'이 시작 날짜의 '일'보다 작으면 그달은 아직 다 안 찬 것
  let total = (b.getUTCFullYear() - a.getUTCFullYear()) * 12 + (b.getUTCMonth() - a.getUTCMonth());
  if (b.getUTCDate() < a.getUTCDate()) total -= 1;
  // 시작일에서 total 개월 뒤 날짜 (그달에 같은 날이 없으면 말일) 부터 남은 날수
  const ty = a.getUTCFullYear() + Math.floor((a.getUTCMonth() + total) / 12), tm = (a.getUTCMonth() + total) % 12;
  const lastDay = new Date(Date.UTC(ty, tm + 1, 0)).getUTCDate();
  const anchor = Date.UTC(ty, tm, Math.min(a.getUTCDate(), lastDay));
  const days = Math.round((b - anchor) / 86400000);
  const years = Math.floor(total / 12), months = total % 12;
  return { totalDays: diff, years: sign * years, months: sign * months, days: sign * days };
}

module.exports = { calc: calc_dateDiff };
