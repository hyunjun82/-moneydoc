/**
 * 62편 계획에 계산기 연결과 내부링크를 넣는다.
 *
 * 계산기 버튼은 모든 글에 넣지 않는다. 실업급여 계산기가 내놓는 건
 * 일액 · 소정급여일수 · 총액 뿐이다. 그 숫자가 글의 답인 편에만 단다.
 * 나머지 편은 답이 절차나 조건이라 계산기를 달 이유가 없다.
 *
 * 내부링크는 "읽고 나서 자연히 생기는 다음 질문" 으로만 건다.
 * 관련글 목록을 기계적으로 붙이지 않는다.
 *
 * 실행: node scripts/title-system/add-links.mjs
 */
import fs from 'node:fs';

const FILE = 'scripts/title-system/titles.unemployment-v2.json';
const d = JSON.parse(fs.readFileSync(FILE, 'utf8'));

/** 계산기가 답을 주는 편. 값은 계산기를 다는 이유 */
const CALC = {
  eligibility: '조건을 다 채운 사람이 다음에 묻는 건 얼마인지다',
  amount: '상한액 하한액이 내 경우 얼마로 적용되는지 눌러 봐야 안다',
  'by-salary': '표에 없는 월급은 직접 넣어 봐야 한다',
  total: '총 수령액이 이 글의 답이다',
  days: '소정급여일수가 이 글의 답이고, 계산기가 같은 값을 낸다',
  'average-wage': '평균임금을 넣으면 일액이 바로 나온다',
  'early-reemployment': '남은 급여의 절반을 계산하려면 총액이 먼저 필요하다',
};

/** 읽고 나서 생기는 다음 질문으로만 건다 */
const LINKS = {
  eligibility: [['180days', '180일을 어떻게 채우는지'], ['voluntary', '자발적 퇴사도 되는지'], ['days', '되면 며칠 받는지']],
  '180days': [['eligibility', '180일 말고 다른 조건'], ['merge-periods', '전 직장 기간도 합쳐지는지'], ['short-hours', '주 15시간 미만이면']],
  'no-insurance': [['eligibility', '가입이 확인되면 다음 조건'], ['merge-periods', '소급된 기간의 합산']],
  'merge-periods': [['180days', '합산해서 180일을 채우는 계산'], ['eligibility', '합산 뒤 나머지 조건']],
  'short-hours': [['180days', '초단시간의 180일 계산'], ['part-time-job', '수급 중 초단시간 근로']],
  elderly: [['eligibility', '나이 말고 나머지 조건'], ['days', '나이가 소정급여일수를 가른다']],
  student: [['short-hours', '주 15시간 미만 알바'], ['180days', '방학 알바로 180일 채우기']],
  'special-worker': [['eligibility', '특고가 아닌 경우의 조건'], ['artist', '예술인은 기준이 다르다']],
  artist: [['special-worker', '특고와 무엇이 다른지']],

  voluntary: [['eligibility', '인정돼도 나머지 조건은 남는다'], ['exit-code', '사유가 코드로 어떻게 찍히는지'], ['confirmation', '회사가 다르게 적었을 때']],
  layoff: [['exit-code', '권고사직의 이직코드'], ['employer', '회사 불이익이 걱정될 때'], ['confirmation', '자진퇴사로 처리됐을 때']],
  'contract-end': [['180days', '계약만료로 180일 채우기'], ['exit-code', '계약만료 이직코드'], ['voluntary', '재계약 거절이 자발로 잡힐 때']],
  harassment: [['voluntary', '다른 자발적 퇴사 사유'], ['unpaid-wage-quit', '노동청 진정을 함께 할 때']],
  'unpaid-wage-quit': [['voluntary', '다른 자발적 퇴사 사유'], ['severance', '퇴직금까지 밀렸을 때']],
  'unfair-dismissal': [['layoff', '권고사직과 무엇이 다른지'], ['exit-code', '해고의 이직코드']],
  commute: [['voluntary', '다른 자발적 퇴사 사유'], ['pregnancy', '육아로 옮겨야 할 때']],
  sickness: [['pregnancy', '수급기간 연기가 필요할 때'], ['deadline', '미루면 신청기간은 어떻게 되는지']],
  pregnancy: [['deadline', '연기하면 12개월은 어떻게 되는지'], ['sickness', '질병으로 미룰 때']],
  'exit-code': [['confirmation', '코드가 틀렸을 때 고치는 법'], ['voluntary', '자발적 퇴사로 찍혔을 때'], ['contract-end', '계약만료 코드']],

  amount: [['by-salary', '내 월급이면 얼마인지'], ['days', '며칠 받는지'], ['total', '다 합치면 얼마인지']],
  'by-salary': [['amount', '상한과 하한에 걸리는 구간'], ['average-wage', '월급이 아니라 평균임금으로 센다'], ['total', '총액']],
  'average-wage': [['by-salary', '평균임금이 정해지면 일액'], ['confirmation', '이직확인서의 평균임금이 틀렸을 때']],
  total: [['days', '며칠 받는지가 총액을 가른다'], ['payday', '언제 나눠 들어오는지'], ['tax', '세금을 떼는지']],
  tax: [['health-insurance', '건강보험료는 어떻게 되는지'], ['total', '실제로 손에 쥐는 금액']],

  days: [['eligibility', '가입기간을 어떻게 세는지'], ['total', '일수에 일액을 곱하면 총액'], ['extension', '다 쓰면 연장되는지']],
  waiting: [['payday', '첫 급여가 언제 들어오는지'], ['round-1', '1차 실업인정일']],
  deadline: [['apply', '서둘러 신청하는 법'], ['pregnancy', '미뤄야 할 사정이 있을 때']],
  extension: [['days', '소정급여일수를 다 쓴 뒤'], ['job-support', '연장이 안 되면 국민취업지원제도']],

  apply: [['documents', '무엇을 챙겨 가는지'], ['confirmation', '이직확인서가 안 올라왔을 때'], ['round-1', '1차 실업인정일에 할 일'], ['deadline', '언제까지 신청해야 하는지']],
  documents: [['confirmation', '이직확인서만 따로'], ['apply', '서류를 들고 가는 순서'], ['center', '어느 센터로 가는지']],
  confirmation: [['exit-code', '코드가 뜻하는 사유'], ['average-wage', '평균임금이 틀렸을 때'], ['apply', '정정 뒤 신청 이어가기']],
  center: [['apply', '방문해서 하는 일'], ['documents', '가져갈 서류']],
  education: [['round-1', '교육 뒤 1차 실업인정'], ['other-activity', '취업특강은 구직외활동으로도 쓰인다']],

  'job-search': [['round-1', '1차에 필요한 횟수'], ['round-4', '4차부터 2회'], ['interview', '면접을 증빙으로 쓸 때']],
  'round-1': [['education', '먼저 들어야 하는 교육'], ['job-search', '무엇이 구직활동인지'], ['round-4', '다음 회차부터 달라지는 점']],
  'round-4': [['job-search', '무엇이 구직활동인지'], ['other-activity', '2회 중 하나를 채우는 법'], ['round-1', '1차는 어땠는지']],
  interview: [['job-search', '다른 구직활동 증빙'], ['report-job', '면접에 붙어 취업했을 때']],
  'other-activity': [['job-search', '구직활동과 무엇이 다른지'], ['round-4', '2회를 채우는 조합'], ['education', '취업특강']],
  'change-date': [['round-4', '회차별 인정 기준'], ['payday', '인정일이 밀리면 지급일도 밀린다']],

  'part-time-job': [['daily-worker', '일용직으로 일할 때'], ['fraud', '신고를 빠뜨리면'], ['report-job', '아예 취업이 됐을 때']],
  'daily-worker': [['part-time-job', '일반 알바와 무엇이 다른지'], ['180days', '일용직의 180일']],
  platform: [['part-time-job', '알바 신고 기준'], ['freelance', '3.3% 떼는 소득일 때']],
  freelance: [['platform', '플랫폼 일감일 때'], ['startup', '사업자를 낼 때']],
  startup: [['freelance', '사업자 없이 일할 때'], ['early-reemployment', '창업으로 받는 수당']],
  overseas: [['change-date', '인정일을 옮기는 법'], ['fraud', '신고를 빠뜨리면']],
  study: [['other-activity', '훈련이 활동으로 인정되는지'], ['extension', '훈련연장급여']],

  fraud: [['fraud-report', '자진신고하면 달라지는 점'], ['part-time-job', '알바 신고를 빠뜨린 경우'], ['repeat', '앞으로 받을 때 불이익']],
  'fraud-report': [['fraud', '처벌과 반환 금액'], ['part-time-job', '어디까지 신고해야 하는지']],
  repeat: [['days', '감액이 붙는 소정급여일수'], ['changes-2026', '기준이 바뀌는 부분']],
  'early-reemployment': [['report-job', '취업 신고가 먼저다'], ['total', '남은 급여가 얼마인지'], ['startup', '창업으로 받을 때']],
  'report-job': [['early-reemployment', '빨리 취업하면 받는 수당'], ['part-time-job', '취업이 아니라 알바일 때']],
  'give-up': [['deadline', '수급기간 12개월'], ['repeat', '다시 신청할 때 감액']],

  payday: [['waiting', '첫 회차가 늦는 이유'], ['total', '회차별로 얼마씩인지'], ['change-date', '인정일이 밀렸을 때']],
  'last-round': [['extension', '더 받을 수 있는지'], ['job-support', '끝난 뒤 이어갈 제도']],

  'health-insurance': [['tax', '실업급여에 붙는 다른 부담'], ['pension-credit', '국민연금도 챙길 때']],
  'pension-credit': [['health-insurance', '건강보험료는 어떻게 되는지'], ['tax', '실업급여와 세금']],
  severance: [['unpaid-wage-quit', '퇴직금이 밀렸을 때'], ['total', '실업급여 총액']],
  eitc: [['tax', '실업급여가 소득에 들어가는지'], ['job-support', '다른 지원 제도']],
  'job-support': [['extension', '연장급여가 안 될 때'], ['last-round', '수급이 끝난 뒤']],
  'industrial-accident': [['sickness', '아파서 그만둔 경우'], ['deadline', '수급기간을 미룰 때']],

  employer: [['layoff', '권고사직으로 처리할 때'], ['confirmation', '이직확인서를 두고 다툴 때']],
  'changes-2026': [['repeat', '반복수급 감액'], ['amount', '올해 상한액 하한액']],
};

const all = new Map(d.groups.flatMap((g) => g.spokes).map((s) => [s.slug, s]));
let calcOn = 0;
const bad = [];

for (const [slug, s] of all) {
  if (CALC[slug]) { s.calc = { on: true, why: CALC[slug] }; calcOn++; }
  else s.calc = { on: false, why: '답이 숫자가 아니라 절차나 조건이다. 계산기를 달 이유가 없다' };

  const links = LINKS[slug];
  if (!links) { bad.push(`${slug}: 내부링크가 없다`); continue; }
  for (const [to] of links) if (!all.has(to)) bad.push(`${slug} → ${to}: 없는 글이다`);
  s.links = links.map(([to, why]) => ({ to, why }));
}

d._계산기규칙 = '계산기 버튼은 계산기가 내는 숫자(일액·소정급여일수·총액)가 그 글의 답인 편에만 단다. 나머지는 달지 않는다';
d._링크규칙 = '내부링크는 읽고 나서 자연히 생기는 다음 질문으로만 건다. 관련글 목록을 기계적으로 붙이지 않는다';

if (bad.length) { console.error('FAIL'); bad.forEach((b) => console.error('  ' + b)); process.exit(1); }

fs.writeFileSync(FILE, JSON.stringify(d, null, 2).replace(/\r\n/g, '\n') + '\n', 'utf8');
const linkCount = [...all.values()].reduce((a, s) => a + s.links.length, 0);
console.log(`계산기 다는 글 ${calcOn}편 / ${all.size}편 · 안 다는 글 ${all.size - calcOn}편`);
console.log(`내부링크 ${linkCount}개 · 편당 평균 ${(linkCount / all.size).toFixed(1)}개`);
