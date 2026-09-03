import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/government/national-scholarship.json";

export const metadata: Metadata = {
  title: "국가장학금 소득분위 계산기 (2026년 기준)",
  description:
    "소득분위별 학기당 장학금 지원 (1~3분위 285만/학기). 국가장학금 소득분위 계산. 가구원수·소득·재산 입력 시 1~10구간 자동 판정. 1~3구간 학기 300만/4~6 220만/7~8 180만/9 50만 (2026 기준).",
  alternates: { canonical: "/scholarship/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="한국장학재단 2026 · 검증 완료"
    >
      <Client />
    </CalculatorShell>
  );
}
