// 가이드 글의 CSS 클래스 이름을 사이트 전역 스타일과 분리한다.
//
// 미리보기(public/_preview)는 단독 HTML이라 .toc .cta .hero .st .sum 같은
// 짧은 이름을 썼는데, 사이트의 globals.css / cardnews.css 에 같은 이름이 18개·17개
// 있어서 그대로 옮기면 서로 덮어쓴다. (실제로 .toc a::before 의 counter 가
// 목차에 "00" 을 붙였다.)
//
// 글 마크업은 전역 클래스를 하나도 쓰지 않으므로, 글 쪽 클래스 전부에
// 접두사를 붙이면 충돌이 사라진다. 컨테이너 .md-article 만 예외로 둔다.
export const PREFIX = 'ax-';

const KEEP = new Set(['md-article']);

export const prefixClass = (name) => (KEEP.has(name) ? name : PREFIX + name);

/** class="a b c" → class="ax-a ax-b ax-c" (HTML 문자열용) */
export function prefixClassAttrs(html) {
  return html.replace(/class="([^"]*)"/g, (_m, list) => {
    const out = list
      .split(/\s+/)
      .filter(Boolean)
      .map(prefixClass)
      .join(' ');
    return `class="${out}"`;
  });
}

/** CSS 셀렉터 안의 .foo → .ax-foo */
export function prefixSelector(sel) {
  return sel.replace(/\.(-?[A-Za-z_][\w-]*)/g, (_m, name) => '.' + prefixClass(name));
}
