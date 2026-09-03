import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/tax/other-income-tax.json";

export const metadata: Metadata = {
  title: "기타소득세 계산기 (2026년 기준)",
  description:
    "필요경비 60% 차감 후 22% 분리과세. 강의료·원고료·인세·상금·복권 등 기타소득 총수입을 입력하면 필요경비 60% 추정공제 → 분리과세 22%(소득세 20% + 지방세 2%) 자동 계산. 소득금액 5만 이하면 비과세 (소액부징수).",
  alternates: { canonical: "/tax/other-income-tax/" },
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
