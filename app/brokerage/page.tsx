import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/realestate/brokerage-fee.json";

export const metadata: Metadata = {
  title: "부동산 중개수수료 계산기 (2026년 기준)",
  description:
    "공인중개사법 시행규칙 표준 한도 적용. 공인중개사 법정 중개수수료 한도(공인중개사법 §32 + 시행령 §27의2). 거래 유형(매매/전세/월세) + 거래금액 입력 시 상한 자동 산출. 월세는 보증금 + 월세×100 환산금액 적용. 협상 가능 (보통 0.2~0.3% 수준).",
  alternates: { canonical: "/brokerage/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="국토교통부 2026 · 검증 완료"
    >
      <Client />
    </CalculatorShell>
  );
}
