import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/government/parental-leave-pay.json";

export const metadata: Metadata = {
  title: "육아휴직 급여 계산기 — 2026년 기준",
  description: "통상임금(월)과 휴직 개월수를 입력하면 육아휴직 급여 총액이 산출됩니다. 첫 6개월은 통상임금 100%(상한 250만), 7~12개월은 80%(상한 160만)이 적용됩니다.",
  alternates: { canonical: "/government/parental-leave-pay/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="고용노동부 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
