import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/tax/daily-wage-tax.json";

export const metadata: Metadata = {
  title: "일용직 원천징수 계산기 (2026년 기준)",
  description:
    "일급 15만 비과세 + 초과분 6% × (1-55%) = 6% × 45% = 2.7% 적용. 일당(세전)과 근무일수 입력 시 비과세 15만 차감 → 산출세액 → 근로소득세액공제 55% → 결정세액 (1,000원 미만 비과세) → 지방세 10% 자동 계산. 건설일용직·아르바이트 등 사용.",
  alternates: { canonical: "/daily-wage/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="국세청 2026 · 검증 완료"
    >
      <Client />
    </CalculatorShell>
  );
}
