import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/tax/crypto-transfer-tax.json";

export const metadata: Metadata = {
  title: "가상화폐 양도세 계산기 — 2026년 기준",
  description: "연 합산 양도차익 입력 시 가상자산 양도세 산출.",
  alternates: { canonical: "/tax/crypto-transfer-tax/" },
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
