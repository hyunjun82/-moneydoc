import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/tax/four-major-insurance.json";

export const metadata: Metadata = {
  title: "4대보험료 계산기 (근로자 + 회사 통합) (2026년 기준)",
  description:
    "월 보수를 넣으면 국민연금, 건강보험, 장기요양, 고용보험의 본인 부담액과 회사 부담액, 산재보험료를 계산해요. 비과세액은 빼고 계산해요. 월 보수 300만원이면 본인 부담 291,520원, 산재 0.7% 업종의 회사 부담은 320,020원이에요.",
  alternates: { canonical: "/four-insurance/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="4대 사회보험 정보연계센터 2026 · 검증 완료"
    >
      <Client />
    </CalculatorShell>
  );
}
