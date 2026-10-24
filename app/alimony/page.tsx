import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/law/divorce-alimony.json";

export const metadata: Metadata = {
  title: "이혼 위자료 산정기준표 (2026년 기준)",
  description:
    "결혼 기간과 상대방 유책 정도로 이혼 위자료를 추정해요. 결혼 기간으로 기본 금액을 정하고 유책 정도에 따라 0.5배에서 1.5배를 곱해요. 판례 통계를 바탕으로 한 참고값이고 실제 금액은 법원이 정해요.",
  alternates: { canonical: "/alimony/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="대법원·서울가정법원 2026 · 검증 완료"
    >
      <Client />
    </CalculatorShell>
  );
}
