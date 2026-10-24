import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/tax/business-income-tax-simple.json";

export const metadata: Metadata = {
  title: "사업소득세 (단순경비율) 계산기 (2026년 기준)",
  description:
    "연 매출에 업종별 단순경비율을 적용해 사업소득세와 지방소득세를 계산해요. 부양가족 1명당 150만원 공제와 표준세액공제 7만원을 반영해요. 매출 5,000만원에 경비율 65%, 본인 1명이면 모두 1,177,000원이에요.",
  alternates: { canonical: "/business-income-tax/" },
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
