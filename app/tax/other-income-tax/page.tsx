import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/tax/other-income-tax.json";

export const metadata: Metadata = {
  title: "기타소득세 계산기 — 2026년 기준",
  description: "강연료·원고료·일시 사업 등 기타소득 입력 시 22% 원천징수 산출.",
  alternates: { canonical: "/tax/other-income-tax/" },
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
