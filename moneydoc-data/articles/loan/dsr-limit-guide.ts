// 자동 생성: scripts/convert-previews.mjs — 직접 수정하지 말 것
// 원본: public/_preview/4-스트레스DSR.html
export const meta = {
  title: "스트레스 DSR 3단계 계산, 대출 한도 15.5% 줄어든 이유",
  description: "스트레스 DSR 3단계 적용으로 대출 한도가 15.5% 줄었습니다. 1·2·3단계 스트레스 금리 0.38%·0.75%·1.5%와 연봉별 한도 감소액, DSR에서 제외되는 대출까지 금융위 자료로 정리했습니다.",
  datePublished: "2026-09-01",
  dateModified: "2026-09-01",
  url: "https://moneydoc.kr/loan/dsr-limit-guide/",
};

export const widgetKey = "dsr";

export const widgetHtml = `<div class="ax-wg" id="wg1">
<div class="ax-wg-h"><b>스트레스 DSR 적용 전후 한도 비교</b>
<span>연봉과 기존 대출을 넣으면 단계별로 한도가 얼마나 줄어드는지 나옵니다</span></div>
<div class="ax-wg-in">
  <label class="ax-wg-f"><em>연소득 (원)</em><input type="number" id="inc" value="60000000" step="1000000" min="0"></label>
  <label class="ax-wg-f"><em>기존 대출 월 원리금 (원)</em><input type="number" id="debt" value="0" step="100000" min="0"></label>
  <label class="ax-wg-f"><em>대출 기간 (년)</em><input type="number" id="yrs" value="30" step="1" min="1" max="40"></label>
  <label class="ax-wg-f"><em>대출 금리 (%)</em><input type="number" id="rate" value="4.5" step="0.1" min="0"></label>
  <label class="ax-wg-f"><em>DSR 한도</em>
    <select id="lim"><option value="0.4">40% (은행권)</option><option value="0.5">50% (제2금융권)</option></select></label>
</div>
<div class="ax-wg-out" id="out"></div>
<p class="ax-wg-note">스트레스 금리는 금융위 「3단계 스트레스 DSR 시행방안」의 0.38%(1단계) · 0.75%(2단계) · 1.50%(3단계)를 적용했습니다. 실제 은행 심사에는 대출 종류·지역별 세부 기준이 더해질 수 있으니 <a href="/loan/dsr-limit/">DSR 계산기</a>에서 조건을 맞춰 확인하세요.</p>
</div>`;

export const htmlBefore = `<h1>스트레스 DSR 3단계 계산, 대출 한도 15.5% 줄어든 이유</h1>
<p class="ax-by">MoneyDoc 편집팀 · 2026년 9월 1일 기준 · 약 8분</p>

<svg class="ax-hero" viewBox="0 0 1100 563" role="img" aria-label="스트레스 DSR 3단계 — 가산금리 1.5%로 대출 한도 15.5% 감소">
<rect width="1100" height="563" fill="#f7f2ea"/>
<path d="M820 0h280v240a60 60 0 0 1-60 60H820z" fill="#f6e3de"/>
<circle cx="1012" cy="72" r="46" fill="#f2d9d2" opacity=".55"/>
<rect x="72" y="160" width="104" height="42" rx="9" fill="#c4452f"/>
<text x="124" y="189" font-size="19" font-weight="800" text-anchor="middle" fill="#fff" letter-spacing="-.5">대출·한도</text>
<text x="72" y="282" font-size="57" font-weight="800" fill="#2b2723" letter-spacing="-2.6">스트레스 DSR</text>
<rect x="70" y="312" width="196" height="26" fill="#f2cfc8"/>
<text x="72" y="349" font-size="57" font-weight="800" fill="#c4452f" letter-spacing="-2.6">3단계 시행</text>
<text x="72" y="400" font-size="21" font-weight="700" fill="#6f6858" letter-spacing="-.8">가산금리 1.5% · 한도 15.5% 감소</text>
<rect x="0" y="545" width="1100" height="18" fill="#c4452f"/>
<g transform="translate(640 150)">
  <ellipse cx="200" cy="292" rx="175" ry="19" fill="#e8ded0" opacity=".55"/>
  <rect x="36" y="60" width="120" height="210" rx="9" fill="#d9bd6a" stroke="#6b6255" stroke-width="4"/>
  <text x="96" y="176" font-size="19" font-weight="800" text-anchor="middle" fill="#6b6255">미적용</text>
  <rect x="230" y="126" width="120" height="144" rx="9" fill="#f2cfc8" stroke="#c4452f" stroke-width="4"/>
  <text x="290" y="206" font-size="19" font-weight="800" text-anchor="middle" fill="#c4452f">3단계</text>
  <path d="M172 96 L214 132" fill="none" stroke="#c4452f" stroke-width="6" stroke-linecap="round"/>
  <path d="M214 132 l-16 -3 m16 3 l-3 -16" fill="none" stroke="#c4452f" stroke-width="6" stroke-linecap="round"/>
  <text x="200" y="42" font-size="21" font-weight="800" text-anchor="middle" fill="#c4452f">−15.5%</text>
</g>
</svg>

<p class="ax-intro">2025년 7월 1일부터 <b>스트레스 DSR 3단계</b>가 시행됐습니다. 실제 금리에 <b>1.5%p</b>를 얹어 상환능력을 심사하기 때문에, 같은 연봉이어도 빌릴 수 있는 금액이 줄어듭니다. 연봉이 얼마든 감소율은 <b>약 15.5%</b>로 같습니다. 연봉 6,000만원이면 3억 9,472만원에서 <b>3억 3,358만원</b>으로 6,114만원이 깎입니다.</p>

<a class="ax-cta" href="/loan/dsr-limit/">
<span><b>내 DSR 한도 바로 계산하기</b><i>연봉·기존대출·만기만 넣으면 됩니다</i></span>
<em>DSR 계산하기</em></a>

<div class="ax-toc"><b>이 글에서는</b><a href="#m1">구조 2단계</a><a href="#m2">한도 감소</a><a href="#m3">제외 대출</a><a href="#tips">알아두면 좋은 것</a><a href="#faq">자주 묻는 질문</a><a href="#src">근거 자료</a></div>`;

export const htmlAfter = `<div class="ax-mh" id="m1"><b>1단계 — 구조</b><span>왜 한도가 줄어드나</span></div>

<div class="ax-st"><div class="ax-n">1</div><div class="ax-sb">
<h3>스트레스 DSR이 뭔가요, 왜 한도가 줄어드나요</h3>
<p>DSR은 연소득 대비 갚아야 할 모든 대출의 연간 원리금 비율입니다. 은행권은 <b>40%</b>가 한도입니다. 스트레스 DSR은 여기에 <b>앞으로 금리가 오를 수 있다</b>는 가정을 더해, 실제 금리보다 높은 금리로 원리금을 계산합니다.</p>
<figure class="ax-ig">
<svg viewBox="0 0 660 170" role="img" aria-label="실제 금리에 스트레스 금리를 더한 금리로 원리금을 계산해 한도를 정합니다">
<text x="0" y="18" font-size="13" font-weight="700" fill="currentColor" letter-spacing="-.3">한도가 정해지는 순서</text>
<rect x="0" y="44" width="150" height="52" rx="8" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".55"/>
<text x="75" y="68" font-size="12.5" font-weight="700" text-anchor="middle" fill="currentColor">연소득 × 40%</text>
<text x="75" y="86" font-size="10.5" text-anchor="middle" fill="currentColor" opacity=".6">÷ 12 = 월 가용 원리금</text>
<line x1="150" y1="70" x2="196" y2="70" stroke="currentColor" stroke-width="2" opacity=".6" stroke-linecap="round"/>
<polygon points="188,65 188,75 196,70" fill="currentColor" opacity=".6"/>
<rect x="196" y="44" width="180" height="52" rx="8" fill="none" stroke="#c4452f" stroke-width="1.5"/>
<text x="286" y="68" font-size="12.5" font-weight="700" text-anchor="middle" fill="#c4452f">실제금리 + 1.5%p</text>
<text x="286" y="86" font-size="10.5" text-anchor="middle" fill="#c4452f" opacity=".85">스트레스 금리 가산</text>
<line x1="376" y1="70" x2="422" y2="70" stroke="currentColor" stroke-width="2" opacity=".6" stroke-linecap="round"/>
<polygon points="414,65 414,75 422,70" fill="currentColor" opacity=".6"/>
<rect x="422" y="44" width="238" height="52" rx="8" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".55"/>
<text x="541" y="68" font-size="12.5" font-weight="700" text-anchor="middle" fill="currentColor">그 금리로 갚을 수 있는 원금</text>
<text x="541" y="86" font-size="10.5" text-anchor="middle" fill="currentColor" opacity=".6">= 대출 한도</text>
<text x="0" y="128" font-size="11.5" font-weight="600" fill="currentColor" opacity=".6" letter-spacing="-.3">금리를 높게 잡을수록 같은 월 상환액으로 감당할 수 있는 원금이 줄어듭니다</text>
<text x="0" y="150" font-size="11.5" font-weight="600" fill="currentColor" opacity=".6" letter-spacing="-.3">실제로 내는 이자가 늘어나는 것이 아니라, 심사용 금리만 높아지는 것입니다</text>
</svg>
<figcaption>은행업감독규정 제29조의2 (DSR 산정) · 금융위원회 3단계 스트레스 DSR 시행방안</figcaption>
</figure>
<div class="ax-warn"><span>주의</span><p>스트레스 금리는 <b>심사할 때만</b> 쓰는 가상의 금리입니다. 대출이 실행되면 실제 약정 금리로 이자를 냅니다. 한도만 줄어들 뿐 이자가 더 나가지는 않습니다.</p></div>
</div></div>

<div class="ax-st"><div class="ax-n">2</div><div class="ax-sb">
<h3>스트레스 DSR 1단계 2단계 3단계 적용 기준</h3>
<p>스트레스 금리는 과거 5년 중 가장 높았던 가계대출 금리와 현재 금리의 차이로 정하되 <b>하한 1.5%·상한 3.0%</b>를 둡니다. 여기에 단계별 적용 비율을 곱합니다.</p>
<div class="ax-tw"><table>
<thead><tr><th>단계</th><th>시행</th><th>적용 비율</th><th>스트레스 금리</th><th>적용 대상</th></tr></thead>
<tbody>
<tr><td>1단계</td><td>2024. 2. 26.</td><td>25%</td><td>0.38%p</td><td>은행권 주택담보대출</td></tr>
<tr><td>2단계</td><td>2024. 9. 1.</td><td>50%</td><td>0.75%p</td><td>은행권 주담대·신용대출, 2금융권 주담대</td></tr>
<tr class="ax-hi"><td>3단계</td><td>2025. 7. 1.</td><td>100%</td><td><b>1.50%p</b></td><td>전 금융권 가계대출</td></tr>
</tbody></table>
<p class="ax-tn">금융위원회 「3단계 스트레스 DSR 시행방안」 기준. 1단계 0.38%는 하한금리 1.5%에 25%를 적용해 반올림한 값입니다.</p></div>
<div class="ax-cp">
  <div><em>미적용 · 연 6천만 · 30년 · 4.5%</em><b>394,722,318원</b><i>적용금리 4.50%</i></div>
  <div><em>1단계 (0.38%p)</em><b>377,706,440원</b><i>적용금리 4.88%</i></div>
  <div><em>2단계 (0.75%p)</em><b>362,185,185원</b><i>적용금리 5.25%</i></div>
  <div class="ax-hi"><em>3단계 (1.50%p)</em><b>333,583,229원</b><i>적용금리 6.00%</i></div>
</div>
<p class="ax-law-l">금융위원회 3단계 스트레스 DSR 시행방안 (2025.5.20) · 2025.7.1 시행</p>
</div></div>

<div class="ax-mh ax-b" id="m2"><b>2단계 — 한도 감소</b><span>연봉별 실제 금액</span></div>

<div class="ax-st ax-b2"><div class="ax-n">3</div><div class="ax-sb">
<h3>연봉별 대출 한도는 얼마나 줄었나요</h3>
<p>대출기간 30년, 금리 4.5%, DSR 40%, 기존 대출이 없는 경우입니다.</p>
<div class="ax-tw"><table>
<thead><tr><th>연소득</th><th>스트레스 미적용</th><th>3단계 적용</th><th>감소액</th><th>감소율</th></tr></thead>
<tbody>
<tr><td>4,000만</td><td>263,148,146</td><td>222,388,764</td><td>−40,759,382</td><td>15.5%</td></tr>
<tr><td>5,000만</td><td>328,935,331</td><td>277,986,080</td><td>−50,949,251</td><td>15.5%</td></tr>
<tr class="ax-hi"><td>6,000만</td><td>394,722,318</td><td>333,583,229</td><td>−61,139,089</td><td>15.5%</td></tr>
<tr><td>7,000만</td><td>460,509,305</td><td>389,180,378</td><td>−71,328,927</td><td>15.5%</td></tr>
<tr><td>8,000만</td><td>526,296,490</td><td>444,777,694</td><td>−81,518,796</td><td>15.5%</td></tr>
<tr><td>1억</td><td>657,870,464</td><td>555,971,992</td><td>−101,898,472</td><td>15.5%</td></tr>
</tbody></table>
<p class="ax-tn">단위: 원. 감소율이 연소득과 무관하게 15.5%로 같은 이유는, DSR 한도가 소득에 비례하고 스트레스 금리는 모두에게 동일하게 붙기 때문입니다.</p></div>
<p class="ax-nt">기존 대출이 있으면 감소폭이 훨씬 커집니다. 연소득 6,000만원 기준으로 기존 대출 월 상환액이 얼마냐에 따라 한도가 이렇게 달라집니다.</p>
<div class="ax-tw"><table>
<thead><tr><th>기존 대출 월 원리금</th><th>월 가용 원리금</th><th>3단계 한도</th></tr></thead>
<tbody>
<tr><td>없음</td><td>2,000,000</td><td>333,583,229</td></tr>
<tr><td>30만원</td><td>1,700,000</td><td>283,545,744</td></tr>
<tr><td>50만원</td><td>1,500,000</td><td>250,187,422</td></tr>
<tr class="ax-hi"><td>100만원</td><td>1,000,000</td><td><b>166,791,614</b></td></tr>
</tbody></table>
<p class="ax-tn">월 100만원짜리 기존 대출이 있으면 한도가 절반으로 떨어집니다. 신용대출·자동차할부도 모두 DSR에 잡힙니다.</p></div>
<div class="ax-btns">
<a class="ax-btn" href="/loan/dsr-limit/"><b>DSR 계산기</b><span>내 조건으로 한도 계산</span></a>
<a class="ax-btn" href="/loan/mortgage-loan-limit/"><b>주담대 한도 계산기</b><span>LTV·DSR 동시 적용</span></a>
</div>
</div></div>

<div class="ax-mh" id="m3"><b>3단계 — 제외 대출</b><span>DSR에 안 잡히는 것</span></div>

<div class="ax-st"><div class="ax-n">4</div><div class="ax-sb">
<h3>DSR에 포함되지 않는 대출은 무엇인가요</h3>
<p>모든 대출이 DSR에 잡히는 것은 아닙니다. 서민·취약계층 보호와 담보가 확실한 대출은 산정에서 빠집니다.</p>
<ul class="ax-ck">
<li>전세자금대출</li><li>중도금·이주비대출</li><li>서민금융상품(햇살론·새희망홀씨)</li>
<li>300만원 이하 소액신용대출</li><li>예·적금담보대출</li><li>유가증권담보대출</li><li>주택연금</li>
</ul>
<div class="ax-warn"><span>주의</span><p>전세대출이 무조건 빠지는 것은 아닙니다. 2025년 10월 29일부터 <b>1주택자가 수도권·규제지역에서 임차인으로 전세대출을 받는 경우</b>에는 <b>이자상환분이 DSR에 반영</b>됩니다. 무주택자이거나 지방 주택 임차라면 종전대로 제외됩니다.</p></div>
<p class="ax-nt">전세보증금담보대출과 임차보증금담보대출은 이름이 비슷하지만 <b>전세자금대출이 아니어서 DSR이 적용</b>됩니다. 헷갈리기 쉬운 부분입니다.</p>
<p class="ax-law-l">금융위원회 가계부채 관리방안 · 주택 관련 담보대출 등에 대한 리스크관리 세부기준 · 금융위 주요정책문답(2025.10.15)</p>
</div></div>

<h2 class="ax-sec" id="tips">알아두면 좋은 것</h2>
<ul class="ax-tips">
<li>DSR 산정 만기는 최대 40년으로 제한됩니다. 만기를 무한정 늘려 한도를 키울 수는 없습니다.</li>
<li>같은 조건이면 대출기간이 길수록 한도가 커집니다. 연소득 6,000만원·3단계 기준으로 10년이면 1억 8,015만원, 30년이면 3억 3,358만원입니다.</li>
<li>기존 대출의 월 원리금이 그대로 차감되므로, 신용대출을 먼저 갚으면 주담대 한도가 늘어납니다.</li>
<li>제2금융권은 DSR 한도가 50%라 은행권보다 더 빌릴 수 있지만 금리가 높습니다.</li>
<li>스트레스 금리는 반기마다 재산정됩니다. 하한 1.5%·상한 3.0% 범위에서 움직입니다.</li>
</ul>

<h2 class="ax-sec" id="faq">자주 묻는 질문</h2>

<details class="ax-acc" open><summary>3단계 스트레스 DSR은 어떤 내용을 담고 있나요?</summary>
<div class="ax-ab"><p>2025년 7월 1일부터 스트레스 금리를 <b>100% 반영</b>해 <b>1.5%p</b>를 가산하고, 적용 대상을 <b>전 금융권 가계대출</b>로 넓혔습니다. 1·2단계에서는 0.38%p·0.75%p만 반영했고 대상도 일부 대출에 한정돼 있었습니다.</p>
<p class="ax-law">금융위원회 3단계 스트레스 DSR 시행방안</p></div></details>

<details class="ax-acc"><summary>2단계 스트레스 DSR은 어떤 대출에 적용되나요?</summary>
<div class="ax-ab"><p>2024년 9월 1일부터 은행권 주택담보대출과 신용대출, 제2금융권 주택담보대출에 적용됐습니다. 스트레스 금리는 0.75%p였습니다. 현재는 3단계가 시행 중이라 전 금융권 가계대출에 1.5%p가 적용됩니다.</p>
<p class="ax-law">금융위원회 스트레스 DSR 단계별 시행방안</p></div></details>

<details class="ax-acc"><summary>DSR에 포함되지 않는 대출은 무엇인가요?</summary>
<div class="ax-ab"><p>전세자금대출, 중도금·이주비대출, 서민금융상품(햇살론·새희망홀씨 등), 300만원 이하 소액신용대출, 예·적금담보대출, 유가증권담보대출, 주택연금 등이 제외됩니다. 다만 2025년 10월 29일부터 1주택자가 수도권·규제지역에서 받는 전세대출은 이자상환분이 반영됩니다.</p>
<p class="ax-law">금융위원회 가계부채 관리방안 · 주요정책문답</p></div></details>

<details class="ax-acc"><summary>스트레스 DSR 1단계는 어떻게 적용됐나요?</summary>
<div class="ax-ab"><p>2024년 2월 26일부터 은행권 주택담보대출에 적용됐고, 스트레스 금리는 하한금리 1.5%에 25%를 곱한 <b>0.38%p</b>였습니다. 연소득 6,000만원·30년·4.5% 기준으로 한도가 3억 9,472만원에서 3억 7,771만원으로 약 1,702만원 줄어드는 수준이었습니다.</p>
<p class="ax-law">금융위원회 (2024.2.26 시행)</p></div></details>

<details class="ax-acc"><summary>생애 최초 주택구입도 스트레스 DSR이 적용되나요?</summary>
<div class="ax-ab"><p>적용됩니다. 3단계부터는 전 금융권 가계대출이 대상이라 생애최초 구입이라고 해서 스트레스 금리가 빠지지는 않습니다. 다만 생애최초는 LTV 우대를 받을 수 있어, LTV 한도와 DSR 한도 중 작은 쪽이 실제 한도가 됩니다.</p>
<p class="ax-law">은행업감독규정 제29조의2</p></div></details>

<div class="ax-sum">
<h4>정리</h4>
<ul>
<li>스트레스 DSR은 실제 금리에 <b>가상의 가산금리</b>를 얹어 상환능력을 심사하는 제도입니다.</li>
<li>단계별 스트레스 금리는 <b>0.38%p → 0.75%p → 1.50%p</b>이고, 2025년 7월부터 3단계가 시행 중입니다.</li>
<li>한도 감소율은 연소득과 무관하게 <b>약 15.5%</b>입니다.</li>
<li>기존 대출 월 100만원이면 한도가 <b>절반</b>으로 떨어집니다.</li>
<li>전세자금대출·중도금대출 등은 제외되지만, <b>수도권 1주택자 전세대출은 이자분이 반영</b>됩니다.</li>
</ul>
<a class="ax-cta" href="/loan/dsr-limit/">
<span><b>DSR 계산기로 내 한도 확인하기</b><i>기존 대출·만기·금리까지 반영</i></span>
<em>DSR 계산하기</em></a>
</div>

<h2 class="ax-sec" id="src">근거 자료</h2>

<p class="ax-collected">아래 내용은 2026년 9월 1일 기준으로 금융위원회 발표 자료와 감독규정을 확인해 정리한 것입니다.</p>

<div class="ax-lawq"><b>금융위원회 「3단계 스트레스 DSR 시행방안」 (2025. 5. 20.)</b>
<p>(스트레스 금리) <b>0.38%(1단계) → 0.75%(2단계) → 1.50%(3단계)</b>로 단계적 상향. 2025년 7월 1일부터 전 금융권 가계대출에 3단계 적용.</p></div>

<div class="ax-lawq"><b>금융위원회 (2024. 2. 26. 시행 안내)</b>
<p>상반기에 적용되는 스트레스 금리는 <b>하한금리 1.5%에 25%를 적용한 0.38%</b>(소수점 셋째자리에서 반올림)로 운영된다.</p></div>

<div class="ax-lawq"><b>금융위원회 주요정책문답 — 전세대출 DSR 적용 (2025. 10. 15.)</b>
<p>1주택자가 보유한 주택 소재지에 관계없이 <b>1주택자가 수도권·규제지역에서 임차인으로 전세대출을 받는 경우 이자상환분만 임차인의 DSR에 반영</b>한다. 2025년 10월 29일 시행.</p></div>

<div class="ax-lawq"><b>DSR 산정 제외 대출</b>
<p>서민금융상품(햇살론, 새희망홀씨 등), 소액 신용대출(3백만원 이하), 전세자금대출, 중도금·이주비대출, 예·적금담보대출, 유가증권담보대출 등 담보가치가 확실한 대출, 주택연금.</p></div>

<div class="ax-src"><b>출처 · 금융위원회, 금융감독원</b><br>
스트레스 DSR 단계별 시행방안과 DSR 산정 제외 대출은 <a href="https://www.fsc.go.kr/" target="_blank" rel="noopener">금융위원회</a> 보도자료·정책문답에서 확인할 수 있습니다. DSR 산정 근거는 은행업감독규정 제29조의2 및 각 업권 감독규정의 「주택 관련 담보대출 등에 대한 리스크관리 기준」입니다.<br><br>
실제 대출 한도는 금융기관의 내부 심사기준, 대출 종류, 지역, 담보 조건에 따라 달라집니다. 본 계산 결과는 참고용이며 최종 한도는 취급 금융기관에서 확인하시기 바랍니다.</div>`;

export const asideHtml = `<div class="ax-side"><h4>대출 계산기</h4>
<a class="ax-rel" href="/loan/dsr-limit/">DSR 계산기<span>스트레스 3단계 반영</span></a>
<a class="ax-rel" href="/loan/mortgage-loan-limit/">주담대 한도 계산기<span>LTV·DSR 동시</span></a>
<a class="ax-rel" href="/loan/ltv-limit/">LTV 계산기<span>수도권 절대한도 포함</span></a>
</div>

<div class="ax-side"><h4>이 글의 단계</h4>
<ol>
<li><a href="#m1">스트레스 DSR 구조</a></li>
<li><a href="#m1">1·2·3단계 기준</a></li>
<li><a href="#m2">연봉별 한도 감소</a></li>
<li><a href="#m3">DSR 제외 대출</a></li>
<li><a href="#faq">자주 묻는 질문</a></li>
</ol></div>

<div class="ax-side"><h4>같은 분류의 글</h4>
<a class="ax-rel" href="/realestate/transfer-tax-guide/">1세대 1주택 양도세 비과세 요건<span>양도세</span></a>
<a class="ax-rel" href="/tax/salary-net-pay-guide/">2026 연봉 실수령액 표<span>연봉</span></a>
<a class="ax-rel" href="/law/severance-pay/">퇴직금 계산 방법과 평균임금 산정기준<span>퇴직금</span></a>
</div>`;

export const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      "name": "3단계 스트레스 DSR은 어떤 내용을 담고 있나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "2025년 7월 1일부터 스트레스 금리를 100% 반영해 1.5%p를 가산하고, 적용 대상을 전 금융권 가계대출로 넓혔습니다. 1·2단계에서는 0.38%p·0.75%p만 반영했고 대상도 일부 대출에 한정돼 있었습니다. 금융위원회 3단계 스트레스 DSR 시행방안"
      }
    },
    {
      "@type": "Question",
      "name": "2단계 스트레스 DSR은 어떤 대출에 적용되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "2024년 9월 1일부터 은행권 주택담보대출과 신용대출, 제2금융권 주택담보대출에 적용됐습니다. 스트레스 금리는 0.75%p였습니다. 현재는 3단계가 시행 중이라 전 금융권 가계대출에 1.5%p가 적용됩니다. 금융위원회 스트레스 DSR 단계별 시행방안"
      }
    },
    {
      "@type": "Question",
      "name": "DSR에 포함되지 않는 대출은 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "전세자금대출, 중도금·이주비대출, 서민금융상품(햇살론·새희망홀씨 등), 300만원 이하 소액신용대출, 예·적금담보대출, 유가증권담보대출, 주택연금 등이 제외됩니다. 다만 2025년 10월 29일부터 1주택자가 수도권·규제지역에서 받는 전세대출은 이자상환분이 반영됩니다. 금융위원회 가계부채 관리방안 · 주요정책문답"
      }
    },
    {
      "@type": "Question",
      "name": "스트레스 DSR 1단계는 어떻게 적용됐나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "2024년 2월 26일부터 은행권 주택담보대출에 적용됐고, 스트레스 금리는 하한금리 1.5%에 25%를 곱한 0.38%p였습니다. 연소득 6,000만원·30년·4.5% 기준으로 한도가 3억 9,472만원에서 3억 7,771만원으로 약 1,702만원 줄어드는 수준이었습니다. 금융위원회 (2024.2.26 시행)"
      }
    },
    {
      "@type": "Question",
      "name": "생애 최초 주택구입도 스트레스 DSR이 적용되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "적용됩니다. 3단계부터는 전 금융권 가계대출이 대상이라 생애최초 구입이라고 해서 스트레스 금리가 빠지지는 않습니다. 다만 생애최초는 LTV 우대를 받을 수 있어, LTV 한도와 DSR 한도 중 작은 쪽이 실제 한도가 됩니다. 은행업감독규정 제29조의2"
      }
    }
  ],
};
