# 계산기 1개 리라이트 — 10단계

매 계산기마다 이 순서. 건너뛰기 금지.

## 1. 검색 의도 분석 (10분)
- 네이버에서 "{계산기 키워드}" 검색 → 자동완성 5~10개 캡처
- 연관검색어 캡처
- 4개 그룹으로 분류 → 4섹션 매핑
- `docs/SEARCH-INTENT-PATTERNS.md`의 패턴 1/2/3 중 어느 것에 맞는지 판단

## 2. 정부 출처 확정 (5분)
- `docs/VERIFICATION-SOURCES.md`에서 확인. 없으면 추가.
- URL 메모

## 3. 정부 사이트 5케이스 캡처 (15분)
Chrome MCP로 정부 모의계산기 5개 입력 → 결과 받음
대표 케이스:
- 일반 (기본 디폴트)
- 경계값 (낮은 소득)
- 경계값 (높은 소득)
- 부양가족 많음
- 비과세 적용

캡처 결과 = 검증 기준값.

## 4. JSON spec 갱신 (Python으로)
파일: `moneydoc-data/calculators/{cat}/{slug}.json`

수정 항목:
- `constants` (2026 정확값 — 4.75% 등)
- `tables` (누진세율, 공제 매트릭스)
- `inputs` (사용자 검색 의도 반영, 비과세 등)
- `verification.cases` (Step 3 기준값으로 5개)
- `guide` (4섹션 — 아래 형식)

guide 형식:
```json
"guide": {
  "tables": {
    "{slug}BracketTable": [...],   // 즉답 표 (1번 섹션)
    "ratesTable": [...]              // 요율표 (3번 섹션)
  },
  "faq": [...],                      // 변동 케이스 (2번 섹션)
  "tips": [...]                      // 다음 단계 (4번 섹션)
}
```

검증: `python3 -c "import json; json.load(open('파일'))"`

## 5. 산식 코드 갱신 (Python으로)
파일: `lib/calc/{slug}.ts` + `lib/calc/engine.js`

- TS 파일은 기존 export 시그니처 유지 (다른 파일에서 import 중)
- engine.js의 calc_{slug} 함수도 동기화 (verify 스크립트가 사용)

검증: `tail -c 30 파일 | xxd` (truncation/null byte 체크)

## 6. Verify 스크립트 갱신 (Python으로)
파일: `moneydoc-data/verify/verify-{slug}.js`
산식 동일하게 구현. `node verify-{slug}.js` → 5/5 PASS 필수.

## 7. UI 컴포넌트 갱신 (작은 변경은 Edit, 큰 변경은 Python)
파일: `app/{cat}/{slug}/{Slug}Client.tsx`

- 새 input 필드 추가
- 결과 표시 (메인/breakdown/도넛 일관성)
- 4섹션 가이드는 GuideAccordion 컴포넌트가 spec.guide에서 자동 렌더

검증: `tail -c 30 파일 | xxd`

## 8. 로컬 TS 체크
```
npx tsc --noEmit -p .
```
0 에러 필수. 에러 있으면 다음 단계 금지.

## 9. Push
`push-changes.bat` 실행. 8개 파일 stage → commit → push.

## 10. 라이브 검증
- Cloudflare 빌드 로그 확인 (1~3분)
- Chrome MCP로 라이브 + 정부 사이트 동시 캡처
- 5케이스 다시 입력해 ±10원 매칭 확인

## 완료
`docs/CALCULATORS-STATUS.md`에 ✅ 마킹.

다음 계산기 진행.
