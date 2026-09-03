import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/government/median-income.json";

export const metadata: Metadata = {
  title: "기준중위소득 계산기 (2026)",
  description:
    "가구원수별 중위 100/50/48/40/32% + 본인 소득 비율 (2026 6.51% 인상 적용). 기준중위소득 계산. 가구원수 입력 시 2026년 기준중위소득 100%·중위 30~200% 자동 산출 (1인 256만, 4인 649만 기준). 복지급여 자격 비교 기준.",
  alternates: { canonical: "/median-income/" },
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
