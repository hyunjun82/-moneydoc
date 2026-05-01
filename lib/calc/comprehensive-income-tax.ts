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
  decisionTax: number;
  localTax: number;
  totalTax: number;
};

const C = spec.constants as {
  PERSONAL_DEDUCTION: number;
  LOCAL_TAX_RATE: number;
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

  const decisionTax = max(0, taxBeforeCredit - childCredit - extraTaxCredit);
  const localTax = round(decisionTax * C.LOCAL_TAX_RATE);
  const totalTax = decisionTax + localTax;

  return {
    personalDeduction,
    taxableIncome,
    taxBeforeCredit,
    childCredit,
    decisionTax,
    localTax,
    totalTax,
  };
}

export const compIncomeTaxSpec = spec;
