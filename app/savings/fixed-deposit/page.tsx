import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/savings/fixed-deposit.json";

export const metadata: Metadata = {
  title: "정기예금 계산기 — 2026 단리 + 비과세 자동 차감 | MoneyDoc",
  description: "예치 원금·기간·이율 입력 시 단리 정기예금 만기 수령액 자동 계산. 비과세종합저축 자격 시 0원 세금. 한국은행 표준 + 금감원 finlife 검증.",
  alternates: { canonical: "/savings/fixed-deposit/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="한국은행 표준 산식 · 5케이스 검증"
      description="목돈 일시 예치 시 만기 수령액 — 단리, 이자소득세 15.4% 자동 차감 (비과세 자격 시 0%)"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
