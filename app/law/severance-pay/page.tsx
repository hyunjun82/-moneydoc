import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/law/severance-pay.json";

export const metadata: Metadata = {
  title: "퇴직금 계산기 (2026년 기준)",
  description:
    "고용노동부 공식 계산기 1:1 동일 (근로자퇴직급여보장법 §8). 입사일·퇴사일·월 기본급·연간 상여금·미사용 연차수당을 입력하면 고용노동부 공식 계산기와 동일한 법정 퇴직금이 계산됩니다. 평균임금은 「최근 3개월 임금 총액 ÷ 그 기간의 총 일수(89~92일)」로 산출되며, 상여금은.",
  alternates: { canonical: "/law/severance-pay/" },
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
