import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/loan/jeonse-loan.json";

export const metadata: Metadata = {
  title: "전세자금대출 계산기 — 2026 정확 검증 | MoneyDoc",
  description: "보증금 80% (HF·HUG·청년) + 한도 차등",
  alternates: { canonical: "/loan/jeonse-loan/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="HF·HUG 보증 한도 기준 · 5케이스 검증"
      description="보증금 80% (HF·HUG·청년) + 한도 차등"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
