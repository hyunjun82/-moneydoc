import spec from "@/data/calculators/tax/comprehensive-income-tax.json";

export type CompIncomeInput = {
  income: number;
  dependents: number;
  kids: number;
  extraDeduction: number;
  extraTaxCredit: number;
};

export type CompIncomeResult = {
  personalDeduction: number;
  taxableIncome: number;
  taxBeforeCredit: number;
  childCredit: number;
  standardCredit: number;
  decisionTax: number;
  localTax: number;
  totalTax: number;
};

const C = spec.constants as {
  PERSONAL_DEDUCTION: number;
  LOCAL_TAX_RATE: number;
  STANDARD_TAX_CREDIT: number;
};
const T = spec.tables;

const { round, max } = Math;

export function calcCompIncomeTax(input: CompIncomeInput): CompIncomeResult {
  const { income, dependents, kids, extraDeduction = 0, extraTaxCredit = 0 } = input;

  const personalDeduction = dependents * C.PERSONAL_DEDUCTION;
  const taxableIncome = max(0, income - personalDeduction - extraDeduction);

  let taxBeforeCredit = 0;
  for (const b of T.incomeTaxBrackets.brackets) {
    if (b.upperBound === null || taxableIncome <= b.upperBound) {
      taxBeforeCredit = round(taxableIncome * b.rate - b.progressiveDeduction);
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

  // 표준세액공제 (소득세법 제59조의4 제9항 제2호 나목): 일반 종합소득자 연 7만원
  const standardCredit = C.STANDARD_TAX_CREDIT || 70000;
  const decisionTax = round(max(0, taxBeforeCredit - childCredit - standardCredit - extraTaxCredit));
  const localTax = round(decisionTax * C.LOCAL_TAX_RATE);
  const totalTax = decisionTax + localTax;

  return {
    personalDeduction,
    taxableIncome,
    taxBeforeCredit,
    childCredit,
    standardCredit,
    decisionTax,
    localTax,
    totalTax,
  };
}

export const compIncomeTaxSpec = spec;
