// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: severance-pay
const round = Math.round;

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — severance-pay
// ═══════════════════════════════════════════════════════════════
function calc_severance(input, data) {
  // 고용노동부 공식 산식 (https://www.moel.go.kr/retirementpayCal.do) 1:1 복제
  const { hireDate, retireDate, monthlySalary, annualBonus, unusedAnnualLeavePay } = input;
  const sDate = new Date(hireDate);
  const eDate = new Date(retireDate);
  const termDays = Math.ceil((eDate - sDate) / 86400000);
  if (termDays < 365) {
    return { termDays, sumday: 0, threeMonthTotal: 0, avgDailyWage: 0, severance: 0 };
  }

  function isLeaf(y) { return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0; }
  function maxDay(yy, mm) {
    const m = [31, isLeaf(yy) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return m[mm - 1];
  }

  let eyear = eDate.getFullYear();
  let emon = eDate.getMonth() + 1;
  let eday = eDate.getDate();

  let idx;
  if (eday - 1 === 0) { emon = emon - 1; idx = 3; }
  else { idx = 4; }
  if ((emon === 5 && eday === 29 && !isLeaf(eyear)) || (emon === 5 && eday === 30) || (emon === 5 && eday === 31)) {
    idx = 3;
  }

  let segments = [];
  let sumday = 0;
  for (let i = 1; i <= idx; i++) {
    let yy, mm;
    if (emon - idx + i <= 0) { yy = eyear - 1; mm = 12 + (emon - idx + i); }
    else { yy = eyear; mm = emon - idx + i; }

    let dd, dd2;
    if (idx === 3) {
      if (((emon === 5 && eday === 29 && !isLeaf(eyear)) || (emon === 5 && eday === 30) || (emon === 5 && eday === 31)) && i === 3) {
        dd = 1; dd2 = eday - 1;
      } else { dd = 1; dd2 = maxDay(yy, mm); }
    } else {
      if (i === 1) {
        if (eday > maxDay(yy, mm)) dd = maxDay(yy, mm) - (maxDay(eyear, emon) - eday);
        else dd = eday;
        dd2 = maxDay(yy, mm);
      } else if (i === 2 || i === 3) { dd = 1; dd2 = maxDay(yy, mm); }
      else if (i === 4) { dd = 1; dd2 = eday - 1; }
    }

    let cntday = (dd2 !== 0 && dd !== dd2) ? Math.ceil((new Date(yy, mm, dd2) - new Date(yy, mm, dd)) / 86400000) + 1 : 1;
    sumday += cntday;
    segments.push({ yy, mm, cntday });
  }

  // 기본급: 부분월은 일수 비례
  let sumbasic = 0;
  for (const seg of segments) {
    const monthDays = maxDay(seg.yy, seg.mm);
    sumbasic += seg.cntday === monthDays ? monthlySalary : Math.round(monthlySalary * seg.cntday / monthDays);
  }
  const annualBonusPart = annualBonus * 0.25;
  const vacaPart = unusedAnnualLeavePay * 0.25;
  const totalPay = sumbasic + annualBonusPart + vacaPart;

  // myCeil(x, 2): Math.ceil(x*100)/100 — MOEL retire_cal.js 공식
  const avgDailyWage = Math.ceil((totalPay / sumday) * 100) / 100;
  const severance = Math.floor(Math.round(avgDailyWage * 30 * termDays / 365));

  return { termDays, sumday, threeMonthTotal: round(totalPay), avgDailyWage, severance };
}

module.exports = { calc: calc_severance };
