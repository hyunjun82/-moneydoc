import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/realestate/comprehensive-real-estate-tax.json";

export const metadata: Metadata = {
  title: "종합부동산세 계산기 (2026년 기준)",
  description:
    "공정시장가액 60% 적용 + 1주택자 12억 공제. 주택별 공시가격(최대 3채)과 1주택자라면 연령·보유연수를 입력하면 종합부동산세를 계산합니다. 1세대1주택 12억·그 외 9억 공제, 공정시장가액비율 60%, 재산세액 공제, 고령자·장기보유 세액공제(합계 80% 한도), 농어촌특별세.",
  alternates: { canonical: "/realestate/comprehensive-real-estate-tax/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="국세청 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
