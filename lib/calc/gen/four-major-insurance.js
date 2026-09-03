// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: four-major-insurance
const round = Math.round;

const min = Math.min;

const max = Math.max;

// 부동소수 오차 차단용 절사: 3,000,000×0.009 = 26999.999… 처럼 수학적으로 정수인 곱이 1 낮게 잘리는 사고 방지
const safeFloor = (x) => Math.floor(Math.round(x * 1e6) / 1e6);

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — four-major-insurance
// ═══════════════════════════════════════════════════════════════
function calc_fourMajorInsurance(input, data) {
  // 통합: 근로자 부담 + 회사 부담 동시 산출
  // 인재채움뱅크 (고용노동부) 요율 기준: base = 월급 - 비과세
  const C = data.constants;
  const { monthlySalary, nontaxable = 0, workCompRate = 0.007 } = input;
  const baseSalary = Math.max(0, Math.floor(monthlySalary - nontaxable));
  const cutOff = (n, u) => Math.floor(n / u) * u;
  const npBase = Math.min(Math.max(baseSalary, C.NP_FLOOR), C.NP_CAP);
  
  // 근로자 (사용자 본인 부담) — 인재채움뱅크 산식
  const employeeNP = cutOff(safeFloor(npBase * C.NP_RATE), 10);
  const employeeHI = cutOff(safeFloor(baseSalary * C.HI_RATE), 10);
  // 장기요양보험료: 공단 산식 = 보수월액 × 장기요양보험료율(소득 대비 0.9448%, 2026) ÷ 2, 10원 절사 — 4대사회보험 정보연계센터 모의계산 대조
  const employeeLTC = cutOff(safeFloor(baseSalary * C.LTC_INCOME_RATE / 2), 10);
  const employeeEI = cutOff(safeFloor(baseSalary * C.EI_RATE), 10);
  const employeeTotal = employeeNP + employeeHI + employeeLTC + employeeEI;

  // 회사 부담 (사업주)
  const employerNP = cutOff(safeFloor(npBase * C.NP_RATE), 10);
  const employerHI = cutOff(safeFloor(baseSalary * C.HI_RATE), 10);
  const employerLTC = cutOff(safeFloor(baseSalary * C.LTC_INCOME_RATE / 2), 10);
  const employerEI = cutOff(safeFloor(baseSalary * (C.EI_RATE_EMPLOYER || 0.0115)), 10);
  const employerWC = cutOff(safeFloor(baseSalary * workCompRate), 10);
  const employerTotal = employerNP + employerHI + employerLTC + employerEI + employerWC;
  
  return {
    employeeNP, employeeHI, employeeLTC, employeeEI, employeeTotal,
    employerNP, employerHI, employerLTC, employerEI, employerWC, employerTotal,
    grandTotal: employeeTotal + employerTotal
  };
}

module.exports = { calc: calc_fourMajorInsurance };
