# 검증 리포트 — scrape-transfer-tax

- 실행: 2026-09-02T03-12-52
- 소요: 319.2s
- ✅ PASS: 1
- ❌ FAIL: 0
- ⚠️ ERROR: 16

## 상세

### ⚠️ transfer-tax — [1home] Case 1. 1세대1주택 비과세 (양도 10억, 취득 5억, 보유5년, 거주5년)
- 어댑터: hometax-transfer-tax
- 결과 팝업 없음 / 알림: 양도가액이 12억원 이하이고 1세대1주택 비과세 요건에 해당하는 경우에는 모의계산 서비스를 제공하지 않습니다.
양도가액을 다시 한 번 확인해 주시기 바랍니다.

### ⚠️ transfer-tax — [1home] Case 2. 1세대1주택 12억 초과 (양도 15억, 보유10년, 거주10년)
- 어댑터: hometax-transfer-tax
- 결과 파싱 실패

### ⚠️ transfer-tax — [1home] Case 3. 1세대1주택 거주 짧음 (양도 20억, 취득 10억, 보유5년, 거주3년)
- 어댑터: hometax-transfer-tax
- 결과 파싱 실패

### ⚠️ transfer-tax — [1home] Case 4. 1세대1주택 거주 미달 (조정대상지역, 양도 9억, 취득 6억, 보유3년, 거주0년 → 비과세 X, 일반 LBC)
- 어댑터: hometax-transfer-tax
- 결과 파싱 실패

### ⚠️ transfer-tax — [1home] Case 5. 다주택자 (양도 8억, 취득 5억, 보유5년)
- 어댑터: hometax-transfer-tax
- 결과 파싱 실패

### ⚠️ transfer-tax — [1home] Case 6. 단기 1년 미만 (1세대1주택 70%)
- 어댑터: hometax-transfer-tax
- 결과 파싱 실패

### ⚠️ transfer-tax — [1home] Case 7. 단기 1-2년 (60%)
- 어댑터: hometax-transfer-tax
- 결과 파싱 실패

### ⚠️ transfer-tax — [multi] Case 1. 다주택 양도 5억, 취득 3억, 보유 5년
- 어댑터: hometax-transfer-tax
- 결과 파싱 실패

### ⚠️ transfer-tax — [multi] Case 2. 다주택 양도 8억, 취득 5억, 보유 10년
- 어댑터: hometax-transfer-tax
- 결과 파싱 실패

### ⚠️ transfer-tax — [multi] Case 3. 단기 양도 10억, 취득 7억, 보유 1년 (단기 60%)
- 어댑터: hometax-transfer-tax
- 결과 파싱 실패

### ⚠️ transfer-tax — [multi] Case 4. 다주택 양도 6억, 취득 4억, 보유 3년
- 어댑터: hometax-transfer-tax
- 결과 파싱 실패

### ⚠️ transfer-tax — [multi] Case 5. 다주택 양도 12억, 취득 8억, 보유 15년 (LBC 30%)
- 어댑터: hometax-transfer-tax
- 결과 파싱 실패

### ⚠️ transfer-tax — [adjusted] Case 1. 양도 8억 / 취득 5억 / 보유 5년 / 2주택
- 어댑터: hometax-transfer-tax
- 결과 파싱 실패

### ⚠️ transfer-tax — [adjusted] Case 2. 양도 10억 / 취득 6억 / 보유 10년 / 3주택
- 어댑터: hometax-transfer-tax
- 결과 파싱 실패

### ✅ transfer-tax — [adjusted] Case 3. 양도 6억 / 취득 4억 / 보유 3년 / 2주택
- 어댑터: hometax-transfer-tax

### ⚠️ transfer-tax — [adjusted] Case 4. 양도 15억 / 취득 8억 / 보유 15년 / 3주택
- 어댑터: hometax-transfer-tax
- 결과 파싱 실패

### ⚠️ transfer-tax — [adjusted] Case 5. 양도 5억 / 취득 3억 / 보유 5년 / 4주택
- 어댑터: hometax-transfer-tax
- 결과 파싱 실패
