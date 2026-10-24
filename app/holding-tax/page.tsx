import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/realestate/holding-tax-total.json";

export const metadata: Metadata = {
  title: "보유세 통합 시뮬레이터 (2026년 기준)",
  description:
    "주택별 공시가격을 3채까지 넣으면 재산세와 지방교육세, 종합부동산세와 농어촌특별세를 더한 1년 보유세를 계산해요. 종합부동산세는 1세대 1주택 12억원, 그 외 9억원을 공제해요. 9억원 이하 1주택 재산세 특례세율은 반영하지 않아요.",
  alternates: { canonical: "/holding-tax/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="국세청·행정안전부 2026 · 검증 완료"
    >
      <Client />
    </CalculatorShell>
  );
}
