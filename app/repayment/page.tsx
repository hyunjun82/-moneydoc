import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/loan/loan-amortization.json";

export const metadata: Metadata = {
  title: "대출 계산기 (2026년 기준)",
  description:
    "대출 원금과 연 금리, 기간, 상환방식을 넣으면 원리금균등, 원금균등, 만기일시, 거치식 4가지 방식으로 월 상환액과 총 이자를 계산해요. 1억원을 30년, 연 4% 원리금균등으로 빌리면 매달 477,415원, 총 이자 71,869,605원이에요.",
  alternates: { canonical: "/repayment/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="원리금균등·원금균등 한국 표준 산식 · 8케이스 자체 검증"
    >
      <Client />
    </CalculatorShell>
  );
}
