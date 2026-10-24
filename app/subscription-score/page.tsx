import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/realestate/housing-subscription-score.json";

export const metadata: Metadata = {
  title: "청약 가점 계산기 (2026년 기준)",
  description:
    "무주택기간, 부양가족 수, 청약통장 가입기간을 넣으면 항목별 점수를 더해 청약 가점을 계산해요. 무주택기간 최대 32점, 부양가족 최대 35점, 청약통장 최대 17점으로 84점이 만점이에요.",
  alternates: { canonical: "/subscription-score/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="국토교통부 2026 · 검증 완료"
    >
      <Client />
    </CalculatorShell>
  );
}
