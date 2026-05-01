import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/tax/overseas-stock-tax.json";

export const metadata: Metadata = {
  title: "해외주식 양도세 계산기 — 2026년 기준",
  description: "연 합산 양도차익 입력 시 22% 분리과세.",
  alternates: { canonical: "/tax/overseas-stock-tax/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="국세청 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
