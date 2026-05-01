import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/tax/child-tax-credit.json";

export const metadata: Metadata = {
  title: "자녀세액공제 계산기 — 2026년 기준",
  description: "8세~20세 부양 자녀 수와 당해 출산·입양 자녀 수를 입력하면 자녀세액공제 총액이 산출됩니다.",
  alternates: { canonical: "/tax/child-tax-credit/" },
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
