export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--color-cream-100)]">
      <header className="border-b border-[var(--color-cream-200)] bg-[var(--color-cream-50)]">
        <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
          <h1 className="text-xl font-bold text-[var(--color-teal-deep)]">
            머니닥
          </h1>
          <nav className="flex gap-6 text-sm text-[var(--color-muted)]">
            <a href="/calculators/">계산기</a>
            <a href="/category/savings/">저축</a>
            <a href="/category/loan/">대출</a>
            <a href="/category/realestate/">부동산</a>
            <a href="/category/tax/">세금</a>
            <a href="/category/insurance/">보험</a>
            <a href="/category/pension/">연금</a>
            <a href="/category/law/">법률</a>
            <a href="/category/government/">정부지원금</a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <h2 className="text-4xl font-bold text-[var(--color-teal-deep)] tracking-tight">
          돈 계산, 정확하게.
        </h2>
        <p className="mt-4 text-lg text-[var(--color-muted)]">
          한국 금융·세금·부동산·연금·법률 계산기 102종.<br />
          정부 공식 산식 기반, 오차 없이.
        </p>
        <div className="mt-10 inline-flex items-center gap-2 rounded-full bg-[var(--color-teal-deep)] px-6 py-3 text-[var(--color-cream-50)] text-sm font-medium">
          <span>준비 중</span>
        </div>
      </section>
    </main>
  );
}
