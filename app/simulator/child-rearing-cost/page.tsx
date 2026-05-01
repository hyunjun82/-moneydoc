import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/simulator/child-rearing-cost.json";

export const metadata: Metadata = {
  title: "출산·양육비 시뮬레이터 — 2026년 기준",
  description: "자녀 수 입력 시 22년간 총 양육비 + 월평균.",
  alternates: { canonical: "/simulator/child-rearing-cost/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="통계청·보건복지부 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
