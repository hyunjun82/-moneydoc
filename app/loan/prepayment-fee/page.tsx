import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/loan/prepayment-fee.json";

export const metadata: Metadata = {
  title: "중도상환수수료 계산기 — 2026 정확 검증 | MoneyDoc",
  description: "잔액 × 수수료율 × (잔여기간 / 총기간 36개월) — 3년 경과 후 0%",
  alternates: { canonical: "/loan/prepayment-fee/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="은행업감독규정 중도상환수수료 가이드 · 5케이스 검증"
      description="잔액 × 수수료율 × (잔여기간 / 총기간 36개월) — 3년 경과 후 0%"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
