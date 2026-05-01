import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/loan/loan-amortization.json";

export const metadata: Metadata = {
  title: "원리금균등상환 계산기 — 2026년 기준",
  description: "대출 원금, 만기(년), 연 금리를 입력하면 매월 일정한 원리금 상환액과 총 이자가 산출됩니다.",
  alternates: { canonical: "/loan/loan-amortization/" },
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
