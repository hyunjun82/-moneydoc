import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/insurance/medical-insurance-payout.json";

export const metadata: Metadata = {
  title: "실손보험 자기부담금 계산기 (2026년 기준)",
  description:
    "실손보험 청구 때 빼는 자기부담금과 돌려받는 보험금을 계산해요. 자기부담금은 의료비에 자기부담률을 곱한 금액과 최소 공제금액 중 큰 금액이에요. 4세대 통원 급여는 병원·의원 1만원, 종합병원 2만원, 통원 비급여는 3만원이 최소예요.",
  alternates: { canonical: "/medical-payout/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="금융위원회 실손 자기부담률 · 5케이스 검증"
    >
      <Client />
    </CalculatorShell>
  );
}
