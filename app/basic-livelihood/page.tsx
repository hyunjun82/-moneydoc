import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/government/basic-livelihood-eligibility.json";

export const metadata: Metadata = {
  title: "기초생활수급자 모의계산 (2026년 기준)",
  description:
    "가구원 수와 월 소득인정액으로 2026년 생계, 의료, 주거, 교육급여 자격을 판정해요. 선정기준은 기준 중위소득의 32%, 40%, 48%, 50%예요. 1인 가구 생계급여 기준은 월 820,556원이에요.",
  alternates: { canonical: "/basic-livelihood/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="보건복지부 2026 · 검증 완료"
    >
      <Client />
    </CalculatorShell>
  );
}
