import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/loan/loan-refinance.json";

export const metadata: Metadata = {
  title: "대출 갈아타기 계산기 — 2026 정확 검증 | MoneyDoc",
  description: "기존 대출 vs 신규 대출 월 상환·총 상환 비교",
  alternates: { canonical: "/loan/loan-refinance/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="대환대출 인프라 · 5케이스 검증"
      description="기존 대출 vs 신규 대출 월 상환·총 상환 비교"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
