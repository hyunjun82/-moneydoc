import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/util/date-calculator.json";

export const metadata: Metadata = {
  title: "날짜 계산기 (D-Day) (2026년 기준)",
  description:
    "두 날짜 사이 일수·년월일 + 디데이. 두 날짜 사이 일수·개월수·년수 계산. 시작일과 종료일을 입력하면 영업일·평일·휴일 구분도 가능. 계약기간·근속일수·재직기간·여행일수 등 계산에 사용.",
  alternates: { canonical: "/util/date-calculator/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="표준 산식 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
