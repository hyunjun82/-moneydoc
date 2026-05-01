import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/law/severance-pay.json";

export const metadata: Metadata = {
  title: "퇴직금 계산기 (법정) — 2026년 기준",
  description: "월 기본급, 연간 상여금, 미사용 연차수당, 총 근속일수를 입력하면 법정 퇴직금이 계산됩니다. 평균임금은 「최근 3개월 임금 총액 ÷ 90일」로 산출되며, 상여금은 연간 ÷ 4(3개월분), 연차수당은 전년분 ÷ 4를 더해 계산합니다.",
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
