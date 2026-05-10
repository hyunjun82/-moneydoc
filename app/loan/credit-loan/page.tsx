import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/loan/credit-loan.json";

export const metadata: Metadata = {
  title: "신용대출 계산기 — 2026 정확 검증 | MoneyDoc",
  description: "연소득 기준 한도 (관행 1.5배) + DSR·신용도 추가 적용",
  alternates: { canonical: "/loan/credit-loan/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="은행권 신용대출 표준 산식 · 5케이스 자체 검증"
      description="연소득 기준 한도 (관행 1.5배) + DSR·신용도 추가 적용"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
