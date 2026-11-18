// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: daily-wage-tax
const round = Math.round;

const max = Math.max;

function calc_dailyWageTax(input, data) {
  const C = data.constants;
  const taxableDailyWage = max(0, input.dailyWage - C.EXEMPT_AMOUNT);
  // 실효세율 2.7% 를 정수 연산으로 (부동소수 오차로 999.99…원이 1,000원이 되지 않게)
  const rawDailyTax = taxableDailyWage * Math.round(C.TAX_RATE * C.CREDIT_RATE * 1e6) / 1e6;
  // 소액부징수 (소득세법 §86 제1호): 원천징수세액이 1,000원 미만이면 징수하지 않는다. 판정은 반올림 전 세액으로.
  const dailyTax = rawDailyTax < 1000 ? 0 : round(rawDailyTax);
  const dailyLocalTax = round(dailyTax * C.LOCAL_TAX_RATE);
  const totalDailyDeduct = dailyTax + dailyLocalTax;
  const netDailyWage = input.dailyWage - totalDailyDeduct;
  return { dailyTax, dailyLocalTax, totalDailyDeduct, netDailyWage, totalNet: netDailyWage * input.days };
}

module.exports = { calc: calc_dailyWageTax };
