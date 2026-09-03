// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: subscription-priority
function calc_subscriptionPriority(input, data) {
  const C = data.constants;
  const req = C.REGION_REQUIREMENTS[input.region] || C.REGION_REQUIREMENTS.nonMetro;
  const requiredMonths = req.months;
  const requiredDeposits = req.deposits;
  const accountOk = input.accountMonths >= requiredMonths;
  const depositOk = input.depositCount >= requiredDeposits;
  const noHomeOk = !!input.isNoHome;
  return { requiredMonths, requiredDeposits, accountOk, depositOk, noHomeOk, isEligible: accountOk && depositOk && noHomeOk };
}

module.exports = { calc: calc_subscriptionPriority };
