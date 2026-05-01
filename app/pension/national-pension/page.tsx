import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/pension/national-pension.json";

export const metadata: Metadata = {
  title: "국민연금 예상수령액 계산기 — 2026년 기준",
  description: "국민연금에 가입한 총 월수와 평생 평균 보수월액을 입력하면 노령연금 예상 수령액이 산출됩니다. 가입 20년이 만점 기준이고, 그 이상은 매년 5% 가산됩니다.",
  alternates: { canonical: "/pension/national-pension/" },
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
