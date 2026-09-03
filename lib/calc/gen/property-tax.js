// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: property-tax
const round = Math.round;

const max = Math.max;

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — property-tax
// ═══════════════════════════════════════════════════════════════
function calc_propertyTax(input, data) {
  const C = data.constants, T = data.tables;
  const { publicValue, isOneHomeUnder9Eok = false } = input;
  // 1주택 9억 이하 특례: 공정시장가액비율 구간 차등 + 우대 누진세율 (지방세법 §111의2)
  // 2026년 1세대1주택 공정시장가액비율: 3억 이하 43% / 3~6억 44% / 6억 초과 45%
  // — 지방세법 시행령 제109조 (2026년 한시 특례, 행정안전부 2026.4.22 개정)
  const useOneHome = isOneHomeUnder9Eok && publicValue <= 900000000;
  const oneHomeRatio = publicValue <= 300000000 ? C.FMR_ONE_HOME_UNDER_3EOK
    : publicValue <= 600000000 ? C.FMR_ONE_HOME_3_TO_6EOK
    : C.FMR_ONE_HOME_OVER_6EOK;
  const ratio = useOneHome ? oneHomeRatio : C.FAIR_MARKET_RATIO;
  const brackets = useOneHome ? T.bracketsOneHomeUnder9Eok.brackets : T.brackets.brackets;
  const taxableBase = round(publicValue * ratio);
  let propertyTax = 0;
  for (const b of brackets) {
    if (b.upperBound === null || taxableBase <= b.upperBound) {
      propertyTax = round(taxableBase * b.rate - b.progressiveDeduction);
      break;
    }
  }
  propertyTax = max(0, propertyTax);
  const educationTax = round(propertyTax * C.EDUCATION_TAX_RATE);
  const totalTax = propertyTax + educationTax;
  return { taxableBase, propertyTax, educationTax, totalTax };
}

module.exports = { calc: calc_propertyTax };
