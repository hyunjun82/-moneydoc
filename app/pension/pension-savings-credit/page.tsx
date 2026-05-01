import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/pension/pension-savings-credit.json";

export const metadata: Metadata = {
  title: "연금저축 환급 계산기 — 2026년 기준",
  description: "연 납입액과 총급여 입력 시 세액공제 환급 산출.",
  alternates: { canonical: "/pension/pension-savings-credit/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="국세청 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
