# 가이드 글 v2 템플릿 (대량 생성용)

글 하나 = 스펙 파일 하나. 마크업·CSS·런타임·SEO·이미지는 전부 공용이라 UI 는 한 번에 바뀌고, 품질은 lint 가 지킨다.

```
articles/index.mjs              글 목록 (slug · cat · catLabel · crumb)
articles/<slug>.mjs             글 스펙: 엔진 값으로 문장·표·출처를 만든다 (숫자 손입력 없음)
render.mjs                      공용 렌더러 (블록 → HTML, 히어로 SVG, 런타임 JS)
v2.css                          공용 스타일 (빨강 단일 강조, 표 캡션, 모바일 카드형 표, 타임라인, 흐름도)
lint.mjs                        품질 게이트 (FAIL = 빌드 중단)
build.mjs                       스펙 → lint → 위젯 산식 엔진 대조 → HTML/SVG → PNG → Next 변환
render-og.mjs                   SVG → 1200×630 PNG (디스커버 og:image)
convert-v2.mjs                  미리보기 → Next 페이지·데이터·CSS(.md-v2 한정, 접두사 v2-)·스크립트 레지스트리·public/og
```

## 한 편 만들기

```bash
# 1) articles/index.mjs 에 한 줄 추가, articles/<slug>.mjs 스펙 작성 (아래 규칙)
node scripts/article-template/lint.mjs <slug>          # PASS 여야 진행
node scripts/article-template/build.mjs <slug>         # lint → 산식 대조 → HTML → PNG → Next
npx tsc --noEmit -p . && npx next build                # 페이지 빌드
# 확인: .claude/launch.json static-out (out/ 폴더, 3200) 로 실제 페이지 보기
```

전체: `node scripts/article-template/build.mjs --all`

## 스펙 모양 (articles/<slug>.mjs)

`export default function article({ calculators, loadSpec, VERIFIED })` 가 아래 객체를 돌려준다.

| 키 | 내용 |
|---|---|
| slug, cat, catLabel, crumb | 라우트·빵부스러기 (index.mjs 와 같아야 함) |
| title, description | 제목(20~60자, 대시·파이프 금지) · 메타 설명(80~200자) |
| datePublished, verified, basis, readMinutes, badge | 날짜·기준·읽는 시간·검증 배지 |
| calc | `{ href, label }` 내 계산기 CTA (짧게: "○○ 계산기 바로가기") |
| hero | 디스커버 이미지 문구 `{ tag, line1, line2, sub1, sub2, foot, card{label,big,unit,l1,l2}, alt }` |
| intro | 서론 한 문단 (검색 결과 설명문으로도 쓰임) |
| answer | 즉답 카드 `{ label, quick[{chip, selected, big, unit, sub}], boxes[{title,text}] }` |
| keyPoints | 핵심콕콕 `{ title, rows[[k, v]] }` |
| sections | `[{ id, h2, sub, blocks[] }]` H2 는 검색어형 질문 |
| faq | `[[q, a]]` 5개 이상, 질문은 `?` 로 끝 |
| summary | 정리 3줄 이상 |
| sources | `[['법령', …], ['행정규칙·정부 안내', …], ['정부 도구', …]]` |
| related | 관련 글 2개 이상 `{ kind, label, href }` |

### 블록 타입

| type | 용도 | 필드 |
|---|---|---|
| p | 문단 | `lead`, `ans`(굵은 첫 문장), `text` |
| h3 | 소소제목 | `id`, `text` |
| note | 빨간 왼줄 강조 | `title`, `text` |
| fn | 각주(법 조문 허용) | `text` |
| tree | 판정 트리 | `id`, `questions[{q, hint, no{title,text}}]`, `ok{title,text}` |
| table | 표 (캡션 필수) | `caption`, `headers`, `rows[{cells, hi, docs}]`, `text`(글자 표), `compact`+`id`+`moreLabel`+`x`(모바일 숨김 열), `net`(강조 열), `fn` |
| flow | 산식 흐름도 | `label`, `steps[{label, value, sub, op}]` |
| timeline | 회차·기간 | `label`, `items[{step, title, text, tag, mark}]` |
| steps | 절차 카드 | `items[{title, text, meta, link{label(≤14자), href}}]` |
| tips | 팁 목록 | `items[{title, text}]` |
| widget | 글 안 계산기 | `label, title, note, inputs, outputs, port(브라우저 산식), js, check(port→{n,bad})` |
| html | 예외용 원시 HTML | `html` |

서류 칩: `docs([{label, href}])` (href 없으면 회색 = 병원·회사 발급).


## 키워드 → 글 (한 편 만드는 실제 순서)

사용자가 키워드(주제어 · 연관검색어 · 자모 자동완성 · 지식iN 실제 질문)를 주면 아래 순서로 간다. 손으로 숫자를 치는 단계가 없다.

```
brief/<slug>.json      키워드·검색어·필수 키워드·출처 URL (정부·법령 페이지). 여기서 시작
      ↓  node scripts/article-template/evidence.mjs <slug>
evidence/<slug>/N.json 출처 페이지 본문 텍스트 + N.png 전체 캡처 (Playwright). must 문구가 없으면 저장 안 됨
      ↓  articles/<slug>.mjs 스펙 작성 (숫자는 엔진 값 · 파생값은 derive() · 문장은 근거 텍스트 기반)
      ↓  node scripts/article-template/build.mjs <slug>
lint(형식) → 사실 대조(factcheck) → 위젯 산식 엔진 대조 → HTML → og PNG → Next 페이지
```

**사실 대조(factcheck.mjs)가 막는 것**: 글의 모든 숫자는 ① 엔진 결과·상수 ② `derive()`로 등록한 산술 파생값 ③ 근거 텍스트에 있는 값, 셋 중 하나여야 한다. 조문("제68조", "별표2")은 근거 텍스트에 있어야 한다. `mustInclude` 키워드는 제목·소제목·FAQ 에 있어야 하고 `queries`(실제 검색어)는 80% 이상 본문에 등장해야 한다. 하나라도 어긋나면 빌드 FAIL. 면제는 단위 없는 31 이하 숫자(세 가지, 4단계)와 연도뿐.

**근거 인용(claims)**: 조건·기준을 말하는 문장(수급요건·기한·상한·요율 등)마다 스펙 `claims: [{ src: 근거번호, quote: '원문', note }]` 를 5개 이상 둔다. quote 는 근거 텍스트에 **글자 그대로** 있어야 한다(공백·콤마만 무시). 원문을 먼저 옮겨 놓고 그 뜻대로 문장을 쓰는 순서라, "숫자는 맞는데 조건이 틀린" 해석 오류를 막는다. 실업급여 글에서 첫 실행에 10건 중 3건이 걸렸다(내 기억으로 쓴 요약이 원문과 달랐다).

**번역투 lint**: "~에 대한 ○○", "~하는 것이다", 이중 피동, "~을 통해", "이러한", "그럼에도 불구하고", "필요로 하다", "~하게 되다" 등 12패턴은 FAIL. (fluent-korean · korean-report-style 의 규칙 중 기계 검사 가능한 것만 옮김. 문체 전체 판단은 여전히 사람이 읽는다.)

**brief 작성 규칙**
- `sources`: 법령은 law.go.kr(조문이 iframe 이라 evidence.mjs 가 처리), 제도 안내는 정부 사이트(고용24·정부24·생활법령·정책브리핑), 수치는 발표 기관 원문(최저임금위원회 등). 블로그·뉴스 금지.
- `must`: 그 페이지에 꼭 있어야 하는 문구(조문 번호·핵심 숫자). 법령은 "11만3500원"처럼 한글 혼용 표기이므로 그대로 적는다(대조기는 113500 으로도 읽는다).
- 지식iN 복붙 같은 텍스트 소스는 `{ "label", "file": "evidence/<slug>/qna.txt" }` 로.

실업급여 글이 기준 샘플: `brief/unemployment-benefit-guide.json` → 근거 10건 → `articles/unemployment-benefit-guide.mjs`.

## 글 규칙 (lint 가 검사)

- 해요체. 합니다·입니다 금지. 문장 100자 이하(표·칩 제외). 대시(—)·파이프(|) 금지.
- 본문에 법 조문 인용 금지(제N조, §, 별표N). 조문은 `fn` 과 `sources` 에서만.
- 자기 언급 금지("검증했어요", "맞춰 봤어요"). 검증 표시는 배지·출처에서만.
- H2·H3 는 검색어형(PAA) 질문. 표 캡션 필수. FAQ 5개 이상. 서론 필수. 출처에 법령 + 정부 도구·안내.
- 절차 버튼 문구 14자 이하, 외부 링크 https, 내부 CTA 만 `/` 경로.
- 위젯은 `port` + `check` 필수. 엔진과 1원이라도 다르면 빌드 실패.

## 근거 확인 (lint 가 못 하는 것, 사람이 한다)

- 숫자: 엔진(정부 대조 0원) 값만. 엔진에 없는 숫자(연도별 상한 등)는 법령 원문·정부 안내에서 확인하고 `sources` 에 적는다.
- 서류 딥링크: 실제로 열어 페이지 제목까지 확인한 공식 URL 만 (정부24·대법원·4대보험·노동포털·고용24).
- 정부 도구가 법령과 다르면(예: 고용24 상한) 법령을 따르고 본문에서 그 사실을 밝힌다.
