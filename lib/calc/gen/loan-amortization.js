// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: loan-amortization
const round = Math.round;

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — loan-amortization
// ═══════════════════════════════════════════════════════════════
// HF 일할 산식 (윤년 366 / 평년 365 / floor / 마지막 회차 만기일 정산)
//   1억/30년/4%/2026-05-08 → HF 360/360 회차 0원 일치 (역공학 검증 완료)
function _isLeap(y) { return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0; }

function _hfAmortization(principal, annualRate, years, loanDateStr, paymentDay) {
  const start = new Date(loanDateStr);
  const startDay = start.getDate();
  const r = annualRate / 12;
  const n = years * 12;
  const pow = Math.pow(1 + r, n);
  const PMT = round(principal * r * pow / (pow - 1));
  const firstMonth = (start.getDate() < paymentDay) ? start.getMonth() + 1 : start.getMonth() + 2;
  let balance = principal, totalInterest = 0;
  let cur = new Date(start);
  for (let i = 1; i <= n; i++) {
    const pay = (i === n)
      ? new Date(start.getFullYear() + years, start.getMonth(), startDay)
      : new Date(start.getFullYear(), firstMonth + (i - 1), paymentDay);
    const days = Math.round((pay - cur) / 86400000);
    const dayBasis = _isLeap(cur.getFullYear()) ? 366 : 365;
    const mInterest = Math.floor(balance * annualRate / dayBasis * days);
    let principalPaid;
    if (i === 1) {
      const stdInt = Math.floor(balance * annualRate / dayBasis * 31);
      principalPaid = PMT - stdInt;
    } else if (i === n) {
      principalPaid = balance;
    } else {
      principalPaid = PMT - mInterest;
    }
    balance -= principalPaid;
    totalInterest += mInterest;
    cur = pay;
  }
  return { monthly: PMT, totalPayment: principal + totalInterest, totalInterest };
}

function calc_loanAmortization(input) {
  const { principal, years, rate, mode = 'amortization', graceYears = 0,
          calcMethod = 'standard', loanDate = '', paymentDay = 1 } = input;
  const modeKr = { amortization: '원리금균등', decline: '원금균등', balloon: '만기일시', grace: '거치식' }[mode] || mode;
  const r = rate / 12;
  const n = years * 12;
  if (mode === 'amortization') {
    if (r === 0) {
      const monthly = round(principal / n);
      return { mode: modeKr, monthly, totalPayment: principal, totalInterest: 0 };
    }
    // HF 일할 모드 (loanDate 입력 시 사용 가능)
    if (calcMethod === 'hf' && loanDate) {
      const hf = _hfAmortization(principal, rate, years, loanDate, paymentDay || 1);
      return { mode: modeKr, ...hf, calcMethod: 'hf-daily' };
    }
    const pow = Math.pow(1 + r, n);
    const PMT = round(principal * r * pow / (pow - 1));
    // 한국 표준: 회차별 round(잔액 × r) 누적 + 마지막 회차 잔금 정산
    let balance = principal;
    let totalInterest = 0;
    for (let i = 1; i <= n; i++) {
      const mInterest = round(balance * r);
      let principalPaid;
      if (i === n) {
        principalPaid = balance; // 마지막 회차 잔금 정산
      } else {
        principalPaid = PMT - mInterest;
      }
      balance -= principalPaid;
      totalInterest += mInterest;
    }
    return { mode: modeKr, monthly: PMT, totalPayment: principal + totalInterest, totalInterest, calcMethod: 'standard-pmt' };
  } else if (mode === 'decline') {
    const monthlyPrincipal = round(principal / n);
    let balance = principal;
    let totalInterest = 0;
    let firstPayment = 0, lastPayment = 0;
    for (let i = 1; i <= n; i++) {
      const mInterest = round(balance * r);
      const payment = monthlyPrincipal + mInterest;
      if (i === 1) firstPayment = payment;
      if (i === n) lastPayment = payment;
      balance -= monthlyPrincipal;
      totalInterest += mInterest;
    }
    return { mode: modeKr, firstPayment, lastPayment, totalInterest, totalPayment: principal + totalInterest };
  } else if (mode === 'balloon') {
    const monthlyInterest = round(principal * r);
    const totalInterest = monthlyInterest * n;
    return { mode: modeKr, monthlyInterest, totalInterest, totalPayment: principal + totalInterest };
  } else if (mode === 'grace') {
    const graceMonths = graceYears * 12;
    const repayMonths = n - graceMonths;
    if (repayMonths <= 0) return { mode: modeKr, error: 'repayYears must be > 0' };
    const graceMonthlyInterest = round(principal * r);
    const totalGraceInterest = graceMonthlyInterest * graceMonths;
    if (r === 0) {
      const repayMonthly = round(principal / repayMonths);
      const totalInterest = totalGraceInterest;
      return { mode: modeKr, graceMonthlyInterest, totalGraceInterest, repayMonthly, totalInterest, totalPayment: principal + totalInterest };
    }
    const pow = Math.pow(1 + r, repayMonths);
    const PMT = round(principal * r * pow / (pow - 1));
    // 한국 표준: 회차별 round(잔액 × r) 누적 + 마지막 회차 잔금 정산
    let balance = principal;
    let repayInterest = 0;
    for (let i = 1; i <= repayMonths; i++) {
      const mInterest = round(balance * r);
      let principalPaid;
      if (i === repayMonths) {
        principalPaid = balance; // 마지막 회차 잔금 정산
      } else {
        principalPaid = PMT - mInterest;
      }
      balance -= principalPaid;
      repayInterest += mInterest;
    }
    const totalInterest = totalGraceInterest + repayInterest;
    return { mode: modeKr, graceMonthlyInterest, totalGraceInterest, repayMonthly: PMT, totalInterest, totalPayment: principal + totalInterest };
  }
  return { mode: modeKr, error: 'unknown mode' };
}

module.exports = { calc: calc_loanAmortization };
