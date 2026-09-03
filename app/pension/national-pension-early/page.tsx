import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/pension/national-pension-early.json";

export const metadata: Metadata = {
  title: "국민연금 조기수령 감액 계산기 (2026년 기준)",
  description:
    "60~64세 조기수령 시 1년당 6% 감액. 국민연금 조기수령 시 감액액 계산. 60~64세 사이 수령 시작하면 1년당 6% 감액 (최대 30%). 정상 수령액과 조기 수령액 비교, 평생 손익 분석 가능.",
  alternates: { canonical: "/pension/national-pension-early/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="국민연금공단 2026 · 검증 완료"
    >
      <Client />
    </CalculatorShell>
  );
}
