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
