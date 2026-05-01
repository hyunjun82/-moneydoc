import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/government/youth-housing-allowance.json";

export const metadata: Metadata = {
  title: "청년 주거급여 계산기 — 2026년 기준",
  description: "가구원수와 소득인정액 입력 시 임차급여 산출.",
  alternates: { canonical: "/government/youth-housing-allowance/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="보건복지부·국토교통부 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
