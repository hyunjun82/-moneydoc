import type { Metadata } from "next";
import { TopicHub } from "@/components/TopicHub";
import { HUB } from "@/data/hubs/severance";
import spec from "@/data/calculators/law/severance-pay.json";

// 퇴직금 허브 원페이지. 총정리 글은 /severance/guide/, 계산기는 /severance/calculator/ 에 있다.
const PAGE_URL = "https://moneydoc.kr/severance/";

export const metadata: Metadata = {
  title: HUB.title,
  description: HUB.description,
  alternates: { canonical: "/severance/" },
  robots: { index: true, follow: true, "max-image-preview": "large" },
  openGraph: { type: "website", title: HUB.title, description: HUB.description, url: PAGE_URL },
};

export default function Page() {
  return (
    <TopicHub
      hub={HUB}
      navActive="law"
      quick={[
        { label: "퇴직금 계산기", href: HUB.calculator.route, note: "입사일·퇴사일·월급" },
        { label: "퇴직금 계산 방법과 지급기준", href: HUB.guide.href, note: "처음이면 이 글부터" },
        { label: "퇴직소득세 계산기", href: "/retirement-tax/", note: "세전·세후" },
        { label: "연차수당", href: "/annual-leave/", note: "평균임금에 들어가요" },
      ]}
      sources={[
        { name: "근로자퇴직급여보장법 §8 · 근로기준법 §2①6 · 같은 법 시행령 §2", note: "퇴직금제도 · 평균임금 정의와 산정" },
        { name: "고용노동부 퇴직금 계산기", note: `계산기 대조 · ${spec.lastVerified} 검증` },
        { name: "구글 연관검색어", note: "인기검색어 근거 · 2026-09-01 수집" },
      ]}
    />
  );
}
