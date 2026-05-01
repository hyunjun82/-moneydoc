import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/simulator/savings-vs-fund.json";

export const metadata: Metadata = {
  title: "적금 vs 예금 vs 펀드 수익 비교 — 2026년 기준",
  description: "월 적립·원금·기간·이율 입력 시 적금/예금/펀드 세후 수익 비교.",
  alternates: { canonical: "/simulator/savings-vs-fund/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="표준 금융 산식 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
