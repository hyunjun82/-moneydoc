import salaryNetPay from "@/data/calculators/tax/salary-net-pay.json";
import compIncomeTax from "@/data/calculators/tax/comprehensive-income-tax.json";

const ALL_SPECS = [salaryNetPay, compIncomeTax] as const;

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
      href: `/${spec.category}/${spec.slug}/`,
    },
  ])
);

// 가이드 아코디언 테이블 키 → 표시명 매핑
export const GUIDE_TABLE_TITLES: Record<string, string> = {
  insuranceRates2026: "4대보험 요율 (2026년 기준)",
};
