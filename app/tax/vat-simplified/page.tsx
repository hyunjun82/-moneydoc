import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/tax/vat-simplified.json";

export const metadata: Metadata = {
  title: "부가세 (간이과세자) 계산기 — 2026년 기준",
  description: "연 매출액 + 업종별 부가가치율 입력 시 간이과세자 부가세 산출.",
  alternates: { canonical: "/tax/vat-simplified/" },
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
