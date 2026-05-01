import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/realestate/housing-subscription-score.json";

export const metadata: Metadata = {
  title: "청약 가점 계산기 — 2026년 기준",
  description: "무주택연수·부양가족수·청약통장 가입연수 입력 시 가점 산출.",
  alternates: { canonical: "/realestate/housing-subscription-score/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="국토교통부 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
