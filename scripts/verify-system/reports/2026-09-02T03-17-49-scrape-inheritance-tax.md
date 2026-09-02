# 검증 리포트 — scrape-inheritance-tax

- 실행: 2026-09-02T03-17-49
- 소요: 73.7s
- ✅ PASS: 5
- ❌ FAIL: 0
- ⚠️ ERROR: 0

## 상세

### ✅ inheritance-tax — Case 1 — 5억, 배우자 X, 자녀 2 (인적공제 0)
- 어댑터: hometax-inheritance-tax

### ✅ inheritance-tax — Case 2 — 10억, 배우자 O, 자녀 2 (배우자공제 5억 최소)
- 어댑터: hometax-inheritance-tax

### ✅ inheritance-tax — Case 3 — 15억, 배우자 O, 자녀 2 (배우자 6.43억, 장례비 500만 공제)
- 어댑터: hometax-inheritance-tax

### ✅ inheritance-tax — Case 4 — 30억, 배우자 O, 자녀 2 (배우자 12.86억)
- 어댑터: hometax-inheritance-tax

### ✅ inheritance-tax — Case 5 — 50억, 배우자 O, 자녀 2 (배우자 21.43억)
- 어댑터: hometax-inheritance-tax
