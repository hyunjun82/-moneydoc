import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/tax/four-major-insurance.json";

export const metadata: Metadata = {
  title: "4대보험료 계산기 (근로자 + 회사 통합) (2026년 기준)",
  description:
    "월급 기준 본인 부담 + 회사 부담 + 산재보험 동시 산출. 월 보수(세전) 입력 시 4대보험(국민연금·건강·장기요양·고용) 본인 + 회사 부담액 즉시 계산. 산재보험율은 업종에 따라 다름(평균 0.7%). 비과세(식대 20만 등) 제외 후 적용.",
  alternates: { canonical: "/tax/four-major-insurance/" },
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
