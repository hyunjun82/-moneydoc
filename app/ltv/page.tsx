import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/loan/ltv-limit.json";

export const metadata: Metadata = {
  title: "LTV 계산기 (2026년 기준)",
  description:
    "주택가격과 주택보유 상태, 지역을 고르면 LTV를 곱한 한도에서 방 공제와 임차보증금을 빼 주택담보대출 한도를 계산해요. 수도권과 규제지역은 시가 15억원 이하 6억원, 25억원 이하 4억원, 25억원 초과 2억원의 절대한도도 함께 적용해요.",
  alternates: { canonical: "/ltv/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="국토부·금감원 LTV 한도 · 8케이스 검증"
    >
      <Client />
    </CalculatorShell>
  );
}
