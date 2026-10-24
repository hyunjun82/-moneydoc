import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/realestate/jeonse-monthly-conversion.json";

export const metadata: Metadata = {
  title: "전월세 전환율 계산기 (2026년 기준)",
  description:
    "전세보증금을 월세로 바꿀 때 기존 보증금에서 남길 보증금을 뺀 금액에 전환율을 곱하고 12로 나눠 월세를 계산해요. 법정 전환율 상한은 연 10%와 기준금리에 2%p를 더한 비율 중 낮은 값으로, 2026년 8월 27일 기준 5.0%예요.",
  alternates: { canonical: "/jeonse-conversion/" },
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
