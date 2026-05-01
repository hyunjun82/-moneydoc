import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/util/percent-calculator.json";

export const metadata: Metadata = {
  title: "퍼센트 계산기 — 2026년 기준",
  description: "4가지 모드 중 선택 후 두 값 입력.",
  alternates: { canonical: "/util/percent-calculator/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="표준 산식 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
