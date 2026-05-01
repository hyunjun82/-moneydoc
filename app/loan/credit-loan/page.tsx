import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/loan/credit-loan.json";

export const metadata: Metadata = {
  title: "신용대출 한도 계산기 — 2026년 기준",
  description: "연소득과 배수 입력 시 신용대출 한도. 실제는 신용도·DSR과 함께 결정.",
  alternates: { canonical: "/loan/credit-loan/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="금융감독원 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
