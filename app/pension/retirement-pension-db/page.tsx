import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/pension/retirement-pension-db.json";

export const metadata: Metadata = {
  title: "퇴직연금 DB형 계산기 — 2026년 기준",
  description: "마지막 월 평균임금과 근속연수 입력 시 DB형 퇴직연금 산출.",
  alternates: { canonical: "/pension/retirement-pension-db/" },
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
