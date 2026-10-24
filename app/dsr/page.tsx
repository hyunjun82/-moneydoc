import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/loan/dsr-limit.json";

export const metadata: Metadata = {
  title: "DSR 계산기 (2026년 기준)",
  description:
    "연소득, 기존 대출 월 상환액, 대출 기간, 금리로 DSR 기준 최대 대출 한도를 계산해요. DSR 40%와 50% 중 고르고 스트레스 DSR 3단계 가산금리 1.5%p도 반영해요. 연소득 5,000만원, DSR 40%, 30년, 연 4%면 3단계 기준 293,536,331원이에요.",
  alternates: { canonical: "/dsr/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="은행업감독규정 §29의2 (DSR 산정) · 5케이스 검증"
    >
      <Client />
    </CalculatorShell>
  );
}
