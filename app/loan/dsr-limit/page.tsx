import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/loan/dsr-limit.json";

export const metadata: Metadata = {
  title: "DSR 계산기 (2026년 기준)",
  description:
    "총부채원리금상환비율 기준 한도 + 스트레스 DSR 3단계 (2025.7 시행, 가산 1.5%). DSR(총부채원리금상환비율) 한도 계산. 연소득·기존 대출 월원리금·기간·금리·DSR 한도(40·50%) 입력. 월 원리금 = 모든 부채 합산. 일반 직장인 DSR 40%, 정책대출 50%.",
  alternates: { canonical: "/loan/dsr-limit/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="은행업감독규정 §29의2 (DSR 산정) · 5케이스 검증"
      description="총부채원리금상환비율 기준 한도 + 스트레스 DSR 3단계 (2025.7 시행, 가산 1.5%)"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
