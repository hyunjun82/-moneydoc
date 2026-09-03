// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: child-tax-credit
// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — child-tax-credit
// ═══════════════════════════════════════════════════════════════
function calc_childTaxCredit(input, data) {
  const C = data.constants;
  const { kids = 0, firstChildBorn = 0, secondChildBorn = 0, thirdPlusChildrenBorn = 0 } = input;
  // 일반 자녀세액공제 (소득세법 §59의2 ① — 8세 이상 20세 이하)
  let regularCredit = 0;
  if (kids === 1) regularCredit = C.FIRST_KID;
  else if (kids === 2) regularCredit = C.TWO_KIDS;
  else if (kids === 3) regularCredit = C.THREE_KIDS;
  else if (kids >= 4) regularCredit = C.THREE_KIDS + (kids - 3) * C.ADDITIONAL_PER_KID;
  // 출산·입양 세액공제 (소득세법 §59의2 ④)
  const newbornCredit = firstChildBorn * C.NEWBORN_FIRST + secondChildBorn * C.NEWBORN_SECOND + thirdPlusChildrenBorn * C.NEWBORN_THIRD_PLUS;
  return { regularCredit, newbornCredit, total: regularCredit + newbornCredit };
}

module.exports = { calc: calc_childTaxCredit };
