import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/realestate/holding-tax-total.json";

export const metadata: Metadata = {
  title: "보유세 통합 시뮬레이터 (2026년 기준)",
  description:
    "재산세 + 종합부동산세 + 지방교육세. 주택별 공시가격(최대 3채)과 1주택자 연령·보유연수를 입력하면 매년 보유세 = 재산세 + 지방교육세(재산세의 20%) + 종합부동산세(농어촌특별세 20% 포함)를 계산합니다. 재산세는 표준세율, 1세대1주택은 공정시장가액비율 43~45%·그 외.",
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
