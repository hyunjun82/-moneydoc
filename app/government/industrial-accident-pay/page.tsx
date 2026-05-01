import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/government/industrial-accident-pay.json";

export const metadata: Metadata = {
  title: "산재 휴업급여 계산기 — 2026년 기준",
  description: "월 평균임금과 휴업 일수 입력 시 산재 휴업급여 산출.",
  alternates: { canonical: "/government/industrial-accident-pay/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="근로복지공단 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
