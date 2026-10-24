import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "../Client";
import spec from "@/data/calculators/realestate/transfer-tax.json";

export const metadata: Metadata = {
  title: "양도소득세 계산기 (통합) (2026년 기준)",
  description:
    "1세대 1주택, 다주택자, 조정대상지역 다주택 중 양도 상황을 고르고 양도가액, 취득가액, 보유·거주연수를 넣으면 양도소득세와 지방소득세를 계산해요. 1세대 1주택은 보유 2년 이상이고 양도가액 12억원 이하면 비과세이고, 취득 당시 조정대상지역이면 거주 2년도 필요해요.",
  alternates: { canonical: "/transfer-tax/calculator/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="국세청·소득세법 §89·§95·§104 · 17 case 검증"
    >
      <Client />
    </CalculatorShell>
  );
}
