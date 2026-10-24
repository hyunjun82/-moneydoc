import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/tax/other-income-tax.json";

export const metadata: Metadata = {
  title: "기타소득세 계산기 (2026년 기준)",
  description:
    "기타소득 총수입을 넣으면 필요경비 60%를 빼고 남은 기타소득금액에 소득세 20%와 지방소득세 2%를 매겨 원천징수 세액과 실수령액을 계산해요. 떼는 세금은 보통 총수입의 8.8%로 100만원이면 88,000원이고, 총수입 10만원이면 0원이에요.",
  alternates: { canonical: "/other-income/" },
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
