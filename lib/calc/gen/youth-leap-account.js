// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: youth-leap-account
const round = Math.round;

const min = Math.min;

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — youth-leap-account
// ═══════════════════════════════════════════════════════════════
function calc_youthLeap(input, data) {
  const T = data.tables;
  const { monthlyDeposit, annualIncome, interestRate } = input;

  let matching = { rate: 0, limit: 0 };
  for (const b of T.governmentMatching.brackets) {
    if (b.incomeUpper === null || annualIncome <= b.incomeUpper) {
      matching = b; break;
    }
  }
  const monthlyMatching = min(round(monthlyDeposit * matching.rate), matching.limit);
  const ownTotal = monthlyDeposit * 60;
  const matchingTotal = monthlyMatching * 60;
  // 월적립 단리: (월납 + 월매칭) × r/12 × n(n+1)/2
  const interest = round((monthlyDeposit + monthlyMatching) * interestRate / 12 * 60 * 61 / 2);
  const maturity = ownTotal + matchingTotal + interest;
  return { monthlyMatching, ownTotal, matchingTotal, interest, maturity };
}

module.exports = { calc: calc_youthLeap };
