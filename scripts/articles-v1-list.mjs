// 자동 분리: convert-previews.mjs 의 글 목록만. import 부작용 없이 목록만 쓰기 위함.
export const ARTICLES = [
    // n:1 퇴직금 → v2 템플릿(articles/severance-pay-guide.mjs)으로 이전 (2026-09-03)
    // n:2 연봉 실수령액 → v2 템플릿(scripts/article-template/articles/salary-net-pay-guide.mjs)으로 이전 (2026-09-03)
  { n: 3,  file: '3-양도세-비과세.html',     cat: 'realestate', slug: 'transfer-tax-guide',               calc: '/realestate/transfer-tax/',                  catLabel: '부동산',    crumb: '1세대 1주택 비과세',       widget: 'transfer', blurb: '2년 보유·거주요건과 12억 고가주택 기준' },
  { n: 4,  file: '4-스트레스DSR.html',       cat: 'loan',       slug: 'dsr-limit-guide',                  calc: '/loan/dsr-limit/',                           catLabel: '대출',      crumb: '스트레스 DSR',             widget: 'dsr', blurb: '스트레스 금리 1~3단계 · 한도 얼마나 줄까' },
  { n: 5,  file: '5-국민연금-조기수령.html', cat: 'pension',    slug: 'national-pension-early-guide',     calc: '/pension/national-pension-early/',           catLabel: '연금',      crumb: '조기수령 손익분기',        widget: 'earlyPension', blurb: '1년 앞당길수록 6% 감액 · 손익분기 나이' },
  { n: 6,  file: '6-적금-예금-이자.html',    cat: 'savings',    slug: 'installment-savings-guide',        calc: '/savings/installment-savings/',              catLabel: '저축',      crumb: '적금·예금 이자',           widget: 'savings', blurb: '단리·복리 차이와 이자소득세 15.4%' },
  { n: 7,  file: '7-기초연금.html',          cat: 'government', slug: 'basic-pension-guide',              calc: '/government/basic-pension/',                 catLabel: '정부지원금', crumb: '기초연금 수급 조건',       widget: 'basicPension', blurb: '소득인정액 기준과 감액 구조' },
    // n:8 4대보험료 → v2 템플릿(articles/four-major-insurance-guide.mjs)으로 이전 (2026-09-03)
  { n: 9,  file: '9-연차수당.html',          cat: 'law',        slug: 'annual-leave-allowance-guide',     calc: '/law/annual-leave-allowance/',               catLabel: '법률',      crumb: '연차수당 계산',            widget: 'annualLeave', blurb: '연차 일수·통상임금·소멸시효 3년' },
  { n: 10, file: '10-취득세.html',           cat: 'realestate', slug: 'acquisition-tax-guide',            calc: '/realestate/acquisition-tax/',               catLabel: '부동산',    crumb: '취득세 계산',              widget: 'acqTax', blurb: '6억·9억 경계와 다주택 중과 8%·12%' },
  { n: 11, file: '11-자동차세.html',         cat: 'insurance',  slug: 'auto-tax-guide',                   calc: '/insurance/auto-tax/',                       catLabel: '보험·자동차', crumb: '자동차세 연납',          widget: 'autoTax', blurb: '배기량별 세율 · 1월 연납 5% 공제' },
  { n: 12, file: '12-육아휴직급여.html',     cat: 'government', slug: 'parental-leave-pay-guide',         calc: '/government/parental-leave-pay/',            catLabel: '정부지원금', crumb: '육아휴직 급여',            widget: 'parental', blurb: '250만→200만→160만 · 사후지급금 폐지' },
  { n: 13, file: '13-종합소득세.html',       cat: 'tax',        slug: 'comprehensive-income-tax-guide',   calc: '/tax/comprehensive-income-tax/',             catLabel: '세금',      crumb: '종합소득세 계산',          widget: 'compIncome', blurb: '세율 8구간과 누진공제 · 5월 신고' },
  { n: 14, file: '14-기초생활수급.html',     cat: 'government', slug: 'basic-livelihood-eligibility-guide', calc: '/government/basic-livelihood-eligibility/', catLabel: '정부지원금', crumb: '기초생활수급 조건',        widget: 'basicLivelihood', blurb: '생계 32%·의료 40%·주거 48%·교육 50%' },
  { n: 15, file: '15-재산세.html',           cat: 'realestate', slug: 'property-tax-guide',               calc: '/realestate/property-tax/',                  catLabel: '부동산',    crumb: '재산세 계산',              widget: 'propertyTax', blurb: '공정시장가액비율 43~45% vs 60%' },
];
