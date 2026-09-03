import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/realestate/jeonse-monthly-conversion.json";

export const metadata: Metadata = {
  title: "전월세 전환율 계산기 (2026년 기준)",
  description:
    "주택임대차보호법 §7-2 전세 → 월세 전환. 전세 → 보증부 월세 전환 시 월세 계산. 기존 전세 보증금에서 월세 전환 후 새 보증금을 빼고, 차액 × 전환율 (법정 상한 5.0% = 기준금리 3.0% + 2%p, 2026.8.27 기준) ÷ 12 = 월세. 임대인·임차인 협상 시.",
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
