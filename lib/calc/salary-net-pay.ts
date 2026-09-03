import spec from "@/data/calculators/tax/salary-net-pay.json";
import { calc as calcSalary } from "@/lib/calc/gen/salary-net-pay";

/**
 * 연봉 실수령액 — 산식은 lib/calc/engine.js 의 calc_salary 하나만 사용한다.
 *
 * 과거에는 이 파일이 엔진과 별개의 산식을 들고 있었고, 그 결과
 *  - 비과세액(식대 등)을 4대보험 산정에서 빼지 않고
 *  - 실수령액에 비과세액을 다시 더하지 않으며
 *  - 공단의 10원 절사를 적용하지 않아
 * 실수령액이 월 17만~23만원 과소 표시됐다.
 *
 * 엔진의 calc_salary 는 소득세를 국세청 근로소득 간이세액표(2026.3.1. 이후, 엑셀 원본을
 * lib/calc/tables/simplified-tax-2026-03.js 로 옮긴 것)에서 직접 찾고, 4대보험은 공단 고시 요율로 계산한다.
 * scripts/verify-system/verify-3way.mjs 가 홈택스 조회값과 0원 기준으로 대조한다.
 * 산식을 고칠 일이 있으면 engine.js 만 고치면 된다.
 */

export type SalaryInput = {
  annual: number;
  dependents: number;
  kids?: number;       // 부양가족 중 8세 이상 20세 이하 자녀 수 (dependents−1 이하). default 0
  nontaxable?: number; // 월 비과세액 (식대 등). default 0
  taxRatePct?: 80 | 100 | 120; // 원천징수 비율 선택 (소득세법 시행령 §194). default 100
};

export type SalaryResult = {
  monthly: number;
  grossMonthly: number;
  nationalPension: number;
  healthInsurance: number;
  longTermCare: number;
  employmentInsurance: number;
  totalInsurance: number;
  family: number;        // 적용된 공제대상가족 수 (본인 포함)
  kidsApplied: number;   // 적용된 8~20세 자녀 수
  incomeTax100: number;  // 간이세액표 100% 소득세
  childAdjust: number;   // 자녀 조정으로 줄어든 소득세
  taxRatePct: number;    // 적용된 원천징수 비율
  monthlyIncomeTax: number;
  monthlyLocalTax: number;
  totalDeduction: number;
  netMonthly: number;
  deductRatePct: number;
};

function run(input: SalaryInput): SalaryResult {
  const { annual, dependents, kids = 0, nontaxable = 0, taxRatePct = 100 } = input;
  return calcSalary(
    { annual, dependents, kids, nontaxable, taxRatePct },
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
