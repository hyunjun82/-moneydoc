import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/savings/housing-subscription.json";

export const metadata: Metadata = {
  title: "주택청약종합저축 만기 계산기 — 2026년 기준",
  description: "청약통장 월 납입과 기간을 입력하면 단리 만기액 산출.",
  alternates: { canonical: "/savings/housing-subscription/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="국토교통부 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
