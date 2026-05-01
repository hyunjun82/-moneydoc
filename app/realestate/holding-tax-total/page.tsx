import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/realestate/holding-tax-total.json";

export const metadata: Metadata = {
  title: "보유세 통합 시뮬레이터 — 2026년 기준",
  description: "공시가 합계와 1세대 1주택 여부 입력 시 재산세·종부세·교육세 통합 산출.",
  alternates: { canonical: "/realestate/holding-tax-total/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="국세청·행정안전부 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
