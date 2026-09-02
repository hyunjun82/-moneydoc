# 검증 리포트 — scrape-holding-tax-total

- 실행: 2026-09-02T04-01-18
- 소요: 194.2s
- ✅ PASS: 3
- ❌ FAIL: 0
- ⚠️ ERROR: 3

## 상세

### ✅ holding-tax-total — Case 1 — 1주택 공시가 15억 (50세, 3년 — 세액공제 없음)
- 어댑터: hometax-comp-tax

### ✅ holding-tax-total — Case 2 — 1주택 공시가 30억 (65세, 10년 — 고령자 30% + 장기보유 40%)
- 어댑터: hometax-comp-tax

### ⚠️ holding-tax-total — Case 3 — 2주택 12억 + 8억 (기본세율)
- 어댑터: hometax-comp-tax
- 조회 실패

### ⚠️ holding-tax-total — Case 4 — 3주택 10억 + 6억 + 4억 (과표 12억 이하 → 기본세율)
- 어댑터: hometax-comp-tax
- 조회 실패

### ✅ holding-tax-total — Case 5 — 1주택 공시가 8억 (70세, 15년 — 12억 이하라 종부세 없음)
- 어댑터: hometax-comp-tax

### ⚠️ holding-tax-total — Case 6 — 3주택 20억 + 15억 + 10억 (과표 12억 초과 → 중과세율)
- 어댑터: hometax-comp-tax
- 조회 실패
