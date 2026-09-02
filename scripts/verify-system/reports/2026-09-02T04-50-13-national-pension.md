# 검증 리포트 — national-pension

- 실행: 2026-09-02T04-50-13
- 소요: 25.0s
- ✅ PASS: 4
- ❌ FAIL: 1
- ⚠️ ERROR: 0

## 상세

### ❌ national-pension — Case 1 — 가입 20년, 평균소득 200만
- 어댑터: nps-simple-pension
- 엔진 ≠ nps-simple-pension (tolerance ±0)
- 차이:
  - monthlyPension: engine=558300 vs gov=419900 (Δ138400)
  - annualPension: engine=6699600 vs gov=5038800 (Δ1660800)

### ✅ national-pension — Case 2 — 가입 30년, 평균소득 300만

### ✅ national-pension — Case 3 — 가입 40년, 평균소득 400만

### ✅ national-pension — Case 4 — 가입 10년, 평균소득 200만

### ✅ national-pension — Case 5 — 가입 25년, 평균소득 250만
