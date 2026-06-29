# 타이틀 생성 시스템 (scripts/title-system)

키워드 → 실측 검색어 → KB Think 톤 타이틀 → 허브·스포크 아키텍처.
품질은 `lint.mjs`가 코드로 강제한다 (통과 못 하면 페이지 생성 금지).

## 구성
- `pattern.json` — KB Think 70개 분석 규칙(포맷 6종·금지어·임계값). 데이터로 보관.
- `titles.{slug}.json` — 키워드별 큐레이션 타이틀 + 메타(mustInclude·format·researchSources).
- `lint.mjs` — 품질 게이트. 키워드 박힘·클릭베이트 금지·ㅣ 비율·포맷 다양성 검사.
- `build-architecture.mjs` — 검증된 타이틀 → 라우트 + funnel 링크맵 산출(`out/`).

## 워크플로
1. **수집(Claude in Chrome)** — 구글 `?q={키워드}&hl=ko&gl=kr`에서 `find`로
   관련 질문(PAA) + 관련 검색어 추출. 네이버는 차단 → 사용자 복붙 폴백.
   결과를 `titles.{slug}.json`의 `researchSources`에 기록.
2. **타이틀 작성** — 수집한 검색어를 의도 클러스터로 묶고, 각 롱테일 = 스포크 1개.
   `pattern.json` 포맷을 돌려가며 작성(ㅣ 최소). `mustInclude`에 핵심 키워드 명시.
3. **품질 검사** — `node scripts/title-system/lint.mjs scripts/title-system/titles.{slug}.json`
   → PASS여야 다음 단계.
4. **아키텍처 산출** — `node scripts/title-system/build-architecture.mjs ...{slug}.json`
   → `out/{base}.architecture.json` (페이지 생성 입력).
5. **페이지 생성** — 아키텍처대로 Article(.ts) + page.tsx 생성, 각 스포크에 허브·계산기 funnel 버튼.

## 검증 기준 (pattern.json rules)
- 필수 키워드(mustInclude) 전부 제목에 존재
- 클릭베이트 금지어 없음 ("한 줄로/갈립니다/충격" 등)
- ㅣ 비율 ≤ 15%, 한 포맷 ≤ 55%, 포맷 ≥ 3종
- 제목 12~48자, 중복 없음

## 새 키워드 추가
`titles.기초연금.json` 처럼 같은 스키마로 만들고 1~4단계 반복.
