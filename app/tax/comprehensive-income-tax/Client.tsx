"use client";

import { useState, useMemo } from "react";
import { calcCompIncomeTax } from "@/lib/calc/comprehensive-income-tax";
import { krw, parseKrw } from "@/lib/format";

const QUICK_PICKS = [
  { value: 30_000_000, label: "3천만" },
  { value: 50_000_000, label: "5천만" },
  { value: 80_000_000, label: "8천만" },
  { value: 150_000_000, label: "1.5억" },
  { value: 300_000_000, label: "3억" },
];

const DONUT_C = 2 * Math.PI * 54;

export function Client() {
  const [income, setIncome] = useState(50_000_000);
  const [dependents, setDependents] = useState(1);
  const [kids, setKids] = useState(0);
  const [extraDeduction, setExtraDeduction] = useState(0);
  const [extraTaxCredit, setExtraTaxCredit] = useState(0);

  const r = useMemo(
    () => calcCompIncomeTax({ income, dependents, kids, extraDeduction, extraTaxCredit }),
    [income, dependents, kids, extraDeduction, extraTaxCredit]
  );

  const netAfterTax = income - r.totalTax;
  const taxRatePct = income > 0 ? (r.totalTax / income) * 100 : 0;
  const donutFilled = DONUT_C * (Math.min(taxRatePct, 100) / 100);

  return (
    <>
      <section className="main">
        <div className="calc-grid">
          <div>
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

              <div className="input-row">
                <div className="input-label">
                  <span className="name">종합소득금액</span>
                  <span className="hint">총수입 − 필요경비</span>
                </div>
                <div className="input-box">
                  <input
                    type="text"
                    inputMode="numeric"
                    value={income.toLocaleString("ko-KR")}
                    onChange={(e) => setIncome(parseKrw(e.target.value))}
                  />
                  <span className="input-suffix">원</span>
                </div>
                <input
                  type="range"
                  className="slider"
                  min={0}
                  max={500_000_000}
                  step={1_000_000}
                  value={Math.min(income, 500_000_000)}
                  onChange={(e) => setIncome(Number(e.target.value))}
                />
                <div className="quick-pick">
                  {QUICK_PICKS.map((q) => (
                    <button
                      key={q.value}
                      className={income === q.value ? "active" : ""}
                      onClick={() => setIncome(q.value)}
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
                      <span className="name">8~20세 자녀</span>
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
                  <span className="name">추가 소득공제</span>
                  <span className="hint">국민연금·건강보험·연금저축 등</span>
                </div>
                <div className="input-box">
                  <input
                    type="text"
                    inputMode="numeric"
                    value={extraDeduction.toLocaleString("ko-KR")}
                    onChange={(e) => setExtraDeduction(parseKrw(e.target.value))}
                  />
                  <span className="input-suffix">원</span>
                </div>
              </div>

              <div className="input-row">
                <div className="input-label">
                  <span className="name">추가 세액공제</span>
                  <span className="hint">의료비·교육비·기부금·IRP 등</span>
                </div>
                <div className="input-box">
                  <input
                    type="text"
                    inputMode="numeric"
                    value={extraTaxCredit.toLocaleString("ko-KR")}
                    onChange={(e) => setExtraTaxCredit(parseKrw(e.target.value))}
                  />
                  <span className="input-suffix">원</span>
                </div>
              </div>
            </div>

            {/* DONUT */}
            <div className="viz-card">
              <div className="viz-head">소득 대비 세금 비율</div>
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
                      style={{ stroke: "#c4756e" }}
                    />
                  </svg>
                  <div className="center">
                    <div className="pct">
                      <span>{taxRatePct.toFixed(1)}</span>%
                    </div>
                    <div className="lbl">실효세율</div>
                  </div>
                </div>
                <div className="donut-legend">
                  <div className="legend-row">
                    <span className="lhs">
                      <span className="swatch s-net" />세후 소득
                    </span>
                    <span className="val">{krw(netAfterTax)}</span>
                  </div>
                  <div className="legend-row">
                    <span className="lhs">
                      <span className="swatch s-tax" />결정세액
                    </span>
                    <span className="val">−{krw(r.decisionTax)}</span>
                  </div>
                  <div className="legend-row">
                    <span className="lhs">
                      <span className="swatch s-ins" />지방소득세
                    </span>
                    <span className="val">−{krw(r.localTax)}</span>
                  </div>
                </div>
              </div>
            </div>
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

            <div className="result-hero">
              <div className="result-label">총 납부 세금 (소득세 + 지방세)</div>
              <div>
                <span className="result-value">{krw(r.totalTax)}</span>
                <span className="result-unit">원</span>
              </div>
              <div className="result-sub">
                세후 소득 <b>{krw(netAfterTax)}</b>원 · 실효세율 <b>{taxRatePct.toFixed(1)}</b>%
              </div>
            </div>

            <div className="breakdown-list">
              <div className="b-row">
                <span className="name">종합소득금액</span>
                <span className="val">{krw(income)}</span>
              </div>
              <div className="b-row">
                <span className="name">
                  인적공제 <span className="tag minus">−{dependents}명 × 150만</span>
                </span>
                <span className="val minus">−{krw(r.personalDeduction)}</span>
              </div>
              {extraDeduction > 0 && (
                <div className="b-row">
                  <span className="name">
                    추가 소득공제 <span className="tag minus">−</span>
                  </span>
                  <span className="val minus">−{krw(extraDeduction)}</span>
                </div>
              )}
              <div className="b-row">
                <span className="name">과세표준</span>
                <span className="val">{krw(r.taxableIncome)}</span>
              </div>
              <div className="b-row">
                <span className="name">
                  산출세액 <span className="tag">누진세율</span>
                </span>
                <span className="val">{krw(r.taxBeforeCredit)}</span>
              </div>
              {r.childCredit > 0 && (
                <div className="b-row">
                  <span className="name">
                    자녀세액공제 <span className="tag minus">−{kids}명</span>
                  </span>
                  <span className="val minus">−{krw(r.childCredit)}</span>
                </div>
              )}
              {extraTaxCredit > 0 && (
                <div className="b-row">
                  <span className="name">
                    추가 세액공제 <span className="tag minus">−</span>
                  </span>
                  <span className="val minus">−{krw(extraTaxCredit)}</span>
                </div>
              )}
              <div className="b-row">
                <span className="name">결정세액</span>
                <span className="val">{krw(r.decisionTax)}</span>
              </div>
              <div className="b-row">
                <span className="name">
                  지방소득세 <span className="tag minus">−10%</span>
                </span>
                <span className="val">{krw(r.localTax)}</span>
              </div>
              <div className="b-row total">
                <span className="name">총 납부 세금</span>
                <span className="val">{krw(r.totalTax)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
