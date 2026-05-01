import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/insurance/life-insurance-surrender.json";

export const metadata: Metadata = {
  title: "종신보험 실효보험료 계산기 — 2026년 기준",
  description: "월 보험료·납입년수·환급률 입력 시 실효(중도해지) 손실 산출.",
  alternates: { canonical: "/insurance/life-insurance-surrender/" },
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
