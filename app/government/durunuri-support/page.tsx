import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/government/durunuri-support.json";

export const metadata: Metadata = {
  title: "두루누리 사회보험료 지원 계산기 — 2026년 기준",
  description: "월 보수 + 사업장 근로자 수 입력 시 자격 + 지원액 산출.",
  alternates: { canonical: "/government/durunuri-support/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="고용노동부 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
