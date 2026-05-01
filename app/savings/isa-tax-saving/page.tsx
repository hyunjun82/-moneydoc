import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/savings/isa-tax-saving.json";

export const metadata: Metadata = {
  title: "ISA 절세효과 계산기 — 2026년 기준",
  description: "ISA 계좌 5년 만기 누적 이자수익을 입력하면 일반과세 대비 절감액을 산출.",
  alternates: { canonical: "/savings/isa-tax-saving/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="국세청 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
