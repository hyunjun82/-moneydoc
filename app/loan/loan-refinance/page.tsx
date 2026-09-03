import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/loan/loan-refinance.json";

export const metadata: Metadata = {
  title: "대출 갈아타기 계산기 (2026년 기준)",
  description:
    "기존 대출 vs 신규 대출 월 상환·총 상환 비교 (대환대출). 대출 갈아타기(대환) 절약 시뮬. 기존 대출 잔액·금리·잔여기간 + 새 금리 입력 시 월 절감액·총 절감액·중도상환 수수료 차감 후 실제 이득 계산. 0.5%p 금리차 + 잔액 1억 = 약 1천만 절약.",
  alternates: { canonical: "/loan/loan-refinance/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="대환대출 인프라 표준 산식 · 5케이스 검증"
      description="기존 대출 vs 신규 대출 월 상환·총 상환 비교"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
