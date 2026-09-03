import type { ReactNode } from "react";
import { GUIDE_TABLE_TITLES } from "@/lib/calculators-index";

// === 다양한 섹션 타입 ===
type SectionTable = { type: "table"; title: string; rows: Array<Record<string, string | number>>; note?: string };
type SectionTips = { type: "tips"; title: string; items: string[]; icon?: string };
type SectionFAQ = { type: "faq"; title: string; items: { q: string; a: string }[] };
type SectionPersonaCards = { type: "persona-cards"; title: string; cards: { persona: string; situation: string; result: string; tags?: string[] }[] };
type SectionTimeline = { type: "timeline"; title: string; events: { time: string; title: string; detail?: string; amount?: string }[] };
type SectionChecklist = { type: "checklist"; title: string; items: { label: string; sub?: string; required?: boolean }[] };
type SectionScenario = { type: "scenario"; title: string; cases: { label: string; condition: string; result: string; highlight?: boolean }[] };
type SectionComparison = { type: "comparison"; title: string; left: { label: string; points: string[] }; right: { label: string; points: string[] }; verdict?: string };
type SectionCalendar = { type: "calendar"; title: string; months: { month: string; action: string }[] };
type SectionSteps = { type: "steps"; title: string; steps: { step: string; detail: string }[] };
type SectionCallout = { type: "callout"; title: string; variant?: "warning" | "tip" | "info"; items: string[] };
type SectionStat = { type: "stat"; title: string; stats: { label: string; value: string; sub?: string }[] };
type SectionText = { type: "text"; title: string; body: string };

type GuideSection =
  | SectionTable
  | SectionTips
  | SectionFAQ
  | SectionPersonaCards
  | SectionTimeline
  | SectionChecklist
  | SectionScenario
  | SectionComparison
  | SectionCalendar
  | SectionSteps
  | SectionCallout
  | SectionStat
  | SectionText;

type GuideShape = {
  howToUse?: string;
  calculationOrder?: string[];
  // 기존 호환
  tables?: Record<string, Array<Record<string, string | number>>>;
  faq?: { q: string; a: string }[];
  tips?: string[];
  // 신규: per-calculator 자유로운 섹션 구성
  sections?: GuideSection[];
};

const ChevronDown = () => (
  <svg className="arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

function renderTable(rows: Array<Record<string, string | number>>): ReactNode {
  if (!Array.isArray(rows) || rows.length === 0) return null;
  const headers = Object.keys(rows[0]);
  return (
    <table>
      <thead>
        <tr>{headers.map((h) => <th key={h}>{h}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>{headers.map((h) => <td key={h}>{String(row[h] ?? "")}</td>)}</tr>
        ))}
      </tbody>
    </table>
  );
}

function renderSection(s: GuideSection): ReactNode {
  switch (s.type) {
    case "table":
      return (
        <>
          {renderTable(s.rows)}
          {s.note && <p className="guide-note">{s.note}</p>}
        </>
      );
    case "tips":
      return (
        <ul className="guide-tips">
          {s.items.map((t, i) => <li key={i}>{t}</li>)}
        </ul>
      );
    case "faq":
      return (
        <>
          {s.items.map((qa, i) => (
            <div key={i} className="guide-qa">
              <p><strong>Q. {qa.q}</strong></p>
              <p>{qa.a}</p>
            </div>
          ))}
        </>
      );
    case "persona-cards":
      return (
        <div className="persona-grid">
          {s.cards.map((c, i) => (
            <div key={i} className="persona-card">
              <div className="persona-name">{c.persona}</div>
              <div className="persona-situation">{c.situation}</div>
              <div className="persona-result">{c.result}</div>
              {c.tags && (
                <div className="persona-tags">
                  {c.tags.map((t, j) => <span key={j} className="tag">{t}</span>)}
                </div>
              )}
            </div>
          ))}
        </div>
      );
    case "timeline":
      return (
        <ul className="timeline">
          {s.events.map((e, i) => (
            <li key={i} className="timeline-item">
              <div className="timeline-time">{e.time}</div>
              <div className="timeline-body">
                <strong>{e.title}</strong>
                {e.detail && <p>{e.detail}</p>}
                {e.amount && <span className="timeline-amount">{e.amount}</span>}
              </div>
            </li>
          ))}
        </ul>
      );
    case "checklist":
      return (
        <ul className="checklist">
          {s.items.map((it, i) => (
            <li key={i}>
              <span className="check-mark">{it.required ? "✔" : "•"}</span>
              <strong>{it.label}</strong>
              {it.sub && <span className="check-sub">{it.sub}</span>}
            </li>
          ))}
        </ul>
      );
    case "scenario":
      return (
        <div className="scenario-list">
          {s.cases.map((c, i) => (
            <div key={i} className={"scenario-item" + (c.highlight ? " highlight" : "")}>
              <div className="scenario-label">{c.label}</div>
              <div className="scenario-condition">{c.condition}</div>
              <div className="scenario-result">{c.result}</div>
            </div>
          ))}
        </div>
      );
    case "comparison":
      return (
        <div className="comparison">
          <div className="comp-side">
            <h4>{s.left.label}</h4>
            <ul>{s.left.points.map((p, i) => <li key={i}>{p}</li>)}</ul>
          </div>
          <div className="comp-divider">VS</div>
          <div className="comp-side">
            <h4>{s.right.label}</h4>
            <ul>{s.right.points.map((p, i) => <li key={i}>{p}</li>)}</ul>
          </div>
          {s.verdict && <div className="comp-verdict">{s.verdict}</div>}
        </div>
      );
    case "calendar":
      return (
        <div className="calendar-grid">
          {s.months.map((m, i) => (
            <div key={i} className="cal-cell">
              <div className="cal-month">{m.month}</div>
              <div className="cal-action">{m.action}</div>
            </div>
          ))}
        </div>
      );
    case "steps":
      return (
        <ol className="steps">
          {s.steps.map((st, i) => (
            <li key={i}>
              <div className="step-num">{i + 1}</div>
              <div className="step-body">
                <strong>{st.step}</strong>
                <p>{st.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      );
    case "callout": {
      const v = s.variant ?? "info";
      return (
        <div className={"callout callout-" + v}>
          <ul>{s.items.map((it, i) => <li key={i}>{it}</li>)}</ul>
        </div>
      );
    }
    case "stat":
      return (
        <div className="stat-grid">
          {s.stats.map((st, i) => (
            <div key={i} className="stat-cell">
              <div className="stat-value">{st.value}</div>
              <div className="stat-label">{st.label}</div>
              {st.sub && <div className="stat-sub">{st.sub}</div>}
            </div>
          ))}
        </div>
      );
    case "text":
      return <p>{s.body}</p>;
    default:
      return null;
  }
}

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
              <span key={i}>{line}<br /></span>
            ))}
          </div>
        </>
      ),
    });
  }

  // 신규: sections 배열이 있으면 그 순서로 렌더 (per-calculator 자유 구성)
  if (guide.sections?.length) {
    for (const sec of guide.sections) {
      sections.push({
        num: next(),
        title: sec.title || "",
        content: renderSection(sec),
      });
    }
  }

  // 기존 호환: tables/tips/faq
  if (guide.tables) {
    for (const [key, rows] of Object.entries(guide.tables)) {
      if (!Array.isArray(rows) || rows.length === 0) continue;
      sections.push({
        num: next(),
        title: GUIDE_TABLE_TITLES[key] ?? key,
        content: renderTable(rows),
      });
    }
  }

  if (guide.tips?.length) {
    sections.push({
      num: next(),
      title: "활용 팁",
      content: (
        <ul>
          {guide.tips.map((tip, i) => <li key={i}>{tip}</li>)}
        </ul>
      ),
    });
  }

  if (guide.faq?.length) {
    sections.push({
      num: next(),
      title: "자주 묻는 질문",
      content: (
        <>
          {guide.faq.map((qa, i) => (
            <div key={i}>
              <p><strong>Q. {qa.q}</strong></p>
              <p>{qa.a}</p>
            </div>
          ))}
        </>
      ),
    });
  }

  if (sections.length === 0) return null;

  // FAQ 는 목업처럼 접히는 목록으로 따로, 나머지는 펼친 섹션으로
  const faqSec = sections.find((s) => s.title === "자주 묻는 질문");
  const body = sections.filter((s) => s !== faqSec);
  const faqs: { q: string; a: string }[] = guide.faq?.length ? guide.faq : ((guide.sections ?? []).find((x) => x.type === "faq") as SectionFAQ | undefined)?.items ?? [];

  return (
    <section className="guide-section">
      {body.map((s, i) => (
        <div key={s.num} className="gsec">
          <h2><em>{i + 1}</em>{s.title}</h2>
          <div className="gsec-body">{s.content}</div>
        </div>
      ))}
      {faqs.length > 0 && (
        <div className="gfaq">
          <h2>자주 묻는 질문</h2>
          {faqs.map((qa, i) => (
            <details key={i} open={i === 0}><summary>{qa.q}</summary><p>{qa.a}</p></details>
          ))}
        </div>
      )}
    </section>
  );
}
