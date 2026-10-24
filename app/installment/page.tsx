import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/savings/installment-savings.json";

export const metadata: Metadata = {
  title: "적금 계산기 (2026년 기준)",
  description:
    "월 납입액, 납입월수, 연이율로 정기적금 만기 수령액을 계산해요. 단리와 월복리 중 고를 수 있고 이자에서 15.4%를 떼요. 월 50만원을 24개월, 연 4% 단리로 넣으면 세후 12,423,000원이에요.",
  alternates: { canonical: "/installment/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="적금 단리·월복리 산식 · 5케이스 검증"
    >
      <Client />
    </CalculatorShell>
  );
}
