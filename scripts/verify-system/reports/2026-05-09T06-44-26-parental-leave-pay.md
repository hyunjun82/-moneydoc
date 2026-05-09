# 검증 리포트 — parental-leave-pay

- 실행: 2026-05-09T06-44-26
- 소요: 0.0s
- ✅ PASS: 4
- ❌ FAIL: 1
- ⚠️ ERROR: 0

## 상세

### ✅ parental-leave-pay — Case 1 — 통상 200만 × 6개월

### ✅ parental-leave-pay — Case 2 — 통상 300만 × 12개월 (상한 적용)

### ✅ parental-leave-pay — Case 3 — 통상 150만 × 12개월

### ❌ parental-leave-pay — Case 4 — 통상 80만 × 12개월 (하한 적용)
- 엔진 ≠ JSON expected
- 차이:
  - phase3Monthly: engine=700000 vs expected=640000 (Δ60000)
  - totalPay: engine=9000000 vs expected=8640000 (Δ360000)

### ✅ parental-leave-pay — Case 5 — 통상 500만 × 9개월 (상한 적용)
