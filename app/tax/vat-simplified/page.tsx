import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/tax/vat-simplified.json";

export const metadata: Metadata = {
  title: "부가세 (간이과세자) 계산기 (2026년 기준)",
  description:
    "매출액 × 업종별 부가가치율 × 10% (2021.7.1~ 시행 기준 15/20/25/30/40%). 연 매출 8,000만 미만 사업자(간이과세자)가 사용. 매출 × 업종별 부가가치율 × 10% = 납부세액. 일반과세보다 세금 적지만 환급 X·세금계산서 발행 한정.",
  alternates: { canonical: "/tax/vat-simplified/" },
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
