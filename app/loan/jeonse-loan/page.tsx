import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/loan/jeonse-loan.json";

export const metadata: Metadata = {
  title: "전세자금대출 한도 계산기 — 2026년 기준",
  description: "전세 보증금 입력 시 일반 전세대출 한도 산출.",
  alternates: { canonical: "/loan/jeonse-loan/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="주택금융공사 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
