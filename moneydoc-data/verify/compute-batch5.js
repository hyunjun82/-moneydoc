const round = Math.round, min = Math.min, max = Math.max;

const tests = [
  ["51 복리 적금 만기", (i) => {
    const r = i.rate / 12;
    const FV = i.monthlyDeposit * ((Math.pow(1 + r, i.months) - 1) / r);
    const principal = i.monthlyDeposit * i.months;
    const interest = round(FV) - principal;
    const tax = round(interest * 0.154);
    return { principal, interest, tax, maturity: principal + interest - tax };
  }, [
    { monthlyDeposit: 500000, months: 24, rate: 0.040 },
    { monthlyDeposit: 1000000, months: 60, rate: 0.045 },
    { monthlyDeposit: 300000, months: 36, rate: 0.038 },
    { monthlyDeposit: 200000, months: 60, rate: 0.035 },
    { monthlyDeposit: 700000, months: 48, rate: 0.040 }
  ]],
  ["52 연말정산 환급", (i) => {
    const ed = (() => {
      if (i.totalSalary <= 5000000) return i.totalSalary * 0.7;
      if (i.totalSalary <= 15000000) return 3500000 + (i.totalSalary - 5000000) * 0.4;
      if (i.totalSalary <= 45000000) return 7500000 + (i.totalSalary - 15000000) * 0.15;
      if (i.totalSalary <= 100000000) return 12000000 + (i.totalSalary - 45000000) * 0.05;
      return 14750000 + (i.totalSalary - 100000000) * 0.02;
    })();
    const personal = i.dependents * 1500000;
    const taxable = max(0, i.totalSalary - ed - personal - i.extraDeduction);
    let tax = 0;
    const br = [[14000000, 0.06, 0], [50000000, 0.15, 1260000], [88000000, 0.24, 5760000], [150000000, 0.35, 15440000], [300000000, 0.38, 19940000], [500000000, 0.40, 25940000], [1000000000, 0.42, 35940000], [Infinity, 0.45, 65940000]];
    for (const [u, rt, d] of br) { if (taxable <= u) { tax = taxable * rt - d; break; } }
    let creditRaw = tax <= 1300000 ? tax * 0.55 : 715000 + (tax - 1300000) * 0.30;
    let limit = 740000;
    if (i.totalSalary > 33000000 && i.totalSalary <= 70000000) limit = max(660000, 740000 - (i.totalSalary - 33000000) * 0.008);
    else if (i.totalSalary > 70000000 && i.totalSalary <= 120000000) limit = max(500000, 660000 - (i.totalSalary - 70000000) * 0.0005);
    else if (i.totalSalary > 120000000) limit = max(200000, 500000 - (i.totalSalary - 120000000) * 0.0005);
    const credit = min(creditRaw, limit);
    let childCredit = 0;
    if (i.kids === 1) childCredit = 250000;
    else if (i.kids === 2) childCredit = 550000;
    else if (i.kids === 3) childCredit = 950000;
    else if (i.kids >= 4) childCredit = 950000 + (i.kids - 3) * 400000;
    const decisionTax = max(0, tax - credit - childCredit - i.extraTaxCredit);
    const refund = i.withheldTax - decisionTax;
    return { decisionTax: round(decisionTax), refund: round(refund) };
  }, [
    { totalSalary: 50000000, dependents: 1, kids: 0, extraDeduction: 0, extraTaxCredit: 0, withheldTax: 4000000 },
    { totalSalary: 70000000, dependents: 4, kids: 2, extraDeduction: 5000000, extraTaxCredit: 500000, withheldTax: 5000000 },
    { totalSalary: 30000000, dependents: 1, kids: 0, extraDeduction: 0, extraTaxCredit: 0, withheldTax: 1000000 },
    { totalSalary: 100000000, dependents: 1, kids: 0, extraDeduction: 0, extraTaxCredit: 0, withheldTax: 15000000 },
    { totalSalary: 40000000, dependents: 3, kids: 1, extraDeduction: 2000000, extraTaxCredit: 0, withheldTax: 1500000 }
  ]],
  ["53 퇴직소득세", (i) => {
    const yrs = i.workYears;
    let yearsDed;
    if (yrs <= 5) yearsDed = 1000000 * yrs;
    else if (yrs <= 10) yearsDed = 5000000 + 2000000 * (yrs - 5);
    else if (yrs <= 20) yearsDed = 15000000 + 2500000 * (yrs - 10);
    else yearsDed = 40000000 + 3000000 * (yrs - 20);
    const annualConverted = (i.severance - yearsDed) * 12 / yrs;
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
    const tax = round(baseTax / 12 * yrs);
    return { yearsDed, annualConverted: round(annualConverted), taxableBase: round(taxable), tax };
  }, [
    { severance: 30000000, workYears: 5 },
    { severance: 100000000, workYears: 15 },
    { severance: 50000000, workYears: 10 },
    { severance: 200000000, workYears: 25 },
    { severance: 80000000, workYears: 20 }
  ]],
  ["54 해외주식 양도세", (i) => {
    const taxableBase = max(0, i.gain - 2500000);
    const incomeTax = round(taxableBase * 0.20);
    const localTax = round(taxableBase * 0.02);
    return { taxableBase, incomeTax, localTax, totalTax: incomeTax + localTax };
  }, [
    { gain: 5000000 },
    { gain: 30000000 },
    { gain: 100000000 },
    { gain: 500000 },
    { gain: 200000000 }
  ]],
  ["55 부가세 간이", (i) => {
    return { payable: round(i.sales * i.vatRate * 0.10) };
  }, [
    { sales: 30000000, vatRate: 0.10 },
    { sales: 50000000, vatRate: 0.20 },
    { sales: 80000000, vatRate: 0.05 },
    { sales: 20000000, vatRate: 0.30 },
    { sales: 100000000, vatRate: 0.15 }
  ]],
  ["56 4대보험 회사부담", (i) => {
    const np = round(min(i.salary, 5900000) * 0.045);
    const hi = round(i.salary * 0.03545);
    const ltc = round(hi * 0.1295);
    const ei = round(i.salary * (0.009 + 0.0025));
    const wc = round(i.salary * i.workCompRate);
    return { np, hi, ltc, ei, wc, total: np + hi + ltc + ei + wc };
  }, [
    { salary: 3000000, workCompRate: 0.015 },
    { salary: 5000000, workCompRate: 0.015 },
    { salary: 7000000, workCompRate: 0.015 },
    { salary: 2500000, workCompRate: 0.015 },
    { salary: 10000000, workCompRate: 0.015 }
  ]],
  ["57 사업소득세 단순경비율", (i) => {
    const profit = round(i.revenue * (1 - i.expenseRate));
    const taxable = max(0, profit - i.dependents * 1500000);
    let tax = 0;
    const br = [[14000000, 0.06, 0], [50000000, 0.15, 1260000], [88000000, 0.24, 5760000], [150000000, 0.35, 15440000], [300000000, 0.38, 19940000], [Infinity, 0.40, 25940000]];
    for (const [u, rt, d] of br) { if (taxable <= u) { tax = round(taxable * rt - d); break; } }
    tax = max(0, tax);
    return { profit, taxable, tax, localTax: round(tax * 0.10), total: tax + round(tax * 0.10) };
  }, [
    { revenue: 30000000, expenseRate: 0.80, dependents: 1 },
    { revenue: 50000000, expenseRate: 0.65, dependents: 2 },
    { revenue: 100000000, expenseRate: 0.50, dependents: 4 },
    { revenue: 20000000, expenseRate: 0.85, dependents: 1 },
    { revenue: 200000000, expenseRate: 0.60, dependents: 1 }
  ]],
  ["58 기타소득세", (i) => {
    const expense = round(i.revenue * 0.60);
    const incomeAmount = i.revenue - expense;
    const incomeTax = round(incomeAmount * 0.20);
    const localTax = round(incomeAmount * 0.02);
    return { expense, incomeAmount, incomeTax, localTax, totalTax: incomeTax + localTax };
  }, [
    { revenue: 500000 },
    { revenue: 1000000 },
    { revenue: 3000000 },
    { revenue: 5000000 },
    { revenue: 100000 }
  ]],
  ["59 실손보험 자기부담", (i) => {
    const generalCost = i.medicalCost - i.deductible;
    const reimbursement = round(max(0, generalCost) * (1 - i.coPayRate));
    return { reimbursement: max(0, reimbursement), netCost: i.medicalCost - max(0, reimbursement) };
  }, [
    { medicalCost: 1000000, deductible: 100000, coPayRate: 0.20 },
    { medicalCost: 500000, deductible: 30000, coPayRate: 0.30 },
    { medicalCost: 5000000, deductible: 100000, coPayRate: 0.20 },
    { medicalCost: 100000, deductible: 30000, coPayRate: 0.30 },
    { medicalCost: 10000000, deductible: 200000, coPayRate: 0.20 }
  ]],
  ["60 건강보험 직장가입자", (i) => {
    const employee = round(i.salary * 0.03545);
    const longTermCare = round(employee * 0.1295);
    return { employee, longTermCare, total: employee + longTermCare };
  }, [
    { salary: 2000000 },
    { salary: 3500000 },
    { salary: 5000000 },
    { salary: 7000000 },
    { salary: 10000000 }
  ]],
  ["61 건강보험 지역가입자", (i) => {
    const totalPoints = i.incomePoints + i.propertyPoints + i.carPoints;
    const monthlyPremium = round(totalPoints * i.pointValue);
    const longTermCare = round(monthlyPremium * 0.1295);
    return { totalPoints, monthlyPremium, longTermCare, total: monthlyPremium + longTermCare };
  }, [
    { incomePoints: 500, propertyPoints: 300, carPoints: 0, pointValue: 208.4 },
    { incomePoints: 1000, propertyPoints: 800, carPoints: 200, pointValue: 208.4 },
    { incomePoints: 200, propertyPoints: 100, carPoints: 0, pointValue: 208.4 },
    { incomePoints: 1500, propertyPoints: 1200, carPoints: 300, pointValue: 208.4 },
    { incomePoints: 800, propertyPoints: 500, carPoints: 100, pointValue: 208.4 }
  ]],
  ["62 국민연금 조기수령", (i) => {
    const yearsEarly = 65 - i.startAge;
    const reductionRate = +(yearsEarly * 0.06).toFixed(2);
    const reducedPension = round(i.normalPension * (1 - reductionRate));
    return { yearsEarly, reductionRate, reducedPension };
  }, [
    { normalPension: 1000000, startAge: 60 },
    { normalPension: 800000, startAge: 62 },
    { normalPension: 1500000, startAge: 60 },
    { normalPension: 600000, startAge: 64 },
    { normalPension: 2000000, startAge: 61 }
  ]],
  ["63 퇴직연금 DC형", (i) => {
    const annualContribution = round(i.annualSalary / 12);
    let balance = 0;
    for (let y = 0; y < i.years; y++) {
      balance = (balance + annualContribution) * (1 + i.returnRate);
    }
    return { annualContribution, totalContribution: annualContribution * i.years, expectedBalance: round(balance) };
  }, [
    { annualSalary: 50000000, years: 10, returnRate: 0.04 },
    { annualSalary: 70000000, years: 20, returnRate: 0.04 },
    { annualSalary: 100000000, years: 30, returnRate: 0.05 },
    { annualSalary: 40000000, years: 5, returnRate: 0.03 },
    { annualSalary: 80000000, years: 25, returnRate: 0.045 }
  ]],
  ["64 연금저축 환급", (i) => {
    const applied = min(i.annualDeposit, 6000000);
    const rate = i.totalSalary <= 55000000 ? 0.165 : 0.132;
    const taxCredit = round(applied * rate);
    return { applied, rate, taxCredit };
  }, [
    { annualDeposit: 6000000, totalSalary: 50000000 },
    { annualDeposit: 4000000, totalSalary: 80000000 },
    { annualDeposit: 6000000, totalSalary: 55000000 },
    { annualDeposit: 3000000, totalSalary: 40000000 },
    { annualDeposit: 8000000, totalSalary: 100000000 }
  ]],
  ["65 노란우산공제 절세", (i) => {
    const limit = i.businessIncome <= 40000000 ? 5000000 : (i.businessIncome <= 100000000 ? 3000000 : 2000000);
    const applied = min(i.annualDeposit, limit);
    let marginalRate = 0.06;
    if (i.businessIncome > 14000000) marginalRate = 0.15;
    if (i.businessIncome > 50000000) marginalRate = 0.24;
    if (i.businessIncome > 88000000) marginalRate = 0.35;
    if (i.businessIncome > 150000000) marginalRate = 0.38;
    const taxSaving = round(applied * marginalRate);
    return { limit, applied, marginalRate, taxSaving };
  }, [
    { annualDeposit: 5000000, businessIncome: 30000000 },
    { annualDeposit: 3000000, businessIncome: 80000000 },
    { annualDeposit: 2000000, businessIncome: 200000000 },
    { annualDeposit: 5000000, businessIncome: 60000000 },
    { annualDeposit: 1000000, businessIncome: 40000000 }
  ]],
  ["66 위자료 시뮬", (i) => {
    let baseAmount;
    if (i.marriageYears < 5) baseAmount = 10000000;
    else if (i.marriageYears < 10) baseAmount = 20000000;
    else if (i.marriageYears < 20) baseAmount = 35000000;
    else baseAmount = 60000000;
    const faultMultiplier = i.faultDegree === "high" ? 1.5 : (i.faultDegree === "medium" ? 1.0 : 0.5);
    const estimatedAmount = round(baseAmount * faultMultiplier);
    return { baseAmount, faultMultiplier, estimatedAmount };
  }, [
    { marriageYears: 3, faultDegree: "medium" },
    { marriageYears: 8, faultDegree: "high" },
    { marriageYears: 15, faultDegree: "medium" },
    { marriageYears: 25, faultDegree: "high" },
    { marriageYears: 12, faultDegree: "low" }
  ]],
  ["67 법정상속분", (i) => {
    const result = { spouse: 0, child: 0, parent: 0, sibling: 0 };
    if (i.children > 0) {
      const totalShares = i.children * 1.0 + (i.hasSpouse ? 1.5 : 0);
      result.spouse = i.hasSpouse ? round(i.totalEstate * 1.5 / totalShares) : 0;
      result.child = round(i.totalEstate * 1.0 / totalShares);
    } else if (i.parents > 0) {
      const totalShares = i.parents * 1.0 + (i.hasSpouse ? 1.5 : 0);
      result.spouse = i.hasSpouse ? round(i.totalEstate * 1.5 / totalShares) : 0;
      result.parent = round(i.totalEstate * 1.0 / totalShares);
    } else if (i.hasSpouse) {
      result.spouse = i.totalEstate;
    } else if (i.siblings > 0) {
      result.sibling = round(i.totalEstate / i.siblings);
    }
    return result;
  }, [
    { totalEstate: 1000000000, hasSpouse: true, children: 2, parents: 0, siblings: 0 },
    { totalEstate: 500000000, hasSpouse: true, children: 0, parents: 2, siblings: 0 },
    { totalEstate: 2000000000, hasSpouse: true, children: 3, parents: 0, siblings: 0 },
    { totalEstate: 300000000, hasSpouse: false, children: 1, parents: 0, siblings: 0 },
    { totalEstate: 500000000, hasSpouse: false, children: 0, parents: 0, siblings: 3 }
  ]],
  ["68 연차수당", (i) => {
    const hourlyWage = round(i.monthlySalary / 209);
    const dailyWage = hourlyWage * 8;
    const allowance = dailyWage * i.unusedDays;
    return { hourlyWage, dailyWage, allowance };
  }, [
    { monthlySalary: 3000000, unusedDays: 5 },
    { monthlySalary: 4000000, unusedDays: 10 },
    { monthlySalary: 2500000, unusedDays: 8 },
    { monthlySalary: 5000000, unusedDays: 15 },
    { monthlySalary: 3500000, unusedDays: 3 }
  ]],
  ["69 임금체불 미지급금", (i) => {
    const interest = round(i.unpaidAmount * 0.20 * i.delayDays / 365);
    return { unpaidAmount: i.unpaidAmount, interest, total: i.unpaidAmount + interest };
  }, [
    { unpaidAmount: 3000000, delayDays: 30 },
    { unpaidAmount: 5000000, delayDays: 90 },
    { unpaidAmount: 10000000, delayDays: 180 },
    { unpaidAmount: 2000000, delayDays: 14 },
    { unpaidAmount: 8000000, delayDays: 365 }
  ]],
  ["70 출산휴가 급여", (i) => {
    const days = i.isMultiple ? 120 : 90;
    const eligibleDays = days - 60;
    const dailyWage = round(i.monthlySalary / 30);
    const upper = round(2000000 / 30);
    const cappedDailyWage = min(dailyWage, upper);
    const govPay = cappedDailyWage * eligibleDays;
    const companyPay = dailyWage * 60;
    return { totalDays: days, dailyWage, govPay, companyPay, total: govPay + companyPay };
  }, [
    { monthlySalary: 2500000, isMultiple: false },
    { monthlySalary: 3500000, isMultiple: false },
    { monthlySalary: 4000000, isMultiple: true },
    { monthlySalary: 1800000, isMultiple: false },
    { monthlySalary: 5000000, isMultiple: true }
  ]]
];

tests.forEach(([name, fn, cases]) => {
  console.log("=== " + name + " ===");
  cases.forEach((c, i) => console.log("Case " + (i+1), JSON.stringify(fn(c))));
});
