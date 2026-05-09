import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "MoneyDoc 개인정보처리방침. 사용자 입력값은 브라우저에서만 처리되며 서버에 저장되지 않습니다.",
  alternates: { canonical: "/privacy/" },
};

export default function Page() {
  return (
    <>
      <Header />
      <header className="page-head">
        <h1 className="page-title">개인정보처리방침</h1>
        <p className="page-sub">마지막 업데이트: 2026년 5월 9일</p>
      </header>
      <section className="guide-section">
        <div className="guide-list" style={{ padding: "32px 36px" }}>
          <h2 style={{ fontSize: 18, marginTop: 0, color: "var(--text)" }}>1. 수집하는 개인정보</h2>
          <p style={{ color: "var(--text-2)", lineHeight: 1.75 }}>
            MoneyDoc은 회원가입·로그인 기능을 제공하지 않으며, 개인을 식별할 수 있는 정보(이름, 주민번호, 휴대전화번호, 이메일 등)를 직접 수집하지 않습니다.
            계산기에 입력한 연봉·금액 등의 데이터는 사용자의 브라우저(Client-side)에서만 처리되며, 외부 서버로 전송·저장되지 않습니다.
          </p>
          <h2 style={{ fontSize: 18, color: "var(--text)" }}>2. 자동 수집 정보</h2>
          <p style={{ color: "var(--text-2)", lineHeight: 1.75 }}>
            웹사이트 운영을 위해 다음 정보가 자동으로 수집될 수 있습니다.
          </p>
          <ul style={{ color: "var(--text-2)", lineHeight: 1.8 }}>
            <li>방문자의 IP 주소, 쿠키, 접속 시간, 사용 OS·브라우저</li>
            <li>방문한 페이지, 사이트 내 이동 경로</li>
          </ul>
          <p style={{ color: "var(--text-2)", lineHeight: 1.75 }}>
            이 정보는 Cloudflare Pages 호스팅 로그 및 Google Analytics(설치 시)를 통해 처리되며, 웹사이트 개선 목적으로만 사용됩니다.
          </p>
          <h2 style={{ fontSize: 18, color: "var(--text)" }}>3. 광고 및 쿠키</h2>
          <p style={{ color: "var(--text-2)", lineHeight: 1.75 }}>
            MoneyDoc은 향후 Google AdSense 등 제3자 광고 서비스를 도입할 예정이며, 이 경우 해당 서비스가 쿠키·광고 식별자를 통해 맞춤 광고를 제공할 수 있습니다.
            사용자는 브라우저 설정에서 쿠키 사용을 거부할 수 있으나, 일부 기능 이용에 제한이 있을 수 있습니다.
          </p>
          <h2 style={{ fontSize: 18, color: "var(--text)" }}>4. 정보주체의 권리</h2>
          <p style={{ color: "var(--text-2)", lineHeight: 1.75 }}>
            방문자는 언제든지 본인의 쿠키·광고 식별자를 삭제할 수 있으며, Google 광고 설정 페이지(adssettings.google.com)에서 맞춤 광고를 거부할 수 있습니다.
          </p>
          <h2 style={{ fontSize: 18, color: "var(--text)" }}>5. 개인정보 보호 책임자</h2>
          <p style={{ color: "var(--text-2)", lineHeight: 1.75 }}>
            문의사항은 <a href="/contact/" style={{ color: "var(--brand)" }}>문의 페이지</a>를 통해 접수해주세요.
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
