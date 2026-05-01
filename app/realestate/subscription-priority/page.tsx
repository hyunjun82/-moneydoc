import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/realestate/subscription-priority.json";

export const metadata: Metadata = {
  title: "청약 1순위 자격 판정 — 2026년 기준",
  description: "청약통장 가입개월·납입횟수·무주택 여부 입력 시 1순위 자격 판정.",
  alternates: { canonical: "/realestate/subscription-priority/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="국토교통부 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
