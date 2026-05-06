import spec from "@/data/calculators/tax/salary-net-pay.json";

export type SalaryInput = {
  annual: number;
  dependents: number;
  kids: number;
  nontaxable?: number; // 월 비과세액 (식대 등). default 0
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
  STANDARD_TAX_DEDUCTION_YEARLY: number;
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
 * §134 간이세액표 모드 (회사가 매달 떼는 추정 세액 = 명세서와 일치)
 * 산출세액 − 표준세액공제 156만 − 자녀세액공제 (EIC 미적용 = 잡코리아·아는자산 매칭).
 * 비과세는 사용자 입력(nontaxable, 월 단위). default 0.
 * 검증: 5천만/부양1/자녀0/비과세0 → 218,125원 (잡코리아 217,320, 차이 805원).
 */
export function calcSalaryNetPaySimpleTax(input: SalaryInput): SalaryResult {
  const { annual, dependents, kids, nontaxable = 0 } = input;
  const taxableAnnual = max(0, annual - nontaxable * 12);
  const monthly = taxableAnnual / 12;

  const npBase = min(monthly, C.NP_CAP_MONTHLY);
  const nationalPension = round(npBase * C.NP_RATE);
  const healthInsurance = round(monthly * C.HI_RATE);
  const longTermCare = round(healthInsurance * C.LTC_RATE);
  const employmentInsurance = round(monthly * C.EI_RATE);
  const totalInsurance = nationalPension + healthInsurance + longTermCare + employmentInsurance;

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
  // 간이세액표 §134: 4대보험 자동 차감 X (잡코리아·아는자산과 매칭)
  const taxableIncome = max(0, taxableAnnual - earnedIncomeDeduction - personalDeduction);

  let taxBeforeCredit = 0;
  for (const b of T.incomeTaxBrackets.brackets) {
    if (b.upperBound === null || taxableIncome <= b.upperBound) {
      taxBeforeCredit = taxableIncome * b.rate - b.progressiveDeduction;
      break;
    }
  }

  let childCredit = 0;
  const arr = T.childTaxCredit.amounts;
  const f = arr.find((a) => a.kids === kids);
  if (f) {
    childCredit = f.credit;
  } else {
    const last = arr[arr.length - 1];
    childCredit = last.credit + (kids - last.kids) * T.childTaxCredit.additionalPerKid;
  }

  // 결정세액 = 산출세액 − 표준세액공제 156만(자동) − 자녀공제. EIC 미적용 (시장 표준)
  const annualIncomeTax = max(0, taxBeforeCredit - C.STANDARD_TAX_DEDUCTION_YEARLY - childCredit);
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
