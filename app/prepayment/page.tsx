import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/loan/prepayment-fee.json";

export const metadata: Metadata = {
  title: "중도상환수수료 계산기 (2026년 기준)",
  description:
    "갚는 금액에 중도상환수수료율과 적용 기간 중 남은 개월 비율을 곱해 중도상환수수료를 계산해요. 적용 기간은 보통 36개월이고 지나면 0원이에요. 은행 주담대 고정 평균 0.56%로 1억원을 1년 만에 갚으면 373,333원이에요.",
  alternates: { canonical: "/prepayment/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="은행업감독규정 중도상환수수료 가이드 · 5케이스 검증"
    >
      <Client />
    </CalculatorShell>
  );
}
