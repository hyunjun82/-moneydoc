// 카테고리 페이지·홈에서 쓸 가이드 글 목록을 만든다.
// 실행: node scripts/gen-article-index.mjs
import fs from 'node:fs';
import path from 'node:path';
import { ARTICLES } from './convert-previews.mjs';

const ROOT = process.cwd();

// 이전부터 있던 글 5편 (public/_preview 에서 생성된 것이 아니라 손으로 쓴 글)
const EXISTING = [
  { cat: 'government', catLabel: '정부지원금', href: '/government/unemployment-benefit-guide/',      title: '실업급여 조건·금액·신청방법 총정리',      blurb: '2026년 상한 68,100원 · 하한 66,048원' },
  { cat: 'government', catLabel: '정부지원금', href: '/government/earned-income-tax-credit-guide/',  title: '근로장려금 지급일 2026, 8월 27일 지급',    blurb: '단독 165만 · 홑벌이 285만 · 맞벌이 330만' },
  { cat: 'government', catLabel: '정부지원금', href: '/government/earned-income-tax-credit-check/',  title: '근로장려금 지급액 조회 방법',              blurb: '홈택스·손택스 · ARS 1544-9944' },
  { cat: 'government', catLabel: '정부지원금', href: '/government/youth-future-savings-guide/',      title: '청년미래적금 계좌개설·가입조건·수령액',    blurb: '정부기여금 6% vs 12% 비교' },
  { cat: 'government', catLabel: '정부지원금', href: '/government/youth-future-savings-soldier/',    title: '군인도 청년미래적금 가입되나요?',          blurb: '군장병급여만 있어도 가입 가능' },
];

const rows = [
  ...ARTICLES.map((a) => {
    const data = fs.readFileSync(
      path.join(ROOT, 'moneydoc-data/articles', a.cat, `${a.slug}.ts`), 'utf8'
    );
    const title = /title: "((?:[^"\\]|\\.)*)"/.exec(data)?.[1];
    if (!title) throw new Error(`${a.slug}: title 추출 실패`);
    return {
      cat: a.cat, catLabel: a.catLabel,
      href: `/${a.cat}/${a.slug}/`,
      title: JSON.parse(`"${title}"`),
      blurb: a.blurb,
    };
  }),
  ...EXISTING,
];

const out = `// 자동 생성: scripts/gen-article-index.mjs — 직접 수정하지 말 것
export type GuideLink = { cat: string; catLabel: string; href: string; title: string; blurb: string };

export const GUIDES: GuideLink[] = ${JSON.stringify(rows, null, 2)};

export const guidesFor = (cat: string) => GUIDES.filter((g) => g.cat === cat);
`;

fs.writeFileSync(path.join(ROOT, 'moneydoc-data/articles/index.ts'), out, 'utf8');

const byCat = rows.reduce((m, r) => ((m[r.cat] = (m[r.cat] || 0) + 1), m), {});
console.log(`moneydoc-data/articles/index.ts 생성 — 글 ${rows.length}편`);
console.log(Object.entries(byCat).map(([c, n]) => `  ${c}: ${n}`).join('\n'));
