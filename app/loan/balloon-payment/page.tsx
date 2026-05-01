import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/loan/balloon-payment.json";

export const metadata: Metadata = {
  title: "만기일시상환 계산기 — 2026년 기준",
  description: "원금·만기·금리 입력 시 매월 이자와 만기 일시상환 총액 산출.",
  alternates: { canonical: "/loan/balloon-payment/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="금융감독원 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
