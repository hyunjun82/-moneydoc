import spec from "@/data/calculators/tax/salary-net-pay.json";
import { calculators } from "@/lib/calc/engine";

/**
 * 연봉 실수령액 — 산식은 lib/calc/engine.js 의 calc_salary 하나만 사용한다.
 *
 * 과거에는 이 파일이 엔진과 별개의 산식을 들고 있었고, 그 결과
 *  - 비과세액(식대 등)을 4대보험 산정에서 빼지 않고
 *  - 실수령액에 비과세액을 다시 더하지 않으며
 *  - 공단의 10원 절사를 적용하지 않아
 * 실수령액이 월 17만~23만원 과소 표시됐다.
 *
 * 엔진의 calc_salary 는 고용노동부 인재채움뱅크 연봉계산기 산식을 1:1 복제한 것이며
 * scripts/verify-system/verify-3way.mjs 로 정부값과 대조 검증된다.
 * 산식을 고칠 일이 있으면 engine.js 만 고치면 된다.
 */

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

function run(input: SalaryInput): SalaryResult {
  const { annual, dependents, kids = 0, nontaxable = 0 } = input;
  return calculators["salary-net-pay"](
    { annual, dependents, kids, nontaxable },
    spec as unknown as Record<string, unknown>
  ) as unknown as SalaryResult;
}

/**
 * 간이세액표(소득세법 §134) 기준 — 회사가 매월 원천징수하는 금액.
 * 급여명세서와 맞춰볼 때 쓰는 값이다.
 */
export function calcSalaryNetPaySimpleTax(input: SalaryInput): SalaryResult {
  return run(input);
}

/** 위와 같은 산식. 호출부 호환을 위해 남겨둔 별칭이다. */
export function calcSalaryNetPay(input: SalaryInput): SalaryResult {
  return run(input);
}

export const salaryNetPaySpec = spec;
