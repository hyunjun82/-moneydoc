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
    default: "MoneyDoc — 한국 금융·세금·부동산 계산기 102종",
    template: "%s | MoneyDoc",
  },
  description:
    "정부 공식 산식으로 검증된 연봉 실수령액·종합소득세·양도세·국민연금·실업급여 계산기 102종. 오차 없는 계산, 명확한 출처.",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "MoneyDoc",
  },
  alternates: {
    canonical: "/",
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
