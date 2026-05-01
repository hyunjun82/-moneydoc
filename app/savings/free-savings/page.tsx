import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/savings/free-savings.json";

export const metadata: Metadata = {
  title: "자유적금 만기 계산기 — 2026년 기준",
  description: "월 평균 납입금·기간·이율 입력 시 세후 만기 산출. 자유적금은 매월 다른 금액 가능, 평균값 사용.",
  alternates: { canonical: "/savings/free-savings/" },
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
