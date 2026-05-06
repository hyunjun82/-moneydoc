# MoneyDoc — Claude 작업 규칙

매 세션 시작 시 이 파일 먼저 읽기. 짧음. 다 지켜야 함.

## 절대 규칙 (실수 방지)

1. **JSON 큰 변경 = Python으로**. Edit 툴 쓰면 깨짐 (UTF-8 손상, truncation 실측됨).
2. **TS/TSX 큰 변경도 Python으로**. Edit 툴 변경 시 끝부분 잘림 사례 다수.
3. **Edit 툴은 작은 한 줄 변경에만** (라벨, 숫자 1개 등).
4. **모든 파일 수정 후** `tail -c 30 파일 | xxd`로 truncation 체크. null byte 있으면 재작성.
5. **JSON 수정 후** `python3 -c "import json; json.load(open('파일'))"`로 검증.
6. **TS 수정 후** `npx tsc --noEmit -p .`로 0 에러 확인.
7. **verify 스크립트** PASS 확인 후에만 push.
8. **push-changes.bat은 stash 절대 금지**. 직접 git add → commit → push.
9. **라인엔딩 LF 강제**. .gitattributes 있음. CRLF 감지되면 Python에서 `newline='\n'`.
10. **한 번에 1개 계산기**만. 91개 동시 작업 금지.

## 디자인 (D 테마, 변경 금지)

- 배경 #f7f5f0 / 카드 #fdfbf6 / 브랜드 #1f3a3a / 마이너스 빨강
- 폰트 Pretendard
- 새 색상 추가 금지

## 계산기 구조

```
moneydoc-data/calculators/{cat}/{slug}.json   ← 산식 데이터
lib/calc/{slug}.ts                            ← TS 산식 (페이지에서 import)
lib/calc/engine.js                            ← JS 동기화 (verify용)
moneydoc-data/verify/verify-{slug}.js         ← 검증 스크립트
app/{cat}/{slug}/page.tsx                     ← 메타 + Shell
app/{cat}/{slug}/{Slug}Client.tsx             ← UI (use client)
```

## 가이드 4섹션 (사용자 검색 의도 기반)

generic 5섹션 금지. 매 계산기마다 검색 의도 분석 후 4섹션:

1. **즉답** (구간별 표 / 자격 체크리스트 / 케이스별 결과)
2. **변동 케이스 FAQ** (사용자가 진짜 묻는 4~5개)
3. **결과 근거** (산식 단계 + 4대보험·세율표 + 정부 출처)
4. **다음 단계** (절세 / 혜택 / 신청 / 관련 계산기)

제목: "{주제} 완전 가이드" 또는 "자주 검색하는 케이스" — "이 계산기 자세히 알아보기" 같은 generic 금지.

## 검증 기준 (오차 0 원칙)

- 정부 모의계산기와 ±10원 (1차)
- 잡코리아·아는자산 시장표준과 ±1,000원 (2차)
- verify 스크립트 5/5 PASS 필수

## 작업 우선순위

세금(연봉/4대보험/종합소득세/양도세/퇴직금) → 저축(적금/예금/ISA) → 대출 → 부동산 → 연금 → 정부지원금 → 법률 → 보험

## 진행 상황

`docs/CALCULATORS-STATUS.md`에 매 계산기 완료 시 ✅ 마킹.

## 푸시 워크플로우

1. `node moneydoc-data/verify/verify-{slug}.js` PASS
2. `npx tsc --noEmit -p .` 0 에러
3. `python3 -c "import json; json.load(open('변경한 JSON'))"` OK
4. push-changes.bat 더블클릭
5. Cloudflare 빌드 로그 확인 (Cloudflare Pages 대시보드)
6. Chrome MCP로 라이브 캡처 → 정부 사이트와 비교

## 자주 쓰는 검증 출처

- 4대보험: 4insure.or.kr
- 소득세: hometax.go.kr taxsimple + jobkorea + knowingasset.com
- 양도세: hometax.go.kr 양도세 모의계산
- 적금/예금: finlife.fss.or.kr
- 국민연금: nps.or.kr
- 퇴직금: 고용노동부 퇴직금 모의계산

상세는 `docs/VERIFICATION-SOURCES.md`.
