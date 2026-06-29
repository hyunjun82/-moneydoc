import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArticleBody } from "@/components/ArticleBody";
import { article } from "@/data/articles/government/unemployment-benefit";

const PAGE_URL = "https://moneydoc.kr/government/unemployment-benefit-guide/";

export const metadata: Metadata = {
  title: article.title,
  description: article.description,
  alternates: { canonical: "/government/unemployment-benefit-guide/" },
  openGraph: {
    type: "article",
    title: article.title,
    description: article.description,
    url: PAGE_URL,
  },
};

export default function Page() {
  return (
    <>
      <Header active="government" />
      <nav className="crumbs">
        <a href="/">홈</a>
        <span className="sep">›</span>
        <a href="/government/">정부지원금</a>
        <span className="sep">›</span>
        <span>실업급여 총정리</span>
      </nav>
      <ArticleBody article={article} url={PAGE_URL} />
      <Footer />
    </>
  );
}
