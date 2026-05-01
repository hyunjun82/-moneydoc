import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/law/annual-leave-allowance.json";

export const metadata: Metadata = {
  title: "연차수당 계산기 — 2026년 기준",
  description: "월 통상임금과 미사용 연차 일수 입력 시 연차수당 산출.",
  alternates: { canonical: "/law/annual-leave-allowance/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="고용노동부 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
