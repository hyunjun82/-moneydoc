import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/law/annual-leave-allowance.json";

export const metadata: Metadata = {
  title: "연차수당 계산기 (2026년 기준)",
  description:
    "월 통상임금과 쓰지 못한 연차 일수로 연차수당을 계산해요. 월 통상임금을 209시간으로 나눈 시급에 8시간과 남은 일수를 곱해요. 월 300만원에 15일이 남았다면 연차수당은 1,722,480원이에요.",
  alternates: { canonical: "/annual-leave/" },
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
