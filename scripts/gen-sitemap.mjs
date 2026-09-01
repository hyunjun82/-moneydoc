#!/usr/bin/env node
/**
 * sitemap.xml + robots.txt 생성
 *
 * URL은 데이터 파일이 아니라 **실제 라우트(app/ ** /page.tsx)**에서 뽑는다.
 * 데이터에서 추정하면 페이지가 없는 slug(404)나 존재하지 않는 -guide 경로가 섞인다.
 *  - redirect()만 하는 페이지는 제외
 *  - 콘텐츠 글(@/data/articles 를 import)은 priority 0.8
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SITE = "https://moneydoc.kr";
const APP_DIR = path.join(ROOT, "app");
const PUBLIC_DIR = path.join(ROOT, "public");

const today = new Date().toISOString().split("T")[0];

/** app 디렉터리를 훑어 page.tsx 라우트를 모은다 */
function collectRoutes(dir, segments = []) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    if (entry.isDirectory()) {
      // 라우트 그룹 (group) 이나 동적 세그먼트 [slug] 는 정적 sitemap 대상 아님
      if (entry.name.startsWith("(") || entry.name.startsWith("[") || entry.name.startsWith("_")) continue;
      out.push(...collectRoutes(path.join(dir, entry.name), [...segments, entry.name]));
    } else if (entry.name === "page.tsx") {
      const src = fs.readFileSync(path.join(dir, entry.name), "utf-8");
      if (/\bredirect\s*\(/.test(src)) continue; // 리다이렉트 전용 페이지 제외
      const isArticle = /@\/data\/articles\//.test(src);
      out.push({ route: segments.length ? `/${segments.join("/")}/` : "/", isArticle });
    }
  }
  return out;
}

const routes = collectRoutes(APP_DIR);

const entries = routes.map(({ route, isArticle }) => {
  const isHome = route === "/";
  return {
    loc: `${SITE}${route}`,
    changefreq: isHome ? "weekly" : "monthly",
    priority: isHome ? "1.0" : isArticle ? "0.8" : "0.7",
  };
});

// 홈 먼저, 나머지는 경로 순
entries.sort((a, b) => (a.loc === `${SITE}/` ? -1 : b.loc === `${SITE}/` ? 1 : a.loc.localeCompare(b.loc)));

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) =>
      `  <url><loc>${e.loc}</loc><lastmod>${today}</lastmod><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`
  )
  .join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap.xml"), xml, "utf-8");

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml

#DaumWebMasterTool:4494d151f115abc50c65ef69a5e10b872a178d6132659c44575b90485a8c9b73:wmGoVXOE53jpE6rzXrmr2w==
`;
fs.writeFileSync(path.join(PUBLIC_DIR, "robots.txt"), robots, "utf-8");

const articleCount = routes.filter((r) => r.isArticle).length;
console.log(`Generated sitemap.xml (${entries.length} URLs, 콘텐츠 글 ${articleCount}개 priority 0.8) + robots.txt`);
