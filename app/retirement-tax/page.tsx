import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/tax/retirement-income-tax.json";

export const metadata: Metadata = {
  title: "퇴직소득세 계산기 (2026년 기준)",
  description:
    "퇴직금 총액과 근속연수를 넣으면 근속연수공제와 환산급여공제를 차례로 빼고 퇴직소득세와 지방소득세를 계산해요. 지방소득세는 퇴직소득세의 10%이고, 퇴직금 5,000만원을 10년 근속하고 받으면 모두 748,000원이에요.",
  alternates: { canonical: "/retirement-tax/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="국세청 2026 · 검증 완료"
    >
      <Client />
    </CalculatorShell>
  );
}
