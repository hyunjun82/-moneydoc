import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/pension/public-officer-pension.json";

export const metadata: Metadata = {
  title: "공무원연금 시뮬레이터 — 2026년 기준",
  description: "평균 기준소득월액과 재직 연수 입력 시 공무원연금 산출.",
  alternates: { canonical: "/pension/public-officer-pension/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="공무원연금공단 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
