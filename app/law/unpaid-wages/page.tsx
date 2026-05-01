import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/law/unpaid-wages.json";

export const metadata: Metadata = {
  title: "임금체불 미지급금 계산기 — 2026년 기준",
  description: "미지급 임금과 지연 일수 입력 시 지연이자 + 총 청구액 산출.",
  alternates: { canonical: "/law/unpaid-wages/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="고용노동부 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
