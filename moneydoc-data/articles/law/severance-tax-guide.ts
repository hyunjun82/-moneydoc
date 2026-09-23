// 자동 생성: scripts/article-template/convert-v2.mjs — 직접 수정하지 말 것
// 원본: public/_preview/article-v2-severance-tax-guide.html
export const meta = {
  title: "퇴직금 세금 몇프로, 세전 세후 차이는 얼마나 되나요",
  description: "월급 300만원으로 5년 일한 퇴직금에 붙는 세금은 1.14%예요. 월급이 같으면 근속 5년까지는 비율이 같고, 5년을 넘기면 내려가요. 계산 순서, 월급별 세전 세후 차이, IRP 계좌로 받을 때 세금을 떼는 시점을 정리했어요.",
  datePublished: "2026-09-13",
  dateModified: "2026-09-13",
  url: "https://moneydoc.kr/law/severance-tax-guide/",
  image: "https://moneydoc.kr/og/severance-tax-guide.png",
  imageAlt: "퇴직금 세금 몇프로. 월급 300만원으로 5년 일하면 퇴직금의 1.14%가 세금이에요",
};

export const scriptKey = "severance-tax-guide";

export const html = `<h1>퇴직금 세금 몇프로, 세전 세후 차이는 얼마나 되나요</h1>
<div class="v2-meta"><span>글 <a href="/about/">한결</a></span><span>·</span><span>2026년 9월 기준</span><span>·</span><span>5분</span><span class="v2-badge">퇴직소득세 계산기 산식 기준 · 2026-09-13</span></div>
<img class="v2-hero" src="/og/severance-tax-guide.png" width="1200" height="630" alt="퇴직금 세금 몇프로. 월급 300만원으로 5년 일하면 퇴직금의 1.14%가 세금이에요">
<p class="v2-lead v2-intro">퇴직금 세금은 퇴직금 전체에 세율을 바로 곱하지 않아요. 근속연수공제와 환산급여공제를 먼저 거쳐서, 월급 300만원으로 5년 일했다면 세금은 퇴직금의 1.14%예요. 월급이 같으면 근속 5년까지는 이 비율이 같고, 5년을 넘기면 내려가요. 몇프로인지, 어떤 순서로 계산하는지, 세전 세후가 얼마나 차이 나는지 정리했어요.</p>
<section class="v2-answer" aria-label="즉답">
  <div class="v2-lbl">근속을 고르면 바로 답해요 (월급 300만원 기준)</div>
  <div class="v2-chips" id="qchips" data-q='[{&quot;big&quot;:&quot;1.14%&quot;,&quot;unit&quot;:&quot;세금&quot;,&quot;sub&quot;:&quot;월급 300만원, 상여금이 없는 경우&quot;},{&quot;big&quot;:&quot;0.69%&quot;,&quot;unit&quot;:&quot;세금&quot;,&quot;sub&quot;:&quot;세금 합계 202,783원&quot;},{&quot;big&quot;:&quot;0.24%&quot;,&quot;unit&quot;:&quot;세금&quot;,&quot;sub&quot;:&quot;세금 합계 141,566원&quot;}]'><button type="button" data-i="0" aria-pressed="true">5년</button><button type="button" data-i="1" aria-pressed="false">10년</button><button type="button" data-i="2" aria-pressed="false">20년</button></div>
  <div class="v2-big" id="qnet">1.14%<small>세금</small></div>
  <div class="v2-sub" id="qsub">월급 300만원, 상여금이 없는 경우</div>
  <div class="v2-split">
    <div class="v2-box"><b>지방소득세가 따로 붙어요</b><span>퇴직소득세 152,174원에 지방소득세 15,217원이 더해져요</span></div>
    <div class="v2-box"><b>5년 1개월이면 6년으로 세요</b><span>끝자리 1개월도 1년으로 올려 근속연수 6년으로 세서, 월급 300만원이면 비율이 0.70%로 떨어져요</span></div>
  </div>
</section>
<!--CALC_START--><a class="v2-cta" href="/retirement-tax/">퇴직소득세 계산기 바로가기</a><!--CALC_END-->
<details class="v2-toc"><summary>목차 (5개 질문)<span>열기</span></summary><ol><li><a href="#s1">퇴직금 세금 몇프로인가요</a></li><li><a href="#s2">퇴직소득세는 어떤 순서로 계산하나요</a></li><li><a href="#s3">퇴직금 세전 세후 차이는 얼마나 나나요</a></li><li><a href="#s4">근속연수가 길면 퇴직금 세금이 줄어드나요</a></li><li><a href="#faq">자주 묻는 질문</a></li></ol></details>
<section class="v2-kk" aria-label="한눈에 보는 요약">
  <div class="v2-hd"><small>한눈에 보는 퇴직금 세금</small><b>핵심콕콕</b></div>
  <dl>
    <div class="v2-row"><dt>월급 300만원·5년 세금</dt><dd>167,391원</dd></div>
    <div class="v2-row"><dt>통장으로 받을 때 세후</dt><dd>14,506,522원</dd></div>
    <div class="v2-row"><dt>비율이 같은 구간</dt><dd>월급이 같으면 근속 1년부터 5년까지</dd></div>
    <div class="v2-row"><dt>근속연수공제 (5년까지)</dt><dd>1년에 1,000,000원</dd></div>
    <div class="v2-row"><dt>근속연수공제 (6년)</dt><dd>7,000,000원</dd></div>
    <div class="v2-row"><dt>끝자리 기간</dt><dd>1년이 안 돼도 1년으로 올려 세요</dd></div>
    <div class="v2-row"><dt>지방소득세 (월급 300만원·5년)</dt><dd>15,217원</dd></div>
  </dl>
</section>

<h2 id="s1">퇴직금 세금 몇프로인가요<small>5년까지는 같고 넘기면 내려가요</small></h2>
<p class="v2-lead"><span class="v2-ans">월급 300만원으로 5년 일했다면 퇴직금의 1.14%가 세금이에요.</span> 월급이 같으면 근속 1년이든 5년이든 이 비율이 같고, 5년을 넘기면 내려가요.</p>
<div class="v2-tbl"><table><caption>근속별 퇴직금 세금 비율 (월급 300만원 기준)</caption><thead><tr><th>근속</th><th>퇴직금</th><th>세금 합계</th><th>세금 비율</th></tr></thead><tbody>
<tr><th scope="row">1년</th><td>2,934,783원</td><td>33,479원</td><td class="v2-net">1.14%</td></tr>
<tr><th scope="row">3년</th><td>8,804,348원</td><td>100,434원</td><td class="v2-net">1.14%</td></tr>
<tr class="v2-hi"><th scope="row">5년</th><td>14,673,913원</td><td>167,391원</td><td class="v2-net">1.14%</td></tr>
<tr><th scope="row">6년</th><td>17,608,696원</td><td>174,470원</td><td class="v2-net">0.99%</td></tr>
<tr><th scope="row">10년</th><td>29,347,827원</td><td>202,783원</td><td class="v2-net">0.69%</td></tr>
<tr><th scope="row">20년</th><td>58,695,654원</td><td>141,566원</td><td class="v2-net">0.24%</td></tr>
</tbody></table></div>
<p class="v2-fn">세금 합계는 퇴직소득세와 지방소득세를 더한 금액이에요. 퇴직일 2026년 1월 1일, 상여금 없음, 입사일은 재직일수가 근속연수×365일이 되게 잡았어요.</p>
<p><span class="v2-ans">5년까지 비율이 같은 건 근속연수공제가 1년에 1,000,000원씩 늘고 퇴직금도 근속에 비례해 늘기 때문이에요.</span> 그래서 1년치로 환산한 금액이 거의 같아요. 6년이 되면 근속연수공제가 7,000,000원으로 한 해에 더 크게 늘어 비율이 내려가요. 5년 1개월처럼 끝자리가 붙으면 근속연수는 6년인데 퇴직금은 적어서 비율이 더 낮게 나오기도 해요.</p>

<h2 id="s2">퇴직소득세는 어떤 순서로 계산하나요<small>1년치로 환산해 계산한 뒤 근속연수만큼 곱해요</small></h2>
<div class="v2-flow" aria-label="퇴직소득세 계산 순서 (월급 300만원·근속 5년)">
  <div class="v2-s"><span>퇴직금</span><b>14,673,913원</b><span>세전 금액</span></div><div class="v2-op">−</div>
  <div class="v2-s"><span>근속연수공제</span><b>5,000,000원</b><span>근속연수에 따라 정한 금액</span></div><div class="v2-op">→</div>
  <div class="v2-s"><span>환산급여</span><b>23,217,391원</b><span>근속연수로 나누고 12를 곱해요</span></div><div class="v2-op">−</div>
  <div class="v2-s"><span>환산급여공제</span><b>17,130,435원</b><span>환산급여 크기에 따라 정한 금액</span></div><div class="v2-op">=</div>
  <div class="v2-s"><span>과세표준</span><b>6,086,956원</b><span>세율을 곱하는 금액</span></div><div class="v2-op">→</div>
  <div class="v2-s v2-out"><span>퇴직소득세</span><b>152,174원</b><span>12로 나눈 뒤 근속연수를 곱해요</span></div>
</div>
<p class="v2-lead"><span class="v2-ans">공제를 두 번 한 뒤 1년치 세금을 구하고, 근속연수만큼 곱해 퇴직소득세를 정해요.</span> 근속연수공제는 오래 일한 만큼 먼저 빼 주는 금액이고, 환산급여공제는 1년치로 바꾼 금액에서 한 번 더 빼 주는 금액이에요.</p>
<p><span class="v2-ans">근속연수는 일을 시작한 날부터 퇴직한 날까지로 세요.</span> 중간정산, 즉 퇴직 전에 퇴직금을 미리 받은 적이 있다면 그다음 날부터 다시 세요.</p>

<h2 id="s3">퇴직금 세전 세후 차이는 얼마나 나나요<small>차이는 떼는 세금만큼이에요</small></h2>
<p class="v2-lead"><span class="v2-ans">월급 300만원·5년이면 세전과 세후 차이는 167,391원이에요.</span> 통장으로 받는다면 세후 실수령액은 14,506,522원이에요.</p>
<div class="v2-tbl"><table><caption>월급별 퇴직금 세전 세후 차이 (근속 5년, 통장으로 받을 때)</caption><thead><tr><th>퇴사 전 월급</th><th>세전 퇴직금</th><th>세금 합계</th><th>세후 실수령액</th><th>세금 비율</th></tr></thead><tbody>
<tr><th scope="row">250만원</th><td>12,228,261원</td><td>102,826원</td><td class="v2-net">12,125,435원</td><td>0.84%</td></tr>
<tr class="v2-hi"><th scope="row">300만원</th><td>14,673,913원</td><td>167,391원</td><td class="v2-net">14,506,522원</td><td>1.14%</td></tr>
<tr><th scope="row">400만원</th><td>19,565,218원</td><td>296,522원</td><td class="v2-net">19,268,696원</td><td>1.52%</td></tr>
<tr><th scope="row">500만원</th><td>24,456,522원</td><td>486,630원</td><td class="v2-net">23,969,892원</td><td>1.99%</td></tr>
</tbody></table></div>
<p class="v2-fn">상여금과 연차수당이 없는 경우예요. 같은 근속이면 월급이 오를수록 환산급여가 커져 세금 비율도 올라가요.</p>

<h2 id="s4">근속연수가 길면 퇴직금 세금이 줄어드나요<small>같은 퇴직금이면 공제가 커져요</small></h2>
<p class="v2-lead"><span class="v2-ans">줄어들어요. 같은 3,000만원이라도 근속 3년이면 세금이 1,414,875원, 15년이면 0원이에요.</span> 근속연수공제가 커지고, 1년치로 환산한 금액인 환산급여는 작아지기 때문이에요.</p>
<div class="v2-tbl"><table><caption>같은 퇴직금 3,000만원을 받을 때 근속별 세금</caption><thead><tr><th>근속</th><th>근속연수공제</th><th>환산급여</th><th>세금 합계</th></tr></thead><tbody>
<tr><th scope="row">3년</th><td>3,000,000원</td><td>108,000,000원</td><td class="v2-net">1,414,875원</td></tr>
<tr class="v2-hi"><th scope="row">5년</th><td>5,000,000원</td><td>60,000,000원</td><td class="v2-net">852,500원</td></tr>
<tr><th scope="row">10년</th><td>15,000,000원</td><td>18,000,000원</td><td class="v2-net">220,000원</td></tr>
<tr><th scope="row">15년</th><td>27,500,000원</td><td>2,000,000원</td><td class="v2-net">0원</td></tr>
</tbody></table></div>
<p class="v2-fn">퇴직금 금액을 고정하고 근속연수만 바꿔 계산한 값이에요.</p>

<h2 id="faq">자주 묻는 질문</h2>
<div class="v2-faqs">
<details class="v2-faq" open><summary><i>Q</i><span>퇴직금 세금은 연말정산 때 근로소득과 합쳐지나요?</span></summary><div><i>A</i><p>합쳐지지 않아요. 근로소득은 종합소득에 들어가고 퇴직소득은 따로 구분돼서 세금도 따로 계산해요.</p></div></details>
<details class="v2-faq"><summary><i>Q</i><span>퇴직금에서 세금은 언제 떼나요?</span></summary><div><i>A</i><p>회사가 퇴직금을 지급할 때 원천징수, 즉 미리 떼고 줘요. 다만 개인형퇴직연금(IRP) 계좌로 옮겨 받으면 그때는 떼지 않아요.</p></div></details>
<details class="v2-faq"><summary><i>Q</i><span>퇴직금을 IRP 계좌로 받으면 세금은 언제 내나요?</span></summary><div><i>A</i><p>IRP에서 꺼낼 때 내요. 연금으로 받으면 연금소득으로, 연금이 아닌 방식으로 꺼내면 퇴직소득세로 내요. 통장으로 받았더라도 받은 날부터 60일 안에 연금계좌에 넣으면 이미 뗀 세금의 환급을 신청할 수 있어요.</p></div></details>
<details class="v2-faq"><summary><i>Q</i><span>퇴직금 원천징수 영수증은 언제 받나요?</span></summary><div><i>A</i><p>퇴직금을 준 달의 다음 달 말일까지 회사가 발급해야 해요. 세금을 떼지 않았다면 그 사유도 같이 적어 줘요.</p></div></details>
<details class="v2-faq"><summary><i>Q</i><span>근속연수공제가 퇴직금보다 크면 세금은 어떻게 하나요?</span></summary><div><i>A</i><p>공제는 퇴직금만큼만 해요. 공제하고 남는 금액이 없어서 퇴직소득세가 나오지 않아요.</p></div></details>
</div>
<section class="v2-sum" aria-label="정리"><div class="v2-hd"><small>이 글 한 줄 정리</small><b>정리</b></div><ul>
<li>월급이 같으면 근속 5년까지는 세금 비율이 같고, 넘기면 내려가요.</li>
<li>통장으로 받을 때와 IRP로 옮길 때 세금을 떼는 시점이 달라요.</li>
<li>같은 퇴직금이면 오래 일한 쪽이 세금을 덜 내요.</li>
</ul></section>
<a class="v2-cta" href="/retirement-tax/">퇴직소득세 계산기 바로가기</a>
<h2 id="src">출처</h2>
<div class="v2-src">
<b>법령</b>소득세법 제4조(소득의 구분), 제20조의3(연금소득), 제48조(퇴직소득공제: 근속연수공제, 환산급여, 환산급여공제, 1년 미만 기간은 1년, 공제가 퇴직소득보다 크면 퇴직소득만큼), 제146조(퇴직소득 원천징수, 연금계좌 이체 시 원천징수 유예와 환급, 원천징수영수증 발급). 같은 법 시행령 제105조(근속연수).
<b>정부 도구</b>금액은 퇴직소득세 계산기 값이에요. 국세청 퇴직소득세 계산 방법(홈택스 산식)을 따르는 민간 계산 사이트와 5건 모두 0원 일치한 계산기예요 (2026-05-09 대조). 홈택스 계산 프로그램과 직접 대조한 값은 아니에요.
</div>
<div class="v2-rel"><a href="/severance/"><b>주제 홈</b>퇴직금 무엇이 궁금하세요</a><a href="/retirement-tax/"><b>세금 계산기</b>퇴직소득세 계산기</a><a href="/severance/one-year/"><b>다음 질문</b>퇴직금 1년 미만 받나요</a></div>
<div id="md-inter" role="dialog" aria-modal="true" aria-label="외부 사이트로 이동">
  <div class="v2-box"><div class="v2-t">공식 페이지로 이동해요</div><div class="v2-d" id="md-inter-d">새 창에서 열려요</div>
    <div class="v2-slot" id="md-ad-slot" data-ad="interstitial"></div>
    <button class="v2-btn" id="md-inter-go">바로 이동</button></div>
</div>`;

export const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "퇴직금 세금은 연말정산 때 근로소득과 합쳐지나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "합쳐지지 않아요. 근로소득은 종합소득에 들어가고 퇴직소득은 따로 구분돼서 세금도 따로 계산해요."
      }
    },
    {
      "@type": "Question",
      "name": "퇴직금에서 세금은 언제 떼나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "회사가 퇴직금을 지급할 때 원천징수, 즉 미리 떼고 줘요. 다만 개인형퇴직연금(IRP) 계좌로 옮겨 받으면 그때는 떼지 않아요."
      }
    },
    {
      "@type": "Question",
      "name": "퇴직금을 IRP 계좌로 받으면 세금은 언제 내나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "IRP에서 꺼낼 때 내요. 연금으로 받으면 연금소득으로, 연금이 아닌 방식으로 꺼내면 퇴직소득세로 내요. 통장으로 받았더라도 받은 날부터 60일 안에 연금계좌에 넣으면 이미 뗀 세금의 환급을 신청할 수 있어요."
      }
    },
    {
      "@type": "Question",
      "name": "퇴직금 원천징수 영수증은 언제 받나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "퇴직금을 준 달의 다음 달 말일까지 회사가 발급해야 해요. 세금을 떼지 않았다면 그 사유도 같이 적어 줘요."
      }
    },
    {
      "@type": "Question",
      "name": "근속연수공제가 퇴직금보다 크면 세금은 어떻게 하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "공제는 퇴직금만큼만 해요. 공제하고 남는 금액이 없어서 퇴직소득세가 나오지 않아요."
      }
    }
  ]
};

export const landing = {
  "hero": {
    "tag": "법률",
    "line1": "퇴직금 세금 몇프로",
    "line2": "5년이면 1.14%",
    "sub1": "공제 두 번 뒤에 세금이 붙어요",
    "sub2": "월급별 세전 세후 차이",
    "foot": "퇴직소득세 계산기 산식 기준 · 2026-09-13 검증",
    "card": {
      "label": "세금 비율",
      "big": "1.14",
      "unit": "%",
      "l1": "월급 300만원",
      "l2": "근속 5년"
    },
    "alt": "퇴직금 세금 몇프로. 월급 300만원으로 5년 일하면 퇴직금의 1.14%가 세금이에요"
  },
  "calc": {
    "href": "/retirement-tax/",
    "label": "퇴직소득세 계산기 바로가기"
  },
  "badge": "퇴직소득세 계산기 산식 기준 · 2026-09-13",
  "basis": "2026년 9월 기준",
  "readMinutes": 5,
  "quick": [
    {
      "chip": "5년",
      "big": "1.14%",
      "unit": "세금",
      "sub": "월급 300만원, 상여금이 없는 경우",
      "selected": true
    },
    {
      "chip": "10년",
      "big": "0.69%",
      "unit": "세금",
      "sub": "세금 합계 202,783원",
      "selected": false
    },
    {
      "chip": "20년",
      "big": "0.24%",
      "unit": "세금",
      "sub": "세금 합계 141,566원",
      "selected": false
    }
  ],
  "boxes": [
    {
      "title": "지방소득세가 따로 붙어요",
      "text": "퇴직소득세 152,174원에 지방소득세 15,217원이 더해져요"
    },
    {
      "title": "5년 1개월이면 6년으로 세요",
      "text": "끝자리 1개월도 1년으로 올려 근속연수 6년으로 세서, 월급 300만원이면 비율이 0.70%로 떨어져요"
    }
  ],
  "keyPoints": {
    "title": "한눈에 보는 퇴직금 세금",
    "rows": [
      [
        "월급 300만원·5년 세금",
        "167,391원"
      ],
      [
        "통장으로 받을 때 세후",
        "14,506,522원"
      ],
      [
        "비율이 같은 구간",
        "월급이 같으면 근속 1년부터 5년까지"
      ],
      [
        "근속연수공제 (5년까지)",
        "1년에 1,000,000원"
      ],
      [
        "근속연수공제 (6년)",
        "7,000,000원"
      ],
      [
        "끝자리 기간",
        "1년이 안 돼도 1년으로 올려 세요"
      ],
      [
        "지방소득세 (월급 300만원·5년)",
        "15,217원"
      ]
    ]
  },
  "sections": [
    {
      "id": "s1",
      "h2": "퇴직금 세금 몇프로인가요",
      "sub": "5년까지는 같고 넘기면 내려가요"
    },
    {
      "id": "s2",
      "h2": "퇴직소득세는 어떤 순서로 계산하나요",
      "sub": "1년치로 환산해 계산한 뒤 근속연수만큼 곱해요"
    },
    {
      "id": "s3",
      "h2": "퇴직금 세전 세후 차이는 얼마나 나나요",
      "sub": "차이는 떼는 세금만큼이에요"
    },
    {
      "id": "s4",
      "h2": "근속연수가 길면 퇴직금 세금이 줄어드나요",
      "sub": "같은 퇴직금이면 공제가 커져요"
    }
  ],
  "faq": [
    {
      "q": "퇴직금 세금은 연말정산 때 근로소득과 합쳐지나요?",
      "a": "합쳐지지 않아요. 근로소득은 종합소득에 들어가고 퇴직소득은 따로 구분돼서 세금도 따로 계산해요."
    },
    {
      "q": "퇴직금에서 세금은 언제 떼나요?",
      "a": "회사가 퇴직금을 지급할 때 원천징수, 즉 미리 떼고 줘요. 다만 개인형퇴직연금(IRP) 계좌로 옮겨 받으면 그때는 떼지 않아요."
    },
    {
      "q": "퇴직금을 IRP 계좌로 받으면 세금은 언제 내나요?",
      "a": "IRP에서 꺼낼 때 내요. 연금으로 받으면 연금소득으로, 연금이 아닌 방식으로 꺼내면 퇴직소득세로 내요. 통장으로 받았더라도 받은 날부터 60일 안에 연금계좌에 넣으면 이미 뗀 세금의 환급을 신청할 수 있어요."
    },
    {
      "q": "퇴직금 원천징수 영수증은 언제 받나요?",
      "a": "퇴직금을 준 달의 다음 달 말일까지 회사가 발급해야 해요. 세금을 떼지 않았다면 그 사유도 같이 적어 줘요."
    },
    {
      "q": "근속연수공제가 퇴직금보다 크면 세금은 어떻게 하나요?",
      "a": "공제는 퇴직금만큼만 해요. 공제하고 남는 금액이 없어서 퇴직소득세가 나오지 않아요."
    }
  ],
  "related": [
    {
      "kind": "주제 홈",
      "label": "퇴직금 무엇이 궁금하세요",
      "href": "/severance/"
    },
    {
      "kind": "세금 계산기",
      "label": "퇴직소득세 계산기",
      "href": "/retirement-tax/"
    },
    {
      "kind": "다음 질문",
      "label": "퇴직금 1년 미만 받나요",
      "href": "/severance/one-year/"
    }
  ]
};
