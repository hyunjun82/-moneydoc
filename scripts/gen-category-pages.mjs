#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CALC_DIR = path.join(ROOT, "moneydoc-data", "calculators");
const APP_DIR = path.join(ROOT, "app");

const CATEGORY_NAMES = {
  savings: "저축",
  loan: "대출",
  realestate: "부동산",
  tax: "세금",
  insurance: "보험",
  pension: "연금",
  law: "법률",
  government: "정부지원금",
  simulator: "시뮬레이션",
  util: "유틸",
};

const CATEGORY_DESCS = {
  savings: "예금·적금·청년도약·ISA — 한국은행 표준 산식 기반 저축 계산기",
  loan: "DSR·DTI·LTV·중도상환수수료 — 금감원 가이드라인 기반 대출 한도 계산",
  realestate: "양도세·취득세·중개수수료·종부세 — 지방세법·소득세법 §89 기반",
  tax: "연봉 실수령·종합소득세·연말정산 — 국세청 2026 간이세액표 + 누진세율",
  insurance: "자동차·실손·건강·생명보험 — 손보협회·금감원 표준약관 기반",
  pension: "국민연금·퇴직연금·IRP·연금저축 — 국민연금공단·소득세법 §59-3",
  law: "양육비·위자료·법정상속분·퇴직금 — 서울가정법원 산정기준표·민법 §1009",
  government: "기초연금·실업급여·육아휴직·근로/자녀장려금 — 보건복지부·고용보험법",
  simulator: "노후자금·매매vs전세·결혼비용·자녀 학자금 시뮬레이션",
  util: "퍼센트·나이·날짜·할부·현금서비스 — 일상 계산 도구",
};

const escape = (s) => String(s ?? "").replace(/[`$\\]/g, (m) => "\\" + m);

let created = 0;

for (const cat of Object.keys(CATEGORY_NAMES).sort()) {
  const catDir = path.join(CALC_DIR, cat);
  if (!fs.existsSync(catDir) || !fs.statSync(catDir).isDirectory()) continue;

  const calcs = [];
  for (const file of fs.readdirSync(catDir).sort()) {
    if (!file.endsWith(".json")) continue;
    const slug = file.replace(".json", "");
    const spec = JSON.parse(fs.readFileSync(path.join(catDir, file), "utf-8"));
    calcs.push({ slug, title: spec.title, subtitle: spec.subtitle });
  }

  const pageDir = path.join(APP_DIR, cat);
  const pagePath = path.join(pageDir, "page.tsx");
  if (fs.existsSync(pagePath)) continue;
  fs.mkdirSync(pageDir, { recursive: true });

  const name = CATEGORY_NAMES[cat];
  const desc = CATEGORY_DESCS[cat];

  const items = calcs
    .map(
      (c) =>
        `        <a href="/${cat}/${c.slug}/" className="cat" style={{ textDecoration: "none" }}>
          <div className="cat-body">
            <h3 className="cat-name">${escape(c.title)}</h3>
            <p className="cat-desc">${escape(c.subtitle)}</p>
            <span className="cat-count">정부 공식 산식</span>
          </div>
        </a>`
    )
    .join("\n");

  const content = `import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "${escape(name)} 계산기 — ${calcs.length}종 | MoneyDoc",
  description: "${escape(desc)}",
  alternates: { canonical: "/${cat}/" },
};

export default function Page() {
  return (
    <>
      <Header active="${cat}" />

      <nav className="crumbs">
        <a href="/">홈</a>
        <span className="sep">›</span>
        <span>${escape(name)}</span>
      </nav>

      <header className="page-head">
        <h1 className="page-title">${escape(name)} 계산기</h1>
        <p className="page-sub">${escape(desc)}</p>
      </header>

      <section className="section">
        <div className="cats">
${items}
        </div>
      </section>

      <Footer />
    </>
  );
}
`;

  fs.writeFileSync(pagePath, content, "utf-8");
  created++;
}

console.log(`Created ${created} category pages`);
