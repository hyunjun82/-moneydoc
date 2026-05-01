import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/pension/noranumbrella-tax-saving.json";

export const metadata: Metadata = {
  title: "노란우산공제 절세 계산기 — 2026년 기준",
  description: "연 납입액과 사업소득 입력 시 절세효과 산출. 소상공인·자영업자 가입.",
  alternates: { canonical: "/pension/noranumbrella-tax-saving/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="중소기업중앙회 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
