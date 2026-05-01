import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/government/earned-income-tax-credit.json";

export const metadata: Metadata = {
  title: "근로장려금 자격·예상액 계산기 — 2026년 기준",
  description: "가구 유형과 총소득 입력 시 자격 + 예상 지급액 산출.",
  alternates: { canonical: "/government/earned-income-tax-credit/" },
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
