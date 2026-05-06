"use client";

import { useState, useMemo } from "react";
import { calcSalaryNetPay, calcSalaryNetPaySimpleTax } from "@/lib/calc/salary-net-pay";
import { krw, parseKrw } from "@/lib/format";

const QUICK_PICKS = [
  { value: 30000000, label: "3천만" },
  { value: 50000000, label: "5천만" },
  { value: 70000000, label: "7천만" },
  { value: 100000000, label: "1억" },
  { value: 150000000, label: "1.5억" },
];

const SLIDER_MIN = 20_000_000;
const SLIDER_MAX = 200_000_000;
const SLIDER_STEP = 1_000_000;

const DONUT_C = 2 * Math.PI * 54;

export function SalaryNetPayClient() {
  const [annual, setAnnual] = useState(50_000_000);
  const [dependents, setDependents] = useState(1);
  const [kids, setKids] = useState(0);
  const [nontaxable, setNontaxable] = useState(0);

  // 메인 = 간이세액표 §134 모드 (회사 매월 떼는 기준, 명세서와 일치)
  const r = useMemo(
    () => calcSalaryNetPaySimpleTax({ annual, dependents, kids, nontaxable }),
    [annual, dependents, kids, nontaxable]
  );
  // 참고용 = 1년 정확 환산 (소득세법 §55 누진세율, 연말정산 후 일치)
  const rAnnual = useMemo(
    () => calcSalaryNetPay({ annual, dependents, kids }),
    [annual, dependents, kids]
  );

  const netPct = (r.netMonthly / r.monthly) * 100;
  const donutFilled = DONUT_C * (netPct / 100);
  const totalTax = r.monthlyIncomeTax + r.monthlyLocalTax;

  return (
    <>
      <section className="main">
        <div className="calc-grid">
          <div>
            {/* INPUT PANEL */}
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

              <div className="input-row">
                <div className="input-label">
                  <span className="name">연봉</span>
                  <span className="hint">세전 기준 (식대·차량유지비 등 비과세 제외)</span>
                </div>
                <div className="input-box">
                  <input
                    type="text"
                    inputMode="numeric"
                    value={annual.toLocaleString("ko-KR")}
                    onChange={(e) => {
                      const n = parseKrw(e.target.value);
                      setAnnual(n);
                    }}
                  />
                  <span className="input-suffix">원</span>
                </div>
                <input
                  type="range"
                  className="slider"
                  min={SLIDER_MIN}
                  max={SLIDER_MAX}
                  step={SLIDER_STEP}
                  value={Math.min(Math.max(annual, SLIDER_MIN), SLIDER_MAX)}
                  onChange={(e) => setAnnual(Number(e.target.value))}
                />
                <div className="quick-pick">
                  {QUICK_PICKS.map((q) => (
                    <button
                      key={q.value}
                      className={annual === q.value ? "active" : ""}
                      onClick={() => setAnnual(q.value)}
                      type="button"
                    >
                      {q.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="input-row">
                <div className="select-row">
                  <div>
                    <div className="input-label">
                      <span className="name">부양가족 수</span>
                      <span className="hint">본인 포함</span>
                    </div>
                    <div className="stepper">
                      <button onClick={() => setDependents((d) => Math.max(1, d - 1))} type="button">−</button>
                      <span className="val">{dependents}</span>
                      <button onClick={() => setDependents((d) => Math.min(10, d + 1))} type="button">+</button>
                    </div>
                  </div>
                  <div>
                    <div className="input-label">
                      <span className="name">8세~20세 자녀</span>
                      <span className="hint">세액공제</span>
                    </div>
                    <div className="stepper">
                      <button onClick={() => setKids((k) => Math.max(0, k - 1))} type="button">−</button>
                      <span className="val">{kids}</span>
                      <button onClick={() => setKids((k) => Math.min(8, k + 1))} type="button">+</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="input-row">
                <div className="input-label">
                  <span className="name">비과세액 (월)</span>
                  <span className="hint">식대·차량유지비 등, 일반적으로 0~20만</span>
                </div>
                <div className="input-box">
                  <input
                    type="text"
                    inputMode="numeric"
                    value={nontaxable.toLocaleString("ko-KR")}
                    onChange={(e) => {
                      const n = parseKrw(e.target.value);
                      setNontaxable(Math.min(1_000_000, Math.max(0, n)));
                    }}
                  />
                  <span className="input-suffix">원</span>
                </div>
              </div>
            </div>

            {/* DONUT VIZ */}
            <div className="viz-card">
              <div className="viz-head">한눈에 보는 공제 비율</div>
              <div className="donut-wrap">
                <div className="donut">
                  <svg width="130" height="130" viewBox="0 0 130 130">
                    <circle className="ring-bg" cx="65" cy="65" r="54" />
                    <circle
                      className="ring-fill"
                      cx="65"
                      cy="65"
                      r="54"
                      strokeDasharray={`${donutFilled} ${DONUT_C}`}
                    />
                  </svg>
                  <div className="center">
                    <div className="pct">
                      <span>{netPct.toFixed(1)}</span>%
                    </div>
                    <div className="lbl">실수령 비율</div>
                  </div>
                </div>
                <div className="donut-legend">
                  <div className="legend-row">
                    <span className="lhs"><span className="swatch s-net" />실수령</span>
                    <span className="val">{krw(r.netMonthly)}</span>
                  </div>
                  <div className="legend-row">
                    <span className="lhs"><span className="swatch s-ins" />4대보험</span>
                    <span className="val">−{krw(r.totalInsurance)}</span>
                  </div>
                  <div className="legend-row">
                    <span className="lhs"><span className="swatch s-tax" />소득세·지방세</span>
                    <span className="val">−{krw(totalTax)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RESULT PANEL */}
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

            <div className="result-hero">
              <div className="result-label">월 실수령액 (간이세액표 §134 · 명세서 기준)</div>
              <div>
                <span className="result-value">{krw(r.netMonthly)}</span>
                <span className="result-unit">원</span>
              </div>
              <div className="result-sub">
                연 환산 <b>{krw(r.netMonthly * 12)}</b>원 · 공제율 <b>{r.deductRatePct.toFixed(1)}</b>%
              </div>
              <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--line-soft)", fontSize: 13, color: "var(--text-2)" }}>
                <b>참고:</b> 1년 정확 환산(소득세법 §55) <b style={{ color: "var(--brand)" }}>{krw(rAnnual.netMonthly)}원</b>
                <span style={{ marginLeft: 6, color: "var(--text-3)" }}>
                  · 차이는 연말정산 후 일치
                </span>
              </div>
            </div>

            <div className="breakdown-list">
              <div className="b-row">
                <span className="name">월 세전 급여</span>
                <span className="val">{krw(r.grossMonthly)}</span>
              </div>
              <div className="b-row">
                <span className="name">국민연금 <span className="tag minus">−4.5%</span></span>
                <span className="val minus">−{krw(r.nationalPension)}</span>
              </div>
              <div className="b-row">
                <span className="name">건강보험 <span className="tag minus">−3.545%</span></span>
                <span className="val minus">−{krw(r.healthInsurance)}</span>
              </div>
              <div className="b-row">
                <span className="name">장기요양 <span className="tag minus">−건보의 12.95%</span></span>
                <span className="val minus">−{krw(r.longTermCare)}</span>
              </div>
              <div className="b-row">
                <span className="name">고용보험 <span className="tag minus">−0.9%</span></span>
                <span className="val minus">−{krw(r.employmentInsurance)}</span>
              </div>
              <div className="b-row">
                <span className="name">소득세 <span className="tag minus">간이세액표 §134</span></span>
                <span className="val minus">−{krw(r.monthlyIncomeTax)}</span>
              </div>
              <div className="b-row">
                <span className="name">지방소득세 <span className="tag minus">−소득세의 10%</span></span>
                <span className="val minus">−{krw(r.monthlyLocalTax)}</span>
              </div>
              <div className="b-row total">
                <span className="name">총 공제액</span>
                <span className="val">−{krw(r.totalDeduction)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="steps-section">
        <h3 className="steps-title">계산이 이렇게 진행됩니다</h3>
        <div className="steps">
          <div className="step">
            <div className="label">월 급여</div>
            <div className="value">{krw(r.grossMonthly)}</div>
          </div>
          <div className="step">
            <div className="label">4대보험 차감</div>
            <div className="value">−{krw(r.totalInsurance)}</div>
          </div>
          <div className="step">
            <div className="label">과세 표준 (월)</div>
            <div className="value">{krw(r.grossMonthly - r.totalInsurance)}</div>
          </div>
          <div className="step">
            <div className="label">소득세·지방세 차감</div>
            <div className="value">−{krw(totalTax)}</div>
          </div>
          <div className="step highlight">
            <div className="label">실수령액</div>
            <div className="value">{krw(r.netMonthly)}</div>
          </div>
        </div>
      </section>
    </>
  );
}
