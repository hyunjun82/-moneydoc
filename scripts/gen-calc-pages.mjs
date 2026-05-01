#!/usr/bin/env node
/**
 * 모든 계산기 JSON에 대해 app/[cat]/[slug]/page.tsx 자동 생성.
 * - 기존 page.tsx 있으면 SKIP (커스텀 UI 보호)
 * - GenericCalculator + CalculatorShell wrapper만 생성
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CALC_DIR = path.join(ROOT, "moneydoc-data", "calculators");
const APP_DIR = path.join(ROOT, "app");

const escape = (s) => String(s ?? "").replace(/[`$\\]/g, (m) => "\\" + m);
const trim = (s, n) => (s.length > n ? s.slice(0, n - 1) + "…" : s);

let created = 0;
let skipped = 0;
const indexEntries = [];

for (const cat of fs.readdirSync(CALC_DIR).sort()) {
  const catDir = path.join(CALC_DIR, cat);
  if (!fs.statSync(catDir).isDirectory()) continue;

  for (const file of fs.readdirSync(catDir).sort()) {
    if (!file.endsWith(".json")) continue;
    const slug = file.replace(".json", "");
    const jsonRel = `@/data/calculators/${cat}/${slug}.json`;
    const spec = JSON.parse(fs.readFileSync(path.join(catDir, file), "utf-8"));

    indexEntries.push({ slug, category: cat, jsonRel, varName: slug.replace(/-(.)/g, (_, c) => c.toUpperCase()) });

    const pageDir = path.join(APP_DIR, cat, slug);
    const pagePath = path.join(pageDir, "page.tsx");

    if (fs.existsSync(pagePath)) {
      skipped++;
      continue;
    }

    fs.mkdirSync(pageDir, { recursive: true });

    const title = spec.title || slug;
    const subtitle = spec.subtitle || "";
    const desc = trim(spec.guide?.howToUse || subtitle || `${title} 정부 공식 산식 기반 자동 계산.`, 155);
    const agency = spec.source?.primary?.agency || "정부 공식 산식";
    const year = spec.year || 2026;
    const sourceBadge = `${agency} ${year} · 검증 완료`;

    const content = `import type { Metadata } from "next";
import { CalculatorShell } from "@/components/CalculatorShell";
import { GenericCalculator } from "@/components/GenericCalculator";
import spec from "${jsonRel}";

export const metadata: Metadata = {
  title: "${escape(title)} — ${escape(year)}년 기준",
  description: "${escape(desc)}",
  alternates: { canonical: "/${cat}/${slug}/" },
};

export default function Page() {
  return (
    <CalculatorShell
      spec={spec}
      sourceBadge="${escape(sourceBadge)}"
    >
      <GenericCalculator spec={spec} />
    </CalculatorShell>
  );
}
`;

    fs.writeFileSync(pagePath, content, "utf-8");
    created++;
  }
}

// calculators-index.ts 재생성
const indexImports = indexEntries
  .map((e) => `import ${e.varName} from "${e.jsonRel}";`)
  .join("\n");
const indexArray = indexEntries.map((e) => e.varName).join(", ");

const indexContent = `${indexImports}

const ALL_SPECS = [${indexArray}] as const;

export type CategorySlug =
  | "savings"
  | "loan"
  | "realestate"
  | "tax"
  | "insurance"
  | "pension"
  | "law"
  | "government"
  | "simulator"
  | "util";

export const CATEGORIES: Record<CategorySlug, { slug: CategorySlug; name: string; href: string }> = {
  savings: { slug: "savings", name: "저축", href: "/savings/" },
  loan: { slug: "loan", name: "대출", href: "/loan/" },
  realestate: { slug: "realestate", name: "부동산", href: "/realestate/" },
  tax: { slug: "tax", name: "세금", href: "/tax/" },
  insurance: { slug: "insurance", name: "보험", href: "/insurance/" },
  pension: { slug: "pension", name: "연금", href: "/pension/" },
  law: { slug: "law", name: "법률", href: "/law/" },
  government: { slug: "government", name: "정부지원금", href: "/government/" },
  simulator: { slug: "simulator", name: "시뮬레이션", href: "/simulator/" },
  util: { slug: "util", name: "유틸", href: "/util/" },
};

export type CalcMeta = {
  slug: string;
  category: CategorySlug;
  categoryName: string;
  title: string;
  subtitle: string;
  href: string;
};

export const CALCULATORS_INDEX: Record<string, CalcMeta> = Object.fromEntries(
  ALL_SPECS.map((spec) => [
    spec.slug,
    {
      slug: spec.slug,
      category: spec.category as CategorySlug,
      categoryName: CATEGORIES[spec.category as CategorySlug]?.name ?? spec.category,
      title: spec.title,
      subtitle: spec.subtitle,
      href: \`/\${spec.category}/\${spec.slug}/\`,
    },
  ])
);

export const GUIDE_TABLE_TITLES: Record<string, string> = {
  insuranceRates2026: "4대보험 요율 (2026년 기준)",
};
`;

fs.writeFileSync(path.join(ROOT, "lib", "calculators-index.ts"), indexContent, "utf-8");

console.log(`Generated: ${created} page.tsx, skipped: ${skipped}, total calcs: ${indexEntries.length}`);
console.log(`Updated: lib/calculators-index.ts (${indexEntries.length} entries)`);
