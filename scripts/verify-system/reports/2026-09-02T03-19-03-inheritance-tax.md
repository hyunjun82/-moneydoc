# 검증 리포트 — inheritance-tax

- 실행: 2026-09-02T03-19-03
- 소요: 71.6s
- ✅ PASS: 0
- ❌ FAIL: 5
- ⚠️ ERROR: 0

## 상세

### ❌ inheritance-tax — Case 1 — 5억, 배우자 X, 자녀 2 (인적공제 0)
- 어댑터: hometax-inheritance-tax
- 엔진 ≠ hometax-inheritance-tax (tolerance ±0)
- 차이:
  - deduction: engine=495000000 vs gov=null (Δstring)

### ❌ inheritance-tax — Case 2 — 10억, 배우자 O, 자녀 2 (배우자공제 5억 최소)
- 어댑터: hometax-inheritance-tax
- 엔진 ≠ hometax-inheritance-tax (tolerance ±0)
- 차이:
  - deduction: engine=995000000 vs gov=null (Δstring)

### ❌ inheritance-tax — Case 3 — 15억, 배우자 O, 자녀 2 (배우자 6.43억, 장례비 500만 공제)
- 어댑터: hometax-inheritance-tax
- 엔진 ≠ hometax-inheritance-tax (tolerance ±0)
- 차이:
  - deduction: engine=1142857142 vs gov=null (Δstring)

### ❌ inheritance-tax — Case 4 — 30억, 배우자 O, 자녀 2 (배우자 12.86억)
- 어댑터: hometax-inheritance-tax
- 엔진 ≠ hometax-inheritance-tax (tolerance ±0)
- 차이:
  - deduction: engine=1785714285 vs gov=null (Δstring)

### ❌ inheritance-tax — Case 5 — 50억, 배우자 O, 자녀 2 (배우자 21.43억)
- 어댑터: hometax-inheritance-tax
- 엔진 ≠ hometax-inheritance-tax (tolerance ±0)
- 차이:
  - deduction: engine=2642857142 vs gov=null (Δstring)
