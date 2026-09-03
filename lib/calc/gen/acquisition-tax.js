// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: acquisition-tax
const round = Math.round;

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — acquisition-tax
// ═══════════════════════════════════════════════════════════════
function calc_acqTax(input, data) {
  const C = data.constants;
  const { price, houseCountAfter, adjustedArea, areaSize } = input;

  // 주택 유상거래 표준세율 (지방세법 제11조제1항제8호): 6억 이하 1% / 6~9억 구간산식 / 9억 초과 3%
  const standardRate = (p) =>
    p <= 600000000 ? 0.01
    : p <= 900000000 ? Math.round(((p / 100000000) * (2/3) - 3) * 100) / 10000 // 소수점 넷째자리 반올림
    : 0.03;

  // 중과세율 (지방세법 제13조의2 제1항)
  //  2호: 조정 2주택 또는 비조정 3주택 → 4% + 중과기준세율(2%)×200% = 8%
  //  3호: 조정 3주택 이상 또는 비조정 4주택 이상 → 4% + 중과기준세율×400% = 12%
  //  비조정 2주택은 중과 대상이 아니므로 표준세율을 그대로 적용한다.
  let rate, isHeavy = false;
  if (houseCountAfter <= 1) {
    rate = standardRate(price);
  } else if (houseCountAfter === 2) {
    if (adjustedArea) { rate = 0.08; isHeavy = true; }
    else rate = standardRate(price);
  } else if (houseCountAfter === 3) {
    rate = adjustedArea ? 0.12 : 0.08; isHeavy = true;
  } else {
    rate = 0.12; isHeavy = true;
  }

  const acquisitionTax = round(price * rate);
  // 농특세 (농어촌특별세법 제5조제1항제6호 + 시행령 §4⑦ 중과분):
  //   표준세율분  과세표준 × 0.2%
  //   8% 중과    과세표준 × 0.6%  (조정 2주택 · 비조정 3주택)
  //   12% 중과   과세표준 × 1.0%  (조정 3주택↑ · 비조정 4주택↑)
  // 국민주택규모(85㎡) 이하는 중과분까지 전액 감면(같은 법 제4조) — 위택스 미리계산 원문·조회값으로 확인(2026-09).
  const ruralRate = !isHeavy ? C.RURAL_TAX_RATE : (rate === 0.08 ? 0.006 : 0.010);
  const ruralTax = areaSize > C.RURAL_AREA_THRESHOLD ? round(price * ruralRate) : 0;
  // 지방교육세 (지방세법 제151조제1항제1호)
  //  일반(제11조제1항제8호): 해당 세율×50%를 적용해 산출한 금액의 20% = 취득세액의 10%
  //  중과(같은 호 나목, 제13조의2): (제11조제1항제7호나목 4% − 중과기준세율 2%)의 20% = 과세표준의 0.4%
  const educationTax = isHeavy
    ? round(price * (0.04 - 0.02) * 0.2)
    : round(acquisitionTax * C.EDUCATION_TAX_RATE);
  const totalTax = acquisitionTax + ruralTax + educationTax;

  return { rate: +rate.toFixed(7), acquisitionTax, ruralTax, educationTax, totalTax };
}

module.exports = { calc: calc_acqTax };
