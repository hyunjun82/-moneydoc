import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/savings/free-savings.json";

export const metadata: Metadata = {
  title: "자유적금 계산기 (2026년 기준)",
  description:
    "월 자유 납입 적금 만기 수령액. 평균 월납입 기준 단리 계산, 이자에서 세금 15.4% 자동 차감 (비과세 자격자는 0%). 매월 다른 금액 납입 가능한 자유적금 만기 계산. 월 평균 납입금·이자율·기간 입력 시 만기액 산출. 회당 한도 자유 (월 1만원~1천만원), 단리 기준.",
  alternates: { canonical: "/savings/free-savings/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="한국은행 표준 산식 · 5케이스 검증"
      description="월 자유 납입 적금 만기 수령액 — 평균 월납입 기준 단리, 이자세 15.4% (비과세 시 0%)"
    >
      <Client />
    </CalculatorShell>
  );
}
