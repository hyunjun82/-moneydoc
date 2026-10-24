import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/government/near-poor-eligibility.json";

export const metadata: Metadata = {
  title: "차상위계층 자격 모의계산 (2026)",
  description:
    "가구원 수와 월 소득인정액을 넣으면 2026년 기준 중위소득 50%와 비교해 차상위계층 해당 여부와 내 소득 비율을 알려줘요. 기준은 1인 가구 월 1,282,119원, 4인 가구 월 3,247,369원이에요.",
  alternates: { canonical: "/near-poor/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="보건복지부 2026 · 검증 완료"
    >
      <Client />
    </CalculatorShell>
  );
}
