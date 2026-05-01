import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/government/median-income.json";

export const metadata: Metadata = {
  title: "중위소득 계산기 — 2026년 기준",
  description: "가구원수와 본인 소득 입력 시 중위소득 비율과 각 복지 자격 기준 표시.",
  alternates: { canonical: "/government/median-income/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="보건복지부 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
