import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/tax/daily-wage-tax.json";

export const metadata: Metadata = {
  title: "일용직 원천징수 계산기 — 2026년 기준",
  description: "일급과 근무일수 입력 시 일용직 원천징수액과 세후 수령액 산출.",
  alternates: { canonical: "/tax/daily-wage-tax/" },
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
