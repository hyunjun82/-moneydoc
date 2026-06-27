// 자동 생성: scratchpad/gen_article.py (청년미래적금 카드뉴스 단독 HTML -> 스코프드 컴포넌트 데이터)
// 디자인 '그대로' 유지: CSS는 .cardnews 하위로 평탄화 스코프, 본문은 정적 HTML.

export const meta = {
  title: "청년미래적금 가입조건·정부기여금 총정리 (6월 22일 출시, 7월 3일까지 신청)",
  description: "청년미래적금 6월 22일 출시. 가입조건(소득·가구요건), 정부기여금 6% vs 12%, 중소기업·소상공인 우대형 조건, 신청기간(~7/3), 자주 묻는 질문 FAQ까지 한눈에 정리했어요.",
  ogImage: "https://www.korea.kr/newsWeb/resources/attaches/2026.06/19/530fc8f08bdcb738a12044439f0130e2.jpg",
  datePublished: "2026-06-19",
  dateModified: "2026-06-20",
};

export const css = `
.cardnews {--paper:#EFEDE8; --paper-2:#E7E4DD; --surface:#FFFFFF; --surface-alt:#F7F6F3;
  --ink-900:#1A1D21; --ink-700:#3C424A; --ink-500:#6C727B; --ink-300:#9CA1A8;
  --line:#E2DFD7; --line-strong:#CFCBC1;
  --blue-700:#1F4E79; --blue-600:#2A6099; --blue-soft:#E9F0F7;
  --green-700:#2E7D5B; --green-soft:#E7F2EC;
  --sand-700:#9A7B2E; --sand-soft:#F4EEDD;
  --bg-page:var(--paper); --bg-card:var(--surface); --bg-inset:var(--surface-alt);
  --text-strong:var(--ink-900); --text-body:var(--ink-700); --text-muted:var(--ink-500); --text-faint:var(--ink-300);
  --border-card:var(--line); --border-hr:var(--line-strong);
  --accent:var(--blue-700); --accent-bg:var(--blue-soft); --accent-on:#FFFFFF;
  --good:var(--green-700); --good-bg:var(--green-soft);
  --tag:var(--sand-700); --tag-bg:var(--sand-soft);
  --font-sans:"Pretendard Variable","Pretendard",-apple-system,BlinkMacSystemFont,system-ui,"Segoe UI",Roboto,"Apple SD Gothic Neo","Noto Sans KR",sans-serif;
  --fs-eyebrow:13px; --fs-caption:14px; --fs-body:17px; --fs-lead:20px;
  --fs-h3:21px; --fs-h2:27px; --fs-h1:36px; --fs-display:46px;
  --fw-regular:400; --fw-medium:500; --fw-semibold:600; --fw-bold:700; --fw-extrabold:800;
  --lh-tight:1.25; --lh-snug:1.4; --lh-body:1.7;
  --ls-tight:-0.02em; --ls-normal:-0.01em; --ls-eyebrow:0.06em;
  --sp-1:4px; --sp-2:8px; --sp-3:12px; --sp-4:16px; --sp-5:20px; --sp-6:24px;
  --sp-8:32px; --sp-10:40px; --sp-12:48px; --sp-16:64px;
  --measure:720px;
  --r-sm:8px; --r-md:14px; --r-lg:20px; --r-pill:999px;
  --shadow-card:0 1px 2px rgba(26,29,33,.04),0 8px 24px rgba(26,29,33,.06);
  --shadow-soft:0 1px 2px rgba(26,29,33,.04),0 2px 8px rgba(26,29,33,.05);}
.cardnews * {box-sizing: border-box; margin: 0; padding: 0;}
.cardnews {-webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; scroll-behavior: smooth; scroll-padding-top: 16px;}
.cardnews {font-family: var(--font-sans);
    background: var(--bg-page);
    color: var(--text-body);
    line-height: var(--lh-body);
    padding: var(--sp-10) var(--sp-5) var(--sp-16);
    background-image: radial-gradient(circle at 18% 6%, rgba(255,255,255,.55), transparent 55%);}
.cardnews .wrap {max-width: var(--measure); margin: 0 auto;}
.cardnews .masthead {text-align: center; margin-bottom: var(--sp-8);}
.cardnews .masthead .kicker {font-size: var(--fs-eyebrow); font-weight: var(--fw-bold);
    letter-spacing: var(--ls-eyebrow); color: var(--accent);}
.cardnews .masthead .src {margin-top: var(--sp-2); font-size: var(--fs-caption); color: var(--text-muted);}
.cardnews .card {background: var(--bg-card);
    border: 1px solid var(--border-card);
    border-radius: var(--r-lg);
    box-shadow: var(--shadow-card);
    padding: var(--sp-10);
    margin-bottom: var(--sp-6);}
@media (max-width: 600px) {
.cardnews .card {padding: var(--sp-8) var(--sp-6);}
.cardnews {padding: var(--sp-6) var(--sp-3) var(--sp-12);}
}
.cardnews .seclabel {display: flex; align-items: center; gap: var(--sp-3); margin-bottom: var(--sp-5);}
.cardnews .seclabel .num {flex: none; width: 32px; height: 32px; display: grid; place-items: center;
    background: var(--accent); color: var(--accent-on); border-radius: var(--r-pill);
    font-size: 15px; font-weight: var(--fw-bold); font-variant-numeric: tabular-nums;}
.cardnews .seclabel .txt {font-size: var(--fs-eyebrow); font-weight: var(--fw-bold);
    letter-spacing: var(--ls-eyebrow); color: var(--text-muted); white-space: nowrap;}
.cardnews h2 {font-size: var(--fs-h2); font-weight: var(--fw-bold); color: var(--text-strong);
    line-height: var(--lh-snug); letter-spacing: var(--ls-tight); word-break: keep-all;
    margin-bottom: var(--sp-2);}
.cardnews .secteaser {font-size: var(--fs-body); color: var(--text-muted); word-break: keep-all; margin-bottom: var(--sp-6);}
.cardnews .hero {text-align: center; padding: var(--sp-12) var(--sp-10);}
.cardnews .tag {display: inline-block; font-size: var(--fs-eyebrow); font-weight: var(--fw-bold);
    color: var(--tag); background: var(--tag-bg); padding: 5px 12px;
    border-radius: var(--r-pill); white-space: nowrap;}
.cardnews h1 {font-size: var(--fs-h1); font-weight: var(--fw-extrabold); color: var(--text-strong);
    line-height: var(--lh-tight); letter-spacing: var(--ls-tight);
    margin: var(--sp-5) 0 var(--sp-4); text-wrap: balance;}
.cardnews .hero .lead {font-size: var(--fs-lead); color: var(--text-body); line-height: var(--lh-snug);
    max-width: 26em; margin: 0 auto; word-break: keep-all; text-wrap: pretty;}
.cardnews .topics {display: flex; flex-wrap: wrap; gap: var(--sp-2); justify-content: center; margin-top: var(--sp-6);}
.cardnews .topics span {font-size: var(--fs-caption); font-weight: var(--fw-semibold); color: var(--accent);
    background: var(--accent-bg); padding: 7px 14px; border-radius: var(--r-pill); white-space: nowrap;}
.cardnews .facts {display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px;
    background: var(--border-card); border: 1px solid var(--border-card);
    border-radius: var(--r-md); overflow: hidden; margin-bottom: var(--sp-6);}
@media (max-width: 520px) {
.cardnews .facts {grid-template-columns: 1fr;}
}
.cardnews .facts .f {background: var(--bg-card); padding: var(--sp-6); text-align: center;}
.cardnews .facts .k {font-size: var(--fs-caption); color: var(--text-muted); font-weight: var(--fw-medium);}
.cardnews .facts .v {margin-top: 6px; font-size: var(--fs-h3); font-weight: var(--fw-extrabold);
    color: var(--text-strong); letter-spacing: var(--ls-tight);}
.cardnews .facts .v.accent {color: var(--accent);}
.cardnews ul.qa {list-style: none; display: flex; flex-direction: column; gap: var(--sp-5);}
.cardnews ul.qa > li {display: flex; gap: var(--sp-3);}
.cardnews ul.qa > li .tri {flex: none; width: 22px; height: 22px; margin-top: 3px; display: grid; place-items: center;
    color: var(--accent); font-size: 12px;}
.cardnews ul.qa > li .body {font-size: var(--fs-body); color: var(--text-body); word-break: keep-all;}
.cardnews ul.qa > li .body b {color: var(--text-strong); font-weight: var(--fw-bold);}
.cardnews .subnote {margin-top: 8px; padding: 10px 14px; background: var(--bg-inset);
    border-radius: var(--r-sm); font-size: var(--fs-caption); color: var(--text-muted);
    word-break: keep-all; line-height: var(--lh-snug);}
.cardnews .subnote b {color: var(--accent); font-weight: var(--fw-semibold);}
.cardnews .tiers {display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--sp-4); margin-bottom: var(--sp-6);}
@media (max-width: 600px) {
.cardnews .tiers {grid-template-columns: 1fr;}
}
.cardnews .tier {border: 1px solid var(--border-card); border-radius: var(--r-md); padding: var(--sp-6); background: var(--bg-card);}
.cardnews .tier .name {font-size: var(--fs-caption); font-weight: var(--fw-bold); color: var(--text-muted);}
.cardnews .tier .rate {margin: var(--sp-2) 0; font-size: var(--fs-display); font-weight: var(--fw-extrabold);
    line-height: 1; letter-spacing: var(--ls-tight);}
.cardnews .tier .rate small {font-size: 16px; font-weight: var(--fw-bold);}
.cardnews .tier .desc {font-size: var(--fs-caption); color: var(--text-body); word-break: keep-all;}
.cardnews .tier.t0 {background: var(--bg-inset);}
.cardnews .tier.t0 .rate {color: var(--text-muted);}
.cardnews .tier.t1 {border-color: #D6E3F0;}
.cardnews .tier.t1 .rate {color: var(--accent);}
.cardnews .tier.t2 {background: var(--good-bg); border-color: #CFE6D9;}
.cardnews .tier.t2 .rate {color: var(--good);}
.cardnews .crit {border: 1px solid var(--border-card); border-radius: var(--r-md); overflow: hidden;}
.cardnews .crit .row {display: grid; grid-template-columns: 120px 1fr; border-top: 1px solid var(--border-card);}
.cardnews .crit .row:first-child {border-top: none;}
.cardnews .crit .h {background: var(--bg-inset); padding: 14px var(--sp-4); font-size: var(--fs-caption);
    font-weight: var(--fw-bold); color: var(--text-strong); display: flex; align-items: center;}
.cardnews .crit .c {padding: 14px var(--sp-4); font-size: var(--fs-caption); color: var(--text-body); word-break: keep-all;}
.cardnews .crit .c .pill {display: inline-block; font-weight: var(--fw-bold); padding: 1px 8px; border-radius: var(--r-pill);
    font-size: 12px; margin-right: 6px;}
.cardnews .crit .c .pill.b {color: var(--accent); background: var(--accent-bg);}
.cardnews .crit .c .pill.g {color: var(--good); background: var(--good-bg);}
@media (max-width: 520px) {
.cardnews .crit .row {grid-template-columns: 1fr;}
.cardnews .crit .h {border-bottom: 1px solid var(--border-card);}
}
.cardnews .chat {display: flex; flex-direction: column; gap: var(--sp-4);}
.cardnews .bubble {max-width: 85%; padding: 14px 18px; border-radius: 18px; font-size: var(--fs-body);
    word-break: keep-all; line-height: var(--lh-snug);}
.cardnews .bubble .who {display: block; font-size: 12px; font-weight: var(--fw-bold); margin-bottom: 6px; letter-spacing: var(--ls-normal);}
.cardnews .bubble.q {align-self: flex-start; background: var(--bg-inset); color: var(--text-body);
    border-bottom-left-radius: 5px;}
.cardnews .bubble.q .who {color: var(--text-muted);}
.cardnews .bubble.a {align-self: flex-end; background: var(--accent); color: #fff; border-bottom-right-radius: 5px;}
.cardnews .bubble.a .who {color: rgba(255,255,255,.8);}
.cardnews .bubble.a b {font-weight: var(--fw-bold);}
.cardnews .cta {text-align: center; background: var(--accent); color: #fff; padding: var(--sp-10);
    border-radius: var(--r-lg); margin-bottom: var(--sp-8);}
.cardnews .cta h2 {color: #fff;}
.cardnews .cta p {color: rgba(255,255,255,.85); font-size: var(--fs-body); margin-top: var(--sp-2);}
.cardnews .cta .lines {display: flex; flex-direction: column; gap: var(--sp-2); margin-top: var(--sp-6); align-items: center;}
.cardnews .cta .line {font-size: var(--fs-body); font-weight: var(--fw-semibold); white-space: nowrap;}
.cardnews .cta .line b {font-weight: var(--fw-extrabold);}
.cardnews .cta .pillbtn {display: inline-block; margin-top: var(--sp-6); background: #fff; color: var(--accent);
    font-weight: var(--fw-bold); font-size: var(--fs-body); padding: 12px 28px; border-radius: var(--r-pill);
    text-decoration: none; white-space: nowrap;}
.cardnews .body .hl {display: block; font-size: var(--fs-body); font-weight: var(--fw-bold);
    color: var(--accent); letter-spacing: var(--ls-normal); margin-bottom: 3px;}
.cardnews .keypts {display: flex; flex-direction: column; gap: var(--sp-5);}
.cardnews .keypts .pt {display: flex; gap: var(--sp-4); align-items: flex-start;}
.cardnews .keypts .pt .n {flex: none; width: 30px; height: 30px; border-radius: var(--r-pill);
    background: var(--accent-bg); color: var(--accent); display: grid; place-items: center;
    font-weight: var(--fw-bold); font-size: 14px; margin-top: 2px;}
.cardnews .keypts .pt .t {font-size: var(--fs-lead); color: var(--text-strong); word-break: keep-all;
    line-height: var(--lh-snug); font-weight: var(--fw-medium);}
.cardnews .keypts .pt .t b {color: var(--accent); font-weight: var(--fw-bold);}
.cardnews .personas {display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-4);}
@media (max-width: 600px) {
.cardnews .personas {grid-template-columns: 1fr;}
}
.cardnews .persona {border: 1px solid var(--border-card); border-radius: var(--r-md);
    padding: var(--sp-6); display: flex; flex-direction: column; gap: var(--sp-2);}
.cardnews .persona .role {font-size: var(--fs-h3); font-weight: var(--fw-bold);
    color: var(--text-strong); letter-spacing: var(--ls-tight);}
.cardnews .persona .situ {font-size: var(--fs-caption); color: var(--text-muted);
    word-break: keep-all; flex: 1; line-height: var(--lh-snug);}
.cardnews .persona .rec {display: flex; align-items: center; gap: var(--sp-2); flex-wrap: wrap;
    padding-top: var(--sp-3); margin-top: var(--sp-2); border-top: 1px solid var(--border-card);}
.cardnews .persona .rec .lab {font-size: 12px; color: var(--text-faint); white-space: nowrap;}
.cardnews .badge {font-size: var(--fs-caption); font-weight: var(--fw-bold); padding: 3px 11px;
    border-radius: var(--r-pill); white-space: nowrap;}
.cardnews .badge.b {color: var(--accent); background: var(--accent-bg);}
.cardnews .badge.g {color: var(--good); background: var(--good-bg);}
.cardnews .badge.n {color: var(--text-muted); background: var(--bg-inset);}
.cardnews .faq {display: flex; flex-direction: column; gap: var(--sp-3);}
.cardnews .faq details {border: 1px solid var(--border-card); border-radius: var(--r-md);
    background: var(--bg-card); overflow: hidden;}
.cardnews .faq summary {list-style: none; cursor: pointer; padding: var(--sp-5) var(--sp-6);
    font-size: var(--fs-body); font-weight: var(--fw-semibold); color: var(--text-strong);
    display: flex; gap: var(--sp-3); align-items: flex-start; word-break: keep-all;}
.cardnews .faq summary::-webkit-details-marker {display: none;}
.cardnews .faq summary .q {flex: none; color: var(--accent); font-weight: var(--fw-extrabold);}
.cardnews .faq summary .plus {margin-left: auto; flex: none; color: var(--text-muted);
    transition: transform .2s ease; font-weight: var(--fw-bold); font-size: 20px; line-height: 1;}
.cardnews .faq details[open] summary .plus {transform: rotate(45deg);}
.cardnews .faq .ans {padding: 0 var(--sp-6) var(--sp-5) calc(var(--sp-6) + 26px);
    font-size: var(--fs-body); color: var(--text-body); word-break: keep-all; line-height: var(--lh-body);}
.cardnews .faq .ans b {color: var(--text-strong); font-weight: var(--fw-bold);}
.cardnews .byline {display: flex; flex-wrap: wrap; align-items: center; gap: var(--sp-2) var(--sp-4);
    padding: var(--sp-5) var(--sp-6); margin-bottom: var(--sp-6);
    background: var(--bg-card); border: 1px solid var(--border-card); border-radius: var(--r-md);}
.cardnews .byline .ed {display: flex; align-items: center; gap: var(--sp-2);}
.cardnews .byline .ava {flex: none; width: 30px; height: 30px; border-radius: var(--r-pill);
    background: var(--accent-bg); color: var(--accent); display: grid; place-items: center;
    font-size: 13px; font-weight: var(--fw-bold);}
.cardnews .byline .who {font-size: var(--fs-caption); font-weight: var(--fw-bold); color: var(--text-strong); white-space: nowrap;}
.cardnews .byline .dates {font-size: var(--fs-caption); color: var(--text-muted); display: flex; flex-wrap: wrap; gap: var(--sp-1) var(--sp-3); margin-left: auto;}
.cardnews .byline .dates span {white-space: nowrap;}
.cardnews .byline .dates time {color: var(--text-body); font-weight: var(--fw-medium);}
@media (max-width: 520px) {
.cardnews .byline .dates {margin-left: 0; width: 100%;}
}
.cardnews .spec {border: 1px solid var(--border-card); border-radius: var(--r-md); overflow: hidden;}
.cardnews .spec .r {display: grid; grid-template-columns: 136px 1fr; border-top: 1px solid var(--border-card);}
.cardnews .spec .r:first-child {border-top: none;}
.cardnews .spec .k {background: var(--bg-inset); padding: 14px var(--sp-4); font-size: var(--fs-caption);
    font-weight: var(--fw-bold); color: var(--text-strong); display: flex; align-items: center;}
.cardnews .spec .v {padding: 14px var(--sp-4); font-size: var(--fs-body); color: var(--text-body); word-break: keep-all;}
.cardnews .spec .v b {color: var(--accent); font-weight: var(--fw-bold);}
.cardnews .spec .v .x {color: var(--text-muted); font-size: var(--fs-caption);}
@media (max-width: 520px) {
.cardnews .spec .r {grid-template-columns: 1fr;}
.cardnews .spec .k {border-bottom: 1px solid var(--border-card);}
}
.cardnews .applybar {background: var(--accent); color: #fff; border-radius: var(--r-lg);
    padding: var(--sp-6) var(--sp-8); margin-bottom: var(--sp-6); display: flex; align-items: center;
    justify-content: space-between; gap: var(--sp-5); flex-wrap: wrap; box-shadow: var(--shadow-card);
    text-decoration: none; cursor: pointer; transition: transform .12s ease, box-shadow .12s ease;}
.cardnews .applybar:hover {transform: translateY(-1px); box-shadow: 0 8px 26px rgba(31,78,121,.28);}
.cardnews .applybar:hover .btn {transform: translateY(-1px); box-shadow: 0 6px 18px rgba(0,0,0,.18);}
.cardnews .applybar .t {font-size: var(--fs-lead); font-weight: var(--fw-extrabold); letter-spacing: var(--ls-tight);}
.cardnews .applybar .t small {display: block; font-size: var(--fs-caption); font-weight: var(--fw-medium);
    color: rgba(255,255,255,.82); margin-top: 5px; letter-spacing: 0;}
.cardnews .applybar .btn {flex: none; background: #fff; color: var(--accent); font-weight: var(--fw-extrabold);
    font-size: var(--fs-body); padding: 14px 30px; border-radius: var(--r-pill); text-decoration: none;
    white-space: nowrap; transition: transform .12s ease, box-shadow .12s ease;}
.cardnews .applybar .btn:hover {transform: translateY(-1px); box-shadow: 0 6px 18px rgba(0,0,0,.18);}
@media (max-width: 520px) {
.cardnews .applybar {flex-direction: column; align-items: stretch; text-align: center;}
}
.cardnews .cmp {table-layout: fixed; border-collapse: separate; border-spacing: 10px 7px;}
.cardnews .cmp th, .cardnews .cmp td {border: none; padding: 14px 12px; text-align: center; vertical-align: middle;
    border-radius: var(--r-sm); font-size: var(--fs-caption); white-space: normal; word-break: keep-all;}
.cardnews .cmp th:first-child, .cardnews .cmp td:first-child {width: 22%;}
.cardnews .cmp th:nth-child(2), .cardnews .cmp td:nth-child(2) {width: 39%;}
.cardnews .cmp thead th:first-child, .cardnews .cmp td.lab {background: transparent; color: var(--text-strong); font-weight: var(--fw-bold);}
.cardnews .cmp tbody td {background: var(--bg-inset); color: var(--text-body);}
.cardnews .cmp th:nth-child(2) {background: var(--accent-bg); color: var(--accent); font-weight: var(--fw-bold);}
.cardnews .cmp tbody td:nth-child(2) {background: var(--accent-bg);}
.cardnews .cmp thead th:last-child {color: var(--text-strong); font-weight: var(--fw-bold);}
.cardnews .cmp tbody td.hl1 {color: var(--accent); font-weight: var(--fw-bold);}
.cardnews .toc {border: 1px solid var(--border-card); border-radius: var(--r-md);
    background: var(--bg-card); margin-bottom: var(--sp-6); overflow: hidden; box-shadow: var(--shadow-soft);}
.cardnews .toc > summary {list-style: none; cursor: pointer; display: flex; align-items: center; gap: var(--sp-2);
    padding: var(--sp-4) var(--sp-6); font-weight: var(--fw-bold); color: var(--text-strong); font-size: var(--fs-body);}
.cardnews .toc > summary::-webkit-details-marker {display: none;}
.cardnews .toc > summary .ic {color: var(--accent); font-weight: var(--fw-extrabold);}
.cardnews .toc > summary .tog {margin-left: auto; color: var(--text-muted); font-size: 20px; line-height: 1;
    font-weight: var(--fw-bold); transition: transform .2s ease;}
.cardnews .toc[open] > summary .tog {transform: rotate(45deg);}
.cardnews .toc-nav {display: flex; flex-direction: column; padding: var(--sp-2) var(--sp-4) var(--sp-3);
    border-top: 1px solid var(--border-card);}
.cardnews .toc-nav a {display: flex; gap: var(--sp-2); padding: 10px var(--sp-3); font-size: var(--fs-caption);
    color: var(--text-body); text-decoration: none; border-radius: var(--r-sm); word-break: keep-all;}
.cardnews .toc-nav a::before {content: "›"; color: var(--accent); font-weight: var(--fw-bold); flex: none;}
.cardnews .toc-nav a:hover {background: var(--bg-inset); color: var(--accent);}
.cardnews .card[id] {scroll-margin-top: 16px;}
.cardnews .foot {text-align: center; color: var(--text-muted); font-size: var(--fs-caption); padding-top: var(--sp-4);}
.cardnews .foot .org {font-size: var(--fs-body); font-weight: var(--fw-bold); color: var(--text-strong);}
`;

export const bodyHtml = `
<article class="wrap">

    <div class="masthead">
      <div class="kicker">금융위원회 · 서민금융진흥원</div>
      <div class="src">정책카드뉴스 · 청년 자산형성 지원</div>
    </div>

    <!-- 히어로 -->
    <section class="card hero">
      <span class="tag">미래를 채우는 첫 시작 · 청년 자산형성</span>
      <h1>청년미래적금 6월 22일 출시<br>가입조건·정부기여금 총정리</h1>
      <p class="lead">소득·가구요건부터 정부기여금, 우대형 조건까지 자주 묻는 궁금증을 한 번에 정리했어요.</p>
      <div class="topics">
        <span>소득·가구요건</span>
        <span>정부기여금</span>
        <span>중소기업·소상공인 우대형</span>
      </div>
    </section>

    <!-- 바이라인: 에디터 · 작성/수정일 -->
    <div class="byline">
      <div class="ed">
        <span class="ava">지</span>
        <span class="who">지원금 에디터</span>
      </div>
      <div class="dates">
        <span>작성일 <time datetime="2026-06-19">2026. 06. 19.</time></span>
        <span>수정일 <time datetime="2026-06-20">2026. 06. 20.</time></span>
      </div>
    </div>

    <!-- 핵심 정보 스트립 -->
    <div class="facts">
      <div class="f"><div class="k">출시일</div><div class="v accent">6월 22일</div></div>
      <div class="f"><div class="k">가입 신청</div><div class="v">~ 7월 3일</div></div>
      <div class="f"><div class="k">콜센터</div><a class="v" href="tel:1397" style="text-decoration:none">☎ 1397 → 3</a></div>
    </div>

    <!-- 목차 (접이식) -->
    <details class="toc" open>
      <summary><span class="ic">☰</span><span>목차</span><span class="tog">+</span></summary>
      <nav class="toc-nav">
        <a href="#sec-summary">청년미래적금, 핵심만 먼저</a>
        <a href="#sec-spec">청년미래적금이 뭔가요? (한 줄 요약)</a>
        <a href="#sec-join">청년미래적금 가입조건 (소득·가구요건)</a>
        <a href="#sec-gov">청년미래적금 정부기여금, 얼마나 받나? (6% vs 12%)</a>
        <a href="#sec-type">청년미래적금, 나에게 맞는 유형은?</a>
        <a href="#sec-compare">청년미래적금 vs 청년도약계좌, 뭐가 다를까?</a>
        <a href="#sec-sme">청년미래적금 중소기업 우대형 조건</a>
        <a href="#sec-owner">청년미래적금 소상공인 가입 조건</a>
        <a href="#sec-faq">청년미래적금 자주 묻는 질문 (FAQ)</a>
      </nav>
    </details>

    <!-- 한눈에 요약 -->
    <section class="card" id="sec-summary">
      <div class="seclabel"><span class="num">!</span><span class="txt">한눈에 요약</span></div>
      <h2>청년미래적금, 핵심만 먼저</h2>
      <div class="keypts" style="margin-top:var(--sp-6)">
        <div class="pt"><span class="n">1</span><span class="t">신청 기간은 <b>딱 2주</b>. 6월 22일 출시, <b>7월 3일까지</b> 신청해야 놓치지 않아요.</span></div>
        <div class="pt"><span class="n">2</span><span class="t">매달 넣는 돈에 정부가 <b>최대 12%</b>까지 얹어줘요. 소득·재직 조건에 따라 <b>0 · 6 · 12%</b>로 갈려요.</span></div>
        <div class="pt"><span class="n">3</span><span class="t">알바·계약직·맞벌이도 OK. 고용형태와 상관없이 <b>작년 소득만 잡히면</b> 가입할 수 있어요.</span></div>
      </div>
    </section>

    <!-- 신청 바로가기 (전면 CTA) -->
    <a class="applybar" href="https://fill4young.kinfa.or.kr/yfs/main" target="_blank" rel="noopener">
      <span class="t">지금 바로 신청하세요<small>신청 기간 6월 22일 ~ 7월 3일 (2주) · 첫 주는 출생연도 끝자리 5부제</small></span>
      <span class="btn">신청 바로가기 →</span>
    </a>

    <!-- 상품 핵심 스펙 -->
    <section class="card" id="sec-spec">
      <div class="seclabel"><span class="num">i</span><span class="txt">상품 한눈에</span></div>
      <h2>청년미래적금이 뭔가요? (한 줄 요약)</h2>
      <p class="secteaser">만 19~34세 청년이 월 최대 50만 원을 3년간 모으면, 정부 기여금(6~12%)과 비과세 혜택으로 <b style="color:var(--accent)">최대 약 2,200만 원</b>의 목돈을 만드는 정책형 적금이에요.</p>
      <div class="spec" style="margin-top:var(--sp-5)">
        <div class="r"><div class="k">가입 대상</div><div class="v"><b>만 19~34세</b> 청년 <span class="x">(병역 이행 기간은 연령 계산에서 제외)</span></div></div>
        <div class="r"><div class="k">납입 한도</div><div class="v">월 <b>최대 50만 원</b> <span class="x">· 자유적립식(연 최대 600만 원)</span></div></div>
        <div class="r"><div class="k">가입 기간</div><div class="v"><b>3년</b> (36개월) 만기</div></div>
        <div class="r"><div class="k">정부 기여금</div><div class="v">매월 납입금의 <b>6%</b>(일반형) ~ <b>12%</b>(우대형)</div></div>
        <div class="r"><div class="k">추가 혜택</div><div class="v">이자소득세 <b>전액 비과세</b></div></div>
        <div class="r"><div class="k">예상 수령액</div><div class="v">원금 1,800만 원 + 기여금·이자 → <b>약 2,000만~2,200만 원</b> <span class="x">(유형·금리에 따라 차이)</span></div></div>
      </div>
    </section>

    <!-- 구간 1: 소득 및 가구요건 -->
    <section class="card" id="sec-join">
      <div class="seclabel"><span class="num">1</span><span class="txt">소득 및 가구요건</span></div>
      <h2>청년미래적금 가입조건 (소득·가구요건)</h2>
      <p class="secteaser">누가 가입할 수 있는지, 소득·가구 기준부터 확인하세요. 조건에 따라 정부기여금이 차등 적용돼요.</p>
      <ul class="qa">
        <li>
          <span class="tri">▲</span>
          <div class="body">
            <b class="hl">나이 요건 (만 19~34세)</b>
            가입신청일 기준 <b>만 19세~34세</b> 청년이면 가입할 수 있어요.
            <div class="subnote"><b>병역 이행 기간</b>은 연령 계산에서 제외돼, 군필 남성은 최대 만 40세까지 가능해요.</div>
          </div>
        </li>
        <li>
          <span class="tri">▲</span>
          <div class="body">
            <b class="hl">소득 상한선부터 확인</b>
            근로자라면 <b>총급여 7,500만 원 이하</b>(종합소득 6,300만 원), 사장님이라면 <b>연매출 3억 원 이하</b>. 여기에 <b>가구 중위소득 200% 이하</b>까지 맞으면 돼요.
            <div class="subnote"><b>2025년</b> 소득·매출을 기준으로 심사해요. 직전연도 소득이 잡히지 않으면 가입할 수 없어요.</div>
          </div>
        </li>
        <li>
          <span class="tri">▲</span>
          <div class="body">
            <b class="hl">맞벌이 부부, 둘 다 가입 OK</b>
            요건만 맞으면 부부가 <b>각자 따로</b> 신청할 수 있어요.
            <div class="subnote"><b>2인 가구</b>는 중위소득 문턱을 일반형 200%→<b>250%</b>, 우대형 150%→<b>200%</b>로 낮춰줘요.</div>
          </div>
        </li>
        <li>
          <span class="tri">▲</span>
          <div class="body">
            <b class="hl">알바·일용직·계약직도 OK</b>
            고용형태와 상관없이, <b>작년 국세청 소득</b>만 확인되면 가입할 수 있어요.
          </div>
        </li>
        <li>
          <span class="tri">▲</span>
          <div class="body">
            <b class="hl">이런 소득도 인정돼요</b>
            사관생도·사회복무요원 등 <b>복무 중 급여</b>나 <b>육아휴직급여(수당)</b>가 있으면 예외적으로 신청할 수 있어요.
          </div>
        </li>
        <li>
          <span class="tri">▲</span>
          <div class="body">
            <b class="hl">가구원은 어디까지?</b>
            등본상 <b>부모·자녀·배우자·미성년 형제자매</b>까지 포함돼요.
            <div class="subnote">조부모는 원칙적으로 제외돼요. 청년이 조부모를 <b>부양하는 경우에만</b> 인정되며 증빙서류가 필요해요.</div>
          </div>
        </li>
      </ul>
    </section>

    <!-- 구간 2: 정부기여금 -->
    <section class="card" id="sec-gov">
      <div class="seclabel"><span class="num">2</span><span class="txt">정부기여금</span></div>
      <h2>청년미래적금 정부기여금, 얼마나 받나? (6% vs 12%)</h2>
      <p class="secteaser">소득·재직 조건에 따라 세 가지 유형으로 나뉘어요.</p>
      <div class="tiers">
        <div class="tier t0">
          <div class="name">비과세 혜택만</div>
          <div class="rate">0<small>%</small></div>
          <div class="desc">정부기여금 없이 이자소득세 비과세만 제공</div>
        </div>
        <div class="tier t1">
          <div class="name">일반형</div>
          <div class="rate">6<small>%</small></div>
          <div class="desc">매월 납입금의 6%를 정부가 매칭</div>
        </div>
        <div class="tier t2">
          <div class="name">우대형</div>
          <div class="rate">12<small>%</small></div>
          <div class="desc">매월 납입금의 12%를 정부가 매칭</div>
        </div>
      </div>

      <div class="crit">
        <div class="row">
          <div class="h"><span class="pill" style="color:var(--text-muted);background:var(--bg-inset)">비과세</span></div>
          <div class="c">총급여 6,000만 원(종합소득 4,800만 원) 초과 ~ 7,500만 원(6,300만 원) 이하 + 가구 중위소득 200% 이하</div>
        </div>
        <div class="row">
          <div class="h"><span class="pill b">일반형 6%</span></div>
          <div class="c">
            (소상공인) 연매출 3억 원 이하 + 중위소득 200% 이하<br>
            (일반소득자) 총급여 6,000만 원 이하 + 중위소득 200% 이하
          </div>
        </div>
        <div class="row">
          <div class="h"><span class="pill g">우대형 12%</span></div>
          <div class="c">
            (소상공인) 연매출 1억 원 이하 + 중위소득 150% 이하<br>
            (중소기업) 만기 한 달 전까지 총 29개월 이상 재직 + 이직 2회 이하<br>
            (신규 취업자) 총급여 6,000만 원 이하 + 중위소득 200% 이하<br>
            (재직자) 총급여 3,600만 원 이하 + 중위소득 150% 이하
          </div>
        </div>
      </div>

      <ul class="qa" style="margin-top:var(--sp-6)">
        <li><span class="tri">▲</span><div class="body"><b class="hl">따로 신청 안 해도 돼요</b>일반형·우대형은 <b>별도 신청 없이</b> 서민금융진흥원이 요건을 확인해 자동으로 정해줘요.</div></li>
        <li><span class="tri">▲</span><div class="body"><b class="hl">우대형은 '현재 재직'이 조건</b>중소기업 우대형(재직자·신규 취업자)은 <b>지금 중소기업에 다니고 있어야</b> 가입할 수 있어요.</div></li>
        <li><span class="tri">▲</span><div class="body"><b class="hl">연봉 올라도 그대로</b>가입 후 소득이 늘어도 정부기여금 <b>매칭비율은 바뀌지 않아요.</b></div></li>
      </ul>
    </section>

    <!-- 내 유형 찾기 -->
    <section class="card" id="sec-type">
      <div class="seclabel"><span class="num">✓</span><span class="txt">내 유형 찾기</span></div>
      <h2>청년미래적금, 나에게 맞는 유형은?</h2>
      <p class="secteaser">대표적인 경우로 빠르게 가늠해 보세요. (실제 유형은 서민금융진흥원 심사로 확정돼요.)</p>
      <div class="personas">
        <div class="persona">
          <div class="role">사회초년생</div>
          <div class="situ">작년에 처음 취직했고, 지금 중소기업 재직 중 · 총급여 3,600만 원 이하</div>
          <div class="rec"><span class="lab">추천</span><span class="badge g">우대형 12%</span></div>
        </div>
        <div class="persona">
          <div class="role">일반 직장인</div>
          <div class="situ">총급여 6,000만 원 이하 · 가구 중위소득 200% 이내</div>
          <div class="rec"><span class="lab">추천</span><span class="badge b">일반형 6%</span></div>
        </div>
        <div class="persona">
          <div class="role">동네 가게 사장님</div>
          <div class="situ">영세 소상공인 · 연매출 1억 원 이하(중위 150% 이내)면 우대형, 3억 원 이하면 일반형</div>
          <div class="rec"><span class="lab">추천</span><span class="badge g">우대형</span><span class="badge b">일반형</span></div>
        </div>
        <div class="persona">
          <div class="role">소득 상한 근처</div>
          <div class="situ">총급여 6,000만 ~ 7,500만 원 구간 · 중위소득 200% 이내</div>
          <div class="rec"><span class="lab">추천</span><span class="badge n">비과세형</span></div>
        </div>
      </div>
    </section>

    <!-- 청년미래적금 vs 청년도약계좌 비교 -->
    <section class="card" id="sec-compare">
      <div class="seclabel"><span class="num">vs</span><span class="txt">청년도약계좌와 비교</span></div>
      <h2>청년미래적금 vs 청년도약계좌, 뭐가 다를까?</h2>
      <p class="secteaser">둘 중 하나만 가입돼요. 기간이 짧고 매칭률이 높은 적금 vs 길고 큰 목돈의 계좌, 성향에 맞게 고르세요.</p>
      <div class="tbl-scroll">
        <table class="cmp">
          <thead>
            <tr><th>구분</th><th class="p1">청년미래적금</th><th>청년도약계좌</th></tr>
          </thead>
          <tbody>
            <tr><td class="lab">납입 한도</td><td class="hl1">월 최대 50만 원</td><td>월 최대 70만 원</td></tr>
            <tr><td class="lab">만기</td><td class="hl1">3년 (36개월)</td><td>5년</td></tr>
            <tr><td class="lab">정부 매칭</td><td class="hl1">6%(일반)·12%(우대)</td><td>납입액 6% <span class="muted-num">(소득 차등)</span></td></tr>
            <tr><td class="lab">최대 수령액</td><td class="hl1">약 2,000~2,200만 원</td><td>약 5,000만 원</td></tr>
            <tr><td class="lab">가입 소득</td><td>개인소득 7,500만 원 이하</td><td>개인소득 7,500만 원 이하</td></tr>
          </tbody>
        </table>
      </div>
      <ul class="qa" style="margin-top:var(--sp-5)">
        <li><span class="tri">▲</span><div class="body"><b class="hl">갈아타기는 '6월에 단 1회'</b>청년도약계좌 가입자가 요건을 충족하면 청년미래적금으로 갈아탈 수 있어요. 단, <b>2026년 6월 최초 신청 기간에만</b> 가능하며 중복 가입은 안 돼요.</div></li>
      </ul>
    </section>

    <!-- 구간 3: 중소기업 우대형 -->
    <section class="card" id="sec-sme">
      <div class="seclabel"><span class="num">3</span><span class="txt">중소기업 우대형</span></div>
      <h2>청년미래적금 중소기업 우대형 조건</h2>
      <p class="secteaser">중소기업에 다닌다면 신청 전 이 6가지를 꼭 확인하세요.</p>
      <ul class="qa">
        <li><span class="tri">▲</span><div class="body"><b class="hl">올해 첫 취업이라면 내년부터</b>2026년에 처음 취직했다면 2026년 소득이 확정되는 <b>내년부터</b> 신청할 수 있어요.</div></li>
        <li><span class="tri">▲</span><div class="body"><b class="hl">이런 곳은 '중소기업'이 아니에요</b>비영리법인이 운영하는 <b>사립학교·유치원, 국가기관 연구소, 공공기관</b> 등은 해당하지 않아요.
          <div class="subnote">기준: 중소기업기본법 제2조 제1항</div>
        </div></li>
        <li><span class="tri">▲</span><div class="body"><b class="hl">고용형태는 안 따져요</b><b>정규직·계약직 무관</b>하게 중소기업 재직으로 인정돼요.
          <div class="subnote">소득요건을 충족해도 <b>중견기업 등</b> 중소기업 재직자가 아니면 우대형은 불가</div>
        </div></li>
        <li><span class="tri">▲</span><div class="body"><b class="hl">중간에 퇴사하면?</b>만기 한 달 전까지 재직 기간이 <b>29개월 미만</b>이면, 전 기간에 대해 일반형(정부기여금 6%)이 적용돼요.</div></li>
        <li><span class="tri">▲</span><div class="body"><b class="hl">'신규 취업자' 기준</b>가입신청일(2026년 6월~) 기준 <b>직전연도(2025년)에 최초 취업</b>하고, 고용보험상 현재 중소기업 재직이 확인되어야 해요.</div></li>
        <li><span class="tri">▲</span><div class="body"><b class="hl">재취업도 인정</b>2025년에 처음 취업·퇴사 후 2026년 다시 중소기업에 들어간 경우도 <b>신규 취업자로 인정</b>해요.</div></li>
      </ul>
    </section>

    <!-- 구간 4: 소상공인 -->
    <section class="card" id="sec-owner">
      <div class="seclabel"><span class="num">4</span><span class="txt">소상공인</span></div>
      <h2>청년미래적금 소상공인 가입 조건</h2>
      <p class="secteaser">사장님이라면 근로자와 다른 이 점들을 챙기세요.</p>
      <ul class="qa">
        <li><span class="tri">▲</span><div class="body"><b class="hl">폐업해도 우대형 유지</b>소상공인 우대형으로 가입했다면, 이후 <b>폐업하거나 근로소득자로 바뀌어도</b> 우대형 혜택은 그대로 유지돼요.</div></li>
        <li><span class="tri">▲</span><div class="body"><b class="hl">매출 기준 못 맞춰도 길이 있어요</b>매출액 기준에 못 미치더라도, <b>종합소득 기준</b>을 충족하면 일반형으로 가입할 수 있어요.</div></li>
      </ul>
    </section>

    <!-- FAQ -->
    <section class="card" id="sec-faq">
      <div class="seclabel"><span class="num">?</span><span class="txt">자주 묻는 질문 FAQ</span></div>
      <h2>청년미래적금 자주 묻는 질문 (FAQ)</h2>
      <div class="faq" style="margin-top:var(--sp-6)">
        <details open>
          <summary><span class="q">Q.</span><span>부부가 둘 다 가입할 수 있나요?</span><span class="plus">+</span></summary>
          <div class="ans">네. 각자 요건을 충족하면 <b>따로따로 신청</b>할 수 있어요. 2인 가구는 중위소득 기준도 완화돼(일반형 250%·우대형 200%) 문턱이 낮아집니다.</div>
        </details>
        <details>
          <summary><span class="q">Q.</span><span>아르바이트 소득만 있어도 가입되나요?</span><span class="plus">+</span></summary>
          <div class="ans">돼요. 고용형태와 상관없이 <b>작년(2025년) 국세청에 잡힌 소득</b>만 있으면 신청할 수 있어요.</div>
        </details>
        <details>
          <summary><span class="q">Q.</span><span>가입 후 연봉이 오르면 정부 지원이 줄어드나요?</span><span class="plus">+</span></summary>
          <div class="ans">아니요. 가입 후 소득이 늘어도 정부기여금 <b>매칭비율은 그대로 유지</b>돼요.</div>
        </details>
        <details>
          <summary><span class="q">Q.</span><span>우대형으로 가입했는데 중간에 퇴사하면요?</span><span class="plus">+</span></summary>
          <div class="ans">만기 한 달 전까지 중소기업 재직 기간이 <b>29개월 미만</b>이면, 전 기간에 대해 일반형(정부기여금 6%)이 적용돼요.</div>
        </details>
        <details>
          <summary><span class="q">Q.</span><span>공무원·공공기관 직원도 중소기업 우대형이 되나요?</span><span class="plus">+</span></summary>
          <div class="ans">안 돼요. 사립학교·유치원, 국가기관 연구소, <b>공공기관 등은 중소기업에 해당하지 않아요.</b></div>
        </details>
        <details>
          <summary><span class="q">Q.</span><span>사업을 접으면 우대형 혜택이 사라지나요?</span><span class="plus">+</span></summary>
          <div class="ans">아니요. 소상공인 우대형은 폐업하거나 근로소득자로 바뀌어도 <b>그대로 유지</b>돼요.</div>
        </details>
        <details>
          <summary><span class="q">Q.</span><span>조부모 소득도 가구원에 포함되나요?</span><span class="plus">+</span></summary>
          <div class="ans">원칙적으로 <b>제외</b>돼요. 다만 청년이 조부모를 부양하는 경우에만 가구원으로 인정되며 증빙서류가 필요해요.</div>
        </details>
        <details>
          <summary><span class="q">Q.</span><span>일반형·우대형은 따로 신청해야 하나요?</span><span class="plus">+</span></summary>
          <div class="ans">아니요. <b>별도 신청 없이</b> 서민금융진흥원이 요건을 확인해 유형을 자동으로 정해줘요.</div>
        </details>
        <details>
          <summary><span class="q">Q.</span><span>청년미래적금과 청년도약계좌, 뭐가 다른가요?</span><span class="plus">+</span></summary>
          <div class="ans">납입 한도(<b>50만 원</b> vs 70만 원), 만기(<b>3년</b> vs 5년), 정부 매칭(6·12% vs 6%), 최대 수령액(약 2,200만 원 vs 약 5,000만 원)이 달라요. 둘 중 하나만 가입할 수 있고, 갈아타기는 2026년 6월에 단 한 번 가능해요.</div>
        </details>
        <details>
          <summary><span class="q">Q.</span><span>만 35세인데 가입할 수 있나요?</span><span class="plus">+</span></summary>
          <div class="ans">원칙은 만 19~34세예요. 다만 <b>병역 이행 기간(최대 6년)</b>은 연령 계산에서 빠지기 때문에, 군필 남성은 최대 만 40세까지 가입할 수 있어요.</div>
        </details>
        <details>
          <summary><span class="q">Q.</span><span>중간에 해지하면 정부 기여금은 어떻게 되나요?</span><span class="plus">+</span></summary>
          <div class="ans">중도해지 시 그동안 받은 <b>정부 기여금은 반환</b>해야 하고, 원금과 은행 이자만 돌려받아요. 3년 만기까지 유지하는 것이 가장 유리해요.</div>
        </details>
      </div>
    </section>

    <!-- CTA -->
    <div class="cta">
      <h2>궁금한 점이 더 있으신가요?</h2>
      <p>홈페이지와 콜센터에서 바로 확인하세요.</p>
      <div class="lines">
        <div class="line">청년금융 콜센터 <a href="tel:1397" style="color:#fff;font-weight:var(--fw-extrabold);text-decoration:none">☎ 1397 → 3</a></div>
      </div>
      <a class="pillbtn" href="https://fill4young.kinfa.or.kr/yfs/main" target="_blank" rel="noopener">청년미래적금 홈페이지 →</a>
    </div>

    <div class="foot">
      <div class="org">금융위원회 · 서민금융진흥원</div>
      <div style="margin-top:6px">자료출처 = 정책브리핑 www.korea.kr</div>
    </div>

  </article>
`;

export const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "청년미래적금, 부부가 둘 다 가입할 수 있나요?", acceptedAnswer: { "@type": "Answer", text: "네. 각자 요건을 충족하면 따로따로 신청할 수 있어요. 본인·배우자 2인 가구는 중위소득 기준도 완화돼(일반형 250%·우대형 200%) 문턱이 낮아집니다." } },
    { "@type": "Question", name: "아르바이트 소득만 있어도 청년미래적금에 가입되나요?", acceptedAnswer: { "@type": "Answer", text: "가능해요. 고용형태와 상관없이 직전연도(2025년) 국세청에 신고된 소득만 있으면 신청할 수 있어요." } },
    { "@type": "Question", name: "청년미래적금 가입 후 연봉이 오르면 정부 지원이 줄어드나요?", acceptedAnswer: { "@type": "Answer", text: "아니요. 가입 후 소득이 늘어도 정부기여금 매칭비율은 그대로 유지돼요." } },
    { "@type": "Question", name: "우대형으로 가입했는데 중간에 퇴사하면 어떻게 되나요?", acceptedAnswer: { "@type": "Answer", text: "만기 한 달 전까지 중소기업 재직 기간이 29개월 미만이면, 전 기간에 대해 일반형(정부기여금 6%)이 적용돼요." } },
    { "@type": "Question", name: "공무원·공공기관 직원도 중소기업 우대형이 되나요?", acceptedAnswer: { "@type": "Answer", text: "안 돼요. 사립학교·유치원, 국가기관 연구소, 공공기관 등은 중소기업에 해당하지 않아요." } },
    { "@type": "Question", name: "사업을 접으면 소상공인 우대형 혜택이 사라지나요?", acceptedAnswer: { "@type": "Answer", text: "아니요. 소상공인 우대형은 폐업하거나 근로소득자로 바뀌어도 그대로 유지돼요." } },
    { "@type": "Question", name: "조부모 소득도 청년미래적금 가구원에 포함되나요?", acceptedAnswer: { "@type": "Answer", text: "원칙적으로 제외돼요. 다만 청년이 조부모를 부양하는 경우에만 가구원으로 인정되며 증빙서류가 필요해요." } },
    { "@type": "Question", name: "일반형·우대형은 따로 신청해야 하나요?", acceptedAnswer: { "@type": "Answer", text: "아니요. 별도 신청 없이 서민금융진흥원이 가입요건을 확인해 유형을 자동으로 정해줘요." } },
    { "@type": "Question", name: "청년미래적금과 청년도약계좌, 무엇이 다른가요?", acceptedAnswer: { "@type": "Answer", text: "납입 한도(월 50만 원 vs 70만 원), 만기(3년 vs 5년), 정부 매칭(6·12% vs 6%), 최대 수령액(약 2,200만 원 vs 약 5,000만 원)이 달라요. 둘 중 하나만 가입할 수 있으며, 갈아타기는 2026년 6월에 단 한 번 가능해요." } },
    { "@type": "Question", name: "만 35세인데 청년미래적금에 가입할 수 있나요?", acceptedAnswer: { "@type": "Answer", text: "원칙적으로 만 19~34세가 대상이에요. 다만 병역 이행 기간(최대 6년)은 연령 계산에서 제외되어, 군필 남성은 최대 만 40세까지 가입할 수 있어요." } },
    { "@type": "Question", name: "중간에 해지하면 정부 기여금은 어떻게 되나요?", acceptedAnswer: { "@type": "Answer", text: "중도해지 시 그동안 받은 정부 기여금은 반환해야 하며, 원금과 은행 이자만 돌려받아요. 3년 만기까지 유지하는 것이 가장 유리해요." } },
  ],
};
