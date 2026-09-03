/**
 * v2 가이드 글 목록. 새 글 = 여기 한 줄 + articles/<slug>.mjs 스펙 하나.
 *   slug      : 라우트 /{cat}/{slug}/ 와 스펙 파일명
 *   cat       : 카테고리 라우트 (Header active 값)
 *   catLabel  : 빵부스러기 표시명
 *   crumb     : 빵부스러기 마지막 라벨
 *   blurb     : 홈·카테고리 가이드 목록의 한 줄 요약 (gen-article-index.mjs 가 읽음)
 */
export const ARTICLES = [
  { slug: 'unemployment-benefit-guide', cat: 'government', catLabel: '정부지원금', crumb: '실업급여', blurb: '하루 66,048원 · 210일 · 신청 4단계와 회차별 구직활동' },
  { slug: 'salary-net-pay-guide', cat: 'tax', catLabel: '세금', crumb: '연봉 실수령액', blurb: '연봉 2,400만~2억 실수령액 표 · 4대보험 요율 · 명세서와 다른 이유' },
];
