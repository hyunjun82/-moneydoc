#!/usr/bin/env node
/**
 * 글 한 편을 대화창 없이 끝까지 낸다. 사람은 결과 파일만 본다.
 *
 *   node scripts/article.mjs <spoke> [--hub=unemployment] [--rounds=3] [--model=claude-opus-5]
 *   node scripts/article.mjs unemployment-last-round-guide
 *
 * 순서 (새 검사기 없음. 있는 것 사이에 claude -p 를 끼운 것뿐)
 *   1 계획       titles.<hub>-v2.json 에서 제목·소제목·mustCover·links 를 읽는다 (제목은 사람이 계획서에 적는다)
 *   2 brief      없으면 계획서로 만든다. 근거는 허브 것을 같이 쓴다(reuseEvidence)
 *   3 수집       evidence.mjs  → 정부 페이지 본문 JSON + 전체 캡처 PNG      (Playwright)
 *   4 허브 파악  moneydoc.kr/<hub>/ 본문 + 이웃 글 소제목 전부                (Playwright)
 *   5 작성       claude -p 가 근거·캡처·허브·예시 스펙을 읽고 articles/<slug>.mjs 를 낸다
 *   6 대조·발행  build.mjs  → 숫자·조문이 근거 JSON·엔진 값에 없으면 FAIL → FAIL 목록을 claude -p 에 넣어 고침 (rounds 회)
 */
import fs from 'node:fs';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

const ROOT = process.cwd();
const AT = path.join(ROOT, 'scripts/article-template');
const argv = process.argv.slice(2);
const arg = (k, d) => (argv.find((a) => a.startsWith(`--${k}=`)) ?? '').slice(k.length + 3) || d;
const target = argv.find((a) => !a.startsWith('--'));
if (!target) { console.error('usage: node scripts/article.mjs <spoke|slug> [--hub=] [--rounds=3] [--model=]'); process.exit(1); }
const ROUNDS = Number(arg('rounds', 3));
let MODEL = arg('model', '');   // 형식 위반 시 오푸스로 대체하려고 let
const t0 = Date.now();
const log = (m) => console.log(`[${((Date.now() - t0) / 1000).toFixed(0).padStart(4)}s] ${m}`);
const stripTags = (h) => h.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/g, ' ').replace(/\s+/g, ' ').trim();

// ── 1. 계획 ─────────────────────────────────────────────────────────────
const plans = fs.readdirSync(path.join(ROOT, 'scripts/title-system')).filter((f) => /^titles\..+-v2\.json$/.test(f)).map((f) => f.slice(7, -8));
const hub = arg('hub') || plans.find((h) => target.startsWith(`${h}-`)) || (plans.length === 1 ? plans[0] : null);
if (!hub) { console.error(`hub 를 정할 수 없다. --hub= 로 지정 (있는 것: ${plans.join(', ')})`); process.exit(1); }
const spoke = target.replace(new RegExp(`^${hub}-`), '').replace(/-guide$/, '');
const slug = `${hub}-${spoke}-guide`;
const plan = JSON.parse(fs.readFileSync(path.join(ROOT, `scripts/title-system/titles.${hub}-v2.json`), 'utf8'));
const spokes = plan.groups.flatMap((g) => g.spokes);
const sp = spokes.find((s) => s.slug === spoke);
if (!sp) { console.error(`계획서에 '${spoke}' 가 없다. 1단계(제목·소제목)는 사람이 titles.${hub}-v2.json 에 적는다.`); process.exit(1); }
const { ARTICLES } = await import(pathToFileURL(path.join(AT, 'articles/index.mjs')).href);
const spokeSlugs = new Set(spokes.map((s) => `${hub}-${s.slug}-guide`));
const hubEntry = ARTICLES.find((a) => a.slug.startsWith(`${hub}-`) && !spokeSlugs.has(a.slug)) ?? ARTICLES.find((a) => a.slug.startsWith(`${hub}-`));
const hubSlug = hubEntry?.slug ?? `${hub}-benefit-guide`;
log(`계획 ${slug} · 제목 "${sp.title}" · 소제목 ${sp.h2?.length ?? 0} · 허브 ${hubSlug}`);

// ── 2. brief ────────────────────────────────────────────────────────────
const briefPath = path.join(AT, 'brief', `${slug}.json`);
if (!fs.existsSync(briefPath)) {
  const hubBrief = JSON.parse(fs.readFileSync(path.join(AT, 'brief', `${hubSlug}.json`), 'utf8'));
  const brief = { slug, keyword: sp.title, calc: hubBrief.calc, reuseEvidence: hubSlug, mustInclude: sp.mustCover ?? [], queries: [], sources: [] };
  fs.writeFileSync(briefPath, JSON.stringify(brief, null, 2) + '\n', 'utf8');
  log(`brief 생성 (근거는 ${hubSlug} 것을 같이 씀)`);
}
const brief = JSON.parse(fs.readFileSync(briefPath, 'utf8'));
const evOwner = brief.reuseEvidence ?? slug;
const evDir = path.join(AT, 'evidence', evOwner);

// ── 3. 수집 ─────────────────────────────────────────────────────────────
const ownerBrief = brief.reuseEvidence ? JSON.parse(fs.readFileSync(path.join(AT, 'brief', `${evOwner}.json`), 'utf8')) : brief;
const evCount = () => (fs.existsSync(evDir) ? fs.readdirSync(evDir).filter((f) => f.endsWith('.json')).length : 0);
if (evCount() < ownerBrief.sources.length) {
  log(`근거 수집 evidence.mjs ${evOwner} (${evCount()}/${ownerBrief.sources.length})`);
  const r = spawnSync(process.execPath, [path.join(AT, 'evidence.mjs'), evOwner, '--skip-existing'], { stdio: 'inherit' });
  if (r.status !== 0) { console.error('근거 수집 실패'); process.exit(1); }
}
const evidence = fs.readdirSync(evDir).filter((f) => f.endsWith('.json')).sort((a, b) => parseInt(a) - parseInt(b))
  .map((f) => ({ ...JSON.parse(fs.readFileSync(path.join(evDir, f), 'utf8')), json: path.join(evDir, f), png: path.join(evDir, f.replace('.json', '.png')) }));
log(`근거 ${evidence.length}건 · ${evidence.reduce((a, e) => a + e.text.length, 0).toLocaleString()}자`);

// ── 4. 허브 파악 (Playwright, 라이브) ────────────────────────────────────
let hubText = '';
try {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ locale: 'ko-KR' });
  await page.goto(`https://moneydoc.kr/${hub}/`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(3000);
  // innerText 는 접힌 표·숨긴 열을 빼서 1/3 만 나왔다(8,447/26,241자). textContent 로 전부 읽는다
  hubText = (await page.evaluate(() => {
    for (const el of document.querySelectorAll('script,style,noscript,header,footer,nav')) el.remove();
    return document.body.textContent;
  })).replace(/[ \t]+/g, ' ').replace(/\s*\n\s*/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
  await browser.close();
  log(`허브 라이브 본문 ${hubText.length.toLocaleString()}자 (전체 텍스트)`);
} catch (e) {
  const local = path.join(ROOT, 'public/_preview', `article-v2-${hubSlug}.html`);
  hubText = fs.existsSync(local) ? stripTags(fs.readFileSync(local, 'utf8')) : '';
  log(`허브 라이브 실패(${e.message.split('\n')[0]}) → 로컬 미리보기 ${hubText.length}자`);
}
const neighbors = fs.readdirSync(path.join(ROOT, 'public/_preview')).filter((f) => f.startsWith(`landing-${hub}-`) && f.endsWith('.json'))
  .map((f) => { const j = JSON.parse(fs.readFileSync(path.join(ROOT, 'public/_preview', f), 'utf8')); return `${f.slice(8, -5)}: ${j.sections.map((s) => s.h2).join(' | ')}`; });

// ── 4b. 죽은 링크 걸러내기 ───────────────────────────────────────────────
// 계획서 links 는 "언젠가 쓸 글"까지 적혀 있다. 아직 없는 글로 링크하면 404 다.
// build.mjs 는 링크가 사는지 안 본다(그건 gate 가 하던 일). 그래서 쓰기 전에 여기서 뺀다.
const pageExists = (to) => fs.existsSync(path.join(ROOT, `app/${hubEntry?.cat ?? 'government'}/${hub}/${to}/page.tsx`))
  || fs.existsSync(path.join(ROOT, `app/${hub}/${to}/page.tsx`))
  || fs.existsSync(path.join(AT, 'articles', `${hub}-${to}-guide.mjs`));
const liveLinks = (sp.links ?? []).filter((l) => pageExists(l.to));
const deadLinks = (sp.links ?? []).filter((l) => !pageExists(l.to));
if (deadLinks.length) log(`죽은 링크 제외: ${deadLinks.map((l) => `/${hub}/${l.to}/`).join(' ')} (아직 글이 없음)`);
if (!liveLinks.length) log('경고: 살아 있는 내부 링크가 없다. related 로만 잇는다');

// ── 5. 작성 ─────────────────────────────────────────────────────────────
const specPath = path.join(AT, 'articles', `${slug}.mjs`);
const shape = sp.shape?.[0];
const hasShape = (s) => (spokes.find((x) => `${hub}-${x.slug}-guide` === s)?.shape?.includes(shape) ? 1 : 0);
const example = spokes.map((s) => `${hub}-${s.slug}-guide`).filter((s) => s !== slug && fs.existsSync(path.join(AT, 'articles', `${s}.mjs`)))
  .sort((a, b) => hasShape(b) - hasShape(a))[0];
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const INLINE_MAX = 20000;
// 법령 원문(9만~18만자)을 통째로 주면 작성기가 Grep·Read 로 조문을 찾느라 턴을 쓴다(실측 25~76턴, 글 한 편 15분).
// brief.sources[].must 에 필요한 조문 번호가 이미 적혀 있으니 여기서 미리 잘라 넣는다.
// law.go.kr 텍스트는 앞에 목차(제목만)·뒤에 본문이라, 같은 조 번호 중 다음 조까지 가장 긴 구간이 본문이다.
function sliceArticle(text, art) {
  const re = new RegExp(`(^|\\n)\\s*${art.replace(/[()]/g, '\\$&')}(의\\d+)?\\s*\\(`, 'g');
  let best = '', m;
  while ((m = re.exec(text))) {
    const start = m.index + m[1].length;
    const next = text.slice(start + 10).search(/\n\s*제\d+조(의\d+)?\s*\(/);
    const seg = next < 0 ? text.slice(start) : text.slice(start, start + 10 + next);
    if (seg.length > best.length) best = seg;
  }
  return best;
}
// 허브 근거를 통째로 빌려 쓰는 스포크(reuseEvidence)는 14건 중 이 글과 무관한 안내가 섞여 있다.
// 법령만 자르고 짧은 안내(≤2만자)는 다 넣었더니 pregnancy(전용 5건)는 55,000자인데 center(공용 14건)는
// 112,811자로 그대로였다(실측 2026-09-08). 무관한 짧은 안내도 이 글의 핵심어가 없으면 뺀다.
// 근거가 적을 때(전용 brief)는 안 뺀다 — 애초에 그 글을 위해 고른 근거라 다 관련 있다.
// h2 에서 낱말을 더 뽑으면 "받을"·"하면" 같은 흔한 동사 조각이 섞여 아무 근거나 다 걸린다(실측: interview 에서 무관한
// 안내까지 "받을" 하나로 살아남았다). mustCover 는 오늘 사람이 제목·소제목에 맞춰 고른 것이라 그것만 쓴다.
const keyTerms = sp.mustCover ?? [];
const trimIrrelevant = evidence.length >= 8 && keyTerms.length > 0;
const evBlock = evidence.map((e) => {
  const src = ownerBrief.sources[e.n - 1] ?? {};
  const isLaw = (e.kind ?? src.kind) === 'law';
  // 캡처: 정부 안내 페이지는 표·주석이 텍스트에 안 잡혀 열어야 한다. 법령 페이지 캡처는 텍스트와 같은 내용이라 선택이다.
  const png = isLaw ? `캡처(선택, 텍스트와 같음) ${e.png}` : `캡처(필수, 표·주석 확인) ${e.png}`;
  if (e.text.length <= INLINE_MAX) {
    if (trimIrrelevant && !keyTerms.some((t) => e.text.includes(t))) return `### 근거 ${e.n} · ${e.label} (이 글의 핵심어가 안 보여 생략. 정말 필요하면 Read ${e.json})\n`;
    return `### 근거 ${e.n} · ${e.label}\n출처 ${e.url ?? e.file}\n${png}\n\n${e.text}\n`;
  }
  const arts = (src.must ?? []).filter((x) => /^제\d+조/.test(x));
  const slices = arts.map((a) => { const s = sliceArticle(e.text, a); return s ? `[${a}]\n${s.trim()}` : ''; }).filter(Boolean);
  return `### 근거 ${e.n} · ${e.label} (전체 ${e.text.length.toLocaleString()}자 중 필요 조문만 발췌)\n출처 ${e.url}\n전문 ${e.json}  <- 발췌에 없는 조문이 꼭 필요할 때만 Grep 한다\n${png}\n\n${slices.join('\n\n') || '(brief 에 조문 번호가 없어 발췌 없음. 필요하면 Grep)'}\n`;
}).join('\n');

const HEAD = `너는 MoneyDoc 가이드 글 스펙(articles/<slug>.mjs)을 쓰는 작성기다. 대화하지 않는다. 출력은 아래 "출력 형식" 그대로만.

## 출력 형식 (이것 외에 아무것도 출력하지 않는다. 코드 펜스 금지)
첫 줄:  // index: {"crumb":"빵부스러기 라벨(예: 실업급여 합산기간)","blurb":"목록용 한 줄 요약. 가운뎃점으로 구분. 60자 이하"}
둘째 줄부터: 스펙 모듈 전체. export default function article({ calculators, loadSpec, VERIFIED, derive }) { ... return {...}; }

## 절대 규칙
- slug 는 '${slug}', title 은 계획서 그대로 '${sp.title}'. 소제목(h2)은 계획서 목록을 그 순서로 전부 쓰고 다른 h2 를 만들지 않는다.
- 숫자는 엔진 값(calculators·loadSpec·derive)이거나 아래 근거 텍스트에 글자 그대로 있는 값만. 근거에 없으면 그 숫자를 쓰지 않는다. 추정·기억 금지. 이 규칙은 build.mjs 가 기계로 대조하고 어기면 FAIL 이다.
- 조문(제N조)은 본문에 쓰지 않는다. 각주(fn)·출처(sources)에만.
- 해요체. 문장 100자 이하. 대시·파이프 금지. 반말 종결(~한다·~된다) 금지. 합니다체 금지.
- 시각 장치: 계획서 shape 는 반드시 넣는다. 그 위에 근거에 회차별·금액별·조건별 비교가 있으면 표(caption 필수)로 보여 준다. 허브 글이 표로 답한 수준을 스포크도 지킨다. 다만 내용 없는 억지 표는 만들지 않는다.
- 히어로 card.big 과 즉답 quick.big 은 근거에 있는 확정 숫자만. "사람마다 달라요" 같은 말과 같이 두지 않는다. 확정 숫자가 없으면 big 은 예/아니요 또는 명사 한 단어.
- 작업 순서: "캡처(필수)" 로 표시된 정부 안내 PNG 는 Read 로 연다(표·주석은 텍스트에 안 나온다). 법령은 필요한 조문을 아래에 이미 잘라 넣었다. 발췌에 없는 조문이 꼭 필요할 때만 전문을 Grep 한다. 그 다음에 쓴다. 아무것도 읽지 않고 쓰면 거부된다.
- 내부 링크는 아래 "쓸 수 있는 링크" 목록에 있는 것만 쓴다. 목록에 없는 /${hub}/... 주소는 아직 글이 없어 404 다. 절대 만들지 않는다. related 도 이 목록과 '/${hub}/' 안에서만 고른다.
- 계산기는 calc.on 이 true 일 때만.
- 근거에 답이 있는 질문에 "사람마다 달라요"·"안내받아요" 같은 회피 답을 쓰지 않는다. 근거의 답을 쓴다.
- 이웃 글이 이미 답한 소제목·문장을 되풀이하지 않는다.
- 예시 스펙의 구조·헬퍼 사용법(won, man, docs, derive 등)을 그대로 따른다. 예시의 내용은 베끼지 않는다.
`;

// 프롬프트 순서가 비용·속도를 정한다. 같은 허브의 글은 규칙·형식·허브 본문·근거(7만자)가 전부 같다.
// 이 공통 부분(SHARED)을 맨 앞에 두면 글이 달라져도 캐시가 그대로 맞는다. 글마다 다른 부분(PER·HEAD)은 뒤에 둔다.
// 전에는 HEAD(글별) 가 앞이라 글마다 7만자를 새로 냈다.
const SHARED = `## 쓰기 규칙 (WRITING.md)
${read('scripts/article-template/WRITING.md')}

## 스펙 형식 (README)
${read('scripts/article-template/README.md')}

## 허브 글 본문 (moneydoc.kr/${hub}/ 라이브). 허브가 이미 답한 것은 짧게 링크로 넘긴다
${hubText.slice(0, 30000)}

## 이웃 글 소제목 (여기 있는 질문은 다시 쓰지 않는다)
${neighbors.join('\n')}

## 근거 (정부·법령 페이지 원문. "캡처(필수)" 는 Read 로 열어 표·주석을 본다)
${evBlock}
`;

const PER = `
## 계획서 (이 글)
${JSON.stringify({ slug: sp.slug, title: sp.title, h2: sp.h2, mustCover: sp.mustCover, calc: sp.calc, shape: sp.shape, evidence: sp.evidence }, null, 1)}

## 쓸 수 있는 링크 (여기 없는 /${hub}/ 주소는 404 다)
${liveLinks.map((l) => `- /${hub}/${l.to}/  ${l.why}`).join('\n') || '- (없음)'}
- /${hub}/  주제 홈${sp.calc?.on ? `\n- ${plan.calculator?.route ?? `/${hub}/calculator/`}  계산기` : ''}
${neighbors.map((n) => `- /${hub}/${n.split(':')[0].replace(new RegExp(`^${hub}-`), '').replace(/-guide$/, '')}/`).join('\n')}

## 예시 스펙 (형식 참고: scripts/article-template/articles/${example}.mjs)
${read(`scripts/article-template/articles/${example}.mjs`)}
`;

function claudeBin() {
  for (const c of ['claude', 'claude.cmd', 'claude.exe']) {
    const r = spawnSync(c, ['--version'], { encoding: 'utf8', shell: false });
    if (r.status === 0) return { bin: c, shell: false };
  }
  const r = spawnSync('claude', ['--version'], { encoding: 'utf8', shell: true });
  if (r.status === 0) return { bin: 'claude', shell: true };
  throw new Error('claude CLI 를 찾을 수 없다');
}
const CLI = claudeBin();
let cost = 0;
/**
 * 작성기 호출. stream-json 으로 받아 턴마다 무엇을 열었는지 시간과 함께 로그에 남긴다.
 *   전에는 15분 동안 아무것도 안 보였다("뭘 하는지 알 수 없다"). 이제 tail -f 로 지켜볼 수 있고,
 *   어느 턴이 오래 걸리는지 실측할 수 있다.
 * --disallowedTools: allowedTools 만으로는 Write 가 막히지 않았다(소넷이 파일을 직접 쓴 실측 2026-09-08).
 *   파일을 만드는 건 이 스크립트만 한다. 작성기는 읽고 답만 낸다.
 */
function claude(prompt, label, retry = false) {
  return new Promise((resolve, reject) => {
    const t1 = Date.now();
    log(`claude -p ${label} (입력 ${prompt.length.toLocaleString()}자)`);
    const args = ['-p', '--output-format', 'stream-json', '--verbose',
      '--allowedTools', 'Read,Grep,Glob',
      '--disallowedTools', 'Write,Edit,MultiEdit,NotebookEdit,Bash,PowerShell,WebFetch,WebSearch,Agent,Task',
      '--max-turns', '80', ...(MODEL ? ['--model', MODEL] : [])];
    const child = spawn(CLI.bin, args, { shell: CLI.shell, stdio: ['pipe', 'pipe', 'pipe'] });
    const timer = setTimeout(() => { child.kill(); reject(new Error('claude -p 30분 초과')); }, 30 * 60 * 1000);
    let buf = '', errBuf = '', result = null, tools = 0;
    const el = () => `${((Date.now() - t1) / 1000).toFixed(0).padStart(4)}s`;
    const onLine = (line) => {
      if (!line.trim()) return;
      let ev; try { ev = JSON.parse(line); } catch { return; }
      if (ev.type === 'assistant') {
        for (const c of ev.message?.content ?? []) {
          if (c.type !== 'tool_use') continue;
          tools++;
          const a = c.input ?? {};
          const what = a.file_path ? path.basename(String(a.file_path)) : a.pattern ? `"${String(a.pattern).slice(0, 30)}"` : '';
          console.log(`      ${el()}  ${String(c.name).padEnd(5)} ${what}`);
        }
      } else if (ev.type === 'result') result = ev;
    };
    child.stdout.setEncoding('utf8');
    child.stdout.on('data', (d) => { buf += d; let i; while ((i = buf.indexOf('\n')) >= 0) { onLine(buf.slice(0, i)); buf = buf.slice(i + 1); } });
    child.stderr.setEncoding('utf8');
    child.stderr.on('data', (d) => { errBuf += d; });
    child.on('error', (e) => { clearTimeout(timer); reject(e); });
    child.on('close', () => {
      clearTimeout(timer);
      if (buf.trim()) onLine(buf);
      const j = result;
      if (!j) return reject(new Error(`claude 출력에 result 가 없다: ${(errBuf || buf).slice(0, 500)}`));
      cost += j.total_cost_usd ?? 0;
      if (j.is_error) return reject(new Error(`claude 오류: ${String(j.result).slice(0, 500)}`));
      log(`  ${j.num_turns}턴 · 도구 ${tools}회 · ${((Date.now() - t1) / 1000).toFixed(0)}s · $${(j.total_cost_usd ?? 0).toFixed(2)}`);
      // 도구 0회 = 캡처를 하나도 안 열고 쓴 것. 첫 작성은 반드시 읽고 써야 한다. 한 번은 다시 시킨다
      if (label === '작성' && tools === 0) {
        if (retry) return reject(new Error('작성기가 두 번 다 근거를 읽지 않고 썼다 (도구 0회)'));
        log('  근거를 읽지 않고 씀(도구 0회) → 거부, 다시');
        return resolve(claude(`${prompt}\n\n(이전 시도는 캡처를 열지 않아 거부됐다. "캡처(필수)" PNG 를 Read 한 뒤에 쓴다.)`, label, true));
      }
      resolve(String(j.result ?? ''));
    });
    child.stdin.end(prompt);
  });
}
function saveSpec(out) {
  let s = out.replace(/\r/g, '').trim();
  s = s.replace(/^```[a-z]*\n/, '').replace(/\n```\s*$/, '');
  // 작성기가 앞에 설명 한 줄을 붙이는 경우가 있다. 첫 줄만 보지 말고 어디 있든 찾아 그 앞을 버린다
  const m = s.match(/^[ \t]*\/\/ index:[ \t]*(\{.*\})[ \t]*$/m);
  if (!m) throw new Error(`'// index: {...}' 줄이 없다:\n${s.slice(0, 300)}`);
  const idx = JSON.parse(m[1]);
  s = s.slice(s.indexOf(m[0]) + m[0].length).trim() + '\n';
  if (!/export default function article/.test(s)) throw new Error('스펙에 export default function article 이 없다');
  fs.writeFileSync(specPath, s, 'utf8');
  // index.mjs 한 줄
  const ip = path.join(AT, 'articles/index.mjs');
  let idxSrc = fs.readFileSync(ip, 'utf8');
  const q = (v) => String(v ?? '').replace(/'/g, '');
  const line = `  { slug: '${slug}', cat: '${hubEntry?.cat ?? 'government'}', catLabel: '${hubEntry?.catLabel ?? ''}', crumb: '${q(idx.crumb)}', blurb: '${q(idx.blurb)}' },`;
  if (idxSrc.includes(`slug: '${slug}'`)) idxSrc = idxSrc.replace(new RegExp(`^.*slug: '${slug}'.*$`, 'm'), line);
  else idxSrc = idxSrc.replace(/\n\];/, `\n${line}\n];`);
  fs.writeFileSync(ip, idxSrc, 'utf8');
}
async function syntaxCheck() {
  try { await import(`${pathToFileURL(specPath).href}?t=${Date.now()}`); return null; }
  catch (e) { return `스펙 문법 오류: ${e.message}`; }
}
function build() {
  const r = spawnSync(process.execPath, [path.join(AT, 'build.mjs'), slug], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  const out = (r.stdout ?? '') + (r.stderr ?? '');
  const fails = out.split('\n').filter((l) => /^\s+- |✗/.test(l)).map((l) => l.trim());
  return { ok: r.status === 0, fails: fails.length ? fails : (r.status === 0 ? [] : [out.slice(-2000)]), out };
}
/** 죽은 내부 링크는 build 가 안 본다. 여기서 잡아 FAIL 로 되돌린다 */
function deadLinkCheck() {
  const html = fs.readFileSync(path.join(ROOT, 'public/_preview', `article-v2-${slug}.html`), 'utf8');
  const hrefs = [...new Set([...html.matchAll(/href="(\/[a-z0-9\-/]*\/)"/g)].map((m) => m[1]))];
  return hrefs.filter((h) => {
    if (h === '/' || h === `/${hub}/` || h === `/${hubEntry?.cat ?? 'government'}/`) return false;
    if (h === (plan.calculator?.route ?? '')) return false;
    return !fs.existsSync(path.join(ROOT, 'app', h.replace(/^\/|\/$/g, ''), 'page.tsx'));
  }).map((h) => `죽은 링크 ${h} — 그 글이 아직 없다. 링크를 빼거나 '쓸 수 있는 링크' 목록의 주소로 바꾼다`);
}
/**
 * 미리보기까지가 아니라 실제 Next 페이지까지 낸다. build.mjs 는 --all 일 때만 convert 를 부른다.
 * 주소는 url-map.json 이 정한다. 등록이 없으면 /government/unemployment-last-round-guide/ 같은
 * 엉뚱한 주소로 나가고 빵부스러기도 카테고리 밑으로 붙는다. 그래서 convert 전에 넣는다.
 */
const CAT = hubEntry?.cat ?? 'government';
const route = `${hub}/${spoke}`;
function publish() {
  const mapPath = path.join(ROOT, 'scripts/url-map.json');
  const map = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
  const key = `${CAT}/${slug}`;
  const nocalc = map['_계산기없는허브'] ?? (map['_계산기없는허브'] = {});
  if (nocalc[key] !== route) { nocalc[key] = route; fs.writeFileSync(mapPath, `${JSON.stringify(map, null, 2)}\n`, 'utf8'); log(`url-map 등록 ${key} -> /${route}/`); }
  const r = spawnSync(process.execPath, [path.join(AT, 'convert-v2.mjs')], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  // 잘못된 주소로 먼저 나간 페이지가 있으면 치운다
  const strayDir = path.join(ROOT, 'app', CAT, slug);
  if (fs.existsSync(strayDir)) { fs.rmSync(strayDir, { recursive: true, force: true }); log(`엉뚱한 주소 페이지 삭제 app/${CAT}/${slug}/`); }
  // 옛 주소 301 넘김. 안 걸면 색인된 /government/... 이 죽는다 (실측: 48개 중 43개가 빠져 있었다)
  spawnSync(process.execPath, [path.join(ROOT, 'scripts/gen-redirects.mjs')], { encoding: 'utf8' });
  const page = path.join(ROOT, 'app', route, 'page.tsx');
  return { ok: r.status === 0 && fs.existsSync(page), made: [page], out: (r.stdout ?? '') + (r.stderr ?? '') };
}

// --dry: 프롬프트 크기만 재고 끝낸다 (LLM 호출 없음). 근거 발췌·순서 바꾼 효과를 돈 안 쓰고 확인한다
if (argv.includes('--dry')) {
  const sizes = { 공통SHARED: SHARED.length, 글별PER: PER.length, 지시HEAD: HEAD.length };
  const total = Object.values(sizes).reduce((a, b) => a + b, 0);
  console.log(`\n[dry] 프롬프트 ${total.toLocaleString()}자  ${Object.entries(sizes).map(([k, v]) => `${k} ${v.toLocaleString()}`).join(' · ')}`);
  console.log(`[dry] 근거 블록 ${evBlock.length.toLocaleString()}자 (전문 ${evidence.reduce((a, e) => a + e.text.length, 0).toLocaleString()}자)`);
  process.exit(0);
}

// ── 6. 작성 → 대조 → 고침 ─────────────────────────────────────────────
const tWrite = Date.now();
let fails = [];
let fellBack = false;
for (let round = 1; round <= ROUNDS; round++) {
  // 공통(SHARED) → 글별(PER) → 지시(HEAD) 순. 공통이 앞이라 같은 허브의 다음 글에서 캐시가 맞는다.
  const prompt = round === 1
    ? `${SHARED}${PER}\n${HEAD}\n이제 '${slug}' 스펙을 출력 형식대로 낸다.`
    : `${SHARED}${PER}\n${HEAD}\n## 지금 스펙 (scripts/article-template/articles/${slug}.mjs)\n${fs.readFileSync(specPath, 'utf8')}\n\n## build.mjs 가 막은 것 (${fails.length}건, 전부 고친다. 근거에 없는 숫자는 지운다)\n${fails.map((f) => `- ${f}`).join('\n')}\n\n고친 스펙 전체를 출력 형식대로 낸다. 막힌 것 외에는 바꾸지 않는다.`;
  // 소넷은 5회 중 2회 형식을 어겼다(코드 대신 설명문). 그 회차만 오푸스로 다시 하면 사람이 안 봐도 된다.
  // 사실 대조는 모델과 무관하게 build.mjs 가 하므로, 여기서 바꾸는 건 "누가 쓰나" 뿐이다.
  try {
    saveSpec(await claude(prompt, round === 1 ? '작성' : `수정 ${round - 1}`));
  } catch (e) {
    const formatErr = /index: \{|export default function article|result 가 없다/.test(e.message);
    if (formatErr && MODEL && !fellBack) {
      fellBack = true;
      log(`형식 위반(${e.message.split('\n')[0].slice(0, 50)}) → 이 회차만 기본 모델(오푸스)로 다시`);
      MODEL = '';
      round--;
      continue;
    }
    throw e;
  }
  const syn = await syntaxCheck();
  const b = syn ? { ok: false, fails: [syn] } : build();
  fails = b.fails;
  if (b.ok) fails = deadLinkCheck();          // 대조는 통과했어도 404 링크가 있으면 다시
  if (b.ok && !fails.length) {
    const p = publish();
    if (!p.ok) { console.error(`발행(convert-v2) 실패:\n${p.out.slice(-2000)}`); process.exit(1); }
    log(`OK 대조 통과 · 죽은 링크 0 · 발행 완료 (${round}회) · 작성~발행 ${((Date.now() - tWrite) / 1000).toFixed(0)}s · 총 $${cost.toFixed(2)}`);
    console.log(`\n미리보기  public/_preview/article-v2-${slug}.html\n페이지    ${p.made.map((x) => path.relative(ROOT, x)).join(' ')}\n썸네일    public/og/${slug}.png\n스펙      scripts/article-template/articles/${slug}.mjs`);
    process.exit(0);
  }
  log(`FAIL ${fails.length}건`);
  fails.slice(0, 40).forEach((f) => console.log(`   ${f}`));
}
// saveSpec 이 매 회차 index.mjs 에 이 slug 줄을 넣어 둔다. 끝내 통과 못 하면 그 줄만 지운다.
// 안 지우면 convert-v2 가 이 slug 의 (없는) 미리보기 HTML 을 열려다 죽고, 그 뒤 배치의 모든 글이
// 내용은 맞는데 발행 단계에서 매번 이 글 때문에 크래시해 회차만 날린다 (실측 2026-09-08, 4편 연쇄 피해).
const ip = path.join(AT, 'articles/index.mjs');
const idxSrc = fs.readFileSync(ip, 'utf8');
const line = idxSrc.split('\n').find((l) => l.includes(`slug: '${slug}'`));
if (line) { fs.writeFileSync(ip, idxSrc.replace(`${line}\n`, ''), 'utf8'); log(`index.mjs 등록 되돌림 (${slug} — 뒤 글들의 발행이 이것 때문에 막히지 않게)`); }
console.error(`\n${ROUNDS}회 안에 통과 못 함. 마지막 FAIL 목록 위에 있음. 스펙은 남겨 둠: ${specPath}`);
process.exit(1);
