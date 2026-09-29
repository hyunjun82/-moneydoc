import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/insurance/medical-insurance-payout.json";

export const metadata: Metadata = {
  title: "실손보험 자기부담금 계산기 (2026년 기준)",
  description:
    "실손보험 자기부담금과 보험금을 계산해요. 자기부담금은 의료비 × 자기부담률과 최소 공제금액(4세대 통원 급여 1·2만원, 통원 비급여 3만원) 중 큰 금액이에요. 금융위원회 4·5세대 비교표 기준이에요.",
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
