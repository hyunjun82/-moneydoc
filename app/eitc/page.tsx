import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/government/earned-income-tax-credit.json";

export const metadata: Metadata = {
  title: "근로장려금 모의계산 (2026년 기준)",
  description:
    "단독 2,200만/외벌이 3,200만/맞벌이 4,400만 한도. 근로장려금 모의계산. 가구유형(단독·홑벌이·맞벌이)·총소득 입력 시 정부 점증·평탄·점감 3단계 산식으로 예상 지급액 산출. 단독 최대 165만/홑벌이 285만/맞벌이 330만.",
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
