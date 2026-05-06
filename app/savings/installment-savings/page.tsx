import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/savings/installment-savings.json";

export const metadata: Metadata = {
  title: "적금 계산기 — 2026년 단리/복리 + 비과세 자동 차감 | MoneyDoc",
  description: "월 납입금·기간·이율 입력 시 만기 수령액 자동 계산. 단리/복리 토글, 비과세종합저축 자격 시 0원 세금. 한국은행 표준 산식 + 금감원 finlife 검증.",
  alternates: { canonical: "/savings/installment-savings/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="한국은행 표준 산식 · 5케이스 검증"
      description="월 X원 납입 시 만기 수령액 — 단리/복리 토글, 이자소득세 15.4% 차감 (비과세 자격 시 0%)"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
