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

## 8. 타이틀 생성 시스템 (콘텐츠 글 제목)

계산기·허브·스포크 글 **제목은 직접 짓지 말고** 이 시스템으로 뽑는다.

```bash
# 1) 실측 수집: Claude in Chrome 으로 구글 PAA + 연관검색어
#    https://www.google.com/search?q={키워드}&hl=ko&gl=kr   (네이버 전면 차단 → 사용자 복붙 폴백)
# 2) titles.{slug}.json 작성 (KB Think 패턴, mustInclude 키워드 명시)
node scripts/title-system/lint.mjs scripts/title-system/titles.{slug}.json   # PASS여야 진행
node scripts/title-system/build-architecture.mjs scripts/title-system/titles.{slug}.json
node scripts/title-system/test.mjs                                           # 회귀 10건 (10/10)
```

규칙·패턴: `scripts/title-system/README.md` + `pattern.json`.
핵심: 검색 키워드 그대로 박기 / 클릭베이트 금지 / ㅣ≤15% / 포맷 다양(≥3종, 한 포맷≤55%).
**lint PASS = 페이지 생성 가능. FAIL = 제목 다시.**

## 9. 가이드 글 v2 템플릿 (대량 생성)

글은 손으로 HTML 쓰지 않는다. 스펙 하나 = 글 하나. 상세 `scripts/article-template/README.md`.

```bash
node scripts/article-template/lint.mjs <slug>    # 품질 게이트 PASS 여야 진행
node scripts/article-template/build.mjs <slug>   # lint → 위젯 산식 엔진 대조 → HTML → og PNG → Next 페이지
```

규칙: 해요체 / 문장 100자 이하 / 대시·파이프 금지 / 본문 법 조문 금지(출처·각주만) / H2 는 검색어형 질문 / 표 캡션 필수 / 숫자는 엔진 값만.

## 10. 글 하나가 나오는 순서 (건너뛸 수 없다)

```
입력  키워드 · 연관검색어 · 지식iN                ← 사용자가 준다. scripts/keyword-data/ 에 넣는다
  1  제목·소제목     실측 검색어에서만. scripts/title-system/titles.{주제}-v2.json 에 저장
  2  근거 수집       node scripts/article-template/evidence.mjs <slug>   (Playwright, 텍스트+캡처)
  3  근거 읽기       주장마다 근거 어디서 나왔는지 스펙의 claims 에 원문 인용
  4  글 작성         scripts/article-template/articles/<slug>.mjs  (스펙 하나 = 글 하나)
  5  빌드            node scripts/article-template/build.mjs <slug> (lint → 인용 대조 → HTML → Next)
  6  독자 검토       검색어를 들고 빌드된 페이지를 처음부터 끝까지 읽고, 계획서 review 에 적는다
  7  게이트          node scripts/gate.mjs <주제>  → PASS 여야 다음 글
```

**6번이 핵심이고, 예전엔 이게 없어서 개판이 났다.** 표 개수·인용 유무만 세고 "검색한 사람이 답을 얻었나" 를 안 읽었다.

### 10-1. 지침이 아니라 장치로 막는다

MD 에 적힌 건 건너뛸 수 있다. 그래서 세 겹으로 막는다.

| 장치 | 무엇을 막나 |
|---|---|
| `scripts/gate.mjs` | 사실(숫자·인용) · 제목-소제목 일치 · 계획 대조(계산기·링크·시각화) · 죽은 링크 · 빵부스러기 · **독자 검토** |
| `scripts/hook-push-guard.mjs` (PreToolUse) | `git commit` · `git push` 를 치면 게이트와 계산기 검증이 자동으로 돈다. FAIL 이면 **명령이 막힌다** |
| 계획서 `review` 필드 | 검토했다는 증거를 **페이지에서 복사한 문장**으로 적게 한다. 게이트가 그 문장이 페이지에 그대로 있는지 대조한다. 읽지 않고는 못 쓴다 |
| `scripts/selftest/gate.mjs` · `hook.mjs` | 장치가 진짜 잡는지 **고의 위반으로 실측**한다 (게이트 8/8 · 훅 13/13). gate.mjs 나 훅을 고쳤으면 반드시 돌린다. "작동한다" 는 말 대신 이 숫자를 댄다 |

### 10-2. 독자 검토(review) 적는 법

계획서의 해당 글에 이렇게 넣는다. 전부 필수.

```json
"review": {
  "date": "2026-09-04",
  "specHash": "0d880b589575  ← 글을 읽은 뒤 게이트가 알려주는 스펙 해시. 글이 바뀌면 달라져 다시 읽게 된다",
  "query": "실업급여 4차",
  "titleKeyword": "실업급여 4차   ← 제목이 나온 실측 검색어. 게이트가 수집 데이터에 있는지 대조한다",
  "firstScreenAnswer": "첫 소제목 앞에서 독자가 보는 답. 페이지 원문 그대로 복사",
  "h2Answers": [ { "h2": "소제목 그대로", "ans": "그 소제목 아래 첫 문장. 원문 그대로" } ],
  "hardWords": ["수급자격증 → 처음 나올 때 풀어 씀"],
  "removed": ["규정이 이렇게 잡아 둔 거예요 → 독자에게 필요 없어 삭제"],
  "deeperThanHub": "허브는 회차를 표 한 줄로 다룸. 이 글은 회차별 간격표 + 심층상담 + 출석 규칙"
}
```

게이트가 보는 것: `ans` 가 페이지에 그대로 있는가 · 소제목 수와 답 수가 같은가 · 답이 "사람마다 달라요 / 확인해 보세요" 식 **회피**가 아닌가 · 검토 때 적은 `specHash` 가 지금 스펙과 같은가 (다르면 검토 뒤에 글이 바뀐 것) · `titleKeyword` 가 수집한 검색어에 실제로 있는가.

### 10-3. 규칙이 왜 생겼는지 (지우기 전에 읽을 것)

| 규칙 | 사고 |
|---|---|
| 제목 앞부분은 실측 검색어 | "노동청 진정과 함께 가는 법" 을 지어냈다. 데이터에 0건 |
| 제목 **뒷부분**도 실측 검색어 | 앞부분만 검사했더니 뒤에 "내 월급이면 얼마인가요"(0건)·"1일 수령액"(0건)이 들어가 라이브까지 갔다. 기계는 "월급별"(평범한 말)과 "1일 수령액"(지어낸 말)을 못 가른다. 그래서 1인칭·클릭베이트만 기계가 막고, 제목이 나온 검색어를 `review.titleKeyword` 에 적게 해 코퍼스와 대조한다 |
| 정부 브리핑은 연도를 본다 | 2022년 브리핑의 "4차부터 2회" 를 현행처럼 썼다 |
| 계산기 버튼은 계획과 일치 | lint 가 calc 를 강제해 25편 전부에 붙었다 |
| 링크는 계획서와 대조 | 최소 개수를 두면 난발. `links: [{to, why}]` 와만 맞춘다 |
| 계획한 시각 장치만 | 표 개수를 강제하니 억지 표. 허브는 **구조 참고지 시각화 복사 대상이 아니다** |
| 빵부스러기는 주제 구조 | `홈 › 정부지원금 › 실업급여` 로 남아 있었다 |
| 글자수·표·각주 개수는 **세지 않는다** | 세니까 군더더기가 생겼다. 답의 길이는 키워드마다 다르다 |

### 10-4. 계획서가 단일 진실 원천

`scripts/title-system/titles.{주제}-v2.json` 의 글마다: `title` `mustCover` `h2` · `calc:{on,why}` · `links:[{to,why}]` · `shape:[]` · `evidence` · `review`.
글을 고치면 계획서도 고친다. 게이트가 둘을 대조한다. 계획서 보기: `node scripts/title-system/render-plan.mjs`.
