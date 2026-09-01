// 자동 생성: scripts/convert-previews.mjs — 직접 수정하지 말 것
// 원본: public/_preview/15-재산세.html
export const meta = {
  title: "재산세 계산, 같은 공시가 5억인데 세금이 두 배 차이 나는 이유",
  description: "주택 재산세는 공시가에 공정시장가액비율을 곱한 과세표준에 세율을 매깁니다. 공시가 5억이면 일반 684,000원, 1세대 1주택은 312,000원. 1주택은 비율도 세율도 낮습니다. 과세기준일은 6월 1일입니다.",
  datePublished: "2026-09-01",
  dateModified: "2026-09-01",
  url: "https://moneydoc.kr/realestate/property-tax-guide/",
};

export const widgetKey = "propertyTax";

export const widgetHtml = `<div class="ax-wg" id="wg1">
<div class="ax-wg-h"><b>주택 재산세 계산</b>
<span>주택 공시가격과 1세대 1주택 해당 여부를 넣으면 세액과 납기 분할이 나옵니다</span></div>
<div class="ax-wg-in">
  <label class="ax-wg-f"><em>주택 공시가격 (원)</em><input type="number" id="pv" value="500000000" step="10000000" min="0"></label>
  <label class="ax-wg-f"><em>1세대 1주택 (시가표준 9억 이하)</em>
    <select id="one"><option value="0">아니오 (일반)</option><option value="1">예 (특례 적용)</option></select></label>
</div>
<div class="ax-wg-out" id="out"></div>
<p class="ax-wg-note">근거: 지방세법 제111조(표준세율)·제111조의2(1세대 1주택 특례세율)·제151조 제1항 제6호(지방교육세 20%), 같은 법 시행령 제109조(공정시장가액비율). 도시지역분 재산세와 지역자원시설세는 포함하지 않았습니다.</p>
</div>`;

export const htmlBefore = `<h1>재산세 계산, 같은 공시가 5억인데 세금이 두 배 차이 나는 이유</h1>
<p class="ax-by">MoneyDoc 편집팀 · 2026년 9월 1일 기준 · 약 7분</p>

<svg class="ax-hero" viewBox="0 0 1100 563" role="img" aria-label="공시가 5억 주택의 재산세는 일반 68만 4천원, 1세대 1주택은 31만 2천원입니다">
<rect width="1100" height="563" fill="#f7f2ea"/>
<path d="M820 0h280v248a60 60 0 0 1-60 60H820z" fill="#eee6d8"/>
<circle cx="1006" cy="76" r="47" fill="#e3d7c2" opacity=".6"/>
<rect x="72" y="160" width="104" height="42" rx="9" fill="#8a6a2f"/>
<text x="124" y="189" font-size="19" font-weight="800" text-anchor="middle" fill="#fff" letter-spacing="-.5">부동산·세금</text>
<text x="72" y="282" font-size="57" font-weight="800" fill="#2b2723" letter-spacing="-2.6">같은 공시가 5억</text>
<rect x="70" y="312" width="404" height="26" fill="#ecdfc6"/>
<text x="72" y="349" font-size="57" font-weight="800" fill="#8a6a2f" letter-spacing="-2.6">세금은 두 배 차이</text>
<text x="72" y="400" font-size="21" font-weight="700" fill="#6f6858" letter-spacing="-.8">일반 684,000원 · 1세대 1주택 312,000원</text>
<rect x="0" y="545" width="1100" height="18" fill="#8a6a2f"/>
<g transform="translate(648 186)">
  <ellipse cx="200" cy="242" rx="172" ry="17" fill="#e8ded0" opacity=".55"/>
  <path d="M92 128 L156 76 l64 52 z" fill="#d9c9a8" stroke="#6b6255" stroke-width="4" stroke-linejoin="round"/>
  <rect x="104" y="128" width="104" height="114" fill="#fdfcfa" stroke="#6b6255" stroke-width="4"/>
  <rect x="128" y="156" width="26" height="26" fill="#ecdfc6" stroke="#6b6255" stroke-width="3"/>
  <rect x="166" y="156" width="26" height="26" fill="#ecdfc6" stroke="#6b6255" stroke-width="3"/>
  <rect x="140" y="198" width="34" height="44" fill="#8a6a2f"/>
  <rect x="252" y="182" width="60" height="60" rx="8" fill="#c4452f"/>
  <text x="282" y="208" font-size="13" font-weight="800" text-anchor="middle" fill="#fff">일반</text>
  <text x="282" y="228" font-size="13" font-weight="800" text-anchor="middle" fill="#fff">68.4만</text>
  <rect x="324" y="200" width="60" height="42" rx="8" fill="#2f6b52"/>
  <text x="354" y="217" font-size="13" font-weight="800" text-anchor="middle" fill="#fff">1주택</text>
  <text x="354" y="234" font-size="13" font-weight="800" text-anchor="middle" fill="#fff">31.2만</text>
</g>
</svg>

<p class="ax-intro">주택 재산세는 <b>공시가 × 공정시장가액비율 = 과세표준</b>, 여기에 세율을 매기고 지방교육세 20%를 더해 정해집니다. 공시가가 같아도 <b>1세대 1주택이면 비율도 세율도 낮아</b> 세금이 절반 이하가 됩니다. 공시가 5억 주택이면 일반은 684,000원, 1세대 1주택은 <b>312,000원</b>입니다.</p>

<a class="ax-cta" href="/realestate/property-tax/">
<span><b>내 재산세 바로 계산하기</b><i>공시가와 1주택 여부만 넣으면 됩니다</i></span>
<em>재산세 계산하기</em></a>

<div class="ax-toc"><b>이 글에서는</b><a href="#m1">계산 구조</a><a href="#m2">1주택 특례</a><a href="#m3">공정시장가액비율</a><a href="#m4">납부 기간</a><a href="#tips">알아두면 좋은 것</a><a href="#faq">자주 묻는 질문</a><a href="#src">근거 자료</a></div>`;

export const htmlAfter = `<div class="ax-mh" id="m1"><b>1단계 — 계산 구조</b><span>공시가가 아니라 과세표준</span></div>

<div class="ax-st"><div class="ax-n">1</div><div class="ax-sb">
<h3>재산세는 어떻게 계산하나요</h3>
<p>세율을 곱하는 대상은 공시가격이 아니라 <b>과세표준</b>입니다. 공시가격에 공정시장가액비율을 곱해 과세표준을 먼저 구합니다.</p>
<figure class="ax-ig">
<svg viewBox="0 0 660 166" role="img" aria-label="공시가에 공정시장가액비율을 곱해 과세표준을 구하고 세율을 적용한 뒤 지방교육세 20퍼센트를 더합니다">
<text x="0" y="18" font-size="13" font-weight="700" fill="currentColor" letter-spacing="-.3">공시가 5억 · 일반(다주택·비1주택) 기준</text>
<rect x="0" y="42" width="136" height="50" rx="8" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".55"/>
<text x="68" y="62" font-size="12" font-weight="700" text-anchor="middle" fill="currentColor">공시가 5억</text>
<text x="68" y="80" font-size="10.5" text-anchor="middle" fill="currentColor" opacity=".6">국토부 공시가격</text>
<line x1="136" y1="67" x2="178" y2="67" stroke="currentColor" stroke-width="2" opacity=".6" stroke-linecap="round"/>
<polygon points="169,62 169,72 178,67" fill="currentColor" opacity=".6"/>
<text x="157" y="55" font-size="10" font-weight="700" text-anchor="middle" fill="currentColor" opacity=".7">×60%</text>
<rect x="178" y="42" width="148" height="50" rx="8" fill="#8a6a2f"/>
<text x="252" y="62" font-size="12" font-weight="800" text-anchor="middle" fill="#fff">과세표준 3억</text>
<text x="252" y="80" font-size="10.5" text-anchor="middle" fill="#fff" opacity=".85">공정시장가액비율 적용</text>
<line x1="326" y1="67" x2="368" y2="67" stroke="currentColor" stroke-width="2" opacity=".6" stroke-linecap="round"/>
<polygon points="359,62 359,72 368,67" fill="currentColor" opacity=".6"/>
<rect x="368" y="42" width="140" height="50" rx="8" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".55"/>
<text x="438" y="62" font-size="12" font-weight="700" text-anchor="middle" fill="currentColor">재산세 570,000</text>
<text x="438" y="80" font-size="10.5" text-anchor="middle" fill="currentColor" opacity=".6">3억 × 0.25% − 18만</text>
<line x1="508" y1="67" x2="546" y2="67" stroke="#8a6a2f" stroke-width="2" stroke-linecap="round"/>
<polygon points="537,62 537,72 546,67" fill="#8a6a2f"/>
<text x="527" y="55" font-size="10" font-weight="700" text-anchor="middle" fill="#8a6a2f">+20%</text>
<rect x="546" y="42" width="114" height="50" rx="8" fill="none" stroke="#8a6a2f" stroke-width="1.6"/>
<text x="603" y="62" font-size="12.5" font-weight="800" text-anchor="middle" fill="#8a6a2f">684,000원</text>
<text x="603" y="80" font-size="10.5" text-anchor="middle" fill="#8a6a2f" opacity=".85">+ 교육세 114,000</text>
<text x="0" y="124" font-size="11.5" font-weight="600" fill="currentColor" opacity=".62" letter-spacing="-.3">공시가 5억이라고 5억에 세율을 곱하지 않습니다. 실제 세율이 붙는 금액은 3억원입니다.</text>
<text x="0" y="146" font-size="11.5" font-weight="600" fill="currentColor" opacity=".62" letter-spacing="-.3">지방교육세는 재산세액의 20%입니다 (자동차세의 30%와 다릅니다).</text>
</svg>
<figcaption>「지방세법」 제111조 (재산세 표준세율) · 제151조 제1항 제6호 (지방교육세)</figcaption>
</figure>
<div class="ax-tw"><table>
<thead><tr><th>과세표준</th><th>표준세율 (일반)</th><th>누진공제</th></tr></thead>
<tbody>
<tr><td>6,000만원 이하</td><td>0.1%</td><td>—</td></tr>
<tr><td>6,000만 초과 ~ 1.5억</td><td>0.15%</td><td>30,000</td></tr>
<tr class="ax-hi"><td>1.5억 초과 ~ 3억</td><td><b>0.25%</b></td><td>180,000</td></tr>
<tr><td>3억 초과</td><td>0.4%</td><td>630,000</td></tr>
</tbody></table>
<p class="ax-tn">단위: 원. 지방세법 제111조 제1항 제3호 나목. 조문에는 "19만 5천원 + 1억 5천만원 초과금액의 0.25%"로 적혀 있고, 이를 한 줄로 줄인 것이 누진공제입니다.</p></div>
</div></div>

<div class="ax-mh ax-b" id="m2"><b>2단계 — 1주택 특례</b><span>두 군데가 낮아진다</span></div>

<div class="ax-st"><div class="ax-n">2</div><div class="ax-sb">
<h3>1세대 1주택 재산세는 얼마나 줄어드나요</h3>
<p>시가표준액 <b>9억원 이하</b>인 1세대 1주택에는 특례가 적용됩니다. 감면 한 번이 아니라 <b>두 군데</b>가 낮아집니다. 공정시장가액비율이 60%에서 43~45%로, 세율도 구간마다 낮은 값이 적용됩니다.</p>
<div class="ax-tw"><table>
<thead><tr><th>과세표준</th><th>일반 세율</th><th>1주택 특례세율</th></tr></thead>
<tbody>
<tr><td>6,000만원 이하</td><td>0.1%</td><td><b>0.05%</b></td></tr>
<tr><td>6,000만 초과 ~ 1.5억</td><td>0.15%</td><td><b>0.1%</b></td></tr>
<tr><td>1.5억 초과 ~ 3억</td><td>0.25%</td><td><b>0.2%</b></td></tr>
<tr class="ax-hi"><td>3억 초과</td><td>0.4%</td><td><b>0.35%</b></td></tr>
</tbody></table>
<p class="ax-tn">지방세법 제111조의2 제1항. 시가표준액 9억원 이하 1세대 1주택에만 적용됩니다.</p></div>
<div class="ax-tw"><table>
<thead><tr><th>공시가</th><th>일반 과세표준</th><th>일반 합계</th><th>1주택 과세표준</th><th>1주택 합계</th><th>차액</th></tr></thead>
<tbody>
<tr><td>2억원</td><td>120,000,000</td><td>180,000</td><td>86,000,000</td><td><b>67,200</b></td><td>−112,800</td></tr>
<tr><td>3억원</td><td>180,000,000</td><td>324,000</td><td>129,000,000</td><td><b>118,800</b></td><td>−205,200</td></tr>
<tr><td>4억원</td><td>240,000,000</td><td>504,000</td><td>176,000,000</td><td><b>206,400</b></td><td>−297,600</td></tr>
<tr class="ax-hi"><td>5억원</td><td>300,000,000</td><td><b>684,000</b></td><td>220,000,000</td><td><b>312,000</b></td><td><b>−372,000</b></td></tr>
<tr><td>6억원</td><td>360,000,000</td><td>972,000</td><td>264,000,000</td><td><b>417,600</b></td><td>−554,400</td></tr>
<tr><td>7억원</td><td>420,000,000</td><td>1,260,000</td><td>315,000,000</td><td><b>567,000</b></td><td>−693,000</td></tr>
<tr><td>9억원</td><td>540,000,000</td><td>1,836,000</td><td>405,000,000</td><td><b>945,000</b></td><td>−891,000</td></tr>
</tbody></table>
<p class="ax-tn">단위: 원. 재산세와 지방교육세를 합한 연간 총액입니다. MoneyDoc 계산기 엔진으로 산출했습니다.</p></div>
<p class="ax-nt">공시가 5억 주택의 세금이 <b>684,000원과 312,000원</b>으로 갈립니다. 2.19배 차이입니다. 같은 집인데도 1세대 1주택인지 아닌지에 따라 이만큼 벌어집니다.</p>
<p class="ax-nt">주의할 점이 있습니다. 이 특례세율은 지방세법 부칙에 따라 <b>2026년 12월 28일까지 성립한 납세의무</b>에 한정해 유효합니다. 매년 연장 여부가 정해지므로 이후 적용은 그때 확인해야 합니다.</p>
</div></div>

<div class="ax-mh" id="m3"><b>3단계 — 공정시장가액비율</b><span>세 개의 구간</span></div>

<div class="ax-st"><div class="ax-n">3</div><div class="ax-sb">
<h3>공정시장가액비율은 몇 퍼센트인가요</h3>
<p>일반 주택은 <b>60%</b>로 하나뿐이지만, 1세대 1주택은 시가표준액에 따라 <b>세 구간</b>으로 나뉩니다. 2026년에도 전년과 같은 비율이 유지됐습니다.</p>
<div class="ax-tw"><table>
<thead><tr><th>구분</th><th>시가표준액</th><th>공정시장가액비율</th></tr></thead>
<tbody>
<tr><td>일반 주택</td><td>전 구간</td><td><b>60%</b></td></tr>
<tr class="ax-hi"><td rowspan="3">1세대 1주택</td><td>3억원 이하</td><td><b>43%</b></td></tr>
<tr><td>3억 초과 ~ 6억원 이하</td><td><b>44%</b></td></tr>
<tr><td>6억원 초과 (9억 이하)</td><td><b>45%</b></td></tr>
</tbody></table>
<p class="ax-tn">지방세법 시행령 제109조. 1세대 1주택 특례 비율은 2023년부터 매년 한시 적용되며, 2026년도 동일하게 유지됐습니다.</p></div>
<figure class="ax-ig">
<svg viewBox="0 0 660 172" role="img" aria-label="일반 주택은 공정시장가액비율 60퍼센트, 1세대 1주택은 43에서 45퍼센트입니다">
<text x="0" y="18" font-size="13" font-weight="700" fill="currentColor" letter-spacing="-.3">공시가 대비 과세표준의 크기</text>
<text x="0" y="52" font-size="11" font-weight="700" fill="currentColor" opacity=".62">일반</text>
<rect x="56" y="38" width="360" height="26" rx="4" fill="currentColor" opacity=".3"/>
<text x="236" y="56" font-size="11.5" font-weight="800" text-anchor="middle" fill="currentColor">60%</text>
<rect x="416" y="38" width="240" height="26" rx="4" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="4 3" opacity=".35"/>
<text x="0" y="96" font-size="11" font-weight="700" fill="#2f6b52">1주택 3억↓</text>
<rect x="80" y="82" width="258" height="26" rx="4" fill="#2f6b52"/>
<text x="209" y="100" font-size="11.5" font-weight="800" text-anchor="middle" fill="#fff">43%</text>
<text x="0" y="130" font-size="11" font-weight="700" fill="#2f6b52">1주택 6억↑</text>
<rect x="80" y="116" width="270" height="26" rx="4" fill="#4d8a70"/>
<text x="215" y="134" font-size="11.5" font-weight="800" text-anchor="middle" fill="#fff">45%</text>
<text x="0" y="164" font-size="11.5" font-weight="600" fill="currentColor" opacity=".62" letter-spacing="-.3">공시가 5억이면 일반은 과세표준 3억, 1주택은 2억 2천만원입니다. 여기에 세율까지 낮습니다.</text>
</svg>
<figcaption>「지방세법 시행령」 제109조 (공정시장가액비율)</figcaption>
</figure>
<p class="ax-nt">공시가가 6억을 넘으면 1주택 비율이 45%로 <b>올라갑니다</b>. 비싼 집일수록 할인폭이 조금씩 줄어드는 구조입니다.</p>
</div></div>

<div class="ax-mh ax-b" id="m4"><b>4단계 — 납부</b><span>6월 1일과 두 번의 납기</span></div>

<div class="ax-st"><div class="ax-n">4</div><div class="ax-sb">
<h3>재산세 납부 기간은 언제인가요</h3>
<p>주택 재산세는 <b>7월과 9월에 절반씩</b> 나눠 냅니다. 다만 연세액이 <b>20만원 이하</b>면 조례에 따라 7월에 한꺼번에 부과할 수 있습니다.</p>
<div class="ax-tw"><table>
<thead><tr><th>대상</th><th>납기</th></tr></thead>
<tbody>
<tr class="ax-hi"><td>주택</td><td>세액의 1/2은 <b>7월 16일~31일</b>, 나머지 1/2은 <b>9월 16일~30일</b><br>(연세액 20만원 이하면 7월에 일괄 부과 가능)</td></tr>
<tr><td>건축물</td><td>7월 16일~31일</td></tr>
<tr><td>토지</td><td>9월 16일~30일</td></tr>
<tr><td>선박·항공기</td><td>7월 16일~31일</td></tr>
</tbody></table>
<p class="ax-tn">지방세법 제115조 제1항.</p></div>
<figure class="ax-ig">
<svg viewBox="0 0 660 156" role="img" aria-label="재산세 과세기준일은 6월 1일이고 주택은 7월과 9월에 절반씩 납부합니다">
<text x="0" y="18" font-size="13" font-weight="700" fill="currentColor" letter-spacing="-.3">과세기준일과 납기</text>
<line x1="20" y1="78" x2="640" y2="78" stroke="currentColor" stroke-width="1.6" opacity=".3"/>
<circle cx="120" cy="78" r="7" fill="#c4452f"/>
<text x="120" y="60" font-size="11.5" font-weight="800" text-anchor="middle" fill="#c4452f">6월 1일</text>
<text x="120" y="100" font-size="10.5" font-weight="600" text-anchor="middle" fill="currentColor" opacity=".6">과세기준일</text>
<rect x="270" y="64" width="126" height="28" rx="5" fill="#8a6a2f"/>
<text x="333" y="83" font-size="11" font-weight="800" text-anchor="middle" fill="#fff">7/16~7/31 · 1/2</text>
<rect x="450" y="64" width="126" height="28" rx="5" fill="#8a6a2f" opacity=".78"/>
<text x="513" y="83" font-size="11" font-weight="800" text-anchor="middle" fill="#fff">9/16~9/30 · 1/2</text>
<text x="0" y="128" font-size="11.5" font-weight="700" fill="#c4452f" letter-spacing="-.3">6월 1일에 소유한 사람이 그 해 재산세 전액을 냅니다.</text>
<text x="0" y="148" font-size="11.5" font-weight="600" fill="currentColor" opacity=".62" letter-spacing="-.3">5월 31일에 팔면 안 내고, 6월 2일에 팔면 1년치를 다 냅니다.</text>
</svg>
<figcaption>「지방세법」 제114조 (과세기준일) · 제115조 제1항 (납기)</figcaption>
</figure>
<p class="ax-nt">가장 중요한 날짜는 <b>6월 1일</b>입니다. 지방세법 제114조는 재산세 과세기준일을 매년 6월 1일로 못박고 있습니다. 이날 등기부상 소유자가 그 해 재산세를 전부 부담합니다. 매매 잔금일을 <b>5월 31일 이전</b>으로 맞추면 파는 쪽이, <b>6월 2일 이후</b>로 맞추면 사는 쪽이 냅니다.</p>
</div></div>

<h2 class="ax-sec" id="tips">알아두면 좋은 것</h2>
<ul class="ax-tips">
<li>세율이 붙는 것은 공시가가 아니라 <b>과세표준</b>입니다. 공시가 5억이라도 일반은 3억, 1주택은 2.2억에 세율이 붙습니다.</li>
<li>1세대 1주택 특례는 <b>시가표준액 9억원 이하</b>에만 적용됩니다. 9억을 넘으면 일반 세율·60%가 적용됩니다.</li>
<li>실제 고지서에는 <b>도시지역분 재산세</b>와 지역자원시설세가 함께 찍히는 경우가 많아, 이 글의 계산보다 총액이 큽니다.</li>
<li>매매 잔금일을 6월 1일 전후로 조정하면 그 해 재산세 부담자가 바뀝니다. 계약 시 특약으로 정리해 두면 분쟁이 없습니다.</li>
<li>연세액이 20만원 이하면 7월에 한 번에 나오니, 9월 고지서가 안 온다고 당황할 필요 없습니다.</li>
<li>특례세율은 부칙상 <b>2026년 12월 28일까지 성립한 납세의무</b>에 한해 유효합니다. 연장 여부는 매년 확인해야 합니다.</li>
<li>지방교육세는 재산세액의 <b>20%</b>입니다. 자동차세의 30%와 헷갈리기 쉽습니다.</li>
</ul>

<h2 class="ax-sec" id="faq">자주 묻는 질문</h2>

<details class="ax-acc" open><summary>공시가 5억 주택의 재산세는 얼마인가요?</summary>
<div class="ax-ab"><p>일반(다주택 등)이면 과세표준 3억원에 재산세 570,000원, 지방교육세 114,000원으로 <b>총 684,000원</b>입니다. 1세대 1주택이면 과세표준 2억 2천만원에 재산세 260,000원, 지방교육세 52,000원으로 <b>총 312,000원</b>입니다.</p>
<p class="ax-law">지방세법 제111조·제111조의2·제151조 제1항 제6호</p></div></details>

<details class="ax-acc"><summary>재산세 공정시장가액비율은 몇 퍼센트인가요?</summary>
<div class="ax-ab"><p>일반 주택은 <b>60%</b>입니다. 1세대 1주택은 시가표준액에 따라 <b>3억원 이하 43%, 3억 초과 6억 이하 44%, 6억 초과 45%</b>로 나뉩니다. 2026년도 전년과 같은 비율이 유지됐습니다.</p>
<p class="ax-law">지방세법 시행령 제109조</p></div></details>

<details class="ax-acc"><summary>재산세 과세기준일은 언제인가요?</summary>
<div class="ax-ab"><p>매년 <b>6월 1일</b>입니다. 이날 주택을 소유한 사람이 그 해 재산세 전액을 냅니다. 5월 31일에 팔면 내지 않고, 6월 2일에 팔면 1년치를 모두 부담합니다.</p>
<p class="ax-law">지방세법 제114조</p></div></details>

<details class="ax-acc"><summary>재산세는 언제 내나요?</summary>
<div class="ax-ab"><p>주택은 <b>7월 16일~31일에 절반, 9월 16일~30일에 나머지 절반</b>을 냅니다. 다만 연세액이 20만원 이하면 조례에 따라 7월에 한꺼번에 부과할 수 있습니다. 토지는 9월, 건축물은 7월입니다.</p>
<p class="ax-law">지방세법 제115조 제1항</p></div></details>

<details class="ax-acc"><summary>1세대 1주택이면 재산세가 얼마나 줄어드나요?</summary>
<div class="ax-ab"><p>두 군데가 낮아집니다. 공정시장가액비율이 60%에서 <b>43~45%</b>로, 세율도 각 구간에서 낮은 값이 적용됩니다. 공시가 5억이면 684,000원이 <b>312,000원</b>으로 2.19배 줄고, 9억이면 1,836,000원이 945,000원이 됩니다.</p>
<p class="ax-law">지방세법 제111조의2 제1항 · 시행령 제109조</p></div></details>

<details class="ax-acc"><summary>고지서 금액이 계산값보다 많은데 왜 그런가요?</summary>
<div class="ax-ab"><p>실제 고지서에는 재산세 본세와 지방교육세 외에 <b>도시지역분 재산세</b>와 지역자원시설세가 함께 부과되는 경우가 많습니다. 이 글의 계산은 지방세법 제111조의 본세와 지방교육세만 반영한 값입니다. 정확한 고지세액은 위택스나 관할 지자체에서 확인하세요.</p>
<p class="ax-law">지방세법 제112조 (도시지역분) · 제151조 제1항 제6호</p></div></details>

<details class="ax-acc"><summary>집을 6월에 팔면 재산세는 누가 내나요?</summary>
<div class="ax-ab"><p>6월 1일 기준 소유자가 냅니다. 잔금일이 <b>6월 1일 이전</b>이면 매수인이, <b>6월 2일 이후</b>면 매도인이 그 해 재산세 전액을 부담합니다. 일할 계산은 없습니다. 계약서에 특약으로 정산 방법을 정해두는 것이 일반적입니다.</p>
<p class="ax-law">지방세법 제114조 (과세기준일)</p></div></details>

<div class="ax-sum">
<h4>정리</h4>
<ul>
<li>재산세 = <b>공시가 × 공정시장가액비율</b> → 과세표준 → 세율 → + 지방교육세 20%입니다.</li>
<li>공정시장가액비율은 일반 <b>60%</b>, 1세대 1주택 <b>43·44·45%</b>입니다.</li>
<li>1세대 1주택 특례는 <b>시가표준액 9억원 이하</b>에만 적용되고, 비율과 세율이 함께 낮아집니다.</li>
<li>공시가 5억이면 일반 <b>684,000원</b>, 1주택 <b>312,000원</b>입니다.</li>
<li>과세기준일은 <b>6월 1일</b>. 이날 소유자가 1년치를 전부 냅니다.</li>
<li>주택 납기는 <b>7월 16~31일, 9월 16~30일</b> 절반씩(20만원 이하면 7월 일괄)입니다.</li>
</ul>
<a class="ax-cta" href="/realestate/property-tax/">
<span><b>재산세 계산기로 확인하기</b><i>공시가·1주택 여부로 즉시 계산</i></span>
<em>재산세 계산하기</em></a>
</div>

<h2 class="ax-sec" id="src">근거 자료</h2>

<p class="ax-collected">아래는 국가법령정보센터에서 확인한 조문입니다. 지방세법은 시행 2026. 1. 1. (법률 제21308호, 2025. 12. 31. 일부개정) 기준입니다.</p>

<div class="ax-lawq"><b>지방세법 제111조 (재산세 표준세율) 제1항 제3호 나목 — 주택</b>
<p>6천만원 이하: <b>1,000분의 1</b><br>
6천만원 초과 1억5천만원 이하: 60,000원 + 6천만원 초과금액의 <b>1,000분의 1.5</b><br>
1억5천만원 초과 3억원 이하: 195,000원 + 1억5천만원 초과금액의 <b>1,000분의 2.5</b><br>
3억원 초과: 570,000원 + 3억원 초과금액의 <b>1,000분의 4</b></p></div>

<div class="ax-lawq"><b>지방세법 제111조의2 (1세대 1주택에 대한 주택의 세율 특례) 제1항 &lt;개정 2021. 7. 8.&gt;</b>
<p>제111조제1항제3호나목에도 불구하고 대통령령으로 정하는 <b>1세대 1주택(시가표준액이 9억원 이하인 주택에 한정한다)</b>에 대해서는 다음의 세율을 적용한다.<br>
6천만원 이하: <b>1,000분의 0.5</b> / 6천만원 초과 1억5천만원 이하: 30,000원 + 초과금액의 <b>1,000분의 1</b> / 1억5천만원 초과 3억원 이하: 120,000원 + 초과금액의 <b>1,000분의 2</b> / 3억원 초과: 420,000원 + 초과금액의 <b>1,000분의 3.5</b><br>
<b>[부칙] 제111조의2의 개정규정은 2026년 12월 28일까지 성립한 납세의무에 한정하여 유효함</b></p></div>

<div class="ax-lawq"><b>지방세법 시행령 제109조 (공정시장가액비율)</b>
<p>주택: 시가표준액의 <b>100분의 60</b>. 다만, 2026년도에 납세의무가 성립하는 재산세의 과세표준을 산정하는 경우 제110조의2에 따라 1세대 1주택으로 인정되는 주택은 시가표준액 <b>3억원 이하 100분의 43</b>, <b>3억원 초과 6억원 이하 100분의 44</b>, <b>6억원 초과 100분의 45</b>를 적용한다.</p></div>

<div class="ax-lawq"><b>지방세법 제151조 (지방교육세 과세표준과 세율) 제1항 제6호</b>
<p>이 법 및 지방세감면법령에 따라 납부하여야 할 <b>재산세액</b>(제112조제1항제2호 및 같은 조 제2항에 따른 재산세액은 제외한다)<b>의 100분의 20</b></p></div>

<div class="ax-lawq"><b>지방세법 제114조 (과세기준일)</b>
<p>재산세의 과세기준일은 매년 <b>6월 1일</b>로 한다.</p></div>

<div class="ax-lawq"><b>지방세법 제115조 (납기) 제1항 제3호</b>
<p>주택: 해당 연도에 부과ㆍ징수할 세액의 <b>2분의 1은 매년 7월 16일부터 7월 31일까지</b>, 나머지 2분의 1은 <b>9월 16일부터 9월 30일까지</b>. 다만, 해당 연도에 부과할 세액이 <b>20만원 이하인 경우</b>에는 조례로 정하는 바에 따라 납기를 7월 16일부터 7월 31일까지로 하여 한꺼번에 부과ㆍ징수할 수 있다.</p></div>

<div class="ax-src"><b>출처 · 행정안전부, 국가법령정보센터</b><br>
조문은 <a href="https://www.law.go.kr/법령/지방세법/제111조" target="_blank" rel="noopener">지방세법 제111조</a>, <a href="https://www.law.go.kr/법령/지방세법/제111조의2" target="_blank" rel="noopener">제111조의2</a>, <a href="https://www.law.go.kr/법령/지방세법/제114조" target="_blank" rel="noopener">제114조</a>, <a href="https://www.law.go.kr/법령/지방세법/제115조" target="_blank" rel="noopener">제115조</a>, <a href="https://www.law.go.kr/법령/지방세법/제151조" target="_blank" rel="noopener">제151조</a> 및 같은 법 <a href="https://www.law.go.kr/법령/지방세법시행령/제109조" target="_blank" rel="noopener">시행령 제109조</a>에서 확인했습니다. 조회·납부는 <a href="https://www.wetax.go.kr/" target="_blank" rel="noopener">위택스</a>에서 합니다.<br><br>
이 글의 계산은 지방세법 제111조의 <b>주택 재산세 본세와 지방교육세</b>만 반영합니다. 실제 고지서에는 도시지역분 재산세와 지역자원시설세가 함께 부과될 수 있고, 지방자치단체가 조례로 세율을 가감할 수 있어 금액이 달라질 수 있습니다. 세부담 상한 제도도 별도로 적용됩니다. 정확한 고지세액은 위택스나 관할 지자체에서 확인하시기 바랍니다.</div>`;

export const asideHtml = `<div class="ax-side"><h4>부동산 계산기</h4>
<a class="ax-rel" href="/realestate/property-tax/">재산세 계산기<span>공시가·1주택</span></a>
<a class="ax-rel" href="/realestate/acquisition-tax/">취득세 계산기<span>부동산 취득</span></a>
<a class="ax-rel" href="/realestate/transfer-tax/">양도소득세 계산기<span>매도 차익</span></a>
</div>

<div class="ax-side"><h4>이 글의 단계</h4>
<ol>
<li><a href="#m1">계산 구조</a></li>
<li><a href="#m2">1세대 1주택 특례</a></li>
<li><a href="#m3">공정시장가액비율</a></li>
<li><a href="#m4">과세기준일과 납기</a></li>
<li><a href="#faq">자주 묻는 질문</a></li>
</ol></div>

<div class="ax-side"><h4>같은 분류의 글</h4>
<a class="ax-rel" href="/realestate/acquisition-tax-guide/">취득세 계산, 6억과 7억의 차이<span>취득세</span></a>
<a class="ax-rel" href="/realestate/transfer-tax-guide/">1세대 1주택 양도세 비과세<span>양도세</span></a>
<a class="ax-rel" href="/insurance/auto-tax-guide/">자동차세 1월 연납 할인<span>자동차세</span></a>
</div>`;

export const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      "name": "공시가 5억 주택의 재산세는 얼마인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "일반(다주택 등)이면 과세표준 3억원에 재산세 570,000원, 지방교육세 114,000원으로 총 684,000원입니다. 1세대 1주택이면 과세표준 2억 2천만원에 재산세 260,000원, 지방교육세 52,000원으로 총 312,000원입니다. 지방세법 제111조·제111조의2·제151조 제1항 제6호"
      }
    },
    {
      "@type": "Question",
      "name": "재산세 공정시장가액비율은 몇 퍼센트인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "일반 주택은 60%입니다. 1세대 1주택은 시가표준액에 따라 3억원 이하 43%, 3억 초과 6억 이하 44%, 6억 초과 45%로 나뉩니다. 2026년도 전년과 같은 비율이 유지됐습니다. 지방세법 시행령 제109조"
      }
    },
    {
      "@type": "Question",
      "name": "재산세 과세기준일은 언제인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "매년 6월 1일입니다. 이날 주택을 소유한 사람이 그 해 재산세 전액을 냅니다. 5월 31일에 팔면 내지 않고, 6월 2일에 팔면 1년치를 모두 부담합니다. 지방세법 제114조"
      }
    },
    {
      "@type": "Question",
      "name": "재산세는 언제 내나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "주택은 7월 16일~31일에 절반, 9월 16일~30일에 나머지 절반을 냅니다. 다만 연세액이 20만원 이하면 조례에 따라 7월에 한꺼번에 부과할 수 있습니다. 토지는 9월, 건축물은 7월입니다. 지방세법 제115조 제1항"
      }
    },
    {
      "@type": "Question",
      "name": "1세대 1주택이면 재산세가 얼마나 줄어드나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "두 군데가 낮아집니다. 공정시장가액비율이 60%에서 43~45%로, 세율도 각 구간에서 낮은 값이 적용됩니다. 공시가 5억이면 684,000원이 312,000원으로 2.19배 줄고, 9억이면 1,836,000원이 945,000원이 됩니다. 지방세법 제111조의2 제1항 · 시행령 제109조"
      }
    },
    {
      "@type": "Question",
      "name": "고지서 금액이 계산값보다 많은데 왜 그런가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "실제 고지서에는 재산세 본세와 지방교육세 외에 도시지역분 재산세와 지역자원시설세가 함께 부과되는 경우가 많습니다. 이 글의 계산은 지방세법 제111조의 본세와 지방교육세만 반영한 값입니다. 정확한 고지세액은 위택스나 관할 지자체에서 확인하세요. 지방세법 제112조 (도시지역분) · 제151조 제1항 제6호"
      }
    },
    {
      "@type": "Question",
      "name": "집을 6월에 팔면 재산세는 누가 내나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "6월 1일 기준 소유자가 냅니다. 잔금일이 6월 1일 이전이면 매수인이, 6월 2일 이후면 매도인이 그 해 재산세 전액을 부담합니다. 일할 계산은 없습니다. 계약서에 특약으로 정산 방법을 정해두는 것이 일반적입니다. 지방세법 제114조 (과세기준일)"
      }
    }
  ],
};
