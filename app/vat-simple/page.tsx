import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/tax/vat-simplified.json";

export const metadata: Metadata = {
  title: "부가세 (간이과세자) 계산기 (2026년 기준)",
  description:
    "부가세를 포함한 연 매출액과 업종을 넣으면 매출액에 업종별 부가가치율과 10%를 차례로 곱해 간이과세자 부가세를 계산해요. 부가가치율은 15%에서 40%이고, 음식점업 매출 5,000만원이면 750,000원이에요. 매입은 반영하지 않아요.",
  alternates: { canonical: "/vat-simple/" },
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
