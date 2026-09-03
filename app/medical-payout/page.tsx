import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/insurance/medical-insurance-payout.json";

export const metadata: Metadata = {
  title: "실손보험 자기부담금 계산기 (2026년 기준)",
  description:
    "의료비 - 면책금 - 자기부담률 = 보험금. 병원 진료 시 받는 실손보험금 시뮬. 총 의료비·면책금·자기부담률 입력. 면책금은 가입 세대(1~4세대)별 다름. 영수증의 '본인부담금' 기준으로 입력. 진료 후 보험금 청구 전 미리 가늠용.",
  alternates: { canonical: "/medical-payout/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="금융감독원 2026 · 검증 완료"
    >
      <Client />
    </CalculatorShell>
  );
}
