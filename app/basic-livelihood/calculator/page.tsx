import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "../Client";
import spec from "@/data/calculators/government/basic-livelihood-eligibility.json";

export const metadata: Metadata = {
  title: "기초생활수급자 모의계산 (2026년 기준)",
  description:
    "생계 32% / 의료 40% / 주거 48% / 교육 50% (2026 기준중위소득 6.51% 인상 적용). 기초생활수급자 모의계산. 가구원수·소득·재산 입력 시 생계(중위 32%)·의료(40%)·주거(48%)·교육(50%) 4종 급여 자격 판정. 자격 충족 시 부족분 지급.",
  alternates: { canonical: "/basic-livelihood/calculator/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="보건복지부 2026 · 검증 완료"
    >
      <Client />
    </CalculatorShell>
  );
}
