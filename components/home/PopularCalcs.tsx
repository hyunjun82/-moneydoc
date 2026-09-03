"use client";
import { hubHref } from "@/lib/hub-map";

import { useState } from "react";
import { TILES } from "./CategoryTiles";
import { calcIcon } from "@/components/icons/calc-icons";

/* 홈 인기 계산기: 카테고리 탭 + 카드 줄 (아이콘 · 이름 · 검증 표시) */

type Calc = { cat: string; slug: string; title: string; note: string; gov?: boolean };

// 카테고리별 검색량 상위. gov=true 는 정부 계산기 0원 일치 어댑터가 있는 계산기.
const CALCS: Calc[] = [
  { cat: "tax", slug: "salary-net-pay", title: "연봉 실수령액", note: "2026 간이세액표", gov: true },
  { cat: "government", slug: "unemployment-benefit", title: "실업급여", note: "고용24 일치", gov: true },
  { cat: "law", slug: "severance-pay", title: "퇴직금", note: "고용노동부 일치", gov: true },
  { cat: "tax", slug: "four-major-insurance", title: "4대보험료", note: "2026 요율", gov: true },
  { cat: "realestate", slug: "transfer-tax", title: "양도소득세", note: "홈택스 일치", gov: true },
  { cat: "tax", slug: "comprehensive-income-tax", title: "종합소득세", note: "2026 세율" },
  { cat: "realestate", slug: "acquisition-tax", title: "취득세", note: "위택스 일치", gov: true },
  { cat: "pension", slug: "national-pension", title: "국민연금 예상수령액", note: "공단 일치", gov: true },
  { cat: "government", slug: "basic-pension", title: "기초연금", note: "2026 기준" },
  { cat: "government", slug: "parental-leave-pay", title: "육아휴직 급여", note: "고용24 일치", gov: true },
  { cat: "loan", slug: "dsr-limit", title: "DSR", note: "스트레스 3단계", gov: true },
  { cat: "loan", slug: "loan-amortization", title: "대출 이자", note: "은행 일치", gov: true },
  { cat: "loan", slug: "mortgage-loan-limit", title: "주담대 한도", note: "LTV·DSR", gov: true },
  { cat: "loan", slug: "prepayment-fee", title: "중도상환수수료", note: "은행 일치", gov: true },
  { cat: "realestate", slug: "property-tax", title: "재산세", note: "홈택스 일치", gov: true },
  { cat: "realestate", slug: "comprehensive-real-estate-tax", title: "종합부동산세", note: "홈택스 일치", gov: true },
  { cat: "tax", slug: "gift-tax", title: "증여세", note: "홈택스 일치", gov: true },
  { cat: "tax", slug: "inheritance-tax", title: "상속세", note: "홈택스 일치", gov: true },
  { cat: "tax", slug: "retirement-income-tax", title: "퇴직소득세", note: "2026 기준" },
  { cat: "savings", slug: "installment-savings", title: "적금 이자", note: "이자소득세 15.4%" },
  { cat: "savings", slug: "fixed-deposit", title: "정기예금 이자", note: "단리·복리" },
  { cat: "savings", slug: "isa-tax-saving", title: "ISA 절세", note: "2026 한도" },
  { cat: "pension", slug: "national-pension-early", title: "국민연금 조기수령", note: "감액률" },
  { cat: "pension", slug: "irp-tax-credit", title: "IRP 세액공제", note: "2026 한도" },
  { cat: "insurance", slug: "auto-tax", title: "자동차세", note: "위택스 일치", gov: true },
  { cat: "insurance", slug: "medical-insurance-payout", title: "실손보험 자기부담금", note: "4세대 기준" },
  { cat: "law", slug: "annual-leave-allowance", title: "연차수당", note: "통상임금 기준" },
  { cat: "law", slug: "unpaid-wages", title: "임금체불", note: "지연이자 20%" },
  { cat: "law", slug: "child-support", title: "양육비", note: "산정기준표" },
  { cat: "government", slug: "basic-livelihood-eligibility", title: "기초생활수급", note: "2026 중위소득" },
  { cat: "government", slug: "earned-income-tax-credit", title: "근로장려금", note: "2026 기준" },
];

const TABS: { key: string; label: string }[] = [{ key: "all", label: "전체" }, ...TILES.map((t) => ({ key: t.slug, label: t.name }))];

export function PopularCalcs() {
  const [tab, setTab] = useState("all");
  const list = (tab === "all" ? CALCS : CALCS.filter((c) => c.cat === tab)).slice(0, 8);
  const more = tab === "all" ? "/calculators/" : `/${tab}/`;
  return (
    <div className="pop-wrap">
      <section className="section">
        <div className="section-head">
          <h2 className="section-title">인기 계산기</h2>
          <p className="section-sub">지금 가장 많이 쓰는 계산기. 정부 계산기와 0원 일치하는 것은 표시했어요</p>
        </div>
        <div className="pop-tabs" role="tablist">
          {TABS.map((t) => (
            <button key={t.key} type="button" role="tab" aria-selected={tab === t.key} className={tab === t.key ? "on" : ""} onClick={() => setTab(t.key)}>{t.label}</button>
          ))}
        </div>
        <div className="cards">
          {list.map((c) => {
            const tile = TILES.find((t) => t.slug === c.cat)!;
            return (
              <a key={c.slug} href={hubHref(c.cat, c.slug)} className="card" style={{ ["--tint" as string]: tile.tint, ["--ink" as string]: tile.ink }}>
                <span className="card-ico">{calcIcon(c.slug, tile.icon)}{c.gov ? <i className="chk" aria-label="정부 계산기와 일치">✓</i> : null}</span>
                <span className="card-name">{c.title}</span>
                <span className={`card-note${c.gov ? " gov" : ""}`}>{c.gov ? "정부 일치 · " : ""}{c.note}</span>
              </a>
            );
          })}
        </div>
        <a className="more-btn" href={more}>{tab === "all" ? "66개 전체 보기" : `${TILES.find((t) => t.slug === tab)?.name} 계산기 전체 보기`}</a>
      </section>
    </div>
  );
}
