// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: medical-insurance-payout
const round = Math.round;

const max = Math.max;

function calc_medicalInsurancePayout(input) {
  const generalCost = input.medicalCost - input.deductible;
  const reimbursement = round(max(0, generalCost) * (1 - input.coPayRate));
  return { reimbursement: max(0, reimbursement), netCost: input.medicalCost - max(0, reimbursement) };
}

module.exports = { calc: calc_medicalInsurancePayout };
