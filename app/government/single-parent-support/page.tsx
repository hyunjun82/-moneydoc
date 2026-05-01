import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/government/single-parent-support.json";

export const metadata: Metadata = {
  title: "한부모가족 자녀양육비 계산기 — 2026년 기준",
  description: "소득비율과 자녀 나이 입력 시 한부모 자녀양육비 산출.",
  alternates: { canonical: "/government/single-parent-support/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="여성가족부 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
