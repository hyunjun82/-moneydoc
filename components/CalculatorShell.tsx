import { Header } from "./Header";
import { Footer } from "./Footer";
import { GuideAccordion } from "./GuideAccordion";
import { SourceBox } from "./SourceBox";
import { RelatedCards } from "./RelatedCards";
import { CATEGORIES, type CategorySlug } from "@/lib/calculators-index";

type CalcSpec = {
  category: string;
  slug: string;
  title: string;
  subtitle: string;
  source: any;
  guide?: any;
  related?: string[];
};

export function CalculatorShell({
  spec,
  sourceBadge,
  description,
  guideTitle,
  children,
}: {
  spec: CalcSpec;
  sourceBadge: string;
  description?: string;
  guideTitle?: string;
  children: React.ReactNode;
}) {
  const cat = CATEGORIES[spec.category as CategorySlug];
  const breadcrumbLabel = spec.title.replace(/\s*계산기$/, "");

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: "https://moneydoc.kr/" },
      ...(cat
        ? [
            {
              "@type": "ListItem",
              position: 2,
              name: cat.name,
              item: `https://moneydoc.kr${cat.href}`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: spec.title,
              item: `https://moneydoc.kr/${spec.category}/${spec.slug}/`,
            },
          ]
        : []),
    ],
  };

  const faqs: { q: string; a: string }[] = spec.guide?.faq ?? [];
  const faqJsonLd =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((qa) => ({
            "@type": "Question",
            name: qa.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: qa.a,
            },
          })),
        }
      : null;

  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: spec.title,
    description: description ?? spec.subtitle,
    url: `https://moneydoc.kr/${spec.category}/${spec.slug}/`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    inLanguage: "ko",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: 0, priceCurrency: "KRW" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <Header active={spec.category} />

      <nav className="crumbs">
        <a href="/">홈</a>
        <span className="sep">›</span>
        {cat && (
          <>
            <a href={cat.href}>{cat.name}</a>
            <span className="sep">›</span>
          </>
        )}
        <span>{breadcrumbLabel}</span>
      </nav>

      <header className="page-head">
        <span className="source-badge">
          <span className="dot" />
          {sourceBadge}
        </span>
        <h1 className="page-title">{spec.title}</h1>
        <p className="page-sub">{description ?? spec.subtitle}</p>
      </header>

      {children}

      <GuideAccordion guide={spec.guide} title={guideTitle} />
      <SourceBox source={spec.source} />
      {spec.related && spec.related.length > 0 && <RelatedCards related={spec.related} />}

      <Footer />
    </>
  );
}
