import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { salaryNetPaySpec } from "@/lib/calc/salary-net-pay";
import { SalaryNetPayClient } from "./SalaryNetPayClient";

const spec = salaryNetPaySpec;

export const metadata: Metadata = {
  title: "연봉 실수령액 계산기 (2026년 기준, 국세청 간이세액표)",
  description:
    "세전 연봉, 부양가족, 자녀 수만 입력하면 매월 통장에 들어오는 실수령액 자동 계산. 국세청 2026.3 간이세액표(홈택스 원본) + 4대보험 공단 고시 요율. 홈택스 조회값과 5개 케이스 0원 일치.",
  alternates: { canonical: "/tax/salary-net-pay/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="국세청 2026.3 간이세액표 · 홈택스 5케이스 0원 일치"
      description="4대보험과 소득세를 정확히 차감해, 통장에 실제로 찍히는 금액을 알려드려요. 부양가족과 자녀 수에 따른 세액공제까지 자동 반영됩니다."
    >
      <SalaryNetPayClient />
    </CalculatorShell>
  );
}
