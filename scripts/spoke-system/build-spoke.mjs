#!/usr/bin/env node
// build-spoke.mjs — 콘텐츠 JSON -> 허브와 "동일 구조"의 스포크 .ts + page.tsx 생성.
// 구조(섹션/표/페르소나/스텝/FAQ/funnel)는 허브 컴포넌트를 그대로 찍으므로 흉내가 아닌 기계적 동일.
// 사용: node scripts/spoke-system/build-spoke.mjs scripts/spoke-system/content/soldier.json
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";

const BT = String.fromCharCode(96);
const cfg = JSON.parse(readFileSync(resolve(process.cwd(), process.argv[2]), "utf8"));

function bullets(items){
  return '<ul class="docs">\n' + items.map(t=>'        <li><span>'+t+'</span></li>').join('\n') + '\n      </ul>';
}
function table(t){
  const head = '<tr>' + t.headers.map((h,i)=> i===t.hl ? '<th class="p1">'+h+'</th>' : '<th>'+h+'</th>').join('') + '</tr>';
  const rows = t.rows.map(r=>'<tr>'+r.map((cell,i)=> i===0 ? '<td class="lab">'+cell+'</td>' : (i===t.hl ? '<td class="hl1">'+cell+'</td>' : '<td>'+cell+'</td>')).join('')+'</tr>').join('\n            ');
  return '<div class="tbl-scroll">\n        <table class="cmp">\n          <thead>\n            '+head+'\n          </thead>\n          <tbody>\n            '+rows+'\n          </tbody>\n        </table>\n      </div>';
}
function steps(arr){
  return '<div class="steps">\n' + arr.map((s,i)=>'        <div class="st"><span class="sn">'+(i+1)+'</span><div class="sb"><b>'+s.t+'</b>'+s.d+'</div></div>').join('\n') + '\n      </div>';
}
function persona(arr){
  return '<div class="persona-grid">\n' + arr.map(p=>'        <div class="persona-card"><div class="persona-name">'+p.name+'</div><div class="persona-situation">'+p.situation+'</div><div class="persona-result">'+p.result+'</div></div>').join('\n') + '\n      </div>';
}
function section(s){
  let inner = s.type==='table'?table(s.table):s.type==='steps'?steps(s.steps):s.type==='persona'?persona(s.persona):bullets(s.items);
  const teaser = s.teaser ? '      <p class="secteaser">'+s.teaser+'</p>\n' : '';
  const note = s.note ? '\n      <p class="secteaser" style="margin-top:var(--sp-3);font-size:var(--fs-caption)">'+s.note+'</p>' : '';
  const pill = s.pill ? '\n      <a class="pillbtn" href="'+s.pill.href+'">'+s.pill.label+'</a>' : '';
  return '    <section class="card" id="'+s.id+'">\n      <div class="seclabel"><span class="num">'+s.num+'</span><span class="txt">'+s.label+'</span></div>\n      <h2>'+s.h2+'</h2>\n'+teaser+'      '+inner+note+pill+'\n    </section>';
}

// ── 본문 조립 (허브 골격 고정) ──
let b = '\n<article class="wrap">\n\n';
b += '    <a class="applysticky" href="'+cfg.applyUrl+'">\n      <span class="as-t">'+cfg.sticky.t+'</span>\n      <span class="as-d">'+cfg.sticky.d+'</span>\n      <span class="as-btn">신청 바로가기 →</span>\n    </a>\n\n';
b += '    <div class="masthead">\n      <div class="kicker">'+cfg.kicker+'</div>\n      <div class="src">자료 출처: '+cfg.sources+'</div>\n    </div>\n\n';
b += '    <section class="card hero">\n      <span class="tag">'+cfg.hero.tag+'</span>\n      <h1>'+cfg.hero.h1+'</h1>\n      <p class="lead">'+cfg.hero.lead+'</p>\n      <div class="topics">\n'+cfg.hero.topics.map(t=>'        <span>'+t+'</span>').join('\n')+'\n      </div>\n    </section>\n\n';
b += '    <div class="byline">\n      <div class="ed"><span class="ava">지</span><span class="who">지원금 에디터</span></div>\n      <div class="dates"><span>작성일 <time datetime="'+cfg.meta.datePublished+'">'+cfg.dateLabel+'</time></span><span>수정일 <time datetime="'+cfg.meta.dateModified+'">'+cfg.dateLabel+'</time></span></div>\n    </div>\n\n';
b += '    <div class="facts">\n'+cfg.facts.map(f=>'      <div class="f"><div class="k">'+f.k+'</div><div class="v'+(f.accent?' accent':'')+'">'+f.v+'</div></div>').join('\n')+'\n    </div>\n\n';
b += '    <div class="notice"><span class="ic">ⓘ</span><span>'+cfg.notice+'</span></div>\n\n';
b += '    <details class="toc" open>\n      <summary><span class="ic">☰</span><span>목차</span><span class="tog">+</span></summary>\n      <nav class="toc-nav">\n        <a href="#sec-summary">'+cfg.summary.h2+'</a>\n'+cfg.sections.map(s=>'        <a href="#'+s.id+'">'+s.h2+'</a>').join('\n')+'\n        <a href="#sec-faq">'+cfg.faqH2+'</a>\n      </nav>\n    </details>\n\n';
b += '    <section class="card" id="sec-summary">\n      <div class="seclabel"><span class="num">!</span><span class="txt">한눈에 요약</span></div>\n      <h2>'+cfg.summary.h2+'</h2>\n      <div class="keypts" style="margin-top:var(--sp-6)">\n'+cfg.summary.points.map((p,i)=>'        <div class="pt"><span class="n">'+(i+1)+'</span><span class="t">'+p+'</span></div>').join('\n')+'\n      </div>\n      <p class="secteaser" style="margin-top:var(--sp-4)">'+cfg.summary.teaser+'</p>\n    </section>\n\n';
b += '    <a class="applybar" href="'+cfg.applyUrl+'">\n      <span class="t">'+cfg.applybar.t+'<small>'+cfg.applybar.d+'</small></span>\n      <span class="btn">신청 바로가기 →</span>\n    </a>\n\n';
b += cfg.sections.map(section).join('\n\n') + '\n\n';
b += '    <section class="card" id="sec-faq">\n      <div class="seclabel"><span class="num">?</span><span class="txt">자주 묻는 질문 FAQ</span></div>\n      <h2>'+cfg.faqH2+'</h2>\n      <div class="faq" style="margin-top:var(--sp-6)">\n'+cfg.faq.map((q,i)=>'        <details'+(i===0?' open':'')+'>\n          <summary><span class="q">Q.</span><span>'+q.q+'</span><span class="plus">+</span></summary>\n          <div class="ans">'+q.a+'</div>\n        </details>').join('\n')+'\n      </div>\n    </section>\n\n';
b += '    <section class="card" id="sec-related">\n      <div class="seclabel"><span class="num">↗</span><span class="txt">관련</span></div>\n      <h2>'+cfg.related.h2+'</h2>\n      <p class="secteaser">'+cfg.related.teaser+'</p>\n      <div class="rellinks">\n'+cfg.related.links.map(l=>'        <a class="rel" href="'+l.href+'"><span class="rt">'+l.rt+'</span><span class="rd">'+l.rd+'</span></a>').join('\n')+'\n      </div>\n      <a class="pillbtn" href="'+cfg.applyUrl+'">청년미래적금 신청하기 →</a>\n    </section>\n\n';
b += '    <div class="foot">\n      <div class="org">MoneyDoc 편집팀</div>\n      <div style="margin-top:6px">자료 출처: '+cfg.sources+' — 정책은 변동될 수 있으니 신청 전 공식 채널에서 확인하세요.</div>\n    </div>\n\n  </article>\n';

const faqLd = { "@context":"https://schema.org","@type":"FAQPage", mainEntity: cfg.faq.map(q=>({"@type":"Question",name:q.qLd||q.q.replace(/<[^>]+>/g,''),acceptedAnswer:{"@type":"Answer",text:(q.aLd||q.a).replace(/<[^>]+>/g,'')}})) };

let ts = '// 자동 생성: build-spoke.mjs (sourceQuery: "'+cfg.sourceQuery+'"). 구조=허브 동일, 사실=검증 출처만.\n\n';
ts += 'export const meta = {\n  title: '+JSON.stringify(cfg.meta.title)+',\n  description: '+JSON.stringify(cfg.meta.description)+',\n  ogImage: '+JSON.stringify(cfg.meta.ogImage)+',\n  datePublished: '+JSON.stringify(cfg.meta.datePublished)+',\n  dateModified: '+JSON.stringify(cfg.meta.dateModified)+',\n};\n\n';
ts += 'export const bodyHtml = '+BT+b+BT+';\n\n';
ts += 'export const faqLd = '+JSON.stringify(faqLd, null, 2)+';\n';

const tsPath = 'moneydoc-data/articles/'+cfg.category+'/'+cfg.baseSlug+'-'+cfg.slug+'.ts';
writeFileSync(resolve(process.cwd(), tsPath), ts);

const url = 'https://moneydoc.kr/'+cfg.category+'/'+cfg.baseSlug+'-'+cfg.slug+'/';
let tsx = 'import type { Metadata } from "next";\nimport { Header } from "@/components/Header";\nimport { Footer } from "@/components/Footer";\nimport { meta, bodyHtml, faqLd } from "@/data/articles/'+cfg.category+'/'+cfg.baseSlug+'-'+cfg.slug+'";\nimport "@/components/cardnews.css";\n\nconst PAGE_URL = '+JSON.stringify(url)+';\n\nexport const metadata: Metadata = {\n  title: meta.title,\n  description: meta.description,\n  alternates: { canonical: "/'+cfg.category+'/'+cfg.baseSlug+'-'+cfg.slug+'/" },\n  openGraph: { type: "article", title: meta.title, description: meta.description, url: PAGE_URL, images: meta.ogImage ? [meta.ogImage] : undefined },\n};\n\nconst articleLd = { "@context": "https://schema.org", "@type": "Article", headline: meta.title, description: meta.description, inLanguage: "ko", datePublished: meta.datePublished, dateModified: meta.dateModified, mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL }, author: { "@type": "Organization", name: "MoneyDoc 편집팀" }, publisher: { "@type": "Organization", name: "MoneyDoc", url: "https://moneydoc.kr/" }, ...(meta.ogImage ? { image: [meta.ogImage] } : {}) };\n\nconst breadcrumbLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [ { "@type": "ListItem", position: 1, name: "홈", item: "https://moneydoc.kr/" }, { "@type": "ListItem", position: 2, name: "정부지원금", item: "https://moneydoc.kr/government/" }, { "@type": "ListItem", position: 3, name: '+JSON.stringify(cfg.crumb)+', item: PAGE_URL } ] };\n\nexport default function Page() {\n  return (\n    <>\n      <Header active="government" />\n      <nav className="crumbs"><a href="/">홈</a><span className="sep">›</span><a href="/government/">정부지원금</a><span className="sep">›</span><a href="'+cfg.hubRoute+'">청년미래적금</a><span className="sep">›</span><span>'+cfg.crumbLast+'</span></nav>\n      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />\n      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />\n      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />\n      <div className="cardnews" dangerouslySetInnerHTML={{ __html: bodyHtml }} />\n      <Footer />\n    </>\n  );\n}\n';
const tsxDir = 'app/'+cfg.category+'/'+cfg.baseSlug+'-'+cfg.slug;
mkdirSync(resolve(process.cwd(), tsxDir), { recursive: true });
writeFileSync(resolve(process.cwd(), tsxDir+'/page.tsx'), tsx);

console.log('생성 완료:\n  ' + tsPath + '\n  ' + tsxDir + '/page.tsx');
