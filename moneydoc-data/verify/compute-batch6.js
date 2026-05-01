const round = Math.round, min = Math.min, max = Math.max;

const tests = [
  ["71 양도세 조정대상 다주택", (i) => {
    const gain = i.salePrice - i.acquisitionPrice;
    let ltbcRate = 0;
    if (i.holdingYears >= 3) ltbcRate = min(0.06 + (i.holdingYears - 3) * 0.02, 0.30);
    const incomeAmount = round(gain * (1 - ltbcRate));
    const taxableBase = max(0, incomeAmount - 2500000);
    let baseRate = 0;
    const br = [[14000000, 0.06, 0], [50000000, 0.15, 1260000], [88000000, 0.24, 5760000], [150000000, 0.35, 15440000], [300000000, 0.38, 19940000], [500000000, 0.40, 25940000], [1000000000, 0.42, 35940000], [Infinity, 0.45, 65940000]];
    let baseTax = 0;
    for (const [u, r, d] of br) { if (taxableBase <= u) { baseRate = r; baseTax = round(taxableBase * r - d); break; } }
    let surcharge = 0;
    if (i.houseCount === 2) surcharge = round(taxableBase * 0.20);
    else if (i.houseCount >= 3) surcharge = round(taxableBase * 0.30);
    const totalIncomeTax = max(0, baseTax + surcharge);
    const localTax = round(totalIncomeTax * 0.10);
    return { gain, ltbcRate: +ltbcRate.toFixed(4), incomeAmount, taxableBase, baseTax, surcharge, totalIncomeTax, localTax, totalTax: totalIncomeTax + localTax };
  }, [
    { salePrice: 800000000, acquisitionPrice: 500000000, holdingYears: 5, houseCount: 2 },
    { salePrice: 1000000000, acquisitionPrice: 600000000, holdingYears: 10, houseCount: 3 },
    { salePrice: 600000000, acquisitionPrice: 400000000, holdingYears: 3, houseCount: 2 },
    { salePrice: 1500000000, acquisitionPrice: 800000000, holdingYears: 15, houseCount: 3 },
    { salePrice: 500000000, acquisitionPrice: 300000000, holdingYears: 5, houseCount: 4 }
  ]],
  ["72 청약 가점", (i) => {
    const noHomeScore = min(32, i.noHomeYears * 2);
    const familyScore = min(35, 5 + i.dependents * 5);
    const accountScore = min(17, i.accountYears * 1);
    return { noHomeScore, familyScore, accountScore, total: noHomeScore + familyScore + accountScore };
  }, [
    { noHomeYears: 5, dependents: 2, accountYears: 5 },
    { noHomeYears: 15, dependents: 4, accountYears: 15 },
    { noHomeYears: 10, dependents: 3, accountYears: 10 },
    { noHomeYears: 0, dependents: 0, accountYears: 2 },
    { noHomeYears: 8, dependents: 5, accountYears: 12 }
  ]],
  ["73 청약 1순위 자격", (i) => {
    const accountOk = i.accountMonths >= 24;
    const depositOk = i.depositCount >= 24;
    const noHomeOk = i.isNoHome;
    const isEligible = accountOk && depositOk && noHomeOk;
    return { accountOk, depositOk, noHomeOk, isEligible };
  }, [
    { accountMonths: 24, depositCount: 24, isNoHome: true },
    { accountMonths: 36, depositCount: 36, isNoHome: false },
    { accountMonths: 12, depositCount: 12, isNoHome: true },
    { accountMonths: 60, depositCount: 60, isNoHome: true },
    { accountMonths: 24, depositCount: 18, isNoHome: true }
  ]],
  ["74 운전자보험 견적", (i) => {
    const baseRate = { basic: 80000, standard: 150000, premium: 250000 }[i.coverage];
    let ageMultiplier = 1.0;
    if (i.age < 26) ageMultiplier = 1.5;
    else if (i.age < 35) ageMultiplier = 1.1;
    else if (i.age < 50) ageMultiplier = 1.0;
    else if (i.age < 65) ageMultiplier = 1.2;
    else ageMultiplier = 1.5;
    return { baseRate, ageMultiplier, monthlyPremium: round(baseRate * ageMultiplier), annualPremium: round(baseRate * ageMultiplier * 12) };
  }, [
    { age: 30, coverage: "standard" },
    { age: 25, coverage: "premium" },
    { age: 45, coverage: "basic" },
    { age: 60, coverage: "standard" },
    { age: 22, coverage: "basic" }
  ]],
  ["75 종신보험 실효보험료", (i) => {
    const totalPaid = round(i.monthlyPremium * 12 * i.paidYears);
    const surrender = round(totalPaid * i.surrenderRate);
    const netLoss = totalPaid - surrender;
    return { totalPaid, surrender, netLoss };
  }, [
    { monthlyPremium: 100000, paidYears: 5, surrenderRate: 0.30 },
    { monthlyPremium: 200000, paidYears: 10, surrenderRate: 0.50 },
    { monthlyPremium: 300000, paidYears: 3, surrenderRate: 0.10 },
    { monthlyPremium: 150000, paidYears: 15, surrenderRate: 0.70 },
    { monthlyPremium: 500000, paidYears: 7, surrenderRate: 0.40 }
  ]],
  ["76 퇴직연금 DB형", (i) => {
    const monthlyAvg = i.lastAvgSalary;
    const dailyWage = round(monthlyAvg / 30);
    const dbAmount = round(dailyWage * 30 * i.workYears);
    return { dailyWage, dbAmount };
  }, [
    { lastAvgSalary: 3000000, workYears: 5 },
    { lastAvgSalary: 5000000, workYears: 10 },
    { lastAvgSalary: 7000000, workYears: 20 },
    { lastAvgSalary: 4000000, workYears: 15 },
    { lastAvgSalary: 6000000, workYears: 25 }
  ]],
  ["77 상속포기·한정승인 기한", (i) => {
    const deathDate = new Date(i.deathDate);
    const deadlineDate = new Date(deathDate);
    deadlineDate.setMonth(deadlineDate.getMonth() + 3);
    const today = new Date(i.todayDate);
    const remainingDays = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
    return { deadline: deadlineDate.toISOString().split("T")[0], remainingDays, isExpired: remainingDays < 0 };
  }, [
    { deathDate: "2026-04-01", todayDate: "2026-04-30" },
    { deathDate: "2026-01-15", todayDate: "2026-04-30" },
    { deathDate: "2026-04-30", todayDate: "2026-04-30" },
    { deathDate: "2026-03-01", todayDate: "2026-04-30" },
    { deathDate: "2026-02-15", todayDate: "2026-04-30" }
  ]],
  ["78 두루누리 사회보험료 지원", (i) => {
    const npRate = 0.045, eiRate = 0.009;
    const employeeNP = round(i.salary * npRate);
    const employeeEI = round(i.salary * eiRate);
    const employerNP = round(i.salary * npRate);
    const employerEI = round(i.salary * (eiRate + 0.0025));
    const isEligible = i.salary < 2700000 && i.employees < 5;
    const supportRate = isEligible ? 0.80 : 0;
    const monthlySupport = isEligible ? round((employeeNP + employeeEI + employerNP + employerEI) * supportRate) : 0;
    return { isEligible, employeeNP, employeeEI, employerNP, employerEI, monthlySupport };
  }, [
    { salary: 2000000, employees: 3 },
    { salary: 2500000, employees: 4 },
    { salary: 2800000, employees: 3 },
    { salary: 1800000, employees: 7 },
    { salary: 2200000, employees: 2 }
  ]],
  ["79 청년 월세 지원", (i) => {
    const isEligible = i.age >= 19 && i.age <= 34 && i.isNoHome && i.medianIncomePct <= 60;
    const monthlySupport = isEligible ? min(i.actualRent, 200000) : 0;
    const annualSupport = monthlySupport * 12;
    return { isEligible, monthlySupport, annualSupport };
  }, [
    { age: 25, isNoHome: true, medianIncomePct: 50, actualRent: 500000 },
    { age: 30, isNoHome: true, medianIncomePct: 70, actualRent: 600000 },
    { age: 22, isNoHome: true, medianIncomePct: 40, actualRent: 150000 },
    { age: 35, isNoHome: true, medianIncomePct: 50, actualRent: 400000 },
    { age: 28, isNoHome: false, medianIncomePct: 45, actualRent: 500000 }
  ]],
  ["80 청년 주거급여", (i) => {
    const baseAmount = { 1: 350000, 2: 395000, 3: 470000, 4: 545000, 5: 620000 }[i.householdSize] || 700000;
    const isEligible = i.medianIncomePct <= 47;
    const support = isEligible ? round(baseAmount * (1 - i.medianIncomePct / 100)) : 0;
    return { isEligible, baseAmount, monthlySupport: support };
  }, [
    { householdSize: 1, medianIncomePct: 30 },
    { householdSize: 3, medianIncomePct: 40 },
    { householdSize: 4, medianIncomePct: 47 },
    { householdSize: 2, medianIncomePct: 60 },
    { householdSize: 5, medianIncomePct: 25 }
  ]]
];

tests.forEach(([name, fn, cases]) => {
  console.log("=== " + name + " ===");
  cases.forEach((c, i) => console.log("Case " + (i+1), JSON.stringify(fn(c))));
});
