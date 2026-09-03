import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "@/data/calculators/realestate/transfer-tax.json";

export const metadata: Metadata = {
  title: "양도소득세 계산기 (통합) (2026년 기준)",
  description:
    "1세대 1주택 / 다주택자 / 조정대상지역 다주택 모두. 한 화면. 주택 매도 시 양도소득세 계산. 양도가·취득가·보유연수·거주연수 입력. 1세대1주택은 12억 이하 비과세 + 거주 2년 + 보유 2년 요건. 다주택자는 양도차익 누진세율, 조정대상지역 다주택은 +20~30%p 가산세.",
  alternates: { canonical: "/realestate/transfer-tax/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="국세청·소득세법 §89·§95·§104 · 17 case 검증"
      description="1세대 1주택 / 다주택자 / 조정대상지역 다주택 — 양도 상황별 토글 한 화면"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
