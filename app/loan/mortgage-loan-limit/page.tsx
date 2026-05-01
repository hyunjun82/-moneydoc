import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/loan/mortgage-loan-limit.json";

export const metadata: Metadata = {
  title: "주담대 한도 계산기 (LTV+DSR 통합) — 2026년 기준",
  description: "주택가격 + LTV비율 + 연소득 + 기존부채 + DSR한도·만기·금리 입력 시 LTV·DSR 둘 중 더 적은 한도 자동 산출.",
  alternates: { canonical: "/loan/mortgage-loan-limit/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="금융감독원·국토교통부 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
