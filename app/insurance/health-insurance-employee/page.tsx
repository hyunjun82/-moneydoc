import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/insurance/health-insurance-employee.json";

export const metadata: Metadata = {
  title: "건강보험료 (직장가입자) 계산기 — 2026년 기준",
  description: "월 보수월액 입력 시 건강보험 + 장기요양 본인 부담 산출.",
  alternates: { canonical: "/insurance/health-insurance-employee/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="건강보험공단 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
