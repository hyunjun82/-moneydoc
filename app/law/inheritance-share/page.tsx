import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/law/inheritance-share.json";

export const metadata: Metadata = {
  title: "상속분 계산기 (2026년 기준)",
  description:
    "민법 §1009 배우자·자녀·부모 비율 분배. 법정상속분 계산. 배우자 1.5 + 자녀 각 1 (또는 부모 각 1). 자녀 2명+배우자 → 배우자 3/7, 자녀 각 2/7. 유언 우선, 유언 없으면 법정상속.",
  alternates: { canonical: "/law/inheritance-share/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="대법원 2026 · 검증 완료"
    >
      <Client />
    </CalculatorShell>
  );
}
