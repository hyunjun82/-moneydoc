import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/law/divorce-alimony.json";

export const metadata: Metadata = {
  title: "이혼 위자료 산정기준표 (2026년 기준)",
  description:
    "[참고용 추정] 판례 통계 기반, 실제 위자료는 법원 재량. 이혼 위자료 산정. 혼인기간·과실 정도(낮음/보통/높음)·재산상태 입력. 2025년 평균 위자료 3,000만 (혼인 10년+ 외도·폭력)~1억 사이.",
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
