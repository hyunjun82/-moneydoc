import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/pension/retirement-pension-dc.json";

export const metadata: Metadata = {
  title: "퇴직연금 DC형 시뮬레이터 — 2026년 기준",
  description: "연봉, 근속연수, 운용수익률 입력 시 DC형 퇴직연금 예상 잔액 산출.",
  alternates: { canonical: "/pension/retirement-pension-dc/" },
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
