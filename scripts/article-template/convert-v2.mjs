#!/usr/bin/env node
/**
 * v2 가이드 글(public/_preview/article-v2-*.html) → Next.js 페이지로 변환.
 *
 *   moneydoc-data/articles/{cat}/{slug}.ts      meta / html / faqLd / hero
 *   components/article-v2.css                   v2 스타일 전부를 .md-v2 안으로 한정 + 클래스 접두사 v2-
 *   components/article-v2-scripts.js            글별 인라인 스크립트 레지스트리 (ArticleV2Runtime 이 실행)
 *   public/og/{slug}.png                        디스커버·SNS 대표 이미지 (1200×630)
 *   app/{cat}/{slug}/page.tsx                   메타 + JSON-LD + 본문
 *
 * 실행: node scripts/article-template/convert-v2.mjs
 * 미리보기 HTML 은 build.mjs(render.mjs) 가 만들고, 이 스크립트는 보통 build.mjs 가 마지막에 부른다.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const SRC = path.join(ROOT, 'public/_preview');
const PREFIX = 'v2-';
const SCOPE = '.md-v2';

import { ARTICLES as LIST } from './articles/index.mjs';
const ARTICLES = LIST.map((a) => ({ ...a, file: `article-v2-${a.slug}.html`, og: `og-${a.slug}.png` }));

const esc = (s) => s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');

// ── 클래스 접두사 ─────────────────────────────────────────────────────────
function collectClasses(html) {
  const set = new Set();
  html.replace(/class="([^"]*)"/g, (m, l) => { l.split(/\s+/).filter(Boolean).forEach((c) => set.add(c)); return m; });
  return set;
}
const prefixHtml = (html) =>
  html.replace(/class="([^"]*)"/g, (_m, l) => `class="${l.split(/\s+/).filter(Boolean).map((c) => PREFIX + c).join(' ')}"`);
const prefixSelector = (sel) => sel.replace(/\.(-?[A-Za-z_][\w-]*)/g, (_m, n) => '.' + PREFIX + n);

/** 스크립트 안의 셀렉터/클래스 문자열도 같은 접두사로 맞춘다 */
function prefixScript(js, classes) {
  // 문자열 리터럴 안에서만 바꾼다 (q.t 같은 속성 접근을 건드리면 안 된다)
  const inString = (s) => {
    for (const c of classes) s = s.replace(new RegExp(`\\.${c}(?=[\\s\\[\\.,:\\)]|$)`, 'g'), '.' + PREFIX + c); // '.sw button', 'a.go,a.doc'
    return s;
  };
  let out = js.replace(/'((?:[^'\\]|\\.)*)'/g, (_m, s) => `'${inString(s)}'`);
  for (const c of classes)
    out = out.replace(new RegExp(`(classList\\.(?:add|remove|toggle|contains)\\(')${c}(')`, 'g'), `$1${PREFIX}${c}$2`); // classList.toggle('compact')
  return out;
}

// ── CSS: 전역 규칙 제거 + .md-v2 한정 + 접두사 ─────────────────────────────
function scopeSelector(sel) {
  const s = sel.trim();
  if (!s) return null;
  if (/^(body|html|\.top\b|\.top .in)/.test(s)) return null;      // 사이트가 Header/Footer 를 쓰므로 버린다
  if (s === ':root') return SCOPE;
  if (s === '*') return `${SCOPE} *`;
  if (s.startsWith('#md-inter')) return `${SCOPE} ${prefixSelector(s)}`;
  return `${SCOPE} ${prefixSelector(s)}`;
}
function transformCss(css) {
  css = css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/@font-face\{[^}]*\}/g, '');
  // 블록(규칙 1개 또는 @media 통째) 사이에 @@ 를 끼워, 글 여러 편의 공통 규칙을 블록 단위로 중복 제거한다
  let out = '';
  let i = 0;
  const rules = (block) => {
    let r = '';
    const re = /([^{}]+)\{([^{}]*)\}/g; let m;
    while ((m = re.exec(block))) {
      const sels = m[1].split(',').map(scopeSelector).filter(Boolean);
      if (sels.length) r += `${sels.join(',')}{${m[2].trim()}}\n`;
    }
    return r;
  };
  while (i < css.length) {
    while (i < css.length && /\s/.test(css[i])) i++;
    if (i >= css.length) break;
    if (css[i] === '@') {
      const braceAt = css.indexOf('{', i);
      const at = css.slice(i, braceAt).trim();
      let depth = 0, j = braceAt;
      for (; j < css.length; j++) { if (css[j] === '{') depth++; else if (css[j] === '}') { depth--; if (depth === 0) break; } }
      out += `${at}{\n${rules(css.slice(braceAt + 1, j))}}\n@@`;
      i = j + 1;
    } else {
      const end = css.indexOf('}', i);
      out += rules(css.slice(i, end + 1)) + '@@';
      i = end + 1;
    }
  }
  return out;
}

// ── 변환 ─────────────────────────────────────────────────────────────────
function convert(a) {
  const raw = fs.readFileSync(path.join(SRC, a.file), 'utf8');
  const title = /<title>([\s\S]*?)<\/title>/.exec(raw)?.[1]?.trim();
  const desc = /<meta name="description" content="([\s\S]*?)">/.exec(raw)?.[1]?.trim();
  const style = /<style>([\s\S]*?)<\/style>/.exec(raw)?.[1];
  const mainRaw = /<main>([\s\S]*?)<\/main>/.exec(raw)?.[1];
  const script = [...raw.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]).join('\n');
  const faqLdRaw = [...raw.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map((m) => JSON.parse(m[1])).find((j) => j['@type'] === 'FAQPage');
  if (!title || !desc || !style || !mainRaw || !script || !faqLdRaw) throw new Error(`${a.file}: 추출 실패`);

  let body = mainRaw.replace(/<div class="crumb">[\s\S]*?<\/div>\s*/, '');       // 빵부스러기는 페이지가 담당
  body = body.replace(`src="/_preview/${a.og}"`, `src="/og/${a.slug}.png"`);   // 대표 이미지 실제 경로
  const classes = collectClasses(body);
  const hero = /<img class="hero"[^>]*alt="([^"]*)"/.exec(body)?.[1] ?? title;

  // 대표 이미지 복사
  const ogSrc = path.join(SRC, a.og);
  if (!fs.existsSync(ogSrc)) throw new Error(`${a.file}: ${a.og} 없음 (render-og.mjs 먼저)`);
  fs.mkdirSync(path.join(ROOT, 'public/og'), { recursive: true });
  fs.copyFileSync(ogSrc, path.join(ROOT, `public/og/${a.slug}.png`));

  return {
    title, desc, hero,
    html: prefixHtml(body).trim(),
    css: transformCss(style),
    js: prefixScript(script, classes).trim(),
    faqLd: faqLdRaw,
  };
}

function dataFile(a, c) {
  return `// 자동 생성: scripts/article-template/convert-v2.mjs — 직접 수정하지 말 것
// 원본: public/_preview/${a.file}
export const meta = {
  title: ${JSON.stringify(c.title)},
  description: ${JSON.stringify(c.desc)},
  datePublished: "2026-09-02",
  dateModified: "2026-09-02",
  url: ${JSON.stringify(`https://moneydoc.kr/${a.cat}/${a.slug}/`)},
  image: ${JSON.stringify(`https://moneydoc.kr/og/${a.slug}.png`)},
  imageAlt: ${JSON.stringify(c.hero)},
};

export const scriptKey = ${JSON.stringify(a.slug)};

export const html = \`${esc(c.html)}\`;

export const faqLd = ${JSON.stringify(c.faqLd, null, 2)};

export const landing = ${JSON.stringify(readLanding(a), null, 2)};
`;
}

const URLMAP = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/url-map.json'), 'utf8'));
const HUBMAP = Object.fromEntries(Object.entries(URLMAP).filter(([k]) => !k.startsWith('_')));
const NOCALC = URLMAP['_계산기없는허브'] ?? {};
const NL = String.fromCharCode(10);

/** 글 슬러그 → 허브 라우트. 계산기가 있으면 그 컴포넌트 파일명도 같이 돌려준다 */
function hubRoute(a) {
  const base = a.slug.replace(/-guide$/, '');
  const hub = HUBMAP[a.cat + '/' + base];
  if (hub) {
    const dir = path.join(ROOT, 'app', hub);
    return { route: hub, client: null };   // 계산기는 /{hub}/calculator/ 로 따로 둔다
  }
  return { route: NOCALC[a.cat + '/' + a.slug] ?? (a.cat + '/' + a.slug), client: null };
}

/**
 * 빵부스러기는 주제 구조를 따른다.
 *   허브  : 홈 › 실업급여
 *   스포크: 홈 › 실업급여 › 수급자격
 * 카테고리(정부지원금)를 앞에 두지 않는다. 허브가 주제이지 카테고리의 하위가 아니다.
 */
function crumbOf(a, route) {
  const seg = route.split('/');
  if (seg.length === 1) return { hubHref: null, hubLabel: null, crumb: a.crumb };
  const hubSlug = seg[0];
  const hubArticle = LIST.find((x) => hubRoute(x).route === hubSlug);
  const hubLabel = hubArticle ? hubArticle.crumb : hubSlug;
  // 스포크 이름 앞의 허브 이름을 뗀다. "실업급여 › 실업급여 수급자격" 처럼 겹치지 않게
  const crumb = a.crumb.startsWith(hubLabel + ' ') ? a.crumb.slice(hubLabel.length + 1) : a.crumb;
  return { hubHref: '/' + hubSlug + '/', hubLabel, crumb };
}

function readLanding(a) {
  const p = path.join(ROOT, 'public/_preview', `landing-${a.slug}.json`);
  return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : null;
}

function pageFile(a) {
  const { route, client } = hubRoute(a);
  const url = 'https://moneydoc.kr/' + route + '/';
  const comp = client ? client.replace(/[^A-Za-z0-9_]/g, '') : null;
  const bc = crumbOf(a, route);
  const catHref = bc.hubHref ?? '/';
  const catLabel = bc.hubLabel ?? '홈';
  const navActive = a.cat === 'government' ? 'gov' : a.cat;   // 헤더 하이라이트는 카테고리를 따른다
  const importLine = client ? 'import { ' + comp + ' } from "./' + client + '";' + NL : '';
  const calcProp = client ? '      calculator={<' + comp + ' />}' + NL : '';
  const isSpoke = route.includes('/');
  // 주제 홈(TopicHome) 은 만들어 뒀지만 디자인이 아직 못 미쳐 보류. 지금은 허브도 글 템플릿을 쓴다.
  const USE_TOPIC_HOME = false;
  const Comp = !isSpoke && USE_TOPIC_HOME ? 'TopicHome' : 'HubPage';
  return [
    'import type { Metadata } from "next";',
    'import { ' + Comp + ' } from "@/components/' + Comp + '";',
    importLine + 'import { meta, faqLd, html, scriptKey' + (!isSpoke && USE_TOPIC_HOME ? ', landing' : '') + ' } from "@/data/articles/' + a.cat + '/' + a.slug + '";',
    '',
    'const PAGE_URL = ' + JSON.stringify(url) + ';',
    '',
    'export const metadata: Metadata = {',
    '  title: meta.title,',
    '  description: meta.description,',
    '  alternates: { canonical: "/' + route + '/" },',
    '  robots: { index: true, follow: true, "max-image-preview": "large" },',
    '  openGraph: {',
    '    type: "article",',
    '    title: meta.title,',
    '    description: meta.description,',
    '    url: PAGE_URL,',
    '    publishedTime: meta.datePublished,',
    '    modifiedTime: meta.dateModified,',
    '    images: [{ url: meta.image, width: 1200, height: 630, alt: meta.imageAlt }],',
    '  },',
    '  twitter: { card: "summary_large_image", title: meta.title, description: meta.description, images: [meta.image] },',
    '};',
    '',
    'export default function Page() {',
    '  return (',
    '    <' + Comp,
    '      meta={meta}',
    '      html={html}',
    (!isSpoke && USE_TOPIC_HOME) ? '      landing={landing}' : null,
    '      faqLd={faqLd}',
    '      scriptKey={scriptKey}',
    '      url={PAGE_URL}',
    '      catHref=' + JSON.stringify(catHref),
    '      catLabel=' + JSON.stringify(catLabel),
    '      navActive=' + JSON.stringify(navActive),
    '      crumb=' + JSON.stringify(bc.crumb),
    calcProp + '    />',
    '  );',
    '}',
    '',
  ].filter((x) => x !== null).join(NL);
}

// ── 실행 ─────────────────────────────────────────────────────────────────
let css = `/* 자동 생성: scripts/article-template/convert-v2.mjs — 직접 수정하지 말 것
   원본: scripts/article-template/v2.css + 각 글의 인라인 스타일. 모든 규칙은 .md-v2 안으로 한정. */
`;
const seenCss = new Set();
let registry = `// 자동 생성: scripts/article-template/convert-v2.mjs — 직접 수정하지 말 것
// 글별 인라인 스크립트. ArticleV2Runtime 이 마운트 후 scriptKey 로 한 번 실행한다.
/* eslint-disable */
export const SCRIPTS = {
`;
for (const a of ARTICLES) {
  const c = convert(a);
  for (const block of c.css.split('@@')) { const t = block.trim(); if (t && !seenCss.has(t)) { seenCss.add(t); css += t + '\n'; } }
  registry += `  ${JSON.stringify(a.slug)}: function () {\n${c.js.replace(/^\(function\(\)\{/, '').replace(/\}\)\(\);?\s*$/, '')}\n  },\n`;
  fs.mkdirSync(path.join(ROOT, `moneydoc-data/articles/${a.cat}`), { recursive: true });
  fs.writeFileSync(path.join(ROOT, `moneydoc-data/articles/${a.cat}/${a.slug}.ts`), dataFile(a, c), 'utf8');
  const { route: hubR } = hubRoute(a);
  fs.mkdirSync(path.join(ROOT, `app/${hubR}`), { recursive: true });
  fs.writeFileSync(path.join(ROOT, `app/${hubR}/page.tsx`), pageFile(a), 'utf8');
  console.log(`✓ /${hubR}/  html ${(c.html.length / 1024).toFixed(0)}KB  js ${(c.js.length / 1024).toFixed(1)}KB  faq ${c.faqLd.mainEntity.length}`);
}
registry += '};\n';
fs.writeFileSync(path.join(ROOT, 'components/article-v2.css'), css, 'utf8');
fs.writeFileSync(path.join(ROOT, 'components/article-v2-scripts.js'), registry, 'utf8');
console.log(`css ${(css.length / 1024).toFixed(0)}KB → components/article-v2.css`);
