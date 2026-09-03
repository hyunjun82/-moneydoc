import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/tax/business-income-tax-simple.json";

export const metadata: Metadata = {
  title: "사업소득세 (단순경비율) 계산기 (2026년 기준)",
  description:
    "추계신고 단순경비율 기반 사업소득세. 내가 받은 사업소득(연 매출)에 단순경비율(업종별)을 곱해 사업소득 추정. 인적공제(부양가족 1명당 150만)와 표준세액공제 7만 차감 후 누진세율 적용. 5월 종합소득세 신고 시 활용.",
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
