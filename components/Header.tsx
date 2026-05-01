import { Logo } from "./Logo";

const NAV_ITEMS = [
  { slug: "savings", label: "저축" },
  { slug: "loan", label: "대출" },
  { slug: "realestate", label: "부동산" },
  { slug: "tax", label: "세금" },
  { slug: "insurance", label: "보험" },
  { slug: "pension", label: "연금" },
  { slug: "law", label: "법률" },
  { slug: "government", label: "정부지원금" },
];

export function Header({ active }: { active?: string }) {
  return (
    <header className="header">
      <div className="header-inner">
        <Logo />
        <nav className="nav">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.slug}
              href={`/${item.slug}/`}
              className={active === item.slug ? "active" : ""}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
