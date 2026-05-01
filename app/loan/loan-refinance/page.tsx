import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/loan/loan-refinance.json";

export const metadata: Metadata = {
  title: "대환대출 비교 계산기 — 2026년 기준",
  description: "잔액·기존 금리·신규 금리·잔여 만기 입력 시 월 절감액과 총 절감액 비교.",
  alternates: { canonical: "/loan/loan-refinance/" },
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
