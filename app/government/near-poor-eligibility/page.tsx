import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/government/near-poor-eligibility.json";

export const metadata: Metadata = {
  title: "차상위계층 자격 모의계산 (2026)",
  description:
    "중위소득 50% 이하 가구 판정, 2026 인상값 반영. 차상위계층 자격 모의계산. 기준중위소득 50% 이하 가구 판정. 가구원수·소득 입력 시 자격 즉시 확인. 차상위 자활근로·교육비·통신요금 감면 등 혜택.",
  alternates: { canonical: "/government/near-poor-eligibility/" },
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
