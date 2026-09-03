// 자동 생성: scripts/split-engine.mjs — 직접 수정하지 말 것. 원본은 lib/calc/engine.js (검증 대상)
// 계산기: age-calculator
function calc_age(input) {
  const birth = new Date(input.birthDate);
  const today = new Date(input.todayDate);
  let westAge = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) westAge--;
  const koreanAge = today.getFullYear() - birth.getFullYear() + 1;
  const zodiacs = ["원숭이","닭","개","돼지","쥐","소","호랑이","토끼","용","뱀","말","양"];
  const zodiac = zodiacs[birth.getFullYear() % 12];
  return { westAge, koreanAge, zodiac, year: birth.getFullYear() };
}

module.exports = { calc: calc_age };
