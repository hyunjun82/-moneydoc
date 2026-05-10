import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/loan/mortgage-loan-limit.json";

export const metadata: Metadata = {
  title: "주담대 계산기 — 2026 정확 검증 | MoneyDoc",
  description: "LTV·DSR 통합 — 두 한도 중 작은 것 + 6억 cap",
  alternates: { canonical: "/loan/mortgage-loan-limit/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="금감원·금융위 가계부채 강화 · 5케이스 검증"
      description="LTV·DSR 통합 — 두 한도 중 작은 것 + 6억 cap"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
