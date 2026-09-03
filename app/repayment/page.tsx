import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/loan/loan-amortization.json";

export const metadata: Metadata = {
  title: "대출 계산기 (2026년 기준)",
  description:
    "원리금균등·원금균등·만기일시·거치식 4가지 상환방식 통합. 원리금균등·원금균등·만기일시 상환 방식별 월 상환액과 총 이자 계산. 대출원금·금리·기간(년)·상환방식 입력. 같은 조건 30년/4% 1억 기준 원리금균등 약 47.7만/월, 총 이자 약 7,200만.",
  alternates: { canonical: "/repayment/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="원리금균등·원금균등 한국 표준 산식 · 8케이스 자체 검증"
      description="원리금균등·원금균등·만기일시·거치식 4가지 상환방식 통합"
    >
      <Client />
    </CalculatorShell>
  );
}
