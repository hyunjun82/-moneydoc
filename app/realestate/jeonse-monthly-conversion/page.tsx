import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/realestate/jeonse-monthly-conversion.json";

export const metadata: Metadata = {
  title: "전월세 전환율 계산기 — 2026년 기준",
  description: "기존 전세 보증금과 월세 전환 후 보증금을 입력하면 법정 월세 산출.",
  alternates: { canonical: "/realestate/jeonse-monthly-conversion/" },
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
