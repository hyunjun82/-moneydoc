// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: brokerage-fee
const round = Math.round;

const min = Math.min;

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — brokerage-fee
// ═══════════════════════════════════════════════════════════════
function calc_brokerage(input, data) {
  // 공인중개사법 시행규칙 §20: 매매는 거래금액, 전세는 보증금, 월세는 보증금 + 월세×100 (그 금액이 5천만원 미만이면 보증금 + 월세×70)
  const T = data.tables;
  const { type, price, vatIncluded } = input;
  const monthlyRent = input.monthlyRent || 0, deposit = input.deposit || 0;
  let amount = price;
  if (type === 'rent_monthly' && (monthlyRent > 0 || deposit > 0)) {
    amount = deposit + monthlyRent * 100;
    if (amount < 50000000) amount = deposit + monthlyRent * 70;
  }
  const brackets = type === 'sale' ? T.saleRates.brackets : T.rentRates.brackets;
  let bracket;
  for (const b of brackets) {
    if (b.upperBound === null || amount < b.upperBound) { bracket = b; break; }
  }
  let fee = round(amount * bracket.rate);
  if (bracket.limit !== null && bracket.limit !== undefined) fee = min(fee, bracket.limit);
  const vat = vatIncluded ? round(fee * 0.10) : 0;
  const total = fee + vat;
  return { amount, rate: bracket.rate, fee, vat, total };
}

module.exports = { calc: calc_brokerage };
