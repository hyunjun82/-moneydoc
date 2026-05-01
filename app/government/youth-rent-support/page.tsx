import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/government/youth-rent-support.json";

export const metadata: Metadata = {
  title: "청년 월세 지원 계산기 — 2026년 기준",
  description: "연령·무주택·소득비율·월세 입력 시 자격 + 지원액 산출.",
  alternates: { canonical: "/government/youth-rent-support/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="국토교통부 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
