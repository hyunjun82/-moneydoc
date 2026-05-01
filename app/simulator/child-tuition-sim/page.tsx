import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/simulator/child-tuition-sim.json";

export const metadata: Metadata = {
  title: "자녀 학자금 시뮬레이터 — 2026년 기준",
  description: "자녀 나이·현재 등록금·인플레이션·저축수익률 입력 시 월 저축 필요액 산출.",
  alternates: { canonical: "/simulator/child-tuition-sim/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="한국장학재단·통계청 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
