type SourceShape = {
  primary?: { agency?: string; document?: string; year?: number; laws?: string[] };
  secondary?: { agency?: string; name?: string; rate?: string }[];
};

export function SourceBox({ source }: { source: SourceShape }) {
  const primary = source?.primary;
  const secondary = source?.secondary ?? [];

  return (
    <section className="source-section">
      <div className="source-box">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 12l2 2 4-4" />
          <circle cx="12" cy="12" r="10" />
        </svg>
        <div>
          <h4>이 계산기의 출처</h4>
          <p>
            {primary && (
              <>
                <strong>
                  {primary.agency} 「{primary.document}」 {primary.year}
                </strong>
                {primary.laws && primary.laws.length > 0 && <> · 근거: {primary.laws.join(", ")}</>}
              </>
            )}
            {secondary.length > 0 && (
              <>
                {" / "}
                {secondary.map((s, i) => (
                  <span key={i}>
                    <strong>{s.agency} {s.name}{s.rate ? ` (${s.rate})` : ""}</strong>
                    {i < secondary.length - 1 && ", "}
                  </span>
                ))}
              </>
            )}
            <br />
            결과는 정부 공식 산식 기반 참고용입니다. 요율·세율은 매년 변경되며, 변경 시 즉시 반영됩니다.
          </p>
        </div>
      </div>
    </section>
  );
}
