import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/realestate/real-estate-roi.json";

export const metadata: Metadata = {
  title: "부동산 ROI 계산기 — 2026년 기준",
  description: "투자금·임대수익·자본이득·보유기간 입력 시 총·연 ROI 산출.",
  alternates: { canonical: "/realestate/real-estate-roi/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="표준 부동산 산식 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
