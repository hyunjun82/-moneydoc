import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/savings/free-savings.json";

export const metadata: Metadata = {
  title: "자유적금 계산기 (2026년 기준)",
  description:
    "월 평균 납입금, 납입 월수, 연이율로 자유적금 만기 수령액을 계산해요. 평균 금액을 매월 똑같이 넣었다고 보고 단리 이자에서 15.4%를 떼요. 월 100만원을 24개월, 연 3.5%로 넣으면 세후 24,740,250원이에요.",
  alternates: { canonical: "/free-savings/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="한국은행 표준 산식 · 5케이스 검증"
    >
      <Client />
    </CalculatorShell>
  );
}
