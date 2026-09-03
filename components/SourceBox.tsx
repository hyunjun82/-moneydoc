type SourceShape = {
  primary?: { agency?: string; document?: string; year?: number; laws?: string[] };
  secondary?: { agency?: string; name?: string; rate?: string }[];
  note?: string;
};

/* 출처: 목업처럼 표 하나 (항목 · 값 · 근거) */
export function SourceBox({ source }: { source: SourceShape }) {
  const primary = source?.primary;
  const secondary = source?.secondary ?? [];
  const rows: [string, string, string][] = [];
  if (primary) rows.push(["계산 산식", `${primary.agency ?? ""} 「${primary.document ?? ""}」 ${primary.year ?? ""}`.trim(), (primary.laws ?? []).join(" · ")]);
  for (const s of secondary) rows.push([s.name ?? "", s.rate ?? "", s.agency ?? ""]);
  if (source?.note) rows.push(["비고", source.note, ""]);
  if (!rows.length) return null;
  return (
    <section className="src-section">
      <h2>출처</h2>
      <table className="srct">
        <thead><tr><th>항목</th><th>값</th><th>근거</th></tr></thead>
        <tbody>{rows.map((r, i) => <tr key={i}><td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td></tr>)}</tbody>
      </table>
      <p className="src-lim">결과는 정부 공식 산식 기반 참고용이에요. 요율·세율은 매년 바뀌고, 바뀌면 바로 반영해요.</p>
    </section>
  );
}
