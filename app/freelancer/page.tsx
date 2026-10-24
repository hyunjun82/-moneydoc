import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/tax/freelancer-tax.json";

export const metadata: Metadata = {
  title: "프리랜서 3.3% 원천징수 계산기 (2026년 기준)",
  description:
    "프리랜서 보수를 세전 금액으로 넣으면 소득세 3%와 지방소득세 0.3%를 뗀 실수령액을 계산해요. 보수 300만원이면 99,000원을 떼고 2,901,000원을 받아요. 떼인 3.3%는 종합소득세 신고 때 정산해요.",
  alternates: { canonical: "/freelancer/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="국세청 2026 · 검증 완료"
    >
      <Client />
    </CalculatorShell>
  );
}
