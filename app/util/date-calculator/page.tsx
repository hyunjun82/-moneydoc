import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/util/date-calculator.json";

export const metadata: Metadata = {
  title: "날짜 계산기 (D-Day) — 2026년 기준",
  description: "시작일과 종료일 입력 시 일수·년월일 차이 + 디데이.",
  alternates: { canonical: "/util/date-calculator/" },
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
