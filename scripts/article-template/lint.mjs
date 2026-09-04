/**
 * 가이드 글 v2 품질 게이트. 스펙(렌더 전 데이터)을 검사한다. FAIL 이면 build.mjs 가 멈춘다.
 *
 * 사용자 확정 규칙
 *   - 제목·소제목·캡션에 대시(—)·파이프(|) 금지, 소제목은 검색어형 질문(PAA)
 *   - 해요체 (합니다·입니다 금지), 본문에 법 조문 인용 금지 (출처·각주에서만)
 *   - 문장 100자 이하 (표 셀·칩 제외), 자기 언급("검증했어요" 류) 금지
 *   - 표는 캡션 필수, FAQ 5개 이상, 서론 있음, 출처에 법령 + 정부 도구, CTA 는 내 사이트 링크
 *   - 외부 링크는 https 만, 히어로 alt 있음
 *
 *   node scripts/article-template/lint.mjs <slug>   (단독 실행)
 */
import path from 'node:path';
import { createRequire } from 'node:module';

const strip = (s) => String(s ?? '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const sentences = (s) => strip(s).split(/(?<=[.!?])\s+/).filter((x) => x.length > 1);
const BAD_DASH = /[—|]/;
const FORMAL = /(합니다|입니다|됩니다|습니다|십시오)(?=[\s.,!?)]|$)/;
// 반말 종결도 해요체가 아니다. 합니다체만 보다가 "~한다/~된다" 가 그냥 지나갔다 (돌연변이 37번).
// 법령 인용은 각주(fn)에 두므로 여기 걸리지 않는다.
const PLAIN = /(한다|된다|이다|아니다|있다|없다|같다)(?=[\s.,!?)]|$)/;
const LAW_INLINE = /(§\s?\d+|제\d+조|시행령\s*제|시행규칙\s*제|별표\s?\d)/;
const SELF_REF = /(검증했어요|확인했어요|맞춰 봤|대조했어요)/;
// 번역투·AI투 (fluent-korean · korean-report-style 규칙 중 기계 검사 가능한 것만). 걸리면 FAIL.
const AWKWARD = [
  [/에 대한 (이해|설명|정보|내용|부분)/, '"~에 대한 ○○" → "~을 ○○"'],
  [/하는 것이다|하는 것입니다|되는 것이다/, '"~하는 것이다" 명사화 → 동사로'],
  [/되어지|되어져|되여/, '이중 피동 "~되어지다"'],
  [/(있어서는|에 있어서)/, '"~에 있어서" → "~에서" 또는 삭제'],
  [/을 통해서|를 통해서|을 통하여|를 통하여/, '"~을 통해" → "~로", "~해서"'],
  [/(적인|적으로) (측면|부분|관점)/, '"~적인 측면" 번역투'],
  [/시키(는|고|며|다)(?! 위|주)/, '"~시키다" 남용 (동사 그대로)'],
  [/그럼에도 불구하고/, '"그럼에도 불구하고" → "그래도"'],
  [/필요로 하(는|다|고)/, '"필요로 하다" → "필요하다"'],
  [/이러한|그러한|저러한/, '"이러한" → "이런"'],
  [/할 수 있게 됩니다|할 수 있게 돼요|하게 됩니다/, '"~하게 되다" 피동 남용'],
  [/(여러분|독자 여러분)/, '독자 호칭 금지'],
];
// 한글은 \b 가 안 먹는다. 질문형 어미나 검색어 핵심어가 들어 있으면 통과.
// 소제목은 "검색어형 질문" 이어야 하는데, 예전 정규식이 '정리·방법·조건·기준·단계' 같은
// 명사형까지 통과시켰다. 그래서 "실업급여 대기기간 7일 정리" 가 질문 검사를 그냥 지나갔다.
// 돌연변이 시험(selftest/mutate.mjs 11번)으로 잡았다. 이제 종결형이나 물음표를 요구한다.
const PAA = /(나요|가요|까요|는지|ㄹ까)|\?/;

export function lint(a) {
  const out = [];
  const add = (where, msg) => out.push(`${where}: ${msg}`);
  const checkText = (where, text, { law = true, len = 100 } = {}) => {
    const t = strip(text);
    if (BAD_DASH.test(t)) add(where, `대시·파이프 사용: "${t.slice(0, 40)}"`);
    if (FORMAL.test(t)) add(where, `합니다체: "${t.match(FORMAL)[0]}"`);
    if (PLAIN.test(t)) add(where, `반말 종결: "${t.match(PLAIN)[0]}" (해요체로 쓴다)`);
    if (law && LAW_INLINE.test(t)) add(where, `본문 법 조문 인용: "${t.match(LAW_INLINE)[0]}" (출처·각주로)`);
    if (SELF_REF.test(t)) add(where, `자기 언급: "${t.match(SELF_REF)[0]}"`);
    for (const [re, why] of AWKWARD) if (re.test(t)) add(where, `번역투: ${why} ← "${t.match(re)[0]}"`);
    for (const s of sentences(t)) if (s.length > len) add(where, `문장 ${s.length}자 (>${len}): "${s.slice(0, 50)}…"`);
  };

  // 머리
  if (!a.title || a.title.length < 20 || a.title.length > 60) add('title', `길이 ${a.title?.length ?? 0} (20~60)`);
  if (BAD_DASH.test(a.title)) add('title', '대시·파이프');
  if (!a.description || a.description.length < 80 || a.description.length > 200) add('description', `길이 ${a.description?.length ?? 0} (80~200)`);
  if (!a.intro || strip(a.intro).length < 80) add('intro', '서론 없음 또는 80자 미만');
  checkText('intro', a.intro, { law: false });
  if (!a.hero?.alt) add('hero', 'alt 없음');
  // 계산기 CTA 는 선택이다. 계산기가 내는 숫자가 그 글의 답일 때만 단다.
  // 답이 절차나 조건인 글에 버튼을 달면 갈 이유가 없는 곳으로 보내게 된다.
  if (a.calc && !a.calc.href?.startsWith('/')) add('calc', 'CTA 를 달았으면 내 사이트 링크여야 함');
  if (!a.answer?.quick?.some((q) => q.selected)) add('answer', '즉답 칩 selected 없음');
  for (const b of a.answer?.boxes ?? []) checkText('answer.box', `${b.title}. ${b.text}`, { law: false });
  for (const [k, v] of a.keyPoints?.rows ?? []) checkText(`핵심콕콕 ${k}`, v, { law: false, len: 120 });

  // 섹션
  let tables = 0, h2s = 0, visuals = 0;
  for (const s of a.sections) {
    if (s.h2) {
      h2s++;
      if (BAD_DASH.test(s.h2)) add(`h2 ${s.id}`, '대시·파이프');
      if (!PAA.test(s.h2)) add(`h2 ${s.id}`, `검색어형 질문이 아님: "${s.h2}"`);
      if (!s.sub) add(`h2 ${s.id}`, '부제(small) 없음');
    }
    for (const b of s.blocks) {
      const w = `${s.id}/${b.type}`;
      // 렌더러가 link 를 그리는 블록은 정해져 있다. 다른 블록에 달면 조용히 사라진다.
      // 표(2026-09-04)와 p(같은 날) 에서 실제로 링크가 사라진 채 배포됐다. 이제는 lint 가 막는다.
      if (b.link && !['p', 'note'].includes(b.type)) add(w, `이 블록은 link 를 렌더하지 않는다 (p·note 만 가능, 표는 행에 link)`);
      switch (b.type) {
        case 'p': checkText(w, `${b.ans ?? ''} ${b.text ?? ''}`); break;
        case 'h3': if (BAD_DASH.test(b.text)) add(w, '대시·파이프'); if (!PAA.test(b.text)) add(w, `검색어형이 아님: "${b.text}"`); break;
        case 'note': checkText(w, `${b.title}. ${b.text}`); break;
        case 'fn': break;
        case 'tree': case 'timeline': case 'steps': case 'flow':
          visuals++;
          break;
        case 'table':
          tables++;
          if (!b.caption) add(w, '캡션 없음');
          if (BAD_DASH.test(b.caption ?? '')) add(w, '캡션 대시·파이프');
          if (!b.headers?.length) add(w, '헤더 없음');
          for (const r of b.rows ?? []) if (r.cells.length !== b.headers.length) add(w, `열 수 불일치 (${r.cells.length}/${b.headers.length}): ${strip(r.cells[0])}`);
          if (b.compact && !b.id) add(w, 'compact 표는 id 필요');
          break;
        case 'tips': for (const t of b.items) checkText(`${w} ${t.title}`, t.text); break;
        case 'steps': for (const st of b.items) { checkText(`${w} ${st.title}`, st.text, { len: 120 }); if (st.link && strip(st.link.label).length > 14) add(w, `버튼 문구 길다: "${st.link.label}"`); if (st.link && !/^(https:|\/)/.test(st.link.href)) add(w, `링크는 https 또는 내부: ${st.link.href}`); } break;
        case 'tree': for (const q of b.questions) { checkText(`${w} ${q.q}`, q.hint, { len: 120 }); checkText(`${w} no`, q.no.text, { len: 120 }); } break;
        case 'flow': case 'timeline': if (!b.label) add(w, 'label 없음'); break;
        case 'widget': if (!b.port || !b.check) add(w, '위젯은 port + check 필수'); break;
        case 'html': break;
        default: add(w, `알 수 없는 블록 타입 ${b.type}`);
      }
    }
  }
  if (h2s < 5) add('sections', `H2 ${h2s}개 (5개 이상)`);
  // 시각화는 글 내용에 맞게 고른다. 같은 종류를 한 글에서 2번 넘게 쓰면 템플릿 복제 신호.
  const blockKinds = a.sections.flatMap((s) => s.blocks.map((b) => b.type));
  for (const kind of ['timeline', 'steps', 'tree', 'flow']) {
    const n = blockKinds.filter((k) => k === kind).length;
    if (n > 1) add('sections', `${kind} 블록 ${n}개 — 같은 시각화 반복 (글마다 내용에 맞는 것 하나만)`);
  }
  // 시각 장치는 글의 주제가 부르는 것을 쓴다. 표 개수를 강제하면 억지 표가 생긴다.
  // 어떤 장치를 쓸지는 계획서(shape)가 정하고, 실제로 들어갔는지는 gate.mjs 가 본다.
  if (tables + visuals === 0) add('sections', '시각 장치가 하나도 없음 (표·트리·타임라인·절차·흐름도 중 하나)');

  // 꼬리
  if ((a.faq?.length ?? 0) < 5) add('faq', `${a.faq?.length ?? 0}개 (5개 이상)`);
  // 히어로 카드는 본문 요약이다. 카드에 적은 숫자가 글 어디에도 없으면 둘이 어긋난 것이다.
  // 검사가 없어서 대기기간 7일 글의 카드만 14 로 바꿔도 통과했다 (돌연변이 34번).
  {
    // 히어로 카드는 OG 이미지에만 들어간다. "7을 14로" 같은 의미 뒤바뀜은 기계가 못 가린다
    // (본문 다른 곳에 14가 정당하게 있을 수 있다). 여기서는 **글 어디에도 없는 숫자**만 잡는다.
    const bodyText = JSON.stringify([a.intro, a.answer, a.keyPoints, a.sections, a.faq, a.summary]);
    const cardNums = String(`${a.hero?.card?.big ?? ''} ${a.hero?.card?.l1 ?? ''} ${a.hero?.card?.l2 ?? ''}`).match(/\d[\d,]*/g) ?? [];
    for (const n of cardNums) {
      if (!bodyText.replace(/,/g, '').includes(n.replace(/,/g, ''))) add('hero.card', `카드의 "${n}" 이 본문에 없다. 카드와 본문이 어긋났다`);
    }
  }

  for (const [q, ans] of a.faq ?? []) { if (!/\?$/.test(q)) add('faq', `질문은 ?로 끝나야 함: "${q}"`); checkText(`faq ${q.slice(0, 12)}`, ans, { law: false, len: 120 }); }
  if ((a.summary?.length ?? 0) < 3) add('summary', '정리 3줄 이상');
  const srcKeys = (a.sources ?? []).map(([k]) => k);
  if (!srcKeys.includes('법령')) add('sources', '법령 항목 없음');
  if (!srcKeys.some((k) => /정부 도구|정부 안내/.test(k))) add('sources', '정부 도구·안내 항목 없음');
  if ((a.related?.length ?? 0) < 2) add('related', '관련 글 2개 이상');
  if ((a.claims?.length ?? 0) < 5) add('claims', `근거 인용(claims) ${a.claims?.length ?? 0}개 (조건·기준을 말하는 문장마다 원문 인용, 5개 이상)`);
  for (const c of a.claims ?? []) if (!c.src || !c.quote || c.quote.length < 8) add('claims', '각 인용은 { src: 근거번호, quote: 원문 8자 이상 }');
  return out;
}

// 단독 실행
if (process.argv[1] && path.basename(process.argv[1]) === 'lint.mjs') {
  const slug = process.argv[2];
  if (!slug) { console.error('usage: lint.mjs <slug>'); process.exit(1); }
  const { ROOT } = await import('./render.mjs');
  const require = createRequire(import.meta.url);
  const { calculators } = require(path.join(ROOT, 'lib/calc/engine.js'));
  const loadSpec = (p) => require(path.join(ROOT, 'moneydoc-data/calculators', `${p}.json`));
  const mod = await import(`./articles/${slug}.mjs`);
  const problems = lint(mod.default({ calculators, loadSpec, VERIFIED: '2026-09-02' }));
  if (problems.length) { console.log(`FAIL ${problems.length}`); problems.forEach((p) => console.log(' -', p)); process.exit(1); }
  console.log('PASS');
}
