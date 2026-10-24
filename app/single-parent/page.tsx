import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/government/single-parent-support.json";

export const metadata: Metadata = {
  title: "한부모가족 자녀양육비 계산기 (2026년 기준)",
  description:
    "중위소득 비율과 자녀 나이를 넣으면 한부모가족 아동양육비 대상 여부와 지원액을 계산해요. 18세 미만 자녀 1명당 월 230,000원, 1년이면 2,760,000원이에요. 소득 기준 비율은 여성가족부 안내를 확인하세요.",
  alternates: { canonical: "/single-parent/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="여성가족부 2026 · 검증 완료"
    >
      <Client />
    </CalculatorShell>
  );
}
