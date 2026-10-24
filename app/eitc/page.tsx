import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/government/earned-income-tax-credit.json";

export const metadata: Metadata = {
  title: "근로장려금 모의계산 (2026년 기준)",
  description:
    "가구 유형과 연간 총소득으로 근로장려금 예상액을 계산해요. 총소득 기준은 단독 2,200만원, 홑벌이 3,200만원, 맞벌이 4,400만원 미만이에요. 최대 지급액은 단독 165만원, 홑벌이 285만원, 맞벌이 330만원이에요.",
  alternates: { canonical: "/eitc/" },
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
