import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "../Client";
import spec from "@/data/calculators/realestate/acquisition-tax.json";

export const metadata: Metadata = {
  title: "취득세 계산기 (2026년 기준)",
  description:
    "매매가, 취득 후 보유 주택 수, 조정대상지역 여부, 전용면적으로 주택 취득세와 지방교육세, 농어촌특별세를 계산해요. 1주택은 1%에서 3%, 다주택 중과는 8%나 12%예요. 전용 85㎡ 이하 5억원 1주택이면 총 5,500,000원이에요.",
  alternates: { canonical: "/acquisition-tax/calculator/" },
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
