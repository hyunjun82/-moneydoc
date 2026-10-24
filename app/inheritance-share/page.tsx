import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/law/inheritance-share.json";

export const metadata: Metadata = {
  title: "상속분 계산기 (2026년 기준)",
  description:
    "상속재산과 배우자, 자녀, 부모, 형제자매 수로 법정상속분을 계산해요. 배우자는 함께 상속하는 자녀나 부모 몫의 1.5배를 받아요. 10억원을 배우자와 자녀 2명이 나누면 배우자 428,571,429원, 자녀 각 285,714,286원이에요.",
  alternates: { canonical: "/inheritance-share/" },
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
