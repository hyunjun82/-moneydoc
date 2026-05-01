import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/loan/dsr-limit.json";

export const metadata: Metadata = {
  title: "DSR 한도 계산기 — 2026년 기준",
  description: "연소득과 기존 부채 월 상환액, 신규대출 만기·금리·DSR 한도(보통 은행권 40%)를 입력하면 신규로 받을 수 있는 최대 대출 한도가 산출됩니다.",
  alternates: { canonical: "/loan/dsr-limit/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="금융감독원 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
