import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/tax/vat-general.json";

export const metadata: Metadata = {
  title: "부가세 (일반과세자) 계산기 — 2026년 기준",
  description: "매출·매입 부가세 입력 시 납부 또는 환급액 산출.",
  alternates: { canonical: "/tax/vat-general/" },
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
