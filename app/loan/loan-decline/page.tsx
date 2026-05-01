import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/loan/loan-decline.json";

export const metadata: Metadata = {
  title: "원금균등상환 계산기 — 2026년 기준",
  description: "원금균등은 매월 같은 원금을 갚고 이자는 남은 잔액에 비례해 줄어드는 방식입니다. 첫 달 부담은 크지만, 시간이 지날수록 상환액이 감소하고 총 이자가 적어 장기적으로 유리합니다.",
  alternates: { canonical: "/loan/loan-decline/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="금융감독원 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
