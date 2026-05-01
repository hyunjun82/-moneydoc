import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/realestate/transfer-tax-adjusted.json";

export const metadata: Metadata = {
  title: "양도세 조정대상지역 다주택 (추가세율) 계산기 — 2026년 기준",
  description: "양도가액·취득가액·보유연수·주택수 입력 시 추가세율 포함 양도세 산출.",
  alternates: { canonical: "/realestate/transfer-tax-adjusted/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="국세청 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
