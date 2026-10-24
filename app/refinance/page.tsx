import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/loan/loan-refinance.json";

export const metadata: Metadata = {
  title: "대출 갈아타기 계산기 (2026년 기준)",
  description:
    "기존 대출 잔액과 기존 금리, 새 금리, 남은 기간을 넣으면 원리금균등 기준으로 두 대출의 월 상환액과 총 상환액을 비교해요. 1억원을 25년 남기고 5%에서 3.5%로 옮기면 한 달 83,966원을 아껴요. 중도상환수수료는 빼지 않아요.",
  alternates: { canonical: "/refinance/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="대환대출 인프라 표준 산식 · 5케이스 검증"
    >
      <Client />
    </CalculatorShell>
  );
}
