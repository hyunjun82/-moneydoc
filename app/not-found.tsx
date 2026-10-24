import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없어요",
  description: "요청한 주소에 해당하는 페이지가 없어요. 계산기 목록이나 홈에서 다시 찾아보세요.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <header className="page-head">
        <h1 className="page-title">페이지를 찾을 수 없어요</h1>
        <p className="page-sub">주소가 바뀌었거나 삭제된 페이지예요.</p>
      </header>
      <section className="guide-section">
        <div className="guide-list" style={{ padding: "32px 36px", color: "var(--text-2)", lineHeight: 1.75 }}>
          <p>찾으시는 계산기는 아래에서 다시 고르실 수 있어요.</p>
          <ul style={{ lineHeight: 1.8 }}>
            <li><a href="/calculators/" style={{ color: "var(--brand)", fontWeight: 600 }}>전체 계산기 목록</a></li>
            <li><a href="/" style={{ color: "var(--brand)", fontWeight: 600 }}>홈으로 가기</a></li>
            <li><a href="/contact/" style={{ color: "var(--brand)", fontWeight: 600 }}>깨진 링크 제보하기</a></li>
          </ul>
        </div>
      </section>
      <Footer />
    </>
  );
}
