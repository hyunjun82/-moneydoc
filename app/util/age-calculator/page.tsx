import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/util/age-calculator.json";

export const metadata: Metadata = {
  title: "나이 계산기 — 2026년 기준",
  description: "생년월일과 기준일 입력 시 만 나이·한국 나이·띠 자동 산출.",
  alternates: { canonical: "/util/age-calculator/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="표준 산식 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
