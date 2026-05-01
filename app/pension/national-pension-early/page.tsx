import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/pension/national-pension-early.json";

export const metadata: Metadata = {
  title: "국민연금 조기수령 감액 계산기 — 2026년 기준",
  description: "정상수령 연금액과 조기수령 시작 연령 입력 시 감액된 수령액 산출.",
  alternates: { canonical: "/pension/national-pension-early/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="국민연금공단 2026 · 검증 완료"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
