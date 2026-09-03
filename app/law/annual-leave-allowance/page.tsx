import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/law/annual-leave-allowance.json";

export const metadata: Metadata = {
  title: "연차수당 계산기 (2026년 기준)",
  description:
    "월급 / 209시간 × 8시간 × 미사용 일수. 연차수당 계산. 통상임금 × 미사용 연차일수. 1년차 11일, 2년차 15일, 3년차+ 추가 1일씩 (최대 25일). 미사용분은 다음 해 6월까지 사용 또는 수당.",
  alternates: { canonical: "/law/annual-leave-allowance/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="고용노동부 2026 · 검증 완료"
    >
      <Client />
    </CalculatorShell>
  );
}
