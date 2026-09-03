import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/tax/gift-tax.json";

export const metadata: Metadata = {
  title: "증여세 계산기 (2026년 기준)",
  description:
    "상증법 §53 수증자별 증여재산공제 + 누진세율. 받은 증여 재산(현금·주식·부동산·차량 등)과 증여자와의 관계를 입력하면 관계별 공제 → 과세표준 → 누진세율 자동 계산. 증여받은 날부터 3개월 이내 신고해야 가산세 X.",
  alternates: { canonical: "/gift-tax/" },
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
