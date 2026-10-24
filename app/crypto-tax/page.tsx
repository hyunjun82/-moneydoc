import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/tax/crypto-transfer-tax.json";

export const metadata: Metadata = {
  title: "가상화폐 양도세 계산기 (2026년 기준)",
  description:
    "2027년 1월 1일 이후 양도하거나 대여한 가상자산 소득세를 계산해요. 1년 차익에서 기본공제 250만원을 빼고 소득세 20%와 지방소득세 2%를 더한 22%를 매겨요. 차익 1,000만원이면 세금은 1,650,000원이에요.",
  alternates: { canonical: "/crypto-tax/" },
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
