// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: child-support
const round = Math.round;

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — child-support
// ═══════════════════════════════════════════════════════════════
function calc_childSupport(input, data) {
  const T = data.tables;
  const { totalIncome, childAge, nonCustodianIncome } = input;
  const ageGroups = T.supportTable.ageGroups;
  let ageIdx = 0;
  if (childAge >= 15) ageIdx = 5;
  else if (childAge >= 12) ageIdx = 4;
  else if (childAge >= 9) ageIdx = 3;
  else if (childAge >= 6) ageIdx = 2;
  else if (childAge >= 3) ageIdx = 1;
  else ageIdx = 0;
  const ageGroup = ageGroups[ageIdx];

  let row;
  for (const r of T.supportTable.rows) {
    if (r.incomeUpper === null || totalIncome < r.incomeUpper) {
      row = r; break;
    }
  }
  const standardSupport = row.values[ageIdx];
  const nonCustodianShare = round(standardSupport * (nonCustodianIncome / totalIncome));
  return { ageGroup, standardSupport, nonCustodianShare };
}

module.exports = { calc: calc_childSupport };
