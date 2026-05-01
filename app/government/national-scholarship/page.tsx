import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/government/national-scholarship.json";

export const metadata: Metadata = {
  title: "국가장학금 소득분위 계산기 — 2026년 기준",
  description: "소득분위와 등록금 입력 시 학기당 지원액 산출.",
  alternates: { canonical: "/government/national-scholarship/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="한국장학재단 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
