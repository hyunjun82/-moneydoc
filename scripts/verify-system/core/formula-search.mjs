/**
 * 산식 후보 자동 시도 (Dreaming 식 자가개선)
 *
 * 정부 표준값이 주어졌을 때, 여러 후보 산식 중 일치하는 것을 자동 선택.
 * 대출 PMT 4가지 모드 각각에 대한 후보들을 정의.
 */

// ─── 원리금균등 후보들 ────────────────────────────────────────────
function pmtKoreanStandard(P, r, n) {
  // 한국 표준: 회차별 round + 마지막 잔금 정산 (HF/은행)
  if (r === 0) return { monthly: Math.round(P / n), totalInterest: 0 };
  const pow = Math.pow(1 + r, n);
  const PMT = Math.round((P * r * pow) / (pow - 1));
  let bal = P, ti = 0;
  for (let i = 1; i <= n; i++) {
    const intr = Math.round(bal * r);
    const pri = i === n ? bal : PMT - intr;
    bal -= pri;
    ti += intr;
  }
  return { monthly: PMT, totalInterest: ti };
}

function pmtRawSimple(P, r, n) {
  // raw PMT × n - P (반올림 X)
  if (r === 0) return { monthly: Math.round(P / n), totalInterest: 0 };
  const pow = Math.pow(1 + r, n);
  const pmtRaw = (P * r * pow) / (pow - 1);
  return {
    monthly: Math.round(pmtRaw),
    totalInterest: Math.round(pmtRaw * n - P),
  };
}

function pmtRoundedSimple(P, r, n) {
  // round(PMT) × n - P
  if (r === 0) return { monthly: Math.round(P / n), totalInterest: 0 };
  const pow = Math.pow(1 + r, n);
  const PMT = Math.round((P * r * pow) / (pow - 1));
  return { monthly: PMT, totalInterest: PMT * n - P };
}

function pmtFirstRawRest(P, r, n) {
  // 첫 회차 round 안함, 나머지 round (잘못된 패턴 — 참고용)
  if (r === 0) return { monthly: Math.round(P / n), totalInterest: 0 };
  const pow = Math.pow(1 + r, n);
  const PMT = Math.round((P * r * pow) / (pow - 1));
  let bal = P, ti = 0;
  for (let i = 1; i <= n; i++) {
    const intr = i === 1 ? bal * r : Math.round(bal * r);
    bal = i === 1 ? P - PMT + intr : bal - Math.round(PMT - intr);
    ti += intr;
  }
  return { monthly: PMT, totalInterest: Math.round(ti) };
}

// ─── 후보 등록소 ──────────────────────────────────────────────────
export const FORMULA_CANDIDATES = {
  amortization: [
    { id: 'korean-standard', label: '한국 표준 (회차별 round + 잔금 정산)', fn: pmtKoreanStandard },
    { id: 'raw-simple', label: 'raw PMT × n - P', fn: pmtRawSimple },
    { id: 'rounded-simple', label: 'round(PMT) × n - P', fn: pmtRoundedSimple },
    { id: 'first-raw-rest', label: '첫회차 raw + 나머지 round', fn: pmtFirstRawRest },
  ],
};

/**
 * 정부값과 일치하는 산식 자동 탐색
 * @param {string} mode - amortization / decline / balloon / grace
 * @param {object} input - { principal, rate, years, ... }
 * @param {object} govExpected - { monthly, totalInterest, ... }
 * @returns {object|null} 일치 산식 정보 또는 null
 */
export function findMatchingFormula(mode, input, govExpected, tolerance = 0) {
  const candidates = FORMULA_CANDIDATES[mode] || [];
  const r = input.rate / 12;
  const n = input.years * 12;

  const results = [];
  for (const cand of candidates) {
    const got = cand.fn(input.principal, r, n);
    const match = Object.keys(govExpected).every(k => {
      if (got[k] === undefined) return true; // 비교 불가는 통과
      return Math.abs(got[k] - govExpected[k]) <= tolerance;
    });
    results.push({ ...cand, got, match });
    if (match) {
      return { winner: cand, all: results };
    }
  }
  return { winner: null, all: results };
}
