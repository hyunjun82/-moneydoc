import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/tax/child-tax-credit.json";

export const metadata: Metadata = {
  title: "자녀세액공제 계산기 (2026년 기준)",
  description:
    "공제대상 자녀 수와 그해 출산·입양한 자녀 수로 자녀세액공제 합계를 계산해요. 자녀 1명 25만원, 2명 55만원, 3명 95만원이에요. 출산·입양한 해에는 첫째 30만원, 둘째 50만원, 셋째 이상 1명당 70만원을 더해요. 2026년 귀속은 9세 이상 자녀가 대상이에요.",
  alternates: { canonical: "/child-credit/" },
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
