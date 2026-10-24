import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/tax/gift-tax.json";

export const metadata: Metadata = {
  title: "증여세 계산기 (2026년 기준)",
  description:
    "증여재산과 받는 사람과의 관계로 증여세를 계산해요. 공제는 배우자 6억원, 성인 직계존비속 5,000만원, 미성년 2,000만원이고 10%에서 50% 누진세율을 적용해요. 신고세액공제 3%를 뺀 납부세액까지 보여 줘요.",
  alternates: { canonical: "/gift-tax/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="국세청 2026 · 검증 완료"
    >
      <Client />
    </CalculatorShell>
  );
}
