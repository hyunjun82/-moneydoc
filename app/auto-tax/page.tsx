import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { Client } from "./Client";
import spec from "@/data/calculators/insurance/auto-tax.json";

export const metadata: Metadata = {
  title: "자동차세 계산기 (정기) (2026년 기준)",
  description:
    "배기량, 등록 후 햇수, 영업용 여부로 1년 자동차세와 지방교육세를 계산해요. 차령 3년차부터 해마다 5%씩 최대 50%까지 줄어요. 1,999cc 비영업용 신차는 1년에 519,740원이에요.",
  alternates: { canonical: "/auto-tax/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="지방세법 제127조 · 8케이스 검증"
    >
      <Client />
    </CalculatorShell>
  );
}
