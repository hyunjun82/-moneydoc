import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/tax/comprehensive-income-tax.json";

export const metadata: Metadata = {
  title: "종합소득세 계산기 — 2026 누진세율 기준",
  description:
    "사업소득·임대소득·기타소득 합산 종합소득세를 정부 공식 산식(소득세법 §55, §50, §59의2)으로 계산. 인적공제·자녀세액공제·추가공제 자동 반영. 5케이스 검증 완료.",
  alternates: { canonical: "/tax/comprehensive-income-tax/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="국세청 2026 · 5케이스 검증 완료"
      description="근로소득 외 사업·임대·기타소득이 있는 분이 매년 5월 신고하는 종합소득세를 누진세율(6~45%)로 정확히 계산해드립니다."
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
