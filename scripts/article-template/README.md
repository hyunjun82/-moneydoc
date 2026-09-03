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
