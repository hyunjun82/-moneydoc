"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { calcSalaryNetPaySimpleTax, salaryNetPaySpec } from "@/lib/calc/salary-net-pay";
import { parseKrw } from "@/lib/format";

/* =========================================================================
   연봉 실수령액 계산기 — 계산기 v2 목업(calc-salary-v2.html)을 그대로 옮긴 화면.
   왼쪽 결과(월 실수령액 · 공제 내역 · "연봉 1,000만원 오르면" 한 줄) / 오른쪽 입력(모드 · 칩 · 스테퍼 · 세그먼트)
   아래 연봉별 표. 숫자는 전부 lib/calc/salary-net-pay(엔진, 홈택스 0원 일치)에서 나온다.
   간이세액 80/100/120% 는 소득세법 시행령 §194 (100% 세액의 80%·120%, 10원 미만 절사).
   ========================================================================= */

const C = salaryNetPaySpec.constants as { NP_RATE: number; HI_RATE: number; LTC_INCOME_RATE: number; EI_RATE: number };
const pct = (v: number) => `${+(v * 100).toFixed(3)}%`;
const won = (n: number) => Math.round(n).toLocaleString("ko-KR");
const manwon = (n: number) => (n >= 1e8 ? `${+(n / 1e8).toFixed((n / 1e8) % 1 ? 1 : 0)}억` : `${won(n / 1e4)}만`);
const cut = (n: number) => Math.floor(n / 10) * 10;

// 2026 최저임금: 시급 10,320 × 209시간 × 12개월 (고용노동부 2026 고시)
const MIN_ANNUAL = 10320 * 209 * 12;
const CHIPS: [number, string][] = [[MIN_ANNUAL, "최저임금"], [3e7, "3천만"], [4e7, "4천만"], [5e7, "5천만"], [6e7, "6천만"], [7e7, "7천만"], [8e7, "8천만"], [9e7, "9천만"], [1e8, "1억"], [1.5e8, "1.5억"]];
const TARGETS: [number, string][] = [[3e6, "300만"], [3.5e6, "350만"], [4e6, "400만"], [4.5e6, "450만"], [5e6, "500만"], [6e6, "600만"], [7e6, "700만"]];
const ROWS = [MIN_ANNUAL, 3e7, 4e7, 5e7, 6e7, 7e7, 8e7, 9e7, 1e8, 1.5e8, 2e8];

type In = { annual: number; dependents: number; kids: number; nontaxable: number };
function calc(i: In, ratio: number) {
  const r = calcSalaryNetPaySimpleTax(i);
  if (ratio === 1) return r;
  const it = cut(r.monthlyIncomeTax * ratio), lt = it > 0 ? cut(it / 10) : 0;
  const td = cut(it + lt + r.totalInsurance);
  return { ...r, monthlyIncomeTax: it, monthlyLocalTax: lt, totalDeduction: td, netMonthly: cut(r.grossMonthly - td) };
}
/** 목표 실수령액을 만드는 최소 연봉 (만원 단위) */
function reverse(target: number, base: Omit<In, "annual">, ratio: number) {
  let lo = 0, hi = 2_000_000_000;
  while (hi - lo > 10000) { const mid = Math.floor((lo + hi) / 2 / 10000) * 10000; if (calc({ ...base, annual: mid }, ratio).netMonthly >= target) hi = mid; else lo = mid + 10000; }
  while (hi > 10000 && calc({ ...base, annual: hi - 10000 }, ratio).netMonthly >= target) hi -= 10000;
  return hi;
}

export function SalaryNetPayClient() {
  const [mode, setMode] = useState<"fwd" | "rev">("fwd");
  const [annual, setAnnual] = useState(5e7);
  const [target, setTarget] = useState(4e6);
  const [dependents, setDependents] = useState(1);
  const [kids, setKids] = useState(0);
  const [nontaxable, setNontaxable] = useState(0);
  const [ratio, setRatio] = useState(1);
  const [copied, setCopied] = useState(false);
  const mounted = useRef(false);

  useEffect(() => {
    try {
      const p = new URLSearchParams(window.location.search);
      if (p.get("a")) setAnnual(+p.get("a")!); if (p.get("t")) setTarget(+p.get("t")!);
      if (p.get("d")) setDependents(+p.get("d")!); if (p.get("k")) setKids(+p.get("k")!);
      if (p.get("n")) setNontaxable(+p.get("n")!); if (p.get("r")) setRatio(+p.get("r")!);
      if (p.get("m") === "rev") setMode("rev");
    } catch { /* noop */ }
    mounted.current = true;
  }, []);

  const base = { dependents, kids: Math.min(kids, Math.max(0, dependents - 1)), nontaxable };
  const effAnnual = mode === "rev" ? reverse(target, base, ratio) : annual;
  const r = useMemo(() => calc({ ...base, annual: effAnnual }, ratio), [effAnnual, dependents, kids, nontaxable, ratio]); // eslint-disable-line react-hooks/exhaustive-deps
  const up = calc({ ...base, annual: effAnnual + 1e7 , }, ratio);
  const gain = up.netMonthly - r.netMonthly;

  useEffect(() => {
    if (!mounted.current) return;
    try { window.history.replaceState(null, "", `?${new URLSearchParams({ a: String(effAnnual), t: String(target), d: String(dependents), k: String(kids), n: String(nontaxable), r: String(ratio), m: mode })}`); } catch { /* noop */ }
  }, [effAnnual, target, dependents, kids, nontaxable, ratio, mode]);

  const copy = async () => { try { await navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { /* noop */ } };
  const rows: [string, number][] = [
    [`국민연금 ${pct(C.NP_RATE)}`, r.nationalPension], [`건강보험 ${pct(C.HI_RATE)}`, r.healthInsurance], [`장기요양 ${pct(C.LTC_INCOME_RATE / 2)}`, r.longTermCare], [`고용보험 ${pct(C.EI_RATE)}`, r.employmentInsurance],
    [`소득세${ratio !== 1 ? ` (${ratio * 100}%)` : ""}`, r.monthlyIncomeTax], ["지방소득세", r.monthlyLocalTax],
  ];
  const table = useMemo(() => ROWS.map((a) => ({ a, r: calcSalaryNetPaySimpleTax({ annual: a, dependents: 1, kids: 0, nontaxable: 0 }) })), []);

  return (
    <section className="main">
      <div className="gc">
        <div className="gc-card gc-res">
          <div className="gc-res-l"><span>{mode === "rev" ? "필요한 세전 연봉 (비과세 제외)" : "월 실수령액"}</span><button type="button" onClick={copy}>{copied ? "복사됨" : "링크 복사"}</button></div>
          <div className="gc-res-v">{won(mode === "rev" ? effAnnual : r.netMonthly)}<small>원</small></div>
          <div className="gc-res-s">{mode === "rev" ? `월 실수령 ${won(r.netMonthly)}원 · 부양가족 ${dependents}명 · 세전 월 ${won(r.grossMonthly)}원` : `연봉 ${manwon(effAnnual)}원 · 부양가족 ${dependents}명 · 세전 월 ${won(r.grossMonthly)}원`}</div>
          <ul className="gc-rows">
            {rows.map(([k, v]) => <li key={k}><span>{k}</span><b className="minus">−{won(v)}</b></li>)}
            <li className="tot"><span>공제 합계</span><b>−{won(r.totalDeduction)}</b></li>
          </ul>
          <div className="gc-rev">연봉 1,000만원 오르면 실수령은 월 <b>+{won(gain)}원</b> (연 {won(gain * 12)}원). 인상분의 {Math.round(gain * 12 / 1e7 * 100)}%가 남아요.</div>
          <div className="gc-trust"><i />국세청 2026.3 간이세액표 · 4대보험 2026 공단 요율 · 홈택스 5케이스 0원 일치</div>
        </div>

        <div className="gc-card">
          <div className="gc-mode">
            <button type="button" className={mode === "fwd" ? "on" : ""} onClick={() => setMode("fwd")}>연봉 → 실수령액</button>
            <button type="button" className={mode === "rev" ? "on" : ""} onClick={() => setMode("rev")}>실수령액 → 연봉</button>
          </div>
          {mode === "fwd" ? (
            <div className="gc-f">
              <label>연봉<em>세전, 비과세 제외</em></label>
              <div className="gc-in"><input type="text" inputMode="numeric" value={won(annual)} onChange={(e) => setAnnual(parseKrw(e.target.value))} /><span>원</span></div>
              <div className="gc-chips">{CHIPS.map(([v, l]) => <button key={v} type="button" className={v === annual ? "on" : ""} onClick={() => setAnnual(v)}>{l}</button>)}</div>
            </div>
          ) : (
            <div className="gc-f">
              <label>목표 월 실수령액<em>통장에 찍히길 바라는 금액</em></label>
              <div className="gc-in"><input type="text" inputMode="numeric" value={won(target)} onChange={(e) => setTarget(parseKrw(e.target.value))} /><span>원</span></div>
              <div className="gc-chips">{TARGETS.map(([v, l]) => <button key={v} type="button" className={v === target ? "on" : ""} onClick={() => setTarget(v)}>{l}</button>)}</div>
            </div>
          )}
          <div className="gc-two">
            <div className="gc-f">
              <label>부양가족<em>본인 포함</em></label>
              <div className="gc-step"><button type="button" onClick={() => setDependents(Math.max(1, dependents - 1))}>−</button><b>{dependents}</b><button type="button" onClick={() => setDependents(Math.min(11, dependents + 1))}>+</button></div>
            </div>
            <div className="gc-f">
              <label>8~20세 자녀<em>부양가족 중</em></label>
              <div className="gc-step"><button type="button" onClick={() => setKids(Math.max(0, kids - 1))}>−</button><b>{Math.min(kids, Math.max(0, dependents - 1))}</b><button type="button" onClick={() => setKids(Math.min(dependents - 1, kids + 1))}>+</button></div>
            </div>
          </div>
          <div className="gc-f">
            <label>비과세액<em>월 · 식대 등, 보통 0~20만</em></label>
            <div className="gc-in"><input type="text" inputMode="numeric" value={won(nontaxable)} onChange={(e) => setNontaxable(parseKrw(e.target.value))} /><span>원</span></div>
          </div>
          <div className="gc-f">
            <label>간이세액 비율<em>회사 신청값 · 명세서와 맞출 때</em></label>
            <div className="gc-seg" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
              {[0.8, 1, 1.2].map((v) => <button key={v} type="button" className={ratio === v ? "on" : ""} onClick={() => setRatio(v)}>{v * 100}%</button>)}
            </div>
          </div>
        </div>
      </div>

      <div className="gc-tw-wrap">
        <h2 className="gc-h2">연봉별 실수령액<i>2026년 · 부양가족 1명 · 비과세 0</i></h2>
        <div className="gc-tw"><table>
          <thead><tr><th>연봉</th><th>월 세전</th><th>4대보험</th><th>소득세+지방세</th><th>월 실수령</th><th>연 실수령</th></tr></thead>
          <tbody>
            {table.map(({ a, r: t }) => (
              <tr key={a} className={a === effAnnual ? "hi" : ""} onClick={() => { setMode("fwd"); setAnnual(a); }} title="이 연봉으로 계산">
                <td>{a === MIN_ANNUAL ? `최저임금 (${manwon(a)})` : manwon(a)}</td><td>{won(t.grossMonthly)}</td><td>{won(t.totalInsurance)}</td><td>{won(t.monthlyIncomeTax + t.monthlyLocalTax)}</td><td>{won(t.netMonthly)}</td><td>{won(t.netMonthly * 12)}</td>
              </tr>
            ))}
          </tbody>
        </table></div>
        <p className="gc-tn">최저임금은 시급 10,320원 × 209시간 × 12개월 = {won(MIN_ANNUAL)}원(고용노동부 2026 고시). 표는 계산 엔진이 만들어요. 줄을 누르면 그 연봉으로 계산돼요.</p>
      </div>
    </section>
  );
}
