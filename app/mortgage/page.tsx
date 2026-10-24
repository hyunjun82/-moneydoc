import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/loan/mortgage-loan-limit.json";

export const metadata: Metadata = {
  title: "주담대 계산기 (2026년 기준)",
  description:
    "주택가격과 LTV, 연소득, 기존 부채 월상환, 금리, 대출 기간을 넣으면 LTV 한도와 DSR 한도 중 작은 금액을 주담대 한도로 계산해요. 스트레스 DSR 3단계는 금리에 1.5%p를 더하고, 수도권은 시가별 절대한도 6억원, 4억원, 2억원도 비교해요.",
  alternates: { canonical: "/mortgage/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="금감원·금융위 가계부채 강화 · 5케이스 검증"
    >
      <Client />
    </CalculatorShell>
  );
}
