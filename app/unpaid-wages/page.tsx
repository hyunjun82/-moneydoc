import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/law/unpaid-wages.json";

export const metadata: Metadata = {
  title: "임금체불 계산기 (2026년 기준)",
  description:
    "받지 못한 임금과 지연 일수를 넣으면 연 20% 지연이자와 총 청구액을 계산해요. 퇴직 뒤 받을 돈은 퇴직일부터 14일이 지난 다음 날부터 이자가 붙어요. 500만원을 90일 늦게 받으면 이자 246,575원이 붙어요.",
  alternates: { canonical: "/unpaid-wages/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="고용노동부 2026 · 검증 완료"
    >
      <Client />
    </CalculatorShell>
  );
}
