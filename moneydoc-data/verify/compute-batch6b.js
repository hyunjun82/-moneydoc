const round = Math.round, min = Math.min, max = Math.max;

const tests = [
  ["81 국가장학금 소득분위", (i) => {
    const tier = i.incomeTier;
    const tuition = i.semesterTuition;
    const tierSupport = { 1: 5200000, 2: 5200000, 3: 5200000, 4: 3900000, 5: 3680000, 6: 3680000, 7: 3500000, 8: 3500000, 9: 0, 10: 0 };
    const support = min(tierSupport[tier] || 0, tuition);
    return { tier, support };
  }, [
    { incomeTier: 1, semesterTuition: 4000000 },
    { incomeTier: 4, semesterTuition: 5000000 },
    { incomeTier: 7, semesterTuition: 4500000 },
    { incomeTier: 9, semesterTuition: 5000000 },
    { incomeTier: 3, semesterTuition: 6000000 }
  ]],
  ["82 산재 휴업급여", (i) => {
    const dailyAvgWage = round(i.monthlySalary / 30);
    const dailyBenefit = round(dailyAvgWage * 0.7);
    const totalBenefit = dailyBenefit * i.injuryDays;
    return { dailyAvgWage, dailyBenefit, totalBenefit };
  }, [
    { monthlySalary: 3000000, injuryDays: 30 },
    { monthlySalary: 4000000, injuryDays: 90 },
    { monthlySalary: 2500000, injuryDays: 60 },
    { monthlySalary: 5000000, injuryDays: 180 },
    { monthlySalary: 6000000, injuryDays: 365 }
  ]],
  ["83 근로장려금 자격", (i) => {
    let limit = 0, maxAmount = 0;
    if (i.householdType === "single") { limit = 22000000; maxAmount = 1650000; }
    else if (i.householdType === "single_earner") { limit = 32000000; maxAmount = 2850000; }
    else if (i.householdType === "dual_earner") { limit = 38000000; maxAmount = 3300000; }
    const isEligible = i.totalIncome <= limit;
    let estimatedAmount = 0;
    if (isEligible) {
      if (i.totalIncome <= limit * 0.5) estimatedAmount = round(maxAmount * (i.totalIncome / (limit * 0.5)));
      else estimatedAmount = round(maxAmount * (1 - (i.totalIncome - limit * 0.5) / (limit * 0.5)));
    }
    return { limit, maxAmount, isEligible, estimatedAmount };
  }, [
    { householdType: "single", totalIncome: 10000000 },
    { householdType: "single_earner", totalIncome: 25000000 },
    { householdType: "dual_earner", totalIncome: 30000000 },
    { householdType: "single", totalIncome: 25000000 },
    { householdType: "dual_earner", totalIncome: 15000000 }
  ]],
  ["84 자녀장려금 자격", (i) => {
    const isEligible = i.totalIncome <= 70000000 && i.childrenUnder18 > 0;
    const maxPerChild = 1000000;
    const estimatedAmount = isEligible ? min(i.childrenUnder18 * maxPerChild, round(maxPerChild * i.childrenUnder18 * (1 - i.totalIncome / 70000000))) : 0;
    return { isEligible, estimatedAmount: max(0, estimatedAmount) };
  }, [
    { totalIncome: 30000000, childrenUnder18: 2 },
    { totalIncome: 50000000, childrenUnder18: 1 },
    { totalIncome: 70000000, childrenUnder18: 3 },
    { totalIncome: 80000000, childrenUnder18: 2 },
    { totalIncome: 20000000, childrenUnder18: 4 }
  ]],
  ["85 노후자금 시뮬", (i) => {
    const yearsTillRetire = i.retireAge - i.currentAge;
    const yearsAfterRetire = i.lifeExpectancy - i.retireAge;
    const futureLivingCost = round(i.currentMonthlyLiving * Math.pow(1 + i.inflationRate, yearsTillRetire));
    const totalNeeded = round(futureLivingCost * 12 * yearsAfterRetire);
    return { yearsTillRetire, yearsAfterRetire, futureLivingCost, totalNeeded };
  }, [
    { currentAge: 35, retireAge: 65, lifeExpectancy: 85, currentMonthlyLiving: 3000000, inflationRate: 0.025 },
    { currentAge: 45, retireAge: 60, lifeExpectancy: 85, currentMonthlyLiving: 4000000, inflationRate: 0.02 },
    { currentAge: 30, retireAge: 65, lifeExpectancy: 90, currentMonthlyLiving: 2500000, inflationRate: 0.03 },
    { currentAge: 50, retireAge: 65, lifeExpectancy: 85, currentMonthlyLiving: 3500000, inflationRate: 0.025 },
    { currentAge: 40, retireAge: 60, lifeExpectancy: 90, currentMonthlyLiving: 5000000, inflationRate: 0.025 }
  ]],
  ["86 자산관리 시뮬", (i) => {
    const fvOfPresent = i.currentAssets * Math.pow(1 + i.annualReturn, i.years);
    const r = i.annualReturn / 12;
    const n = i.years * 12;
    const fvOfMonthly = i.monthlySaving * ((Math.pow(1 + r, n) - 1) / r);
    const totalFV = round(fvOfPresent + fvOfMonthly);
    const totalSaved = i.currentAssets + i.monthlySaving * n;
    return { totalSaved, expectedFV: totalFV, profit: totalFV - totalSaved };
  }, [
    { currentAssets: 50000000, monthlySaving: 500000, annualReturn: 0.05, years: 20 },
    { currentAssets: 100000000, monthlySaving: 1000000, annualReturn: 0.06, years: 15 },
    { currentAssets: 30000000, monthlySaving: 300000, annualReturn: 0.04, years: 25 },
    { currentAssets: 200000000, monthlySaving: 0, annualReturn: 0.05, years: 10 },
    { currentAssets: 0, monthlySaving: 1000000, annualReturn: 0.05, years: 30 }
  ]],
  ["87 매매 vs 전세 비교", (i) => {
    const buyTotalCost = i.buyPrice * 0.012 + i.buyPrice * 0.005 + i.buyPrice * i.loanRate * (1 - i.downPaymentRatio) * i.years;
    const buyOpportunityCost = i.buyPrice * i.downPaymentRatio * i.opportunityRate * i.years;
    const totalBuyCost = round(buyTotalCost + buyOpportunityCost);
    const jeonseInterest = i.jeonseDeposit * i.loanRate * 0.7 * i.years;
    const jeonseOpportunity = i.jeonseDeposit * 0.3 * i.opportunityRate * i.years;
    const totalJeonseCost = round(jeonseInterest + jeonseOpportunity);
    const diff = totalBuyCost - totalJeonseCost;
    return { totalBuyCost, totalJeonseCost, diff };
  }, [
    { buyPrice: 500000000, jeonseDeposit: 300000000, downPaymentRatio: 0.4, loanRate: 0.04, opportunityRate: 0.04, years: 5 },
    { buyPrice: 800000000, jeonseDeposit: 500000000, downPaymentRatio: 0.5, loanRate: 0.045, opportunityRate: 0.04, years: 10 },
    { buyPrice: 300000000, jeonseDeposit: 200000000, downPaymentRatio: 0.3, loanRate: 0.04, opportunityRate: 0.05, years: 5 },
    { buyPrice: 1000000000, jeonseDeposit: 700000000, downPaymentRatio: 0.6, loanRate: 0.05, opportunityRate: 0.04, years: 7 },
    { buyPrice: 600000000, jeonseDeposit: 400000000, downPaymentRatio: 0.5, loanRate: 0.04, opportunityRate: 0.05, years: 10 }
  ]],
  ["88 결혼 비용 시뮬", (i) => {
    const wedding = i.weddingHall + i.dress + i.honeymoon + i.jewelry;
    const housing = i.housingDeposit;
    const furniture = i.furniture;
    const total = wedding + housing + furniture;
    return { wedding, housing, furniture, total };
  }, [
    { weddingHall: 20000000, dress: 5000000, honeymoon: 8000000, jewelry: 5000000, housingDeposit: 200000000, furniture: 15000000 },
    { weddingHall: 10000000, dress: 3000000, honeymoon: 5000000, jewelry: 3000000, housingDeposit: 100000000, furniture: 10000000 },
    { weddingHall: 30000000, dress: 8000000, honeymoon: 12000000, jewelry: 10000000, housingDeposit: 500000000, furniture: 30000000 },
    { weddingHall: 5000000, dress: 1000000, honeymoon: 3000000, jewelry: 2000000, housingDeposit: 50000000, furniture: 5000000 },
    { weddingHall: 15000000, dress: 4000000, honeymoon: 6000000, jewelry: 4000000, housingDeposit: 150000000, furniture: 12000000 }
  ]],
  ["89 자녀 학자금 시뮬", (i) => {
    const yearsToCollege = max(0, 19 - i.currentChildAge);
    const futureTuition = round(i.currentAnnualTuition * Math.pow(1 + i.inflationRate, yearsToCollege));
    const totalCollegeCost = futureTuition * 4;
    const monthsToSave = yearsToCollege * 12;
    const r = i.savingReturn / 12;
    const monthlyNeeded = monthsToSave > 0 ? round(totalCollegeCost / (((Math.pow(1 + r, monthsToSave) - 1) / r))) : 0;
    return { yearsToCollege, futureTuition, totalCollegeCost, monthlyNeeded };
  }, [
    { currentChildAge: 5, currentAnnualTuition: 8000000, inflationRate: 0.03, savingReturn: 0.04 },
    { currentChildAge: 10, currentAnnualTuition: 8000000, inflationRate: 0.03, savingReturn: 0.04 },
    { currentChildAge: 0, currentAnnualTuition: 8000000, inflationRate: 0.03, savingReturn: 0.05 },
    { currentChildAge: 15, currentAnnualTuition: 10000000, inflationRate: 0.025, savingReturn: 0.04 },
    { currentChildAge: 7, currentAnnualTuition: 12000000, inflationRate: 0.03, savingReturn: 0.05 }
  ]],
  ["90 사회초년생 자산형성", (i) => {
    const monthlySaving = round(i.monthlyIncome * i.savingRate);
    const r = i.annualReturn / 12;
    const n = i.years * 12;
    const fv = round(monthlySaving * ((Math.pow(1 + r, n) - 1) / r));
    return { monthlySaving, totalSaved: monthlySaving * n, fv };
  }, [
    { monthlyIncome: 3000000, savingRate: 0.30, annualReturn: 0.04, years: 5 },
    { monthlyIncome: 3500000, savingRate: 0.40, annualReturn: 0.05, years: 10 },
    { monthlyIncome: 2500000, savingRate: 0.20, annualReturn: 0.04, years: 7 },
    { monthlyIncome: 4000000, savingRate: 0.50, annualReturn: 0.06, years: 5 },
    { monthlyIncome: 3000000, savingRate: 0.35, annualReturn: 0.04, years: 15 }
  ]]
];

tests.forEach(([name, fn, cases]) => {
  console.log("=== " + name + " ===");
  cases.forEach((c, i) => console.log("Case " + (i+1), JSON.stringify(fn(c))));
});
