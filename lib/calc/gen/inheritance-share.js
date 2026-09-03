// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: inheritance-share
const round = Math.round;

function calc_inheritanceShare(input) {
  const result = { spouse: 0, child: 0, parent: 0, sibling: 0 };
  if (input.children > 0) {
    const totalShares = input.children * 1.0 + (input.hasSpouse ? 1.5 : 0);
    result.spouse = input.hasSpouse ? round(input.totalEstate * 1.5 / totalShares) : 0;
    result.child = round(input.totalEstate * 1.0 / totalShares);
  } else if (input.parents > 0) {
    const totalShares = input.parents * 1.0 + (input.hasSpouse ? 1.5 : 0);
    result.spouse = input.hasSpouse ? round(input.totalEstate * 1.5 / totalShares) : 0;
    result.parent = round(input.totalEstate * 1.0 / totalShares);
  } else if (input.hasSpouse) {
    result.spouse = input.totalEstate;
  } else if (input.siblings > 0) {
    result.sibling = round(input.totalEstate / input.siblings);
  }
  return result;
}

module.exports = { calc: calc_inheritanceShare };
