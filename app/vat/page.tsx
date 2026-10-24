import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/tax/vat-general.json";

export const metadata: Metadata = {
  title: "부가세 (일반과세자) 계산기 (2026년 기준)",
  description:
    "한 신고 기간의 매출 부가세와 공제 대상 매입 부가세를 넣으면 일반과세자가 낼 부가세나 돌려받을 환급세액을 계산해요. 매출 부가세는 공급가액의 10%이고, 부가세 포함 금액이면 11로 나눠 구해요. 결과가 음수면 환급 대상이에요.",
  alternates: { canonical: "/vat/" },
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
