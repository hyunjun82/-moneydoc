"use client";

import { useState, useMemo } from "react";
import { calculators } from "@/lib/calc/engine";
import { krw, parseKrw } from "@/lib/format";

type InputDef = {
  id: string;
  label: string;
  type?: string;
  min?: number;
  max?: number;
  step?: number;
  default?: unknown;
  hint?: string;
  options?: { value: unknown; label: string }[] | string[];
  unit?: string;
};

type Spec = {
  slug: string;
  inputs: InputDef[];
  verification?: {
    cases?: { expected?: Record<string, unknown> }[];
  };
};

// 결과 키 → 한국어 라벨
const OUTPUT_LABELS: Record<string, string> = {
  netMonthly: "월 실수령액",
  grossMonthly: "월 세전 급여",
  totalDeduction: "총 공제액",
  totalInsurance: "4대보험 합계",
  nationalPension: "국민연금",
  healthInsurance: "건강보험",
  longTermCare: "장기요양보험",
  employmentInsurance: "고용보험",
  monthlyIncomeTax: "소득세 (월)",
  monthlyLocalTax: "지방소득세 (월)",
  annualIncomeTax: "연 소득세",
  taxBeforeCredit: "산출세액",
  taxableIncome: "과세표준",
  earnedIncomeDeduction: "근로소득공제",
  personalDeduction: "인적공제",
  earnedIncomeCredit: "근로소득세액공제",
  childCredit: "자녀세액공제",
  decisionTax: "결정세액",
  localTax: "지방소득세",
  totalTax: "총 세금",
  deductRatePct: "공제율 (%)",
  effectiveTaxRate: "실효세율 (%)",
  acquisitionTax: "취득세",
  registrationTax: "등록면허세",
  brokerageFee: "중개수수료",
  vat: "부가세",
  totalCost: "총 비용",
  transferTax: "양도세",
  taxableGain: "양도차익",
  longTermDeduction: "장기보유특별공제",
  taxRate: "세율",
  monthlyPayment: "월 상환액",
  totalInterest: "총 이자",
  totalPayment: "총 상환액",
  maxLoan: "최대 대출 한도",
  dsrPct: "DSR (%)",
  dtiPct: "DTI (%)",
  ltvPct: "LTV (%)",
  maturityAmount: "만기 수령액",
  totalDeposit: "총 납입액",
  interest: "이자",
  taxOnInterest: "이자소득세",
  netInterest: "세후 이자",
  monthlyPension: "월 연금액",
  yearlyPension: "연 연금액",
  benefitDays: "수급 가능 일수",
  dailyBenefit: "일 수급액",
  totalBenefit: "총 수급액",
  isEligible: "수급 자격",
  childSupport: "월 양육비",
  alimony: "위자료 예상액",
  severancePay: "퇴직금",
  inheritanceTax: "상속세",
  giftTax: "증여세",
  rentalYield: "임대수익률",
  monthlyRent: "월세",
  jeonseEquivalent: "전세 환산",
  result: "결과",
};

function outputLabel(key: string): string {
  return OUTPUT_LABELS[key] ?? key;
}

function formatValue(v: unknown, unit?: string): string {
  if (v === null || v === undefined) return "—";
  if (typeof v === "boolean") return v ? "O" : "X";
  if (typeof v === "number") {
    if (unit === "%") return `${v.toFixed(2)}%`;
    if (unit === "년" || unit === "개월" || unit === "일") return `${v}${unit}`;
    return krw(v);
  }
  if (typeof v === "string") return v;
  if (typeof v === "object") return JSON.stringify(v);
  return String(v);
}

function isPercentKey(key: string): boolean {
  return /Pct|Rate(?!s)|Ratio|Pcnt/i.test(key);
}

function isDateKey(key: string): boolean {
  return /Date|date$/i.test(key);
}

function isBooleanKey(key: string, val: unknown): boolean {
  return typeof val === "boolean" || /^is[A-Z]/.test(key);
}

function pickPrimaryOutput(expected: Record<string, unknown>, inputs: InputDef[]): string {
  // 1. priority keys
  const priority = [
    "netMonthly",
    "totalCost",
    "totalTax",
    "totalDeduction",
    "maturityAmount",
    "monthlyPayment",
    "totalBenefit",
    "monthlyPension",
    "severancePay",
    "transferTax",
    "acquisitionTax",
    "brokerageFee",
    "inheritanceTax",
    "giftTax",
    "maxLoan",
    "result",
  ];
  for (const k of priority) {
    if (k in expected) return k;
  }
  // fallback: largest numeric value
  const numeric = Object.entries(expected).filter(([, v]) => typeof v === "number");
  if (numeric.length) {
    numeric.sort((a, b) => Math.abs(b[1] as number) - Math.abs(a[1] as number));
    return numeric[0][0];
  }
  return Object.keys(expected)[0];
}

export function GenericCalculator({ spec }: { spec: Spec }) {
  const [values, setValues] = useState<Record<string, unknown>>(() => {
    const v: Record<string, unknown> = {};
    for (const inp of spec.inputs ?? []) {
      v[inp.id] = inp.default ?? (inp.type === "stepper" || inp.type === "number" ? 0 : "");
    }
    return v;
  });

  const calcFn = calculators[spec.slug];
  const expected = spec.verification?.cases?.[0]?.expected ?? {};
  const primaryKey = pickPrimaryOutput(expected, spec.inputs ?? []);

  const result = useMemo(() => {
    if (!calcFn) return null;
    try {
      return calcFn(values, spec as unknown as Record<string, unknown>) as Record<string, unknown>;
    } catch (e) {
      return null;
    }
  }, [values, calcFn, spec]);

  if (!calcFn) {
    return (
      <section className="main">
        <div className="panel" style={{ padding: 32, textAlign: "center" }}>
          이 계산기는 곧 추가됩니다.
        </div>
      </section>
    );
  }

  const update = (id: string, v: unknown) => setValues((s) => ({ ...s, [id]: v }));

  const expectedKeys = Object.keys(expected);
  const breakdownKeys = expectedKeys.filter((k) => k !== primaryKey);
  const primaryVal = result?.[primaryKey];
  const primaryUnit = isPercentKey(primaryKey) ? "%" : isBooleanKey(primaryKey, primaryVal) ? "" : "원";
  const primaryDisplay = formatValue(primaryVal, primaryUnit);

  return (
    <section className="main">
      <div className="calc-grid">
        {/* INPUT */}
        <div className="panel">
          <div className="panel-head">
            <span className="panel-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4z" />
              </svg>
            </span>
            <h2 className="panel-title">정보 입력</h2>
          </div>

          {(spec.inputs ?? []).map((inp) => (
            <InputField key={inp.id} def={inp} value={values[inp.id]} onChange={(v) => update(inp.id, v)} />
          ))}
        </div>

        {/* RESULT */}
        <div className="panel">
          <div className="panel-head">
            <span className="panel-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3v18h18" />
                <path d="M18 17V9M13 17V5M8 17v-3" />
              </svg>
            </span>
            <h2 className="panel-title">계산 결과</h2>
          </div>

          {result ? (
            <>
              <div className="result-hero">
                <div className="result-label">{outputLabel(primaryKey)}</div>
                <div>
                  <span className="result-value">{primaryDisplay}</span>
                  {primaryUnit && primaryUnit !== "%" && primaryDisplay !== "O" && primaryDisplay !== "X" && (
                    <span className="result-unit">{primaryUnit}</span>
                  )}
                </div>
              </div>

              {breakdownKeys.length > 0 && (
                <div className="breakdown-list">
                  {breakdownKeys.map((key) => {
                    const v = result[key];
                    if (v === undefined || v === null) return null;
                    if (typeof v === "object") return null;
                    const unit = isPercentKey(key) ? "%" : "";
                    return (
                      <div key={key} className="b-row">
                        <span className="name">{outputLabel(key)}</span>
                        <span className="val">{formatValue(v, unit)}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          ) : (
            <div style={{ padding: 24, textAlign: "center", color: "var(--text-3)" }}>
              입력값을 확인해주세요.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function InputField({
  def,
  value,
  onChange,
}: {
  def: InputDef;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  const t = def.type ?? "number";

  if (t === "stepper") {
    const n = (value as number) ?? def.default ?? 0;
    return (
      <div className="input-row">
        <div className="input-label">
          <span className="name">{def.label}</span>
          {def.hint && <span className="hint">{def.hint}</span>}
        </div>
        <div className="stepper">
          <button
            type="button"
            onClick={() => onChange(Math.max(def.min ?? 0, n - 1))}
          >
            −
          </button>
          <span className="val">{n}</span>
          <button
            type="button"
            onClick={() => onChange(Math.min(def.max ?? 99, n + 1))}
          >
            +
          </button>
        </div>
      </div>
    );
  }

  if (t === "select" && def.options) {
    const opts = def.options.map((o) =>
      typeof o === "string" ? { value: o, label: o } : o
    );
    return (
      <div className="input-row">
        <div className="input-label">
          <span className="name">{def.label}</span>
          {def.hint && <span className="hint">{def.hint}</span>}
        </div>
        <div className="input-box">
          <select
            value={String(value ?? "")}
            onChange={(e) => {
              const raw = e.target.value;
              const matched = opts.find((o) => String(o.value) === raw);
              onChange(matched?.value ?? raw);
            }}
            style={{
              width: "100%",
              height: 46,
              padding: "0 16px",
              background: "var(--bg)",
              border: "1.5px solid var(--line)",
              borderRadius: 10,
              fontSize: 17,
              fontWeight: 600,
              color: "var(--text)",
              fontFamily: "inherit",
            }}
          >
            {opts.map((o) => (
              <option key={String(o.value)} value={String(o.value)}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  if (t === "boolean" || t === "checkbox") {
    return (
      <div className="input-row">
        <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={(e) => onChange(e.target.checked)}
            style={{ width: 18, height: 18 }}
          />
          <span style={{ fontSize: 14, fontWeight: 600 }}>{def.label}</span>
          {def.hint && <span className="hint">{def.hint}</span>}
        </label>
      </div>
    );
  }

  if (t === "date") {
    return (
      <div className="input-row">
        <div className="input-label">
          <span className="name">{def.label}</span>
          {def.hint && <span className="hint">{def.hint}</span>}
        </div>
        <div className="input-box">
          <input
            type="date"
            value={String(value ?? "")}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      </div>
    );
  }

  if (t === "text") {
    return (
      <div className="input-row">
        <div className="input-label">
          <span className="name">{def.label}</span>
          {def.hint && <span className="hint">{def.hint}</span>}
        </div>
        <div className="input-box">
          <input
            type="text"
            value={String(value ?? "")}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      </div>
    );
  }

  // currency or number (default)
  const isCurrency = t === "currency";
  const n = (value as number) ?? def.default ?? 0;
  return (
    <div className="input-row">
      <div className="input-label">
        <span className="name">{def.label}</span>
        {def.hint && <span className="hint">{def.hint}</span>}
      </div>
      <div className="input-box">
        <input
          type="text"
          inputMode="numeric"
          value={isCurrency ? n.toLocaleString("ko-KR") : String(n)}
          onChange={(e) => {
            const num = isCurrency ? parseKrw(e.target.value) : Number(String(e.target.value).replace(/[^0-9.\-]/g, "")) || 0;
            onChange(num);
          }}
        />
        <span className="input-suffix">{def.unit ?? (isCurrency ? "원" : "")}</span>
      </div>
      {def.min !== undefined && def.max !== undefined && (
        <input
          type="range"
          className="slider"
          min={def.min}
          max={def.max}
          step={def.step ?? 1}
          value={Math.min(Math.max(n, def.min), def.max)}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      )}
    </div>
  );
}
