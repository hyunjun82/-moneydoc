// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: loan-refinance
const round = Math.round;

function calc_loanRefinance(input) {
  // 한국 표준 원리금균등: 월별 상환 스케줄에서 매월 이자를 반올림하고
  // 마지막 회차에 잔액을 정산한다 (은행 상환표와 동일).
  const amortize = (balance, annualRate, years) => {
    const r = annualRate / 12, n = years * 12;
    if (r === 0) return { monthly: round(balance / n), totalPayment: balance };
    const pow = Math.pow(1 + r, n);
    const PMT = round((balance * r * pow) / (pow - 1));
    let bal = balance, totalInterest = 0;
    for (let i = 1; i <= n; i++) {
      const intr = round(bal * r);
      const pri = i === n ? bal : PMT - intr;
      bal -= pri;
      totalInterest += intr;
    }
    return { monthly: PMT, totalPayment: balance + totalInterest };
  };
  const o = amortize(input.balance, input.oldRate, input.remainingYears);
  const w = amortize(input.balance, input.newRate, input.remainingYears);
  return {
    oldMonthly: o.monthly, newMonthly: w.monthly,
    monthlySaving: o.monthly - w.monthly,
    oldTotal: o.totalPayment, newTotal: w.totalPayment,
    totalSaving: o.totalPayment - w.totalPayment,
  };
}

module.exports = { calc: calc_loanRefinance };
