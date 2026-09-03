import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/tax/freelancer-tax.json";

export const metadata: Metadata = {
  title: "프리랜서 3.3% 원천징수 계산기 (2026년 기준)",
  description:
    "사업소득 원천징수 3% + 지방세 0.3%. 프리랜서·작가·개인 강사가 받은 1회 지급액(세전)을 입력하면 소득세 3% + 지방소득세 0.3% = 합계 3.3% 차감 후 실수령액 계산. 매년 5월 종소세 신고로 정산.",
  alternates: { canonical: "/tax/freelancer-tax/" },
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
