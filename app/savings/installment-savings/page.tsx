import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/savings/installment-savings.json";

export const metadata: Metadata = {
  title: "적금 만기 계산기 (단리) — 2026년 기준",
  description: "월 납입금, 납입월수, 연이율을 입력하면 만기 시 세후 수령액이 산출됩니다. 일반 과세 적금은 이자소득세 15.4%가 차감됩니다.",
  alternates: { canonical: "/savings/installment-savings/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="한국은행 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
