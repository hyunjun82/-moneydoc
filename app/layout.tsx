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
  verification: {
    google: "qa5MxoeesZJO5rfcOhS8Qjfq9VOk4gU7lo_Y7uxuGLk",
    other: {
      "naver-site-verification": "cd862e67bcc5f9630e53977d9da278a2959d24e6",
    },
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "MoneyDoc",
  alternateName: "머니닥",
  url: "https://moneydoc.kr",
  description: "정부 공식 산식으로 검증된 한국 금융·세금·부동산·연금·법률 계산기 102종",
  inLanguage: "ko",
  publisher: {
    "@type": "Organization",
    name: "MoneyDoc",
    url: "https://moneydoc.kr",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2442517902625121"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
