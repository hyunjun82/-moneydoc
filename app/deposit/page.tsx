import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/savings/fixed-deposit.json";

export const metadata: Metadata = {
  title: "정기예금 계산기 (2026년 기준)",
  description:
    "원금, 예치 기간, 연 금리로 정기예금 이자와 세후 만기액을 계산해요. 단리로 이자를 매기고 이자소득세 15.4%(소득세 14%, 지방소득세 1.4%)를 떼요. 1천만원을 연 3%로 1년 넣으면 세후 만기는 10,253,800원이에요.",
  alternates: { canonical: "/deposit/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="정기예금 단리 산식 · 5케이스 검증"
    >
      <Client />
    </CalculatorShell>
  );
}
