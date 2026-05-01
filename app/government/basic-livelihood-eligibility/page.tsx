import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/government/basic-livelihood-eligibility.json";

export const metadata: Metadata = {
  title: "기초생활수급자 자격 모의계산 — 2026년 기준",
  description: "가구원수와 소득인정액 입력 시 4종 급여(생계/의료/주거/교육) 자격 판정.",
  alternates: { canonical: "/government/basic-livelihood-eligibility/" },
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
