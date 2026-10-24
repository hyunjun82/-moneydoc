import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/tax/stock-transfer-tax.json";

export const metadata: Metadata = {
  title: "주식 양도소득세 계산기 (국내·해외 통합) (2026년 기준)",
  description:
    "해외주식이나 국내 비상장·대주주 주식의 연간 양도차익을 넣으면 기본공제 250만원을 빼고 지방소득세 포함 22%로 양도소득세를 계산해요. 국내 대주주는 과세표준 3억원 초과분에 27.5%예요. 국내 상장주식 장내 소액주주는 비과세이고, 중소기업 주식을 판 소액주주는 결과가 달라요.",
  alternates: { canonical: "/stock-tax/" },
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
