import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/loan/prepayment-fee.json";

export const metadata: Metadata = {
  title: "중도상환수수료 계산기 — 2026년 기준",
  description: "잔액·총만기·잔여만기·수수료율 입력 시 중도상환수수료 산출.",
  alternates: { canonical: "/loan/prepayment-fee/" },
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
