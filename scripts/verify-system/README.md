# MoneyDoc 자동 검증 시스템

84개 계산기를 정부 사이트 + 라이브 사이트 + 엔진 산식 3-way로 자동 비교하고,
오차 발견 시 자가개선까지 시도하는 시스템.

## 구조

```
scripts/verify-system/
├── adapters/        ← 사이트별 자동화 코드 (Playwright)
│   ├── _base.mjs    ← 공통 인터페이스 정의
│   ├── ezloan.mjs   ← 이지론 (대출 PMT 4가지 모드)
│   ├── kinfa.mjs    ← 한국주택금융공사
│   ├── hometax.mjs  ← 홈택스 (세금 모의계산)
│   ├── nps.mjs      ← 국민연금
│   ├── hf.mjs       ← HF 보금자리론
│   ├── hug.mjs      ← HUG 전세대출
│   └── ...
├── core/
│   ├── case-loader.mjs   ← JSON에서 case 자동 로드
│   ├── reporter.mjs      ← 결과 리포팅 (markdown/JSON)
│   └── formula-search.mjs ← Dreaming 식 산식 후보 자동 시도
├── scrape-gov.mjs        ← 1단계: 정부값 자동 수집 → JSON에 govExpected 저장
├── verify-3way.mjs       ← 2단계: 엔진 vs 사이트 vs 정부 비교
├── auto-fix.mjs          ← 3단계: 산식 자동 수정 (Dreaming)
└── reports/              ← 일별 리포트 저장
```

## 사용법

```bash
# 1단계 — 정부값 수집 (전체 또는 카테고리별)
node scripts/verify-system/scrape-gov.mjs --category=loan
node scripts/verify-system/scrape-gov.mjs --all

# 2단계 — 3-way 검증
node scripts/verify-system/verify-3way.mjs --calc=loan-amortization
node scripts/verify-system/verify-3way.mjs --all

# 3단계 — 자가개선 시도
node scripts/verify-system/auto-fix.mjs --calc=loan-amortization
```

## JSON 스키마 확장

각 계산기 JSON의 verification.cases에 govSource 추가:

```json
"verification": {
  "cases": [
    {
      "name": "Case 1",
      "input": { ... },
      "expected": { ... },
      "govSource": {
        "adapter": "ezloan",
        "url": "https://www.ezloan.io/calc/loan",
        "lastVerified": "2026-05-07",
        "govExpected": { ... }
      }
    }
  ]
}
```

## 어댑터 인터페이스

```js
// adapters/_base.mjs 가 정의하는 표준
export class Adapter {
  static name = "adapter-id";
  static gov = true | false;  // 정부=true, 대형사이트=false
  static url = "https://...";
  async calculate(input) {
    return { /* output 필드 */ };
  }
}
```

## 우선순위

1. ✅ 어댑터 구현 — ezloan (대출 9개), kinfa, hometax, finlife
2. ✅ 1·2·3단계 모듈
3. cron으로 매일 자동 실행
4. FAIL 시 GitHub issue 자동 생성

## 정부 어댑터 목록 (2026-09-02 기준, gov=true → 0원 허용)

| 어댑터 | 정부 도구 | 계산기 | 주의 (파일 머리말에 상세) |
|---|---|---|---|
| hometax-simplified-tax | 홈택스 근로소득 간이세액표 조회 | salary-net-pay | 표 원본 엑셀 → `lib/calc/tables/simplified-tax-2026-03.js` (`build-simplified-tax-table.py`) |
| hometax-transfer-tax | 홈택스 양도소득세 간편계산(비로그인) | transfer-tax | 장특공제·고가주택 안분은 팝업 계산기로 넣어야 반영. 12억 이하 1주택은 계산 거부 알림 = 비과세 |
| hometax-inheritance-tax | 홈택스 상속세 간편계산 | inheritance-tax | 상속공제적용한도액 팝업 '저장' 필수. 장례비 500만 기본 |
| hometax-gift-tax | 홈택스 증여세 간편계산 | gift-tax | 관계는 관계도→세부관계 레이어에서 WebSquare 컴포넌트 click() 으로만 선택됨. 결과는 서식 뷰어(글자 사이 공백) |
| hometax-comp-tax | 홈택스 종합부동산세 간이세액계산(주택) | comprehensive-real-estate-tax, holding-tax-total, property-tax(일반) | 재산세는 표준세율만 (1주택 특례세율 미계산). 최초등록/생년월일은 1주택일 때만 활성 |
| wetax-acquisition-tax | 위택스 취득세 미리계산 | acquisition-tax | 키보드보안 레이어 → 페이지 jQuery 로 값 주입 |
| wetax-auto-tax | 위택스 자동차세(소유) 미리계산 | auto-tax | 최초등록 2017년 이후만 입력 가능 (12년 경감 케이스는 법령) |
| work24-unemployment | 고용24 실업급여 간편 모의계산 | unemployment-benefit | **2026 상한 68,100원 미반영(66,048 절단)** → 상한 케이스는 lawSource. page.evaluate 가 객체·불리언을 못 돌려줌 → 문자열로만 |
| work24-parental-leave | 고용24 육아휴직급여 간편 모의계산 | parental-leave-pay | |
| work24-maternity-leave | 고용24 출산전후휴가급여 간편 모의계산 | maternity-leave-pay | 다태아 입력 없음(법령). 통상임금 < 최저임금이면 최저임금으로 계산 |
| moel-severance | 고용노동부 퇴직금 계산기 | severance-pay | 구간별 기본급 = 온전한 달 월급, 부분 달 일할 |
| insure4-premium | 4대사회보험 정보연계센터 모의계산 | four-major-insurance | 장기요양 = 보수월액 × 0.9448% ÷ 2 (건보료×13.14% 근사와 10원 차이) |
| nps-simple-pension | 국민연금공단 예상연금 간단계산 | national-pension | 10·15·…·40년 행만 제공. 유족연금 표에도 '20년 가입' 있어 노령연금 구간만 파싱 |

정부 도구가 법령보다 뒤처진 경우(실업급여 상한 등)는 케이스에 `lawSource` 를 적고 어댑터에서 AdapterError 로 제외한다. 법령 확인은 law.go.kr 조문을 Playwright 로 읽는다 (`dump-page.mjs` 는 폼 탐색용).
