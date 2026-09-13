import { Header } from "./Header";
import { Footer } from "./Footer";
import { HubSearch, type QuickLink } from "./HubSearch";
import type { HubData } from "@/data/hubs/types";
import "./topic-hub.css";

/* =========================================================================
   TopicHub — 주제 허브 원페이지 (/{주제}/)
   - 총정리 글이 아니라, 그 주제의 모든 글이 들어가는 메인 페이지.
   - 상단: 검색창 + 인기검색어 TOP10 + 바로가기 (건보공단 검색 화면 구조)
   - 하단: 계획서 묶음 그대로 글 전부. moneydoc-data/hubs/{주제}.ts (자동 생성) 를 그린다.
   - 계산기는 여기 박지 않는다. 계산기 페이지가 따로 있다.
   ========================================================================= */

type Source = { name: string; note: string };

type Props = {
  hub: HubData;
  quick: QuickLink[];
  sources: Source[];
  navActive: string;
};

export function TopicHub({ hub, quick, sources, navActive }: Props) {
  const url = `https://moneydoc.kr${hub.route}`;
  const items = hub.groups.flatMap((g) => g.spokes.map((s) => ({ ...s, group: g.name })));

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: hub.title,
    description: hub.description,
    url,
    inLanguage: "ko",
    publisher: { "@type": "Organization", name: "MoneyDoc", url: "https://moneydoc.kr/" },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.filter((s) => s.href !== hub.guide.href).length + 1,
      itemListElement: [hub.guide, ...items.filter((s) => s.href !== hub.guide.href)].map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: s.title,
        url: `https://moneydoc.kr${s.href}`,
      })),
    },
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: "https://moneydoc.kr/" },
      { "@type": "ListItem", position: 2, name: hub.keyword, item: url },
    ],
  };

  return (
    <>
      <Header active={navActive} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <nav className="crumbs">
        <a href="/">홈</a>
        <span className="sep">›</span>
        <span>{hub.keyword}</span>
      </nav>

      <main>
        <HubSearch
          h1={hub.h1}
          placeholder={`${hub.keyword}에 대해 무엇을 찾고 계시나요?`}
          items={items}
          popular={hub.popular}
          quick={quick}
        />

        {hub.groups.map((g) => (
          <section key={g.key} className="th-group" id={`g-${g.key}`}>
            <div className="th-group-head">
              <span className="th-key">{g.key}</span>
              <h2>{g.name}</h2>
              <span className="th-count">{g.spokes.length}편</span>
            </div>
            <p className="th-group-intro">{g.intro}</p>
            <div className="th-links">
              {g.spokes.map((s) => (
                <a key={s.href} href={s.href} className="th-link">
                  <span className="th-link-title">{s.title}</span>
                  <span className="th-link-desc">{s.description}</span>
                </a>
              ))}
            </div>
          </section>
        ))}

        <section className="th-source">
          <b>출처</b>
          <br />
          {sources.map((s) => (
            <span key={s.name}>
              {s.name} · {s.note}
              <br />
            </span>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
