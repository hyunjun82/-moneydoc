// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: medical-insurance-payout
const round = Math.round;

const min = Math.min;

const max = Math.max;

function calc_medicalInsurancePayout(input) {
  // 실손 표준약관(4세대 통원): 자기부담금 = max(보장대상 의료비 × 자기부담률, 최소 공제금액)
  //   금융위 2026.5.6 보도자료 "현행(4세대) 통원 Max[20%, 1·2만원]". 입원은 최소 공제금액 0 으로 넣는다.
  const cost = max(0, input.medicalCost);
  const selfPay = min(cost, max(round(cost * input.coPayRate), input.deductible));
  const reimbursement = cost - selfPay;
  return { reimbursement, netCost: selfPay };
}

module.exports = { calc: calc_medicalInsurancePayout };
