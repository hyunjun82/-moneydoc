import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/government/unemployment-benefit-days.json";

export const metadata: Metadata = {
  title: "실업급여 수급기간 계산기 — 2026년 기준",
  description: "가입연수와 50세+/장애인 여부 입력 시 수급 일수 산출.",
  alternates: { canonical: "/government/unemployment-benefit-days/" },
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
