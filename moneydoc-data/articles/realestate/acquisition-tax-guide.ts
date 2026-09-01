// 자동 생성: scripts/convert-previews.mjs — 직접 수정하지 말 것
// 원본: public/_preview/10-취득세.html
export const meta = {
  title: "취득세 계산, 6억과 7억 집의 세금이 두 배 차이 나는 이유",
  description: "주택 취득세는 6억 이하 1%, 6~9억 누진, 9억 초과 3%입니다. 6억은 660만원인데 7억은 1,285만원. 85㎡ 초과 농어촌특별세와 다주택 중과세율까지 지방세법 기준으로 정리했습니다.",
  datePublished: "2026-09-01",
  dateModified: "2026-09-01",
  url: "https://moneydoc.kr/realestate/acquisition-tax-guide/",
};

export const widgetKey = "acqTax";

export const widgetHtml = `<div class="ax-wg" id="wg1">
<div class="ax-wg-h"><b>주택 취득세 계산 (1주택 기준)</b>
<span>매매가와 전용면적을 넣으면 취득세·지방교육세·농특세가 나옵니다</span></div>
<div class="ax-wg-in">
  <label class="ax-wg-f"><em>매매가액 (원)</em><input type="number" id="price" value="500000000" step="10000000" min="0"></label>
  <label class="ax-wg-f"><em>전용면적 (㎡)</em><input type="number" id="area" value="84" step="1" min="1"></label>
</div>
<div class="ax-wg-out" id="out"></div>
<p class="ax-wg-note">무주택자가 1주택을 취득하는 표준세율 기준입니다. 다주택 중과세율(8%·12%)이 적용되면 부가세 계산 기준이 달라지므로 <a href="/realestate/acquisition-tax/">취득세 계산기</a>에서 주택 수와 지역을 넣어 확인하세요. 근거: 지방세법 제11조·제151조, 농어촌특별세법 제5조.</p>
</div>`;

export const htmlBefore = `<h1>취득세 계산, 6억과 7억 집의 세금이 두 배 차이 나는 이유</h1>
<p class="ax-by">MoneyDoc 편집팀 · 2026년 9월 1일 기준 · 약 7분</p>

<svg class="ax-hero" viewBox="0 0 1100 563" role="img" aria-label="주택 취득세 6억 이하 1퍼센트 6억에서 9억 누진 9억 초과 3퍼센트">
<rect width="1100" height="563" fill="#f7f2ea"/>
<path d="M820 0h280v240a60 60 0 0 1-60 60H820z" fill="#f6e3de"/>
<circle cx="1012" cy="72" r="46" fill="#f2d9d2" opacity=".55"/>
<rect x="72" y="160" width="132" height="42" rx="9" fill="#c4452f"/>
<text x="138" y="189" font-size="19" font-weight="800" text-anchor="middle" fill="#fff" letter-spacing="-.5">부동산·세금</text>
<text x="72" y="282" font-size="57" font-weight="800" fill="#2b2723" letter-spacing="-2.6">주택 취득세</text>
<rect x="70" y="312" width="356" height="26" fill="#f2cfc8"/>
<text x="72" y="349" font-size="57" font-weight="800" fill="#c4452f" letter-spacing="-2.6">6억이 갈림길</text>
<text x="72" y="400" font-size="21" font-weight="700" fill="#6f6858" letter-spacing="-.8">6억 660만 · 7억 1,285만 · 9억 2,970만</text>
<rect x="0" y="545" width="1100" height="18" fill="#c4452f"/>
<g transform="translate(650 160)">
  <ellipse cx="196" cy="290" rx="168" ry="18" fill="#e8ded0" opacity=".55"/>
  <path d="M56 150 L196 60 L336 150" fill="none" stroke="#6b6255" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="88" y="150" width="216" height="122" rx="8" fill="#fdfcfa" stroke="#6b6255" stroke-width="4.5"/>
  <rect x="120" y="180" width="58" height="48" rx="6" fill="#ccdae5" stroke="#6b6255" stroke-width="3.5"/>
  <rect x="214" y="180" width="58" height="92" rx="6" fill="#e8ded0" stroke="#6b6255" stroke-width="3.5"/>
  <g transform="translate(268 26)">
    <circle cx="42" cy="42" r="40" fill="#fdf4f1" stroke="#c4452f" stroke-width="5"/>
    <text x="42" y="54" font-size="27" font-weight="800" text-anchor="middle" fill="#c4452f">1%</text>
  </g>
  <text x="196" y="312" font-size="16" font-weight="700" text-anchor="middle" fill="#8a8172">6억 이하 주택은 1%</text>
</g>
</svg>

<p class="ax-intro">집을 사면 <b>취득세</b>를 냅니다. 6억원 이하는 <b>1%</b>지만 6억을 넘는 순간 누진 구간이 시작돼 세율이 가파르게 오릅니다. 6억짜리 집은 <b>660만원</b>인데 7억짜리는 <b>1,285만원</b>으로, 집값은 1억 차이인데 세금은 두 배 가까이 됩니다. 계약 전에 반드시 확인해야 할 금액입니다.</p>

<a class="ax-cta" href="/realestate/acquisition-tax/">
<span><b>내 취득세 바로 계산하기</b><i>매매가·주택 수·면적만 넣으면 됩니다</i></span>
<em>취득세 계산하기</em></a>

<div class="ax-toc"><b>이 글에서는</b><a href="#m1">세율 구조 2단계</a><a href="#m2">부가되는 세금</a><a href="#m3">다주택 중과</a><a href="#tips">알아두면 좋은 것</a><a href="#faq">자주 묻는 질문</a><a href="#src">근거 자료</a></div>`;

export const htmlAfter = `<div class="ax-mh" id="m1"><b>1단계 — 세율 구조</b><span>6억·9억이 경계</span></div>

<div class="ax-st"><div class="ax-n">1</div><div class="ax-sb">
<h3>주택 취득세율은 어떻게 되나요</h3>
<p>주택을 사서 1주택이 되는 경우 표준세율은 세 구간으로 나뉩니다. 6억~9억 구간은 고정 세율이 아니라 <b>집값에 따라 연속적으로 오르는 누진</b> 구조입니다.</p>
<div class="ax-tw"><table>
<thead><tr><th>취득가액</th><th>취득세율</th><th>비고</th></tr></thead>
<tbody>
<tr class="ax-hi"><td>6억원 이하</td><td><b>1%</b></td><td>고정</td></tr>
<tr><td>6억 초과 ~ 9억 이하</td><td>1% ~ 3%</td><td>(가액÷1억 × 2/3 − 3) ÷ 100</td></tr>
<tr><td>9억원 초과</td><td><b>3%</b></td><td>고정</td></tr>
</tbody></table>
<p class="ax-tn">지방세법 제11조 주택 유상거래 표준세율. 6억과 9억 경계에서 세율이 각각 1%, 3%로 이어져 급격한 단차가 없습니다.</p></div>
<figure class="ax-ig">
<svg viewBox="0 0 660 170" role="img" aria-label="6억까지는 1퍼센트 고정, 6억에서 9억은 누진, 9억 초과는 3퍼센트 고정">
<text x="0" y="18" font-size="13" font-weight="700" fill="currentColor" letter-spacing="-.3">취득가액에 따른 세율 변화</text>
<line x1="30" y1="140" x2="640" y2="140" stroke="currentColor" stroke-width="1.5" opacity=".3"/>
<line x1="30" y1="112" x2="250" y2="112" stroke="#c4452f" stroke-width="5" stroke-linecap="round"/>
<line x1="250" y1="112" x2="450" y2="52" stroke="#c4452f" stroke-width="5" stroke-linecap="round"/>
<line x1="450" y1="52" x2="640" y2="52" stroke="#c4452f" stroke-width="5" stroke-linecap="round"/>
<circle cx="250" cy="112" r="6" fill="#c4452f"/><circle cx="450" cy="52" r="6" fill="#c4452f"/>
<text x="250" y="98" font-size="11.5" font-weight="800" text-anchor="middle" fill="#c4452f">6억 · 1%</text>
<text x="450" y="38" font-size="11.5" font-weight="800" text-anchor="middle" fill="#c4452f">9억 · 3%</text>
<text x="130" y="132" font-size="11" text-anchor="middle" fill="currentColor" opacity=".6">고정 1%</text>
<text x="350" y="132" font-size="11" text-anchor="middle" fill="currentColor" opacity=".6">누진 구간</text>
<text x="545" y="132" font-size="11" text-anchor="middle" fill="currentColor" opacity=".6">고정 3%</text>
<text x="0" y="162" font-size="11.5" font-weight="600" fill="currentColor" opacity=".6" letter-spacing="-.3">6억 초과 구간에서는 집값이 1억 오를 때 세율이 약 0.67%p 올라갑니다</text>
</svg>
<figcaption>「지방세법」 제11조 (취득세 표준세율) · 주택 유상거래</figcaption>
</figure>
</div></div>

<div class="ax-st"><div class="ax-n">2</div><div class="ax-sb">
<h3>매매가별 취득세는 얼마인가요</h3>
<p>1주택·전용면적 85㎡ 이하 기준입니다. 지방교육세까지 포함한 실제 납부액입니다.</p>
<div class="ax-tw"><table>
<thead><tr><th>매매가</th><th>세율</th><th>취득세</th><th>지방교육세</th><th>합계</th></tr></thead>
<tbody>
<tr><td>3억</td><td>1.00%</td><td>3,000,000</td><td>300,000</td><td><b>3,300,000</b></td></tr>
<tr class="ax-hi"><td>5억</td><td>1.00%</td><td>5,000,000</td><td>500,000</td><td><b>5,500,000</b></td></tr>
<tr><td>6억</td><td>1.00%</td><td>6,000,000</td><td>600,000</td><td><b>6,600,000</b></td></tr>
<tr><td>7억</td><td>1.67%</td><td>11,690,000</td><td>1,169,000</td><td><b>12,859,000</b></td></tr>
<tr><td>9억</td><td>3.00%</td><td>27,000,000</td><td>2,700,000</td><td><b>29,700,000</b></td></tr>
<tr><td>10억</td><td>3.00%</td><td>30,000,000</td><td>3,000,000</td><td><b>33,000,000</b></td></tr>
<tr><td>15억</td><td>3.00%</td><td>45,000,000</td><td>4,500,000</td><td><b>49,500,000</b></td></tr>
</tbody></table>
<p class="ax-tn">단위: 원. 1주택·85㎡ 이하·농어촌특별세 비과세 기준. MoneyDoc 계산기 엔진으로 산출했습니다.</p></div>
<div class="ax-cp">
  <div><em>매매가 6억</em><b>6,600,000원</b><i>세율 1.00%</i></div>
  <div class="ax-hi"><em>매매가 7억</em><b>12,859,000원</b><i>세율 1.67% · 6,259,000원 더</i></div>
</div>
<p class="ax-nt">집값은 1억 차이인데 세금은 <b>625만원</b>이 더 붙습니다. 6억 언저리에서 매매가를 조정하는 협상이 벌어지는 이유입니다.</p>
</div></div>

<div class="ax-mh ax-b" id="m2"><b>2단계 — 부가 세금</b><span>취득세만이 아니다</span></div>

<div class="ax-st ax-b2"><div class="ax-n">3</div><div class="ax-sb">
<h3>취득세 말고 또 뭘 내나요</h3>
<p>취득세에 <b>지방교육세</b>가 항상 붙고, 전용면적이 <b>85㎡를 넘으면</b> 농어촌특별세가 추가됩니다. 국민주택 규모(85㎡) 이하는 농특세가 면제됩니다.</p>
<div class="ax-tw"><table>
<thead><tr><th>전용면적</th><th>취득세</th><th>지방교육세</th><th>농어촌특별세</th><th>합계</th></tr></thead>
<tbody>
<tr class="ax-hi"><td>84㎡ (85㎡ 이하)</td><td>5,000,000</td><td>500,000</td><td><b>0</b></td><td><b>5,500,000</b></td></tr>
<tr><td>100㎡ (85㎡ 초과)</td><td>5,000,000</td><td>500,000</td><td><b>1,000,000</b></td><td><b>6,500,000</b></td></tr>
</tbody></table>
<p class="ax-tn">매매가 5억 기준. 85㎡를 넘으면 농어촌특별세 0.2%가 붙어 100만원이 추가됩니다.</p></div>
<ul class="ax-ck"><li>취득세 (지방세법 §11)</li><li>지방교육세 (지방세법 §151)</li><li>농어촌특별세 85㎡ 초과 (농특세법 §5)</li></ul>
<div class="ax-warn"><span>주의</span><p>전용면적 <b>85㎡</b>가 기준선입니다. 흔히 말하는 34평(전용 84㎡) 아파트가 딱 이 선 안쪽에 들어오도록 설계되는 이유가 농어촌특별세 면제 때문입니다.</p></div>
</div></div>

<div class="ax-mh" id="m3"><b>3단계 — 다주택 중과</b><span>주택 수와 지역</span></div>

<div class="ax-st"><div class="ax-n">4</div><div class="ax-sb">
<h3>다주택자는 취득세가 얼마나 무거운가요</h3>
<p>취득 후 보유 주택 수와 조정대상지역 여부에 따라 표준세율 대신 <b>중과세율</b>이 적용됩니다.</p>
<div class="ax-tw"><table>
<thead><tr><th>취득 후 주택 수</th><th>비조정대상지역</th><th>조정대상지역</th></tr></thead>
<tbody>
<tr class="ax-hi"><td>1주택</td><td>표준세율 (1~3%)</td><td>표준세율 (1~3%)</td></tr>
<tr><td>2주택</td><td>표준세율 (1~3%)</td><td><b>8%</b></td></tr>
<tr><td>3주택</td><td><b>8%</b></td><td><b>12%</b></td></tr>
<tr><td>4주택 이상</td><td><b>12%</b></td><td><b>12%</b></td></tr>
</tbody></table>
<p class="ax-tn">지방세법 제13조의2 다주택자 중과세율. 5억짜리 집이라도 조정대상지역 3주택이면 취득세만 6,000만원입니다.</p></div>
<p class="ax-nt">1주택은 1%인데 조정대상지역 3주택은 <b>12%</b>로 열두 배입니다. 취득세는 양도세와 달리 <b>살 때</b> 한 번에 내는 돈이라 자금 계획에 직접 영향을 줍니다.</p>
<div class="ax-warn"><span>주의</span><p>중과세율이 적용되면 지방교육세와 농어촌특별세의 산정 기준도 달라집니다. 이 글의 부가세 계산은 <b>1주택 표준세율 기준</b>이므로, 다주택이라면 계산기에서 주택 수와 지역을 넣어 확인하세요.</p></div>
<div class="ax-btns">
<a class="ax-btn" href="/realestate/acquisition-tax/"><b>취득세 계산기</b><span>주택 수·지역·면적 반영</span></a>
<a class="ax-btn" href="/realestate/transfer-tax/"><b>양도소득세 계산기</b><span>팔 때 내는 세금</span></a>
</div>
</div></div>

<h2 class="ax-sec" id="tips">알아두면 좋은 것</h2>
<ul class="ax-tips">
<li>취득세 신고·납부 기한은 취득일부터 <b>60일 이내</b>입니다. 늦으면 가산세가 붙습니다.</li>
<li>취득세는 매매가가 아니라 <b>시가표준액과 실거래가 중 높은 금액</b>을 기준으로 합니다. 통상 실거래가가 기준이 됩니다.</li>
<li>생애최초 주택 구입은 요건을 충족하면 취득세 감면을 받을 수 있습니다. 소득·주택가액 요건이 있으니 관할 지자체에 확인하세요.</li>
<li>취득세와 중개수수료, 법무사 비용은 나중에 팔 때 양도소득세의 <b>필요경비</b>로 인정됩니다. 영수증을 보관해두세요.</li>
<li>상속·증여로 취득하는 경우는 유상거래와 세율 체계가 완전히 다릅니다. 이 글은 매매(유상취득) 기준입니다.</li>
</ul>

<h2 class="ax-sec" id="faq">자주 묻는 질문</h2>

<details class="ax-acc" open><summary>5억짜리 집을 사면 취득세가 얼마인가요?</summary>
<div class="ax-ab"><p>1주택·85㎡ 이하 기준으로 취득세 <b>500만원</b>(1%)에 지방교육세 50만원을 더해 <b>550만원</b>입니다. 85㎡를 넘으면 농어촌특별세 100만원이 추가돼 650만원이 됩니다.</p>
<p class="ax-law">지방세법 제11조·제151조 · 농어촌특별세법 제5조</p></div></details>

<details class="ax-acc"><summary>6억과 7억 집의 취득세 차이가 왜 그렇게 큰가요?</summary>
<div class="ax-ab"><p>6억까지는 1% 고정이지만 6억을 넘으면 누진 구간이 시작되기 때문입니다. 6억은 세율 1%로 660만원, 7억은 세율 1.67%로 <b>1,285만원</b>입니다. 집값 1억 차이에 세금은 625만원이 더 붙습니다.</p>
<p class="ax-law">지방세법 제11조 (6억 초과~9억 이하 누진)</p></div></details>

<details class="ax-acc"><summary>전용 85㎡가 왜 중요한가요?</summary>
<div class="ax-ab"><p>국민주택 규모 기준선이라 <b>85㎡ 이하는 농어촌특별세가 면제</b>됩니다. 5억 기준으로 85㎡를 넘으면 농특세 100만원이 더 붙습니다. 34평 아파트의 전용면적이 84㎡로 설계되는 이유입니다.</p>
<p class="ax-law">농어촌특별세법 제5조</p></div></details>

<details class="ax-acc"><summary>다주택자 취득세 중과세율은 몇 퍼센트인가요?</summary>
<div class="ax-ab"><p>취득 후 보유 주택 수와 지역에 따라 <b>8% 또는 12%</b>입니다. 조정대상지역 2주택은 8%, 3주택은 12%, 비조정지역은 3주택 8%·4주택 이상 12%입니다.</p>
<p class="ax-law">지방세법 제13조의2</p></div></details>

<details class="ax-acc"><summary>취득세는 언제까지 내야 하나요?</summary>
<div class="ax-ab"><p>취득일부터 <b>60일 이내</b>에 신고·납부해야 합니다. 통상 잔금일에 법무사가 소유권이전등기와 함께 처리합니다. 기한을 넘기면 신고불성실·납부지연 가산세가 붙습니다.</p>
<p class="ax-law">지방세법 (취득세 신고납부)</p></div></details>

<div class="ax-sum">
<h4>정리</h4>
<ul>
<li>주택 취득세는 <b>6억 이하 1%</b>, 6억~9억 누진, <b>9억 초과 3%</b>입니다.</li>
<li>6억은 660만원, 7억은 <b>1,285만원</b>으로 1억 차이에 625만원이 더 붙습니다.</li>
<li>지방교육세가 항상 붙고, <b>85㎡ 초과</b>면 농어촌특별세가 추가됩니다.</li>
<li>다주택은 <b>8% 또는 12%</b> 중과세율이 적용됩니다.</li>
<li>신고·납부 기한은 취득일부터 <b>60일</b>입니다.</li>
</ul>
<a class="ax-cta" href="/realestate/acquisition-tax/">
<span><b>취득세 계산기로 확인하기</b><i>매매가·주택 수·면적을 넣으면 즉시 계산</i></span>
<em>취득세 계산하기</em></a>
</div>

<h2 class="ax-sec" id="src">근거 자료</h2>

<p class="ax-collected">세율 체계는 지방세법과 농어촌특별세법에 따르며, 금액은 MoneyDoc 계산기 엔진으로 산출했습니다.</p>

<div class="ax-lawq"><b>주택 유상거래 취득세 표준세율 (지방세법 제11조)</b>
<p>6억원 이하 <b>1%</b> / 6억원 초과 9억원 이하 <b>(취득가액 ÷ 1억 × 2/3 − 3) ÷ 100</b> / 9억원 초과 <b>3%</b></p></div>

<div class="ax-lawq"><b>다주택자 중과세율 (지방세법 제13조의2)</b>
<p>조정대상지역 2주택 <b>8%</b> / 조정대상지역 3주택 이상 <b>12%</b> / 비조정대상지역 3주택 <b>8%</b> / 4주택 이상 <b>12%</b></p></div>

<div class="ax-lawq"><b>부가되는 세금</b>
<p>지방교육세 — 지방세법 제151조 / 농어촌특별세 — 농어촌특별세법 제5조 (전용면적 85㎡ 초과 시 부과, 국민주택 규모 이하는 비과세)</p></div>

<div class="ax-src"><b>출처 · 행정안전부, 지방세법</b><br>
세율 근거는 <a href="https://www.law.go.kr/법령/지방세법" target="_blank" rel="noopener">지방세법</a> 제11조·제13조의2·제151조와 농어촌특별세법 제5조입니다.<br><br>
이 글의 금액은 <b>1주택 표준세율</b> 기준입니다. 다주택 중과세율이 적용되는 경우 지방교육세·농어촌특별세의 산정 기준이 달라집니다. 생애최초 감면, 상속·증여 취득, 오피스텔·분양권 등은 별도 기준이 적용되므로 실제 납부 전에는 관할 지방자치단체나 세무 전문가에게 확인하시기 바랍니다.</div>`;

export const asideHtml = `<div class="ax-side"><h4>부동산 계산기</h4>
<a class="ax-rel" href="/realestate/acquisition-tax/">취득세 계산기<span>살 때 내는 세금</span></a>
<a class="ax-rel" href="/realestate/transfer-tax/">양도소득세 계산기<span>팔 때 내는 세금</span></a>
<a class="ax-rel" href="/realestate/property-tax/">재산세 계산기<span>보유 중 내는 세금</span></a>
</div>

<div class="ax-side"><h4>이 글의 단계</h4>
<ol>
<li><a href="#m1">취득세율 구조</a></li>
<li><a href="#m1">매매가별 세금</a></li>
<li><a href="#m2">지방교육세·농특세</a></li>
<li><a href="#m3">다주택 중과</a></li>
<li><a href="#faq">자주 묻는 질문</a></li>
</ol></div>

<div class="ax-side"><h4>같은 분류의 글</h4>
<a class="ax-rel" href="/realestate/transfer-tax-guide/">1세대 1주택 양도세 비과세<span>양도세</span></a>
<a class="ax-rel" href="/loan/dsr-limit-guide/">스트레스 DSR 3단계 계산<span>대출</span></a>
<a class="ax-rel" href="/law/annual-leave-allowance-guide/">연차수당 계산법<span>근로</span></a>
</div>`;

export const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      "name": "5억짜리 집을 사면 취득세가 얼마인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1주택·85㎡ 이하 기준으로 취득세 500만원(1%)에 지방교육세 50만원을 더해 550만원입니다. 85㎡를 넘으면 농어촌특별세 100만원이 추가돼 650만원이 됩니다. 지방세법 제11조·제151조 · 농어촌특별세법 제5조"
      }
    },
    {
      "@type": "Question",
      "name": "6억과 7억 집의 취득세 차이가 왜 그렇게 큰가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "6억까지는 1% 고정이지만 6억을 넘으면 누진 구간이 시작되기 때문입니다. 6억은 세율 1%로 660만원, 7억은 세율 1.67%로 1,285만원입니다. 집값 1억 차이에 세금은 625만원이 더 붙습니다. 지방세법 제11조 (6억 초과~9억 이하 누진)"
      }
    },
    {
      "@type": "Question",
      "name": "전용 85㎡가 왜 중요한가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "국민주택 규모 기준선이라 85㎡ 이하는 농어촌특별세가 면제됩니다. 5억 기준으로 85㎡를 넘으면 농특세 100만원이 더 붙습니다. 34평 아파트의 전용면적이 84㎡로 설계되는 이유입니다. 농어촌특별세법 제5조"
      }
    },
    {
      "@type": "Question",
      "name": "다주택자 취득세 중과세율은 몇 퍼센트인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "취득 후 보유 주택 수와 지역에 따라 8% 또는 12%입니다. 조정대상지역 2주택은 8%, 3주택은 12%, 비조정지역은 3주택 8%·4주택 이상 12%입니다. 지방세법 제13조의2"
      }
    },
    {
      "@type": "Question",
      "name": "취득세는 언제까지 내야 하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "취득일부터 60일 이내에 신고·납부해야 합니다. 통상 잔금일에 법무사가 소유권이전등기와 함께 처리합니다. 기한을 넘기면 신고불성실·납부지연 가산세가 붙습니다. 지방세법 (취득세 신고납부)"
      }
    }
  ],
};
