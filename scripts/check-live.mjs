// 배포 후 라이브 확인: 새 글 15편 응답, 사이트맵 반영, 본문·위젯 마크업 존재 여부.
// 실행: node scripts/check-live.mjs
import { ARTICLES } from './convert-previews.mjs';

const BASE = 'https://moneydoc.kr';
const get = async (u) => {
  const r = await fetch(BASE + u, { headers: { 'Cache-Control': 'no-cache' } });
  return { status: r.status, body: r.ok ? await r.text() : '' };
};

let bad = 0;
console.log('=== 가이드 글 15편 ===');
for (const a of ARTICLES) {
  const u = `/${a.cat}/${a.slug}/`;
  try {
    const { status, body } = await get(u);
    const text = body.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
    const hasWidget = body.includes('ax-wg-out');
    const faq = (body.match(/"@type":"Question"/g) || []).length;
    const ok = status === 200 && text.length > 3000 && hasWidget && faq >= 5;
    if (!ok) bad++;
    console.log(
      `  ${ok ? '✅' : '❌'} ${u.padEnd(48)} ${status} · ${text.length.toLocaleString()}자 · 위젯 ${hasWidget ? 'O' : 'X'} · FAQ ${faq}`
    );
  } catch (e) {
    bad++;
    console.log(`  ❌ ${u} — ${e.message}`);
  }
}

console.log('\n=== 사이트맵 ===');
const sm = await get('/sitemap.xml');
const locs = (sm.body.match(/<loc>/g) || []).length;
const guides = (sm.body.match(/guide\/<\/loc>/g) || []).length;
console.log(`  ${sm.status} · URL ${locs}개 · guide ${guides}개`);
if (locs < 100 || guides < 18) bad++;

console.log('\n=== 목록 페이지에서 글이 링크되는지 ===');
for (const u of ['/', '/tax/', '/realestate/', '/government/', '/law/']) {
  const { status, body } = await get(u);
  const n = (body.match(/class="article"/g) || []).length;
  const heading = /class="section-title">([^<]*)<\/h2>/g;
  const titles = [...body.matchAll(heading)].map((m) => m[1]);
  // 같은 제목의 섹션이 두 번 나오면 중복이다 (HTML이 한 줄이라 grep -c 로는 못 잡힌다)
  const dup = titles.filter((t, i) => titles.indexOf(t) !== i);
  const ok = status === 200 && n > 0 && dup.length === 0;
  if (!ok) bad++;
  console.log(
    `  ${ok ? '✅' : '❌'} ${u.padEnd(16)} ${status} · 글 카드 ${n}개 · 섹션 [${titles.join(' / ')}]` +
    (dup.length ? `  ⚠ 중복: ${[...new Set(dup)].join(', ')}` : '')
  );
}

console.log(`\n${bad === 0 ? '✅ 라이브 이상 없음' : `❌ 문제 ${bad}건`}`);
process.exit(bad === 0 ? 0 : 1);
