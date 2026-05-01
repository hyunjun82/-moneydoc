import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const pretendard = localFont({
  src: "../public/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
  weight: "45 920",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://moneydoc.kr"),
  title: {
    default: "머니닥 — 금융 계산기 모음",
    template: "%s | 머니닥",
  },
  description: "한국 금융·세금·부동산·연금·법률 계산기 102종. 정부 공식 산식 기반.",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "머니닥",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body>{children}</body>
    </html>
  );
}
