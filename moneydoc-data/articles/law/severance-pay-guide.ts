// 자동 생성: scripts/convert-previews.mjs — 직접 수정하지 말 것
// 원본: public/_preview/1-퇴직금-계산방법.html
export const meta = {
  title: "퇴직금 계산 방법과 평균임금 산정기준, 퇴사일 따라 달라집니다",
  description: "퇴직금 계산법과 평균임금 산정기준. 3개월 총일수가 89일이냐 92일이냐에 따라 1일 평균임금이 3,298원 달라집니다. 통상임금이 더 큰 경우까지 법령 원문으로 정리했습니다.",
  datePublished: "2026-09-01",
  dateModified: "2026-09-01",
  url: "https://moneydoc.kr/law/severance-pay-guide/",
};

export const widgetKey = "severance";

export const widgetHtml = `<div class="ax-wg" id="wg1">
<div class="ax-wg-h"><b>평균임금 간이 산정</b>
<span>퇴사일과 급여를 넣으면 3개월 총일수와 1일 평균임금이 나옵니다</span></div>
<div class="ax-wg-in">
  <label class="ax-wg-f"><em>퇴사일</em><input type="date" id="ret" value="2026-01-01"></label>
  <label class="ax-wg-f"><em>월 기본급 (원)</em><input type="number" id="pay" value="3000000" step="100000" min="0"></label>
  <label class="ax-wg-f"><em>연간 상여금 (원)</em><input type="number" id="bonus" value="0" step="500000" min="0"></label>
  <label class="ax-wg-f"><em>전년 미사용 연차수당 (원)</em><input type="number" id="leave" value="0" step="100000" min="0"></label>
</div>
<div class="ax-wg-out" id="out"></div>
<p class="ax-wg-note">산정기간은 퇴사일 직전 3개월입니다. 통상임금 일급은 주 40시간·1일 8시간 기준으로 월 209시간을 적용해 환산한 값입니다. 퇴사일이 매월 1일이 아니면 월 경계가 나뉘어 실제 금액과 차이가 날 수 있으니 <a href="/law/severance-pay/">퇴직금 계산기</a>에서 확인하세요.</p>
</div>`;

export const htmlBefore = `<h1>퇴직금 계산 방법과 평균임금 산정기준, 퇴사일 따라 달라집니다</h1>
<p class="ax-by">MoneyDoc 편집팀 · 2026년 9월 1일 기준 · 약 7분</p>

<svg class="ax-hero" viewBox="0 0 1100 563" role="img" aria-label="퇴직금 계산 어떻게 하나 — 평균임금 산정기준 통상임금 근속연수">
<rect width="1100" height="563" fill="#f7f2ea"/>
<path d="M820 0h280v240a60 60 0 0 1-60 60H820z" fill="#f6e3de"/>
<circle cx="1012" cy="72" r="46" fill="#f2d9d2" opacity=".55"/>
<rect x="72" y="160" width="120" height="42" rx="9" fill="#c4452f"/>
<text x="132" y="189" font-size="19" font-weight="800" text-anchor="middle" fill="#fff" letter-spacing="-.5">근로·퇴직</text>
<text x="72" y="282" font-size="57" font-weight="800" fill="#2b2723" letter-spacing="-2.6">퇴직금 계산</text>
<rect x="70" y="312" width="286" height="26" fill="#f2cfc8"/>
<text x="72" y="349" font-size="57" font-weight="800" fill="#c4452f" letter-spacing="-2.6">어떻게 하나</text>
<text x="72" y="400" font-size="21" font-weight="700" fill="#6f6858" letter-spacing="-.8">3개월 총일수 89일과 92일, 1일 3,298원 차이</text>
<rect x="0" y="545" width="1100" height="18" fill="#c4452f"/>
<g transform="translate(618 138)">
  <ellipse cx="210" cy="298" rx="180" ry="19" fill="#e8ded0" opacity=".55"/>
  <g transform="rotate(-6 120 150)">
    <rect x="36" y="44" width="172" height="222" rx="10" fill="#fdfcfa" stroke="#6b6255" stroke-width="4"/>
    <rect x="62" y="82" width="104" height="11" rx="5" fill="#2b2723"/>
    <rect x="62" y="114" width="120" height="7" rx="3.5" fill="#cfc6b6"/>
    <rect x="62" y="136" width="120" height="7" rx="3.5" fill="#cfc6b6"/>
    <rect x="62" y="158" width="88" height="7" rx="3.5" fill="#cfc6b6"/>
    <rect x="62" y="182" width="120" height="16" rx="6" fill="#f2cfc8"/>
    <text x="122" y="238" font-size="26" font-weight="800" text-anchor="middle" fill="#c4452f">÷ 92</text>
  </g>
  <path d="M236 162h50" stroke="#3d7a3d" stroke-width="7" stroke-linecap="round"/>
  <path d="M274 148l16 14-16 14" fill="none" stroke="#3d7a3d" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
  <ellipse cx="358" cy="192" rx="46" ry="42" fill="#d9bd6a" stroke="#6b6255" stroke-width="4"/>
  <ellipse cx="358" cy="186" rx="31" ry="27" fill="none" stroke="#a8894a" stroke-width="3"/>
  <text x="358" y="200" font-size="24" font-weight="800" text-anchor="middle" fill="#6b6255">₩</text>
  <ellipse cx="410" cy="242" rx="40" ry="36" fill="#d9bd6a" stroke="#6b6255" stroke-width="4"/>
  <ellipse cx="410" cy="237" rx="26" ry="22" fill="none" stroke="#a8894a" stroke-width="3"/>
  <g transform="translate(396 20)">
    <circle cx="46" cy="52" r="42" fill="#fdf4f1" stroke="#c4452f" stroke-width="5"/>
    <path d="M46 28v26l17 12" fill="none" stroke="#c4452f" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="36" y="2" width="20" height="9" rx="4" fill="#8a8172"/>
  </g>
</g>
</svg>

<p class="ax-intro">퇴직금 공식은 한 줄입니다. 그런데 실제 금액이 갈리는 곳은 공식이 아니라 <b>평균임금을 어떻게 산정하느냐</b>입니다. 3개월을 며칠로 세는지, 어떤 기간을 빼는지, 상여금을 얼마나 넣는지에 따라 결과가 달라집니다. 법령 원문 순서대로 정리했습니다.</p>

<a class="ax-cta" href="/law/severance-pay/">
<span><b>내 퇴직금 바로 계산하기</b><i>입사일·퇴사일·월급만 넣으면 됩니다. 고용노동부 산식과 0원 일치</i></span>
<em>퇴직금 계산하기</em></a>

<div class="ax-toc"><b>이 글에서는</b><a href="#m1">계산 공식 2단계</a><a href="#m2">통상임금과 근속별 금액 2단계</a><a href="#tips">알아두면 좋은 것</a><a href="#faq">자주 묻는 질문</a><a href="#src">근거 법령 원문</a></div>`;

export const htmlAfter = `<div class="ax-mh" id="m1"><b>1단계 — 계산 공식</b><span>공식과 평균임금 산정기준</span></div>

<div class="ax-st"><div class="ax-n">1</div><div class="ax-sb">
<h3>퇴직금 계산법, 공식은 어떻게 되나요</h3>
<p>법이 정한 최저 기준은 계속근로기간 1년에 대해 30일분 이상의 평균임금입니다. 여기서 공식이 나옵니다.</p>
<figure class="ax-il">
<svg viewBox="0 0 860 300" role="img" aria-label="3개월 임금총액을 총일수로 나눠 1일 평균임금을 구하고 30일과 재직일수를 곱해 퇴직금을 계산합니다">
<rect width="860" height="300" fill="#f6f1e9"/>
<ellipse cx="430" cy="268" rx="290" ry="17" fill="#e8ded0" opacity=".5"/>
<g transform="translate(66 40)">
  <rect x="26" y="26" width="150" height="192" rx="10" fill="#efe9dd" stroke="#6b6255" stroke-width="3.5"/>
  <rect x="13" y="13" width="150" height="192" rx="10" fill="#f7f3ea" stroke="#6b6255" stroke-width="3.5"/>
  <rect x="0" y="0" width="150" height="192" rx="10" fill="#fdfcfa" stroke="#6b6255" stroke-width="4"/>
  <rect x="24" y="28" width="80" height="10" rx="5" fill="#2b2723"/>
  <rect x="24" y="58" width="102" height="7" rx="3.5" fill="#cfc6b6"/>
  <rect x="24" y="80" width="102" height="7" rx="3.5" fill="#cfc6b6"/>
  <rect x="24" y="102" width="72" height="7" rx="3.5" fill="#cfc6b6"/>
  <rect x="24" y="134" width="102" height="16" rx="6" fill="#f2cfc8"/>
  <text x="75" y="180" font-size="15" font-weight="700" text-anchor="middle" fill="#8a8172">3개월 임금총액</text>
</g>
<text x="304" y="146" font-size="34" font-weight="800" text-anchor="middle" fill="#6b6255">÷</text>
<text x="304" y="176" font-size="14" font-weight="700" text-anchor="middle" fill="#8a8172">총일수</text>
<g transform="translate(352 76)">
  <rect x="0" y="20" width="180" height="108" rx="14" fill="#fdfcfa" stroke="#6b6255" stroke-width="4"/>
  <text x="90" y="72" font-size="25" font-weight="800" text-anchor="middle" fill="#2b2723" letter-spacing="-1">1일 평균임금</text>
  <text x="90" y="104" font-size="14" font-weight="600" text-anchor="middle" fill="#8a8172">89~92일로 나눔</text>
</g>
<path d="M560 146h48" stroke="#3d7a3d" stroke-width="7" stroke-linecap="round"/>
<path d="M596 132l16 14-16 14" fill="none" stroke="#3d7a3d" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
<text x="584" y="118" font-size="13.5" font-weight="700" text-anchor="middle" fill="#3d7a3d">×30×일수/365</text>
<g transform="translate(642 66)">
  <ellipse cx="74" cy="98" rx="62" ry="56" fill="#d9bd6a" stroke="#6b6255" stroke-width="4"/>
  <ellipse cx="74" cy="92" rx="42" ry="36" fill="none" stroke="#a8894a" stroke-width="3"/>
  <text x="74" y="104" font-size="30" font-weight="800" text-anchor="middle" fill="#6b6255">₩</text>
  <text x="74" y="182" font-size="18" font-weight="800" text-anchor="middle" fill="#c4452f">퇴직금</text>
</g>
</svg>
<figcaption>「근로자퇴직급여 보장법」 제8조제1항</figcaption>
</figure>
<div class="ax-tw"><table>
<thead><tr><th>단계</th><th>내용</th></tr></thead>
<tbody>
<tr><td>1. 재직일수</td><td>입사일부터 퇴사일까지의 일수. 365일 미만이면 여기서 끝</td></tr>
<tr><td>2. 산정기간</td><td>퇴사일 직전 3개월. 달마다 일수가 달라 89~92일</td></tr>
<tr class="ax-hi"><td>3. 임금총액</td><td>3개월 기본급 + 연간 상여금 × 3/12 + 전년 연차수당 × 3/12</td></tr>
<tr class="ax-hi"><td>4. 1일 평균임금</td><td>임금총액 ÷ 3개월 총일수</td></tr>
<tr><td>5. 퇴직금</td><td>1일 평균임금 × 30 × 재직일수 ÷ 365</td></tr>
</tbody></table>
<p class="ax-tn">고용노동부 공식 계산기가 밟는 순서와 같습니다. MoneyDoc 계산기는 이 순서를 그대로 구현해 정부 계산기와 5개 표본에서 0원 일치를 확인했습니다.</p></div>
</div></div>

<div class="ax-st"><div class="ax-n">2</div><div class="ax-sb">
<h3>평균임금 산정기준과 최근 3개월</h3>
<p>평균임금은 산정 사유가 발생한 날 이전 3개월 동안 지급된 임금 총액을 <b>그 기간의 총일수</b>로 나눈 금액입니다. 30일이 아니라 달력상 실제 일수로 나누기 때문에, 퇴사 시기에 따라 같은 월급이라도 1일 평균임금이 달라집니다.</p>
<div class="ax-tw"><table>
<thead><tr><th>3개월 총일수</th><th>1일 평균임금 (월 300만)</th><th>차이</th></tr></thead>
<tbody>
<tr class="ax-hi"><td>89일</td><td>101,123.60원</td><td>가장 유리</td></tr>
<tr><td>90일</td><td>100,000.00원</td><td>−1,124원</td></tr>
<tr><td>91일</td><td>98,901.10원</td><td>−2,223원</td></tr>
<tr><td>92일</td><td>97,826.09원</td><td>−3,298원</td></tr>
</tbody></table>
<p class="ax-tn">2·3월이 낀 겨울에 퇴사하면 총일수가 89~90일로 짧아 1일 평균임금이 높아집니다. 여름은 92일이 되기 쉽습니다.</p></div>
<p class="ax-nt">산정기간 중에 아래 기간이 있으면 <b>그 기간과 그 기간에 지급된 임금을 양쪽에서 모두 뺍니다.</b> 무급이거나 임금이 적은 기간 때문에 평균임금이 깎이는 것을 막기 위한 규정입니다.</p>
<ul class="ax-ck">
<li>수습 시작일부터 3개월 이내</li><li>사용자 귀책 휴업기간</li>
<li>출산전후휴가·유산사산휴가</li><li>업무상 부상·질병 요양 휴업</li>
<li>육아휴직</li><li>쟁의행위기간</li>
<li>병역·예비군·민방위 의무 이행</li><li>승인받은 업무 외 부상·질병 휴업</li>
</ul>
<figure class="ax-ig">
<svg viewBox="0 0 660 150" role="img" aria-label="산정기간에 제외 기간이 있으면 그 기간과 임금을 모두 빼고 나머지로 평균임금을 계산합니다">
<text x="0" y="18" font-size="13" font-weight="700" fill="currentColor" letter-spacing="-.3">제외 기간이 있으면 기간과 임금을 함께 뺍니다</text>
<rect x="0" y="44" width="300" height="40" rx="8" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".55"/>
<text x="150" y="69" font-size="12.5" font-weight="700" text-anchor="middle" fill="currentColor" letter-spacing="-.3">퇴사일 직전 3개월 (89~92일)</text>
<rect x="196" y="44" width="104" height="40" rx="8" fill="#c4452f" opacity=".14"/>
<text x="248" y="69" font-size="11.5" font-weight="700" text-anchor="middle" fill="#c4452f" letter-spacing="-.3">육아휴직 등</text>
<line x1="300" y1="64" x2="352" y2="64" stroke="#c4452f" stroke-width="2" stroke-linecap="round"/>
<polygon points="343,59 343,69 352,64" fill="#c4452f"/>
<text x="326" y="54" font-size="10.5" font-weight="600" text-anchor="middle" fill="#c4452f" letter-spacing="-.3">제외</text>
<rect x="352" y="44" width="196" height="40" rx="8" fill="none" stroke="#c4452f" stroke-width="1.5"/>
<text x="450" y="69" font-size="12.5" font-weight="700" text-anchor="middle" fill="#c4452f" letter-spacing="-.3">남은 기간 · 남은 임금</text>
<text x="620" y="69" font-size="13" font-weight="800" text-anchor="middle" fill="currentColor" opacity=".7">= 평균임금</text>
<text x="0" y="122" font-size="11.5" font-weight="600" fill="currentColor" opacity=".6" letter-spacing="-.3">임시로 지급된 임금·수당과 현물로 지급된 임금은 임금총액에 넣지 않습니다</text>
</svg>
<figcaption>「근로기준법」 제2조제1항제6호 · 같은 법 시행령 제2조</figcaption>
</figure>
<div class="ax-cp">
  <div><em>상여 없음 · 월 300만 · 3년</em><b>8,812,389원</b><i>1일 평균임금 97,826.09원</i></div>
  <div class="ax-hi"><em>연 상여 600만 · 월 300만 · 3년</em><b>10,281,120원</b><i>1일 평균임금 114,130.44원</i></div>
</div>
<p class="ax-tn">연간 상여금은 전액이 아니라 1년치의 3/12만 가산합니다. 600만 원의 3/12인 150만 원이 더해져 퇴직금이 1,468,731원 늘었습니다. 입사 2023-01-01, 퇴사 2026-01-01 기준.</p>
</div></div>

<div class="ax-mh ax-b" id="m2"><b>2단계 — 통상임금과 금액</b><span>하한 규정 · 근속별 퇴직금</span></div>

<div class="ax-st ax-b2"><div class="ax-n">3</div><div class="ax-sb">
<h3>퇴직금 통상임금 계산은 언제 쓰나요</h3>
<p>평균임금이 통상임금보다 적게 나오면 <b>통상임금액을 평균임금으로 봅니다.</b> 근로자가 손해 보지 않도록 둔 하한선입니다. 통상임금은 정기적·일률적으로 지급하기로 정한 금액을 말하고, 월급을 시간급으로 바꿀 때는 월의 통상임금 산정 기준시간 수로 나눕니다.</p>
<figure class="ax-ig">
<svg viewBox="0 0 660 170" role="img" aria-label="월급을 209시간으로 나눠 시간급을 구하고 1일 소정근로시간 8시간을 곱해 1일 통상임금을 구합니다">
<text x="0" y="18" font-size="13" font-weight="700" fill="currentColor" letter-spacing="-.3">월급에서 1일 통상임금 구하기 (주 40시간 기준)</text>
<rect x="0" y="44" width="150" height="48" rx="8" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".55"/>
<text x="75" y="66" font-size="12.5" font-weight="700" text-anchor="middle" fill="currentColor" letter-spacing="-.3">월급 금액</text>
<text x="75" y="83" font-size="10.5" text-anchor="middle" fill="currentColor" opacity=".6" letter-spacing="-.3">3,000,000원</text>
<line x1="150" y1="68" x2="196" y2="68" stroke="currentColor" stroke-width="2" opacity=".6" stroke-linecap="round"/>
<polygon points="188,63 188,73 196,68" fill="currentColor" opacity=".6"/>
<text x="173" y="58" font-size="10.5" font-weight="600" text-anchor="middle" fill="currentColor" opacity=".6">÷209</text>
<rect x="196" y="44" width="150" height="48" rx="8" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".55"/>
<text x="271" y="66" font-size="12.5" font-weight="700" text-anchor="middle" fill="currentColor" letter-spacing="-.3">시간급 통상임금</text>
<text x="271" y="83" font-size="10.5" text-anchor="middle" fill="currentColor" opacity=".6" letter-spacing="-.3">14,354.07원</text>
<line x1="346" y1="68" x2="392" y2="68" stroke="#c4452f" stroke-width="2" stroke-linecap="round"/>
<polygon points="384,63 384,73 392,68" fill="#c4452f"/>
<text x="369" y="58" font-size="10.5" font-weight="600" text-anchor="middle" fill="#c4452f">×8</text>
<rect x="392" y="44" width="268" height="48" rx="8" fill="none" stroke="#c4452f" stroke-width="1.5"/>
<text x="526" y="66" font-size="12.5" font-weight="700" text-anchor="middle" fill="#c4452f" letter-spacing="-.3">1일 통상임금 114,832.54원</text>
<text x="526" y="83" font-size="10.5" text-anchor="middle" fill="#c4452f" opacity=".85" letter-spacing="-.3">1일 소정근로시간 8시간</text>
<text x="0" y="126" font-size="11.5" font-weight="600" fill="currentColor" opacity=".6" letter-spacing="-.3">209시간 = (소정근로 40시간 + 유급주휴 8시간) × 52.142857주 ÷ 12개월 = 208.57시간</text>
<text x="0" y="148" font-size="11.5" font-weight="600" fill="currentColor" opacity=".6" letter-spacing="-.3">1년 동안의 평균 주의 수 52.142857 = 365 ÷ 7</text>
</svg>
<figcaption>「근로기준법」 제2조제2항 · 같은 법 시행령 제6조제1항·제2항제4호·제3항</figcaption>
</figure>
<p class="ax-nt">두 값을 나란히 놓으면 왜 이 규정이 중요한지 보입니다. 수당이나 상여금 없이 <b>기본급만 받는 월급제 근로자</b>는 평균임금이 통상임금보다 낮게 나오는 경우가 흔합니다.</p>
<div class="ax-tw"><table>
<thead><tr><th>월 기본급</th><th>1일 평균임금 (92일)</th><th>1일 통상임금</th><th>적용되는 값</th></tr></thead>
<tbody>
<tr><td>250만</td><td>81,521.74</td><td>95,693.78</td><td>통상임금</td></tr>
<tr class="ax-hi"><td>300만</td><td>97,826.09</td><td>114,832.54</td><td>통상임금</td></tr>
<tr><td>400만</td><td>130,434.78</td><td>153,110.05</td><td>통상임금</td></tr>
<tr><td>500만</td><td>163,043.48</td><td>191,387.56</td><td>통상임금</td></tr>
</tbody></table>
<p class="ax-tn">단위: 원. 상여금·수당이 전혀 없고 3개월 총일수가 92일인 경우를 가정했습니다. 상여금과 각종 수당이 붙으면 평균임금이 올라가 순서가 뒤집힙니다.</p></div>
<div class="ax-warn"><span>주의</span><p>고용노동부 계산기와 대부분의 온라인 계산기는 <b>평균임금 기준으로만</b> 금액을 냅니다. 기본급 외에 받는 것이 거의 없다면 통상임금으로 계산한 값과 비교해 보고, 통상임금이 더 크면 그 금액으로 청구할 수 있습니다.</p></div>
</div></div>

<div class="ax-st ax-b2"><div class="ax-n">4</div><div class="ax-sb">
<h3>3년 5년 근속 퇴직금 평균은 얼마인가요</h3>
<p>상여금과 연차수당을 0으로, 퇴사일을 2026년 1월 1일로 두고 계산한 세전 금액입니다.</p>
<div class="ax-tw"><table>
<thead><tr><th>월 기본급</th><th>1년</th><th>3년</th><th>5년</th><th>10년</th></tr></thead>
<tbody>
<tr><td>250만</td><td>2,445,652</td><td>7,343,657</td><td>12,234,961</td><td>24,476,623</td></tr>
<tr class="ax-hi"><td>300만</td><td>2,934,783</td><td>8,812,389</td><td>14,681,954</td><td>29,371,949</td></tr>
<tr><td>400만</td><td>3,913,044</td><td>11,749,852</td><td>19,575,939</td><td>39,162,599</td></tr>
<tr><td>500만</td><td>4,891,304</td><td>14,687,314</td><td>24,469,923</td><td>48,953,247</td></tr>
</tbody></table>
<p class="ax-tn">단위: 원(세전). 재직일수 1년 365일 · 3년 1,096일 · 5년 1,826일 · 10년 3,653일 기준이며 윤년에 따라 하루 단위로 달라집니다.</p></div>
<p class="ax-nt">퇴직금은 재직일수에 비례합니다. 월급이 같다면 10년 근속은 1년 근속의 약 10배입니다. 다만 평균임금은 <b>퇴직 직전 3개월</b>만 보기 때문에, 그 3개월 급여가 낮아지면 근속 전체의 퇴직금이 함께 줄어듭니다.</p>
<div class="ax-cp">
  <div><em>재직 365일 · 딱 1년</em><b>2,934,783원</b><i>월 기본급 300만 · 세전</i></div>
  <div class="ax-hi"><em>재직 366일 · 1년 하루</em><b>2,942,823원</b><i>하루당 8,040원</i></div>
</div>
<div class="ax-btns">
<a class="ax-btn" href="/law/severance-pay/"><b>퇴직금 계산기</b><span>내 입사일·퇴사일로 정확히 계산</span></a>
<a class="ax-btn" href="https://www.moel.go.kr/retirementpayCal.do" target="_blank" rel="noopener"><b>고용노동부 계산기</b><span>공식 계산기로 교차 확인</span></a>
</div>
</div></div>

<h2 class="ax-sec" id="tips">알아두면 좋은 것</h2>
<ul class="ax-tips">
<li>퇴사 시기를 고를 수 있다면 3개월 총일수가 짧은 구간이 유리합니다. 같은 월급이라도 89일과 92일은 1일 평균임금이 3,298원 차이 납니다.</li>
<li>퇴직 직전 3개월에 무급휴직이나 임금 삭감이 있으면 근속 전체의 퇴직금이 줄어듭니다. 다만 육아휴직·산재요양 등 법이 정한 기간은 산정기간에서 빠지므로 불이익이 없습니다.</li>
<li>임시로 지급된 임금과 수당, 현물로 지급된 임금은 임금총액에 넣지 않습니다.</li>
<li>연간 상여금과 전년도 미사용 연차수당은 전액이 아니라 3/12만 가산합니다.</li>
<li>퇴직급여제도를 아예 설정하지 않은 사업장은 퇴직금제도를 설정한 것으로 봅니다. 회사에 제도가 없다는 이유로 지급을 거절할 수 없습니다.</li>
</ul>

<h2 class="ax-sec" id="faq">자주 묻는 질문</h2>

<details class="ax-acc" open><summary>내 퇴직금은 어떻게 계산하나요?</summary>
<div class="ax-ab"><p>1일 평균임금 × 30일 × (재직일수 ÷ 365)입니다. 1일 평균임금은 퇴직 직전 3개월 임금 총액을 그 기간의 총일수로 나눈 값이고, 연간 상여금과 전년도 미사용 연차수당은 3/12만 더합니다.</p>
<p class="ax-law">「근로자퇴직급여 보장법」 제8조제1항 · 「근로기준법」 제2조제1항제6호</p></div></details>

<details class="ax-acc"><summary>3개월 총일수는 왜 89일에서 92일까지 달라지나요?</summary>
<div class="ax-ab"><p>평균임금은 30일이 아니라 산정기간의 <b>달력상 총일수</b>로 나누기 때문입니다. 2월이 낀 구간은 89~90일, 31일이 많은 구간은 92일이 됩니다. 월 300만 원 기준으로 89일이면 101,123.60원, 92일이면 97,826.09원입니다.</p>
<p class="ax-law">「근로기준법」 제2조제1항제6호</p></div></details>

<details class="ax-acc"><summary>육아휴직 중에 퇴사하면 평균임금이 확 줄어드나요?</summary>
<div class="ax-ab"><p>줄지 않습니다. 육아휴직 기간은 평균임금 산정기간과 임금총액에서 모두 제외합니다. 출산전후휴가, 업무상 부상·질병 요양 휴업, 사용자 귀책 휴업, 쟁의행위기간, 병역 의무 이행 기간도 같습니다.</p>
<p class="ax-law">「근로기준법 시행령」 제2조제1항</p></div></details>

<details class="ax-acc"><summary>평균임금이 통상임금보다 적게 나왔습니다.</summary>
<div class="ax-ab"><p>그 경우에는 통상임금액을 평균임금으로 봅니다. 월급 300만 원에 다른 수당이 없다면 1일 평균임금은 97,826.09원, 1일 통상임금은 114,832.54원이라 통상임금이 적용됩니다.</p>
<p class="ax-law">「근로기준법」 제2조제2항 · 같은 법 시행령 제6조</p></div></details>

<details class="ax-acc"><summary>퇴직금 계산에서 209시간은 어디서 나온 숫자인가요?</summary>
<div class="ax-ab"><p>월급을 시간급으로 바꿀 때 쓰는 월의 통상임금 산정 기준시간 수입니다. 1주 소정근로 40시간에 유급으로 처리되는 주휴 8시간을 더한 48시간에, 1년 동안의 평균 주의 수 52.142857(=365÷7)을 곱하고 12로 나누면 208.57시간이 나옵니다.</p>
<p class="ax-law">「근로기준법 시행령」 제6조제2항제4호</p></div></details>

<div class="ax-sum">
<h4>정리</h4>
<ul>
<li>퇴직금은 <b>1일 평균임금 × 30일 × (재직일수 ÷ 365)</b>입니다.</li>
<li>평균임금은 퇴직 직전 3개월 임금총액을 <b>달력상 총일수(89~92일)</b>로 나눈 값입니다.</li>
<li>연간 상여금과 전년도 미사용 연차수당은 전액이 아니라 <b>3/12만</b> 더합니다.</li>
<li>육아휴직·출산휴가·산재요양 등 8가지 기간은 <b>기간과 임금을 함께 빼고</b> 계산합니다.</li>
<li>평균임금이 통상임금보다 적으면 <b>통상임금액</b>을 평균임금으로 봅니다.</li>
</ul>
<a class="ax-cta" href="/law/severance-pay/">
<span><b>퇴직금 계산기로 내 금액 확인하기</b><i>3개월 총일수와 상여금 3/12 가산까지 자동 반영</i></span>
<em>퇴직금 계산하기</em></a>
<p class="ax-tn" style="margin-top:14px">퇴직금의 다른 주제는 <a href="/law/severance-pay-guide/" style="color:var(--ac);font-weight:700">퇴직금 전체 가이드</a>에서 볼 수 있습니다.</p>
</div>

<h2 class="ax-sec" id="src">근거 법령 원문</h2>

<p class="ax-collected">아래 조문은 2026년 9월 1일 <b>국가법령정보센터(law.go.kr)</b>에서 직접 조회해 옮긴 원문입니다. 요약하지 않았습니다.</p>

<div class="ax-lawq"><b>「근로자퇴직급여 보장법」 제8조(퇴직금제도의 설정 등) 제1항 &nbsp;[시행 2026. 7. 1.] [법률 제21475호]</b>
<p>퇴직금제도를 설정하려는 사용자는 계속근로기간 1년에 대하여 30일분 이상의 평균임금을 퇴직금으로 퇴직 근로자에게 지급할 수 있는 제도를 설정하여야 한다.</p></div>

<div class="ax-lawq"><b>「근로기준법」 제2조(정의) 제1항제6호</b>
<p>“평균임금”이란 이를 산정하여야 할 사유가 발생한 날 이전 3개월 동안에 그 근로자에게 지급된 임금의 총액을 그 기간의 총일수로 나눈 금액을 말한다. 근로자가 취업한 후 3개월 미만인 경우도 이에 준한다.</p></div>

<div class="ax-lawq"><b>「근로기준법」 제2조(정의) 제2항</b>
<p>제1항제6호에 따라 산출된 금액이 그 근로자의 통상임금보다 적으면 그 통상임금액을 평균임금으로 한다.</p></div>

<div class="ax-lawq"><b>「근로기준법 시행령」 제2조(평균임금의 계산에서 제외되는 기간과 임금) 제1항</b>
<p>「근로기준법」(이하 “법”이라 한다) 제2조제1항제6호에 따른 평균임금 산정기간 중에 다음 각 호의 어느 하나에 해당하는 기간이 있는 경우에는 그 기간과 그 기간 중에 지급된 임금은 평균임금 산정기준이 되는 기간과 임금의 총액에서 각각 뺀다.</p>
<ol>
<li>근로계약을 체결하고 수습 중에 있는 근로자가 수습을 시작한 날부터 3개월 이내의 기간</li>
<li>법 제46조에 따른 사용자의 귀책사유로 휴업한 기간</li>
<li>법 제74조제1항부터 제3항까지의 규정에 따른 출산전후휴가 및 유산ㆍ사산 휴가 기간</li>
<li>법 제78조에 따라 업무상 부상 또는 질병으로 요양하기 위하여 휴업한 기간</li>
<li>「남녀고용평등과 일ㆍ가정 양립 지원에 관한 법률」 제19조에 따른 육아휴직 기간</li>
<li>「노동조합 및 노동관계조정법」 제2조제6호에 따른 쟁의행위기간</li>
<li>「병역법」, 「예비군법」 또는 「민방위기본법」에 따른 의무를 이행하기 위하여 휴직하거나 근로하지 못한 기간. 다만, 그 기간 중 임금을 지급받은 경우에는 그러하지 아니하다.</li>
<li>업무 외 부상이나 질병, 그 밖의 사유로 사용자의 승인을 받아 휴업한 기간</li>
</ol></div>

<div class="ax-lawq"><b>「근로기준법 시행령」 제2조 제2항</b>
<p>법 제2조제1항제6호에 따른 임금의 총액을 계산할 때에는 임시로 지급된 임금 및 수당과 통화 외의 것으로 지급된 임금을 포함하지 아니한다. 다만, 고용노동부장관이 정하는 것은 그러하지 아니하다.</p></div>

<div class="ax-lawq"><b>「근로기준법 시행령」 제6조(통상임금) 제1항</b>
<p>법과 이 영에서 “통상임금”이란 근로자에게 정기적이고 일률적으로 소정(所定)근로 또는 총 근로에 대하여 지급하기로 정한 시간급 금액, 일급 금액, 주급 금액, 월급 금액 또는 도급 금액을 말한다.</p></div>

<div class="ax-lawq"><b>「근로기준법 시행령」 제6조 제2항제4호</b>
<p>월급 금액으로 정한 임금은 그 금액을 월의 통상임금 산정 기준시간 수(1주의 통상임금 산정 기준시간 수에 1년 동안의 평균 주의 수를 곱한 시간을 12로 나눈 시간)로 나눈 금액</p></div>

<div class="ax-lawq"><b>「근로기준법 시행령」 제6조 제3항</b>
<p>제1항에 따른 통상임금을 일급 금액으로 산정할 때에는 제2항에 따른 시간급 금액에 1일의 소정근로시간 수를 곱하여 계산한다.</p></div>

<div class="ax-src"><b>출처 · 국가법령정보센터, 고용노동부</b><br>
원문은 <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" target="_blank" rel="noopener">근로자퇴직급여 보장법</a> ·
<a href="https://www.law.go.kr/법령/근로기준법" target="_blank" rel="noopener">근로기준법</a> ·
<a href="https://www.law.go.kr/법령/근로기준법시행령" target="_blank" rel="noopener">근로기준법 시행령</a>에서 확인할 수 있습니다.
계산 절차는 <a href="https://www.moel.go.kr/retirementpayCal.do" target="_blank" rel="noopener">고용노동부 퇴직금 계산기</a>의 산식을 따랐습니다.<br><br>
본 계산 결과는 참고용이며 법적 효력을 갖는 유권해석의 근거가 되지 않습니다. 구체적인 사안은 관할 지방고용노동관서에 문의하시기 바랍니다.</div>`;

export const asideHtml = `<div class="ax-side"><h4>이 글의 단계</h4>
<ol>
<li><a href="#m1">퇴직금 계산 공식</a></li>
<li><a href="#m1">평균임금 산정기준</a></li>
<li><a href="#m2">통상임금을 쓰는 경우</a></li>
<li><a href="#m2">근속별 퇴직금</a></li>
<li><a href="#faq">자주 묻는 질문</a></li>
<li><a href="#src">근거 법령 원문</a></li>
</ol></div>

<div class="ax-side"><h4>퇴직금 계산기</h4>
<a class="ax-rel" href="/law/severance-pay/">입사일·퇴사일로 바로 계산하기<span>고용노동부 산식 0원 일치</span></a>
</div>

<div class="ax-side"><h4>같은 분류의 글</h4>
<a class="ax-rel" href="/law/severance-pay-guide/"><b>퇴직금 전체 가이드</b><span>10개 주제 한눈에 보기</span></a>
<a class="ax-rel" href="/tax/retirement-income-tax/">퇴직금 실수령액 세금 몇 프로일까<span>세금</span></a>
<a class="ax-rel" href="/law/severance-pay-guide/">상여금 연차수당 식대 퇴직금 포함되나요<span>포함항목</span></a>
<a class="ax-rel" href="/pension/irp-tax-credit/">퇴직금 수령방법 IRP 통장부터 연금 전환까지<span>수령방법</span></a>
<a class="ax-rel" href="/law/severance-pay-guide/">퇴직금 지급일 언제 들어오나요<span>지급일</span></a>
<a class="ax-rel" href="/law/unpaid-wages/">퇴직금 미지급 신고 처벌 지연이자 대지급금<span>미지급</span></a>
</div>`;

export const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      "name": "내 퇴직금은 어떻게 계산하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1일 평균임금 × 30일 × (재직일수 ÷ 365)입니다. 1일 평균임금은 퇴직 직전 3개월 임금 총액을 그 기간의 총일수로 나눈 값이고, 연간 상여금과 전년도 미사용 연차수당은 3/12만 더합니다. 「근로자퇴직급여 보장법」 제8조제1항 · 「근로기준법」 제2조제1항제6호"
      }
    },
    {
      "@type": "Question",
      "name": "3개월 총일수는 왜 89일에서 92일까지 달라지나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "평균임금은 30일이 아니라 산정기간의 달력상 총일수로 나누기 때문입니다. 2월이 낀 구간은 89~90일, 31일이 많은 구간은 92일이 됩니다. 월 300만 원 기준으로 89일이면 101,123.60원, 92일이면 97,826.09원입니다. 「근로기준법」 제2조제1항제6호"
      }
    },
    {
      "@type": "Question",
      "name": "육아휴직 중에 퇴사하면 평균임금이 확 줄어드나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "줄지 않습니다. 육아휴직 기간은 평균임금 산정기간과 임금총액에서 모두 제외합니다. 출산전후휴가, 업무상 부상·질병 요양 휴업, 사용자 귀책 휴업, 쟁의행위기간, 병역 의무 이행 기간도 같습니다. 「근로기준법 시행령」 제2조제1항"
      }
    },
    {
      "@type": "Question",
      "name": "평균임금이 통상임금보다 적게 나왔습니다.",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "그 경우에는 통상임금액을 평균임금으로 봅니다. 월급 300만 원에 다른 수당이 없다면 1일 평균임금은 97,826.09원, 1일 통상임금은 114,832.54원이라 통상임금이 적용됩니다. 「근로기준법」 제2조제2항 · 같은 법 시행령 제6조"
      }
    },
    {
      "@type": "Question",
      "name": "퇴직금 계산에서 209시간은 어디서 나온 숫자인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "월급을 시간급으로 바꿀 때 쓰는 월의 통상임금 산정 기준시간 수입니다. 1주 소정근로 40시간에 유급으로 처리되는 주휴 8시간을 더한 48시간에, 1년 동안의 평균 주의 수 52.142857(=365÷7)을 곱하고 12로 나누면 208.57시간이 나옵니다. 「근로기준법 시행령」 제6조제2항제4호"
      }
    }
  ],
};
