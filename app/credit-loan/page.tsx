import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/loan/credit-loan.json";

export const metadata: Metadata = {
  title: "신용대출 계산기 (2026년 기준)",
  description:
    "연소득에 한도 배수 1.0배, 1.5배, 2.0배 중 하나를 곱해 신용대출 예상 한도를 계산해요. 연소득 5,000만원에 1.5배면 75,000,000원이에요. 실제 한도는 DSR과 신용점수, 기존 부채에 따라 줄어들 수 있어요.",
  alternates: { canonical: "/credit-loan/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="은행권 신용대출 표준 산식 · 5케이스 자체 검증"
    >
      <Client />
    </CalculatorShell>
  );
}
