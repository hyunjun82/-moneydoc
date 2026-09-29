import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/insurance/auto-tax.json";

export const metadata: Metadata = {
  title: "자동차세 계산기 (정기) (2026년 기준)",
  description:
    "배기량(cc)·등록 후 햇수·영업용 여부로 자동차세와 지방교육세(비영업용 승용만 30%)를 계산해요. 차령 3년차부터 5%씩 최대 50% 경감, 6월·12월 절반씩 납부, 1월 연납 시 남은 기간 세액의 5% 공제. 지방세법 제127조 기준 8케이스 검증.",
  alternates: { canonical: "/auto-tax/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="지방세법 제127조 · 8케이스 검증"
    >
      <Client />
    </CalculatorShell>
  );
}
