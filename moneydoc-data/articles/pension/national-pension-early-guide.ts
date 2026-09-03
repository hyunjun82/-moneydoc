// 자동 생성: scripts/convert-previews.mjs — 직접 수정하지 말 것
// 원본: public/_preview/5-국민연금-조기수령.html
export const meta = {
  title: "국민연금 조기수령 손익분기 76.7세, 당겨받으면 손해일까",
  description: "국민연금 조기수령은 1년당 6%씩 최대 30% 깎입니다. 60세 개시 시 손익분기점은 76.7세. 출생연도별 지급개시연령과 조기수령 조건, 소득 발생 시 지급정지까지 국민연금공단 자료로 정리했습니다.",
  datePublished: "2026-09-01",
  dateModified: "2026-09-01",
  url: "https://moneydoc.kr/pension/national-pension-early-guide/",
};

export const widgetKey = "earlyPension";

export const widgetHtml = `<div class="ax-wg" id="wg1">
<div class="ax-wg-h"><b>조기수령 손익분기 계산</b>
<span>예상 연금액과 개시 나이를 넣으면 감액률과 손익분기 나이가 나옵니다</span></div>
<div class="ax-wg-in">
  <label class="ax-wg-f"><em>정상 수령 시 월 연금액 (원)</em><input type="number" id="pen" value="1000000" step="50000" min="0"></label>
  <label class="ax-wg-f"><em>정상 지급개시 연령</em>
    <select id="norm"><option value="65">65세 (1969년 이후 출생)</option><option value="64">64세 (1965~68년생)</option><option value="63">63세 (1961~64년생)</option></select></label>
  <label class="ax-wg-f"><em>조기수령 시작 나이</em><input type="number" id="start" value="60" step="1" min="55" max="65"></label>
  <label class="ax-wg-f"><em>기대 수명</em><input type="number" id="life" value="85" step="1" min="60" max="110"></label>
</div>
<div class="ax-wg-out" id="out"></div>
<p class="ax-wg-note">감액률은 1년당 6%(월 0.5%)로 계산했습니다. 실제 연금액은 가입기간·소득에 따라 달라지므로 <a href="/pension/national-pension-early/">조기수령 계산기</a>와 국민연금공단 내 연금 알아보기에서 확인하세요.</p>
</div>`;

export const htmlBefore = `<h1>국민연금 조기수령 손익분기 76.7세, 당겨받으면 손해일까</h1>
<p class="ax-by">MoneyDoc 편집팀 · 2026년 9월 1일 기준 · 약 8분</p>

<svg class="ax-hero" viewBox="0 0 1100 563" role="img" aria-label="국민연금 조기수령 — 1년당 6% 감액, 손익분기 76.7세">
<rect width="1100" height="563" fill="#f7f2ea"/>
<path d="M820 0h280v240a60 60 0 0 1-60 60H820z" fill="#f6e3de"/>
<circle cx="1012" cy="72" r="46" fill="#f2d9d2" opacity=".55"/>
<rect x="72" y="160" width="104" height="42" rx="9" fill="#c4452f"/>
<text x="124" y="189" font-size="19" font-weight="800" text-anchor="middle" fill="#fff" letter-spacing="-.5">연금·노후</text>
<text x="72" y="282" font-size="55" font-weight="800" fill="#2b2723" letter-spacing="-2.6">국민연금 조기수령</text>
<rect x="70" y="312" width="286" height="26" fill="#f2cfc8"/>
<text x="72" y="349" font-size="55" font-weight="800" fill="#c4452f" letter-spacing="-2.6">손익분기 76.7세</text>
<text x="72" y="400" font-size="21" font-weight="700" fill="#6f6858" letter-spacing="-.8">1년 당길 때마다 6% 감액 · 최대 30%</text>
<rect x="0" y="545" width="1100" height="18" fill="#c4452f"/>
<g transform="translate(646 156)">
  <ellipse cx="196" cy="286" rx="170" ry="18" fill="#e8ded0" opacity=".55"/>
  <line x1="20" y1="240" x2="372" y2="240" stroke="#6b6255" stroke-width="4" stroke-linecap="round"/>
  <path d="M20 210 L372 96" fill="none" stroke="#c4452f" stroke-width="6" stroke-linecap="round"/>
  <path d="M20 240 L372 40" fill="none" stroke="#6b6255" stroke-width="6" stroke-linecap="round" opacity=".6"/>
  <circle cx="264" cy="132" r="12" fill="#c4452f"/>
  <text x="264" y="112" font-size="19" font-weight="800" text-anchor="middle" fill="#c4452f">교차</text>
  <text x="30" y="272" font-size="15" font-weight="700" fill="#8a8172">60세</text>
  <text x="352" y="272" font-size="15" font-weight="700" text-anchor="end" fill="#8a8172">90세</text>
</g>
</svg>

<p class="ax-intro">국민연금은 정해진 나이보다 <b>최대 5년</b> 먼저 받을 수 있습니다. 대신 <b>1년당 6%</b>씩, 5년을 당기면 <b>30%</b>가 영구히 깎입니다. 매달 덜 받지만 더 오래 받으니, 어느 시점부터 손해로 바뀌는지가 관건입니다. 정상 수령액이 월 100만원이라면 그 지점은 <b>76.7세</b>입니다.</p>

<a class="ax-cta" href="/pension/national-pension-early/">
<span><b>내 조기수령 감액액 바로 계산하기</b><i>예상 연금액과 개시 나이만 넣으면 됩니다</i></span>
<em>조기수령 계산하기</em></a>

<div class="ax-toc"><b>이 글에서는</b><a href="#m1">조건 2단계</a><a href="#m2">손익분기</a><a href="#m3">소득 발생 시</a><a href="#tips">알아두면 좋은 것</a><a href="#faq">자주 묻는 질문</a><a href="#src">근거 자료</a></div>`;

export const htmlAfter = `<div class="ax-mh" id="m1"><b>1단계 — 조건</b><span>언제부터 · 얼마나 깎이나</span></div>

<div class="ax-st"><div class="ax-n">1</div><div class="ax-sb">
<h3>국민연금 조기 수령 조건은 무엇인가요</h3>
<p>세 가지를 모두 충족해야 합니다. 가입기간이 <b>10년 이상</b>이고, <b>지급개시연령보다 최대 5년</b> 이른 나이여야 하며, <b>소득이 있는 업무에 종사하지 않아야</b> 합니다. 개시연령은 출생연도에 따라 다릅니다.</p>
<div class="ax-tw"><table>
<thead><tr><th>출생연도</th><th>노령연금 개시</th><th>조기노령연금 개시</th></tr></thead>
<tbody>
<tr><td>1953~1956년생</td><td>61세</td><td>56세</td></tr>
<tr><td>1957~1960년생</td><td>62세</td><td>57세</td></tr>
<tr><td>1961~1964년생</td><td>63세</td><td>58세</td></tr>
<tr><td>1965~1968년생</td><td>64세</td><td>59세</td></tr>
<tr class="ax-hi"><td>1969년 이후 출생</td><td><b>65세</b></td><td><b>60세</b></td></tr>
</tbody></table>
<p class="ax-tn">국민연금공단 기준. 특수직종근로자는 각각 5년씩 앞당겨집니다.</p></div>
<ul class="ax-ck"><li>가입기간 10년 이상</li><li>개시연령 5년 전부터</li><li>소득 있는 업무 미종사</li><li>본인 신청</li></ul>
<p class="ax-law-l">국민연금법 제61조·제62조 · 국민연금공단 노령연금 안내</p>
</div></div>

<div class="ax-st"><div class="ax-n">2</div><div class="ax-sb">
<h3>1년 당길 때마다 6%씩 줄어듭니다</h3>
<p>감액은 1년당 6%, 한 달당 0.5%입니다. 한 번 정해진 감액률은 <b>평생 그대로</b> 적용됩니다. 정상 개시연령에 도달해도 원래 금액으로 돌아오지 않습니다.</p>
<div class="ax-tw"><table>
<thead><tr><th>개시 나이</th><th>당긴 기간</th><th>감액률</th><th>월 수령액</th><th>정상 대비</th></tr></thead>
<tbody>
<tr class="ax-hi"><td>60세</td><td>5년</td><td>30%</td><td><b>700,000원</b></td><td>−300,000</td></tr>
<tr><td>61세</td><td>4년</td><td>24%</td><td>760,000원</td><td>−240,000</td></tr>
<tr><td>62세</td><td>3년</td><td>18%</td><td>820,000원</td><td>−180,000</td></tr>
<tr><td>63세</td><td>2년</td><td>12%</td><td>880,000원</td><td>−120,000</td></tr>
<tr><td>64세</td><td>1년</td><td>6%</td><td>940,000원</td><td>−60,000</td></tr>
<tr><td>65세 (정상)</td><td>-</td><td>0%</td><td>1,000,000원</td><td>-</td></tr>
</tbody></table>
<p class="ax-tn">정상 수령액 월 100만원, 개시연령 65세(1969년 이후 출생) 기준. MoneyDoc 계산기 엔진으로 산출했습니다.</p></div>
<div class="ax-warn"><span>주의</span><p>감액은 <b>영구적</b>입니다. 60세에 당겨 받기 시작하면 90세가 되어도 70%만 받습니다. 유족연금 산정 기준액도 감액된 금액이 기준이 됩니다.</p></div>
</div></div>

<div class="ax-mh ax-b" id="m2"><b>2단계 — 손익분기</b><span>몇 살까지 살면 손해인가</span></div>

<div class="ax-st ax-b2"><div class="ax-n">3</div><div class="ax-sb">
<h3>국민연금 조기수령 손익분기점은 몇 살인가요</h3>
<p>먼저 받기 시작하는 만큼 초반에는 앞섭니다. 그러다 정상 수령자가 따라잡는 시점이 손익분기점입니다.</p>
<div class="ax-tw"><table>
<thead><tr><th>개시 나이</th><th>월 수령액</th><th>손익분기 나이</th></tr></thead>
<tbody>
<tr class="ax-hi"><td>60세</td><td>700,000원</td><td><b>76.7세</b></td></tr>
<tr><td>61세</td><td>760,000원</td><td>77.7세</td></tr>
<tr><td>62세</td><td>820,000원</td><td>78.7세</td></tr>
<tr><td>63세</td><td>880,000원</td><td>79.7세</td></tr>
<tr><td>64세</td><td>940,000원</td><td>80.7세</td></tr>
</tbody></table>
<p class="ax-tn">정상 개시 65세·월 100만원 기준. 물가상승률과 연금액 인상은 반영하지 않은 단순 누적 비교입니다.</p></div>
<p class="ax-nt">60세에 당겨 받으면 <b>76.7세</b>까지는 누적 수령액이 더 많고, 그 이후로는 정상 수령이 앞섭니다. 나이별 누적액을 보면 차이가 분명해집니다.</p>
<div class="ax-tw"><table>
<thead><tr><th>나이</th><th>60세 개시 누적</th><th>65세 개시 누적</th><th>차이</th></tr></thead>
<tbody>
<tr><td>70세</td><td>84,000,000</td><td>60,000,000</td><td>+24,000,000</td></tr>
<tr><td>75세</td><td>126,000,000</td><td>120,000,000</td><td>+6,000,000</td></tr>
<tr class="ax-hi"><td>77세</td><td>142,800,000</td><td>144,000,000</td><td><b>−1,200,000</b></td></tr>
<tr><td>80세</td><td>168,000,000</td><td>180,000,000</td><td>−12,000,000</td></tr>
<tr><td>85세</td><td>210,000,000</td><td>240,000,000</td><td>−30,000,000</td></tr>
<tr><td>90세</td><td>252,000,000</td><td>300,000,000</td><td>−48,000,000</td></tr>
</tbody></table>
<p class="ax-tn">단위: 원. 90세까지 산다면 조기수령이 4,800만원 손해입니다.</p></div>
<figure class="ax-ig">
<svg viewBox="0 0 660 180" role="img" aria-label="조기수령은 초반에 앞서지만 76.7세를 넘으면 정상수령이 역전합니다">
<text x="0" y="18" font-size="13" font-weight="700" fill="currentColor" letter-spacing="-.3">누적 수령액이 뒤집히는 지점</text>
<line x1="30" y1="150" x2="640" y2="150" stroke="currentColor" stroke-width="1.5" opacity=".3"/>
<path d="M30 148 L640 44" fill="none" stroke="#c4452f" stroke-width="4" stroke-linecap="round"/>
<path d="M234 148 L640 20" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" opacity=".55"/>
<circle cx="452" cy="76" r="8" fill="#c4452f"/>
<text x="452" y="62" font-size="12" font-weight="800" text-anchor="middle" fill="#c4452f">76.7세</text>
<text x="30" y="168" font-size="11" fill="currentColor" opacity=".6">60세</text>
<text x="234" y="168" font-size="11" fill="currentColor" opacity=".6">65세</text>
<text x="640" y="168" font-size="11" text-anchor="end" fill="currentColor" opacity=".6">90세</text>
<text x="150" y="110" font-size="11.5" font-weight="700" fill="#c4452f">조기수령 (월 70만)</text>
<text x="470" y="120" font-size="11.5" font-weight="700" fill="currentColor" opacity=".7">정상수령 (월 100만)</text>
</svg>
<figcaption>정상 개시 65세·월 100만원 가정 · 물가상승률 미반영 단순 누적</figcaption>
</figure>
<div class="ax-btns">
<a class="ax-btn" href="/pension/national-pension-early/"><b>조기수령 계산기</b><span>감액률·수령액 계산</span></a>
<a class="ax-btn" href="/pension/national-pension/"><b>국민연금 예상수령액</b><span>가입기간별 예상액</span></a>
</div>
</div></div>

<div class="ax-mh" id="m3"><b>3단계 — 소득 발생</b><span>지급정지</span></div>

<div class="ax-st"><div class="ax-n">4</div><div class="ax-sb">
<h3>조기수령 중 소득이 생기면 어떻게 되나요</h3>
<p>조기노령연금은 <b>소득이 있는 업무에 종사하지 않는 것</b>이 요건입니다. 수급 중에 소득이 생기면 지급이 정지되고, 소득이 없어지면 다시 신청해 받을 수 있습니다.</p>
<figure class="ax-ig">
<svg viewBox="0 0 660 140" role="img" aria-label="조기수령 중 소득이 생기면 지급정지, 소득이 없어지면 재지급 신청">
<text x="0" y="18" font-size="13" font-weight="700" fill="currentColor" letter-spacing="-.3">소득이 생겼을 때의 흐름</text>
<rect x="0" y="44" width="176" height="50" rx="8" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".55"/>
<text x="88" y="66" font-size="12.5" font-weight="700" text-anchor="middle" fill="currentColor">조기노령연금 수급</text>
<text x="88" y="84" font-size="10.5" text-anchor="middle" fill="currentColor" opacity=".6">소득 없음</text>
<line x1="176" y1="69" x2="224" y2="69" stroke="#c4452f" stroke-width="2" stroke-linecap="round"/>
<polygon points="215,64 215,74 224,69" fill="#c4452f"/>
<text x="200" y="58" font-size="10.5" font-weight="600" text-anchor="middle" fill="#c4452f">소득 발생</text>
<rect x="224" y="44" width="176" height="50" rx="8" fill="none" stroke="#c4452f" stroke-width="1.5"/>
<text x="312" y="66" font-size="12.5" font-weight="700" text-anchor="middle" fill="#c4452f">지급정지</text>
<text x="312" y="84" font-size="10.5" text-anchor="middle" fill="#c4452f" opacity=".85">신청으로 정지</text>
<line x1="400" y1="69" x2="448" y2="69" stroke="currentColor" stroke-width="2" opacity=".6" stroke-linecap="round"/>
<polygon points="439,64 439,74 448,69" fill="currentColor" opacity=".6"/>
<text x="424" y="58" font-size="10.5" font-weight="600" text-anchor="middle" fill="currentColor" opacity=".6">소득 종료</text>
<rect x="448" y="44" width="212" height="50" rx="8" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".55"/>
<text x="554" y="66" font-size="12.5" font-weight="700" text-anchor="middle" fill="currentColor">재지급 신청</text>
<text x="554" y="84" font-size="10.5" text-anchor="middle" fill="currentColor" opacity=".6">다시 수령</text>
<text x="0" y="128" font-size="11.5" font-weight="600" fill="currentColor" opacity=".6" letter-spacing="-.3">지급정지·재지급 모두 신청일 이전으로 소급되지 않습니다</text>
</svg>
<figcaption>국민연금공단 조기노령연금 지급정지·재지급 안내</figcaption>
</figure>
<div class="ax-warn"><span>주의</span><p>지급정지와 재지급 신청은 <b>신청일 이전으로 소급되지 않습니다.</b> 소득이 생겼는데 신고하지 않고 계속 받으면 나중에 환수될 수 있습니다.</p></div>
</div></div>

<h2 class="ax-sec" id="tips">알아두면 좋은 것</h2>
<ul class="ax-tips">
<li>조기수령은 한 번 결정하면 되돌릴 수 없습니다. 감액률이 평생 고정되므로 신중히 판단해야 합니다.</li>
<li>반대로 연기연금은 1년당 7.2%(월 0.6%)씩 늘어나 최대 5년, 36%까지 증액됩니다. 건강하고 다른 소득이 있다면 연기가 유리할 수 있습니다.</li>
<li>손익분기점은 물가상승률을 반영하지 않은 단순 비교입니다. 국민연금은 매년 물가에 연동해 인상되므로 금액이 큰 정상수령 쪽이 인상 효과도 큽니다.</li>
<li>건강보험 피부양자 자격은 연금소득도 따집니다. 조기수령으로 소득이 잡히면 피부양자에서 탈락할 수 있습니다.</li>
<li>당장 생활비가 급하거나 건강이 좋지 않다면 손익분기 나이보다 현금흐름이 우선일 수 있습니다. 숫자만으로 결정할 문제는 아닙니다.</li>
</ul>

<h2 class="ax-sec" id="faq">자주 묻는 질문</h2>

<details class="ax-acc" open><summary>2026년 국민연금 조기 수령 조건은 무엇인가요?</summary>
<div class="ax-ab"><p>가입기간 10년 이상, 지급개시연령보다 최대 5년 이른 나이, 소득이 있는 업무에 종사하지 않을 것 세 가지입니다. 1969년 이후 출생자는 개시연령이 65세이므로 <b>60세부터</b> 신청할 수 있습니다.</p>
<p class="ax-law">국민연금법 제61조·제62조</p></div></details>

<details class="ax-acc"><summary>1967년생은 국민연금을 조기 수령할 수 있나요?</summary>
<div class="ax-ab"><p>가능합니다. 1965~1968년생은 노령연금 개시연령이 <b>64세</b>이므로, 조기노령연금은 <b>59세부터</b> 신청할 수 있습니다. 5년을 당기면 감액률은 동일하게 30%입니다.</p>
<p class="ax-law">국민연금공단 출생연도별 지급개시연령</p></div></details>

<details class="ax-acc"><summary>국민연금 조기 수령 계산법은 어떻게 되나요?</summary>
<div class="ax-ab"><p>당긴 기간 1년당 6%, 한 달당 0.5%를 뺍니다. 정상 수령액이 월 100만원이고 5년을 당기면 30%가 깎여 <b>70만원</b>, 3년을 당기면 18%가 깎여 <b>82만원</b>입니다.</p>
<p class="ax-law">국민연금법 시행령 (조기노령연금 지급률)</p></div></details>

<details class="ax-acc"><summary>국민연금 조기 수령의 장단점은 무엇인가요?</summary>
<div class="ax-ab"><p>장점은 5년 일찍 현금흐름이 생긴다는 것이고, 단점은 감액이 평생 이어진다는 것입니다. 정상 수령액 월 100만원 기준으로 <b>76.7세</b>를 넘겨 살면 조기수령이 손해로 바뀌고, 90세까지 살면 누적 4,800만원 차이가 납니다.</p>
<p class="ax-law">본문 손익분기 표 참고</p></div></details>

<details class="ax-acc"><summary>조기수령 중 소득이 생기면 지급정지되나요?</summary>
<div class="ax-ab"><p>됩니다. 조기노령연금은 소득이 있는 업무에 종사하지 않는 것이 요건이라, 소득이 생기면 지급정지를 신청해야 합니다. 소득이 없어지면 재지급을 신청해 다시 받을 수 있고, 둘 다 신청일 이전으로 소급되지 않습니다.</p>
<p class="ax-law">국민연금공단 조기노령연금 지급정지·재지급</p></div></details>

<div class="ax-sum">
<h4>정리</h4>
<ul>
<li>조기노령연금은 개시연령보다 <b>최대 5년</b> 먼저, 가입 10년 이상·소득 없을 때 받습니다.</li>
<li>감액은 <b>1년당 6%</b>, 최대 30%이며 <b>평생 고정</b>됩니다.</li>
<li>1969년 이후 출생자는 <b>60세</b>, 1965~68년생은 59세부터 가능합니다.</li>
<li>월 100만원 기준 손익분기점은 <b>76.7세</b>, 90세까지 살면 4,800만원 손해입니다.</li>
<li>수급 중 소득이 생기면 <b>지급정지</b> 신청 대상입니다.</li>
</ul>
<a class="ax-cta" href="/pension/national-pension-early/">
<span><b>조기수령 계산기로 내 감액액 확인하기</b><i>개시 나이별 수령액을 한눈에</i></span>
<em>조기수령 계산하기</em></a>
</div>

<h2 class="ax-sec" id="src">근거 자료</h2>

<p class="ax-collected">아래 내용은 2026년 9월 1일 기준으로 국민연금공단 안내를 확인해 정리한 것입니다.</p>

<div class="ax-lawq"><b>국민연금공단 — 노령연금의 종류</b>
<p>지급개시연령은 1953년생부터 점차 상향되어 <b>1969년 이후 출생자부터는 65세(조기노령연금의 경우 60세)</b>에 연금을 받도록 규정하고 있습니다.</p></div>

<div class="ax-lawq"><b>국민연금공단 — 조기노령연금</b>
<p>가입 기간이 <b>10년 이상</b>이고, <b>소득이 있는 업무에 종사하지 않는 경우</b> 본인이 신청하여 지급개시연령보다 <b>최대 5년 일찍</b> 받을 수 있습니다.</p></div>

<div class="ax-lawq"><b>국민연금공단 — 조기노령연금 지급정지·재지급</b>
<p>조기노령연금 수급 중이며 소득이 있는 업무에 종사하지 않는 경우 지급정지 신청이 가능합니다. <b>신청일 이전으로 소급하여 지급정지 및 재지급 신청은 불가</b>합니다.</p></div>

<div class="ax-lawq"><b>출생연도별 지급개시연령</b>
<p>1953~1956년생 61세 / 1957~1960년생 62세 / 1961~1964년생 63세 / 1965~1968년생 64세 / 1969년 이후 65세. 조기노령연금은 각 개시연령의 5년 전부터. (특수직종근로자는 5년씩 앞당김)</p></div>

<div class="ax-src"><b>출처 · 국민연금공단</b><br>
지급개시연령과 조기노령연금 요건은 <a href="https://www.nps.or.kr/" target="_blank" rel="noopener">국민연금공단</a>에서 확인할 수 있습니다. 근거 법령은 국민연금법 제61조(노령연금 수급권자)·제62조(조기노령연금)입니다.<br><br>
실제 연금액은 가입기간, 가입 중 소득, 전체 가입자 평균소득 등에 따라 결정됩니다. 본문의 손익분기 계산은 물가상승에 따른 연금액 인상을 반영하지 않은 단순 누적 비교이며, 참고용입니다. 정확한 예상 연금액은 국민연금공단 '내 연금 알아보기'에서 확인하시기 바랍니다.</div>`;

export const asideHtml = `<div class="ax-side"><h4>연금 계산기</h4>
<a class="ax-rel" href="/pension/national-pension-early/">국민연금 조기수령 계산기<span>감액률 반영</span></a>
<a class="ax-rel" href="/pension/national-pension/">국민연금 예상수령액<span>가입기간별</span></a>
<a class="ax-rel" href="/government/basic-pension/">기초연금 계산기<span>65세 이상</span></a>
</div>

<div class="ax-side"><h4>이 글의 단계</h4>
<ol>
<li><a href="#m1">조기수령 조건</a></li>
<li><a href="#m1">감액률 6%</a></li>
<li><a href="#m2">손익분기점</a></li>
<li><a href="#m3">소득 발생 시</a></li>
<li><a href="#faq">자주 묻는 질문</a></li>
</ol></div>

<div class="ax-side"><h4>같은 분류의 글</h4>
<a class="ax-rel" href="/loan/dsr-limit-guide/">스트레스 DSR 3단계 계산<span>대출</span></a>
<a class="ax-rel" href="/realestate/transfer-tax-guide/">1세대 1주택 양도세 비과세<span>양도세</span></a>
<a class="ax-rel" href="undefined">2026 연봉 실수령액 표<span>연봉</span></a>
</div>`;

export const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      "name": "2026년 국민연금 조기 수령 조건은 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "가입기간 10년 이상, 지급개시연령보다 최대 5년 이른 나이, 소득이 있는 업무에 종사하지 않을 것 세 가지입니다. 1969년 이후 출생자는 개시연령이 65세이므로 60세부터 신청할 수 있습니다. 국민연금법 제61조·제62조"
      }
    },
    {
      "@type": "Question",
      "name": "1967년생은 국민연금을 조기 수령할 수 있나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "가능합니다. 1965~1968년생은 노령연금 개시연령이 64세이므로, 조기노령연금은 59세부터 신청할 수 있습니다. 5년을 당기면 감액률은 동일하게 30%입니다. 국민연금공단 출생연도별 지급개시연령"
      }
    },
    {
      "@type": "Question",
      "name": "국민연금 조기 수령 계산법은 어떻게 되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "당긴 기간 1년당 6%, 한 달당 0.5%를 뺍니다. 정상 수령액이 월 100만원이고 5년을 당기면 30%가 깎여 70만원, 3년을 당기면 18%가 깎여 82만원입니다. 국민연금법 시행령 (조기노령연금 지급률)"
      }
    },
    {
      "@type": "Question",
      "name": "국민연금 조기 수령의 장단점은 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "장점은 5년 일찍 현금흐름이 생긴다는 것이고, 단점은 감액이 평생 이어진다는 것입니다. 정상 수령액 월 100만원 기준으로 76.7세를 넘겨 살면 조기수령이 손해로 바뀌고, 90세까지 살면 누적 4,800만원 차이가 납니다. 본문 손익분기 표 참고"
      }
    },
    {
      "@type": "Question",
      "name": "조기수령 중 소득이 생기면 지급정지되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "됩니다. 조기노령연금은 소득이 있는 업무에 종사하지 않는 것이 요건이라, 소득이 생기면 지급정지를 신청해야 합니다. 소득이 없어지면 재지급을 신청해 다시 받을 수 있고, 둘 다 신청일 이전으로 소급되지 않습니다. 국민연금공단 조기노령연금 지급정지·재지급"
      }
    }
  ],
};
