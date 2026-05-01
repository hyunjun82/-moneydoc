import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/government/maternity-leave-pay.json";

export const metadata: Metadata = {
  title: "출산휴가 급여 계산기 — 2026년 기준",
  description: "월 통상임금과 다태 여부 입력 시 출산휴가 총 급여 산출.",
  alternates: { canonical: "/government/maternity-leave-pay/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="고용노동부 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
