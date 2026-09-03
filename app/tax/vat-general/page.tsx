import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/tax/vat-general.json";

export const metadata: Metadata = {
  title: "부가세 (일반과세자) 계산기 (2026년 기준)",
  description:
    "매출 부가세 - 매입 부가세 = 납부세액. 분기별 매출 부가세(매출 ÷ 11) - 매입 부가세(공제 가능 항목 영수증 기준) = 납부세액. 음수면 환급. 1·4분기는 1월·7월 25일까지 신고.",
  alternates: { canonical: "/tax/vat-general/" },
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
