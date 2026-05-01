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
`;
fs.writeFileSync(path.join(PUBLIC_DIR, "robots.txt"), robots, "utf-8");

console.log(`Generated sitemap.xml (${urls.length} URLs) + robots.txt`);
