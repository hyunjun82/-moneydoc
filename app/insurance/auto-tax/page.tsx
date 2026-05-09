import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/insurance/auto-tax.json";

export const metadata: Metadata = {
  title: "자동차세 계산기 — 2026년 기준",
  description: "배기량·연식·영업용 입력 시 자동차세 + 지방교육세 자동 산출. 위택스 표준 기준.",
  alternates: { canonical: "/insurance/auto-tax/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="행정안전부 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
