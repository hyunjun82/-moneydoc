import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/law/child-support.json";

export const metadata: Metadata = {
  title: "양육비 계산기 (2026년 기준)",
  description:
    "부모 합산 월소득과 자녀 나이로 서울가정법원 양육비 산정기준표의 표준 양육비를 찾아요. 비양육친 소득이 합산 소득에서 차지하는 비율만큼 분담액을 계산해요. 자녀 수에 따른 조정은 들어 있지 않아요.",
  alternates: { canonical: "/child-support/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="서울가정법원 2026 · 검증 완료"
    >
      <Client />
    </CalculatorShell>
  );
}
