import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "../Client";
import spec from "@/data/calculators/realestate/property-tax.json";

export const metadata: Metadata = {
  title: "재산세 계산기 (2026년 기준)",
  description:
    "지방세법 §111 주택 재산세 + 지방교육세 (1주택 9억 이하 특례 지원). 주택공시가격(매년 4월 발표) 입력 시 재산세 + 지방교육세 자동 계산. 1세대 1주택 + 시가표준 9억 이하면 특례옵션 켜기 (공정시장가액비율 43% + 특례세율 적용). 매년 6월 1일 기준.",
  alternates: { canonical: "/property-tax/calculator/" },
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
