import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/realestate/real-estate-roi.json";

export const metadata: Metadata = {
  title: "부동산 ROI 계산기 (2026년 기준)",
  description:
    "투자금과 보유기간 임대수익 합계, 자본이득, 보유기간을 넣으면 두 수익을 더한 총수익으로 총 ROI와 연 ROI를 계산해요. 자기자본 2억원으로 5년간 자본이득 1억원, 임대수익 1,000만원을 얻었다면 총 ROI 55%, 연 ROI 11%예요.",
  alternates: { canonical: "/roi/" },
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
