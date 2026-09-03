import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "../Client";
import spec from "@/data/calculators/insurance/auto-tax.json";

export const metadata: Metadata = {
  title: "자동차세 계산기 (정기) (2026년 기준)",
  description:
    "지방세법 §127 + 연식별 경감 (3년 이상). 차량 배기량(cc)·연식·영업용 여부 입력 시 자동차세 + 지방교육세 자동 산출. 매년 6월·12월 절반씩 분납. 1월에 1년 일시납 시 10% 할인. 위택스에서 직접 납부 가능.",
  alternates: { canonical: "/auto-tax/calculator/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="행정안전부 2026 · 검증 완료"
    >
      <Client />
    </CalculatorShell>
  );
}
