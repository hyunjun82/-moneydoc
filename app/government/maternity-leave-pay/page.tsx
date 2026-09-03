import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/government/maternity-leave-pay.json";

export const metadata: Metadata = {
  title: "출산휴가 급여 계산기 (2026년 기준)",
  description:
    "90일 (다태 120일) + 고용보험 월 220만 상한. 출산휴가 급여 계산. 90일(다태 120일) 통상임금 100%. 우선지원대상기업은 정부 90일+사업주 차액 60일, 대기업은 사업주 60일+정부 30일. 월 220만원 정부 한도.",
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
