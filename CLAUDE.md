# MoneyDoc — Claude 작업 규칙

매 세션 첫 줄에 이 파일 읽기. 짧음. 다 지키기.

## 0. 오차 0 원칙 (최우선)

- ❌ 추측 답변 금지: "정확함", "공식 동일", "표준 산식"
- ❌ 손으로 1개씩 대조 금지 (시스템 만들었음)
- ✅ `scripts/verify-system/` 자동 시스템으로 정부값 0원 일치 확인 후에만 PASS
- 정부 어댑터(gov=true) = **0원** / 대형(gov=false) = ±100원

## 1. 자동 검증 시스템

```bash
node scripts/verify-system/scrape-gov.mjs --all --skip-existing  # 정부값 수집
node scripts/verify-system/verify-3way.mjs --all                 # 3-way 비교
node scripts/verify-system/auto-fix.mjs --calc=<slug>            # 산식 자동 탐색
```

상세는 `scripts/verify-system/README.md`. 새 어댑터 추가도 거기.

**검증 통과 = push 가능. 미통과 = push 금지.**

## 2. 가이드 4섹션 (순서 고정)

1. 즉답 (구간별 표/케이스별 결과) 2. 활용 팁 3. 자주 묻는 질문

외부 헤더 = "계산기 가이드".

## 3. 절대 규칙 (실수 방지)

1. **JSON/TS/JS 큰 변경 = Python으로**. Edit는 한 줄 변경만 (truncation 실측됨).
2. **수정 후** `tail -c 30 파일 | xxd`로 truncation 체크. 잘리면 Python 재작성.
3. **JSON 검증**: `python3 -c "import json; json.load(open('파일'))"`.
4. **TS 검증**: `npx tsc --noEmit -p .` 0 에러.
5. **검증 통과 후 push**: `verify-3way.mjs --all` PASS 확인.
6. **push-changes.bat은 stash 금지**. git add → commit → push 직접.
7. **라인엔딩 LF**. Python에서 `newline=\'\\n\'`.
8. **.bat 파일은 ASCII 영어만** (CP949 깨짐). BOM 금지.
9. **Cloudflare 캐시 7일** (s-maxage=604800). 옛 URL 안 죽으면 Purge Everything.

## 4. 디자인 (변경 금지)

배경 #f7f5f0 / 카드 #fdfbf6 / 브랜드 #1f3a3a / 폰트 Pretendard.

## 5. 구조

```
moneydoc-data/calculators/{cat}/{slug}.json   산식 + verification.cases (govSource 포함)
lib/calc/engine.js                            모든 산식 (사이트가 import)
components/GenericCalculator.tsx              UI
app/{cat}/{slug}/page.tsx                     메타 + Shell
scripts/verify-system/                        자동 검증
```

JSON case에 `govSource.govExpected` 자동 채움 (scrape-gov.mjs가 함, 손으로 X).

## 6. 작업 우선순위

1. `verify-3way.mjs --all` 리포트의 FAIL 우선
2. 패턴별: 🔴 산식/데이터 오류 → engine.js 수정 / 🟡 정책 갱신 → JSON expected / 🟢 round Δ1 → 통일

## 7. 푸시

1. `verify-3way.mjs --all` PASS
2. `npx tsc --noEmit -p .` 0 에러
3. truncation 체크
4. push-changes.bat → Cloudflare 빌드 확인
5. push 후 `verify-3way.mjs --all` (--no-gov 빼고) → 라이브+정부 일치 재확인
