import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/savings/fixed-deposit.json";

export const metadata: Metadata = {
  title: "정기예금 계산기 (2026년 기준)",
  description:
    "목돈을 한번에 맡길 때 만기 수령액. 원금 × 연 금리 × 기간(단리)으로 이자를 내고, 이자소득세 15.4%(소득세 14%, 지방소득세 1.4%)를 뗀 세후 만기액을 계산해요. 비과세종합저축(65세 이상 기초연금 수급자, 장애인 등)은 0%예요.",
  alternates: { canonical: "/deposit/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="정기예금 단리 산식 · 5케이스 검증"
      description="목돈 일시 예치 시 만기 수령액 — 단리, 이자소득세 15.4% 자동 차감 (비과세 자격 시 0%)"
    >
      <Client />
    </CalculatorShell>
  );
}
