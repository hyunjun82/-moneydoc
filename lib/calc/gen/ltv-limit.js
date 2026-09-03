// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: ltv-limit
const round = Math.round;

const min = Math.min;

const max = Math.max;

// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — ltv-limit
// ═══════════════════════════════════════════════════════════════
function calc_ltvLimit(input, data) {
  const C = data.constants, T = data.tables;
  const { housePrice, category, regionType, area = 'seoul', numRooms = 1, leaseDeposit = 0, roomDeduction = 'yes' } = input;
  
  // LTV rules lookup
  const rule = T.ltvRules.rules.find(r => r.category === category && r.regionType === regionType);
  const ltv = rule ? rule.ltv : 0;
  const ltvLimit = round(housePrice * ltv);
  
  // 방 공제 (소액보증금)
  const depositMap = {
    seoul: C.DEPOSIT_SEOUL,
    metroPark: C.DEPOSIT_METRO_PARK,
    gwangyok: C.DEPOSIT_GWANGYOK,
    other: C.DEPOSIT_OTHER
  };
  const deposit = depositMap[area] || C.DEPOSIT_OTHER;
  const roomDed = roomDeduction === 'yes' ? max(0, numRooms - 1) * deposit : 0;
  
  // 절대 한도 cap
  // 수도권·규제지역 주택구입목적 주담대 절대한도 (금융위 2025.10.16 시행)
  // 시가 15억 이하 6억 / 15억 초과~25억 이하 4억 / 25억 초과 2억
  let absoluteCap = null;
  if (regionType === 'regulated' || regionType === 'metroOther') {
    absoluteCap = housePrice <= C.CAP_THRESHOLD_15EOK ? C.CAP_15EOK_UNDER
      : housePrice <= C.CAP_THRESHOLD_25EOK ? C.CAP_15_TO_25EOK
      : C.CAP_25EOK_OVER;
  }
  
  const afterDeduct = max(0, ltvLimit - roomDed - leaseDeposit);
  const maxLoan = absoluteCap !== null ? min(afterDeduct, absoluteCap) : afterDeduct;
  
  // 우선변제 한도 = min(소액보증금, 주택가격/2)
  const priorityClaim = min(deposit, round(housePrice / 2));
  
  return { ltv, ltvLimit, roomDeduction: roomDed, leaseDeductTotal: leaseDeposit, absoluteCap, maxLoan, priorityClaim };
}

module.exports = { calc: calc_ltvLimit };
