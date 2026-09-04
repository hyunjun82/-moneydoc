/**
 * 실측 검색어를 실제 의도로 다시 묶는다. (엑셀의 I1 은 98개가 몰려 있어 그대로 못 쓴다)
 *   입력: merged.json (analyze.mjs 가 만든 것)
 *   출력: 클러스터별 키워드 · 지식iN 질문 수 · 미분류 목록
 * 실행: node scripts/keyword-data/cluster.mjs
 */
import fs from 'node:fs';

const { keywords, questions } = JSON.parse(fs.readFileSync('scripts/keyword-data/merged.json', 'utf8'));

/** 순서가 곧 우선순위. 먼저 걸리는 클러스터로 간다 */
const CLUSTERS = [
  ['자진퇴사',      /자발적|자진퇴사|퇴사사유|퇴직사유|퇴사코드|코드\s?\d|코드 종류|권고사직|해고|계약만료|계약직/],
  ['조건',          /조건|수급자격|자격|대상|나이|몇살|피보험|180|가입기간|을 받으려면|받을 수|해당/],
  ['금액',          /금액|상한|하한|평균임금|퍼센트|얼마|한달|월|돈|최대금액|최저금액|급여액|일액/],
  ['기간',          /기간(?!조건)|일수|며칠|몇개월|소정급여|최대기간|연장|횟수|몇번/],
  ['신청',          /신청|절차|받는법|접수|방문|신고(?!.*부정)|등록|구직등록|워크넷|고용24|고용센터/],
  ['서류',          /서류|준비물|이직확인서|통장사본|증명|발급|양식/],
  ['구직활동',      /구직활동|구직외활동|재취업활동|취업활동|면접|입사지원|활동인정|실업인정|인정일/],
  ['교육',          /교육|특강|심리검사|내일배움|훈련|수강/],
  ['알바',          /알바|투잡|쿠팡|일용|단기|아르바이트|소득|프리랜서|부업|근로/],
  ['부정수급',      /부정수급|반환|추가징수|처벌|적발|조사|신고포상/],
  ['반복수급',      /반복수급|재수급|리셋|재신청|또 받|다시 받/],
  ['조기재취업',    /조기(재)?취업|취업신고|취업시|재취업수당/],
  ['지급일',        /지급일|입금|들어오|날짜|당일지급|회차|지급 ?시기/],
  ['대기기간',      /대기기간|7일|첫 ?지급|처음/],
  ['임신출산',      /임신|출산|육아|질병|아파|병가|간병|가족돌봄/],
  ['통근이사',      /통근|이사|출퇴근|왕복|거리|지역/],
  ['자영업',        /폐업|자영업|사업자|프리랜서 고용보험|특고|예술인|노무제공/],
  ['고령청년',      /65세|고령|청년|대학생|정년|나이 상한/],
  ['해외',          /해외|출국|여행|체류|입국/],
  ['회사불이익',    /회사 ?불이익|사업주|고용유지|지원금 ?제한|권고사직 ?불이익/],
  ['다른제도',      /퇴직금|근로장려금|국민연금|건강보험|보험료|대출|기초생활|중복/],
  ['계산',          /계산기|모의계산|계산|시뮬/],
  ['제도변화',      /폐지|개편|바뀌|내년|2026|개정|강화/],
];

const bucket = new Map(CLUSTERS.map(([name]) => [name, { kws: [], qs: [] }]));
const unmatchedKw = [], unmatchedQ = [];

const assign = (text) => {
  for (const [name, re] of CLUSTERS) if (re.test(text)) return name;
  return null;
};

for (const k of keywords) {
  if (k.intent === '메인키워드') continue;
  const c = assign(k.word);
  if (c) bucket.get(c).kws.push(k.word);
  else unmatchedKw.push(k.word);
}
for (const q of questions) {
  const c = assign(q.title + ' ' + q.tags.join(' '));
  if (c) bucket.get(c).qs.push(q.title);
  else unmatchedQ.push(q.title);
}

const rows = [...bucket].map(([name, v]) => ({ name, kw: v.kws.length, q: v.qs.length, words: v.kws, qs: v.qs }))
  .sort((a, b) => (b.kw * 3 + b.q) - (a.kw * 3 + a.q));

console.log(`클러스터 ${rows.filter((r) => r.kw + r.q > 0).length}개 · 미분류 키워드 ${unmatchedKw.length} · 미분류 질문 ${unmatchedQ.length}\n`);
console.log('순위  클러스터        연관검색어  지식iN질문   대표 검색어');
rows.forEach((r, i) => {
  if (r.kw + r.q === 0) return;
  console.log(
    `${String(i + 1).padStart(2)}.  ${(r.name + '            ').slice(0, 12)}  ${String(r.kw).padStart(6)}  ${String(r.q).padStart(8)}     ${r.words.slice(0, 4).join(' · ')}`
  );
});

console.log('\n── 미분류 키워드 ──\n  ' + unmatchedKw.join(' · '));
fs.writeFileSync('scripts/keyword-data/clusters.json', JSON.stringify(rows, null, 1), 'utf8');
