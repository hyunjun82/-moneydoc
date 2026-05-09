# 검증 리포트 — national-pension

- 실행: 2026-05-09T05-36-28
- 소요: 0.0s
- ✅ PASS: 2
- ❌ FAIL: 3
- ⚠️ ERROR: 0

## 상세

### ✅ national-pension — Case 1 — 가입 20년 (240개월), 평균소득 200만원

### ❌ national-pension — Case 2 — 가입 30년 (360개월), 평균소득 300만원
- 엔진 ≠ JSON expected
- 차이:
  - monthlyPension: engine=998700 vs expected=837450 (Δ161250)
  - annualPension: engine=11984400 vs expected=10049400 (Δ1935000)

### ❌ national-pension — Case 3 — 가입 40년 (480개월), 평균소득 400만원
- 엔진 ≠ JSON expected
- 차이:
  - monthlyPension: engine=1546600 vs expected=1116600 (Δ430000)
  - annualPension: engine=18559200 vs expected=13399200 (Δ5160000)

### ✅ national-pension — Case 4 — 가입 10년 (120개월), 평균소득 200만원

### ❌ national-pension — Case 5 — 가입 25년 (300개월), 평균소득 250만원
- 엔진 ≠ JSON expected
- 차이:
  - monthlyPension: engine=765060 vs expected=697870 (Δ67190)
  - annualPension: engine=9180720 vs expected=8374440 (Δ806280)
