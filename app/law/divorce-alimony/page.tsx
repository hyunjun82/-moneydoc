import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/law/divorce-alimony.json";

export const metadata: Metadata = {
  title: "이혼 위자료 시뮬레이터 — 2026년 기준",
  description: "결혼기간과 유책 정도(low/medium/high) 입력 시 위자료 추정.",
  alternates: { canonical: "/law/divorce-alimony/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="대법원·서울가정법원 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
