#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SITE = "https://moneydoc.kr";
const CALC_DIR = path.join(ROOT, "moneydoc-data", "calculators");
const PUBLIC_DIR = path.join(ROOT, "public");

const today = new Date().toISOString().split("T")[0];
const urls = [`${SITE}/`];

// 정적 페이지 (About / Contact / Privacy / Terms / Calculators 인덱스)
const STATIC_PAGES = ["about", "contact", "privacy", "terms", "calculators"];
for (const p of STATIC_PAGES) urls.push(`${SITE}/${p}/`);

for (const cat of fs.readdirSync(CALC_DIR).sort()) {
  const catDir = path.join(CALC_DIR, cat);
  if (!fs.statSync(catDir).isDirectory()) continue;
  urls.push(`${SITE}/${cat}/`);
  for (const file of fs.readdirSync(catDir).sort()) {
    if (!file.endsWith(".json")) continue;
    const slug = file.replace(".json", "");
    urls.push(`${SITE}/${cat}/${slug}/`);
  }
}

// 콘텐츠 글 가이드 (moneydoc-data/articles/{cat}/{slug}.ts → /{cat}/{slug}-guide/)
const ARTICLES_DIR = path.join(ROOT, "moneydoc-data", "articles");
if (fs.existsSync(ARTICLES_DIR)) {
  for (const cat of fs.readdirSync(ARTICLES_DIR).sort()) {
    const catDir = path.join(ARTICLES_DIR, cat);
    if (!fs.statSync(catDir).isDirectory()) continue;
    for (const file of fs.readdirSync(catDir).sort()) {
      if (!file.endsWith(".ts")) continue;
      const slug = file.replace(/\.ts$/, "");
      urls.push(`${SITE}/${cat}/${slug}-guide/`);
    }
  }
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url><loc>${u}</loc><lastmod>${today}</lastmod><changefreq>${
        u === `${SITE}/` ? "weekly" : "monthly"
      }</changefreq><priority>${u === `${SITE}/` ? "1.0" : "0.7"}</priority></url>`
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

console.log(`Generated sitemap.xml (${urls.length} URLs) + robots.txt`);
