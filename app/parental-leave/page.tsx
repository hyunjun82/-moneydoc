import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/government/parental-leave-pay.json";

export const metadata: Metadata = {
  title: "육아휴직 급여 계산기 (2026년 기준)",
  description:
    "월 통상임금과 휴직 개월 수로 2026년 육아휴직급여를 계산해요. 처음 3개월은 월 최대 2,500,000원, 4~6개월은 2,000,000원, 7개월째부터는 통상임금 80%에 최대 1,600,000원이에요. 월 300만원이면 12개월 23,100,000원이에요.",
  alternates: { canonical: "/parental-leave/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="고용노동부 2026 · 검증 완료"
    >
      <Client />
    </CalculatorShell>
  );
}
