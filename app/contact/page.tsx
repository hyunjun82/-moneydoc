import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "문의하기",
  description: "MoneyDoc 운영팀 문의. 산식 오류 제보·개선 의견 환영.",
  alternates: { canonical: "/contact/" },
};

export default function Page() {
  return (
    <>
      <Header />
      <header className="page-head">
        <h1 className="page-title">문의하기</h1>
        <p className="page-sub">산식 오류 제보·개선 의견·제휴 문의 환영합니다.</p>
      </header>
      <section className="guide-section">
        <div className="guide-list" style={{ padding: "32px 36px", color: "var(--text-2)", lineHeight: 1.75 }}>
          <h2 style={{ fontSize: 18, color: "var(--text)", marginTop: 0 }}>어떤 제보를 기다리나요?</h2>
          <p>
            계산기 결과가 정부 사이트나 고지서와 다르게 나왔다는 제보가 가장 반가워요. 세율이나 공제액이
            법 개정으로 바뀌었는데 아직 반영되지 않은 경우, 가이드 글의 설명이 틀렸거나 오래된 경우도 알려 주세요.
            새로 만들면 좋을 계산기나 글 주제 제안도 환영해요. 보내 주신 내용은 운영자 한결이 직접 읽고
            법령 원문과 대조한 뒤 고쳐요. 수정한 내용은 해당 계산기의 근거 항목에 남겨요.
          </p>
          <h2 style={{ fontSize: 18, color: "var(--text)" }}>이메일</h2>
          <p>
            <a href="mailto:contact@moneydoc.kr" style={{ color: "var(--brand)", fontWeight: 600 }}>contact@moneydoc.kr</a>
          </p>
          <h2 style={{ fontSize: 18, color: "var(--text)" }}>제보 시 함께 보내주시면 도움됩니다</h2>
          <ul style={{ lineHeight: 1.8 }}>
            <li>해당 계산기 페이지 URL</li>
            <li>입력값과 우리 결과</li>
            <li>비교한 정부 사이트 URL과 결과 (있다면)</li>
            <li>차이가 발생한 항목 (예: 소득세, 4대보험 등)</li>
          </ul>
          <h2 style={{ fontSize: 18, color: "var(--text)" }}>응답 시간</h2>
          <p>영업일 기준 1~3일 이내 회신드립니다.</p>
        </div>
      </section>
      <Footer />
    </>
  );
}
