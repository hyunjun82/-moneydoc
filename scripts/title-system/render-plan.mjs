/**
 * titles.unemployment-v2.json 을 볼 수 있는 한 장짜리 HTML 로 만든다.
 * 실행: node scripts/title-system/render-plan.mjs <출력경로>
 */
import fs from 'node:fs';

const d = JSON.parse(fs.readFileSync('scripts/title-system/titles.unemployment-v2.json', 'utf8'));
const out = process.argv[2] ?? 'unemployment-plan.html';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const spokes = d.groups.flatMap((g) => g.spokes);
const n = (t) => spokes.filter((s) => s.tier === t).length;
const h2n = spokes.reduce((a, s) => a + s.h2.length, 0);
const gid = (i) => 'g' + i;

const nav = d.groups
  .map((g, i) => `<a href="#${gid(i)}"><span class="nav-g">${esc(g.group)}</span><span class="nav-n">${g.spokes.length}</span></a>`)
  .join('\n');

const body = d.groups
  .map((g, i) => {
    const items = g.spokes
      .map((s) => {
        const done = s.done ? '<span class="done">작성 완료</span>' : '';
        const h2 = s.h2.map((h) => `<li>${esc(h)}</li>`).join('');
        return `<article class="spoke t${s.tier}">
  <div class="head">
    <span class="tier" aria-label="${s.tier}등급">${s.tier}</span>
    <h3>${esc(s.title)}</h3>
  </div>
  <p class="meta"><code>/unemployment/${esc(s.slug)}/</code><span class="ev">${esc(s.evidence)}</span>${done}</p>
  <ol class="h2">${h2}</ol>
  ${s.issue ? `<p class="issue"><b>손봐야 함</b> ${esc(s.issue)}</p>` : ''}
</article>`;
      })
      .join('\n');
    return `<section id="${gid(i)}" class="group">
  <h2><span class="g-name">${esc(g.group)}</span><span class="g-n">${g.spokes.length}편</span></h2>
  ${items}
</section>`;
  })
  .join('\n');

const html = `<title>실업급여 콘텐츠 지도</title>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&family=IBM+Plex+Sans+KR:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap">
<style>
:root{
  --ground:#f7f5f0; --card:#fdfbf6; --ink:#1b201e; --muted:#6f746f;
  --brand:#1f3a3a; --brand-2:#33534f; --soft:#e7ece8; --line:#e3dfd4;
  --a-bg:#1f3a3a; --a-fg:#fdfbf6; --b-fg:#33534f; --b-line:#8fa39c;
  --c-fg:#948f84; --c-line:#d8d3c6;
  --warn-bg:#f3ece0; --warn-line:#b98a3e; --warn-fg:#6b5220;
  --sans:"IBM Plex Sans KR",Pretendard,-apple-system,"Malgun Gothic",sans-serif;
  --serif:"Gowun Batang","Nanum Myeongjo",serif;
  --mono:"IBM Plex Mono",ui-monospace,monospace;
}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){
  --ground:#141817; --card:#1c2220; --ink:#e8e5dc; --muted:#98a09a;
  --brand:#8fb3a6; --brand-2:#a8c6ba; --soft:#233230; --line:#2b3331;
  --a-bg:#8fb3a6; --a-fg:#141817; --b-fg:#a8c6ba; --b-line:#4a5f59;
  --c-fg:#7d837d; --c-line:#333b38;
  --warn-bg:#2b2519; --warn-line:#b98a3e; --warn-fg:#dcc38c;
}}
:root[data-theme="dark"]{
  --ground:#141817; --card:#1c2220; --ink:#e8e5dc; --muted:#98a09a;
  --brand:#8fb3a6; --brand-2:#a8c6ba; --soft:#233230; --line:#2b3331;
  --a-bg:#8fb3a6; --a-fg:#141817; --b-fg:#a8c6ba; --b-line:#4a5f59;
  --c-fg:#7d837d; --c-line:#333b38;
  --warn-bg:#2b2519; --warn-line:#b98a3e; --warn-fg:#dcc38c;
}
*{box-sizing:border-box}
body{background:var(--ground);color:var(--ink);font-family:var(--sans);line-height:1.6;
  -webkit-font-smoothing:antialiased}
.wrap{max-width:1120px;margin:0 auto;padding:40px 24px 80px}

header{border-bottom:1px solid var(--line);padding-bottom:28px;margin-bottom:32px}
.eyebrow{font-family:var(--mono);font-size:11px;letter-spacing:.14em;text-transform:uppercase;
  color:var(--muted);margin:0 0 10px}
h1{font-family:var(--serif);font-weight:700;font-size:clamp(28px,4.4vw,42px);line-height:1.25;
  margin:0 0 12px;text-wrap:balance;color:var(--brand)}
.lede{margin:0;max-width:58ch;color:var(--muted);font-size:15px}

.stats{display:flex;flex-wrap:wrap;gap:0;margin-top:24px;border:1px solid var(--line);
  border-radius:3px;background:var(--card);overflow:hidden}
.stat{flex:1 1 120px;padding:14px 18px;border-right:1px solid var(--line)}
.stat:last-child{border-right:0}
.stat b{display:block;font-family:var(--mono);font-size:22px;font-weight:500;
  font-variant-numeric:tabular-nums;color:var(--brand)}
.stat span{font-size:12px;color:var(--muted)}

.cols{display:grid;grid-template-columns:1fr;gap:36px}
@media(min-width:940px){.cols{grid-template-columns:186px 1fr;gap:44px;align-items:start}
  .sidenav{position:sticky;top:24px}}
.sidenav{display:flex;flex-direction:column;gap:1px}
.sidenav a{display:flex;justify-content:space-between;gap:10px;padding:7px 10px;text-decoration:none;
  color:var(--muted);font-size:13px;border-left:2px solid transparent;border-radius:0 2px 2px 0}
.sidenav a:hover,.sidenav a:focus-visible{color:var(--brand);background:var(--soft);border-left-color:var(--brand)}
.sidenav a:focus-visible{outline:2px solid var(--brand);outline-offset:1px}
.nav-n{font-family:var(--mono);font-size:11px;font-variant-numeric:tabular-nums}

.group{margin-bottom:44px;scroll-margin-top:20px}
.group h2{display:flex;align-items:baseline;gap:12px;margin:0 0 16px;padding-bottom:8px;
  border-bottom:1px solid var(--line);font-size:15px;font-weight:600;letter-spacing:.01em}
.g-n{font-family:var(--mono);font-size:12px;color:var(--muted);font-variant-numeric:tabular-nums}

.spoke{padding:16px 0;border-bottom:1px dashed var(--line)}
.spoke:last-child{border-bottom:0}
.head{display:flex;gap:11px;align-items:flex-start}
.spoke h3{margin:0;font-size:17px;font-weight:600;line-height:1.45;text-wrap:balance}
.tier{flex:none;width:21px;height:21px;margin-top:2px;border-radius:50%;display:grid;place-items:center;
  font-family:var(--mono);font-size:11px;font-weight:500}
.tA .tier{background:var(--a-bg);color:var(--a-fg)}
.tB .tier{color:var(--b-fg);box-shadow:inset 0 0 0 1px var(--b-line)}
.tC .tier{color:var(--c-fg);box-shadow:inset 0 0 0 1px var(--c-line)}
.tC h3{color:var(--muted)}

.meta{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin:7px 0 10px 32px;font-size:12px}
.meta code{font-family:var(--mono);font-size:11.5px;color:var(--brand-2);background:var(--soft);
  padding:2px 6px;border-radius:2px}
.ev{color:var(--muted)}
.done{color:var(--a-fg);background:var(--a-bg);padding:2px 7px;border-radius:2px;font-size:11px}

ol.h2{margin:0 0 0 32px;padding:0;list-style:none;counter-reset:q;
  display:grid;grid-template-columns:1fr;gap:3px 26px}
@media(min-width:700px){ol.h2{grid-template-columns:1fr 1fr}}
ol.h2 li{counter-increment:q;position:relative;padding-left:20px;font-size:13.5px;color:var(--muted)}
ol.h2 li::before{content:counter(q);position:absolute;left:0;top:1px;font-family:var(--mono);
  font-size:10.5px;color:var(--brand);opacity:.75;font-variant-numeric:tabular-nums}

.issue{margin:12px 0 0 32px;padding:9px 12px;background:var(--warn-bg);border-left:2px solid var(--warn-line);
  font-size:12.5px;color:var(--warn-fg);border-radius:0 2px 2px 0}
.issue b{font-weight:600;margin-right:6px}

.legend{display:flex;flex-wrap:wrap;gap:18px;margin:0 0 20px;font-size:12.5px;color:var(--muted)}
.legend > span{display:flex;align-items:center;gap:7px}

footer{margin-top:52px;padding-top:20px;border-top:1px solid var(--line);
  font-size:12.5px;color:var(--muted)}
footer p{margin:0 0 5px;max-width:62ch}
footer code{font-family:var(--mono);font-size:11.5px}
</style>

<div class="wrap">
<header>
  <p class="eyebrow">moneydoc · 허브 /unemployment/</p>
  <h1>실업급여 62편, 제목과 소제목 설계</h1>
  <p class="lede">연관검색어 139개와 네이버 지식iN 질문 702건에서 뽑았습니다. 한 편이 질문 하나를 끝까지 답하고, 소제목은 검색어 그대로의 질문형입니다.</p>
  <div class="stats">
    <div class="stat"><b>${spokes.length}</b><span>스포크 글</span></div>
    <div class="stat"><b>${h2n}</b><span>소제목</span></div>
    <div class="stat"><b>${n('A')}</b><span>A등급 먼저</span></div>
    <div class="stat"><b>${n('B')}</b><span>B등급</span></div>
    <div class="stat"><b>${n('C')}</b><span>C등급</span></div>
  </div>
</header>

<div class="cols">
  <nav class="sidenav" aria-label="묶음 목차">${nav}</nav>
  <main>
    <p class="legend">
      <span><span class="tier" style="background:var(--a-bg);color:var(--a-fg)">A</span> 검색어·질문 모두 많음</span>
      <span><span class="tier" style="color:var(--b-fg);box-shadow:inset 0 0 0 1px var(--b-line)">B</span> 수요 확인됨</span>
      <span><span class="tier" style="color:var(--c-fg);box-shadow:inset 0 0 0 1px var(--c-line)">C</span> 얇음, 나중에</span>
    </p>
    ${body}
    <footer>
      <p>출처 <code>실업급여_연관검색어.xlsx</code> · <code>실업급여_지식인.csv</code></p>
      <p>집계 <code>scripts/keyword-data/analyze.mjs · mine.mjs</code></p>
      <p>제목 규칙 <code>titles.confirmed-21.json</code> — 어미를 돌리고 "까지"는 15% 이하. 이 62편은 2%입니다.</p>
    </footer>
  </main>
</div>
</div>
`;

fs.writeFileSync(out, html, 'utf8');
console.log('wrote', out, html.length, 'bytes ·', spokes.length, '편 ·', h2n, '소제목');
