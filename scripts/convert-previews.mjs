// public/_preview/*.html (검증 완료된 미리보기) → Next.js 아티클로 변환
//   moneydoc-data/articles/{cat}/{slug}.ts   (meta / bodyHtml / widgetHtml / faqLd)
//   app/{cat}/{slug}/page.tsx
// 실행: node scripts/convert-previews.mjs
import fs from 'node:fs';
import path from 'node:path';
import { prefixClassAttrs } from './_article-prefix.mjs';

const ROOT = process.cwd();
const SRC = path.join(ROOT, 'public/_preview');

// ── 글 정의 ───────────────────────────────────────────────────────────────
// file        : public/_preview 안의 파일명
// cat/slug    : 새 라우트 /{cat}/{slug}/
// calc        : 이 글이 가리키는 계산기 URL (CTA)
// crumb       : 빵부스러기 마지막 라벨
// catLabel    : 카테고리 표시명
// widget      : ArticleWidget 레지스트리 키
export const ARTICLES = [
  { n: 1,  file: '1-퇴직금-계산방법.html',   cat: 'law',        slug: 'severance-pay-guide',              calc: '/law/severance-pay/',                        catLabel: '법률',      crumb: '퇴직금 계산과 평균임금',   widget: 'severance', blurb: '평균임금 vs 통상임금 · 퇴사일 직전 3개월' },
    // n:2 연봉 실수령액 → v2 템플릿(scripts/article-template/articles/salary-net-pay-guide.mjs)으로 이전 (2026-09-03)
  { n: 3,  file: '3-양도세-비과세.html',     cat: 'realestate', slug: 'transfer-tax-guide',               calc: '/realestate/transfer-tax/',                  catLabel: '부동산',    crumb: '1세대 1주택 비과세',       widget: 'transfer', blurb: '2년 보유·거주요건과 12억 고가주택 기준' },
  { n: 4,  file: '4-스트레스DSR.html',       cat: 'loan',       slug: 'dsr-limit-guide',                  calc: '/loan/dsr-limit/',                           catLabel: '대출',      crumb: '스트레스 DSR',             widget: 'dsr', blurb: '스트레스 금리 1~3단계 · 한도 얼마나 줄까' },
  { n: 5,  file: '5-국민연금-조기수령.html', cat: 'pension',    slug: 'national-pension-early-guide',     calc: '/pension/national-pension-early/',           catLabel: '연금',      crumb: '조기수령 손익분기',        widget: 'earlyPension', blurb: '1년 앞당길수록 6% 감액 · 손익분기 나이' },
  { n: 6,  file: '6-적금-예금-이자.html',    cat: 'savings',    slug: 'installment-savings-guide',        calc: '/savings/installment-savings/',              catLabel: '저축',      crumb: '적금·예금 이자',           widget: 'savings', blurb: '단리·복리 차이와 이자소득세 15.4%' },
  { n: 7,  file: '7-기초연금.html',          cat: 'government', slug: 'basic-pension-guide',              calc: '/government/basic-pension/',                 catLabel: '정부지원금', crumb: '기초연금 수급 조건',       widget: 'basicPension', blurb: '소득인정액 기준과 감액 구조' },
  { n: 8,  file: '8-4대보험료.html',         cat: 'tax',        slug: 'four-major-insurance-guide',       calc: '/tax/four-major-insurance/',                 catLabel: '세금',      crumb: '4대보험 요율',             widget: 'fourIns', blurb: '국민연금 4.75% · 건보 3.595% (2026년)' },
  { n: 9,  file: '9-연차수당.html',          cat: 'law',        slug: 'annual-leave-allowance-guide',     calc: '/law/annual-leave-allowance/',               catLabel: '법률',      crumb: '연차수당 계산',            widget: 'annualLeave', blurb: '연차 일수·통상임금·소멸시효 3년' },
  { n: 10, file: '10-취득세.html',           cat: 'realestate', slug: 'acquisition-tax-guide',            calc: '/realestate/acquisition-tax/',               catLabel: '부동산',    crumb: '취득세 계산',              widget: 'acqTax', blurb: '6억·9억 경계와 다주택 중과 8%·12%' },
  { n: 11, file: '11-자동차세.html',         cat: 'insurance',  slug: 'auto-tax-guide',                   calc: '/insurance/auto-tax/',                       catLabel: '보험·자동차', crumb: '자동차세 연납',          widget: 'autoTax', blurb: '배기량별 세율 · 1월 연납 5% 공제' },
  { n: 12, file: '12-육아휴직급여.html',     cat: 'government', slug: 'parental-leave-pay-guide',         calc: '/government/parental-leave-pay/',            catLabel: '정부지원금', crumb: '육아휴직 급여',            widget: 'parental', blurb: '250만→200만→160만 · 사후지급금 폐지' },
  { n: 13, file: '13-종합소득세.html',       cat: 'tax',        slug: 'comprehensive-income-tax-guide',   calc: '/tax/comprehensive-income-tax/',             catLabel: '세금',      crumb: '종합소득세 계산',          widget: 'compIncome', blurb: '세율 8구간과 누진공제 · 5월 신고' },
  { n: 14, file: '14-기초생활수급.html',     cat: 'government', slug: 'basic-livelihood-eligibility-guide', calc: '/government/basic-livelihood-eligibility/', catLabel: '정부지원금', crumb: '기초생활수급 조건',        widget: 'basicLivelihood', blurb: '생계 32%·의료 40%·주거 48%·교육 50%' },
  { n: 15, file: '15-재산세.html',           cat: 'realestate', slug: 'property-tax-guide',               calc: '/realestate/property-tax/',                  catLabel: '부동산',    crumb: '재산세 계산',              widget: 'propertyTax', blurb: '공정시장가액비율 43~45% vs 60%' },
];

const A = Object.fromEntries(ARTICLES.map((a) => [a.widget, `/${a.cat}/${a.slug}/`]));

// ── 링크 치환표 ───────────────────────────────────────────────────────────
// 미리보기에서 쓴 임시 허브 URL → 실제 라우트.
// 긴 경로를 먼저 치환해야 접두사가 잘못 먹지 않는다.
const LINK_MAP = [
  // 존재하지 않는 하위 페이지 → 가장 가까운 실제 페이지
  ['/severance-pay/calculation/',      '/law/severance-pay/'],
  ['/severance-pay/tax/',              '/tax/retirement-income-tax/'],
  ['/severance-pay/scope/',            A.severance],
  ['/severance-pay/irp/',              '/pension/irp-tax-credit/'],
  ['/severance-pay/payday/',           A.severance],
  ['/severance-pay/unpaid/',           '/law/unpaid-wages/'],
  ['/salary-net-pay/four-insurance/',  A.fourIns],
  ['/salary-net-pay/year-end-tax/',    A.compIncome],
  // 임시 허브 URL → 새 글
  ['/severance-pay/',   A.severance],
  ['/salary-net-pay/',  A.salary],
  ['/transfer-tax/',    A.transfer],
  ['/dsr/',             A.dsr],
  ['/national-pension/', A.earlyPension],
  ['/four-insurance/',  A.fourIns],
  ['/basic-pension/',   A.basicPension],
  ['/annual-leave/',    A.annualLeave],
  ['/acquisition-tax/', A.acqTax],
  ['/income-tax/',      A.compIncome],
  ['/auto-tax/',        A.autoTax],
  ['/parental-leave/',  A.parental],
  ['/basic-livelihood/', A.basicLivelihood],
  ['/property-tax/',    A.propertyTax],
  ['/median-income/',   '/government/median-income/'],
];

const esc = (s) => s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
const stripTags = (s) =>
  s.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
   .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();

function rewriteLinks(html) {
  let out = prefixClassAttrs(html);
  for (const [from, to] of LINK_MAP) {
    // href="..." 의 값이 정확히 from 인 경우만 교체 (부분 일치 방지)
    out = out.split(`href="${from}"`).join(`href="${to}"`);
  }
  return out;
}

function convert(a) {
  const raw = fs.readFileSync(path.join(SRC, a.file), 'utf8');

  const title = /<title>([\s\S]*?)<\/title>/.exec(raw)?.[1]?.trim();
  const desc = /<meta name="description" content="([\s\S]*?)">/.exec(raw)?.[1]?.trim();
  const mainRaw = /<main>([\s\S]*?)<\/main>/.exec(raw)?.[1];
  if (!title || !desc || !mainRaw) throw new Error(`${a.file}: title/description/main 추출 실패`);

  // 위젯 블록을 본문에서 떼어낸다 (스크립트는 ArticleWidget 레지스트리에 이미 이식됨)
  const wgRe = /<div class="wg" id="wg1">[\s\S]*?<\/div>\s*(?=<div class="mh")/;
  const wgMatch = wgRe.exec(mainRaw);
  if (!wgMatch) throw new Error(`${a.file}: 위젯 블록 추출 실패`);
  const widgetHtml = wgMatch[0].trim();

  // 본문에서 자체 헤더/빵부스러기는 제거 (페이지 컴포넌트가 담당)
  let body = mainRaw.replace(wgRe, '<!--WIDGET-->');
  body = body.replace(/<div class="crumb">[\s\S]*?<\/div>\s*/, '');

  const [before, after] = body.split('<!--WIDGET-->');
  if (after === undefined) throw new Error(`${a.file}: 위젯 자리 분할 실패`);

  // FAQ 구조화 데이터
  const faqs = [...raw.matchAll(
    /<details class="acc"[^>]*><summary>([\s\S]*?)<\/summary>\s*<div class="ab">([\s\S]*?)<\/div><\/details>/g
  )].map((m) => ({ q: stripTags(m[1]), a: stripTags(m[2]) }));
  if (faqs.length < 5) throw new Error(`${a.file}: FAQ ${faqs.length}개 — 5개 미만`);

  const asideRaw = /<aside>([\s\S]*?)<\/aside>/.exec(raw)?.[1] ?? '';

  return {
    title, desc,
    htmlBefore: rewriteLinks(before.trim()),
    htmlAfter: rewriteLinks(after.trim()),
    widgetHtml: rewriteLinks(widgetHtml),
    asideHtml: rewriteLinks(asideRaw.trim()),
    faqs,
  };
}

function dataFile(a, c) {
  const url = `https://moneydoc.kr/${a.cat}/${a.slug}/`;
  return `// 자동 생성: scripts/convert-previews.mjs — 직접 수정하지 말 것
// 원본: public/_preview/${a.file}
export const meta = {
  title: ${JSON.stringify(c.title)},
  description: ${JSON.stringify(c.desc)},
  datePublished: "2026-09-01",
  dateModified: "2026-09-01",
  url: ${JSON.stringify(url)},
};

export const widgetKey = ${JSON.stringify(a.widget)};

export const widgetHtml = \`${esc(c.widgetHtml)}\`;

export const htmlBefore = \`${esc(c.htmlBefore)}\`;

export const htmlAfter = \`${esc(c.htmlAfter)}\`;

export const asideHtml = \`${esc(c.asideHtml)}\`;

export const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: ${JSON.stringify(
    c.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
    null,
    2
  ).split('\n').join('\n  ')},
};
`;
}

function pageFile(a, c) {
  const url = `https://moneydoc.kr/${a.cat}/${a.slug}/`;
  const imp = `@/data/articles/${a.cat}/${a.slug}`;
  return `import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArticleWidget } from "@/components/ArticleWidget";
import { meta, faqLd, widgetKey, widgetHtml, htmlBefore, htmlAfter, asideHtml } from "${imp}";
import "@/components/article.css";

const PAGE_URL = ${JSON.stringify(url)};

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: "/${a.cat}/${a.slug}/" },
  openGraph: { type: "article", title: meta.title, description: meta.description, url: PAGE_URL },
};

const articleLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: meta.title,
  description: meta.description,
  inLanguage: "ko",
  datePublished: meta.datePublished,
  dateModified: meta.dateModified,
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  author: { "@type": "Organization", name: "MoneyDoc 편집팀" },
  publisher: { "@type": "Organization", name: "MoneyDoc", url: "https://moneydoc.kr/" },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "홈", item: "https://moneydoc.kr/" },
    { "@type": "ListItem", position: 2, name: ${JSON.stringify(a.catLabel)}, item: "https://moneydoc.kr/${a.cat}/" },
    { "@type": "ListItem", position: 3, name: ${JSON.stringify(a.crumb)}, item: PAGE_URL },
  ],
};

export default function Page() {
  return (
    <>
      <Header active="${a.cat}" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <div className="md-article">
        <main>
          <div className="crumb">
            <a href="/">홈</a> › <a href="/${a.cat}/">${a.catLabel}</a> › ${a.crumb}
          </div>
          <div dangerouslySetInnerHTML={{ __html: htmlBefore }} />
          <ArticleWidget widgetKey={widgetKey} html={widgetHtml} />
          <div dangerouslySetInnerHTML={{ __html: htmlAfter }} />
        </main>
        <aside dangerouslySetInnerHTML={{ __html: asideHtml }} />
      </div>
      <Footer />
    </>
  );
}
`;
}

let ok = 0;
for (const a of ARTICLES) {
  const c = convert(a);
  const dataPath = path.join(ROOT, 'moneydoc-data/articles', a.cat, `${a.slug}.ts`);
  const pagePath = path.join(ROOT, 'app', a.cat, a.slug, 'page.tsx');
  fs.mkdirSync(path.dirname(dataPath), { recursive: true });
  fs.mkdirSync(path.dirname(pagePath), { recursive: true });
  fs.writeFileSync(dataPath, dataFile(a, c), 'utf8');
  fs.writeFileSync(pagePath, pageFile(a, c), 'utf8');
  console.log(
    `✅ ${String(a.n).padStart(2)} /${a.cat}/${a.slug}/  본문 ${(c.htmlBefore.length + c.htmlAfter.length).toLocaleString()}자 · FAQ ${c.faqs.length}`
  );
  ok++;
}
console.log(`\n${ok}/${ARTICLES.length} 변환 완료`);
