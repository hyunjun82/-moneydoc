/**
 * 되풀이·문맥 검사 — 검토자가 6편에서 매번 잡던 판단 여섯 가지를 기계로 옮겼다 (2026-09-05).
 *
 *   검토자는 글자를 읽고 판단한다. 그중 "같은 말을 몇 번 했나", "이 행이 저 문장의 복사인가",
 *   "링크 라벨이 앞 문장과 붙나", "링크가 버튼 클래스를 달았나" 는 글자 비교로 잡힌다.
 *   LLM 검토 전에 이걸로 걸러야 검토자가 진짜 판단(허브보다 깊은가, 답이 되는가)에 집중한다.
 *
 *   비슷함은 글자 두 개짜리 조각(바이그램)의 겹침 비율로 잰다. 0.6 이상이면 같은 말로 본다.
 *   도입일(2026-09-05) 이후 글은 FAIL, 그 전 글은 경고만 (build.mjs 가 strict 로 가른다).
 */

const strip = (x) => String(x ?? '').replace(/<[^>]+>/g, ' ').replace(/&quot;/g, '"').replace(/&[a-z#0-9]+;/g, ' ').replace(/\s+/g, ' ').trim();
const norm = (s) => s.replace(/[\s.,·:;!?()\[\]"'「」『』]/g, '');
const grams = (s) => { const t = norm(s); const g = new Set(); for (let i = 0; i < t.length - 1; i++) g.add(t.slice(i, i + 2)); return g; };
const jaccard = (a, b) => { const A = grams(a), B = grams(b); if (!A.size || !B.size) return 0; let n = 0; for (const x of A) if (B.has(x)) n++; return n / (A.size + B.size - n); };
/** a 의 조각이 b 안에 얼마나 들어 있나 (a 가 b 의 일부를 옮겨 적었는지) */
const covered = (a, b) => { const A = grams(a), B = grams(b); if (!A.size) return 0; let n = 0; for (const x of A) if (B.has(x)) n++; return n / A.size; };
const sentences = (t) => strip(t).split(/(?<=[.!?])\s+/).map((s) => s.trim()).filter((s) => s.length >= 20 && /[가-힣]/.test(s));

const SIM = 0.6;
const STOP = new Set(['실업급여', '방법', '기준', '신청', '조건', '확인', '바로가기', '하기', '조회', '안내', '정리', '보기', '이렇게', '자세히', '되나요', '하나요', '인가요', '어떻게', '무엇', '언제', '얼마', '경우', '내용', '관련', '종류', '차이']);

export function proseStyleCheck({ html }) {
  const out = [];
  const body0 = html.replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<script[\s\S]*?<\/script>/g, ' ');
  const main = (body0.match(/<main[\s\S]*?<\/main>/) ?? [body0])[0];

  // ── 영역 나누기 ──────────────────────────────────────────────────────────
  const kk = [...main.matchAll(/<dd>([\s\S]*?)<\/dd>/g)].map((m) => strip(m[1]));
  const sum = [...(main.match(/<section class="sum"[\s\S]*?<\/section>/) ?? [''])[0].matchAll(/<li>([\s\S]*?)<\/li>/g)].map((m) => strip(m[1]));
  const smalls = [...main.matchAll(/<h2 id="s\d+">[\s\S]*?<small>([\s\S]*?)<\/small>/g)].map((m) => strip(m[1]));
  const faqAns = [...main.matchAll(/<details class="faq"[^>]*>[\s\S]*?<\/summary>([\s\S]*?)<\/details>/g)].map((m) => strip(m[1]).replace(/^A\s*/, ''));
  const firstH2 = main.indexOf('<h2 id="s');
  const endCands = ['<details class="faq"', '<section class="sum"', '<h2 id="faq"', '<h2 id="src"'].map((k) => main.indexOf(k, firstH2)).filter((i) => i > 0);
  const bodyEnd = endCands.length ? Math.min(...endCands) : main.length;
  const body = firstH2 < 0 ? '' : main.slice(firstH2, bodyEnd);
  const bodyNoFn = body.replace(/<p class="fn">[\s\S]*?<\/p>/g, ' ');
  const bodySents = sentences(bodyNoFn.replace(/<table[\s\S]*?<\/table>/g, ' '));

  // ── A. 같은 금액을 몇 번 썼나 (즉답·핵심콕콕·본문·FAQ·정리. 각주·출처 제외) ──
  {
    const scope = main.replace(/<p class="fn">[\s\S]*?<\/p>/g, ' ').replace(/<h2 id="src">[\s\S]*$/, ' ').replace(/<nav[\s\S]*?<\/nav>/g, ' ').replace(/<div class="toc[\s\S]*?<\/div>/g, ' ');
    const t = strip(scope);
    const cnt = {};
    for (const m of t.matchAll(/\d{1,3}(?:,\d{3})+\s?원/g)) { const k = m[0].replace(/\s/g, ''); cnt[k] = (cnt[k] ?? 0) + 1; }
    // 기준 금액(하루 66,048원 같은)은 즉답·핵심콕콕·본문·정리에 정상적으로 나온다. 5회부터 되풀이로 본다 (실측: 검토자가 6·7회를 잡았다).
    for (const [k, n] of Object.entries(cnt)) if (n > 4) out.push(`금액 "${k}" 이 ${n}회 되풀이된다 (4회까지)`);
  }

  // ── B. FAQ 답이 본문·핵심콕콕·정리 문장의 복사 ──
  for (const a of faqAns) for (const s of sentences(a)) {
    const hit = [...bodySents, ...kk, ...sum].find((b) => jaccard(s, b) >= SIM);
    if (hit) { out.push(`FAQ 답이 본문 복사다: "${s.slice(0, 40)}…" ≈ "${hit.slice(0, 40)}…"`); break; }
  }

  // ── C. 정리가 핵심콕콕 복사 ──
  for (const li of sum) { const hit = kk.find((d) => jaccard(li, d) >= SIM); if (hit) out.push(`정리가 핵심콕콕 복사다: "${li.slice(0, 40)}…" ≈ "${hit.slice(0, 40)}…"`); }

  // ── D. 핵심콕콕 행이 소제목 small 복사 ──
  for (const d of kk) { const hit = smalls.find((s) => s.length >= 12 && jaccard(d, s) >= SIM); if (hit) out.push(`핵심콕콕이 소제목 복사다: "${d.slice(0, 40)}…" ≈ "${hit}"`); }

  // ── E·F. 시각 장치 vs 그 섹션의 리드 / 장치 뒤 첫 문장 ──
  for (const sec of body.split(/(?=<h2 id="s\d+">)/).filter((x) => x.startsWith('<h2'))) {
    const h2 = strip((sec.match(/<h2 id="s\d+">([\s\S]*?)<small>/) ?? sec.match(/<h2 id="s\d+">([\s\S]*?)<\/h2>/) ?? ['', ''])[1]);
    const leads = sentences((sec.match(/<p class="lead">[\s\S]*?<\/p>/) ?? [''])[0]);
    const blocks = [...sec.matchAll(/(<table[\s\S]*?<\/table>|<div class="(?:flow|tree|tl|steps)[^"]*"[\s\S]*?<\/div>\s*<\/div>)/g)];
    for (const b of blocks) {
      const cells = [...b[0].matchAll(/<(?:td|th|b|span|i)[^>]*>([\s\S]*?)<\/(?:td|th|b|span|i)>/g)].map((m) => strip(m[1])).filter((c) => c.length >= 15);
      // F. 행이 리드 문장 복사
      for (const c of cells) { const hit = leads.find((l) => jaccard(c, l) >= SIM || covered(c, l) >= 0.8); if (hit) { out.push(`[${h2}] 표·장치 행이 리드 문장 복사다: "${c.slice(0, 40)}…"`); break; } }
      // E. 장치 바로 뒤 첫 문장이 장치 내용 되풀이
      const after = sec.slice(b.index + b[0].length);
      const nextP = (after.match(/<p(?![^>]*class="fn")[^>]*>([\s\S]*?)<\/p>/) ?? ['', ''])[1];
      const first = sentences(nextP)[0];
      const blockText = strip(b[0]);
      if (first && covered(first, blockText) >= 0.7) out.push(`[${h2}] 장치 뒤 첫 문장이 장치를 다시 읽어 준다: "${first.slice(0, 40)}…"`);
    }
  }

  // ── G. 링크 문맥: 문단·안내상자 안의 링크 라벨이 앞 글과 붙는가. 바깥 링크가 첫 화면인가 ──
  for (const m of main.matchAll(/<(p|div class="note")[^>]*>([\s\S]*?)<\/(?:p|div)>/g)) {
    const inner = m[2];
    for (const a of inner.matchAll(/<a class="go" href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)) {
      const href = a[1], label = strip(a[2]);
      const before = strip(inner.slice(Math.max(0, a.index - 220), a.index));
      const toks = label.split(/[^가-힣A-Za-z0-9]+/).filter((t) => t.length >= 2 && !STOP.has(t));
      // 조사·어미가 붙어 낱말이 달라진다(알바하면/알바이고). 앞 두 글자로 견준다.
      if (toks.length && !toks.some((t) => before.includes(t.slice(0, 2))))
        out.push(`링크 라벨이 앞 문장과 안 붙는다: "…${before.slice(-40)}" → [${label}]`);
      // 첫 화면 = 사이트 뿌리나 /cm/main.do 처럼 경로가 없는 메인. 신고센터의 /anmtDclrCntr/main.do 는 실제 화면이라 통과.
      if (/^https?:/.test(href) && /^https?:\/\/[^/]+\/?(?:(?:cm\/|nhis\/)?(?:main|index)\.(?:do|jsp|html?))?(?:\?.*)?$/.test(href))
        out.push(`바깥 링크가 첫 화면이다: [${label}] → ${href}. 실제 신고·조회 화면만 건다`);
    }
  }

  // ── H. 버튼 클래스 없는 링크 (파란 밑줄로 나간다) ──
  {
    const scope = main.replace(/<div class="crumb">[\s\S]*?<\/div>/g, ' ').replace(/<nav[\s\S]*?<\/nav>/g, ' ').replace(/<div class="toc[\s\S]*?<\/div>/g, ' ').replace(/<div class="rel">[\s\S]*?<\/div>/g, ' ').replace(/<ul class="toc[\s\S]*?<\/ul>/g, ' ');
    for (const a of scope.matchAll(/<a\s+([^>]*)>([\s\S]*?)<\/a>/g)) {
      const attrs = a[1];
      if (/href="#/.test(attrs)) continue;                          // 목차·앵커
      if (/class="[^"]*\b(go|doc|btn|calc)\b/.test(attrs)) continue;
      out.push(`버튼 클래스 없는 링크: [${strip(a[2]).slice(0, 30)}] ${(attrs.match(/href="([^"]+)"/) ?? ['', ''])[1]}`);
    }
  }
  return out;
}
