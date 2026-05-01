import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/loan/grace-period-loan.json";

export const metadata: Metadata = {
  title: "거치식 상환 계산기 — 2026년 기준",
  description: "거치 + 상환 기간 분리 입력. 거치기간엔 이자만, 그 후 원리금균등 상환.",
  alternates: { canonical: "/loan/grace-period-loan/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="금융감독원 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
