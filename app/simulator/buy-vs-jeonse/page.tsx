import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/simulator/buy-vs-jeonse.json";

export const metadata: Metadata = {
  title: "매매 vs 전세 비용 비교 — 2026년 기준",
  description: "매매가·전세보증금·자기자본·금리·보유기간 입력 시 비용 비교.",
  alternates: { canonical: "/simulator/buy-vs-jeonse/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="표준 부동산 비교 산식 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
