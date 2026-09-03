// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: daily-wage-tax
const round = Math.round;

const max = Math.max;

function calc_dailyWageTax(input, data) {
  const C = data.constants;
  const taxableDailyWage = max(0, input.dailyWage - C.EXEMPT_AMOUNT);
  const rawDailyTax = round(taxableDailyWage * C.TAX_RATE * C.CREDIT_RATE);
  // 소액부징수 (국세기본법 §86): 결정세액이 1,000원 미만이면 부과 안 함
  const dailyTax = rawDailyTax < 1000 ? 0 : rawDailyTax;
  const dailyLocalTax = round(dailyTax * C.LOCAL_TAX_RATE);
  const totalDailyDeduct = dailyTax + dailyLocalTax;
  const netDailyWage = input.dailyWage - totalDailyDeduct;
  return { dailyTax, dailyLocalTax, totalDailyDeduct, netDailyWage, totalNet: netDailyWage * input.days };
}

module.exports = { calc: calc_dailyWageTax };
