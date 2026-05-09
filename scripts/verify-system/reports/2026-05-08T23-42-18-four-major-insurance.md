# 검증 리포트 — four-major-insurance

- 실행: 2026-05-08T23-42-18
- 소요: 0.0s
- ✅ PASS: 1
- ❌ FAIL: 4
- ⚠️ ERROR: 0

## 상세

### ❌ four-major-insurance — Case 1 — 월 보수 200만
- 엔진 ≠ JSON expected
- 차이:
  - employeeLTC: engine=4000 vs expected=4009 (Δ-9)
  - employeeTotal: engine=168200 vs expected=168209 (Δ-9)
  - employerLTC: engine=4000 vs expected=4009 (Δ-9)
  - employerTotal: engine=192200 vs expected=192209 (Δ-9)
  - grandTotal: engine=360400 vs expected=360418 (Δ-18)

### ❌ four-major-insurance — Case 2 — 월 보수 300만
- 엔진 ≠ JSON expected
- 차이:
  - employeeLTC: engine=6010 vs expected=6013 (Δ-3)
  - employeeTotal: engine=252310 vs expected=252313 (Δ-3)
  - employerLTC: engine=6010 vs expected=6013 (Δ-3)
  - employerTotal: engine=288310 vs expected=288313 (Δ-3)
  - grandTotal: engine=540620 vs expected=540626 (Δ-6)

### ❌ four-major-insurance — Case 3 — 월 보수 500만
- 엔진 ≠ JSON expected
- 차이:
  - employeeLTC: engine=10020 vs expected=10022 (Δ-2)
  - employeeTotal: engine=384970 vs expected=384972 (Δ-2)
  - employerLTC: engine=10020 vs expected=10022 (Δ-2)
  - employerTotal: engine=444970 vs expected=444972 (Δ-2)
  - grandTotal: engine=829940 vs expected=829944 (Δ-4)

### ✅ four-major-insurance — Case 4 — 월 보수 700만 (NP 상한 적용)

### ❌ four-major-insurance — Case 5 — 월 보수 1000만 (NP 상한)
- 엔진 ≠ JSON expected
- 차이:
  - employeeLTC: engine=20040 vs expected=20043 (Δ-3)
  - employeeTotal: engine=580490 vs expected=580493 (Δ-3)
  - employerLTC: engine=20040 vs expected=20043 (Δ-3)
  - employerTotal: engine=700490 vs expected=700493 (Δ-3)
  - grandTotal: engine=1280980 vs expected=1280986 (Δ-6)
