import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/tax/business-income-tax-simple.json";

export const metadata: Metadata = {
  title: "사업소득세 (단순경비율) 계산기 — 2026년 기준",
  description: "총수입과 단순경비율(업종별), 부양가족 입력 시 산출세액 계산.",
  alternates: { canonical: "/tax/business-income-tax-simple/" },
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
