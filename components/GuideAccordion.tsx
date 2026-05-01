import type { ReactNode } from "react";
import { GUIDE_TABLE_TITLES } from "@/lib/calculators-index";

type GuideShape = {
  howToUse?: string;
  calculationOrder?: string[];
  tables?: Record<string, Array<Record<string, string | number>>>;
  faq?: { q: string; a: string }[];
  tips?: string[];
};

const ChevronDown = () => (
  <svg className="arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export function GuideAccordion({
  guide,
  title,
  sub,
}: {
  guide?: GuideShape;
  title?: string;
  sub?: string;
}) {
  if (!guide) return null;

  const sections: { num: string; title: string; content: ReactNode }[] = [];
  let n = 0;
  const next = () => String(++n).padStart(2, "0");

  if (guide.howToUse) {
    sections.push({
      num: next(),
      title: "이 계산기는 어떻게 쓰나요?",
      content: <p>{guide.howToUse}</p>,
    });
  }

  if (guide.calculationOrder?.length) {
    sections.push({
      num: next(),
      title: "계산이 이렇게 진행됩니다",
      content: (
        <>
          <p>결과는 다음 순서로 산출됩니다.</p>
          <div className="formula">
            {guide.calculationOrder.map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </div>
        </>
      ),
    });
  }

  if (guide.tables) {
    for (const [key, rows] of Object.entries(guide.tables)) {
      if (!Array.isArray(rows) || rows.length === 0) continue;
      const headers = Object.keys(rows[0]);
      sections.push({
        num: next(),
        title: GUIDE_TABLE_TITLES[key] ?? key,
        content: (
          <table>
            <thead>
              <tr>
                {headers.map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  {headers.map((h) => (
                    <td key={h}>{String(row[h] ?? "")}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ),
      });
    }
  }

  if (guide.faq?.length) {
    sections.push({
      num: next(),
      title: "자주 묻는 질문",
      content: (
        <>
          {guide.faq.map((qa, i) => (
            <div key={i}>
              <p>
                <strong>Q. {qa.q}</strong>
              </p>
              <p>{qa.a}</p>
            </div>
          ))}
        </>
      ),
    });
  }

  if (guide.tips?.length) {
    sections.push({
      num: next(),
      title: "활용 팁",
      content: (
        <ul>
          {guide.tips.map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>
      ),
    });
  }

  if (sections.length === 0) return null;

  return (
    <section className="guide-section">
      <div className="guide-head">
        <h2 className="guide-title">{title ?? "이 계산기, 자세히 알아보기"}</h2>
        {sub && <p className="guide-sub">{sub}</p>}
      </div>
      <div className="guide-list">
        {sections.map((s, i) => (
          <details key={s.num} open={i === 0}>
            <summary>
              <span>
                <span className="num">{s.num}</span>
                {s.title}
              </span>
              <ChevronDown />
            </summary>
            <div className="detail-content">{s.content}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
