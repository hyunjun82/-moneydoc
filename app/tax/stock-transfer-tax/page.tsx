import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/tax/stock-transfer-tax.json";

export const metadata: Metadata = {
  title: "주식 양도소득세 계산기 (국내·해외 통합) (2026년 기준)",
  description:
    "해외주식·국내 비상장/대주주 20%+지방세 (대주주 과표 3억 초과분 25%) · 상장주식 장내 소액주주 비과세. 주식 매도 후 세금이 얼마나 나오는지 미리 알고 싶을 때. 가장 흔한 케이스. 미국·일본 주식(테슬라·애플·엔비디아·도요타 등)을 팔았다면, 차익에서 250만원 빼고.",
  alternates: { canonical: "/tax/stock-transfer-tax/" },
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
