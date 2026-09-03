// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: mortgage-loan-limit
const round = Math.round;

const min = Math.min;

const max = Math.max;

function calc_mortgageLoanLimit(input, data) {
  const C = data.constants || {};
  const { housePrice, ltv, annualIncome, monthlyExistingDebt, dsrLimit, loanYears, loanRate, regionType, stressDSR = '미적용' } = input;
  // 스트레스 금리 (금융위 3단계 스트레스 DSR 시행방안): 0.38%(1단계) → 0.75%(2단계) → 1.50%(3단계)
  const stressMap = { '미적용': 0, '1단계': 0.0038, '2단계': 0.0075, '3단계': 0.015 };
  const stress = stressMap[stressDSR] || 0;
  const appliedRate = loanRate + stress;
  const ltvLimitAmount = round(housePrice * ltv);
  // 수도권·규제지역 주택구입목적 주담대 절대한도 (금융위 2025.10.16 시행)
  // 시가 15억 이하 6억 / 15억 초과~25억 이하 4억 / 25억 초과 2억
  let absoluteCap = null;
  if (regionType === '수도권 규제·조정' || regionType === '수도권 비규제') {
    absoluteCap = housePrice <= C.CAP_THRESHOLD_15EOK ? C.CAP_15EOK_UNDER
      : housePrice <= C.CAP_THRESHOLD_25EOK ? C.CAP_15_TO_25EOK
      : C.CAP_25EOK_OVER;
  }
  const monthlyAvail = max(0, round(annualIncome * dsrLimit / 12 - monthlyExistingDebt));
  const r = appliedRate / 12, n = loanYears * 12;
  const pow = Math.pow(1 + r, n);
  const factor = r > 0 ? (pow - 1) / (r * pow) : n;
  const dsrLimitAmount = round(monthlyAvail * factor);
  let maxLoan = min(ltvLimitAmount, dsrLimitAmount);
  if (absoluteCap !== null) maxLoan = min(maxLoan, absoluteCap);
  return { ltvLimit: ltvLimitAmount, dsrLimitAmount, absoluteCap, maxLoan };
}

module.exports = { calc: calc_mortgageLoanLimit };
