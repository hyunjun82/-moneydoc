import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/tax/inheritance-tax.json";

export const metadata: Metadata = {
  title: "상속세 계산기 (2026년 기준)",
  description:
    "상속세 및 증여세법 §26 누진세율 + max(일괄 5억, 기초 2억 + 인적공제). 상속재산 총액(부동산+예금+주식 등 시가) + 배우자/자녀 수 입력. 일괄공제 5억 또는 인적공제(2억+자녀5천만/명) 중 큰 것 + 배우자공제(법정상속분 5억~30억) 자동 계산. 사망일부터 6개월.",
  alternates: { canonical: "/inheritance-tax/" },
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
