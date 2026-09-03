/* 계산기별 아이콘 레지스트리 (66종). 24×24 · 선 1.9 · 두 톤(흰 면 + 현재색 선).
   색은 부모의 color(--ink) 를 따르므로 카테고리 색이 자동으로 입혀진다. */
import type { ReactNode } from "react";

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.9, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const W = "#fff";
const I = (children: ReactNode) => <svg width="30" height="30" viewBox="0 0 24 24" {...S}>{children}</svg>;

export const CALC_ICON: Record<string, ReactNode> = {
  /* ── 세금 ── */
  "salary-net-pay": I(<><rect x="3" y="5" width="18" height="14" rx="2.5" fill={W} /><path d="M3 9.5h18" /><path d="M7 14h4" /><circle cx="16.5" cy="14.5" r="1.6" /></>),
  "comprehensive-income-tax": I(<><path d="M5 3.5h10l4 4V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1z" fill={W} /><path d="M15 3.5v4h4" /><path d="M8 11l8 6M16 11l-8 6" /></>),
  "four-major-insurance": I(<><rect x="3" y="4" width="8" height="7" rx="1.5" fill={W} /><rect x="13" y="4" width="8" height="7" rx="1.5" fill={W} /><rect x="3" y="13" width="8" height="7" rx="1.5" fill={W} /><rect x="13" y="13" width="8" height="7" rx="1.5" fill={W} /></>),
  "gift-tax": I(<><rect x="3.5" y="9" width="17" height="11" rx="2" fill={W} /><path d="M3.5 13h17M12 9v11" /><path d="M12 9c-2-4-6-3-5-1s5 1 5 1zm0 0c2-4 6-3 5-1s-5 1-5 1z" fill={W} /></>),
  "inheritance-tax": I(<><path d="M12 3.5 4 8v12h16V8z" fill={W} /><path d="M12 8v6" /><path d="M9 11h6" /><path d="M9.5 20v-4h5v4" /></>),
  "retirement-income-tax": I(<><path d="M4 18V9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9" fill={W} /><path d="M2.5 18h19" /><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" /><path d="M12 11v4M10 13h4" /></>),
  "child-tax-credit": I(<><circle cx="12" cy="8" r="3.5" fill={W} /><path d="M5 20c0-4 3-6.5 7-6.5s7 2.5 7 6.5" fill={W} /><path d="M17.5 5.5 19 7l2.5-2.5" /></>),
  "crypto-transfer-tax": I(<><circle cx="12" cy="12" r="8.5" fill={W} /><path d="M9.5 8h4a2 2 0 0 1 0 4h-4zm0 4h4.5a2 2 0 0 1 0 4H9.5z" /><path d="M11 6.5V8M11 16v1.5" /></>),
  "daily-wage-tax": I(<><rect x="3.5" y="5" width="17" height="15" rx="2" fill={W} /><path d="M3.5 9.5h17M8 3v4M16 3v4" /><path d="M9 14h6" /></>),
  "freelancer-tax": I(<><rect x="3" y="6" width="18" height="12" rx="2" fill={W} /><path d="M3 10h18" /><path d="M7 14h2M11 14h6" /></>),
  "other-income-tax": I(<><path d="M12 3.5 14.6 9l6 .7-4.5 4.1 1.3 5.9L12 16.7 6.6 19.7l1.3-5.9L3.4 9.7l6-.7z" fill={W} /></>),
  "stock-transfer-tax": I(<><path d="M3.5 19h17" /><path d="M4 15l4-5 4 3 4-6 4 3" fill="none" /><circle cx="20" cy="10" r="1.6" fill={W} /></>),
  "vat-general": I(<><path d="M6 3.5h12v17l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5-2 1.5z" fill={W} /><path d="M9 8h6M9 11.5h6M9 15h3" /></>),
  "vat-simplified": I(<><path d="M6 3.5h12v17l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5-2 1.5z" fill={W} /><path d="M9 9h6M9 12.5h4" /></>),
  "business-income-tax-simple": I(<><path d="M4 9.5h16v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5z" fill={W} /><path d="M4 9.5 6 5h12l2 4.5" /><path d="M10 13h4" /></>),
  /* ── 부동산 ── */
  "transfer-tax": I(<><path d="M3.5 10.5 12 4l8.5 6.5V19a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19z" fill={W} /><path d="M9 15h6M13 12.5l2.5 2.5-2.5 2.5" /></>),
  "acquisition-tax": I(<><path d="M3.5 10.5 12 4l8.5 6.5V19a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19z" fill={W} /><path d="M9 14.5l2 2 4-4.5" /></>),
  "property-tax": I(<><path d="M3.5 10.5 12 4l8.5 6.5V19a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19z" fill={W} /><path d="M9 12.5v5M12 11v6.5M15 13.5v4" /></>),
  "comprehensive-real-estate-tax": I(<><path d="M2.5 20.5V11l5-4 5 4v9.5" fill={W} /><path d="M12.5 20.5V9l4.5-3.5 4.5 3.5v11.5" fill={W} /><path d="M2 20.5h20" /></>),
  "holding-tax-total": I(<><path d="M4 20V10l8-6 8 6v10" fill={W} /><path d="M3 20h18" /><rect x="9.5" y="13" width="5" height="7" rx="1" /><path d="M12 8.5v1" /></>),
  "brokerage-fee": I(<><path d="M4 20.5v-10l5-4 5 4v10" fill={W} /><path d="M14 12.5h6v8" /><path d="M3 20.5h18" /><path d="M7 14.5h2" /></>),
  "housing-subscription-score": I(<><path d="M4 20V9l8-5.5L20 9v11" fill={W} /><path d="M3 20h18" /><path d="M12 10l1.1 2.3 2.5.3-1.8 1.7.5 2.5-2.3-1.2-2.3 1.2.5-2.5-1.8-1.7 2.5-.3z" /></>),
  "jeonse-monthly-conversion": I(<><rect x="3.5" y="6" width="17" height="13" rx="2" fill={W} /><path d="M8 10h8M8 15h8" /><path d="M14 8l2 2-2 2M10 13l-2 2 2 2" /></>),
  "real-estate-roi": I(<><path d="M3.5 20h17" /><path d="M5 16l4-4 3 2.5 6-6.5" /><path d="M14.5 8H18v3.5" /></>),
  "rental-yield": I(<><path d="M4 20.5v-9l8-6 8 6v9.5" fill={W} /><path d="M3 20.5h18" /><path d="M12 11.5v6M10.2 13.3h2.6a1.3 1.3 0 0 1 0 2.6h-1.6" /></>),
  /* ── 대출 ── */
  "loan-amortization": I(<><rect x="3.5" y="5" width="17" height="14" rx="2" fill={W} /><path d="M3.5 9.5h17" /><path d="M7 13.5h3M7 16h5" /></>),
  "dsr-limit": I(<><path d="M4 16a8 8 0 0 1 16 0" fill={W} /><path d="M12 16l4-5" /><circle cx="12" cy="16" r="1.4" fill={W} /><path d="M3 19.5h18" /></>),
  "dti-limit": I(<><circle cx="12" cy="12" r="8.5" fill={W} /><path d="M12 3.5V12l6 3.5" /></>),
  "ltv-limit": I(<><path d="M3.5 10.5 12 4l8.5 6.5V19a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19z" fill={W} /><path d="M8 16.5h8" /><path d="M8 13h5" /></>),
  "mortgage-loan-limit": I(<><path d="M3.5 10.5 12 4l8.5 6.5V19a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19z" fill={W} /><circle cx="12" cy="14" r="2.5" /><path d="M12 11.5v-1M12 17.5v-1" /></>),
  "jeonse-loan": I(<><path d="M4 20V10l8-6 8 6v10" fill={W} /><path d="M3 20h18" /><path d="M9 20v-5h6v5" /><path d="M12 8v2" /></>),
  "credit-loan": I(<><rect x="3" y="6" width="18" height="12" rx="2.5" fill={W} /><path d="M3 10h18" /><rect x="6" y="13" width="4" height="2.5" rx=".6" /></>),
  "loan-refinance": I(<><path d="M20 12a8 8 0 0 1-13.5 5.8" fill="none" /><path d="M4 12a8 8 0 0 1 13.5-5.8" fill="none" /><path d="M17.5 3v3.5H14M6.5 21v-3.5H10" /></>),
  "prepayment-fee": I(<><circle cx="12" cy="12" r="8.5" fill={W} /><path d="M12 7v10M9.5 9.5h3.7a1.9 1.9 0 0 1 0 3.8H9.5m0 0h4.2a1.9 1.9 0 0 1 0 3.8H9.5" /></>),
  /* ── 저축 ── */
  "installment-savings": I(<><path d="M5 19V9a1.5 1.5 0 0 1 1.5-1.5h11A1.5 1.5 0 0 1 19 9v10" fill={W} /><path d="M3.5 19h17" /><path d="M9 7.5v-2a3 3 0 0 1 6 0v2" /><path d="M12 11v5" /></>),
  "fixed-deposit": I(<><ellipse cx="12" cy="6.5" rx="7" ry="2.5" fill={W} /><path d="M5 6.5v11c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-11" fill={W} /><path d="M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" /></>),
  "free-savings": I(<><path d="M4 12.5c0-3.5 3.5-6 8-6s8 2.5 8 6-3.5 6-8 6c-1 0-2-.1-2.8-.4L6 19.5l.8-3.2C5 15.2 4 14 4 12.5z" fill={W} /><path d="M9 12.5h6" /></>),
  "isa-tax-saving": I(<><rect x="3.5" y="4.5" width="17" height="15" rx="2.5" fill={W} /><path d="M7.5 15l3-4 2.5 2 3.5-4.5" /></>),
  "tax-free-savings": I(<><path d="M12 3.5 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6z" fill={W} /><path d="M9 12.5l2 2 4-4.5" /></>),
  /* ── 연금 ── */
  "national-pension": I(<><circle cx="12" cy="12" r="8.5" fill={W} /><path d="M12 7.5V12l3.5 2" /><path d="M12 3.5v1M12 19.5v1M3.5 12h1M19.5 12h1" /></>),
  "national-pension-early": I(<><circle cx="12" cy="12" r="8.5" fill={W} /><path d="M12 7.5V12l-3 2" /><path d="M6 4l-2 2 2 2" /></>),
  "irp-tax-credit": I(<><path d="M4 8.5h16v10a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5z" fill={W} /><path d="M8 8.5V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2.5" /><path d="M9.5 14.5l2 2 3.5-4" /></>),
  "noranumbrella-tax-saving": I(<><path d="M3.5 12a8.5 8.5 0 0 1 17 0z" fill={W} /><path d="M12 12v6a2 2 0 0 0 4 0" /><path d="M12 3.5V5" /></>),
  /* ── 보험 ── */
  "auto-tax": I(<><path d="M4 13l2-5.5A1.5 1.5 0 0 1 7.4 6.5h9.2a1.5 1.5 0 0 1 1.4 1L20 13v5H4z" fill={W} /><path d="M4 13h16" /><circle cx="8" cy="15.5" r="1.2" /><circle cx="16" cy="15.5" r="1.2" /><path d="M6 18v2M18 18v2" /></>),
  "medical-insurance-payout": I(<><path d="M12 3.5 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6z" fill={W} /><path d="M12 9v6M9 12h6" /></>),
  /* ── 법률 ── */
  "severance-pay": I(<><path d="M4 9.5h16v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5z" fill={W} /><path d="M9 9.5V7a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 7v2.5" /><path d="M9 14.5h6" /><path d="M12 12v5" /></>),
  "annual-leave-allowance": I(<><rect x="3.5" y="5" width="17" height="15" rx="2" fill={W} /><path d="M3.5 9.5h17M8 3v4M16 3v4" /><path d="M9 14.5l2 2 4-4" /></>),
  "unpaid-wages": I(<><rect x="3" y="6" width="18" height="12" rx="2" fill={W} /><path d="M3 10h18" /><path d="M16 13l3.5 3.5M19.5 13 16 16.5" /></>),
  "child-support": I(<><circle cx="8" cy="8" r="3" fill={W} /><circle cx="16.5" cy="10" r="2.2" fill={W} /><path d="M2.5 20c0-3.5 2.5-5.5 5.5-5.5s5.5 2 5.5 5.5" fill={W} /><path d="M13.5 20c0-2.6 1.4-4 3-4s3 1.4 3 4" fill={W} /></>),
  "divorce-alimony": I(<><circle cx="8.5" cy="12" r="4.5" fill={W} /><circle cx="15.5" cy="12" r="4.5" fill={W} /><path d="M12 5l-1 14" /></>),
  "inheritance-share": I(<><circle cx="12" cy="12" r="8.5" fill={W} /><path d="M12 3.5V12l6 6" /><path d="M12 12l-7.5 4" /></>),
  /* ── 정부지원금 ── */
  "unemployment-benefit": I(<><path d="M4 9.5h16v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5z" fill={W} /><path d="M9 9.5V7a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 7v2.5" /><path d="M9.5 14.5h5" /></>),
  "parental-leave-pay": I(<><circle cx="12" cy="9" r="3.5" fill={W} /><path d="M6 20c0-3.5 2.7-5.5 6-5.5s6 2 6 5.5" fill={W} /><path d="M17 4.5c1.5-1.5 4 0 3 2l-3 3-3-3c-1-2 1.5-3.5 3-2z" fill={W} /></>),
  "maternity-leave-pay": I(<><circle cx="12" cy="7" r="3" fill={W} /><path d="M7 21c0-4 1-8 5-8s5 4 5 8" fill={W} /><circle cx="12" cy="15" r="2.4" fill={W} /></>),
  "basic-pension": I(<><circle cx="12" cy="8" r="3.5" fill={W} /><path d="M5 20c0-4 3-6.5 7-6.5s7 2.5 7 6.5" fill={W} /><path d="M12 13.5V20" /></>),
  "basic-livelihood-eligibility": I(<><path d="M3.5 10.5 12 4l8.5 6.5V19a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19z" fill={W} /><path d="M8 13.5c0-1.5 1-2.5 2-2.5s2 1 2 2.5c0 1.5 2 2.5 2 2.5s-2 1-2 2.5" /></>),
  "near-poor-eligibility": I(<><path d="M3.5 10.5 12 4l8.5 6.5V19a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19z" fill={W} /><path d="M8 15h8M8 12h4" /></>),
  "median-income": I(<><path d="M3.5 19h17" /><rect x="5" y="11" width="3.5" height="8" rx=".8" fill={W} /><rect x="10.25" y="6" width="3.5" height="13" rx=".8" fill={W} /><rect x="15.5" y="9" width="3.5" height="10" rx=".8" fill={W} /></>),
  "earned-income-tax-credit": I(<><rect x="3" y="6" width="18" height="12" rx="2" fill={W} /><path d="M3 10h18" /><path d="M7 14.5h4" /><path d="M15 12.5l1.5 1.5 3-3" /></>),
  "national-scholarship": I(<><path d="M2.5 9.5 12 5l9.5 4.5L12 14z" fill={W} /><path d="M6 11.5V16c0 1.5 2.7 2.5 6 2.5s6-1 6-2.5v-4.5" /><path d="M21.5 9.5v5" /></>),
  "industrial-accident-pay": I(<><path d="M4 18.5h16M5 18.5V11a7 7 0 0 1 14 0v7.5" fill={W} /><path d="M12 4v2M9 6l3 2 3-2" /><path d="M10 14h4" /></>),
  "single-parent-support": I(<><circle cx="10" cy="7.5" r="3" fill={W} /><circle cx="16.5" cy="11" r="2" fill={W} /><path d="M4 20c0-3.5 2.5-5.5 6-5.5s6 2 6 5.5" fill={W} /><path d="M16.5 15v5" /></>),
  /* ── 유틸 ── */
  "age-calculator": I(<><rect x="3.5" y="5" width="17" height="15" rx="2" fill={W} /><path d="M3.5 9.5h17M8 3v4M16 3v4" /><path d="M12 12v4M10 14h4" /></>),
  "date-calculator": I(<><rect x="3.5" y="5" width="17" height="15" rx="2" fill={W} /><path d="M3.5 9.5h17M8 3v4M16 3v4" /><circle cx="12" cy="14.5" r="1.5" /></>),
  "percent-calculator": I(<><circle cx="12" cy="12" r="8.5" fill={W} /><path d="M8.5 15.5l7-7" /><circle cx="9" cy="9" r="1.3" /><circle cx="15" cy="15" r="1.3" /></>),
  "installment-fee": I(<><rect x="3" y="6" width="18" height="12" rx="2" fill={W} /><path d="M3 10h18" /><path d="M7 14.5h2M11 14.5h2M15 14.5h2" /></>),
  "cash-service-fee": I(<><rect x="3" y="7" width="18" height="11" rx="2" fill={W} /><circle cx="12" cy="12.5" r="2.5" /><path d="M6 12.5h.5M17.5 12.5h.5" /></>),
};

/** 계산기 아이콘. 없으면 대체 아이콘(카테고리 아이콘)을 쓴다. */
export const calcIcon = (slug: string, fallback: ReactNode): ReactNode => CALC_ICON[slug] ?? fallback;
