import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/savings/fixed-deposit.json";

export const metadata: Metadata = {
  title: "정기예금 이자 계산기 (단리) — 2026년 기준",
  description: "예치 원금, 기간(년), 연이율을 입력하면 단리 정기예금 만기 시 수령액이 산출됩니다. 이자소득세 15.4%가 자동 차감됩니다.",
  alternates: { canonical: "/savings/fixed-deposit/" },
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
