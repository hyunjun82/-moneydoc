import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/tax/freelancer-tax.json";

export const metadata: Metadata = {
  title: "프리랜서 3.3% 원천징수 계산기 — 2026년 기준",
  description: "지급액 입력 시 3.3% 원천징수 + 실수령 산출.",
  alternates: { canonical: "/tax/freelancer-tax/" },
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
