"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { krw, parseKrw } from "@/lib/format";
import { OUTPUT_LABELS } from "./calc-output-labels";

/* =========================================================================
   GenericCalculator v2 — 계산기 64개가 공유하는 화면.
   - 왼쪽(모바일은 위) 결과 카드: 큰 숫자 · 입력 요약 · 내역 · 링크 복사
   - 오른쪽 입력 카드: 금액은 칩(빠른 선택), 정수는 스테퍼, 선택지 4개 이하는 세그먼트
   - 아래 즉답 표: 첫 금액 입력을 구간별로 바꿔 가며 결과를 미리 보여준다 (표 값도 엔진)
   - URL 쿼리로 입력을 저장·복원 (공유 링크)
   계산은 lib/calc/engine.js 그대로. 페이지는 scripts/split-engine.mjs 가 쪼갠 lib/calc/gen/<slug>.js 의 함수를
   calc 로 넘긴다(자기 산식만 실림). 이 파일은 화면만 담당한다.
   ========================================================================= */

type Option = { value: unknown; label: string };
type InputDef = {
  id: string;
  label: string;
  type?: string;
  min?: number;
  max?: number;
  step?: number;
  default?: unknown;
  hint?: string;
  options?: Option[] | string[];
  unit?: string;
  conditional?: boolean;
};

type Spec = {
  slug: string;
  title?: string;
  year?: number | string;
  lastVerified?: string;
  inputs: InputDef[];
  verification?: { cases?: { expected?: Record<string, unknown>; govSource?: unknown }[] };
};

const outputLabel = (key: string) => OUTPUT_LABELS[key] ?? key;
const won = (n: number) => Math.round(n).toLocaleString("ko-KR");
const manwon = (n: number) => {
  if (n >= 1e8) return `${+(n / 1e8).toFixed((n / 1e8) % 1 ? 1 : 0)}억`;
  if (n >= 1e4) return `${(n / 1e4).toLocaleString("ko-KR")}만`;
  return won(n);
};

function isPercentKey(key: string): boolean {
  if (/^baseRate$|^hourlyRate$|^monthlyRate$|^dailyRate$|^baseAmount$|^depositRatio$/i.test(key)) return false;
  return /Pct|Rate(?!s)|Ratio|Pcnt|^ltv$|^dti$|^dsr$|^userPct/i.test(key);
}
const isCountKey = (key: string) =>
  /^(year|months|days|totalDays|yearsToCollege|yearsEarly|yearsDed|remainingDays|benefitDays|kids|dependents|tier|newLevel|westAge|koreanAge|ageGroup|ageMultiplier)$/.test(key) || /Score$/.test(key);

function formatValue(v: unknown, key: string): string {
  if (v === null || v === undefined) return "—";
  if (typeof v === "boolean") return v ? "예" : "아니오";
  if (typeof v === "number") {
    if (isPercentKey(key)) {
      const already = /Pct|Pcnt/i.test(key) && Math.abs(v) >= 1;
      return `${(already ? v : v * 100).toFixed(2).replace(/\.?0+$/, "")}%`;
    }
    if (isCountKey(key)) return String(v);
    return krw(v);
  }
  if (typeof v === "string") return v;
  if (typeof v === "object") return JSON.stringify(v);
  return String(v);
}
const unitOf = (key: string, v: unknown) => (typeof v === "number" && !isPercentKey(key) && !isCountKey(key) ? "원" : "");

const PRIORITY = [
  "netMonthly", "inheritanceTax", "giftTax", "transferTax", "acquisitionTax", "totalTax", "brokerageFee", "totalCost",
  "maturityAmount", "monthlyPayment", "totalBenefit", "monthlyPension", "severancePay", "maxLoan", "totalDeduction", "refund",
  "taxCredit", "taxSaving", "estimatedAmount", "payable", "tax", "total", "totalSaving", "totalPay", "totalReturn", "result",
  "decisionTax", "annualPension", "yearlyPension", "rentalYield", "totalInsurance", "monthlyPremium", "annualPremium",
];
function pickPrimaryOutput(expected: Record<string, unknown>): string {
  for (const k of PRIORITY) if (k in expected) return k;
  const numeric = Object.entries(expected).filter(([, v]) => typeof v === "number");
  if (numeric.length) return numeric.sort((a, b) => Math.abs(b[1] as number) - Math.abs(a[1] as number))[0][0];
  return Object.keys(expected)[0];
}

/** 금액 입력의 빠른 선택 칩: 기본값을 중심으로 0.5배~5배, 보기 좋은 숫자로 (min~max 안) */
const NICE = [1, 1.5, 2, 2.5, 3, 4, 5, 6, 7, 8, 9, 10];
const niceRound = (v: number) => { const p = Math.pow(10, Math.floor(Math.log10(v))); const m = v / p; return NICE.reduce((a, c) => (Math.abs(c - m) < Math.abs(a - m) ? c : a)) * p; };
function presets(def: InputDef): number[] {
  const d = typeof def.default === "number" && def.default > 0 ? def.default : (def.min ?? 0) > 0 ? (def.min as number) : 0;
  if (!d) return [];
  const min = def.min ?? 0, max = def.max ?? Infinity;
  const out = new Set<number>();
  for (const m of [0.5, 0.7, 1, 1.3, 1.5, 2, 3, 5]) { const v = niceRound(d * m); if (v >= min && v <= max && v > 0) out.add(v); }
  out.add(d);
  return [...out].sort((a, b) => a - b).slice(0, 9);
}

/** 비율 칩: 기본값 주변의 흔한 값 (소수형이면 0.03 → 3%) */
function pctPresets(def: InputDef, fraction: boolean): number[] {
  const d = typeof def.default === "number" ? def.default : 0;
  const min = def.min ?? 0, max = def.max ?? (fraction ? 1 : 100);
  const base = fraction ? [0.02, 0.03, 0.035, 0.04, 0.045, 0.05, 0.06, 0.07, 0.1, 0.15, 0.2, 0.3] : [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  const out = new Set<number>(base.filter((v) => v >= min && v <= max && Math.abs(v - d) <= (fraction ? 0.12 : 60)));
  if (d > 0) out.add(d);
  return [...out].sort((a, b) => a - b).slice(0, 8);
}
/** 라벨에서 단위 추정: "배기량 (cc)" → cc, "휴업 일수" → 일 */
function guessUnit(label: string): string {
  const m = /\(([^)]*)\)\s*$/.exec(label); if (m && m[1].length <= 4 && !/\d/.test(m[1])) return m[1];
  if (/일수/.test(label)) return "일"; if (/월수/.test(label)) return "개월"; if (/연령|나이/.test(label)) return "세"; if (/연수|년수/.test(label)) return "년";
  return "";
}

function normalizeOptions(def: InputDef): Option[] {
  return (def.options ?? []).map((o) => (typeof o === "string" ? { value: o, label: o } : o));
}

type CalcFn = (input: Record<string, unknown>, spec?: unknown) => Record<string, unknown>;

export function GenericCalculator({ spec, calc }: { spec: Spec; calc: CalcFn }) {
  const inputs = spec.inputs ?? [];
  const initial = () => {
    const v: Record<string, unknown> = {};
    for (const inp of inputs) v[inp.id] = inp.default ?? (inp.type === "stepper" || inp.type === "number" || inp.type === "currency" ? 0 : "");
    return v;
  };
  const [values, setValues] = useState<Record<string, unknown>>(initial);
  const [copied, setCopied] = useState(false);
  const mounted = useRef(false);

  // URL → 입력 복원 (공유 링크)
  useEffect(() => {
    try {
      const p = new URLSearchParams(window.location.search);
      if (![...p.keys()].length) { mounted.current = true; return; }
      setValues((s) => {
        const n = { ...s };
        for (const inp of inputs) {
          const raw = p.get(inp.id);
          if (raw === null) continue;
          if (inp.type === "boolean" || inp.type === "checkbox") n[inp.id] = raw === "1" || raw === "true";
          else if (inp.type === "select") { const o = normalizeOptions(inp).find((x) => String(x.value) === raw); n[inp.id] = o ? o.value : raw; }
          else if (inp.type === "date" || inp.type === "text") n[inp.id] = raw;
          else n[inp.id] = Number(raw);
        }
        return n;
      });
    } catch { /* noop */ }
    mounted.current = true;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // 입력 → URL
  useEffect(() => {
    if (!mounted.current) return;
    try {
      const p = new URLSearchParams();
      for (const inp of inputs) { const v = values[inp.id]; if (v === undefined || v === null || v === "") continue; p.set(inp.id, typeof v === "boolean" ? (v ? "1" : "0") : String(v)); }
      window.history.replaceState(null, "", `?${p}`);
    } catch { /* noop */ }
  }, [values, inputs]);

  const calcFn = calc;
  const expected = spec.verification?.cases?.[0]?.expected ?? {};
  const primaryKey = pickPrimaryOutput(expected);
  const govVerified = (spec.verification?.cases ?? []).some((c) => c.govSource);

  const run = (v: Record<string, unknown>) => { try { return calcFn ? (calcFn(v, spec as unknown as Record<string, unknown>) as Record<string, unknown>) : null; } catch { return null; } };
  const result = useMemo(() => run(values), [values, calcFn, spec]); // eslint-disable-line react-hooks/exhaustive-deps

  // 즉답 표: 첫 금액 입력을 구간별로
  const tableInput = inputs.find((i) => i.type === "currency" && typeof i.default === "number" && i.default > 0);
  const tableRows = useMemo(() => {
    if (!tableInput || !calcFn) return [];
    return presets(tableInput).map((x) => ({ x, r: run({ ...values, [tableInput.id]: x }) }));
  }, [tableInput, values, calcFn]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!calcFn) {
    return <section className="main"><div className="gc-card" style={{ textAlign: "center", padding: 32 }}>이 계산기는 곧 추가됩니다.</div></section>;
  }

  const update = (id: string, v: unknown) => setValues((s) => ({ ...s, [id]: v }));
  const breakdownKeys = Object.keys(expected).filter((k) => k !== primaryKey);
  const primaryVal = result?.[primaryKey];
  const primaryUnit = unitOf(primaryKey, primaryVal);
  const tableCols = [primaryKey, ...breakdownKeys.filter((k) => typeof (result?.[k]) === "number").slice(0, 3)];
  const deductionStyle = /^net|Net$/.test(primaryKey) || "totalDeduction" in expected;
  // 한 줄 인사이트: 첫 금액 입력이 한 단계 오르면 결과가 얼마나 변하는지 (목업의 "연봉 1,000만원 오르면" 줄)
  const insight = (() => {
    if (!tableInput || !result || typeof result[primaryKey] !== "number") return null;
    const cur = Number(values[tableInput.id]) || 0; if (!cur) return null;
    const step = niceRound(cur * 0.2); const r2 = run({ ...values, [tableInput.id]: cur + step });
    if (!r2 || typeof r2[primaryKey] !== "number") return null;
    const diff = (r2[primaryKey] as number) - (result[primaryKey] as number);
    return { step, diff };
  })();

  const summary = inputs
    .filter((i) => !(i.type === "boolean" || i.type === "checkbox") || values[i.id])
    .map((i) => {
      const v = values[i.id];
      if (i.type === "boolean" || i.type === "checkbox") return i.label;
      if (i.type === "select") return normalizeOptions(i).find((o) => String(o.value) === String(v))?.label ?? String(v);
      if (i.type === "currency") return `${i.label} ${manwon(Number(v) || 0)}원`;
      if (typeof v === "number") {
        const isPct = /rate|ratio|pct|percent/i.test(i.id) || /률|율|%/.test(i.label);
        if (isPct) return `${i.label} ${+(((i.max ?? 1) <= 1 ? v * 100 : v)).toFixed(2)}%`;
        return `${i.label} ${v}${i.unit ?? guessUnit(i.label)}`;
      }
      return `${i.label} ${String(v)}`;
    })
    .slice(0, 4)
    .join(" · ");

  const copyLink = async () => {
    try { await navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { /* noop */ }
  };

  return (
    <section className="main">
      <div className="gc">
        {/* 결과 */}
        <div className="gc-card gc-res">
          <div className="gc-res-l"><span>{outputLabel(primaryKey)}</span><button type="button" onClick={copyLink}>{copied ? "복사됨" : "링크 복사"}</button></div>
          {result ? (
            <>
              <div className="gc-res-v">{formatValue(primaryVal, primaryKey)}{primaryUnit && <small>{primaryUnit}</small>}</div>
              <div className="gc-res-s">{summary}</div>
              {breakdownKeys.length > 0 && (
                <ul className="gc-rows">
                  {breakdownKeys.map((key) => {
                    const v = result[key];
                    if (v === undefined || v === null || Array.isArray(v)) return null;
                    if (typeof v === "object") {
                      const obj = v as Record<string, unknown>;
                      return (
                        <li key={key} className="gc-group">
                          <div className="gc-group-t">{outputLabel(key)}</div>
                          {Object.entries(obj).map(([k2, v2]) => (v2 === null || v2 === undefined || typeof v2 === "object") ? null : (
                            <div key={k2} className="gc-group-r"><span>{outputLabel(k2)}</span><b>{formatValue(v2, k2)}</b></div>
                          ))}
                        </li>
                      );
                    }
                    const total = /^total|Total$|합계/.test(key);
                    const minus = deductionStyle && typeof v === "number" && v > 0 && /(Tax|Insurance|Pension|Care|Deduction|Fee|Premium|Cost)$/i.test(key) && !/^total(?!Deduction)/.test(key);
                    return <li key={key} className={total ? "tot" : ""}><span>{outputLabel(key)}</span><b className={minus ? "minus" : ""}>{minus ? "−" : ""}{formatValue(v, key)}</b></li>;
                  })}
                </ul>
              )}
            </>
          ) : (
            <div className="gc-empty">입력값을 확인해 주세요.</div>
          )}
          {insight && result && (
            <div className="gc-rev">{tableInput!.label} {manwon(insight.step)}원 오르면 {outputLabel(primaryKey)}은 <b>{insight.diff >= 0 ? "+" : "−"}{formatValue(Math.abs(insight.diff), primaryKey)}{primaryUnit}</b>{insight.diff === 0 ? " (변화 없음)" : ""}</div>
          )}
          <div className="gc-trust"><i />{govVerified ? "정부 계산기와 0원 일치 확인" : "법령·공식 고시 기준"}{spec.lastVerified ? ` · ${spec.lastVerified} 검증` : spec.year ? ` · ${spec.year}년 기준` : ""}</div>
        </div>

        {/* 입력 */}
        <div className="gc-card">
          {inputs.map((inp) => <Field key={inp.id} def={inp} value={values[inp.id]} onChange={(v) => update(inp.id, v)} />)}
        </div>
      </div>

      {/* 즉답 표 */}
      {tableInput && tableRows.length > 1 && (
        <div className="gc-tw-wrap">
          <h2 className="gc-h2">{tableInput.label}별 {outputLabel(primaryKey)}<i>다른 입력은 지금 값 기준</i></h2>
          <div className="gc-tw"><table>
            <thead><tr><th>{tableInput.label}</th>{tableCols.map((k) => <th key={k}>{outputLabel(k)}</th>)}</tr></thead>
            <tbody>
              {tableRows.map(({ x, r }) => (
                <tr key={x} className={x === values[tableInput.id] ? "hi" : ""} onClick={() => update(tableInput.id, x)} title="이 값으로 계산">
                  <td>{manwon(x)}원</td>
                  {tableCols.map((k) => <td key={k}>{r ? formatValue(r[k], k) : "—"}</td>)}
                </tr>
              ))}
            </tbody>
          </table></div>
          <p className="gc-tn">표의 값은 이 페이지 계산 엔진이 만들어요. 줄을 누르면 그 값으로 위 결과가 바뀌어요.</p>
        </div>
      )}
    </section>
  );
}

function Field({ def, value, onChange }: { def: InputDef; value: unknown; onChange: (v: unknown) => void }) {
  const t = def.type ?? "number";
  const label = <label>{def.label}{def.hint && <em>{def.hint}</em>}</label>;

  if (t === "boolean" || t === "checkbox") {
    const on = Boolean(value);
    return (
      <div className="gc-f">
        {label}
        <div className="gc-seg two">
          <button type="button" className={!on ? "on" : ""} onClick={() => onChange(false)}>아니오</button>
          <button type="button" className={on ? "on" : ""} onClick={() => onChange(true)}>예</button>
        </div>
      </div>
    );
  }

  if (t === "select") {
    const opts = normalizeOptions(def);
    const cur = String(value ?? "");
    if (opts.length <= 4 && opts.every((o) => o.label.length <= 8)) {
      return (
        <div className="gc-f">
          {label}
          <div className="gc-seg" style={{ gridTemplateColumns: `repeat(${opts.length},1fr)` }}>
            {opts.map((o) => <button key={String(o.value)} type="button" className={String(o.value) === cur ? "on" : ""} onClick={() => onChange(o.value)}>{o.label}</button>)}
          </div>
        </div>
      );
    }
    return (
      <div className="gc-f">
        {label}
        <div className="gc-in"><select value={cur} onChange={(e) => { const m = opts.find((o) => String(o.value) === e.target.value); onChange(m ? m.value : e.target.value); }}>
          {opts.map((o) => <option key={String(o.value)} value={String(o.value)}>{o.label}</option>)}
        </select></div>
      </div>
    );
  }

  if (t === "date" || t === "text") {
    return (
      <div className="gc-f">
        {label}
        <div className="gc-in"><input type={t} value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} /></div>
      </div>
    );
  }

  const n = typeof value === "number" ? value : Number(value) || 0;

  // 정수·작은 범위 → 스테퍼
  const small = t === "stepper" || (t === "number" && (def.max ?? 999) <= 60 && (def.step ?? 1) === 1);
  if (small) {
    const min = def.min ?? 0, max = def.max ?? 99;
    return (
      <div className="gc-f">
        {label}
        <div className="gc-step">
          <button type="button" onClick={() => onChange(Math.max(min, n - 1))} aria-label="줄이기">−</button>
          <b>{n}{def.unit ? <small>{def.unit}</small> : null}</b>
          <button type="button" onClick={() => onChange(Math.min(max, n + 1))} aria-label="늘리기">+</button>
        </div>
      </div>
    );
  }

  const isCurrency = t === "currency";
  // 비율 입력: 엔진은 0.04 같은 소수를 받지만 화면은 4% 로 보여준다 (id 에 rate/ratio, 라벨에 률·율)
  const isPct = !isCurrency && (/rate|ratio|pct|percent/i.test(def.id) || /률|율|%/.test(def.label));
  const fraction = isPct && (def.max ?? 1) <= 1;           // 0~1 소수형
  const shown = fraction ? +(n * 100).toFixed(4) : n;
  const unit = def.unit ?? (isCurrency ? "원" : isPct ? "%" : guessUnit(def.label));
  const chips = isCurrency ? presets(def) : isPct ? pctPresets(def, fraction) : [];
  const set = (raw: string) => { const v = Number(String(raw).replace(/[^0-9.\-]/g, "")) || 0; onChange(fraction ? +(v / 100).toFixed(6) : v); };
  return (
    <div className="gc-f">
      {label}
      <div className="gc-in">
        <input
          type="text" inputMode="decimal"
          value={isCurrency ? n.toLocaleString("ko-KR") : String(shown)}
          onChange={(e) => (isCurrency ? onChange(parseKrw(e.target.value)) : set(e.target.value))}
        />
        <span>{unit}</span>
      </div>
      {chips.length > 1 && (
        <div className="gc-chips">
          {chips.map((c) => <button key={c} type="button" className={Math.abs(c - n) < 1e-9 ? "on" : ""} onClick={() => onChange(c)}>{isCurrency ? manwon(c) : `${+((fraction ? c * 100 : c)).toFixed(2)}%`}</button>)}
        </div>
      )}
    </div>
  );
}
