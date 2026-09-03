import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/government/parental-leave-pay.json";

export const metadata: Metadata = {
  title: "육아휴직 급여 계산기 (2026년 기준)",
  description:
    "1~3개월 100%(250만) / 4~6개월 100%(200만) / 7~12+개월 80%(160만). 통상임금(월)과 휴직 개월수를 입력하면 육아휴직 급여 총액이 산출됩니다. 1~3개월 100%(상한 250만), 4~6개월 100%(상한 200만), 7~12+개월 80%(상한.",
  alternates: { canonical: "/government/parental-leave-pay/" },
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
