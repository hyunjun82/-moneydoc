import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "../Client";
import spec from "@/data/calculators/law/severance-pay.json";

export const metadata: Metadata = {
  title: "퇴직금 계산기 (2026년 기준)",
  description:
    "입사일과 퇴사일, 월 기본급, 연간 상여금, 전년 미사용 연차수당을 넣으면 법정 퇴직금을 계산해요. 1일 평균임금은 퇴사 전 3개월 임금 총액을 그 기간 일수로 나눠 구해요. 2020년 1월 1일 입사, 2025년 1월 1일 퇴사에 월 기본급 300만원이면 14,689,995원이에요.",
  alternates: { canonical: "/severance/calculator/" },
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
