import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { salaryNetPaySpec } from "@/lib/calc/salary-net-pay";
import { SalaryNetPayClient } from "./SalaryNetPayClient";

const spec = salaryNetPaySpec;

export const metadata: Metadata = {
  title: "연봉 실수령액 계산기 (2026년 기준, 국세청 간이세액표)",
  description:
    "세전 연봉과 부양가족 수, 8~20세 자녀 수, 월 비과세액을 넣으면 국세청 간이세액표와 2026년 4대보험 요율로 월 실수령액을 계산해요. 연봉 5,000만원, 부양가족 본인 1명이면 월 3,522,740원이에요.",
  alternates: { canonical: "/salary/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="국세청 2026.3 간이세액표 · 홈택스 5케이스 0원 일치"
    >
      <SalaryNetPayClient />
    </CalculatorShell>
  );
}
