const round = Math.round;
const min = Math.min;
const max = Math.max;
const TOL = 2;

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — salary-net-pay
// ═══════════════════════════════════════════════════════════════
function calc_salary(input, data) {
  const C = data.constants, T = data.tables;
  const { annual, dependents, kids, nontaxable = 0 } = input;
  const taxableAnnual = max(0, annual - nontaxable * 12);
  const monthly = taxableAnnual / 12;
  const npBase = min(monthly, C.NP_CAP_MONTHLY);
  const nationalPension = round(npBase * C.NP_RATE);
  const healthInsurance = round(monthly * C.HI_RATE);
  const longTermCare = round(healthInsurance * C.LTC_RATE);
  const employmentInsurance = round(monthly * C.EI_RATE);
  const totalInsurance = nationalPension + healthInsurance + longTermCare + employmentInsurance;

  let eid = 0;
  for (const b of T.earnedIncomeDeduction.brackets) {
    if (b.upperBound === null || taxableAnnual <= b.upperBound) {
      eid = b.fixed + (taxableAnnual - b.lowerBound) * b.rate;
      break;
    }
  }
  if (T.earnedIncomeDeduction.limit) eid = min(eid, T.earnedIncomeDeduction.limit);

  const personalDeduction = dependents * C.PERSONAL_DEDUCTION;
  const taxableIncome = max(0, taxableAnnual - eid - personalDeduction);

  let taxBeforeCredit = 0;
  for (const b of T.incomeTaxBrackets.brackets) {
    if (b.upperBound === null || taxableIncome <= b.upperBound) {
      taxBeforeCredit = taxableIncome * b.rate - b.progressiveDeduction;
      break;
    }
  }

  let childCredit = 0;
  const arr = T.childTaxCredit.amounts;
  const f = arr.find(a => a.kids === kids);
  if (f) childCredit = f.credit;
  else {
    const last = arr[arr.length - 1];
    childCredit = last.credit + (kids - last.kids) * T.childTaxCredit.additionalPerKid;
  }

  const STD = C.STANDARD_TAX_DEDUCTION_YEARLY || 1560000;
  const annualIncomeTax = max(0, taxBeforeCredit - STD - childCredit);
  const monthlyIncomeTax = round(annualIncomeTax / 12);
  const monthlyLocalTax = round(monthlyIncomeTax * C.LOCAL_TAX_RATE);
  const totalDeduction = totalInsurance + monthlyIncomeTax + monthlyLocalTax;
  const netMonthly = round(monthly - totalDeduction);
  const deductRatePct = +(totalDeduction / monthly * 100).toFixed(1);

  return {
    grossMonthly: round(monthly),
    nationalPension, healthInsurance, longTermCare, employmentInsurance, totalInsurance,
    monthlyIncomeTax, monthlyLocalTax, totalDeduction, netMonthly, deductRatePct
  };
}

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — comprehensive-income-tax
// ═══════════════════════════════════════════════════════════════
function calc_compIncome(input, data) {
  const C = data.constants, T = data.tables;
  const { income, dependents, kids, extraDeduction = 0, extraTaxCredit = 0 } = input;
  const personalDeduction = dependents * C.PERSONAL_DEDUCTION;
  const taxableIncome = max(0, income - personalDeduction - extraDeduction);

  let taxBeforeCredit = 0;
  for (const b of T.incomeTaxBrackets.brackets) {
    if (b.upperBound === null || taxableIncome <= b.upperBound) {
      taxBeforeCredit = taxableIncome * b.rate - b.progressiveDeduction;
      break;
    }
  }

  let childCredit = 0;
  const arr = T.childTaxCredit.amounts;
  const f = arr.find(a => a.kids === kids);
  if (f) childCredit = f.credit;
  else {
    const last = arr[arr.length - 1];
    childCredit = last.credit + (kids - last.kids) * T.childTaxCredit.additionalPerKid;
  }

  const decisionTax = max(0, taxBeforeCredit - childCredit - extraTaxCredit);
  const localTax = round(decisionTax * C.LOCAL_TAX_RATE);
  const totalTax = decisionTax + localTax;

  return { taxableIncome, taxBeforeCredit, childCredit, decisionTax, localTax, totalTax };
}

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — acquisition-tax
// ═══════════════════════════════════════════════════════════════
function calc_acqTax(input, data) {
  const C = data.constants;
  const { price, houseCountAfter, adjustedArea, areaSize } = input;

  // 세율 결정
  let rate;
  if (houseCountAfter === 1) {
    if (price <= 600000000) rate = 0.01;
    else if (price <= 900000000) rate = ((price / 100000000) * (2/3) - 3) / 100;
    else rate = 0.03;
  } else if (houseCountAfter === 2) {
    rate = adjustedArea ? 0.08 : 0.01; // 2주택 비조정은 표준세율 (단순화: 1%)
  } else if (houseCountAfter === 3) {
    rate = adjustedArea ? 0.12 : 0.08;
  } else {
    rate = 0.12;
  }

  const acquisitionTax = round(price * rate);
  const ruralTax = areaSize > C.RURAL_AREA_THRESHOLD ? round(price * C.RURAL_TAX_RATE) : 0;
  const educationTax = round(acquisitionTax * C.EDUCATION_TAX_RATE);
  const totalTax = acquisitionTax + ruralTax + educationTax;

  return { rate: +rate.toFixed(7), acquisitionTax, ruralTax, educationTax, totalTax };
}

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — brokerage-fee
// ═══════════════════════════════════════════════════════════════
function calc_brokerage(input, data) {
  const T = data.tables;
  const { type, price, vatIncluded } = input;
  const brackets = type === 'sale' ? T.saleRates.brackets : T.rentRates.brackets;

  let bracket;
  for (const b of brackets) {
    if (b.upperBound === null || price < b.upperBound) {
      bracket = b;
      break;
    }
  }
  let fee = round(price * bracket.rate);
  if (bracket.limit !== null && bracket.limit !== undefined) {
    fee = min(fee, bracket.limit);
  }
  const vat = vatIncluded ? round(fee * 0.10) : 0;
  const total = fee + vat;
  return { rate: bracket.rate, fee, vat, total };
}

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — transfer-tax-1home
// ═══════════════════════════════════════════════════════════════
function calc_transferTax(input, data) {
  const C = data.constants, T = data.tables;
  const { salePrice, acquisitionPrice, expense, holdingYears, livedYears, isOneHome } = input;

  const gain = salePrice - acquisitionPrice - expense;
  const isNonTaxable = isOneHome && holdingYears >= 2 && livedYears >= 2 && salePrice <= C.NON_TAXABLE_LIMIT;

  if (isNonTaxable) {
    return { gain, isNonTaxable: true, taxableGain: 0, ltbcRate: 0, incomeAmount: 0, taxableBase: 0, taxBeforeLocal: 0, localTax: 0, totalTax: 0 };
  }

  // 과세분
  let taxableGain;
  if (isOneHome && holdingYears >= 2 && livedYears >= 2 && salePrice > C.NON_TAXABLE_LIMIT) {
    taxableGain = round(gain * (salePrice - C.NON_TAXABLE_LIMIT) / salePrice);
  } else {
    taxableGain = gain;
  }

  // LBC율
  let ltbcRate = 0;
  if (isOneHome && holdingYears >= 2 && livedYears >= 2) {
    const holdingPart = min(min(holdingYears, 10) * 0.04, 0.40);
    const livedPart = min(min(livedYears, 10) * 0.04, 0.40);
    ltbcRate = min(holdingPart + livedPart, 0.80);
  } else {
    if (holdingYears >= 3) {
      ltbcRate = min(0.06 + (holdingYears - 3) * 0.02, 0.30);
    } else {
      ltbcRate = 0;
    }
  }

  const incomeAmount = round(taxableGain * (1 - ltbcRate));
  const taxableBase = max(0, incomeAmount - C.BASIC_DEDUCTION);

  let taxBeforeLocal = 0;
  // 단기 양도 (보유 2년 미만): 단기세율 적용
  if (holdingYears < 1) {
    taxBeforeLocal = round(taxableBase * 0.70);
  } else if (holdingYears < 2) {
    taxBeforeLocal = round(taxableBase * 0.60);
  } else {
    for (const b of T.incomeTaxBrackets.brackets) {
      if (b.upperBound === null || taxableBase <= b.upperBound) {
        taxBeforeLocal = round(taxableBase * b.rate - b.progressiveDeduction);
        break;
      }
    }
  }
  taxBeforeLocal = max(0, taxBeforeLocal);
  const localTax = round(taxBeforeLocal * C.LOCAL_TAX_RATE);
  const totalTax = taxBeforeLocal + localTax;

  return {
    gain, isNonTaxable: false, taxableGain,
    ltbcRate: +ltbcRate.toFixed(4),
    incomeAmount, taxableBase, taxBeforeLocal, localTax, totalTax
  };
}

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — severance-pay
// ═══════════════════════════════════════════════════════════════
function calc_severance(input, data) {
  const { monthlySalary, annualBonus, unusedAnnualLeavePay, workDays } = input;
  const threeMonthTotal = monthlySalary * 3 + annualBonus * (3 / 12) + unusedAnnualLeavePay * (3 / 12);
  const avgDailyWageRaw = threeMonthTotal / 90;
  const severance = round(avgDailyWageRaw * 30 * workDays / 365);
  return { threeMonthTotal: round(threeMonthTotal), avgDailyWage: round(avgDailyWageRaw), severance };
}

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — national-pension
// ═══════════════════════════════════════════════════════════════
function calc_nationalPension(input, data) {
  const C = data.constants;
  const { monthsContributed, avgIncome } = input;
  const yearsContributed = monthsContributed / 12;
  let P;
  if (monthsContributed >= C.BASE_MONTHS) {
    P = 1 + C.BONUS_PER_YEAR_AFTER_20 * (yearsContributed - 20);
  } else {
    P = monthsContributed / C.BASE_MONTHS;
  }
  const annualPension = round(C.PROPORTION_2026 * (C.A_VALUE_2026 + avgIncome) * P);
  const monthlyPension = round(annualPension / 12);
  return { P: +P.toFixed(4), monthlyPension, annualPension };
}

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — unemployment-benefit
// ═══════════════════════════════════════════════════════════════
function calc_unemployment(input, data) {
  const C = data.constants, T = data.tables;
  const { monthlySalary, insuredYears, isElderlyOrDisabled } = input;
  const rawDailyWage = round(monthlySalary * 3 / 90);
  const rawBenefit = round(rawDailyWage * C.BENEFIT_RATE);
  let dailyBenefit = rawBenefit;
  if (dailyBenefit < C.DAILY_LOWER_LIMIT_2025) dailyBenefit = C.DAILY_LOWER_LIMIT_2025;
  if (dailyBenefit > C.DAILY_UPPER_LIMIT_2025) dailyBenefit = C.DAILY_UPPER_LIMIT_2025;

  let benefitDays = 120;
  for (const r of T.benefitDays.rules) {
    const lower = r.minYears <= insuredYears;
    const upper = r.maxYears === null || insuredYears < r.maxYears;
    if (lower && upper) { benefitDays = r.days; break; }
  }
  if (isElderlyOrDisabled) benefitDays += C.ELDERLY_DISABLED_BONUS_DAYS;

  const totalBenefit = dailyBenefit * benefitDays;
  return { rawDailyWage, rawBenefit, dailyBenefit, benefitDays, totalBenefit };
}

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — youth-leap-account
// ═══════════════════════════════════════════════════════════════
function calc_youthLeap(input, data) {
  const T = data.tables;
  const { monthlyDeposit, annualIncome, interestRate } = input;

  let matching = { rate: 0, limit: 0 };
  for (const b of T.governmentMatching.brackets) {
    if (b.incomeUpper === null || annualIncome <= b.incomeUpper) {
      matching = b; break;
    }
  }
  const monthlyMatching = min(round(monthlyDeposit * matching.rate), matching.limit);
  const ownTotal = monthlyDeposit * 60;
  const matchingTotal = monthlyMatching * 60;
  // 월적립 단리: (월납 + 월매칭) × r/12 × n(n+1)/2
  const interest = round((monthlyDeposit + monthlyMatching) * interestRate / 12 * 60 * 61 / 2);
  const maturity = ownTotal + matchingTotal + interest;
  return { monthlyMatching, ownTotal, matchingTotal, interest, maturity };
}

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — dsr-limit
// ═══════════════════════════════════════════════════════════════
function calc_dsr(input) {
  const { annualIncome, monthlyExistingDebt, loanYears, loanRate, dsrLimit, stressDSR = '미적용' } = input;
  const stressMap = { '미적용': 0, '1단계': 0.005, '2단계': 0.0075, '3단계': 0.015 };
  const stress = stressMap[stressDSR] || 0;
  const appliedRate = loanRate + stress;
  const monthlyAvail = round(annualIncome * dsrLimit / 12 - monthlyExistingDebt);
  if (monthlyAvail <= 0) return { appliedRate, monthlyAvailable: 0, maxLoan: 0 };
  const r = appliedRate / 12, n = loanYears * 12;
  const pow = Math.pow(1 + r, n);
  const factor = r > 0 ? (pow - 1) / (r * pow) : n;
  return { appliedRate, monthlyAvailable: monthlyAvail, maxLoan: round(monthlyAvail * factor) };
}

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — installment-savings
// ═══════════════════════════════════════════════════════════════
function calc_installmentSavings(input, data) {
  const { monthlyDeposit, months, rate, mode = 'compound', taxFree = 'no' } = input;
  const principal = monthlyDeposit * months;
  const r_m = rate / 12;
  let interest;
  if (mode === 'simple') {
    interest = round(monthlyDeposit * r_m * months * (months + 1) / 2);
  } else {
    if (r_m === 0) interest = 0;
    else {
      const future = monthlyDeposit * (Math.pow(1 + r_m, months) - 1) / r_m * (1 + r_m);
      interest = round(future - principal);
    }
  }
  const taxRate = taxFree === 'yes' ? 0 : data.constants.INTEREST_TAX_RATE;
  // 이자소득세는 floor (10원 미만 절사) — 한국 세법 표준
  const tax = Math.floor(interest * taxRate);
  const maturity = principal + interest - tax;
  return { principal, interest, tax, maturity };
}

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — fixed-deposit
// ═══════════════════════════════════════════════════════════════
function calc_fixedDeposit(input, data) {
  const { principal, years, rate, taxFree = 'no' } = input;
  const interest = round(principal * rate * years);
  const taxRate = taxFree === 'yes' ? 0 : data.constants.INTEREST_TAX_RATE;
  const tax = round(interest * taxRate);
  const maturity = principal + interest - tax;
  return { interest, tax, maturity };
}

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

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — loan-decline
// ═══════════════════════════════════════════════════════════════
function calc_loanDecline(input) {
  const { principal, years, rate } = input;
  const r = rate / 12;
  const n = years * 12;
  const monthlyPrincipal = round(principal / n);
  const firstInterest = round(principal * r);
  const firstPayment = monthlyPrincipal + firstInterest;
  const lastInterest = round(monthlyPrincipal * r);
  const lastPayment = monthlyPrincipal + lastInterest;
  const totalInterest = round(principal * r * (n + 1) / 2);
  const totalPayment = principal + totalInterest;
  return { firstPayment, lastPayment, totalInterest, totalPayment };
}

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — ltv-limit
// ═══════════════════════════════════════════════════════════════
function calc_ltvLimit(input, data) {
  const C = data.constants, T = data.tables;
  const { housePrice, category, regionType, area = 'seoul', numRooms = 1, leaseDeposit = 0, roomDeduction = 'yes' } = input;
  
  // LTV rules lookup
  const rule = T.ltvRules.rules.find(r => r.category === category && r.regionType === regionType);
  const ltv = rule ? rule.ltv : 0;
  const ltvLimit = round(housePrice * ltv);
  
  // 방 공제 (소액보증금)
  const depositMap = {
    seoul: C.DEPOSIT_SEOUL,
    metroPark: C.DEPOSIT_METRO_PARK,
    gwangyok: C.DEPOSIT_GWANGYOK,
    other: C.DEPOSIT_OTHER
  };
  const deposit = depositMap[area] || C.DEPOSIT_OTHER;
  const roomDed = roomDeduction === 'yes' ? max(0, numRooms - 1) * deposit : 0;
  
  // 절대 한도 cap
  let absoluteCap = null;
  if (regionType === 'regulated' || regionType === 'metroOther') {
    absoluteCap = housePrice > C.OVER_25EOK_THRESHOLD
      ? C.METRO_REGULATED_CAP + C.OVER_25EOK_EXTRA_CAP
      : C.METRO_REGULATED_CAP;
  }
  
  const afterDeduct = max(0, ltvLimit - roomDed - leaseDeposit);
  const maxLoan = absoluteCap !== null ? min(afterDeduct, absoluteCap) : afterDeduct;
  
  // 우선변제 한도 = min(소액보증금, 주택가격/2)
  const priorityClaim = min(deposit, round(housePrice / 2));
  
  return { ltv, ltvLimit, roomDeduction: roomDed, leaseDeductTotal: leaseDeposit, absoluteCap, maxLoan, priorityClaim };
}

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — transfer-tax-multi
// ═══════════════════════════════════════════════════════════════
function calc_transferTaxMulti(input, data) {
  const C = data.constants, T = data.tables;
  const { salePrice, acquisitionPrice, expense, holdingYears } = input;
  const gain = salePrice - acquisitionPrice - expense;

  // LBC 일반표
  let ltbcRate = 0;
  if (holdingYears >= 3) {
    ltbcRate = min(0.06 + (holdingYears - 3) * 0.02, 0.30);
  }

  const incomeAmount = round(gain * (1 - ltbcRate));
  const taxableBase = max(0, incomeAmount - C.BASIC_DEDUCTION);

  let taxBeforeLocal = 0;
  if (holdingYears < 1) {
    taxBeforeLocal = round(taxableBase * C.SHORT_TERM_UNDER_1Y_RATE);
  } else if (holdingYears < 2) {
    taxBeforeLocal = round(taxableBase * C.SHORT_TERM_1Y_TO_2Y_RATE);
  } else {
    for (const b of T.incomeTaxBrackets.brackets) {
      if (b.upperBound === null || taxableBase <= b.upperBound) {
        taxBeforeLocal = round(taxableBase * b.rate - b.progressiveDeduction);
        break;
      }
    }
  }
  taxBeforeLocal = max(0, taxBeforeLocal);
  const localTax = round(taxBeforeLocal * C.LOCAL_TAX_RATE);
  const totalTax = taxBeforeLocal + localTax;
  return { gain, ltbcRate: +ltbcRate.toFixed(4), incomeAmount, taxableBase, taxBeforeLocal, localTax, totalTax };
}

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — comprehensive-real-estate-tax
// ═══════════════════════════════════════════════════════════════
function calc_propertyTaxComp(input, data) {
  const C = data.constants, T = data.tables;
  const { totalValue, isOneHome, age = 50, holdingYears = 0 } = input;
  const deduction = isOneHome ? C.ONE_HOME_DEDUCTION : C.GENERAL_DEDUCTION;
  const excess = max(0, totalValue - deduction);
  const taxableBase = round(excess * C.FAIR_MARKET_RATIO);

  let taxBeforeSeniorDed = 0;
  if (taxableBase > 0) {
    const brackets = isOneHome ? T.brackets1Home.brackets : T.bracketsMulti.brackets;
    for (const b of brackets) {
      if (b.upperBound === null || taxableBase <= b.upperBound) {
        taxBeforeSeniorDed = round(taxableBase * b.rate - b.progressiveDeduction);
        break;
      }
    }
    taxBeforeSeniorDed = max(0, taxBeforeSeniorDed);
  }
  let seniorDed = 0;
  if (isOneHome) {
    let ageDed = 0;
    if (age >= 70) ageDed = 0.40;
    else if (age >= 65) ageDed = 0.30;
    else if (age >= 60) ageDed = 0.20;
    let holdDed = 0;
    if (holdingYears >= 15) holdDed = 0.50;
    else if (holdingYears >= 10) holdDed = 0.40;
    else if (holdingYears >= 5) holdDed = 0.20;
    seniorDed = min(0.80, ageDed + holdDed);
  }
  const tax = round(taxBeforeSeniorDed * (1 - seniorDed));
  return { deduction, excess, taxableBase, taxBeforeSeniorDed, seniorDed: +seniorDed.toFixed(2), tax };
}

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — property-tax
// ═══════════════════════════════════════════════════════════════
function calc_propertyTax(input, data) {
  const C = data.constants, T = data.tables;
  const { publicValue, isOneHomeUnder9Eok = false } = input;
  // 1주택 9억 이하 특례: 공정시장가액비율 43% + 우대 누진세율 (지방세법 §111의2)
  const useOneHome = isOneHomeUnder9Eok && publicValue <= 900000000;
  const ratio = useOneHome ? C.FAIR_MARKET_RATIO_ONE_HOME_UNDER_9EOK : C.FAIR_MARKET_RATIO;
  const brackets = useOneHome ? T.bracketsOneHomeUnder9Eok.brackets : T.brackets.brackets;
  const taxableBase = round(publicValue * ratio);
  let propertyTax = 0;
  for (const b of brackets) {
    if (b.upperBound === null || taxableBase <= b.upperBound) {
      propertyTax = round(taxableBase * b.rate - b.progressiveDeduction);
      break;
    }
  }
  propertyTax = max(0, propertyTax);
  const educationTax = round(propertyTax * C.EDUCATION_TAX_RATE);
  const totalTax = propertyTax + educationTax;
  return { taxableBase, propertyTax, educationTax, totalTax };
}

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — inheritance-tax
// ═══════════════════════════════════════════════════════════════
function calc_inheritanceTax(input, data) {
  const C = data.constants, T = data.tables;
  const { totalEstate, hasSpouse, children, parents } = input;
  let spouseDeduction = 0;
  if (hasSpouse) {
    let spouseShareRatio = 1.0;
    if (children > 0) spouseShareRatio = 1.5 / (children * 1.0 + 1.5);
    else if (parents > 0) spouseShareRatio = 1.5 / (parents * 1.0 + 1.5);
    const legalShare = totalEstate * spouseShareRatio;
    spouseDeduction = round(min(C.SPOUSE_MAX, max(C.SPOUSE_MIN, legalShare)));
  }
  const deduction = C.BASIC_DEDUCTION + spouseDeduction;
  const taxableBase = max(0, totalEstate - deduction);
  let tax = 0;
  if (taxableBase > 0) {
    for (const b of T.brackets.brackets) {
      if (b.upperBound === null || taxableBase <= b.upperBound) {
        tax = round(taxableBase * b.rate - b.progressiveDeduction);
        break;
      }
    }
    tax = max(0, tax);
  }
  return { deduction, spouseDeduction, taxableBase, tax };
}

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — gift-tax
// ═══════════════════════════════════════════════════════════════
function calc_giftTax(input, data) {
  const T = data.tables;
  const { giftAmount, relation } = input;
  const rule = T.deductions.rules.find(r => r.relation === relation);
  const deduction = rule ? rule.deduction : 0;
  const taxableBase = max(0, giftAmount - deduction);
  let tax = 0;
  if (taxableBase > 0) {
    for (const b of T.brackets.brackets) {
      if (b.upperBound === null || taxableBase <= b.upperBound) {
        tax = round(taxableBase * b.rate - b.progressiveDeduction);
        break;
      }
    }
    tax = max(0, tax);
  }
  return { deduction, taxableBase, tax };
}

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — irp-tax-credit
// ═══════════════════════════════════════════════════════════════
function calc_irpTaxCredit(input, data) {
  const C = data.constants;
  const { irpAmount, pensionAmount, totalSalary } = input;
  const pensionApplied = min(pensionAmount, C.PENSION_LIMIT);
  const combined = pensionApplied + irpAmount;
  const appliedAmount = min(combined, C.TOTAL_LIMIT);
  const rate = totalSalary <= C.INCOME_THRESHOLD ? C.RATE_LOW : C.RATE_HIGH;
  const taxCredit = round(appliedAmount * rate);
  return { appliedAmount, rate, taxCredit };
}

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — basic-pension
// ═══════════════════════════════════════════════════════════════
function calc_basicPension(input, data) {
  const C = data.constants;
  const { householdType, incomeAmount } = input;
  const threshold = householdType === 'single' ? C.INCOME_THRESHOLD_SINGLE : C.INCOME_THRESHOLD_COUPLE;
  const isEligible = incomeAmount <= threshold;
  const monthlyPension = isEligible
    ? (householdType === 'single' ? C.MAX_SINGLE_2025 : C.MAX_COUPLE_2025)
    : 0;
  return { isEligible, monthlyPension };
}

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — parental-leave-pay
// ═══════════════════════════════════════════════════════════════
function calc_parentalLeavePay(input, data) {
  const C = data.constants;
  const { monthlySalary, leaveMonths } = input;
  const phase1Monthly = max(min(monthlySalary * C.PHASE1_RATE, C.PHASE1_UPPER), C.MIN_PAY);
  const phase2Monthly = max(min(monthlySalary * C.PHASE2_RATE, C.PHASE2_UPPER), C.MIN_PAY);
  const phase1Months = min(leaveMonths, C.PHASE1_MONTHS);
  const phase2Months = max(0, leaveMonths - C.PHASE1_MONTHS);
  const totalPay = round(phase1Monthly * phase1Months + phase2Monthly * phase2Months);
  return { phase1Monthly: round(phase1Monthly), phase2Monthly: round(phase2Monthly), totalPay };
}

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — child-support
// ═══════════════════════════════════════════════════════════════
function calc_childSupport(input, data) {
  const T = data.tables;
  const { totalIncome, childAge, nonCustodianIncome } = input;
  const ageGroups = T.supportTable.ageGroups;
  let ageIdx = 0;
  if (childAge >= 15) ageIdx = 5;
  else if (childAge >= 12) ageIdx = 4;
  else if (childAge >= 9) ageIdx = 3;
  else if (childAge >= 6) ageIdx = 2;
  else if (childAge >= 3) ageIdx = 1;
  else ageIdx = 0;
  const ageGroup = ageGroups[ageIdx];

  let row;
  for (const r of T.supportTable.rows) {
    if (r.incomeUpper === null || totalIncome < r.incomeUpper) {
      row = r; break;
    }
  }
  const standardSupport = row.values[ageIdx];
  const nonCustodianShare = round(standardSupport * (nonCustodianIncome / totalIncome));
  return { ageGroup, standardSupport, nonCustodianShare };
}

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — four-major-insurance
// ═══════════════════════════════════════════════════════════════
function calc_fourMajorInsurance(input, data) {
  const C = data.constants;
  const { monthlySalary } = input;
  const npBase = min(max(monthlySalary, C.NP_FLOOR), C.NP_CAP);
  const nationalPension = round(npBase * C.NP_RATE);
  const healthInsurance = round(monthlySalary * C.HI_RATE);
  const longTermCare = round(healthInsurance * C.LTC_RATE);
  const employmentInsurance = round(monthlySalary * C.EI_RATE);
  const total = nationalPension + healthInsurance + longTermCare + employmentInsurance;
  return { nationalPension, healthInsurance, longTermCare, employmentInsurance, total };
}

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — simple-vs-compound
// ═══════════════════════════════════════════════════════════════
function calc_simpleVsCompound(input) {
  const { principal, years, rate } = input;
  const simpleInterest = round(principal * rate * years);
  const simpleMaturity = principal + simpleInterest;
  const r = rate / 12;
  const n = years * 12;
  const compoundMaturity = round(principal * Math.pow(1 + r, n));
  const compoundInterest = compoundMaturity - principal;
  const diff = compoundInterest - simpleInterest;
  return { simpleInterest, simpleMaturity, compoundInterest, compoundMaturity, diff };
}

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — child-tax-credit
// ═══════════════════════════════════════════════════════════════
function calc_childTaxCredit(input, data) {
  const C = data.constants;
  const { kids, monthlyKids } = input;
  let regularCredit = 0;
  if (kids === 1) regularCredit = C.FIRST_KID;
  else if (kids === 2) regularCredit = C.TWO_KIDS;
  else if (kids === 3) regularCredit = C.THREE_KIDS;
  else if (kids >= 4) regularCredit = C.THREE_KIDS + (kids - 3) * C.ADDITIONAL_PER_KID;
  const newbornCredit = monthlyKids * C.NEWBORN_PER_KID;
  const total = regularCredit + newbornCredit;
  return { regularCredit, newbornCredit, total };
}

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — stock-transfer-tax
// ═══════════════════════════════════════════════════════════════
function calc_stockTransferTax(input, data) {
  const C = data.constants;
  const { gain, isMajor } = input;
  const taxableBase = max(0, gain - C.BASIC_DEDUCTION);
  let rate = C.RATE_NORMAL;
  if (isMajor && gain > C.MAJOR_HIGH_THRESHOLD) rate = C.RATE_MAJOR_HIGH;
  const totalTax = round(taxableBase * rate);
  const incomeTax = round(taxableBase * (rate - 0.022));
  const localTax = round(taxableBase * 0.022);
  return { taxableBase, incomeTax, localTax, totalTax: incomeTax + localTax };
}

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — auto-insurance
// ═══════════════════════════════════════════════════════════════
function calc_autoInsurance(input, data) {
  const C = data.constants;
  const { basePremium, currentLevel, accidents, smallAccidents } = input;
  let levelChange = 0;
  if (accidents > 0) levelChange -= accidents * 3;
  if (smallAccidents > 0) levelChange -= smallAccidents * 1;
  if (accidents === 0 && smallAccidents === 0) levelChange = 1;
  const newLevel = max(C.MIN_LEVEL, min(C.MAX_LEVEL, currentLevel + levelChange));
  const discountRate = (newLevel - C.BASE_LEVEL) * C.RATE_PER_LEVEL;
  const adjustedPremium = round(basePremium * (1 - discountRate));
  return { newLevel, discountRatePct: +(discountRate * 100).toFixed(1), adjustedPremium };
}

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — rental-yield
// ═══════════════════════════════════════════════════════════════
function calc_rentalYield(input) {
  const { purchasePrice, deposit, monthlyRent, annualExpense } = input;
  const investedCapital = purchasePrice - deposit;
  const annualRentIncome = monthlyRent * 12;
  const netAnnualIncome = annualRentIncome - annualExpense;
  const grossYieldPct = +(annualRentIncome / investedCapital * 100).toFixed(2);
  const netYieldPct = +(netAnnualIncome / investedCapital * 100).toFixed(2);
  return { investedCapital, annualRentIncome, netAnnualIncome, grossYieldPct, netYieldPct };
}

// ═══════════════════════════════════════════════════════════════
//  BATCH 4 산식 함수
// ═══════════════════════════════════════════════════════════════
function calc_taxFreeSavings(input) {
  const { monthlyDeposit, months, rate, mode = 'simple' } = input;
  const principal = monthlyDeposit * months;
  const r_m = rate / 12;
  let interest;
  if (mode === 'simple') {
    interest = round(monthlyDeposit * r_m * months * (months + 1) / 2);
  } else {
    if (r_m === 0) interest = 0;
    else {
      const future = monthlyDeposit * (Math.pow(1 + r_m, months) - 1) / r_m * (1 + r_m);
      interest = round(future - principal);
    }
  }
  return { principal, interest, maturity: principal + interest };
}
function calc_isaTaxSaving(input, data) {
  const C = data.constants;
  const { totalInterest, accountType = 'general' } = input;
  const limit = accountType === 'lowincome' ? C.ISA_EXEMPT_LIMIT_LOWINCOME : C.ISA_EXEMPT_LIMIT_GENERAL;
  const generalTax = round(totalInterest * C.GENERAL_RATE);
  const isaTax = totalInterest <= limit ? 0 : round((totalInterest - limit) * C.ISA_RATE);
  return { generalTax, isaTax, savings: generalTax - isaTax };
}
function calc_youthHopeDeposit(input, data) {
  const C = data.constants;
  const p = input.monthlyDeposit * C.MONTHS;
  const interest = round(input.monthlyDeposit * (input.rate / 12) * C.MONTHS * (C.MONTHS + 1) / 2);
  const incentive = round(input.monthlyDeposit * C.INCENTIVE_Y1 * 12 + input.monthlyDeposit * C.INCENTIVE_Y2 * 12);
  return { principal: p, interest, incentive, maturity: p + interest + incentive };
}
function calc_housingSubscription(input, data) {
  const p = input.monthlyDeposit * input.months;
  const interest = round(input.monthlyDeposit * (input.rate / 12) * input.months * (input.months + 1) / 2);
  const tax = round(interest * data.constants.INTEREST_TAX_RATE);
  return { principal: p, interest, tax, maturity: p + interest - tax };
}
function calc_balloonPayment(input) {
  const monthlyInterest = round(input.principal * input.rate / 12);
  const totalInterest = round(monthlyInterest * input.years * 12);
  return { monthlyInterest, totalInterest, totalPayment: input.principal + totalInterest };
}
function calc_gracePeriodLoan(input) {
  const r = input.rate / 12;
  const graceMonths = input.graceYears * 12;
  const repayMonths = input.repayYears * 12;
  const graceMonthlyInterest = round(input.principal * r);
  const totalGraceInterest = graceMonthlyInterest * graceMonths;
  const pow = Math.pow(1 + r, repayMonths);
  const M = input.principal * r * pow / (pow - 1);
  const repayMonthly = round(M);
  const totalRepayPayment = round(M * repayMonths);
  return { graceMonthlyInterest, totalGraceInterest, repayMonthly, totalInterest: totalGraceInterest + totalRepayPayment - input.principal };
}
function calc_dtiLimit(input) {
  const { annualIncome, monthlyOtherDebtInterest, loanYears, loanRate, dtiLimit, stressDSR = '미적용' } = input;
  const stressMap = { '미적용': 0, '1단계': 0.005, '2단계': 0.0075, '3단계': 0.015 };
  const stress = stressMap[stressDSR] || 0;
  const appliedRate = loanRate + stress;
  const monthlyAvail = round(annualIncome * dtiLimit / 12 - monthlyOtherDebtInterest);
  if (monthlyAvail <= 0) return { appliedRate, monthlyAvail: 0, maxLoan: 0 };
  const r = appliedRate / 12, n = loanYears * 12;
  const pow = Math.pow(1 + r, n);
  const factor = r > 0 ? (pow - 1) / (r * pow) : n;
  return { appliedRate, monthlyAvail, maxLoan: round(monthlyAvail * factor) };
}
function calc_jeonseLoan(input) {
  const { deposit, ratio, limit } = input;
  const raw = round(deposit * ratio);
  return { depositRatio: raw, appliedLimit: min(raw, limit) };
}
function calc_mortgageLoanLimit(input, data) {
  const C = data.constants || {};
  const { housePrice, ltv, annualIncome, monthlyExistingDebt, dsrLimit, loanYears, loanRate, regionType, stressDSR = '미적용' } = input;
  const stressMap = { '미적용': 0, '1단계': 0.005, '2단계': 0.0075, '3단계': 0.015 };
  const stress = stressMap[stressDSR] || 0;
  const appliedRate = loanRate + stress;
  let ltvLimitAmount = round(housePrice * ltv);
  let absoluteCap = null;
  if (regionType === '수도권 규제·조정' || regionType === '수도권 비규제') {
    absoluteCap = housePrice > (C.OVER_25EOK_THRESHOLD || 2500000000) ? (C.METRO_CAP_8 || 800000000) : (C.METRO_CAP_6 || 600000000);
  }
  if (absoluteCap !== null) ltvLimitAmount = min(ltvLimitAmount, absoluteCap);
  const monthlyAvail = max(0, round(annualIncome * dsrLimit / 12 - monthlyExistingDebt));
  const r = appliedRate / 12, n = loanYears * 12;
  const pow = Math.pow(1 + r, n);
  const factor = r > 0 ? (pow - 1) / (r * pow) : n;
  const dsrLimitAmount = round(monthlyAvail * factor);
  return { ltvLimit: ltvLimitAmount, dsrLimitAmount, absoluteCap, maxLoan: min(ltvLimitAmount, dsrLimitAmount) };
}
function calc_prepaymentFee(input) {
  const { remainingBalance, totalMonths, remainingMonths, rate } = input;
  const fee = round(remainingBalance * rate * remainingMonths / totalMonths);
  return { fee, feePct: rate, rateInRange: true };
}
function calc_creditLoan(input) {
  return { maxLoan: round(input.annualIncome * input.multiplier) };
}
function calc_loanRefinance(input) {
  const oldR = input.oldRate / 12, newR = input.newRate / 12, n = input.remainingYears * 12;
  const oldPow = Math.pow(1 + oldR, n), newPow = Math.pow(1 + newR, n);
  const oldM = input.balance * oldR * oldPow / (oldPow - 1);
  const newM = input.balance * newR * newPow / (newPow - 1);
  const oldMonthly = round(oldM), newMonthly = round(newM);
  const oldTotal = round(oldM * n), newTotal = round(newM * n);
  return { oldMonthly, newMonthly, monthlySaving: oldMonthly - newMonthly, oldTotal, newTotal, totalSaving: oldTotal - newTotal };
}
function calc_realEstateROI(input) {
  const totalReturn = input.totalRentIncome + input.capitalGain;
  const totalROI = +(totalReturn / input.investedCapital * 100).toFixed(2);
  return { totalReturn, totalROI, annualROI: +(totalROI / input.holdingYears).toFixed(2) };
}
function calc_registrationFee(input, data) {
  const reg = round(input.price * data.constants.REG_RATE);
  const edu = round(reg * data.constants.EDU_RATE);
  return { registrationTax: reg, educationTax: edu, totalFee: reg + edu };
}
function calc_jeonseMonthlyConversion(input) {
  const conversionAmount = input.jeonseDeposit - input.securityDeposit;
  return { conversionAmount, monthlyRent: round(conversionAmount * input.conversionRate / 12) };
}
function calc_holdingTaxTotal(input) {
  const propBase = round(input.publicValue * 0.60);
  let propTax = 0;
  const pb = [[60000000, 0.001, 0], [150000000, 0.0015, 30000], [300000000, 0.0025, 180000], [Infinity, 0.004, 630000]];
  for (const [u, r, d] of pb) { if (propBase <= u) { propTax = round(propBase * r - d); break; } }
  propTax = max(0, propTax);
  const propEdu = round(propTax * 0.20);
  const ded = input.isOneHome ? 1200000000 : 900000000;
  const ce = max(0, input.publicValue - ded);
  const cb = round(ce * 0.60);
  let compTax = 0;
  if (cb > 0) {
    const tH = [[300000000, 0.005, 0], [600000000, 0.007, 600000], [1200000000, 0.010, 2400000], [2500000000, 0.013, 6000000], [5000000000, 0.015, 11000000], [9400000000, 0.020, 36000000], [Infinity, 0.027, 101800000]];
    const tM = [[300000000, 0.005, 0], [600000000, 0.007, 600000], [1200000000, 0.010, 2400000], [2500000000, 0.020, 14400000], [5000000000, 0.030, 39400000], [9400000000, 0.040, 89400000], [Infinity, 0.050, 183400000]];
    const t = input.isOneHome ? tH : tM;
    for (const [u, r, d] of t) { if (cb <= u) { compTax = round(cb * r - d); break; } }
    compTax = max(0, compTax);
  }
  return { propertyTax: propTax, propertyEduTax: propEdu, compTax, totalTax: propTax + propEdu + compTax };
}
function calc_dailyWageTax(input, data) {
  const C = data.constants;
  const taxableDailyWage = max(0, input.dailyWage - C.EXEMPT_AMOUNT);
  const dailyTax = round(taxableDailyWage * C.TAX_RATE * C.CREDIT_RATE);
  const dailyLocalTax = round(dailyTax * C.LOCAL_TAX_RATE);
  const totalDailyDeduct = dailyTax + dailyLocalTax;
  const netDailyWage = input.dailyWage - totalDailyDeduct;
  return { dailyTax, dailyLocalTax, totalDailyDeduct, netDailyWage, totalNet: netDailyWage * input.days };
}
function calc_freelancerTax(input, data) {
  const C = data.constants;
  const incomeTax = round(input.grossPayment * C.INCOME_TAX_RATE);
  const localTax = round(input.grossPayment * C.LOCAL_TAX_RATE);
  const totalTax = incomeTax + localTax;
  return { incomeTax, localTax, totalTax, netPayment: input.grossPayment - totalTax };
}
function calc_vatGeneral(input) {
  return { payable: input.saleVat - input.purchaseVat };
}
function calc_freeSavings(input, data) {
  const { monthlyDeposit, months, rate, taxFree = 'no' } = input;
  const p = monthlyDeposit * months;
  const interest = round(monthlyDeposit * (rate / 12) * months * (months + 1) / 2);
  const taxRate = taxFree === 'yes' ? 0 : data.constants.INTEREST_TAX_RATE;
  const tax = round(interest * taxRate);
  return { principal: p, interest, tax, maturity: p + interest - tax };
}

// ═══════════════════════════════════════════════════════════════
//  BATCH 5 산식 함수 (51-70)
// ═══════════════════════════════════════════════════════════════
function calc_compoundSavings(input, data) {
  const r = input.rate / 12;
  const FV = input.monthlyDeposit * ((Math.pow(1 + r, input.months) - 1) / r);
  const principal = input.monthlyDeposit * input.months;
  const interest = round(FV) - principal;
  const tax = round(interest * data.constants.INTEREST_TAX_RATE);
  return { principal, interest, tax, maturity: principal + interest - tax };
}
function calc_yearEndTaxRefund(input) {
  const ed = (() => {
    if (input.totalSalary <= 5000000) return input.totalSalary * 0.7;
    if (input.totalSalary <= 15000000) return 3500000 + (input.totalSalary - 5000000) * 0.4;
    if (input.totalSalary <= 45000000) return 7500000 + (input.totalSalary - 15000000) * 0.15;
    if (input.totalSalary <= 100000000) return 12000000 + (input.totalSalary - 45000000) * 0.05;
    return 14750000 + (input.totalSalary - 100000000) * 0.02;
  })();
  const personal = input.dependents * 1500000;
  const taxable = max(0, input.totalSalary - ed - personal - input.extraDeduction);
  let tax = 0;
  const br = [[14000000, 0.06, 0], [50000000, 0.15, 1260000], [88000000, 0.24, 5760000], [150000000, 0.35, 15440000], [300000000, 0.38, 19940000], [500000000, 0.40, 25940000], [1000000000, 0.42, 35940000], [Infinity, 0.45, 65940000]];
  for (const [u, rt, d] of br) { if (taxable <= u) { tax = taxable * rt - d; break; } }
  let creditRaw = tax <= 1300000 ? tax * 0.55 : 715000 + (tax - 1300000) * 0.30;
  let limit = 740000;
  if (input.totalSalary > 33000000 && input.totalSalary <= 70000000) limit = max(660000, 740000 - (input.totalSalary - 33000000) * 0.008);
  else if (input.totalSalary > 70000000 && input.totalSalary <= 120000000) limit = max(500000, 660000 - (input.totalSalary - 70000000) * 0.0005);
  else if (input.totalSalary > 120000000) limit = max(200000, 500000 - (input.totalSalary - 120000000) * 0.0005);
  const credit = min(creditRaw, limit);
  let childCredit = 0;
  if (input.kids === 1) childCredit = 250000;
  else if (input.kids === 2) childCredit = 550000;
  else if (input.kids === 3) childCredit = 950000;
  else if (input.kids >= 4) childCredit = 950000 + (input.kids - 3) * 400000;
  const decisionTax = max(0, tax - credit - childCredit - input.extraTaxCredit);
  return { decisionTax: round(decisionTax), refund: round(input.withheldTax - decisionTax) };
}
function calc_retirementIncomeTax(input) {
  const yrs = input.workYears;
  let yearsDed;
  if (yrs <= 5) yearsDed = 1000000 * yrs;
  else if (yrs <= 10) yearsDed = 5000000 + 2000000 * (yrs - 5);
  else if (yrs <= 20) yearsDed = 15000000 + 2500000 * (yrs - 10);
  else yearsDed = 40000000 + 3000000 * (yrs - 20);
  const annualConverted = (input.severance - yearsDed) * 12 / yrs;
  if (annualConverted <= 0) return { yearsDed, annualConverted: 0, taxableBase: 0, tax: 0 };
  let convDed;
  if (annualConverted <= 8000000) convDed = annualConverted;
  else if (annualConverted <= 70000000) convDed = 8000000 + (annualConverted - 8000000) * 0.6;
  else if (annualConverted <= 100000000) convDed = 45200000 + (annualConverted - 70000000) * 0.55;
  else if (annualConverted <= 300000000) convDed = 61700000 + (annualConverted - 100000000) * 0.45;
  else convDed = 151700000 + (annualConverted - 300000000) * 0.35;
  const taxable = max(0, annualConverted - convDed);
  let baseTax = 0;
  const br = [[14000000, 0.06, 0], [50000000, 0.15, 1260000], [88000000, 0.24, 5760000], [150000000, 0.35, 15440000], [300000000, 0.38, 19940000], [500000000, 0.40, 25940000], [1000000000, 0.42, 35940000], [Infinity, 0.45, 65940000]];
  for (const [u, rt, d] of br) { if (taxable <= u) { baseTax = taxable * rt - d; break; } }
  return { yearsDed, annualConverted: round(annualConverted), taxableBase: round(taxable), tax: round(baseTax / 12 * yrs) };
}
function calc_overseasStockTax(input, data) {
  const C = data.constants;
  const taxableBase = max(0, input.gain - C.BASIC_DEDUCTION);
  const incomeTax = round(taxableBase * C.INCOME_TAX_RATE);
  const localTax = round(taxableBase * C.LOCAL_TAX_RATE);
  return { taxableBase, incomeTax, localTax, totalTax: incomeTax + localTax };
}
function calc_vatSimplified(input) {
  return { payable: round(input.sales * input.vatRate * 0.10) };
}
function calc_fourMajorInsuranceEmployer(input, data) {
  const C = data.constants;
  const np = round(min(input.salary, C.NP_CAP) * C.NP_RATE);
  const hi = round(input.salary * C.HI_RATE);
  const ltc = round(hi * C.LTC_RATE);
  const ei = round(input.salary * C.EI_RATE);
  const wc = round(input.salary * input.workCompRate);
  return { np, hi, ltc, ei, wc, total: np + hi + ltc + ei + wc };
}
function calc_businessIncomeTaxSimple(input) {
  const profit = round(input.revenue * (1 - input.expenseRate));
  const taxable = max(0, profit - input.dependents * 1500000);
  let tax = 0;
  const br = [[14000000, 0.06, 0], [50000000, 0.15, 1260000], [88000000, 0.24, 5760000], [150000000, 0.35, 15440000], [300000000, 0.38, 19940000], [Infinity, 0.40, 25940000]];
  for (const [u, rt, d] of br) { if (taxable <= u) { tax = round(taxable * rt - d); break; } }
  tax = max(0, tax);
  const localTax = round(tax * 0.10);
  return { profit, taxable, tax, localTax, total: tax + localTax };
}
function calc_otherIncomeTax(input, data) {
  const C = data.constants;
  const expense = round(input.revenue * C.EXPENSE_RATE);
  const incomeAmount = input.revenue - expense;
  const incomeTax = round(incomeAmount * C.INCOME_TAX_RATE);
  const localTax = round(incomeAmount * C.LOCAL_TAX_RATE);
  return { expense, incomeAmount, incomeTax, localTax, totalTax: incomeTax + localTax };
}
function calc_medicalInsurancePayout(input) {
  const generalCost = input.medicalCost - input.deductible;
  const reimbursement = round(max(0, generalCost) * (1 - input.coPayRate));
  return { reimbursement: max(0, reimbursement), netCost: input.medicalCost - max(0, reimbursement) };
}
function calc_healthInsuranceEmployee(input, data) {
  const C = data.constants;
  const employee = round(input.salary * C.HI_RATE);
  const longTermCare = round(employee * C.LTC_RATE);
  return { employee, longTermCare, total: employee + longTermCare };
}
function calc_healthInsuranceRegional(input) {
  const totalPoints = input.incomePoints + input.propertyPoints + input.carPoints;
  const monthlyPremium = round(totalPoints * input.pointValue);
  const longTermCare = round(monthlyPremium * 0.1295);
  return { totalPoints, monthlyPremium, longTermCare, total: monthlyPremium + longTermCare };
}
function calc_nationalPensionEarly(input, data) {
  const C = data.constants;
  const yearsEarly = C.NORMAL_AGE - input.startAge;
  const reductionRate = +(yearsEarly * C.REDUCTION_PER_YEAR).toFixed(2);
  return { yearsEarly, reductionRate, reducedPension: round(input.normalPension * (1 - reductionRate)) };
}
function calc_retirementPensionDC(input) {
  const annualContribution = round(input.annualSalary / 12);
  let balance = 0;
  for (let y = 0; y < input.years; y++) balance = (balance + annualContribution) * (1 + input.returnRate);
  return { annualContribution, totalContribution: annualContribution * input.years, expectedBalance: round(balance) };
}
function calc_pensionSavingsCredit(input, data) {
  const C = data.constants;
  const applied = min(input.annualDeposit, C.PENSION_LIMIT);
  const rate = input.totalSalary <= C.INCOME_THRESHOLD ? C.RATE_LOW : C.RATE_HIGH;
  return { applied, rate, taxCredit: round(applied * rate) };
}
function calc_noranumbrellaTaxSaving(input) {
  const limit = input.businessIncome <= 40000000 ? 5000000 : (input.businessIncome <= 100000000 ? 3000000 : 2000000);
  const applied = min(input.annualDeposit, limit);
  let marginalRate = 0.06;
  if (input.businessIncome > 14000000) marginalRate = 0.15;
  if (input.businessIncome > 50000000) marginalRate = 0.24;
  if (input.businessIncome > 88000000) marginalRate = 0.35;
  if (input.businessIncome > 150000000) marginalRate = 0.38;
  return { limit, applied, marginalRate, taxSaving: round(applied * marginalRate) };
}
function calc_divorceAlimony(input) {
  let baseAmount;
  if (input.marriageYears < 5) baseAmount = 10000000;
  else if (input.marriageYears < 10) baseAmount = 20000000;
  else if (input.marriageYears < 20) baseAmount = 35000000;
  else baseAmount = 60000000;
  const faultMultiplier = input.faultDegree === "high" ? 1.5 : (input.faultDegree === "medium" ? 1.0 : 0.5);
  return { baseAmount, faultMultiplier, estimatedAmount: round(baseAmount * faultMultiplier) };
}
function calc_inheritanceShare(input) {
  const result = { spouse: 0, child: 0, parent: 0, sibling: 0 };
  if (input.children > 0) {
    const totalShares = input.children * 1.0 + (input.hasSpouse ? 1.5 : 0);
    result.spouse = input.hasSpouse ? round(input.totalEstate * 1.5 / totalShares) : 0;
    result.child = round(input.totalEstate * 1.0 / totalShares);
  } else if (input.parents > 0) {
    const totalShares = input.parents * 1.0 + (input.hasSpouse ? 1.5 : 0);
    result.spouse = input.hasSpouse ? round(input.totalEstate * 1.5 / totalShares) : 0;
    result.parent = round(input.totalEstate * 1.0 / totalShares);
  } else if (input.hasSpouse) {
    result.spouse = input.totalEstate;
  } else if (input.siblings > 0) {
    result.sibling = round(input.totalEstate / input.siblings);
  }
  return result;
}
function calc_annualLeaveAllowance(input, data) {
  const C = data.constants;
  const hourlyWage = round(input.monthlySalary / C.MONTHLY_HOURS);
  const dailyWage = hourlyWage * C.DAILY_HOURS;
  return { hourlyWage, dailyWage, allowance: dailyWage * input.unusedDays };
}
function calc_unpaidWages(input, data) {
  const interest = round(input.unpaidAmount * data.constants.DELAY_RATE * input.delayDays / 365);
  return { unpaidAmount: input.unpaidAmount, interest, total: input.unpaidAmount + interest };
}
function calc_maternityLeavePay(input) {
  const days = input.isMultiple ? 120 : 90;
  const eligibleDays = days - 60;
  const dailyWage = round(input.monthlySalary / 30);
  const upper = round(2000000 / 30);
  const cappedDailyWage = min(dailyWage, upper);
  const govPay = cappedDailyWage * eligibleDays;
  const companyPay = dailyWage * 60;
  return { totalDays: days, dailyWage, govPay, companyPay, total: govPay + companyPay };
}

// ═══════════════════════════════════════════════════════════════
//  BATCH 6 산식 함수 (71-90)
// ═══════════════════════════════════════════════════════════════
function calc_transferTaxAdjusted(input, data) {
  const C = data.constants, T = data.tables;
  const gain = input.salePrice - input.acquisitionPrice;
  let ltbcRate = 0;
  if (input.holdingYears >= 3) ltbcRate = min(0.06 + (input.holdingYears - 3) * 0.02, 0.30);
  const incomeAmount = round(gain * (1 - ltbcRate));
  const taxableBase = max(0, incomeAmount - C.BASIC_DEDUCTION);
  let baseTax = 0;
  for (const b of T.incomeTaxBrackets.brackets) {
    if (b.upperBound === null || taxableBase <= b.upperBound) { baseTax = round(taxableBase * b.rate - b.progressiveDeduction); break; }
  }
  baseTax = max(0, baseTax);
  let surcharge = 0;
  if (input.houseCount === 2) surcharge = round(taxableBase * 0.20);
  else if (input.houseCount >= 3) surcharge = round(taxableBase * 0.30);
  const totalIncomeTax = max(0, baseTax + surcharge);
  const localTax = round(totalIncomeTax * C.LOCAL_TAX_RATE);
  return { gain, ltbcRate: +ltbcRate.toFixed(4), incomeAmount, taxableBase, baseTax, surcharge, totalIncomeTax, localTax, totalTax: totalIncomeTax + localTax };
}
function calc_housingSubscriptionScore(input, data) {
  const C = data.constants;
  const noHomeScore = min(C.MAX_NO_HOME, input.noHomeYears * 2);
  const familyScore = min(C.MAX_FAMILY, 5 + input.dependents * 5);
  // 청약 통장 가점: 6개월 미만 1점, 6~12개월 2점, 1년+이상 floor(years)+2점, 15년+ 17점 cap
  let accountScore;
  if (input.accountYears < 0.5) accountScore = 1;
  else if (input.accountYears < 1) accountScore = 2;
  else accountScore = min(C.MAX_ACCOUNT, Math.floor(input.accountYears) + 1);
  return { noHomeScore, familyScore, accountScore, total: noHomeScore + familyScore + accountScore };
}
function calc_subscriptionPriority(input, data) {
  const C = data.constants;
  const req = C.REGION_REQUIREMENTS[input.region] || C.REGION_REQUIREMENTS.nonMetro;
  const requiredMonths = req.months;
  const requiredDeposits = req.deposits;
  const accountOk = input.accountMonths >= requiredMonths;
  const depositOk = input.depositCount >= requiredDeposits;
  const noHomeOk = !!input.isNoHome;
  return { requiredMonths, requiredDeposits, accountOk, depositOk, noHomeOk, isEligible: accountOk && depositOk && noHomeOk };
}
function calc_driverInsurance(input, data) {
  const baseRate = data.tables.baseRates[input.coverage];
  let ageMultiplier = 1.0;
  if (input.age < 26) ageMultiplier = 1.5;
  else if (input.age < 35) ageMultiplier = 1.1;
  else if (input.age < 50) ageMultiplier = 1.0;
  else if (input.age < 65) ageMultiplier = 1.2;
  else ageMultiplier = 1.5;
  return { baseRate, ageMultiplier, monthlyPremium: round(baseRate * ageMultiplier), annualPremium: round(baseRate * ageMultiplier * 12) };
}
function calc_lifeInsuranceSurrender(input) {
  const totalPaid = round(input.monthlyPremium * 12 * input.paidYears);
  const surrender = round(totalPaid * input.surrenderRate);
  return { totalPaid, surrender, netLoss: totalPaid - surrender };
}
function calc_retirementPensionDB(input) {
  const dailyWage = round(input.lastAvgSalary / 30);
  return { dailyWage, dbAmount: round(dailyWage * 30 * input.workYears) };
}
function calc_inheritanceDeadline(input) {
  const deathDate = new Date(input.deathDate);
  const deadlineDate = new Date(deathDate);
  deadlineDate.setMonth(deadlineDate.getMonth() + 3);
  const today = new Date(input.todayDate);
  const remainingDays = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
  return { deadline: deadlineDate.toISOString().split("T")[0], remainingDays, isExpired: remainingDays < 0 };
}
function calc_durunuriSupport(input, data) {
  const C = data.constants;
  const employeeNP = round(input.salary * 0.045);
  const employeeEI = round(input.salary * 0.009);
  const employerNP = round(input.salary * 0.045);
  const employerEI = round(input.salary * 0.0115);
  const isEligible = input.salary < C.SALARY_LIMIT && input.employees < C.EMPLOYEE_LIMIT;
  const monthlySupport = isEligible ? round((employeeNP + employeeEI + employerNP + employerEI) * C.SUPPORT_RATE) : 0;
  return { isEligible, employeeNP, employeeEI, employerNP, employerEI, monthlySupport };
}
function calc_youthRentSupport(input, data) {
  const C = data.constants;
  const isEligible = input.age >= 19 && input.age <= 34 && input.isNoHome && input.medianIncomePct <= 60;
  const monthlySupport = isEligible ? min(input.actualRent, C.MAX_MONTHLY) : 0;
  return { isEligible, monthlySupport, annualSupport: monthlySupport * C.MONTHS };
}
function calc_youthHousingAllowance(input, data) {
  const baseRent = data.tables.baseRent[input.householdSize] || 700000;
  const livelihoodBase = data.tables.livelihoodBase[input.householdSize] || 2700000;
  const medianIncome47 = livelihoodBase * (47/30);
  const isEligible = input.incomeAmount <= round(medianIncome47);
  const selfPay = max(0, (input.incomeAmount - livelihoodBase) * 0.30);
  const monthlySupport = isEligible ? max(0, round(baseRent - selfPay)) : 0;
  return { isEligible, baseRent, livelihoodBase, selfPay: round(selfPay), monthlySupport };
}
function calc_nationalScholarship(input, data) {
  const tier = input.incomeTier;
  const tuition = input.semesterTuition;
  const tierSupport = data.tables.tierSupport[tier] || 0;
  return { tier, support: min(tierSupport, tuition) };
}
function calc_industrialAccidentPay(input, data) {
  const C = data.constants;
  const dailyAvgWage = round(input.monthlySalary / 30);
  const dailyBenefit = round(dailyAvgWage * C.BENEFIT_RATE);
  return { dailyAvgWage, dailyBenefit, totalBenefit: dailyBenefit * input.injuryDays };
}
function calc_earnedIncomeTaxCredit(input, data) {
  const limits = data.tables.limits[input.householdType];
  const limit = limits.income, maxAmount = limits.max;
  const isEligible = input.totalIncome <= limit;
  let estimatedAmount = 0;
  if (isEligible) {
    if (input.totalIncome <= limit * 0.5) estimatedAmount = round(maxAmount * (input.totalIncome / (limit * 0.5)));
    else estimatedAmount = round(maxAmount * (1 - (input.totalIncome - limit * 0.5) / (limit * 0.5)));
  }
  return { limit, maxAmount, isEligible, estimatedAmount };
}
function calc_childAllowance(input, data) {
  const C = data.constants;
  const isEligible = input.totalIncome <= C.INCOME_LIMIT && input.childrenUnder18 > 0;
  const estimatedAmount = isEligible ? min(input.childrenUnder18 * C.MAX_PER_CHILD, round(C.MAX_PER_CHILD * input.childrenUnder18 * (1 - input.totalIncome / C.INCOME_LIMIT))) : 0;
  return { isEligible, estimatedAmount: max(0, estimatedAmount) };
}
function calc_retirementFunds(input) {
  const yearsTillRetire = input.retireAge - input.currentAge;
  const yearsAfterRetire = input.lifeExpectancy - input.retireAge;
  const futureLivingCost = round(input.currentMonthlyLiving * Math.pow(1 + input.inflationRate, yearsTillRetire));
  return { yearsTillRetire, yearsAfterRetire, futureLivingCost, totalNeeded: round(futureLivingCost * 12 * yearsAfterRetire) };
}
function calc_assetManagementSim(input) {
  const fvOfPresent = input.currentAssets * Math.pow(1 + input.annualReturn, input.years);
  const r = input.annualReturn / 12;
  const n = input.years * 12;
  const fvOfMonthly = input.monthlySaving * ((Math.pow(1 + r, n) - 1) / r);
  const totalFV = round(fvOfPresent + fvOfMonthly);
  const totalSaved = input.currentAssets + input.monthlySaving * n;
  return { totalSaved, expectedFV: totalFV, profit: totalFV - totalSaved };
}
function calc_buyVsJeonse(input) {
  const buyTotalCost = input.buyPrice * 0.012 + input.buyPrice * 0.005 + input.buyPrice * input.loanRate * (1 - input.downPaymentRatio) * input.years;
  const buyOpportunityCost = input.buyPrice * input.downPaymentRatio * input.opportunityRate * input.years;
  const totalBuyCost = round(buyTotalCost + buyOpportunityCost);
  const jeonseInterest = input.jeonseDeposit * input.loanRate * 0.7 * input.years;
  const jeonseOpportunity = input.jeonseDeposit * 0.3 * input.opportunityRate * input.years;
  const totalJeonseCost = round(jeonseInterest + jeonseOpportunity);
  return { totalBuyCost, totalJeonseCost, diff: totalBuyCost - totalJeonseCost };
}
function calc_weddingCost(input) {
  const wedding = input.weddingHall + input.dress + input.honeymoon + input.jewelry;
  const housing = input.housingDeposit;
  const furniture = input.furniture;
  return { wedding, housing, furniture, total: wedding + housing + furniture };
}
function calc_childTuitionSim(input) {
  const yearsToCollege = max(0, 19 - input.currentChildAge);
  const futureTuition = round(input.currentAnnualTuition * Math.pow(1 + input.inflationRate, yearsToCollege));
  const totalCollegeCost = futureTuition * 4;
  const monthsToSave = yearsToCollege * 12;
  const r = input.savingReturn / 12;
  const monthlyNeeded = monthsToSave > 0 ? round(totalCollegeCost / (((Math.pow(1 + r, monthsToSave) - 1) / r))) : 0;
  return { yearsToCollege, futureTuition, totalCollegeCost, monthlyNeeded };
}
function calc_youngAssetFormation(input) {
  const monthlySaving = round(input.monthlyIncome * input.savingRate);
  const r = input.annualReturn / 12;
  const n = input.years * 12;
  const fv = round(monthlySaving * ((Math.pow(1 + r, n) - 1) / r));
  return { monthlySaving, totalSaved: monthlySaving * n, fv };
}

// ═══════════════════════════════════════════════════════════════
//  BATCH 7 산식 함수 (91-101)
// ═══════════════════════════════════════════════════════════════
function calc_savingsVsFund(input) {
  const r = input.rate / 12;
  const savingsFV = input.monthlyDeposit * ((Math.pow(1 + r, input.months) - 1) / r);
  const savingsNet = round(savingsFV - (savingsFV - input.monthlyDeposit * input.months) * 0.154);
  const fixedFV = input.principal * (1 + input.rate * (input.months / 12));
  const fixedNet = round(fixedFV - (input.principal * input.rate * (input.months / 12)) * 0.154);
  const fundFV = input.principal * Math.pow(1 + input.fundReturn, input.months / 12);
  const fundNet = round(fundFV - (fundFV - input.principal) * 0.154);
  return { savingsNet, fixedNet, fundNet };
}
function calc_childRearingCost(input) {
  const stages = { infant: 12000000, toddler: 18000000, preschool: 18000000, elementary: 30000000, middle: 24000000, high: 30000000, college: 60000000 };
  const total = (stages.infant + stages.toddler + stages.preschool + stages.elementary + stages.middle + stages.high + stages.college) * input.children;
  const monthly = round(total / (22 * 12) / input.children) * input.children;
  return { totalCost: total, monthlyAvg: monthly };
}
function calc_postRetirementLiving(input) {
  const r = input.annualReturn / 12;
  let balance = input.retirementAssets;
  let months = 0;
  while (balance > 0 && months < 600) {
    balance = balance * (1 + r) - input.monthlyExpense;
    months++;
    if (balance <= 0) break;
  }
  return { monthsLasting: months, yearsLast: +(months / 12).toFixed(1) };
}
function calc_realestateBuyVsRent(input) {
  const totalRentIncome = input.monthlyRent * 12 * input.years;
  const totalTax = round(totalRentIncome * 0.20);
  const netIncome = totalRentIncome - totalTax;
  const buyCost = round(input.buyPrice * 0.012 + input.buyPrice * 0.005 * input.years);
  return { totalRentIncome, totalTax, netIncome, buyCost, netProfit: netIncome - buyCost };
}
function calc_cardPointsVsCashback(input) {
  const accumulation = round(input.monthlySpending * input.accumRate);
  const cashback = round(input.monthlySpending * input.cashbackRate);
  const annualAccum = accumulation * 12;
  const annualCashback = cashback * 12;
  return { monthlyAccum: accumulation, monthlyCashback: cashback, annualAccum, annualCashback, betterChoice: annualAccum > annualCashback ? "accumulation" : "cashback" };
}
function calc_publicOfficerPension(input) {
  let rate;
  if (input.entryYear <= 1995) rate = 0.019;
  else if (input.entryYear <= 2009) rate = 0.0185;
  else if (input.entryYear <= 2015) rate = 0.0178;
  else rate = 0.017;
  const annualPension = round(input.avgSalary * input.workYears * rate * 12);
  return { rate, annualPension, monthlyPension: round(annualPension / 12) };
}
function calc_singleParentSupport(input, data) {
  const isEligible = input.medianIncomePct <= 60 && input.childAge < 18;
  const monthlySupport = isEligible ? data.constants.MONTHLY_SUPPORT : 0;
  return { isEligible, monthlySupport, annualSupport: monthlySupport * 12 };
}
function calc_unemploymentBenefitDays(input) {
  let days = 120;
  if (input.insuredYears >= 1 && input.insuredYears < 3) days = 150;
  else if (input.insuredYears >= 3 && input.insuredYears < 5) days = 180;
  else if (input.insuredYears >= 5 && input.insuredYears < 10) days = 210;
  else if (input.insuredYears >= 10) days = 240;
  if (input.isElderlyOrDisabled) days += 30;
  return { days };
}
function calc_cryptoTransferTax(input, data) {
  const C = data.constants;
  const taxableBase = max(0, input.gain - C.BASIC_DEDUCTION);
  const incomeTax = round(taxableBase * C.INCOME_TAX_RATE);
  const localTax = round(taxableBase * C.LOCAL_TAX_RATE);
  return { taxableBase, incomeTax, localTax, totalTax: incomeTax + localTax };
}
function calc_birthChildcareSupport(input, data) {
  const firstMeeting = data.constants.FIRST_MEETING;
  const parentalAllowance0 = input.childAge < 1 ? 1000000 * 12 : 0;
  const parentalAllowance1 = (input.childAge >= 1 && input.childAge < 2) ? 500000 * 12 : 0;
  const childAllowance = input.childAge < 8 ? 100000 * 12 : 0;
  return { firstMeeting, parentalAllowance0, parentalAllowance1, childAllowance, total: firstMeeting + parentalAllowance0 + parentalAllowance1 + childAllowance };
}
function calc_elderlyMedicalCost(input) {
  const yearsAfterRetire = input.lifeExpectancy - input.retireAge;
  let totalMedical = 0;
  for (let age = input.retireAge; age < input.lifeExpectancy; age++) {
    let monthly = 200000;
    if (age >= 75) monthly = 500000;
    if (age >= 85) monthly = 800000;
    totalMedical += monthly * 12;
  }
  return { yearsAfterRetire, totalMedicalCost: totalMedical, monthlyAvg: round(totalMedical / yearsAfterRetire / 12) };
}

// ═══════════════════════════════════════════════════════════════
//  RUNNER
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — transfer-tax (통합: 1세대1주택/조정 다주택/다주택자)
// ═══════════════════════════════════════════════════════════════
function calc_transferTaxUnified(input, data) {
  const mode = input.taxMode || '1home';
  if (mode === 'adjusted') return calc_transferTaxAdjusted(input, data);
  if (mode === 'multi') return calc_transferTaxMulti(input, data);
  return calc_transferTax(input, data); // 1home (기본)
}

const calculators = {
  'salary-net-pay': calc_salary,
  'comprehensive-income-tax': calc_compIncome,
  'acquisition-tax': calc_acqTax,
  'brokerage-fee': calc_brokerage,
  'transfer-tax-1home': calc_transferTax,
  'transfer-tax': calc_transferTaxUnified,
  'severance-pay': calc_severance,
  'national-pension': calc_nationalPension,
  'unemployment-benefit': calc_unemployment,
  'youth-leap-account': calc_youthLeap,
  'dsr-limit': calc_dsr,
  'installment-savings': calc_installmentSavings,
  'fixed-deposit': calc_fixedDeposit,
  'loan-amortization': calc_loanAmortization,
  'loan-decline': calc_loanDecline,
  'ltv-limit': calc_ltvLimit,
  'transfer-tax-multi': calc_transferTaxMulti,
  'comprehensive-real-estate-tax': calc_propertyTaxComp,
  'property-tax': calc_propertyTax,
  'inheritance-tax': calc_inheritanceTax,
  'gift-tax': calc_giftTax,
  'irp-tax-credit': calc_irpTaxCredit,
  'basic-pension': calc_basicPension,
  'parental-leave-pay': calc_parentalLeavePay,
  'child-support': calc_childSupport,
  'four-major-insurance': calc_fourMajorInsurance,
  'simple-vs-compound': calc_simpleVsCompound,
  'child-tax-credit': calc_childTaxCredit,
  'stock-transfer-tax': calc_stockTransferTax,
  'auto-insurance': calc_autoInsurance,
  'rental-yield': calc_rentalYield,
  'tax-free-savings': calc_taxFreeSavings,
  'isa-tax-saving': calc_isaTaxSaving,
  'housing-subscription': calc_housingSubscription,
  'balloon-payment': calc_balloonPayment,
  'grace-period-loan': calc_gracePeriodLoan,
  'dti-limit': calc_dtiLimit,
  'jeonse-loan': calc_jeonseLoan,
  'mortgage-loan-limit': calc_mortgageLoanLimit,
  'prepayment-fee': calc_prepaymentFee,
  'credit-loan': calc_creditLoan,
  'loan-refinance': calc_loanRefinance,
  'real-estate-roi': calc_realEstateROI,
  'jeonse-monthly-conversion': calc_jeonseMonthlyConversion,
  'holding-tax-total': calc_holdingTaxTotal,
  'daily-wage-tax': calc_dailyWageTax,
  'freelancer-tax': calc_freelancerTax,
  'vat-general': calc_vatGeneral,
  'free-savings': calc_freeSavings,
  'compound-savings': calc_compoundSavings,
  'year-end-tax-refund': calc_yearEndTaxRefund,
  'retirement-income-tax': calc_retirementIncomeTax,
  'overseas-stock-tax': calc_overseasStockTax,
  'vat-simplified': calc_vatSimplified,
  'four-major-insurance-employer': calc_fourMajorInsuranceEmployer,
  'business-income-tax-simple': calc_businessIncomeTaxSimple,
  'other-income-tax': calc_otherIncomeTax,
  'medical-insurance-payout': calc_medicalInsurancePayout,
  'national-pension-early': calc_nationalPensionEarly,
  'retirement-pension-dc': calc_retirementPensionDC,
  'pension-savings-credit': calc_pensionSavingsCredit,
  'noranumbrella-tax-saving': calc_noranumbrellaTaxSaving,
  'divorce-alimony': calc_divorceAlimony,
  'inheritance-share': calc_inheritanceShare,
  'annual-leave-allowance': calc_annualLeaveAllowance,
  'unpaid-wages': calc_unpaidWages,
  'maternity-leave-pay': calc_maternityLeavePay,
  'transfer-tax-adjusted': calc_transferTaxAdjusted,
  'housing-subscription-score': calc_housingSubscriptionScore,
  'subscription-priority': calc_subscriptionPriority,
  'retirement-pension-db': calc_retirementPensionDB,
  'inheritance-deadline': calc_inheritanceDeadline,
  'durunuri-support': calc_durunuriSupport,
  'youth-rent-support': calc_youthRentSupport,
  'youth-housing-allowance': calc_youthHousingAllowance,
  'national-scholarship': calc_nationalScholarship,
  'industrial-accident-pay': calc_industrialAccidentPay,
  'earned-income-tax-credit': calc_earnedIncomeTaxCredit,
  'child-allowance': calc_childAllowance,
  'public-officer-pension': calc_publicOfficerPension,
  'single-parent-support': calc_singleParentSupport,
  'unemployment-benefit-days': calc_unemploymentBenefitDays,
  'crypto-transfer-tax': calc_cryptoTransferTax,
  'birth-childcare-support': calc_birthChildcareSupport,
  'median-income': calc_medianIncome,
  'near-poor-eligibility': calc_nearPoor,
  'basic-livelihood-eligibility': calc_basicLivelihood,
  'percent-calculator': calc_percent,
  'age-calculator': calc_age,
  'date-calculator': calc_dateDiff,
  'installment-fee': calc_installmentFee,
  'cash-service-fee': calc_cashServiceFee
};

// ═══════════════════════════════════════════════════════════════
//  도구성 5개 (퍼센트·나이·날짜·할부·현금서비스)
// ═══════════════════════════════════════════════════════════════
function calc_percent(input) {
  const { mode, a, b } = input;
  if (mode === "percentOf") return { result: +(a * b / 100).toFixed(2) };
  if (mode === "ratio") return { result: +(a / b * 100).toFixed(2) };
  if (mode === "increase") return { result: +((b - a) / a * 100).toFixed(2) };
  if (mode === "afterIncrease") return { result: +(a * (1 + b/100)).toFixed(2) };
  return { result: 0 };
}
function calc_age(input) {
  const birth = new Date(input.birthDate);
  const today = new Date(input.todayDate);
  let westAge = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) westAge--;
  const koreanAge = today.getFullYear() - birth.getFullYear() + 1;
  const zodiacs = ["원숭이","닭","개","돼지","쥐","소","호랑이","토끼","용","뱀","말","양"];
  const zodiac = zodiacs[birth.getFullYear() % 12];
  return { westAge, koreanAge, zodiac, year: birth.getFullYear() };
}
function calc_dateDiff(input) {
  const start = new Date(input.startDate);
  const end = new Date(input.endDate);
  const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  const years = Math.floor(diff / 365);
  const months = Math.floor((diff % 365) / 30);
  const days = diff - years * 365 - months * 30;
  return { totalDays: diff, years, months, days };
}
function calc_installmentFee(input) {
  const { principal, months, annualRate } = input;
  const r = annualRate / 12;
  const M = principal * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1);
  const monthlyPayment = round(M);
  const totalPayment = round(M * months);
  return { monthlyPayment, totalPayment, totalFee: totalPayment - principal };
}
function calc_cashServiceFee(input) {
  const interest = round(input.amount * (input.annualRate / 365) * input.days);
  return { interest, totalRepayment: input.amount + interest };
}

// ═══════════════════════════════════════════════════════════════
//  복지 신규 3개 (중위소득·차상위·기초생활수급자)
// ═══════════════════════════════════════════════════════════════
function calc_medianIncome(input, data) {
  const median100 = data.tables.median100[input.householdSize] || 7618369;
  return {
    median100,
    median50: round(median100 * 0.50),
    median47: round(median100 * 0.47),
    median40: round(median100 * 0.40),
    median30: round(median100 * 0.30),
    userPct: +(input.incomeAmount / median100 * 100).toFixed(1)
  };
}
function calc_nearPoor(input, data) {
  const median100 = data.tables.median100[input.householdSize] || 7618369;
  const threshold = round(median100 * 0.50);
  return {
    threshold,
    isEligible: input.incomeAmount <= threshold,
    incomePct: +(input.incomeAmount / median100 * 100).toFixed(1)
  };
}
function calc_basicLivelihood(input, data) {
  const median100 = data.tables.median100[input.householdSize] || 7618369;
  const livelihood30 = round(median100 * 0.30);
  const medical40 = round(median100 * 0.40);
  const housing47 = round(median100 * 0.47);
  const education50 = round(median100 * 0.50);
  return {
    median100,
    livelihood: { threshold: livelihood30, isEligible: input.incomeAmount <= livelihood30 },
    medical: { threshold: medical40, isEligible: input.incomeAmount <= medical40 },
    housing: { threshold: housing47, isEligible: input.incomeAmount <= housing47 },
    education: { threshold: education50, isEligible: input.incomeAmount <= education50 }
  };
}

module.exports = { calculators };
