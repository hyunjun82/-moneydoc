import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/realestate/real-estate-roi.json";

export const metadata: Metadata = {
  title: "부동산 ROI 계산기 (2026년 기준)",
  description:
    "임대수익 + 자본이득 통합 ROI. 부동산 투자 수익률 계산. 투자금 + 보유기간 임대수익 + 자본이득 (매도가-매수가) 입력 시 누적 ROI와 연 평균 ROI 자동 산출. 보유기간 길수록 자본이득 효과 큼. 다른 투자(주식·예금)와 비교 시 유용.",
  alternates: { canonical: "/realestate/real-estate-roi/" },
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
