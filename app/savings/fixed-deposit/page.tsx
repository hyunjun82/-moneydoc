import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/savings/fixed-deposit.json";

export const metadata: Metadata = {
  title: "정기예금 계산기 (2026년 기준)",
  description:
    "목돈을 한번에 맡길 때 만기 수령액. 단리 계산, 이자에서 세금 15.4% 자동 차감 (만 65세 이상 등 비과세 자격자는 0%). 정기예금 만기 수령액 계산. 원금·이자율(연)·기간(개월) 입력 시 단리 기준 만기액과 세후 수령액 자동 산출. 이자세 15.4%(소득세 14% +.",
  alternates: { canonical: "/savings/fixed-deposit/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="한국은행 표준 산식 · 5케이스 검증"
      description="목돈 일시 예치 시 만기 수령액 — 단리, 이자소득세 15.4% 자동 차감 (비과세 자격 시 0%)"
    >
      <Client />
    </CalculatorShell>
  );
}
