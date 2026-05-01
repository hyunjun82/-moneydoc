import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/law/inheritance-deadline.json";

export const metadata: Metadata = {
  title: "상속포기·한정승인 기한 계산기 — 2026년 기준",
  description: "사망일과 기준일 입력 시 한정승인·상속포기 기한 산출.",
  alternates: { canonical: "/law/inheritance-deadline/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="대법원 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
