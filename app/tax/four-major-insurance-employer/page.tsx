import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/tax/four-major-insurance-employer.json";

export const metadata: Metadata = {
  title: "4대보험료 (회사 부담) 계산기 — 2026년 기준",
  description: "월 보수와 업종별 산재 요율 입력 시 회사 부담 4대보험 산출.",
  alternates: { canonical: "/tax/four-major-insurance-employer/" },
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
