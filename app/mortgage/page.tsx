import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/loan/mortgage-loan-limit.json";

export const metadata: Metadata = {
  title: "주담대 계산기 (2026년 기준)",
  description:
    "LTV·DSR 통합. 두 한도 중 작은 것 = 실제 한도 + 수도권 절대한도 (15억↓ 6억 / 15~25억 4억 / 25억↑ 2억). 주담대 종합 한도 계산 (LTV·DSR·수도권 절대한도 동시 적용). 연소득·매매가·지역·기존대출 입력 시 한도 중 최소값이 실 한도.",
  alternates: { canonical: "/mortgage/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="금감원·금융위 가계부채 강화 · 5케이스 검증"
      description="LTV·DSR 통합 — 두 한도 중 작은 것 + 6억 cap"
    >
      <Client />
    </CalculatorShell>
  );
}
