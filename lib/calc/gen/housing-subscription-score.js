// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: housing-subscription-score
const min = Math.min;

function calc_housingSubscriptionScore(input, data) {
  const C = data.constants;
  // 무주택기간 점수 (주택공급에 관한 규칙 별표1, 청약홈 가점계산기 표와 동일):
  //   1년 미만 2점, 이후 1년마다 2점씩 (n년 이상 n+1년 미만 = (n+1)×2점), 15년 이상 32점. 유주택자·30세 미만 미혼은 0점(이 계산기는 무주택자 기준)
  const noHomeScore = input.noHomeYears < 1 ? 2 : min(C.MAX_NO_HOME, (Math.floor(input.noHomeYears) + 1) * 2);
  const familyScore = min(C.MAX_FAMILY, 5 + input.dependents * 5);
  // 청약 통장 가점: 6개월 미만 1점, 6~12개월 2점, 1년+이상 floor(years)+2점, 15년+ 17점 cap
  let accountScore;
  if (input.accountYears < 0.5) accountScore = 1;
  else if (input.accountYears < 1) accountScore = 2;
  else accountScore = min(C.MAX_ACCOUNT, Math.floor(input.accountYears) + 2);
  return { noHomeScore, familyScore, accountScore, total: noHomeScore + familyScore + accountScore };
}

module.exports = { calc: calc_housingSubscriptionScore };
