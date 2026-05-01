import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/insurance/driver-insurance.json";

export const metadata: Metadata = {
  title: "운전자보험 견적 계산기 — 2026년 기준",
  description: "연령과 보장 등급(basic/standard/premium) 선택 시 표준 견적 산출.",
  alternates: { canonical: "/insurance/driver-insurance/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="손해보험협회 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
