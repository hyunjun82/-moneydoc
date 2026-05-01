import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/savings/simple-vs-compound.json";

export const metadata: Metadata = {
  title: "단리 vs 복리 비교 계산기 — 2026년 기준",
  description: "원금·기간·이율을 입력하면 단리와 월복리의 만기 수령액 차이를 한눈에 비교할 수 있습니다.",
  alternates: { canonical: "/savings/simple-vs-compound/" },
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
