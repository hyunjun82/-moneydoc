import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/tax/inheritance-tax.json";

export const metadata: Metadata = {
  title: "상속세 계산기 — 2026년 기준",
  description: "상속재산 총액과 배우자 유무를 입력하면 상속세가 산출됩니다.",
  alternates: { canonical: "/tax/inheritance-tax/" },
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
