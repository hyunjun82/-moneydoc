import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/tax/crypto-transfer-tax.json";

export const metadata: Metadata = {
  title: "가상화폐 양도세 계산기 (2026년 기준)",
  description:
    "2027년 1월 1일 양도분부터 과세 (현재 시행 유예) · 연 250만 공제 + 22% 분리과세. 가상자산(비트코인·이더리움 등) 1년 양도차익 입력 시 250만 기본공제 후 22% 분리과세 (소득세 20% + 지방세 2%) 자동 산출. 2027년 1월 1일 시행 (현재 시행.",
  alternates: { canonical: "/crypto-tax/" },
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
