import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/tax/four-major-insurance.json";

export const metadata: Metadata = {
  title: "4대보험료 계산기 (근로자) — 2026년 기준",
  description: "월 보수(세전)를 입력하면 4대보험 본인부담분이 항목별로 산출됩니다. 회사 부담은 별도(보통 본인과 동일).",
  alternates: { canonical: "/tax/four-major-insurance/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="4대 사회보험 정보연계센터 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
