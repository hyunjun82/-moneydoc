const round = Math.round, min = Math.min, max = Math.max;

const tests = [
  ["91 적금 vs 예금 vs 펀드", (i) => {
    const r = i.rate / 12;
    const savingsFV = i.monthlyDeposit * ((Math.pow(1 + r, i.months) - 1) / r);
    const savingsNet = round(savingsFV - (savingsFV - i.monthlyDeposit * i.months) * 0.154);
    const fixedFV = i.principal * (1 + i.rate * (i.months / 12));
    const fixedNet = round(fixedFV - (i.principal * i.rate * (i.months / 12)) * 0.154);
    const fundFV = i.principal * Math.pow(1 + i.fundReturn, i.months / 12);
    const fundNet = round(fundFV - (fundFV - i.principal) * 0.154);
    return { savingsNet, fixedNet, fundNet };
  }, [
    { monthlyDeposit: 500000, principal: 12000000, months: 24, rate: 0.04, fundReturn: 0.06 },
    { monthlyDeposit: 1000000, principal: 60000000, months: 60, rate: 0.045, fundReturn: 0.07 },
    { monthlyDeposit: 300000, principal: 10800000, months: 36, rate: 0.038, fundReturn: 0.05 },
    { monthlyDeposit: 700000, principal: 33600000, months: 48, rate: 0.04, fundReturn: 0.08 },
    { monthlyDeposit: 200000, principal: 12000000, months: 60, rate: 0.035, fundReturn: 0.06 }
  ]],
  ["92 출산양육비 시뮬", (i) => {
    const stages = { infant: 12000000, toddler: 18000000, preschool: 18000000, elementary: 30000000, middle: 24000000, high: 30000000, college: 60000000 };
    const total = (stages.infant + stages.toddler + stages.preschool + stages.elementary + stages.middle + stages.high + stages.college) * i.children;
    const monthly = round(total / (22 * 12) / i.children) * i.children;
    return { totalCost: total, monthlyAvg: monthly };
  }, [
    { children: 1 },
    { children: 2 },
    { children: 3 },
    { children: 4 },
    { children: 5 }
  ]],
  ["93 은퇴 후 생활비 시뮬", (i) => {
    const r = i.annualReturn / 12;
    const monthly = i.monthlyExpense;
    let balance = i.retirementAssets;
    let months = 0;
    while (balance > 0 && months < 600) {
      balance = balance * (1 + r) - monthly;
      months++;
      if (balance <= 0) break;
    }
    const yearsLast = +(months / 12).toFixed(1);
    return { monthsLasting: months, yearsLast };
  }, [
    { retirementAssets: 500000000, monthlyExpense: 3000000, annualReturn: 0.04 },
    { retirementAssets: 1000000000, monthlyExpense: 4000000, annualReturn: 0.04 },
    { retirementAssets: 300000000, monthlyExpense: 2500000, annualReturn: 0.03 },
    { retirementAssets: 1500000000, monthlyExpense: 5000000, annualReturn: 0.05 },
    { retirementAssets: 700000000, monthlyExpense: 3500000, annualReturn: 0.04 }
  ]],
  ["94 부동산 매매 vs 임대 (사업자)", (i) => {
    const monthlyRent = i.monthlyRent;
    const annualRent = monthlyRent * 12;
    const totalRentIncome = annualRent * i.years;
    const taxYearly = round(annualRent * 0.20);
    const totalTax = taxYearly * i.years;
    const netIncome = totalRentIncome - totalTax;
    const buyCost = i.buyPrice * 0.012 + i.buyPrice * 0.005 * i.years;
    const netProfit = netIncome - round(buyCost);
    return { totalRentIncome, totalTax, netIncome, buyCost: round(buyCost), netProfit };
  }, [
    { buyPrice: 300000000, monthlyRent: 1500000, years: 5 },
    { buyPrice: 500000000, monthlyRent: 2500000, years: 10 },
    { buyPrice: 200000000, monthlyRent: 1000000, years: 5 },
    { buyPrice: 800000000, monthlyRent: 3500000, years: 10 },
    { buyPrice: 400000000, monthlyRent: 2000000, years: 7 }
  ]],
  ["95 카드 적립 vs 캐시백", (i) => {
    const accumulation = round(i.monthlySpending * i.accumRate);
    const cashback = round(i.monthlySpending * i.cashbackRate);
    const annualAccum = accumulation * 12;
    const annualCashback = cashback * 12;
    return { monthlyAccum: accumulation, monthlyCashback: cashback, annualAccum, annualCashback, betterChoice: annualAccum > annualCashback ? "accumulation" : "cashback" };
  }, [
    { monthlySpending: 1000000, accumRate: 0.01, cashbackRate: 0.005 },
    { monthlySpending: 2000000, accumRate: 0.005, cashbackRate: 0.012 },
    { monthlySpending: 500000, accumRate: 0.02, cashbackRate: 0.015 },
    { monthlySpending: 3000000, accumRate: 0.008, cashbackRate: 0.01 },
    { monthlySpending: 1500000, accumRate: 0.015, cashbackRate: 0.008 }
  ]],
  ["96 공무원연금 시뮬", (i) => {
    const annualPension = round(i.avgSalary * i.workYears * 0.017 * 12);
    const monthlyPension = round(annualPension / 12);
    return { annualPension, monthlyPension };
  }, [
    { avgSalary: 4000000, workYears: 30 },
    { avgSalary: 5500000, workYears: 35 },
    { avgSalary: 3500000, workYears: 25 },
    { avgSalary: 6000000, workYears: 33 },
    { avgSalary: 4500000, workYears: 28 }
  ]],
  ["97 한부모가족 자녀양육비", (i) => {
    const isEligible = i.medianIncomePct <= 60 && i.childAge < 18;
    const monthlySupport = isEligible ? 210000 : 0;
    const annualSupport = monthlySupport * 12;
    return { isEligible, monthlySupport, annualSupport };
  }, [
    { medianIncomePct: 50, childAge: 8 },
    { medianIncomePct: 70, childAge: 10 },
    { medianIncomePct: 30, childAge: 5 },
    { medianIncomePct: 60, childAge: 17 },
    { medianIncomePct: 45, childAge: 19 }
  ]],
  ["98 실업급여 수급기간", (i) => {
    let days = 120;
    if (i.insuredYears >= 1 && i.insuredYears < 3) days = 150;
    else if (i.insuredYears >= 3 && i.insuredYears < 5) days = 180;
    else if (i.insuredYears >= 5 && i.insuredYears < 10) days = 210;
    else if (i.insuredYears >= 10) days = 240;
    if (i.isElderlyOrDisabled) days += 30;
    return { days };
  }, [
    { insuredYears: 0.5, isElderlyOrDisabled: false },
    { insuredYears: 2, isElderlyOrDisabled: false },
    { insuredYears: 4, isElderlyOrDisabled: false },
    { insuredYears: 7, isElderlyOrDisabled: true },
    { insuredYears: 15, isElderlyOrDisabled: true }
  ]],
  ["99 가상화폐 양도세", (i) => {
    const taxableBase = max(0, i.gain - 2500000);
    const incomeTax = round(taxableBase * 0.20);
    const localTax = round(taxableBase * 0.02);
    return { taxableBase, incomeTax, localTax, totalTax: incomeTax + localTax };
  }, [
    { gain: 5000000 },
    { gain: 30000000 },
    { gain: 100000000 },
    { gain: 200000 },
    { gain: 500000000 }
  ]],
  ["100 출산·육아 지원금 통합", (i) => {
    const firstMeeting = 2000000;
    const parentalAllowance0 = i.childAge < 1 ? 1000000 * 12 : 0;
    const parentalAllowance1 = (i.childAge >= 1 && i.childAge < 2) ? 500000 * 12 : 0;
    const childAllowance = i.childAge < 8 ? 100000 * 12 : 0;
    const total = firstMeeting + parentalAllowance0 + parentalAllowance1 + childAllowance;
    return { firstMeeting, parentalAllowance0, parentalAllowance1, childAllowance, total };
  }, [
    { childAge: 0 },
    { childAge: 1 },
    { childAge: 3 },
    { childAge: 7 },
    { childAge: 10 }
  ]],
  ["101 노후 의료비 시뮬", (i) => {
    const yearsAfterRetire = i.lifeExpectancy - i.retireAge;
    let totalMedical = 0;
    for (let age = i.retireAge; age < i.lifeExpectancy; age++) {
      let monthly = 200000;
      if (age >= 75) monthly = 500000;
      if (age >= 85) monthly = 800000;
      totalMedical += monthly * 12;
    }
    return { yearsAfterRetire, totalMedicalCost: totalMedical, monthlyAvg: round(totalMedical / yearsAfterRetire / 12) };
  }, [
    { retireAge: 65, lifeExpectancy: 85 },
    { retireAge: 60, lifeExpectancy: 90 },
    { retireAge: 70, lifeExpectancy: 85 },
    { retireAge: 65, lifeExpectancy: 95 },
    { retireAge: 55, lifeExpectancy: 85 }
  ]]
];

tests.forEach(([name, fn, cases]) => {
  console.log("=== " + name + " ===");
  cases.forEach((c, i) => console.log("Case " + (i+1), JSON.stringify(fn(c))));
});
