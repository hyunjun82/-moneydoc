import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/realestate/property-tax.json";

export const metadata: Metadata = {
  title: "재산세 계산기 — 2026년 기준",
  description: "주택공시가를 입력하면 재산세 + 지방교육세가 산출됩니다. 도시지역분(과세표준 × 0.14%)은 별도 부과.",
  alternates: { canonical: "/realestate/property-tax/" },
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
