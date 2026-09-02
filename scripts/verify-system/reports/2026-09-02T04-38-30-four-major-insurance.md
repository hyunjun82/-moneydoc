# 검증 리포트 — four-major-insurance

- 실행: 2026-09-02T04-38-30
- 소요: 14.3s
- ✅ PASS: 3
- ❌ FAIL: 2
- ⚠️ ERROR: 0

## 상세

### ✅ four-major-insurance — Case 1 — 월 보수 200만

### ✅ four-major-insurance — Case 2 — 월 보수 300만

### ❌ four-major-insurance — Case 3 — 월 보수 500만
- 어댑터: insure4-premium
- 엔진 ≠ insure4-premium (tolerance ±0)
- 차이:
  - employeeLTC: engine=23610 vs gov=23620 (Δ-10)
  - employerLTC: engine=23610 vs gov=23620 (Δ-10)
  - employeeTotal: engine=485860 vs gov=485870 (Δ-10)

### ✅ four-major-insurance — Case 4 — 월 보수 700만 (NP 상한 적용)

### ❌ four-major-insurance — Case 5 — 월 보수 1000만 (NP 상한)
- 어댑터: insure4-premium
- 엔진 ≠ insure4-premium (tolerance ±0)
- 차이:
  - employeeLTC: engine=47230 vs gov=47240 (Δ-10)
  - employerLTC: engine=47230 vs gov=47240 (Δ-10)
  - employeeTotal: engine=809750 vs gov=809760 (Δ-10)
