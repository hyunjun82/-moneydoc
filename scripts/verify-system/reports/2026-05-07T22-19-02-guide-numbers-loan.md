# 검증 리포트 — guide-numbers-loan

- 실행: 2026-05-07T22-19-02
- 소요: 0.0s
- ✅ PASS: 4
- ❌ FAIL: 5
- ⚠️ ERROR: 0

## 상세

### ❌ credit-loan — (가이드 숫자)
- 정부값 차이
- 차이:
  - [creditIncomeTable.70000000] 1.5배 Δ-90000000
  - [creditIncomeTable.10000] 1.5배 Δ149985000

### ❌ dsr-limit — (가이드 숫자)
- 정부값 차이
- 차이:
  - [dsrIncomeTable.30000000] 미적용 표=29460000 vs eng=209461240 (Δ-180001240)
  - [dsrIncomeTable.10000] 미적용 표=698200000 vs eng=69751 (Δ698130249)
  - [dsrIncomeTable.10000] 3단계 표=587070000 vs eng=58649 (Δ587011351)
  - [dsrIncomeTable.150000] 미적용 표=1047300000 vs eng=1047306 (Δ1046252694)
  - [dsrIncomeTable.150000] 3단계 표=880600000 vs eng=880609 (Δ879719391)

### ❌ dti-limit — (가이드 숫자)
- 정부값 차이
- 차이:
  - [dtiIncomeTable.10000] 50% Δ872662655
  - [dtiIncomeTable.10000] 60% Δ1047195269

### ❌ jeonse-loan — (가이드 숫자)
- 정부값 차이
- 차이:
  - [jeonseDepositTable.5억] HF Δ-399960000

### ✅ loan-amortization — (가이드 숫자)
- 정부값 0원 일치

### ✅ loan-refinance — (가이드 숫자)
- 정부값 0원 일치

### ❌ ltv-limit — (가이드 숫자)
- 정부값 차이
- 차이:
  - [ltvPriceTable.10억] 비규제 Δ-699240000
  - [ltvPriceTable.15억] 비규제 Δ-1049940000

### ✅ mortgage-loan-limit — (가이드 숫자)
- 정부값 0원 일치

### ✅ prepayment-fee — (가이드 숫자)
- 정부값 0원 일치
