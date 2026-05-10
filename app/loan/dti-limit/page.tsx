import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/loan/dti-limit.json";

export const metadata: Metadata = {
  title: "DTI 계산기 — 2026 정확 검증 | MoneyDoc",
  description: "총부채상환비율 기준 신규 주담대 한도",
  alternates: { canonical: "/loan/dti-limit/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="주담대 DTI 산정 기준 · 5케이스 검증"
      description="총부채상환비율 기준 신규 주담대 한도"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
