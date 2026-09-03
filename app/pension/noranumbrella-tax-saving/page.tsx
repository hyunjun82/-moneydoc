import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/pension/noranumbrella-tax-saving.json";

export const metadata: Metadata = {
  title: "노란우산공제 절세 계산기 (2026년 기준)",
  description:
    "사업소득별 한도 차등 (2025.1 한도 상향: 600/500/400/200만) × 한계세율. 노란우산공제 절세 효과 계산. 사업소득자 월 5~100만 납입 시 한계세율(6~45%) × 납입액만큼 종합소득세 환급. 폐업 시 일시금 수령.",
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
