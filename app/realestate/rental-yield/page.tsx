import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/realestate/rental-yield.json";

export const metadata: Metadata = {
  title: "임대수익률 계산기 — 2026년 기준",
  description: "매매가, 임대 보증금, 월세, 연간 비용을 입력하면 총수익률과 순수익률이 산출됩니다.",
  alternates: { canonical: "/realestate/rental-yield/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="표준 부동산 산식 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
