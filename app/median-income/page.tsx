import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/government/median-income.json";

export const metadata: Metadata = {
  title: "기준중위소득 계산기 (2026)",
  description:
    "가구원 수와 월 소득을 넣으면 2026년 기준 중위소득 100%와 50%, 48%, 40%, 32% 금액, 내 소득이 중위소득의 몇 %인지 계산해요. 1인 가구는 월 2,564,238원, 4인 가구는 월 6,494,738원이에요.",
  alternates: { canonical: "/median-income/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="보건복지부 2026 · 검증 완료"
    >
      <Client />
    </CalculatorShell>
  );
}
