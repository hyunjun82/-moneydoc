// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: salary-net-pay
const round = Math.round;

const min = Math.min;

const max = Math.max;

// 부동소수 오차 차단용 절사: 3,000,000×0.009 = 26999.999… 처럼 수학적으로 정수인 곱이 1 낮게 잘리는 사고 방지
const safeFloor = (x) => Math.floor(Math.round(x * 1e6) / 1e6);

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — salary-net-pay
// ═══════════════════════════════════════════════════════════════
// 소득세 원천징수 정본: 국세청 근로소득 간이세액표 (2026.3.1. 이후) — 엑셀 원본을 그대로 옮긴 표
const { SIMPLIFIED_TAX_2026_03 } = require('../tables/simplified-tax-2026-03.js');

/**
 * 근로소득 간이세액표 소득세 (100% 기준, 원).
 *   monthly : 비과세 제외 월급여
 *   family  : 본인 포함 공제대상가족 수 (1 이상)
 *   kids    : 그중 8세 이상 20세 이하 자녀 수 (family−1 이하로 잘라 쓴다 — 홈택스도 초과 입력을 거부)
 * 표 본체(77만~1,000만 미만)·정확히 1,000만·1,000만 초과 6구간 산식·자녀 조정·11명 초과 규칙 모두
 * 별표2 그대로. 홈택스 조회값과 1:1 (scripts/verify-system/adapters/hometax-simplified-tax.mjs).
 */
function simplifiedIncomeTax(monthly, family, kids, T = SIMPLIFIED_TAX_2026_03) {
  const cut10 = (n) => Math.floor(n / 10) * 10;
  const base = (col) => {
    if (monthly < T.minMonthly) return 0;
    if (monthly < 10000000) {
      for (const b of T.blocks) {
        if (monthly >= b.start && monthly < b.end) return b.rows[Math.floor((monthly - b.start) / b.step)][col];
      }
      return 0;
    }
    const t10m = T.at10000000[col];
    if (monthly === 10000000) return t10m;
    let lower = 10000000;
    for (const o of T.over10000000) {
      if (o.upTo === null || monthly <= o.upTo) {
        const ratePct = Math.round(o.rate * 100);
        const excess = monthly - lower;
        // 정수 곱을 먼저 해 부동소수 오차를 없앤다 (excess × 98 × rate / 10000). 결과는 10원 절사 (홈택스 실측)
        const add = o.apply98 ? (excess * 98 * ratePct) / 10000 : (excess * ratePct) / 100;
        return cut10(t10m + o.fixed + o.plus + add + 1e-7);
      }
      lower = o.upTo;
    }
    return 0;
  };
  const fam = Math.max(1, Math.floor(family));
  let tax;
  if (fam <= 11) tax = base(fam - 1);
  else { const t11 = base(10), t10 = base(9); tax = Math.max(0, t11 - (t10 - t11) * (fam - 11)); }
  const k = Math.min(Math.max(0, Math.floor(kids)), fam - 1);
  const adjust = k === 0 ? 0 : k === 1 ? T.childAdjust.one : T.childAdjust.two + T.childAdjust.perExtraOver2 * (k - 2);
  return Math.max(0, tax - adjust);
}

function calc_salary(input, data) {
  // 소득세: 국세청 근로소득 간이세액표 조회 (홈택스 조회값과 0원 일치 — verify-3way gov 케이스)
  // 4대보험: 각 공단 고시 요율, 공단 방식 10원 절사
  const cutOff = (n, u = 10) => Math.floor(n / u) * u;
  const { annual, dependents, kids = 0, nontaxable = 0, taxRatePct = 100 } = input;
  const tax_free = nontaxable;
  const monthly_salary = Math.max(0, Math.floor(annual / 12 - tax_free));
  const family = Math.max(1, Math.floor(dependents));
  const kidsApplied = Math.min(Math.max(0, Math.floor(kids)), family - 1);

  const incomeTax100 = simplifiedIncomeTax(monthly_salary, family, kidsApplied);
  const childAdjust = simplifiedIncomeTax(monthly_salary, family, 0) - incomeTax100;
  // 근로자가 회사에 신청할 수 있는 원천징수 비율 80/100/120% (소득세법 시행령 §194) — 절사는 홈택스 실측과 동일
  const ratePct = taxRatePct === 80 || taxRatePct === 120 ? taxRatePct : 100;
  const monthlyIncomeTax = cutOff((incomeTax100 * ratePct) / 100);
  const monthlyLocalTax = monthlyIncomeTax > 0 ? cutOff(monthlyIncomeTax / 10) : 0;

  // 4대보험 요율: 2026년 (국민연금 4.75%/상한 659만·하한 41만, 건보 3.595%,
  // 장기요양 소득 대비 0.9448%의 절반, 고용보험 0.9%) — 국민연금공단·건강보험공단·고용노동부 고시, 4대사회보험 정보연계센터 모의계산과 일치
  const NP_CAP = 6590000, NP_FLOOR = 410000;
  const npBaseM = monthly_salary < NP_FLOOR ? NP_FLOOR : (monthly_salary >= NP_CAP ? NP_CAP : monthly_salary);
  const nationalPension = cutOff(safeFloor(npBaseM * 0.0475), 10);
  const healthInsurance = cutOff(safeFloor(monthly_salary * 0.03595), 10);
  // 장기요양: 보수월액 × 0.9448% ÷ 2 (공단 산식, 10원 절사) — 건보료×13.14% 근사는 10원 단위에서 어긋난다
  const longTermCare = cutOff(safeFloor(monthly_salary * 0.009448 / 2), 10);
  const employmentInsurance = cutOff(safeFloor(monthly_salary * 0.009), 10);
  const totalInsurance = nationalPension + healthInsurance + longTermCare + employmentInsurance;
  const totalDeduction = cutOff(monthlyIncomeTax + monthlyLocalTax + totalInsurance, 10);
  const grossMonthlyOriginal = Math.floor(annual / 12);
  const netMonthly = cutOff(monthly_salary + tax_free - totalDeduction, 10);
  const deductRatePct = +(totalDeduction / grossMonthlyOriginal * 100).toFixed(1);

  return {
    grossMonthly: grossMonthlyOriginal,
    nationalPension, healthInsurance, longTermCare, employmentInsurance, totalInsurance,
    monthlyIncomeTax, monthlyLocalTax, totalDeduction, netMonthly, deductRatePct,
    // 중간 계산값 (UI 표시용 — verify 대상 아님)
    monthly: monthly_salary,
    family,
    kidsApplied,
    incomeTax100,
    childAdjust,
    taxRatePct: ratePct
  };
}

module.exports = { calc: calc_salary };
