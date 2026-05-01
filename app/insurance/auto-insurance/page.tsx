import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/insurance/auto-insurance.json";

export const metadata: Metadata = {
  title: "자동차보험 할인할증 계산기 — 2026년 기준",
  description: "기본 보험료, 현재 적립등급, 최근 1년 사고 건수를 입력하면 갱신 시 등급과 보험료가 산출됩니다.",
  alternates: { canonical: "/insurance/auto-insurance/" },
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
