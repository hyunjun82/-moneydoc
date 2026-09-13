import type { Metadata } from "next";
import { TopicHub } from "@/components/TopicHub";
import { HUB } from "@/data/hubs/unemployment";
import spec from "@/data/calculators/government/unemployment-benefit.json";

// 실업급여 허브 원페이지. 총정리 글은 /unemployment/guide/, 계산기는 /unemployment/calculator/ 에 있다.
const PAGE_URL = "https://moneydoc.kr/unemployment/";

export const metadata: Metadata = {
  title: HUB.title,
  description: HUB.description,
  alternates: { canonical: "/unemployment/" },
  robots: { index: true, follow: true, "max-image-preview": "large" },
  openGraph: { type: "website", title: HUB.title, description: HUB.description, url: PAGE_URL },
};

const won = (n: number) => n.toLocaleString("ko-KR");
const c = spec.constants;

export default function Page() {
  return (
    <TopicHub
      hub={HUB}
      navActive="gov"
      quick={[
        { label: "실업급여 계산기", href: HUB.calculator.route, note: "하루 금액·총액" },
        { label: "2026년 실업급여 총정리", href: HUB.guide.href, note: "처음이면 이 글부터" },
        { label: "2026년 실업급여 개편", href: "/unemployment/changes-2026/", note: "하한액·반복수급" },
        { label: "실업급여 신청 방법", href: "/unemployment/apply/", note: "서류부터 실업인정까지" },
      ]}
      sources={[
        { name: "고용보험법 §40·§46·§50", note: "수급요건 · 구직급여일액 · 소정급여일수" },
        { name: "고용노동부 고시", note: `2026년 상한액 ${won(c.DAILY_UPPER_LIMIT)}원 · 하한액 ${won(c.DAILY_LOWER_LIMIT)}원` },
        { name: "고용24 실업급여 모의계산", note: `계산기 대조 · ${spec.lastVerified} 검증` },
        { name: "네이버 지식iN 실업급여 질문 702건", note: "인기검색어 순위 근거 · 2026-09-05 수집" },
      ]}
    />
  );
}
