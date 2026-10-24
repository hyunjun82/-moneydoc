import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/tax/daily-wage-tax.json";

export const metadata: Metadata = {
  title: "일용직 원천징수 계산기 (2026년 기준)",
  description:
    "일급과 근무 일수로 일용직 원천징수액과 실수령액을 계산해요. 일급에서 15만원을 빼고 세율 6%와 세액공제 55%를 적용하고, 소득세가 1,000원 미만이면 떼지 않아요. 일급 20만원이면 하루 1,485원을 떼요.",
  alternates: { canonical: "/daily-wage/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="국세청 2026 · 검증 완료"
    >
      <Client />
    </CalculatorShell>
  );
}
