import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/savings/free-savings.json";

export const metadata: Metadata = {
  title: "자유적금 계산기 — 월 평균 납입 단리, 비과세 자동 차감 | MoneyDoc",
  description: "월 평균 납입금·기간·이율 입력 시 자유적금 만기 수령액 자동 계산. 비과세종합저축 자격 시 0원 세금. 한국은행 표준 + 금감원 finlife 검증.",
  alternates: { canonical: "/savings/free-savings/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="한국은행 표준 산식 · 5케이스 검증"
      description="월 자유 납입 적금 만기 수령액 — 평균 월납입 기준 단리, 이자세 15.4% (비과세 시 0%)"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
