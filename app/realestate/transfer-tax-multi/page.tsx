import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/realestate/transfer-tax-multi.json";

export const metadata: Metadata = {
  title: "양도소득세 계산기 (다주택자) — 2026년 기준",
  description: "다주택자가 주택을 양도할 때의 양도세를 계산합니다. 양도가액·취득가액·보유연수를 입력하면 자동으로 단기/일반 세율 분기가 적용됩니다.",
  alternates: { canonical: "/realestate/transfer-tax-multi/" },
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
