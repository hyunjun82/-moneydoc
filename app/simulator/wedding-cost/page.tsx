import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/simulator/wedding-cost.json";

export const metadata: Metadata = {
  title: "결혼 비용 시뮬레이터 — 2026년 기준",
  description: "각 항목 비용 입력 시 총 결혼 비용 산출.",
  alternates: { canonical: "/simulator/wedding-cost/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="통계청·웨딩업계 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
