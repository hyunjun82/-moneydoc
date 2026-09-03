import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/util/installment-fee.json";

export const metadata: Metadata = {
  title: "신용카드 할부 수수료 계산기 (2026년 기준)",
  description:
    "원리금균등 방식 월 결제액 + 총 수수료. 신용카드 할부 수수료 계산. 결제금액·할부개월·연이율 입력. 보통 3개월 무이자, 6개월+ 유이자(연 13~20%). 할부 회당 원리금균등 산식 적용.",
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
