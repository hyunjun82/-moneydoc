import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/realestate/rental-yield.json";

export const metadata: Metadata = {
  title: "임대수익률 계산기 (2026년 기준)",
  description:
    "매매가와 보증금, 월세, 연간 비용을 넣으면 매매가에서 보증금을 뺀 투자금 기준으로 총수익률과 순수익률을 계산해요. 5억원 아파트를 보증금 1억원, 월세 100만원에 놓으면 총수익률 3%, 연간 비용 240만원이면 순수익률 2.4%예요.",
  alternates: { canonical: "/rental-yield/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="표준 부동산 산식 2026 · 검증 완료"
    >
      <Client />
    </CalculatorShell>
  );
}
