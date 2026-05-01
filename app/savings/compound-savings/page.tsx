import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/savings/compound-savings.json";

export const metadata: Metadata = {
  title: "복리 적금 만기 계산기 — 2026년 기준",
  description: "복리 적금은 매월 이자가 원금에 합산되어 다음 달 이자에 반영. 단리 적금 대비 5~15% 더 받음.",
  alternates: { canonical: "/savings/compound-savings/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="한국은행 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
