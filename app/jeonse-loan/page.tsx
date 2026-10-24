import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/loan/jeonse-loan.json";

export const metadata: Metadata = {
  title: "전세자금대출 계산기 (2026년 기준)",
  description:
    "전세 보증금에 보증금 대비 비율을 곱한 금액과 기관별 최대 금액 중 적은 금액을 전세대출 한도로 계산해요. HF 일반은 80%에 최대 4억원, 버팀목은 70%에 수도권 1.2억원이에요. 상환능력 한도와 HF 수도권·규제지역 8/9 조정은 반영하지 않아요.",
  alternates: { canonical: "/jeonse-loan/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="HF·HUG 보증 한도 기준 · 5케이스 검증"
    >
      <Client />
    </CalculatorShell>
  );
}
