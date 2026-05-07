import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/loan/dsr-limit.json";

export const metadata: Metadata = {
  title: "DSR 계산기 — 2026 정확 검증 | MoneyDoc",
  description: "총부채원리금상환비율 기준 한도 + 스트레스 DSR 3단계 (2025.7 시행, 가산 1.5%)",
  alternates: { canonical: "/loan/dsr-limit/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="금감원·금융위 + 가계부채 관리방안 · 5케이스 검증"
      description="총부채원리금상환비율 기준 한도 + 스트레스 DSR 3단계 (2025.7 시행, 가산 1.5%)"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
