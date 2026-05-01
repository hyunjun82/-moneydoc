import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/loan/dti-limit.json";

export const metadata: Metadata = {
  title: "DTI 한도 계산기 — 2026년 기준",
  description: "연소득과 기존 대출 월이자를 입력하면 신규 주담대 한도 산출.",
  alternates: { canonical: "/loan/dti-limit/" },
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
