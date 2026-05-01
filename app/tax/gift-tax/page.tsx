import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/tax/gift-tax.json";

export const metadata: Metadata = {
  title: "증여세 계산기 — 2026년 기준",
  description: "증여재산과 수증자 관계를 입력하면 증여세가 산출됩니다. 공제는 10년 합산 한도이며, 동일 수증자에게 10년 내 추가 증여 시 합산 신고 필수.",
  alternates: { canonical: "/tax/gift-tax/" },
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
