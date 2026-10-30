// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: property-tax
const round = Math.round;

const max = Math.max;

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — property-tax
// ═══════════════════════════════════════════════════════════════
function calc_propertyTax(input, data) {
  const C = data.constants, T = data.tables;
  // isOneHomeUnder9Eok 는 옛 입력 이름이다. 지금 뜻은 "1세대 1주택" (공시가격과 상관없이)
  const { publicValue, isOneHomeUnder9Eok = false } = input;
  const isOneHome = !!isOneHomeUnder9Eok;
  // 1세대1주택 공정시장가액비율 3억 이하 43% / 3~6억 44% / 6억 초과 45% 는 9억 초과 주택에도 적용
  //   — 지방세법 시행령 제109조①2 "(시가표준액이 9억원을 초과하는 주택을 포함한다)" (2026년 한시 특례, 2026.4.22 개정)
  // 특례세율(0.05~0.35%)은 시가표준액 9억원 이하 1주택만 — 지방세법 §111의2① "(…9억원 이하인 주택에 한정한다)"
  const useSpecialRate = isOneHome && publicValue <= 900000000;
  const oneHomeRatio = publicValue <= 300000000 ? C.FMR_ONE_HOME_UNDER_3EOK
    : publicValue <= 600000000 ? C.FMR_ONE_HOME_3_TO_6EOK
    : C.FMR_ONE_HOME_OVER_6EOK;
  const ratio = isOneHome ? oneHomeRatio : C.FAIR_MARKET_RATIO;
  const brackets = useSpecialRate ? T.bracketsOneHomeUnder9Eok.brackets : T.brackets.brackets;
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
