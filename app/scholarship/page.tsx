import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/government/national-scholarship.json";

export const metadata: Metadata = {
  title: "국가장학금 소득분위 계산기 (2026년 기준)",
  description:
    "소득구간과 학기 등록금을 넣으면 구간별 학기당 한도와 등록금 중 적은 금액으로 국가장학금 지원액을 계산해요. 2026학년도 기준 1~3구간 300만원, 4~6구간 220만원, 7~8구간 180만원, 9구간 50만원이 한도예요.",
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
