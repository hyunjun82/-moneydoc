import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/savings/youth-hope-deposit.json";

export const metadata: Metadata = {
  title: "청년희망적금 만기 시뮬레이터 — 2026년 기준",
  description: "월 납입금(10~50만)과 은행 이자율을 입력하면 2년 만기 수령액(이자 + 장려금) 산출.",
  alternates: { canonical: "/savings/youth-hope-deposit/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="서민금융진흥원 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
