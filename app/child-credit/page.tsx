import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/tax/child-tax-credit.json";

export const metadata: Metadata = {
  title: "자녀세액공제 계산기 (2026년 기준)",
  description:
    "소득세법 §59의2 기본 자녀공제 + 출산·입양 추가공제. 만 9세 이상 20세 이하 자녀 수(2026년 귀속 기준, 2017년생 포함), 당해 출산·입양 자녀 수(첫째/둘째/셋째 이상 구분)를 입력하면 일반 자녀세액공제 + 출산·입양 세액공제 합계 자동 계산. 5월 종합소득세 또는.",
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
