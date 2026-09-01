// public/_preview/article.css → components/article.css
// 미리보기 CSS는 :root / * / a / h1 / .nav / .wrap 같은 전역 셀렉터를 쓴다.
// 사이트 전역 스타일(globals.css, Header, Footer)을 덮어쓰지 않도록
// 모든 규칙을 .md-article 안으로 한정하고, 자체 헤더 규칙은 버린다.
// 실행: node scripts/gen-article-css.mjs
import fs from 'node:fs';
import path from 'node:path';
import { prefixSelector } from './_article-prefix.mjs';

const ROOT = process.cwd();
const src = fs.readFileSync(path.join(ROOT, 'public/_preview/article.css'), 'utf8');

const SCOPE = '.md-article';
// 사이트가 자체 Header/Footer를 쓰므로 미리보기용 헤더 규칙은 통째로 버린다.
const DROP = /^(\.nav|\.nav-i|\.nav-c|\.logo|body)\b/;

function scopeSelector(sel) {
  const s = sel.trim();
  if (!s) return null;
  if (DROP.test(s)) return null;

  // :root 변수 정의 → .md-article 로 옮겨 사이트 전역 토큰을 건드리지 않게 한다
  if (s === ':root') return SCOPE;
  if (s === ':root:not([data-theme=light])') return `:root:not([data-theme=light]) ${SCOPE}`;
  if (s === ':root[data-theme=dark]') return `:root[data-theme=dark] ${SCOPE}`;

  // 미리보기의 2단 그리드 래퍼 = 아티클 컨테이너 자신
  if (s === '.wrap') return SCOPE;

  if (s === '*') return `${SCOPE} *`;
  return `${SCOPE} ${prefixSelector(s)}`;
}

// 셀렉터 { 선언 } 단위로 순회. @media 는 블록을 유지한 채 내부만 처리한다.
function transform(css) {
  let out = '';
  let i = 0;
  while (i < css.length) {
    // 규칙 사이의 공백/개행을 건너뛰어야 @media 를 놓치지 않는다
    while (i < css.length && /\s/.test(css[i])) i++;
    if (i >= css.length) break;
    if (css[i] === '@') {
      const braceAt = css.indexOf('{', i);
      const at = css.slice(i, braceAt).trim();
      // 블록 끝 찾기 (중첩 1단계까지)
      let depth = 0, j = braceAt;
      for (; j < css.length; j++) {
        if (css[j] === '{') depth++;
        else if (css[j] === '}') { depth--; if (depth === 0) break; }
      }
      const inner = css.slice(braceAt + 1, j);
      out += `${at}{\n${transform(inner)}}\n`;
      i = j + 1;
      continue;
    }
    const braceAt = css.indexOf('{', i);
    if (braceAt === -1) break;
    const close = css.indexOf('}', braceAt);
    if (close === -1) break;
    const selectors = css.slice(i, braceAt);
    const decls = css.slice(braceAt + 1, close).trim();
    const scoped = selectors
      .split(',')
      .map(scopeSelector)
      .filter(Boolean);
    if (scoped.length && decls) out += `${scoped.join(',')}{${decls}}\n`;
    i = close + 1;
  }
  return out;
}

const header = `/* 자동 생성: scripts/gen-article-css.mjs — 직접 수정하지 말 것
   원본: public/_preview/article.css
   모든 규칙은 .md-article 안으로 한정된다 (사이트 전역 스타일과 충돌 방지). */
`;

// 아티클 컨테이너 기본값 — 미리보기의 body 규칙을 대신한다
const base = `${SCOPE}{color:var(--fg);line-height:1.8;
font-family:'Pretendard Variable',Pretendard,"Noto Sans KR",-apple-system,system-ui,sans-serif;
-webkit-font-smoothing:antialiased}
${SCOPE} main{min-width:0}
@media(max-width:900px){${SCOPE}{grid-template-columns:1fr}}
`;

const outCss = header + transform(src) + base;
fs.writeFileSync(path.join(ROOT, 'components/article.css'), outCss, 'utf8');

const rules = (outCss.match(/\{/g) || []).length;
console.log(`components/article.css 생성 — ${outCss.split('\n').length}줄, 규칙 약 ${rules}개`);
const leaked = outCss
  .split('\n')
  .filter((l) => /^[^@\s.]/.test(l) && l.includes('{') && !l.startsWith(SCOPE) && !l.startsWith(':root'));
console.log(leaked.length ? `⚠ 범위 밖 셀렉터:\n${leaked.join('\n')}` : '범위 밖으로 새는 셀렉터 없음 ✓');
