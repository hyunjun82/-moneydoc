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
scripts/verify-system/                        자동 검증 (계산기 수치)
scripts/title-system/                         타이틀 생성 + 품질 게이트
```

JSON case에 `govSource.govExpected` 자동 채움 (scrape-gov.mjs가 함, 손으로 X).

## 6. 작업 우선순위

1. `verify-3way.mjs --all` 리포트의 FAIL 우선
2. 패턴별: 🔴 산식/데이터 오류 → engine.js 수정 / 🟡 정책 갱신 → JSON expected / 🟢 round Δ1 → 통일

## 7. 푸시

1. `verify-3way.mjs --all` PASS
2. `node scripts/verify-system/check-constants.mjs` PASS (상수 출처 게이트)
2-1. 글을 만졌으면 `node scripts/gate.mjs <주제>` PASS · 검사기를 고쳤으면 `node scripts/selftest/mutate.mjs` 20/20
3. `npx tsc --noEmit -p .` 0 에러
4. truncation 체크
5. push-changes.bat → Cloudflare 빌드 확인
6. push 후 `verify-3way.mjs --all` (--no-gov 빼고) → 라이브+정부 일치 재확인

### 7-1. 상수 출처 게이트 (왜 필요한가)

verify-3way 는 "엔진 == JSON 기대값" 만 본다. 기대값 자체가 **옛 고시로 만들어졌으면 그대로 PASS** 한다.
매년 고시로 바뀌는 값(기초연금 기준연금액, 기준 중위소득 등)은 이 구멍에 그대로 빠진다.

`check-constants.mjs` 가 그 앞단을 막는다.

- 상수·표가 있는 모든 계산기는 `scripts/verify-system/constants-classification.json` 의
  **annual / statutory / pending** 중 하나에 반드시 들어가야 한다. 분류가 없으면 FAIL.
- `annual` 은 `verification.constantsSource` (고시명·고시번호·URL·확인일·값·원문 인용) 필수.
  적어 둔 값과 실제 상수가 달라지면 FAIL.
- `pending` 은 아직 출처를 못 적은 것. 경고로 계속 보이며 하나씩 `annual` 로 옮긴다.
- 확인일이 180일을 넘으면 경고. 고시를 다시 열어 대조하고 `checkedAt` 을 갱신한다.

## 8. 글 쓰기 규칙 (어기면 빌드가 막힌다)

해요체 / 문장 100자 이하 / 대시·파이프 금지 / 본문에 법 조문 금지(출처·각주만) /
소제목은 **질문형**(~나요·~까요·물음표) / 표 캡션 필수 / 숫자는 엔진 값이나 근거에 있는 값만 /
제목은 직접 짓지 말고 **실측 검색어**에서 뽑는다 (`scripts/keyword-data/`).

## 9. 글 하나가 나오는 순서 (건너뛸 수 없다)

```
입력  키워드 · 연관검색어 · 지식iN         사용자가 준다. scripts/keyword-data/ 에 넣는다
 1 제목·소제목   실측 검색어에서만. titles.{주제}-v2.json 에 저장
 2 근거 수집     node scripts/article-template/evidence.mjs <slug>
 3 근거 읽기     주장마다 원문을 스펙의 claims 에 인용
 4 글 작성       scripts/article-template/articles/<slug>.mjs
 5 빌드          node scripts/article-template/build.mjs <slug>
 6 독자 검토     검색어를 들고 페이지를 처음부터 끝까지 읽는다
 7 검토 기록     node scripts/write-review.mjs <주제> <slug> --query= --titleKeyword= --hard= --removed= --deeper=
 8 게이트        node scripts/gate.mjs <주제>   PASS 여야 **다음 글**
```

**한 편씩 끝내고 다음으로 간다.** 몰아 쓰고 나중에 검토하면 같은 글을 세 번 만지게 된다.

### 9-1. 장치 (지침이 아니라 이것이 막는다)

| 장치 | 언제 | 무엇을 |
|---|---|---|
| `article-template/lint.mjs` | 빌드 | 해요체 · 문장 100자 · 대시 금지 · 소제목 질문형 · 표 캡션 · 렌더 못 하는 link |
| `article-template/factcheck.mjs` | 빌드 | 숫자는 엔진 값이나 근거에 · 인용은 원문 그대로 · 조문 번호 · 검색어 커버 80% |
| `article-template/answer-check.mjs` | 빌드 | **회피 답**이면 근거에서 답 후보를 들이대고 멈춤 · 일수×일액 검산 · undefined 노출 |
| `gate.mjs` | 커밋 | 제목-소제목 · 계획 대조(계산기·링크·시각화) · 죽은 링크 · 빵부스러기 · 중복 문장 · **독자 검토** |
| `hook-push-guard.mjs` | git | 글이 바뀐 commit/push 는 게이트를 통과해야 한다. FAIL 이면 명령이 막힌다 |
| `prose-scan.mjs` | 수시 | 한자투 · 명사형 종결 · "여부를 확인" · "및" (법령 인용·출처는 뺀다) |

### 9-2. 장치가 진짜 잡는지 (숫자로 댄다)

```bash
node scripts/selftest/mutate.mjs        # 결함 20종을 심어 본다. 20/20 이어야 한다
node scripts/selftest/gate.mjs          # 게이트 8/8
node scripts/selftest/hook.mjs          # 훅 13/13
```

**검사기를 고쳤으면 `mutate.mjs` 부터 돌린다.** "작동한다" 는 말 대신 이 숫자를 댄다.
새 결함을 발견하면 규칙만 붙이지 말고 **돌연변이 한 종을 추가**해서 다시 잡히는지 실측한다.

### 9-3. 독자 검토(review) 필수 항목

`titleKeyword`(제목이 나온 실측 검색어) · `query` · `firstScreenAnswer` · `h2Answers[{h2,ans}]`
· `hardWords` · `removed` · `deeperThanHub` · `specHash`(글이 바뀌면 다시 읽게 된다).
`write-review.mjs` 가 페이지 원문과 해시를 자동으로 채운다. **판단은 사람이 적는다.**

게이트가 보는 것: `ans` 가 페이지에 그대로 있는가 · 소제목 수와 답 수가 같은가 · 답이 회피가
아닌가 · `titleKeyword` 가 수집 검색어에 있는가 · `specHash` 가 지금 스펙과 같은가.

### 9-4. 계획서가 단일 진실 원천

`scripts/title-system/titles.{주제}-v2.json` 의 글마다: `title` `mustCover` `h2` · `calc:{on,why}`
· `links:[{to,why}]` · `shape:[]` · `evidence` · `review`. 글을 고치면 계획서도 고친다.
보기: `node scripts/title-system/render-plan.mjs`.

---

규칙이 **왜** 생겼는지는 `scripts/WHY.md` 에 있다. 규칙을 지우거나 바꾸기 전에 읽는다.
새 사고가 나면 WHY.md 에 적고 이 파일은 건드리지 않는다.
