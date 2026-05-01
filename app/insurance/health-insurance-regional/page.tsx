import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/insurance/health-insurance-regional.json";

export const metadata: Metadata = {
  title: "건강보험료 (지역가입자) 계산기 — 2026년 기준",
  description: "소득·재산·자동차 점수와 부과점수당 금액 입력 시 월 보험료 산출.",
  alternates: { canonical: "/insurance/health-insurance-regional/" },
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
