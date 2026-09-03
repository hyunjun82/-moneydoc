// 자동 생성: scripts/convert-previews.mjs — 직접 수정하지 말 것
// 원본: public/_preview/13-종합소득세.html
export const meta = {
  title: "종합소득세 계산, 세율 구간을 넘으면 세금이 얼마나 뛸까",
  description: "종합소득세는 과세표준 1,400만·5,000만·8,800만원을 경계로 세율이 오릅니다. 하지만 누진공제 때문에 구간을 1원 넘어도 세금은 튀지 않습니다. 소득 5,000만원이면 총 653만원, 신고는 5월 1일~31일입니다.",
  datePublished: "2026-09-01",
  dateModified: "2026-09-01",
  url: "https://moneydoc.kr/tax/comprehensive-income-tax-guide/",
};

export const widgetKey = "compIncome";

export const widgetHtml = `<div class="ax-wg" id="wg1">
<div class="ax-wg-h"><b>종합소득세 계산</b>
<span>종합소득금액과 부양가족 수를 넣으면 과세표준부터 지방소득세까지 나옵니다</span></div>
<div class="ax-wg-in">
  <label class="ax-wg-f"><em>종합소득금액 (원)</em><input type="number" id="inc" value="50000000" step="1000000" min="0"></label>
  <label class="ax-wg-f"><em>기본공제 대상자 수 (본인 포함)</em><input type="number" id="dep" value="1" step="1" min="1" max="10"></label>
  <label class="ax-wg-f"><em>자녀세액공제 대상 자녀 수</em><input type="number" id="kid" value="0" step="1" min="0" max="8"></label>
</div>
<div class="ax-wg-out" id="out"></div>
<p class="ax-wg-note">기본공제 1명당 150만원(소득세법 제50조), 표준세액공제 7만원(제59조의4 제9항 제2호 나목), 지방소득세는 소득세액의 10%입니다. 사업소득 필요경비, 연금계좌·의료비 등 개별 공제는 반영하지 않은 기본 구조 계산입니다.</p>
</div>`;

export const htmlBefore = `<h1>종합소득세 계산, 세율 구간을 넘으면 세금이 얼마나 뛸까</h1>
<p class="ax-by">MoneyDoc 편집팀 · 2026년 9월 1일 기준 · 약 8분</p>

<svg class="ax-hero" viewBox="0 0 1100 563" role="img" aria-label="종합소득세 과세표준 구간을 넘어도 누진공제 때문에 세금이 튀지 않습니다">
<rect width="1100" height="563" fill="#f7f2ea"/>
<path d="M820 0h280v244a60 60 0 0 1-60 60H820z" fill="#e6e2f0"/>
<circle cx="1010" cy="74" r="47" fill="#d8d2e8" opacity=".55"/>
<rect x="72" y="160" width="88" height="42" rx="9" fill="#4a3f7a"/>
<text x="116" y="189" font-size="19" font-weight="800" text-anchor="middle" fill="#fff" letter-spacing="-.5">세금</text>
<text x="72" y="282" font-size="57" font-weight="800" fill="#2b2723" letter-spacing="-2.6">세율 구간 넘어도</text>
<rect x="70" y="312" width="372" height="26" fill="#ddd6ef"/>
<text x="72" y="349" font-size="57" font-weight="800" fill="#4a3f7a" letter-spacing="-2.6">세금은 안 튄다</text>
<text x="72" y="400" font-size="21" font-weight="700" fill="#6f6858" letter-spacing="-.8">과세표준 5,000만원과 5,000만 1원 · 세금 차이 0원</text>
<rect x="0" y="545" width="1100" height="18" fill="#4a3f7a"/>
<g transform="translate(640 178)">
  <ellipse cx="204" cy="248" rx="176" ry="17" fill="#e8ded0" opacity=".55"/>
  <rect x="46" y="196" width="60" height="52" rx="7" fill="#cfc8e4"/>
  <text x="76" y="228" font-size="14" font-weight="800" text-anchor="middle" fill="#4a3f7a">6%</text>
  <rect x="120" y="168" width="60" height="80" rx="7" fill="#b7ade0"/>
  <text x="150" y="216" font-size="14" font-weight="800" text-anchor="middle" fill="#3a3062">15%</text>
  <rect x="194" y="136" width="60" height="112" rx="7" fill="#9186d0"/>
  <text x="224" y="200" font-size="14" font-weight="800" text-anchor="middle" fill="#fff">24%</text>
  <rect x="268" y="94" width="60" height="154" rx="7" fill="#6b5cb8"/>
  <text x="298" y="180" font-size="14" font-weight="800" text-anchor="middle" fill="#fff">35%</text>
  <rect x="342" y="64" width="60" height="184" rx="7" fill="#4a3f7a"/>
  <text x="372" y="164" font-size="14" font-weight="800" text-anchor="middle" fill="#fff">38%</text>
  <text x="224" y="278" font-size="13" font-weight="700" text-anchor="middle" fill="#6f6858">과세표준이 오를수록 세율만 올라갑니다</text>
</g>
</svg>

<p class="ax-intro">종합소득세 세율은 과세표준 <b>1,400만·5,000만·8,800만원</b>을 경계로 올라갑니다. 그래서 "구간을 넘으면 전체 소득에 높은 세율이 붙어 손해"라는 오해가 흔합니다. 사실은 <b>넘어간 금액에만</b> 높은 세율이 붙고, 그 계산을 간단히 하려고 <b>누진공제</b>를 씁니다. 과세표준 5,000만원과 5,000만 1원의 세금 차이는 <b>0원</b>입니다.</p>

<a class="ax-cta" href="/tax/comprehensive-income-tax/">
<span><b>내 종합소득세 바로 계산하기</b><i>소득과 부양가족만 넣으면 됩니다</i></span>
<em>종합소득세 계산하기</em></a>

<div class="ax-toc"><b>이 글에서는</b><a href="#m1">계산 5단계</a><a href="#m2">세율과 누진공제</a><a href="#m3">구간 경계</a><a href="#m4">신고 기간</a><a href="#tips">알아두면 좋은 것</a><a href="#faq">자주 묻는 질문</a><a href="#src">근거 자료</a></div>`;

export const htmlAfter = `<div class="ax-mh" id="m1"><b>1단계 — 계산 구조</b><span>소득에서 세금까지</span></div>

<div class="ax-st"><div class="ax-n">1</div><div class="ax-sb">
<h3>종합소득세는 어떻게 계산하나요</h3>
<p>종합소득세는 이자·배당·사업·근로·연금·기타소득을 <b>합쳐서</b> 하나의 세율표로 계산합니다. 순서는 다섯 단계입니다.</p>
<div class="ax-tw"><table>
<thead><tr><th>단계</th><th>내용</th><th>소득 5,000만원 예시</th></tr></thead>
<tbody>
<tr><td>① 종합소득금액</td><td>여섯 가지 소득을 합산</td><td>50,000,000원</td></tr>
<tr><td>② − 소득공제</td><td>기본공제 1명당 150만원 등</td><td>− 1,500,000원</td></tr>
<tr class="ax-hi"><td>③ = 과세표준</td><td>세율을 곱할 금액</td><td><b>48,500,000원</b></td></tr>
<tr><td>④ × 세율 − 누진공제</td><td>= 산출세액</td><td>6,015,000원</td></tr>
<tr><td>⑤ − 세액공제</td><td>= 결정세액</td><td>5,945,000원</td></tr>
<tr class="ax-hi"><td>+ 지방소득세 10%</td><td>= 최종 부담액</td><td><b>6,539,500원</b></td></tr>
</tbody></table>
<p class="ax-tn">기본공제 대상자 1명(본인), 자녀 없음, 표준세액공제 7만원 적용 기준입니다. MoneyDoc 계산기 엔진으로 산출했습니다.</p></div>
<figure class="ax-ig">
<svg viewBox="0 0 660 176" role="img" aria-label="종합소득금액에서 소득공제를 빼 과세표준을 구하고 세율을 곱한 뒤 세액공제를 빼고 지방소득세 10퍼센트를 더합니다">
<text x="0" y="18" font-size="13" font-weight="700" fill="currentColor" letter-spacing="-.3">소득 5,000만원 · 기본공제 1명일 때</text>
<rect x="0" y="40" width="126" height="48" rx="8" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".55"/>
<text x="63" y="60" font-size="11.5" font-weight="700" text-anchor="middle" fill="currentColor">종합소득금액</text>
<text x="63" y="78" font-size="11.5" font-weight="800" text-anchor="middle" fill="currentColor" opacity=".75">5,000만</text>
<text x="136" y="69" font-size="14" font-weight="700" fill="currentColor" opacity=".5">−</text>
<rect x="152" y="40" width="110" height="48" rx="8" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".55"/>
<text x="207" y="60" font-size="11.5" font-weight="700" text-anchor="middle" fill="currentColor">소득공제</text>
<text x="207" y="78" font-size="11.5" font-weight="800" text-anchor="middle" fill="currentColor" opacity=".75">150만</text>
<text x="272" y="69" font-size="14" font-weight="700" fill="currentColor" opacity=".5">=</text>
<rect x="288" y="40" width="126" height="48" rx="8" fill="#4a3f7a"/>
<text x="351" y="60" font-size="11.5" font-weight="700" text-anchor="middle" fill="#fff">과세표준</text>
<text x="351" y="78" font-size="11.5" font-weight="800" text-anchor="middle" fill="#fff">4,850만</text>
<line x1="414" y1="64" x2="452" y2="64" stroke="#4a3f7a" stroke-width="2" stroke-linecap="round"/>
<polygon points="443,59 443,69 452,64" fill="#4a3f7a"/>
<text x="433" y="52" font-size="10" font-weight="700" text-anchor="middle" fill="#4a3f7a">15%</text>
<rect x="452" y="40" width="208" height="48" rx="8" fill="none" stroke="#4a3f7a" stroke-width="1.6"/>
<text x="556" y="60" font-size="11.5" font-weight="700" text-anchor="middle" fill="#4a3f7a">산출세액 601.5만</text>
<text x="556" y="78" font-size="10.5" text-anchor="middle" fill="#4a3f7a" opacity=".8">4,850만 × 15% − 누진공제 126만</text>
<line x1="0" y1="108" x2="660" y2="108" stroke="currentColor" stroke-width="1" opacity=".2"/>
<text x="0" y="132" font-size="11.5" font-weight="700" fill="currentColor" opacity=".7">− 표준세액공제 7만 = 결정세액 594.5만</text>
<text x="0" y="154" font-size="11.5" font-weight="800" fill="#4a3f7a">+ 지방소득세 59.45만 (결정세액의 10%) = 총 653.95만원</text>
</svg>
<figcaption>「소득세법」 제50조 (기본공제) · 제55조 (세율) · 제59조의4 제9항 (표준세액공제)</figcaption>
</figure>
<p class="ax-nt">중요한 것은 <b>③ 과세표준</b>입니다. 세율 구간은 소득이 아니라 <b>공제를 뺀 뒤의 과세표준</b>으로 판단합니다. 소득이 5,000만원이라고 해서 5,000만원 구간 세율이 적용되는 것이 아닙니다.</p>
</div></div>

<div class="ax-mh ax-b" id="m2"><b>2단계 — 세율</b><span>누진공제의 정체</span></div>

<div class="ax-st"><div class="ax-n">2</div><div class="ax-sb">
<h3>종합소득세 세율 구간과 누진공제는 어떻게 되나요</h3>
<p>소득세법 제55조는 여덟 구간의 세율을 정하고 있습니다. 조문에는 "1,400만원을 초과하는 금액의 15퍼센트"처럼 <b>초과분에만</b> 세율을 매기는 방식으로 적혀 있습니다. 이를 한 줄 계산으로 바꾼 것이 누진공제입니다.</p>
<div class="ax-tw"><table>
<thead><tr><th>과세표준</th><th>세율</th><th>누진공제</th><th>산출세액 계산</th></tr></thead>
<tbody>
<tr><td>1,400만원 이하</td><td>6%</td><td>—</td><td>과세표준 × 6%</td></tr>
<tr class="ax-hi"><td>1,400만 초과 ~ 5,000만</td><td><b>15%</b></td><td>1,260,000</td><td>× 15% − 126만</td></tr>
<tr><td>5,000만 초과 ~ 8,800만</td><td>24%</td><td>5,760,000</td><td>× 24% − 576만</td></tr>
<tr><td>8,800만 초과 ~ 1.5억</td><td>35%</td><td>15,440,000</td><td>× 35% − 1,544만</td></tr>
<tr><td>1.5억 초과 ~ 3억</td><td>38%</td><td>19,940,000</td><td>× 38% − 1,994만</td></tr>
<tr><td>3억 초과 ~ 5억</td><td>40%</td><td>25,940,000</td><td>× 40% − 2,594만</td></tr>
<tr><td>5억 초과 ~ 10억</td><td>42%</td><td>35,940,000</td><td>× 42% − 3,594만</td></tr>
<tr><td>10억 초과</td><td>45%</td><td>65,940,000</td><td>× 45% − 6,594만</td></tr>
</tbody></table>
<p class="ax-tn">단위: 원. 소득세법 제55조 제1항 (마지막 개정 2022. 12. 31.). 지방소득세 10%는 별도입니다.</p></div>
<p>누진공제는 <b>할인이 아닙니다</b>. 조문의 "624만원 + 5,000만원을 초과하는 금액의 24%"를 "과세표준 × 24% − 576만원"으로 바꾼 것뿐이고, 결과는 완전히 같습니다.</p>
<figure class="ax-ig">
<svg viewBox="0 0 660 180" role="img" aria-label="과세표준 6000만원의 세금은 1400만원까지 6퍼센트, 5000만원까지 15퍼센트, 나머지 1000만원에만 24퍼센트가 붙습니다">
<text x="0" y="18" font-size="13" font-weight="700" fill="currentColor" letter-spacing="-.3">과세표준 6,000만원 — 6,000만원 전체에 24%가 붙는 게 아닙니다</text>
<rect x="0" y="44" width="154" height="42" rx="6" fill="#cfc8e4"/>
<text x="77" y="62" font-size="11.5" font-weight="800" text-anchor="middle" fill="#3a3062">1,400만 × 6%</text>
<text x="77" y="79" font-size="11" font-weight="700" text-anchor="middle" fill="#3a3062" opacity=".8">84만원</text>
<rect x="158" y="44" width="286" height="42" rx="6" fill="#9186d0"/>
<text x="301" y="62" font-size="11.5" font-weight="800" text-anchor="middle" fill="#fff">3,600만 × 15%</text>
<text x="301" y="79" font-size="11" font-weight="700" text-anchor="middle" fill="#fff" opacity=".9">540만원</text>
<rect x="448" y="44" width="132" height="42" rx="6" fill="#4a3f7a"/>
<text x="514" y="62" font-size="11.5" font-weight="800" text-anchor="middle" fill="#fff">1,000만 × 24%</text>
<text x="514" y="79" font-size="11" font-weight="700" text-anchor="middle" fill="#fff" opacity=".9">240만원</text>
<text x="0" y="106" font-size="10.5" font-weight="600" fill="currentColor" opacity=".55">0</text>
<text x="154" y="106" font-size="10.5" font-weight="600" text-anchor="middle" fill="currentColor" opacity=".55">1,400만</text>
<text x="444" y="106" font-size="10.5" font-weight="600" text-anchor="middle" fill="currentColor" opacity=".55">5,000만</text>
<text x="580" y="106" font-size="10.5" font-weight="600" text-anchor="middle" fill="currentColor" opacity=".55">6,000만</text>
<line x1="0" y1="124" x2="660" y2="124" stroke="currentColor" stroke-width="1" opacity=".2"/>
<text x="0" y="148" font-size="12" font-weight="800" fill="#4a3f7a">합계 864만원 = 6,000만 × 24% − 누진공제 576만</text>
<text x="0" y="170" font-size="11.5" font-weight="600" fill="currentColor" opacity=".62" letter-spacing="-.3">두 방식의 답이 같습니다. 누진공제는 이 계단 계산을 한 줄로 줄인 장치입니다.</text>
</svg>
<figcaption>「소득세법」 제55조 제1항 (종합소득 과세표준 세율)</figcaption>
</figure>
</div></div>

<div class="ax-mh" id="m3"><b>3단계 — 구간 경계</b><span>1원 차이의 진실</span></div>

<div class="ax-st"><div class="ax-n">3</div><div class="ax-sb">
<h3>과세표준이 구간을 넘으면 세금이 얼마나 뛰나요</h3>
<p>결론부터 말하면 <b>거의 뛰지 않습니다</b>. 경계선에서 두 계산식의 값이 정확히 만나도록 누진공제가 설계돼 있기 때문입니다.</p>
<div class="ax-tw"><table>
<thead><tr><th>과세표준</th><th>적용 구간</th><th>산출세액</th><th>직전 대비 증가</th></tr></thead>
<tbody>
<tr><td>50,000,000</td><td>15% 구간 (끝)</td><td>6,240,000</td><td>—</td></tr>
<tr class="ax-hi"><td>50,000,001</td><td>24% 구간 (시작)</td><td><b>6,240,000</b></td><td><b>0원</b></td></tr>
<tr><td>50,100,000</td><td>24% 구간</td><td>6,264,000</td><td>+24,000</td></tr>
<tr><td>60,000,000</td><td>24% 구간</td><td>8,640,000</td><td>+2,400,000</td></tr>
</tbody></table>
<p class="ax-tn">단위: 원. 과세표준 5,000만원에서 5,000만 1원으로 넘어가도 산출세액은 같습니다. 늘어난 1원에만 24%가 붙기 때문입니다.</p></div>
<p class="ax-nt">계산해보면 명확합니다. 5,000만원 × 15% − 126만 = <b>624만원</b>. 5,000만원 × 24% − 576만 = <b>624만원</b>. 두 식의 값이 경계에서 정확히 같습니다. "구간 넘으면 손해"는 사실이 아닙니다.</p>
<p>실제로 부담이 늘어나는 것은 소득이 <b>충분히</b> 늘었을 때입니다. 아래는 소득별 실제 부담액입니다.</p>
<div class="ax-tw"><table>
<thead><tr><th>종합소득금액</th><th>과세표준</th><th>결정세액</th><th>지방소득세</th><th>총 부담</th><th>실효세율</th></tr></thead>
<tbody>
<tr><td>2,000만원</td><td>18,500,000</td><td>1,445,000</td><td>144,500</td><td>1,589,500</td><td>7.95%</td></tr>
<tr><td>3,000만원</td><td>28,500,000</td><td>2,945,000</td><td>294,500</td><td>3,239,500</td><td>10.80%</td></tr>
<tr class="ax-hi"><td>5,000만원</td><td>48,500,000</td><td>5,945,000</td><td>594,500</td><td><b>6,539,500</b></td><td><b>13.08%</b></td></tr>
<tr><td>7,000만원</td><td>68,500,000</td><td>10,610,000</td><td>1,061,000</td><td>11,671,000</td><td>16.67%</td></tr>
<tr><td>1억원</td><td>98,500,000</td><td>18,965,000</td><td>1,896,500</td><td>20,861,500</td><td>20.86%</td></tr>
<tr><td>1.5억원</td><td>148,500,000</td><td>36,465,000</td><td>3,646,500</td><td>40,111,500</td><td>26.74%</td></tr>
<tr><td>2억원</td><td>198,500,000</td><td>55,420,000</td><td>5,542,000</td><td>60,962,000</td><td>30.48%</td></tr>
</tbody></table>
<p class="ax-tn">단위: 원. 기본공제 1명(본인)·자녀 없음·표준세액공제 7만원만 적용한 값입니다. 실제 신고에서는 필요경비와 각종 공제로 과세표준이 더 낮아집니다.</p></div>
<p>세율표상 최고세율은 45%지만, 소득 2억원의 <b>실효세율은 30.5%</b>입니다. 낮은 구간 세율이 함께 적용되기 때문입니다.</p>
</div></div>

<div class="ax-st"><div class="ax-n">4</div><div class="ax-sb">
<h3>부양가족과 자녀가 있으면 얼마나 줄어드나요</h3>
<p>기본공제는 <b>1명당 150만원</b>을 과세표준에서 빼줍니다. 자녀세액공제는 산출세액에서 직접 빼는 방식이라 효과가 더 큽니다.</p>
<div class="ax-tw"><table>
<thead><tr><th>기본공제 대상</th><th>자녀</th><th>과세표준</th><th>자녀세액공제</th><th>총 부담</th></tr></thead>
<tbody>
<tr><td>1명 (본인)</td><td>0명</td><td>48,500,000</td><td>0</td><td>6,539,500</td></tr>
<tr><td>2명</td><td>0명</td><td>47,000,000</td><td>0</td><td>6,292,000</td></tr>
<tr><td>3명</td><td>1명</td><td>45,500,000</td><td>250,000</td><td>5,769,500</td></tr>
<tr class="ax-hi"><td>4명</td><td>2명</td><td>44,000,000</td><td><b>550,000</b></td><td><b>5,192,000</b></td></tr>
<tr><td>5명</td><td>3명</td><td>42,500,000</td><td>950,000</td><td>4,504,500</td></tr>
</tbody></table>
<p class="ax-tn">단위: 원. 종합소득금액 5,000만원 기준. 자녀세액공제는 1명 25만 / 2명 55만 / 3명 이상 55만 + 2명 초과 1명당 40만원입니다(소득세법 제59조의2 제1항).</p></div>
<p class="ax-nt">기본공제 대상이 되려면 부양가족의 <b>연간 소득금액이 100만원 이하</b>(근로소득만 있으면 총급여 500만원 이하)여야 합니다. 직계존속은 60세 이상, 직계비속은 20세 이하, 형제자매는 20세 이하 또는 60세 이상이어야 합니다.</p>
</div></div>

<div class="ax-mh ax-b" id="m4"><b>4단계 — 신고</b><span>5월 한 달</span></div>

<div class="ax-st"><div class="ax-n">5</div><div class="ax-sb">
<h3>종합소득세 신고 기간은 언제인가요</h3>
<p>소득세법 제70조 제1항은 <b>다음 연도 5월 1일부터 5월 31일까지</b> 관할 세무서장에게 신고하도록 정하고 있습니다. 2026년 5월에 신고하는 것은 2025년 한 해 동안 벌어들인 소득입니다.</p>
<figure class="ax-ig">
<svg viewBox="0 0 660 158" role="img" aria-label="1월부터 12월까지의 소득을 다음 해 5월 1일부터 31일까지 신고합니다">
<text x="0" y="18" font-size="13" font-weight="700" fill="currentColor" letter-spacing="-.3">과세기간과 신고 기간</text>
<rect x="0" y="44" width="330" height="34" rx="6" fill="currentColor" opacity=".22"/>
<text x="165" y="66" font-size="11.5" font-weight="800" text-anchor="middle" fill="currentColor">2025년 1월 1일 ~ 12월 31일 (소득 발생)</text>
<line x1="330" y1="61" x2="392" y2="61" stroke="#4a3f7a" stroke-width="2" stroke-linecap="round" stroke-dasharray="5 4"/>
<polygon points="383,56 383,66 392,61" fill="#4a3f7a"/>
<rect x="392" y="44" width="268" height="34" rx="6" fill="#4a3f7a"/>
<text x="526" y="66" font-size="11.5" font-weight="800" text-anchor="middle" fill="#fff">2026년 5월 1일 ~ 5월 31일 (신고·납부)</text>
<text x="0" y="106" font-size="11.5" font-weight="700" fill="currentColor" opacity=".7">성실신고확인 대상 사업자는 6월 30일까지</text>
<text x="0" y="130" font-size="11.5" font-weight="600" fill="currentColor" opacity=".62" letter-spacing="-.3">기한을 넘기면 무신고가산세와 납부지연가산세가 붙습니다.</text>
</svg>
<figcaption>「소득세법」 제70조 제1항 (종합소득 과세표준확정신고)</figcaption>
</figure>
<p>근로소득만 있고 연말정산을 마쳤다면 따로 신고하지 않아도 됩니다. 다만 <b>연말정산을 한 근로자라도</b> 다음에 해당하면 5월에 종합소득세 신고를 해야 합니다.</p>
<div class="ax-tw"><table>
<thead><tr><th>상황</th><th>5월 신고</th></tr></thead>
<tbody>
<tr><td>근로소득만 있고 연말정산 완료</td><td>불필요</td></tr>
<tr class="ax-hi"><td>근로소득 + 사업·프리랜서 소득</td><td><b>필요</b></td></tr>
<tr><td>근로소득 + 금융소득 2,000만원 초과</td><td><b>필요</b></td></tr>
<tr><td>근로소득 + 주택임대소득</td><td><b>필요</b></td></tr>
<tr><td>중도 퇴사 후 연말정산을 못 한 경우</td><td><b>필요</b> (환급 가능)</td></tr>
<tr><td>사업소득만 있는 프리랜서·개인사업자</td><td><b>필요</b></td></tr>
</tbody></table>
<p class="ax-tn">분리과세 주택임대소득이 있는 경우에도 확정신고 대상입니다(소득세법 제70조 제2항).</p></div>
</div></div>

<h2 class="ax-sec" id="tips">알아두면 좋은 것</h2>
<ul class="ax-tips">
<li>세율 구간은 <b>소득이 아니라 과세표준</b>으로 판단합니다. 소득 5,000만원이라도 공제 후 과세표준이 4,850만원이면 15% 구간입니다.</li>
<li>누진공제는 감면이 아니라 <b>계산 단축 장치</b>입니다. 구간별로 나눠 계산한 값과 정확히 같습니다.</li>
<li>3.3%를 떼고 받은 프리랜서 소득은 <b>미리 낸 세금</b>입니다. 5월에 정산해 더 냈으면 돌려받습니다.</li>
<li>기본공제 대상자는 <b>연 소득금액 100만원 이하</b>여야 합니다. 근로소득만 있는 부양가족은 총급여 500만원 이하면 됩니다.</li>
<li>자녀세액공제 대상 연령 기준은 현행 조문상 <b>13세 이상</b>입니다. 2025년 귀속분까지는 8세 이상이 적용됐습니다.</li>
<li>표준세액공제는 다른 특별세액공제를 신청하지 않을 때만 적용됩니다. 일반 사업자는 7만원, 성실사업자는 12만원입니다.</li>
<li>5월 31일을 넘기면 무신고가산세(납부세액의 20%)와 납부지연가산세가 붙습니다. 늦더라도 기한 후 신고를 하면 가산세가 줄어듭니다.</li>
</ul>

<h2 class="ax-sec" id="faq">자주 묻는 질문</h2>

<details class="ax-acc" open><summary>과세표준이 5,000만원을 넘으면 세금이 크게 뛰나요?</summary>
<div class="ax-ab"><p>뛰지 않습니다. 5,000만원일 때와 5,000만 1원일 때 산출세액이 <b>둘 다 624만원</b>으로 같습니다. 초과한 금액에만 24%가 붙기 때문입니다. 5,000만원 × 15% − 126만 = 624만이고, 5,000만원 × 24% − 576만 = 624만으로 경계에서 정확히 만납니다.</p>
<p class="ax-law">소득세법 제55조 제1항</p></div></details>

<details class="ax-acc"><summary>종합소득세 세율은 몇 퍼센트인가요?</summary>
<div class="ax-ab"><p>과세표준에 따라 <b>6%부터 45%까지</b> 여덟 구간입니다. 1,400만원 이하 6%, 5,000만원 이하 15%, 8,800만원 이하 24%, 1.5억원 이하 35%, 3억원 이하 38%, 5억원 이하 40%, 10억원 이하 42%, 10억원 초과 45%입니다. 여기에 지방소득세 10%가 별도로 붙습니다.</p>
<p class="ax-law">소득세법 제55조 제1항 (마지막 개정 2022. 12. 31.)</p></div></details>

<details class="ax-acc"><summary>소득 5,000만원이면 종합소득세가 얼마인가요?</summary>
<div class="ax-ab"><p>기본공제 1명(본인)만 적용하면 과세표준 4,850만원, 결정세액 5,945,000원, 지방소득세 594,500원으로 <b>총 6,539,500원</b>입니다. 실효세율은 13.08%입니다. 실제로는 필요경비와 각종 공제가 더 반영되어 이보다 줄어드는 것이 보통입니다.</p>
<p class="ax-law">MoneyDoc 계산기 엔진 산출값 · 소득세법 제50조·제55조</p></div></details>

<details class="ax-acc"><summary>종합소득세 신고는 언제 하나요?</summary>
<div class="ax-ab"><p>과세기간의 <b>다음 연도 5월 1일부터 5월 31일까지</b>입니다. 성실신고확인 대상 사업자는 6월 30일까지입니다. 2026년 5월에 신고하는 것은 2025년 소득입니다.</p>
<p class="ax-law">소득세법 제70조 제1항</p></div></details>

<details class="ax-acc"><summary>회사에서 연말정산을 했는데 5월에 또 신고해야 하나요?</summary>
<div class="ax-ab"><p>근로소득만 있다면 하지 않아도 됩니다. 다만 <b>프리랜서·사업 소득이 함께 있거나, 금융소득이 2,000만원을 넘거나, 주택임대소득이 있으면</b> 5월에 합산해 신고해야 합니다. 중도 퇴사로 연말정산을 못 했다면 5월에 신고해서 환급받을 수 있습니다.</p>
<p class="ax-law">소득세법 제70조 제1항·제2항</p></div></details>

<details class="ax-acc"><summary>3.3%를 떼고 받았는데 세금을 또 내나요?</summary>
<div class="ax-ab"><p>3.3%는 <b>미리 낸 세금(원천징수)</b>입니다. 5월에 1년치를 합산해 정산할 때, 이미 낸 금액이 실제 세액보다 많으면 돌려받고 적으면 더 냅니다. 소득이 적은 프리랜서는 대부분 환급을 받습니다.</p>
<p class="ax-law">소득세법 제70조 (확정신고) · 제127조 (원천징수)</p></div></details>

<details class="ax-acc"><summary>자녀세액공제는 얼마인가요?</summary>
<div class="ax-ab"><p>자녀 1명 <b>25만원</b>, 2명 <b>55만원</b>, 3명 이상은 55만원에 2명을 초과하는 1명당 40만원을 더합니다. 3명이면 95만원, 4명이면 135만원, 5명이면 175만원입니다. 해당 연도에 출산·입양했다면 첫째 30만·둘째 50만·셋째 이상 70만원을 추가로 공제받습니다.</p>
<p class="ax-law">소득세법 제59조의2 제1항·제3항</p></div></details>

<div class="ax-sum">
<h4>정리</h4>
<ul>
<li>세율은 <b>과세표준</b>으로 판단합니다. 소득에서 공제를 뺀 금액입니다.</li>
<li>구간은 6%·15%·24%·35%·38%·40%·42%·<b>45%</b> 여덟 개입니다.</li>
<li>구간을 넘어도 <b>초과분에만</b> 높은 세율이 붙습니다. 5,000만원과 5,000만 1원의 세금은 같습니다.</li>
<li>누진공제는 할인이 아니라 <b>계산을 한 줄로 줄인 장치</b>입니다.</li>
<li>소득 5,000만원의 총 부담은 <b>6,539,500원</b>, 실효세율 13.08%입니다.</li>
<li>신고는 다음 해 <b>5월 1일~31일</b>, 성실신고확인 대상은 6월 30일까지입니다.</li>
</ul>
<a class="ax-cta" href="/tax/comprehensive-income-tax/">
<span><b>종합소득세 계산기로 확인하기</b><i>소득·부양가족·자녀 수로 즉시 계산</i></span>
<em>종합소득세 계산하기</em></a>
</div>

<h2 class="ax-sec" id="src">근거 자료</h2>

<p class="ax-collected">아래는 국가법령정보센터에서 확인한 조문입니다. 소득세법은 시행 2026. 1. 1. (법률 제21221호, 2025. 12. 23. 일부개정) 기준이며, 세율표는 마지막 개정이 2022. 12. 31.입니다.</p>

<div class="ax-lawq"><b>소득세법 제55조 (세율) 제1항 — 종합소득 과세표준 세율표</b>
<p>1,400만원 이하: 과세표준의 <b>6퍼센트</b><br>
1,400만원 초과 5,000만원 이하: 84만원 + (1,400만원을 초과하는 금액의 <b>15퍼센트</b>)<br>
5,000만원 초과 8,800만원 이하: 624만원 + (5,000만원을 초과하는 금액의 <b>24퍼센트</b>)<br>
8,800만원 초과 1억5천만원 이하: 1,536만원 + (8,800만원을 초과하는 금액의 <b>35퍼센트</b>)<br>
1억5천만원 초과 3억원 이하: 3,706만원 + (1억5천만원을 초과하는 금액의 <b>38퍼센트</b>)<br>
3억원 초과 5억원 이하: 9,406만원 + (3억원을 초과하는 금액의 <b>40퍼센트</b>)<br>
5억원 초과 10억원 이하: 1억7,406만원 + (5억원을 초과하는 금액의 <b>42퍼센트</b>)<br>
10억원 초과: 10억원을 초과하는 금액의 <b>45퍼센트</b> 가산</p></div>

<div class="ax-lawq"><b>소득세법 제50조 (기본공제) 제1항</b>
<p>종합소득이 있는 거주자(자연인만 해당한다)에 대해서는 다음 각 호의 어느 하나에 해당하는 사람의 수에 <b>1명당 연 150만원</b>을 곱하여 계산한 금액을 그 거주자의 해당 과세기간의 종합소득금액에서 공제한다.<br>
1. 해당 거주자<br>
2. 거주자의 배우자로서 해당 과세기간의 <b>소득금액 합계액이 100만원 이하</b>인 사람(총급여액 500만원 이하의 근로소득만 있는 배우자를 포함한다)<br>
3. 생계를 같이 하는 부양가족으로서 소득금액 합계액이 100만원 이하인 사람 — 직계존속은 <b>60세 이상</b>, 직계비속·입양자는 <b>20세 이하</b>, 형제자매는 20세 이하 또는 60세 이상</p></div>

<div class="ax-lawq"><b>소득세법 제59조의2 (자녀세액공제) 제1항 &lt;개정 2026. 4. 21.&gt;</b>
<p>종합소득이 있는 거주자의 기본공제대상자에 해당하는 자녀 및 손자녀로서 <b>13세 이상</b>의 사람에 대해서는 다음 각 호의 구분에 따른 금액을 종합소득산출세액에서 공제한다.<br>
1. 1명인 경우: 연 <b>25만원</b><br>
2. 2명인 경우: 연 <b>55만원</b><br>
3. 3명 이상인 경우: 연 55만원과 2명을 초과하는 <b>1명당 연 40만원</b>을 합한 금액</p></div>

<div class="ax-lawq"><b>소득세법 제59조의2 제3항 (출산·입양 추가공제)</b>
<p>해당 과세기간에 출산하거나 입양 신고한 공제대상자녀가 있는 경우 — 첫째 연 <b>30만원</b>, 둘째 연 <b>50만원</b>, 셋째 이상 연 <b>70만원</b>을 종합소득산출세액에서 공제한다.</p></div>

<div class="ax-lawq"><b>소득세법 제59조의4 제9항 (표준세액공제) &lt;개정 2025. 12. 23.&gt;</b>
<p>1. 근로소득이 있는 거주자로서 소득공제·세액공제 신청을 하지 아니한 경우: 연 <b>13만원</b><br>
2. 종합소득이 있는 거주자(근로소득이 있는 자는 제외한다)로서 신청을 하지 아니한 경우<br>
　가. 성실사업자의 경우: 연 <b>12만원</b>　나. 가목 외의 경우: 연 <b>7만원</b></p></div>

<div class="ax-lawq"><b>소득세법 제70조 (종합소득과세표준 확정신고) 제1항</b>
<p>해당 과세기간의 종합소득금액이 있는 거주자(종합소득과세표준이 없거나 결손금이 있는 거주자를 포함한다)는 그 종합소득 과세표준을 그 과세기간의 <b>다음 연도 5월 1일부터 5월 31일까지</b> 대통령령으로 정하는 바에 따라 납세지 관할 세무서장에게 신고하여야 한다.</p></div>

<div class="ax-src"><b>출처 · 국가법령정보센터, 국세청</b><br>
조문은 <a href="https://www.law.go.kr/법령/소득세법/제55조" target="_blank" rel="noopener">소득세법 제55조</a>, <a href="https://www.law.go.kr/법령/소득세법/제50조" target="_blank" rel="noopener">제50조</a>, <a href="https://www.law.go.kr/법령/소득세법/제59조의2" target="_blank" rel="noopener">제59조의2</a>, <a href="https://www.law.go.kr/법령/소득세법/제70조" target="_blank" rel="noopener">제70조</a>에서 확인했습니다. 자녀세액공제 금액은 <a href="https://www.nts.go.kr/" target="_blank" rel="noopener">국세청</a> 세액공제 안내와 대조했습니다. 신고·납부는 <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener">홈택스</a>에서 합니다.<br><br>
이 글의 계산은 기본공제와 표준세액공제만 반영한 <b>구조 설명용</b>입니다. 실제 신고에서는 사업소득 필요경비, 연금계좌·의료비·기부금 등 개별 공제, 기납부세액이 반영되어 세액이 달라집니다. 정확한 세액은 홈택스 또는 세무대리인을 통해 확인하시기 바랍니다.</div>`;

export const asideHtml = `<div class="ax-side"><h4>세금 계산기</h4>
<a class="ax-rel" href="/tax/comprehensive-income-tax/">종합소득세 계산기<span>소득·공제</span></a>
<a class="ax-rel" href="/tax/child-tax-credit/">자녀세액공제 계산기<span>자녀 수·출산</span></a>
<a class="ax-rel" href="/tax/salary-net-pay/">연봉 실수령액 계산기<span>월급·세금</span></a>
</div>

<div class="ax-side"><h4>이 글의 단계</h4>
<ol>
<li><a href="#m1">계산 5단계</a></li>
<li><a href="#m2">세율과 누진공제</a></li>
<li><a href="#m3">구간 경계의 진실</a></li>
<li><a href="#m4">신고 기간</a></li>
<li><a href="#faq">자주 묻는 질문</a></li>
</ol></div>

<div class="ax-side"><h4>같은 분류의 글</h4>
<a class="ax-rel" href="undefined">연봉 실수령액과 공제 항목<span>급여</span></a>
<a class="ax-rel" href="undefined">4대보험 요율 2026<span>보험료</span></a>
<a class="ax-rel" href="/realestate/transfer-tax-guide/">1세대 1주택 양도세 비과세<span>양도세</span></a>
</div>`;

export const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      "name": "과세표준이 5,000만원을 넘으면 세금이 크게 뛰나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "뛰지 않습니다. 5,000만원일 때와 5,000만 1원일 때 산출세액이 둘 다 624만원으로 같습니다. 초과한 금액에만 24%가 붙기 때문입니다. 5,000만원 × 15% − 126만 = 624만이고, 5,000만원 × 24% − 576만 = 624만으로 경계에서 정확히 만납니다. 소득세법 제55조 제1항"
      }
    },
    {
      "@type": "Question",
      "name": "종합소득세 세율은 몇 퍼센트인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "과세표준에 따라 6%부터 45%까지 여덟 구간입니다. 1,400만원 이하 6%, 5,000만원 이하 15%, 8,800만원 이하 24%, 1.5억원 이하 35%, 3억원 이하 38%, 5억원 이하 40%, 10억원 이하 42%, 10억원 초과 45%입니다. 여기에 지방소득세 10%가 별도로 붙습니다. 소득세법 제55조 제1항 (마지막 개정 2022. 12. 31.)"
      }
    },
    {
      "@type": "Question",
      "name": "소득 5,000만원이면 종합소득세가 얼마인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "기본공제 1명(본인)만 적용하면 과세표준 4,850만원, 결정세액 5,945,000원, 지방소득세 594,500원으로 총 6,539,500원입니다. 실효세율은 13.08%입니다. 실제로는 필요경비와 각종 공제가 더 반영되어 이보다 줄어드는 것이 보통입니다. MoneyDoc 계산기 엔진 산출값 · 소득세법 제50조·제55조"
      }
    },
    {
      "@type": "Question",
      "name": "종합소득세 신고는 언제 하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "과세기간의 다음 연도 5월 1일부터 5월 31일까지입니다. 성실신고확인 대상 사업자는 6월 30일까지입니다. 2026년 5월에 신고하는 것은 2025년 소득입니다. 소득세법 제70조 제1항"
      }
    },
    {
      "@type": "Question",
      "name": "회사에서 연말정산을 했는데 5월에 또 신고해야 하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "근로소득만 있다면 하지 않아도 됩니다. 다만 프리랜서·사업 소득이 함께 있거나, 금융소득이 2,000만원을 넘거나, 주택임대소득이 있으면 5월에 합산해 신고해야 합니다. 중도 퇴사로 연말정산을 못 했다면 5월에 신고해서 환급받을 수 있습니다. 소득세법 제70조 제1항·제2항"
      }
    },
    {
      "@type": "Question",
      "name": "3.3%를 떼고 받았는데 세금을 또 내나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "3.3%는 미리 낸 세금(원천징수)입니다. 5월에 1년치를 합산해 정산할 때, 이미 낸 금액이 실제 세액보다 많으면 돌려받고 적으면 더 냅니다. 소득이 적은 프리랜서는 대부분 환급을 받습니다. 소득세법 제70조 (확정신고) · 제127조 (원천징수)"
      }
    },
    {
      "@type": "Question",
      "name": "자녀세액공제는 얼마인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "자녀 1명 25만원, 2명 55만원, 3명 이상은 55만원에 2명을 초과하는 1명당 40만원을 더합니다. 3명이면 95만원, 4명이면 135만원, 5명이면 175만원입니다. 해당 연도에 출산·입양했다면 첫째 30만·둘째 50만·셋째 이상 70만원을 추가로 공제받습니다. 소득세법 제59조의2 제1항·제3항"
      }
    }
  ],
};
