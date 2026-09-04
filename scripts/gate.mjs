#!/usr/bin/env node
/**
 * 글 하나가 통과해야 할 조건을 여기 한 곳에 모아 둔다.
 *
 * 왜 만들었나. 검사가 lint / factcheck / check-outline / check-spoke-links 로 흩어져 있어
 * 매번 기억나는 것만 돌렸고, 그래서 "검사가 아예 없던" 구멍으로 사고가 반복됐다.
 *   - 계산기 버튼이 모든 글에 강제로 붙음 (lint 가 calc 를 필수로 요구)
 *   - 2022년 정부 브리핑을 현행처럼 씀 (인용이 있는지만 보고 언제 것인지는 안 봄)
 *   - 아무도 검색하지 않는 말을 제목에 박음 (제목을 실측 데이터와 대조하지 않음)
 *   - 본문 내부링크가 두 개뿐 (죽은 링크만 보고 최소 개수는 안 봄)
 *   - 스포크 28편 전부가 허브보다 얇음 (허브와 비교하지 않음)
 *
 * 새 검사는 반드시 이 파일에 추가한다. 개별 스크립트를 또 만들지 않는다.
 *
 * 실행: node scripts/gate.mjs <허브>           예: node scripts/gate.mjs unemployment
 *       node scripts/gate.mjs <허브> --quick   느린 검사(계산기 전수) 건너뜀
 */
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = process.cwd();
const hub = process.argv[2];
const quick = process.argv.includes('--quick');
if (!hub) { console.error('usage: node scripts/gate.mjs <허브> [--quick]'); process.exit(1); }

const PLAN = `scripts/title-system/titles.${hub}-v2.json`;
const PREVIEW = 'public/_preview';
const fails = [];
const warns = [];
const fail = (t, m) => fails.push(`${t} · ${m}`);
const warn = (t, m) => warns.push(`${t} · ${m}`);

// ── 재료 ─────────────────────────────────────────────────────────────────
const plan = JSON.parse(fs.readFileSync(PLAN, 'utf8'));
const spokes = plan.groups.flatMap((g) => g.spokes);
const bySlug = new Map(spokes.map((s) => [s.slug, s]));
const { keywords, questions } = JSON.parse(fs.readFileSync('scripts/keyword-data/merged.json', 'utf8'));
const CORPUS = (keywords.map((k) => k.word).join(' ') + ' ' +
  questions.map((q) => `${q.title} ${q.tags.join(' ')}`).join(' ')).replace(/\s+/g, '');

const files = fs.readdirSync(PREVIEW).filter((f) => new RegExp(`^article-v2-${hub}-.*-guide\\.html$`).test(f));
const read = (f) => fs.readFileSync(path.join(PREVIEW, f), 'utf8');
const slugOf = (f) => f.replace(`article-v2-${hub}-`, '').replace('-guide.html', '');
const cnt = (h, re) => (h.match(re) ?? []).length;
const textLen = (h) => h.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').length;

const hubFile = files.find((f) => !bySlug.has(slugOf(f)));   // 허브 글은 계획서의 스포크 목록에 없다
const HUB = hubFile ? read(hubFile) : null;
const tableRows = (x) => [...x.matchAll(/<table[\s\S]*?<\/table>/g)].map((t) => (t[0].match(/<tr/g) ?? []).length);
const BAR = HUB ? {
  len: textLen(HUB), tbl: cnt(HUB, /<table/g), fn: cnt(HUB, /class="fn"/g),
  deepest: Math.max(0, ...tableRows(HUB)),
} : null;

// ── 1. 제목 핵심어가 실측 검색어인지 ─────────────────────────────────────
const STOP = new Set(['정리','총정리','방법','기준','조건','계산','신청','얼마','언제','어디','무엇',
  '되나요','받나요','있나요','인가요','하나요','까지','부터','받기','하는','그리고','또는', plan.keyword]);
const strip = (w) => w.replace(/(은|는|이|가|을|를|의|에|도|만|과|와|로|랑)$/, '');
for (const s of spokes) {
  const head = s.title.split(',')[0];
  const miss = head.replace(/[^가-힣0-9a-zA-Z% ]/g, ' ').split(/\s+/).map(strip)
    .filter((w) => w.length >= 2 && !STOP.has(w))
    .filter((w) => !CORPUS.includes(w.replace(/\s+/g, '')));
  if (miss.length) (s.tier === 'A' ? fail : warn)(`[${s.slug}]`, `제목 앞부분에 실측 검색어가 아닌 말: ${miss.join(' · ')} — "${s.title}"`);
}

// ── 2. 근거가 현행인지 ───────────────────────────────────────────────────
const evDir = `scripts/article-template/evidence/${hub}-benefit-guide`;
if (fs.existsSync(evDir)) {
  const OLD_YEARS = 3;
  const now = new Date();
  for (const f of fs.readdirSync(evDir).filter((x) => x.endsWith('.json'))) {
    const j = JSON.parse(fs.readFileSync(path.join(evDir, f), 'utf8'));
    const t = j.text ?? '';
    // 정부 보도·브리핑류는 작성 연도가 본문에 박혀 있다. 오래되면 현행으로 쓰면 안 된다
    const dates = [...t.matchAll(/(20\d\d)[.\-년]\s?\d{1,2}[.\-월]/g)].map((m) => Number(m[1]));
    const newest = dates.length ? Math.max(...dates) : null;
    const isBriefing = /정책브리핑|보도자료|카드뉴스|달라지나/.test(j.label + t.slice(0, 400));
    if (j.kind === 'gov' && isBriefing && newest && now.getFullYear() - newest >= OLD_YEARS) {
      warn(`[근거 ${j.n}]`, `${j.label} — 본문의 최신 연도가 ${newest}년이다. 현행 기준으로 인용하지 말 것`);
    }
  }
}

// ── 3~7. 페이지별 검사 ───────────────────────────────────────────────────
const pages = new Set();
const walk = (d) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) {
  const p = path.join(d, e.name);
  if (e.isDirectory()) walk(p);
  else if (e.name === 'page.tsx') { const r = path.relative('app', d).split(path.sep).join('/'); pages.add(r ? `/${r}/` : '/'); }
} };
walk('app');

for (const f of files) {
  const slug = slugOf(f);
  const h = read(f);
  const s = bySlug.get(slug);
  const tag = `[${slug}]`;

  // 3. 계산기 버튼은 계획과 일치해야 한다 (답이 숫자인 글에만)
  if (s) {
    const hasCta = cnt(h, new RegExp(`href="/${hub}/calculator/"`, 'g')) > 0;
    if (hasCta !== !!s.calc?.on) fail(tag, `계산기 버튼 계획=${s.calc?.on ? '있음' : '없음'} 실제=${hasCta ? '있음' : '없음'}`);
  }

  // 4. 내부링크: 죽은 링크 0, 본문 안 링크 2개 이상, 전체 링크가 허브 이상
  // 빵부스러기는 convert-v2 가 페이지 단에서 다시 만든다. 미리보기의 것은 검사 대상이 아니다
  const body = h.replace(/<div class="crumb">[\s\S]*?<\/div>/, '');
  const hrefs = [...body.matchAll(/href="(\/[a-z0-9/-]*\/)"/g)].map((m) => m[1]);
  const dead = [...new Set(hrefs.filter((x) => !pages.has(x)))];
  if (dead.length) fail(tag, `죽은 내부링크: ${dead.join(' ')}`);
  const bodyEnd = body.indexOf('<div class="rel">');
  const bodyLinks = [...new Set((bodyEnd > 0 ? body.slice(0, bodyEnd) : body)
    .match(new RegExp(`href="/${hub}/[a-z0-9-]+/"`, 'g')) ?? [])].length;
  // 내부링크는 개수를 채우는 게 아니다. 계획서(links)에 "왜 그 링크인지" 를 적어 두었으니
  // 그것과 대조한다. 계획에 없는 형제 글로 링크하면 난발이고, 계획에 있는데 없으면 빠뜨린 것이다.
  if (s) {
    const placed = new Set([...(bodyEnd > 0 ? body.slice(0, bodyEnd) : body)
      .matchAll(new RegExp(`href="/${hub}/([a-z0-9-]+)/"`, 'g'))].map((m) => m[1]));
    placed.delete('calculator');
    const planned = new Set((s.links ?? []).map((l) => l.to));
    const extra = [...placed].filter((x) => !planned.has(x));
    const missing = [...planned].filter((x) => !placed.has(x) && pages.has(`/${hub}/${x}/`));
    if (extra.length) fail(tag, `계획에 없는 내부링크(난발): ${extra.join(' ')}`);
    if (missing.length) warn(tag, `계획한 링크가 본문에 없다: ${missing.join(' ')}`);
  }

  // 5. 계획한 시각 장치가 실제로 들어갔는지만 본다.
  //    글자수·표 개수·각주 개수는 세지 않는다. 답의 길이는 키워드마다 다르다.
  //    "신청 방법" 은 접속하고 로그인하면 끝나는 질문이고, 그걸 억지로 늘리면 글이 나빠진다.
  //    좋은 글인지는 사람이 읽고 판단한다. 기계는 제목-소제목 일치와 사실만 본다.
  const DEVICE = { tree: /class="tree"|id="[a-zA-Z]*Tree"/, timeline: /class="tl"/, steps: /class="steps"/,
                   flow: /class="flow"/, table: /<table/, tips: /class="tips"/ };
  if (s) {
    for (const want of s.shape ?? []) {
      const re = DEVICE[want];
      if (re && !re.test(h)) fail(tag, `계획한 시각 장치 "${want}" 가 글에 없다`);
    }
  }

  // 6. 렌더 사고
  if (/>\s*undefined\s*</.test(h) || h.includes('[object Object]') || /\bNaN\b/.test(h))
    fail(tag, '렌더 결과에 undefined / NaN / [object Object] 가 있다');
  // 단위가 겹쳐 붙는 사고. man() 은 이미 "200만" 을 돌려주는데 스펙이 "만원" 을 또 붙여
  // "월 200만만원" 이 4편 64곳에 라이브로 나가 있었다(2026-09-04 발견). 눈으로는 안 걸린다.
  for (const [re_, what] of [[/만만원|만만\b/, '만만원'], [/억억/, '억억'], [/원원(?![가-힣])/, '원원'], [/퍼센트퍼센트|%%/, '퍼센트 중복']]) {
    const m = body.replace(/<[^>]+>/g, ' ').match(re_);
    if (m) fail(tag, `단위가 겹쳐 붙었다 ("${what}"). 헬퍼가 붙이는 단위를 스펙에서 또 붙였는지 본다`);
  }

  // 7. 독자 검토 (건너뛸 수 없다)
  //    "글을 읽고 판단한다" 는 지침으로 두면 건너뛴다. 그래서 검토 결과를 계획서에 적게 하고,
  //    적힌 문장이 빌드된 페이지에 그대로 있는지 대조한다. 페이지를 읽지 않고는 쓸 수 없다.
  //      review.query             독자가 들고 온 검색어
  //      review.firstScreenAnswer 첫 H2 앞에서 독자가 보는 답 (페이지 원문 그대로)
  //      review.h2Answers[]       소제목마다 { h2, ans } (ans 는 페이지 원문 그대로)
  //      review.hardWords[]       풀어 쓴 어려운 말
  //      review.removed[]         지운 군더더기
  //      review.deeperThanHub     허브의 같은 주제보다 무엇이 더 깊은지
  //      review.date              검토일. 스펙 파일이 그 뒤에 바뀌었으면 다시 검토
  if (s) {
    const r = s.review;
    const specPath = `scripts/article-template/articles/${hub}-${slug}-guide.mjs`;
    if (!r) fail(tag, '독자 검토 없음 (계획서 review 를 채워야 한다)');
    else {
      const plain = body.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
      const has = (x) => plain.includes(String(x ?? '').replace(/\s+/g, ' ').trim());
      // 날짜로는 "검토 뒤에 글이 바뀌었나" 를 못 잡는다 (같은 날 고치고 읽는 게 정상 흐름이라).
      // 검토 때 읽은 스펙의 해시를 적게 하고, 지금 스펙과 다르면 다시 읽게 한다.
      if (fs.existsSync(specPath)) {
        const cur = createHash('sha256').update(fs.readFileSync(specPath)).digest('hex').slice(0, 12);
        if (!r.specHash) fail(tag, `검토 기록에 specHash 가 없다. 글을 읽은 뒤 지금 스펙 해시 ${cur} 를 적어라`);
        else if (r.specHash !== cur) fail(tag, `검토(${r.specHash}) 뒤에 글이 바뀌었다(${cur}). 다시 읽고 specHash 를 갱신해라`);
      }
      if (!r.query) fail(tag, '검토에 검색어(query)가 없다');
      const firstH2 = body.indexOf('<h2 id=');
      const top = (firstH2 > 0 ? body.slice(0, firstH2) : body).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
      if (!r.firstScreenAnswer || !top.includes(r.firstScreenAnswer.replace(/\s+/g, ' ').trim()))
        fail(tag, '첫 화면 답(firstScreenAnswer)이 첫 소제목 앞에 그대로 없다');
      const h2s = [...body.matchAll(/<h2 id="s\d+">([^<]+)/g)].map((m) => m[1].trim());
      const ans = r.h2Answers ?? [];
      if (ans.length !== h2s.length) fail(tag, `소제목 ${h2s.length}개인데 검토한 답은 ${ans.length}개`);
      for (const a of ans) {
        if (!h2s.includes(a.h2)) fail(tag, `검토의 소제목이 페이지에 없다: "${a.h2}"`);
        if (!a.ans || a.ans.length < 15) fail(tag, `"${a.h2}" 의 답이 비었거나 너무 짧다`);
        else if (!has(a.ans)) fail(tag, `"${a.h2}" 의 답이 페이지 원문에 그대로 없다: "${a.ans.slice(0, 30)}…"`);
        if (/(사람마다 달라|확인해 보세요|물어보세요)/.test(a.ans)) fail(tag, `"${a.h2}" 의 답이 회피다: "${a.ans.slice(0, 30)}…"`);
      }
      if (!Array.isArray(r.hardWords)) fail(tag, '어려운 말 목록(hardWords)이 없다. 없으면 빈 배열');
      if (!Array.isArray(r.removed)) fail(tag, '지운 군더더기 목록(removed)이 없다. 없으면 빈 배열');
      if (!r.deeperThanHub || r.deeperThanHub.length < 20) fail(tag, '허브보다 무엇이 깊은지(deeperThanHub) 적지 않았다');
    }
  }
}

// 7. 빵부스러기가 주제 구조인지 (홈 › 실업급여 › 수급자격)
for (const dir of fs.existsSync(path.join('app', hub)) ? fs.readdirSync(path.join('app', hub)) : []) {
  const pg = path.join('app', hub, dir, 'page.tsx');
  if (!fs.existsSync(pg)) continue;
  const t = fs.readFileSync(pg, 'utf8');
  const m = t.match(/catHref="([^"]*)"[\s\S]*?catLabel="([^"]*)"/);
  if (!m) continue;
  if (m[1] !== `/${hub}/`) fail(`[${hub}/${dir}]`, `빵부스러기가 주제 구조가 아니다: catHref="${m[1]}" (기대 "/${hub}/")`);
}

// ── 8. 느린 검사 ─────────────────────────────────────────────────────────
if (!quick) {
  const run = (label, args) => {
    try { execFileSync('node', args, { stdio: 'pipe' }); return true; }
    catch (e) { fail(`[${label}]`, (e.stdout?.toString() ?? '').trim().split('\n').slice(-3).join(' | ')); return false; }
  };
  run('계산기 정확도', ['scripts/verify-system/verify-3way.mjs', '--all', '--no-gov']);
  run('상수 출처', ['scripts/verify-system/check-constants.mjs']);
  run('제목-소제목', ['scripts/title-system/check-outline.mjs', PLAN]);
}

// ── 결과 ─────────────────────────────────────────────────────────────────
console.log(`게이트: ${hub} · 페이지 ${files.length}개 · 계획 ${spokes.length}편`);
console.log('기계가 보는 것: 사실(숫자·인용) · 제목-소제목 일치 · 계획(계산기·링크·시각화) 대조 · 죽은 링크 · 빵부스러기');
console.log('사람이 볼 것: 소제목 질문에 군더더기 없이 답했는지, 20대도 80대도 알아듣는지');
if (warns.length) { console.log(`\n경고 ${warns.length}건`); warns.forEach((w) => console.log('  ' + w)); }
if (fails.length) { console.log(`\nFAIL ${fails.length}건`); fails.forEach((x) => console.log('  ' + x)); process.exit(1); }
console.log('\nPASS');
