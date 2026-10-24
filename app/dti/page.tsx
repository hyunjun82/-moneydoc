import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/loan/dti-limit.json";

export const metadata: Metadata = {
  title: "DTI 계산기 (2026년 기준)",
  description:
    "연소득, 다른 대출의 월 이자, 대출 기간, 금리로 DTI 기준 주택담보대출 최대 한도를 계산해요. 다른 대출은 이자만 더하고 DTI 한도는 40%, 50%, 60% 중에서 골라요. 연소득 1억원, 40%, 30년, 연 4%면 698,204,065원이에요.",
  alternates: { canonical: "/dti/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="주담대 DTI 산정 기준 · 5케이스 검증"
    >
      <Client />
    </CalculatorShell>
  );
}
