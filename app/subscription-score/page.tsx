import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/realestate/housing-subscription-score.json";

export const metadata: Metadata = {
  title: "청약 가점 계산기 (2026년 기준)",
  description:
    "무주택기간 + 부양가족 + 청약통장 가입기간 합산 (총 84점). 주택청약 가점제 점수 계산. 무주택기간(최대 32점) + 부양가족수(최대 35점) + 청약통장 가입기간(최대 17점) = 84점 만점. 1순위 가점 청약 신청 시 활용. 점수 높을수록 당첨 확률 ↑.",
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
