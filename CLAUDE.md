# MoneyDoc — Claude 작업 규칙

이 파일은 **70줄 안에서** 유지한다. 길어지면 놓친다.
**왜** 이 규칙이 생겼는지는 `scripts/WHY.md`. 사용법은 각 스크립트 헤더.
새 사고가 나면 WHY.md 에 적고 이 파일은 늘리지 않는다.

## 0. 오차 0

추측 금지("정확함"·"공식 동일"·"표준 산식"). 손으로 대조 금지. 정부값과 0원 일치 확인 후에만 PASS.
정부 어댑터 **0원** / 대형 ±100원.

## 1. 실수 방지

1. **JSON/TS/JS 큰 변경은 Python으로**. Edit 는 한 줄만 (truncation 실측됨).
2. 수정 후 `tail -c 30 파일 | xxd` 로 잘림 확인. 잘렸으면 Python 재작성.
3. 라인엔딩 LF (`newline='\n'`). `.bat` 은 ASCII 영어만, BOM 금지.
4. push-changes.bat 은 stash 금지. git add → commit → push 직접.
5. Cloudflare 캐시 7일. 옛 URL 안 죽으면 Purge Everything.

## 2. 디자인 (변경 금지)

배경 #f7f5f0 / 카드 #fdfbf6 / 브랜드 #1f3a3a / 폰트 Pretendard.

## 3. 구조

`moneydoc-data/calculators/{cat}/{slug}.json` 산식 · `lib/calc/engine.js` 전 산식 ·
`components/GenericCalculator.tsx` UI · `app/{cat}/{slug}/page.tsx` 메타 ·
`scripts/verify-system/` 수치 검증 · `scripts/title-system/titles.{주제}-v2.json` **글 계획서(단일 진실 원천)** ·
`scripts/article-template/` 글 스펙과 빌드.

## 4. 계산기

```bash
node scripts/verify-system/scrape-gov.mjs --all --skip-existing   # 정부값 수집
node scripts/verify-system/verify-3way.mjs --all                  # 3-way 비교
node scripts/verify-system/auto-fix.mjs --calc=<slug>             # 산식 자동 탐색
```

FAIL 우선. 🔴 산식·데이터 → engine.js / 🟡 정책 갱신 → JSON expected / 🟢 round Δ1 → 통일.
가이드 4섹션 고정: 즉답(구간별 표) → 활용 팁 → 자주 묻는 질문. 상세 `scripts/verify-system/README.md`.

## 5. 글 쓰기

해요체 / 문장 100자 이하 / 대시·파이프 금지 / 본문에 법 조문 금지(출처·각주만) /
소제목은 **질문형** / 표 캡션 필수 / 숫자는 엔진 값이나 근거에 있는 값만 /
제목은 짓지 말고 **실측 검색어**에서 (`scripts/keyword-data/`).

## 6. 글 하나가 나오는 순서 (건너뛸 수 없다)

```
 1 제목·소제목  실측 검색어에서만. 계획서에 저장
 2 근거 수집    node scripts/article-template/evidence.mjs <slug>
 3 근거 읽기    주장마다 원문을 스펙의 claims 에 인용
 4 글 작성      scripts/article-template/articles/<slug>.mjs
 5 빌드         node scripts/article-template/build.mjs <slug>
 6 독자 검토    검색어를 들고 페이지를 처음부터 끝까지 읽는다
 7 검토 기록    node scripts/write-review.mjs <주제> <slug> --query= --titleKeyword= --hard= --removed= --deeper=
 8 게이트       node scripts/gate.mjs <주제>   PASS 여야 **다음 글**
```

**한 편씩 끝내고 다음으로.** 몰아 쓰고 나중에 검토하면 같은 글을 세 번 만진다.
글을 고치면 계획서도 고친다. 문장 훑기 `scripts/prose-scan.mjs`.
막는 것: lint·factcheck·answer-check(빌드) → gate.mjs(커밋) → hook-push-guard(git).

## 7. 장치가 진짜 잡는지 (숫자로 댄다)

```bash
node scripts/selftest/mutate.mjs  # 결함 32종 32/32   (gate 8/8 · hook 13/13 · build-checks 4/4)
```

검사기를 고쳤으면 여기부터. "작동한다"는 말 대신 숫자를 댄다.
새 결함을 찾으면 규칙만 붙이지 말고 **돌연변이 한 종을 추가**해 다시 잡히는지 실측한다.

## 8. 푸시

`verify-3way --all` PASS · `check-constants` PASS · 글 만졌으면 `gate.mjs` PASS ·
검사기 고쳤으면 `mutate.mjs` 32/32 · `tsc --noEmit` 0 · 잘림 확인 →
push-changes.bat → Cloudflare 빌드 확인 → push 후 `verify-3way --all`(--no-gov 빼고) 재확인.
