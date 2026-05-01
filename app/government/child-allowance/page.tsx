import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/government/child-allowance.json";

export const metadata: Metadata = {
  title: "자녀장려금 자격·예상액 계산기 — 2026년 기준",
  description: "총소득과 18세 미만 자녀 수 입력 시 자녀장려금 자격 + 예상액 산출.",
  alternates: { canonical: "/government/child-allowance/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="국세청 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
