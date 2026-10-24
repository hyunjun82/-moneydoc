import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/government/maternity-leave-pay.json";

export const metadata: Metadata = {
  title: "출산휴가 급여 계산기 (2026년 기준)",
  description:
    "월 통상임금과 다태아 여부, 우선지원대상기업 여부를 넣으면 출산전후휴가 90일(다태아 120일) 동안 고용보험과 회사에서 받는 금액을 계산해요. 2026년 고용보험 상한은 월 2,200,000원이고, 월 300만원이면 90일 합계 8,200,000원이에요. 다태아의 회사 부담분은 실제와 다를 수 있어요.",
  alternates: { canonical: "/maternity/" },
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
