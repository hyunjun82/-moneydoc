import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/loan/ltv-limit.json";

export const metadata: Metadata = {
  title: "LTV 한도 계산기 — 2026년 기준",
  description: "주택가격, 보유 상태, 조정대상지역 여부를 선택하면 LTV 비율과 최대 대출 한도가 산출됩니다.",
  alternates: { canonical: "/loan/ltv-limit/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="국토교통부·금융감독원 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
