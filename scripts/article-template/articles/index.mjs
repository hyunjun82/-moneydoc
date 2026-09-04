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
  { slug: 'annual-leave-allowance-guide', cat: 'law', catLabel: '법률', crumb: '연차수당', blurb: '연차 15일·25일 한도 · 1년 미만 11일 · 통상임금 하루치 · 촉진 절차' },
  { slug: 'unpaid-wages-guide', cat: 'law', catLabel: '법률', crumb: '임금체불', blurb: '14일 지급기한 · 연 20% 지연이자 표 · 진정 절차 · 대지급금 요건' },
  { slug: 'severance-claim-form-guide', cat: 'law', catLabel: '법률', crumb: '퇴직금 지급명령', blurb: '지급명령 신청서 · 소장 양식 · 인지대 계산표 · 관할 법원 · 2주 이의' },
  { slug: 'basic-pension-guide', cat: 'government', catLabel: '정부지원금', crumb: '기초연금', blurb: '65세·선정기준액 · 소득인정액 계산 · 국민연금 연계 · 신청 4단계' },
  { slug: 'parental-leave-pay-guide', cat: 'government', catLabel: '정부지원금', crumb: '육아휴직 급여', blurb: '구간별 상한 250·200·160만 · 통상임금별 표 · 6+6 특례 · 신청 4단계' },
  { slug: 'basic-livelihood-eligibility-guide', cat: 'government', catLabel: '정부지원금', crumb: '기초생활수급', blurb: '중위소득 4종 기준표 · 소득인정액 · 급여 내용 · 신청 서류' },
  { slug: 'dsr-limit-guide', cat: 'loan', catLabel: '대출', crumb: '스트레스 DSR', blurb: 'DSR 40%·50% · 단계별 가산금리 · 소득·기간별 한도표 · 한도 늘리기' },
  { slug: 'national-pension-early-guide', cat: 'pension', catLabel: '연금', crumb: '국민연금 조기수령', blurb: '1년 6% 감액표 · 손익분기 나이 · 신청 조건 · 연기연금 비교' },
  { slug: 'installment-savings-guide', cat: 'savings', catLabel: '저축', crumb: '적금 이자', blurb: '기간·금리별 이자표 · 단리 복리 차이 · 15.4% 세금 · 비과세 조건' },
  { slug: 'auto-tax-guide', cat: 'insurance', catLabel: '보험·자동차', crumb: '자동차세', blurb: '배기량별 세액표 · 차령 5% 경감 · 연납 공제 · 6월 12월 납기' },
  { slug: 'certified-mail-guide', cat: 'law', catLabel: '법률', crumb: '내용증명', blurb: '작성 항목 8가지 · 세 통 준비 · 발송 절차 · 효력과 시효 · 보증금 문구' },
  { slug: 'deposit-return-suit-guide', cat: 'law', catLabel: '법률', crumb: '보증금 반환 소송', blurb: '이사 전 임차권등기 · 내용증명 · 지급명령 · 소장 접수 · 비용' },
  { slug: 'personal-rehabilitation-guide', cat: 'law', catLabel: '법률', crumb: '개인회생', blurb: '신청 자격 판정 · 가용소득 변제금 · 3년 변제 · 서류 7종 · 면책 제외' },
  { slug: 'unemployment-apply-guide', cat: 'government', catLabel: '정부지원금', crumb: '실업급여 신청 방법', blurb: '신청 5단계 · 12개월 기한 · 대기기간 7일 · 실업인정' },
  { slug: 'unemployment-eligibility-guide', cat: 'government', catLabel: '정부지원금', crumb: '실업급여 수급자격', blurb: '조건 4가지 · 180일 계산 · 기준기간 18개월 · 이직 사유 제한' },
  { slug: 'unemployment-180days-guide', cat: 'government', catLabel: '정부지원금', crumb: '실업급여 180일', blurb: '보수가 나간 날만 계산 · 주휴일 포함 · 근무 형태별 기간표 · 24개월 특례' },
  { slug: 'unemployment-voluntary-guide', cat: 'government', catLabel: '정부지원금', crumb: '자발적 퇴사 실업급여', blurb: '인정 사유 17가지 · 사유별 증빙 서류 · 1년 내 2개월 요건 · 이직확인서 정정' },
  { slug: 'unemployment-days-guide', cat: 'government', catLabel: '정부지원금', crumb: '실업급여 소정급여일수', blurb: '구간별 일수표 · 50세 가산 · 이직 당시 나이 기준 · 3년 내 합산' },
];
