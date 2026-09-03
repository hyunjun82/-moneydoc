// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: auto-tax
const round = Math.round;

// 부동소수 오차 차단용 절사: 3,000,000×0.009 = 26999.999… 처럼 수학적으로 정수인 곱이 1 낮게 잘리는 사고 방지
const safeFloor = (x) => Math.floor(Math.round(x * 1e6) / 1e6);

function calc_autoTax(input, data) {
  const C = data.constants;
  const { engineCC = 0, vehicleAge = 0, isCommercial = false } = input;
  // 비영업용 cc당 세율
  let ccRate;
  if (engineCC <= 1000) ccRate = isCommercial ? 18 : 80;
  else if (engineCC <= 1600) ccRate = isCommercial ? 18 : 140;
  else ccRate = isCommercial ? (engineCC <= 2000 ? 19 : 24) : 200;
  const baseTax = Math.round(engineCC * ccRate);
  // 사용연수 경감 (지방세법 시행령 §125): 사용연수 = 등록 후 경과년 + 1
  // 사용연수 3년차부터 5%씩, 12년 이상 50% 고정
  let discountRate = 0;
  const usageYears = vehicleAge + 1;
  if (usageYears >= 3 && usageYears < 12) discountRate = +((usageYears - 2) * 0.05).toFixed(2);
  else if (usageYears >= 12) discountRate = 0.5;
  // 위택스 실측: 상·하반기(연세액의 1/2)별로 계산하고 각각 10원 절사 → 연세액은 그 2배
  //   예) 1,999cc 5년: 반기 자동차세 159,920 → 교육세 47,970(=47,976 절사) → 연 95,940 (연 단위로 계산하면 95,952 로 어긋난다)
  const cut10 = (n) => Math.floor(n / 10) * 10;
  const halfAuto = cut10(safeFloor((baseTax * (1 - discountRate)) / 2));
  const autoTax = halfAuto * 2;
  const halfEdu = cut10(safeFloor(halfAuto * (C.EDU_TAX_RATE || 0.30)));
  const eduTax = halfEdu * 2;
  return { baseTax, discountRate, autoTax, eduTax, totalTax: autoTax + eduTax };
}

module.exports = { calc: calc_autoTax };
