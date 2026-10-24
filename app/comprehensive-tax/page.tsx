import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/realestate/comprehensive-real-estate-tax.json";

export const metadata: Metadata = {
  title: "종합부동산세 계산기 (2026년 기준)",
  description:
    "주택별 공시가격을 3채까지 넣으면 종합부동산세와 농어촌특별세를 계산해요. 1세대 1주택은 12억원, 그 외는 9억원을 공제하고 공정시장가액비율 60%를 곱해요. 1주택자 고령자·장기보유 세액공제는 합계 80%까지 반영해요.",
  alternates: { canonical: "/comprehensive-tax/" },
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
