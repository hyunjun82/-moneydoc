import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/tax/retirement-income-tax.json";

export const metadata: Metadata = {
  title: "퇴직소득세 계산기 — 2026년 기준",
  description: "퇴직금과 근속연수 입력 시 퇴직소득세 산출.",
  alternates: { canonical: "/tax/retirement-income-tax/" },
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
