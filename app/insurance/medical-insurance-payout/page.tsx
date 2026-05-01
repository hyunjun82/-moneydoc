import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/insurance/medical-insurance-payout.json";

export const metadata: Metadata = {
  title: "실손보험 자기부담금 계산기 — 2026년 기준",
  description: "총 의료비, 면책금, 자기부담률 입력 시 보험금과 본인부담 산출.",
  alternates: { canonical: "/insurance/medical-insurance-payout/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="금융감독원 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
