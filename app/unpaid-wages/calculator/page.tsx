import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "../Client";
import spec from "@/data/calculators/law/unpaid-wages.json";

export const metadata: Metadata = {
  title: "임금체불 계산기 (2026년 기준)",
  description:
    "미지급액 + 연 20% 지연이자. 임금체불 미지급금 + 지연이자 계산. 체불 임금 × 연 20% 지연이자 (퇴직 후 14일 이후부터). 고용노동부 진정 또는 민사소송 가능.",
  alternates: { canonical: "/unpaid-wages/calculator/" },
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
