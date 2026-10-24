import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/util/installment-fee.json";

export const metadata: Metadata = {
  title: "신용카드 할부 수수료 계산기 (2026년 기준)",
  description:
    "할부 원금, 할부 개월, 연 수수료율로 신용카드 할부의 월 결제액과 총 수수료를 계산해요. 매달 같은 금액을 내는 원리금균등 방식이에요. 1,000만원을 연 15%로 12개월 할부하면 월 결제액은 902,583원이에요.",
  alternates: { canonical: "/card-installment/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="여신금융협회 2026 · 검증 완료"
    >
      <Client />
    </CalculatorShell>
  );
}
