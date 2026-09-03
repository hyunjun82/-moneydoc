// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: dti-limit
const round = Math.round;

function calc_dtiLimit(input) {
  const { annualIncome, monthlyOtherDebtInterest, loanYears, loanRate, dtiLimit, stressDSR = '미적용' } = input;
  // 스트레스 금리 (금융위 3단계 스트레스 DSR 시행방안): 0.38%(1단계) → 0.75%(2단계) → 1.50%(3단계)
  const stressMap = { '미적용': 0, '1단계': 0.0038, '2단계': 0.0075, '3단계': 0.015 };
  const stress = stressMap[stressDSR] || 0;
  const appliedRate = loanRate + stress;
  const monthlyAvail = round(annualIncome * dtiLimit / 12 - monthlyOtherDebtInterest);
  if (monthlyAvail <= 0) return { appliedRate, monthlyAvail: 0, maxLoan: 0 };
  const r = appliedRate / 12, n = loanYears * 12;
  const pow = Math.pow(1 + r, n);
  const factor = r > 0 ? (pow - 1) / (r * pow) : n;
  return { appliedRate, monthlyAvail, maxLoan: round(monthlyAvail * factor) };
}

module.exports = { calc: calc_dtiLimit };
