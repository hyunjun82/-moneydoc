import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/util/installment-fee.json";

export const metadata: Metadata = {
  title: "신용카드 할부 수수료 계산기 — 2026년 기준",
  description: "할부 원금·개월·수수료율 입력 시 월 결제액과 총 수수료 산출.",
  alternates: { canonical: "/util/installment-fee/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="여신금융협회 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
