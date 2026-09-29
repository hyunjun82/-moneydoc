import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/pension/noranumbrella-tax-saving.json";

export const metadata: Metadata = {
  title: "노란우산공제 절세 계산기 (2026년 기준)",
  description:
    "노란우산공제 연 납입액과 사업소득금액을 넣으면 소득공제 한도(4천만원 이하 600만원, 6천만원 이하 500만원, 1억원 이하 400만원, 초과 200만원)와 줄어드는 소득세를 어림해요. 사업소득금액을 과세표준 구간으로 본 어림값이에요.",
  alternates: { canonical: "/noranumbrella/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="조세특례제한법 제86조의3 · 5케이스 검증"
    >
      <Client />
    </CalculatorShell>
  );
}
