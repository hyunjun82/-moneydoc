import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/realestate/rental-yield.json";

export const metadata: Metadata = {
  title: "임대수익률 계산기 (2026년 기준)",
  description:
    "매매가·보증금·월세·연간 비용 기반 총수익률·순수익률. 월세 부동산의 임대수익률 계산. 매매가·보증금·월세·연간 비용 입력 시 총수익률(매매가 - 보증금 = 투자금 대비 연 임대수익) 및 순수익률(비용 차감 후) 자동 산출. 다른 부동산·금융 투자와 비교.",
  alternates: { canonical: "/realestate/rental-yield/" },
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
