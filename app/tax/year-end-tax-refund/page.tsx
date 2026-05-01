import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/tax/year-end-tax-refund.json";

export const metadata: Metadata = {
  title: "연말정산 환급 시뮬레이터 — 2026년 기준",
  description: "총급여, 부양가족, 자녀, 추가공제, 1년 떼인 소득세를 입력하면 환급/추가납부 산출.",
  alternates: { canonical: "/tax/year-end-tax-refund/" },
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
