import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/government/birth-childcare-support.json";

export const metadata: Metadata = {
  title: "출산·육아 지원금 통합 계산기 — 2026년 기준",
  description: "자녀 현재 나이 입력 시 1년치 받을 수 있는 지원금 합산.",
  alternates: { canonical: "/government/birth-childcare-support/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="보건복지부 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
