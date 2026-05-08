# 검증 리포트 — divorce-alimony

- 실행: 2026-05-08T01-31-34
- 소요: 0.0s
- ✅ PASS: 2
- ❌ FAIL: 3
- ⚠️ ERROR: 0

## 상세

### ✅ divorce-alimony — Case 1 — 결혼 3년 / medium (1천만)

### ✅ divorce-alimony — Case 2 — 결혼 8년 / high (3천만)

### ❌ divorce-alimony — Case 3 — 결혼 15년 / medium (2천만)
- 엔진 ≠ JSON expected
- 차이:
  - baseAmount: engine=35000000 vs expected=20000000 (Δ15000000)
  - estimatedAmount: engine=35000000 vs expected=20000000 (Δ15000000)

### ❌ divorce-alimony — Case 4 — 결혼 25년 / high (5천만, 보수 조정)
- 엔진 ≠ JSON expected
- 차이:
  - baseAmount: engine=60000000 vs expected=33333333 (Δ26666667)
  - estimatedAmount: engine=90000000 vs expected=50000000 (Δ40000000)

### ❌ divorce-alimony — Case 5 — 결혼 12년 / low (1천만)
- 엔진 ≠ JSON expected
- 차이:
  - baseAmount: engine=35000000 vs expected=20000000 (Δ15000000)
  - estimatedAmount: engine=17500000 vs expected=10000000 (Δ7500000)
