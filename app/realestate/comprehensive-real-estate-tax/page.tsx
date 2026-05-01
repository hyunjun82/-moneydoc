import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/realestate/comprehensive-real-estate-tax.json";

export const metadata: Metadata = {
  title: "종합부동산세 계산기 — 2026년 기준",
  description: "보유 주택의 공시가 합계와 1세대 1주택자 여부를 입력하면 종합부동산세 산출세액이 계산됩니다. 공시가에서 공제(1주택 12억, 일반 9억)를 빼고 60% 공정시장가액비율을 곱한 금액이 과세표준입니다.",
  alternates: { canonical: "/realestate/comprehensive-real-estate-tax/" },
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
