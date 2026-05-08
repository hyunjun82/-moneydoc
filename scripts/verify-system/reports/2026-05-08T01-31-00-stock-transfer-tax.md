# 검증 리포트 — stock-transfer-tax

- 실행: 2026-05-08T01-31-00
- 소요: 0.0s
- ✅ PASS: 4
- ❌ FAIL: 1
- ⚠️ ERROR: 0

## 상세

### ✅ stock-transfer-tax — Case 1 — 비대주주 차익 500만 (22%)

### ✅ stock-transfer-tax — Case 2 — 비대주주 차익 5천만

### ✅ stock-transfer-tax — Case 3 — 비대주주 차익 1억

### ✅ stock-transfer-tax — Case 4 — 대주주 차익 2억 (3억 미만, 22%)

### ❌ stock-transfer-tax — Case 5 — 대주주 차익 5억 (3억 초과, 27.5%)
- 엔진 ≠ JSON expected
- 차이:
  - incomeTax: engine=109375000 vs expected=124375000 (Δ-15000000)
  - localTax: engine=10937500 vs expected=12437500 (Δ-1500000)
  - totalTax: engine=120312500 vs expected=136812500 (Δ-16500000)
