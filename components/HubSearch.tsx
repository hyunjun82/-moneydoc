"use client";
import { useMemo, useState } from "react";

/* 허브 상단 검색. 62편 제목·설명을 브라우저에서 바로 거른다. 서버 없음.
   비어 있으면 인기검색어 TOP10 + 바로가기, 입력하면 맞는 글 목록으로 바뀐다. */

export type SearchItem = { href: string; title: string; description: string; group: string };
export type PopularItem = { term: string; href: string };
export type QuickLink = { label: string; href: string; note?: string };

const norm = (s: string) => s.toLowerCase().replace(/\s+/g, "");

export function HubSearch({
  h1,
  placeholder,
  items,
  popular,
  quick,
}: {
  h1: string;
  placeholder: string;
  items: SearchItem[];
  popular: PopularItem[];
  quick: QuickLink[];
}) {
  const [q, setQ] = useState("");
  const hits = useMemo(() => {
    const n = norm(q);
    if (n.length < 1) return [];
    const words = n.split(/[,·]/).filter(Boolean);
    return items
      .map((it) => {
        const t = norm(it.title);
        const d = norm(it.description);
        let score = 0;
        for (const w of words) {
          if (t.includes(w)) score += 3;
          else if (d.includes(w)) score += 1;
        }
        return { it, score };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map((x) => x.it);
  }, [q, items]);

  const searching = q.trim().length > 0;

  return (
    <section className="hs">
      <h1 className="hs-h1">{h1}</h1>
      <form
        className="hs-form"
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          if (hits[0]) window.location.href = hits[0].href;
        }}
      >
        <input
          className="hs-input"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
          autoComplete="off"
        />
        <button type="submit" className="hs-btn" aria-label="검색">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
        </button>
      </form>

      <hr className="hs-rule" />

      {searching ? (
        <div className="hs-results">
          <h2 className="hs-col-title">
            검색 결과 <small>{hits.length}건</small>
          </h2>
          {hits.length === 0 ? (
            <p className="hs-empty">맞는 글이 없어요. 아래 묶음에서 찾아보세요.</p>
          ) : (
            <ol className="hs-list">
              {hits.map((it, i) => (
                <li key={it.href}>
                  <a href={it.href}>
                    <span className="hs-num">{i + 1}</span>
                    <span className="hs-term">{it.title}</span>
                    <span className="hs-side">{it.group}</span>
                  </a>
                </li>
              ))}
            </ol>
          )}
        </div>
      ) : (
        <div className="hs-cols">
          <div className="hs-col">
            <h2 className="hs-col-title">인기검색어</h2>
            <ol className="hs-list">
              {popular.map((p, i) => (
                <li key={p.term}>
                  <a href={p.href}>
                    <span className="hs-num">{i + 1}</span>
                    <span className="hs-term">{p.term}</span>
                    <span className="hs-side">›</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
          <div className="hs-col">
            <h2 className="hs-col-title">바로가기</h2>
            <ul className="hs-list hs-quick">
              {quick.map((k) => (
                <li key={k.href}>
                  <a href={k.href}>
                    <span className="hs-term">{k.label}</span>
                    {k.note ? <span className="hs-side">{k.note}</span> : null}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
