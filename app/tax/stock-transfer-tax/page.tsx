import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/tax/stock-transfer-tax.json";

export const metadata: Metadata = {
  title: "주식 양도소득세 계산기 — 2026년 기준",
  description: "양도차익과 대주주 여부를 입력하면 주식 양도세가 산출됩니다.",
  alternates: { canonical: "/tax/stock-transfer-tax/" },
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
