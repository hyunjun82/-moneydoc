import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/government/industrial-accident-pay.json";

export const metadata: Metadata = {
  title: "산재 휴업급여 계산기 (2026년 기준)",
  description:
    "월 평균임금과 휴업 일수로 산재 휴업급여를 계산해요. 월 평균임금을 30으로 나눈 1일 평균임금의 70%를 주고, 2026년에는 하루 82,560원보다 적게 받지 않아요. 월 400만원에 90일이면 8,399,970원이에요.",
  alternates: { canonical: "/injury-pay/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="근로복지공단 2026 · 검증 완료"
    >
      <Client />
    </CalculatorShell>
  );
}
