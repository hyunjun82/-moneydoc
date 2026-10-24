import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/tax/inheritance-tax.json";

export const metadata: Metadata = {
  title: "상속세 계산기 (2026년 기준)",
  description:
    "상속재산과 배우자, 자녀 수 등으로 상속세를 계산해요. 일괄공제 5억원과 기초·인적공제 중 큰 쪽에 배우자공제 5억원에서 30억원을 더하고 10%에서 50% 누진세율을 적용해요. 신고세액공제 3%를 뺀 납부세액까지 보여 줘요.",
  alternates: { canonical: "/inheritance-tax/" },
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
