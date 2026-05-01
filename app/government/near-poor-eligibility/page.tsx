import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/government/near-poor-eligibility.json";

export const metadata: Metadata = {
  title: "차상위계층 자격 모의계산 — 2026년 기준",
  description: "가구원수와 소득인정액 입력 시 차상위계층 자격 판정.",
  alternates: { canonical: "/government/near-poor-eligibility/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="보건복지부 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
