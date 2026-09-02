# 검증 리포트 — unemployment-benefit

- 실행: 2026-09-02T04-27-18
- 소요: 25.3s
- ✅ PASS: 2
- ❌ FAIL: 0
- ⚠️ ERROR: 5

## 상세

### ⚠️ unemployment-benefit — Case 1 — 월급 200만, 가입 2년, 50세 미만 (하한 적용)
- 어댑터: work24-unemployment
- 어댑터 에러: 조회 실패

### ⚠️ unemployment-benefit — Case 2 — 월급 300만, 가입 5년 (정확히), 50세 미만 (하한 적용)
- 어댑터: work24-unemployment
- 어댑터 에러: 조회 실패

### ✅ unemployment-benefit — Case 3 — 월급 500만, 가입 10년, 50세 미만 (상한 적용)

### ⚠️ unemployment-benefit — Case 4 — 월급 250만, 가입 1년 (정확히), 50세 미만 (하한 적용)
- 어댑터: work24-unemployment
- 어댑터 에러: 조회 실패

### ✅ unemployment-benefit — Case 5 — 월급 400만, 가입 8년, 50세 이상 (상한 + 가산일)

### ⚠️ unemployment-benefit — Case 6 — 월급 250만, 가입 6개월, 50세 이상 (1년 미만은 가산 없음 → 120일)
- 어댑터: work24-unemployment
- 어댑터 에러: 조회 실패

### ⚠️ unemployment-benefit — Case 7 — 월급 330만, 가입 5년 (60% = 66,000 < 하한 66,048)
- 어댑터: work24-unemployment
- 어댑터 에러: 조회 실패
