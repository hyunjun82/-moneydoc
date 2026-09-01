// public/_preview/*.html 의 위젯 스크립트를 components/article-widgets.js 로 모은다.
// 스크립트 본문은 손대지 않고 그대로 옮긴다 (엔진 대조 검증을 마친 코드이므로).
// 실행: node scripts/gen-article-widgets.mjs
import fs from 'node:fs';
import path from 'node:path';
import { ARTICLES } from './convert-previews.mjs';
import { prefixClassAttrs } from './_article-prefix.mjs';

const ROOT = process.cwd();
const SRC = path.join(ROOT, 'public/_preview');

const parts = [];
for (const a of ARTICLES) {
  const raw = fs.readFileSync(path.join(SRC, a.file), 'utf8');
  const m = /<script>\(function\(\)\{([\s\S]*?)\}\)\(\);<\/script>/.exec(raw);
  if (!m) throw new Error(`${a.file}: 위젯 스크립트 추출 실패`);
  // 스크립트가 innerHTML 로 찍는 class="..." 에도 같은 접두사를 붙여야 스타일이 맞는다
  const body = prefixClassAttrs(m[1].replace(/\n$/, ''));
  parts.push(
    `  // ── ${a.n}. ${a.crumb} (${a.file})\n` +
    `  ${a.widget}: function () {${body}\n  },`
  );
}

const out = `// 자동 생성: scripts/gen-article-widgets.mjs — 직접 수정하지 말 것
// 원본: public/_preview/*.html 의 인라인 위젯 스크립트를 그대로 옮긴 것.
// 각 함수는 해당 글의 위젯 DOM이 마운트된 뒤 한 번 호출된다.
// 값은 lib/calc/engine.js 와 전수 대조해 일치를 확인했다.

export const WIDGETS = {
${parts.join('\n\n')}
};
`;

fs.writeFileSync(path.join(ROOT, 'components/article-widgets.js'), out, 'utf8');

const dts = `export declare const WIDGETS: Record<string, () => void>;
`;
fs.writeFileSync(path.join(ROOT, 'components/article-widgets.d.ts'), dts, 'utf8');

console.log(`components/article-widgets.js 생성 — 위젯 ${ARTICLES.length}개, ${out.split('\n').length}줄`);
