import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/realestate/property-tax.json";

export const metadata: Metadata = {
  title: "재산세 계산기 (2026년 기준)",
  description:
    "주택 공시가격을 넣으면 재산세와 재산세의 20%인 지방교육세를 계산해요. 1세대 1주택을 켜면 공정시장가액비율 43~45%를, 공시가격 9억원 이하면 특례세율까지 적용해요. 주택분은 6월 1일 현재 소유자가 7월과 9월에 절반씩 내고, 20만원 이하면 조례에 따라 7월에 한 번에 고지될 수 있어요.",
  alternates: { canonical: "/property-tax/" },
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
