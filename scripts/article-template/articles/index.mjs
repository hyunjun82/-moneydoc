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
  { slug: 'severance-pay-guide', cat: 'law', catLabel: '법률', crumb: '퇴직금', blurb: '평균임금 계산 순서 · 근속·월급별 표 · 14일 지급기한과 중간정산' },
  { slug: 'four-major-insurance-guide', cat: 'tax', catLabel: '세금', crumb: '4대보험', blurb: '요율 4가지 · 월급별 공제액 표 · 회사 부담 · 4월 정산' },
  { slug: 'part-time-insurance-guide', cat: 'tax', catLabel: '세금', crumb: '아르바이트 4대보험', blurb: '주 15시간·월 60시간 기준 · 시간별 보험료 · 사업주 의무' },
  { slug: 'comprehensive-income-tax-guide', cat: 'tax', catLabel: '세금', crumb: '종합소득세', blurb: '세율 8구간·누진공제 · 소득별 세금표 · 신고 대상 판정 · 홈택스 5단계' },
  { slug: 'freelancer-tax-guide', cat: 'tax', catLabel: '세금', crumb: '프리랜서 3.3%', blurb: '3.3% 구조 · 단순경비율 · 수입별 환급액 표 · 5월 신고 흐름' },
  { slug: 'acquisition-tax-guide', cat: 'realestate', catLabel: '부동산', crumb: '취득세', blurb: '6억·9억 세율 · 집값별 세금표 · 생애최초 200만원 · 8%·12% 중과' },
  { slug: 'transfer-tax-guide', cat: 'realestate', catLabel: '부동산', crumb: '양도소득세', blurb: '2년 보유 비과세 · 12억 초과분 계산 · 장기보유특별공제 80% · 2개월 예정신고' },
  { slug: 'property-tax-guide', cat: 'realestate', catLabel: '부동산', crumb: '재산세', blurb: '공시가격 → 과세표준 · 공시가별 세금표 · 1주택 특례세율 · 7월 9월 납기' },
  { slug: 'comprehensive-real-estate-tax-guide', cat: 'realestate', catLabel: '부동산', crumb: '종합부동산세', blurb: '공시가 합산 · 1주택 12억 공제 · 재산세액공제 · 고령자·장기보유 80%' },
];
