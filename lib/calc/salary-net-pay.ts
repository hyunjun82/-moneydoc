import spec from "@/data/calculators/tax/salary-net-pay.json";

export type SalaryInput = {
  annual: number;
  dependents: number;
  kids: number;
};

export type SalaryResult = {
  monthly: number;
  grossMonthly: number;
  nationalPension: number;
  healthInsurance: number;
  longTermCare: number;
  employmentInsurance: number;
  totalInsurance: number;
  earnedIncomeDeduction: number;
  personalDeduction: number;
  taxableIncome: number;
  taxBeforeCredit: number;
  earnedIncomeCreditRaw: number;
  earnedIncomeCreditLimit: number;
  earnedIncomeCredit: number;
  childCredit: number;
  annualIncomeTax: number;
  monthlyIncomeTax: number;
  monthlyLocalTax: number;
  totalDeduction: number;
  netMonthly: number;
  deductRatePct: number;
};

const C = spec.constants as {
  NP_RATE: number;
  NP_CAP_MONTHLY: number;
  NP_FLOOR_MONTHLY: number;
  HI_RATE: number;
  LTC_RATE: number;
  EI_RATE: number;
  LOCAL_TAX_RATE: number;
  PERSONAL_DEDUCTION: number;
};
const T = spec.tables;

const { round, min, max } = Math;

export function calcSalaryNetPay(input: SalaryInput): SalaryResult {
  const { annual, dependents, kids } = input;
  const monthly = annual / 12;
  const npBase = min(monthly, C.NP_CAP_MONTHLY);
  const nationalPension = round(npBase * C.NP_RATE);
  const healthInsurance = round(monthly * C.HI_RATE);
  const longTermCare = round(healthInsurance * C.LTC_RATE);
  const employmentInsurance = round(monthly * C.EI_RATE);
  const totalInsurance =
    nationalPension + healthInsurance + longTermCare + employmentInsurance;

  // 근로소득공제
  let earnedIncomeDeduction = 0;
  for (const b of T.earnedIncomeDeduction.brackets) {
    if (b.upperBound === null || annual <= b.upperBound) {
      earnedIncomeDeduction = b.fixed + (annual - b.lowerBound) * b.rate;
      break;
    }
  }
  if (T.earnedIncomeDeduction.limit) {
    earnedIncomeDeduction = min(earnedIncomeDeduction, T.earnedIncomeDeduction.limit);
  }

  const personalDeduction = dependents * C.PERSONAL_DEDUCTION;
  const taxableIncome = max(0, annual - earnedIncomeDeduction - personalDeduction);

  // 산출세액
  let taxBeforeCredit = 0;
  for (const b of T.incomeTaxBrackets.brackets) {
    if (b.upperBound === null || taxableIncome <= b.upperBound) {
      taxBeforeCredit = taxableIncome * b.rate - b.progressiveDeduction;
      break;
    }
  }

  // 근로소득세액공제 raw
  let earnedIncomeCreditRaw = 0;
  for (const c of T.earnedIncomeTaxCredit.computation) {
    if (c.salaryThreshold === null || taxBeforeCredit <= c.salaryThreshold) {
      earnedIncomeCreditRaw = c.fixed + (taxBeforeCredit - c.lowerSalary) * c.rate;
      break;
    }
  }

  // 한도
  let earnedIncomeCreditLimit = 0;
  for (const l of T.earnedIncomeTaxCredit.limits) {
    if (l.totalSalaryUpper === null || annual <= l.totalSalaryUpper) {
      if (l.type === "fixed") {
        earnedIncomeCreditLimit = l.amount as number;
      } else {
        earnedIncomeCreditLimit = max(
          l.minLimit as number,
          (l.base as number) - (annual - (l.subtractAfter as number)) * (l.subtractRate as number)
        );
      }
      break;
    }
  }

  const earnedIncomeCredit = min(earnedIncomeCreditRaw, earnedIncomeCreditLimit);

  // 자녀 세액공제
  let childCredit = 0;
  const arr = T.childTaxCredit.amounts;
  const f = arr.find((a) => a.kids === kids);
  if (f) {
    childCredit = f.credit;
  } else {
    const last = arr[arr.length - 1];
    childCredit = last.credit + (kids - last.kids) * T.childTaxCredit.additionalPerKid;
  }

  const annualIncomeTax = max(0, taxBeforeCredit - earnedIncomeCredit - childCredit);
  const monthlyIncomeTax = round(annualIncomeTax / 12);
  const monthlyLocalTax = round(monthlyIncomeTax * C.LOCAL_TAX_RATE);
  const totalDeduction = totalInsurance + monthlyIncomeTax + monthlyLocalTax;
  const netMonthly = round(monthly - totalDeduction);
  const deductRatePct = +((totalDeduction / monthly) * 100).toFixed(1);

  return {
    monthly,
    grossMonthly: round(monthly),
    nationalPension,
    healthInsurance,
    longTermCare,
    employmentInsurance,
    totalInsurance,
    earnedIncomeDeduction,
    personalDeduction,
    taxableIncome,
    taxBeforeCredit,
    earnedIncomeCreditRaw,
    earnedIncomeCreditLimit,
    earnedIncomeCredit,
    childCredit,
    annualIncomeTax,
    monthlyIncomeTax,
    monthlyLocalTax,
    totalDeduction,
    netMonthly,
    deductRatePct,
  };
}

export const salaryNetPaySpec = spec;

/**
 * §134 간이세액표 모드 (회사가 매달 떼는 추정 세액)
 * 비과세 식대 20만/월, 4대보험 본인부담 소득공제, 표준세액공제 156만/년 적용.
 * 사람인·잡코리아 결과와 근접 (사이트별 가정 미세 차이).
 */
export function calcSalaryNetPaySimpleTax(input: SalaryInput): SalaryResult {
  const { annual, dependents, kids } = input;
  const NONTAX_MEAL_YEARLY = 20 * 12 * 10000; // 240만 (식대 디폴트)
  const STANDARD_TAX_DEDUCTION = 130000 * 12; // 156만 (월 13만 표준세액공제)

  const taxableAnnual = max(0, annual - NONTAX_MEAL_YEARLY);
  const monthly = taxableAnnual / 12;

  const npBase = min(monthly, C.NP_CAP_MONTHLY);
  const nationalPension = round(npBase * C.NP_RATE);
  const healthInsurance = round(monthly * C.HI_RATE);
  const longTermCare = round(healthInsurance * C.LTC_RATE);
  const employmentInsurance = round(monthly * C.EI_RATE);
  const totalInsurance = nationalPension + healthInsurance + longTermCare + employmentInsurance;
  const annualInsurance = totalInsurance * 12;

  // 근로소득공제
  let earnedIncomeDeduction = 0;
  for (const b of T.earnedIncomeDeduction.brackets) {
    if (b.upperBound === null || taxableAnnual <= b.upperBound) {
      earnedIncomeDeduction = b.fixed + (taxableAnnual - b.lowerBound) * b.rate;
      break;
    }
  }
  if (T.earnedIncomeDeduction.limit) {
    earnedIncomeDeduction = min(earnedIncomeDeduction, T.earnedIncomeDeduction.limit);
  }

  const personalDeduction = dependents * C.PERSONAL_DEDUCTION;
  const taxableIncome = max(
    0,
    taxableAnnual - earnedIncomeDeduction - personalDeduction - annualInsurance
  );

  let taxBeforeCredit = 0;
  for (const b of T.incomeTaxBrackets.brackets) {
    if (b.upperBound === null || taxableIncome <= b.upperBound) {
      taxBeforeCredit = taxableIncome * b.rate - b.progressiveDeduction;
      break;
    }
  }

  let earnedIncomeCreditRaw = 0;
  for (const c of T.earnedIncomeTaxCredit.computation) {
    if (c.salaryThreshold === null || taxBeforeCredit <= c.salaryThreshold) {
      earnedIncomeCreditRaw = c.fixed + (taxBeforeCredit - c.lowerSalary) * c.rate;
      break;
    }
  }

  let earnedIncomeCreditLimit = 0;
  for (const l of T.earnedIncomeTaxCredit.limits) {
    if (l.totalSalaryUpper === null || taxableAnnual <= l.totalSalaryUpper) {
      if (l.type === "fixed") {
        earnedIncomeCreditLimit = l.amount as number;
      } else {
        earnedIncomeCreditLimit = max(
          l.minLimit as number,
          (l.base as number) - (taxableAnnual - (l.subtractAfter as number)) * (l.subtractRate as number)
        );
      }
      break;
    }
  }

  const earnedIncomeCredit = min(earnedIncomeCreditRaw, earnedIncomeCreditLimit);

  let childCredit = 0;
  const arr = T.childTaxCredit.amounts;
  const f = arr.find((a) => a.kids === kids);
  if (f) {
    childCredit = f.credit;
  } else {
    const last = arr[arr.length - 1];
    childCredit = last.credit + (kids - last.kids) * T.childTaxCredit.additionalPerKid;
  }

  const annualIncomeTax = max(
    0,
    taxBeforeCredit - earnedIncomeCredit - childCredit - STANDARD_TAX_DEDUCTION
  );
  const monthlyIncomeTax = round(annualIncomeTax / 12);
  const monthlyLocalTax = round(monthlyIncomeTax * C.LOCAL_TAX_RATE);
  const totalDeduction = totalInsurance + monthlyIncomeTax + monthlyLocalTax;
  const netMonthly = round(monthly - totalDeduction);
  const deductRatePct = +((totalDeduction / monthly) * 100).toFixed(1);

  return {
    monthly,
    grossMonthly: round(monthly),
    nationalPension,
    healthInsurance,
    longTermCare,
    employmentInsurance,
    totalInsurance,
    earnedIncomeDeduction,
    personalDeduction,
    taxableIncome,
    taxBeforeCredit,
    earnedIncomeCreditRaw,
    earnedIncomeCreditLimit,
    earnedIncomeCredit,
    childCredit,
    annualIncomeTax,
    monthlyIncomeTax,
    monthlyLocalTax,
    totalDeduction,
    netMonthly,
    deductRatePct,
  };
}
