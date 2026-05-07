import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/loan/loan-amortization.json";

export const metadata: Metadata = {
  title: "대출 계산기 — 원리금균등·원금균등·만기일시·거치식 통합 | MoneyDoc",
  description: "원금·기간·이율·상환방식 입력 시 월 상환액·총 이자 자동 계산. PMT 표준 산식, 4가지 상환방식 통합. 8케이스 검증.",
  alternates: { canonical: "/loan/loan-amortization/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="금감원 PMT 표준 산식 · 8케이스 검증"
      description="원리금균등·원금균등·만기일시·거치식 4가지 상환방식 통합"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
