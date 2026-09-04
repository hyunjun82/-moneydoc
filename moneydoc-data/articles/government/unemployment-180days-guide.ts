// 자동 생성: scripts/article-template/convert-v2.mjs — 직접 수정하지 말 것
// 원본: public/_preview/article-v2-unemployment-180days-guide.html
export const meta = {
  title: "실업급여 180일, 주 며칠 일해야 채워지는지 계산법",
  description: "실업급여 180일은 다닌 날이 아니라 보수가 나간 날을 세요. 유급 주휴일이 들어가서 주 5일 근무자는 30주, 달력으로 6.9개월이면 채워져요. 근무 형태별로 얼마나 걸리는지 정리했어요.",
  datePublished: "2026-09-02",
  dateModified: "2026-09-02",
  url: "https://moneydoc.kr/government/unemployment-180days-guide/",
  image: "https://moneydoc.kr/og/unemployment-180days-guide.png",
  imageAlt: "실업급여 180일 계산법. 주 5일 근무자는 6.9개월",
};

export const scriptKey = "unemployment-180days-guide";

export const html = `<h1>실업급여 180일, 주 며칠 일해야 채워지는지 계산법</h1>
<div class="v2-meta"><span>MoneyDoc 편집팀</span><span>·</span><span>2026년 9월 기준</span><span>·</span><span>6분</span><span class="v2-badge">고용보험법 피보험 단위기간 원문 대조 · 2026-09-02</span></div>
<img class="v2-hero" src="/og/unemployment-180days-guide.png" width="1200" height="630" alt="실업급여 180일 계산법. 주 5일 근무자는 6.9개월">
<p class="v2-lead v2-intro">실업급여를 받으려면 고용보험에 180일 이상 들어 있어야 해요. 그런데 이 180일은 회사를 다닌 날을 세는 게 아니에요. 보수가 나가는 기초가 된 날만 세기 때문에, 같은 6개월을 다녀도 근무 형태에 따라 채워지기도 하고 모자라기도 해요. 무엇을 세는지, 근무 형태별로 얼마나 걸리는지, 내 일수는 어디서 보는지 정리했어요.</p>
<section class="v2-answer" aria-label="즉답">
  <div class="v2-lbl">내 근무 형태를 눌러 확인해 보세요</div>
  <div class="v2-chips" id="qchips" data-q='[{&quot;big&quot;:&quot;6.9개월&quot;,&quot;unit&quot;:&quot;걸리는 기간&quot;,&quot;sub&quot;:&quot;30주 동안 주 6일씩 쌓여요&quot;},{&quot;big&quot;:&quot;10.4개월&quot;,&quot;unit&quot;:&quot;걸리는 기간&quot;,&quot;sub&quot;:&quot;45주 동안 주 4일씩 쌓여요&quot;},{&quot;big&quot;:&quot;20.7개월&quot;,&quot;unit&quot;:&quot;걸리는 기간&quot;,&quot;sub&quot;:&quot;주휴가 붙지 않아 기준기간 특례를 봐야 해요&quot;}]'><button type="button" data-i="0" aria-pressed="true">주 5일 근무</button><button type="button" data-i="1" aria-pressed="false">주 3일 근무</button><button type="button" data-i="2" aria-pressed="false">주 2일 · 15시간 미만</button></div>
  <div class="v2-big" id="qnet">6.9개월<small>걸리는 기간</small></div>
  <div class="v2-sub" id="qsub">30주 동안 주 6일씩 쌓여요</div>
  <div class="v2-split">
    <div class="v2-box"><b>세는 건 보수가 나간 날이에요</b><span>법은 보수 지급의 기초가 된 날을 합해서 계산한다고 정해요</span></div>
    <div class="v2-box"><b>유급 주휴일도 들어가요</b><span>일하지 않아도 보수가 나가는 날이라 주 5일 근무자는 주 6일이 쌓여요</span></div>
  </div>
</section>

<details class="v2-toc"><summary>목차 (7개 질문)<span>열기</span></summary><ol><li><a href="#s1">실업급여 180일은 무엇을 세나요</a></li><li><a href="#s2">180일 계산법은 어떻게 되나요</a></li><li><a href="#s3">주 5일 일하면 180일을 언제 채우나요</a></li><li><a href="#s4">주 3일이나 주 2일이면 얼마나 걸리나요</a></li><li><a href="#s5">무급휴직과 결근도 180일에 들어가나요</a></li><li><a href="#s6">내 180일은 어디서 조회하나요</a></li><li><a href="#faq">자주 묻는 질문</a></li></ol></details>
<section class="v2-kk" aria-label="한눈에 보는 요약">
  <div class="v2-hd"><small>한눈에 보는 180일</small><b>핵심콕콕</b></div>
  <dl>
    <div class="v2-row"><dt>세는 대상</dt><dd>보수 지급의 기초가 된 날</dd></div>
    <div class="v2-row"><dt>들어가는 날</dt><dd>실제 근무일수와 유급으로 처리되는 휴일</dd></div>
    <div class="v2-row"><dt>빠지는 날</dt><dd>무급휴일, 무급휴직, 결근한 날</dd></div>
    <div class="v2-row"><dt>세는 구간</dt><dd>원칙은 이직일 이전 18개월</dd></div>
    <div class="v2-row"><dt>주 5일 근무</dt><dd>30주 · 달력 6.9개월</dd></div>
    <div class="v2-row"><dt>확인하는 곳</dt><dd>고용보험 홈페이지의 피보험자격 이력</dd></div>
  </dl>
</section>

<h2 id="s1">실업급여 180일은 무엇을 세나요<small>보수 지급의 기초가 된 날만 세요</small></h2>
<p class="v2-lead"><span class="v2-ans">회사에 적을 둔 날이 아니라, 보수가 나가는 기초가 된 날을 세요.</span> 법은 피보험기간 중 보수 지급의 기초가 된 날을 합해서 계산한다고 정해요. 그래서 근로계약이 살아 있어도 보수가 나가지 않은 날은 빠져요. 반대로 실제로 일하지 않았어도 보수가 나가는 날은 들어가요.</p>
<div class="v2-tbl v2-text"><table><caption>180일에 들어가는 날과 빠지는 날</caption><thead><tr><th>구분</th><th>어떤 날인가요</th></tr></thead><tbody>
<tr><th scope="row">들어가요</th><td data-l="어떤 날인가요">실제로 일하고 임금을 받은 날</td></tr>
<tr><th scope="row">들어가요</th><td data-l="어떤 날인가요">유급으로 처리되는 주휴일. 주휴일 피보험단위기간에 들어가요</td></tr>
<tr><th scope="row">들어가요</th><td data-l="어떤 날인가요">연차휴가를 써서 유급으로 처리된 날</td></tr>
<tr><th scope="row">빠져요</th><td data-l="어떤 날인가요">보수가 나가지 않는 무급휴일</td></tr>
<tr><th scope="row">빠져요</th><td data-l="어떤 날인가요">무급휴직 기간. 무급휴직 피보험단위기간에서는 빠져요</td></tr>
<tr><th scope="row">빠져요</th><td data-l="어떤 날인가요">결근해서 임금이 공제된 날</td></tr>
</tbody></table></div>
<p class="v2-fn">피보험 단위기간을 보수 지급의 기초가 된 날로 계산한다는 것은 고용보험법 제41조제1항이에요.</p>
<div class="v2-note"><b>전에 실업급여를 받았다면 그 앞은 빠져요</b> 마지막으로 피보험자격을 취득한 날 이전에 구직급여를 받은 사실이 있으면, 그 구직급여와 관련된 자격 상실일 이전의 단위기간은 세지 않아요. 그때부터 다시 쌓아야 해요.</div>

<h2 id="s2">180일 계산법은 어떻게 되나요<small>주당 쌓이는 날을 세고 180으로 나눠요</small></h2>
<p class="v2-lead"><span class="v2-ans">한 주에 며칠이 쌓이는지 세고, 180을 그 숫자로 나누면 필요한 주가 나와요.</span> 주 5일 근무자는 근무 5일에 유급 주휴 1일이 더해져 한 주에 6일이 쌓여요. 180을 6으로 나누면 30주고, 달력으로는 210일이에요. 주휴일은 한 주 동안 정해진 근무일을 다 채워야 붙기 때문에, 결근이 잦으면 그만큼 늦어져요.</p>
<p><span class="v2-ans">주 15시간 미만이면 주휴가 붙지 않아요.</span> 이때는 실제 근무일만 쌓여서 속도가 확 느려져요. 대신 이런 근로자를 위해 세는 구간을 24개월로 늘려 주는 특례가 따로 있어요.</p>
<div class="v2-note"><b>한 회사에서 다 채우지 않아도 돼요</b> 기준기간 안에 여러 회사에서 일했다면 그 기간을 합산해요. 각각은 짧아도 합쳐서 180일이면 조건을 채운 거예요. 180일은 수급자격 네 가지 조건 중 하나예요. <a class="v2-go" href="/unemployment/eligibility/">수급자격 4가지 조건</a></div>

<h2 id="s3">주 5일 일하면 180일을 언제 채우나요<small>30주, 달력으로 6.9개월</small></h2>
<p class="v2-lead"><span class="v2-ans">주 5일 근무자는 30주 만에 채워요. 달력으로 6.9개월이에요.</span> 한 주에 6일씩 쌓이기 때문이에요. 흔히 6개월만 다니면 된다고 알고 있는데, 그건 180일을 달력 날짜로 착각한 거예요. 반대로 8개월은 넘게 다녀야 한다고 걱정하는 경우도 있는데 그것도 아니에요.</p>
<div class="v2-tbl"><table><caption>근무 형태별로 180일을 채우는 데 걸리는 기간</caption><thead><tr><th>근무 형태</th><th>한 주에 쌓이는 날</th><th>필요한 주</th><th>달력 기간</th></tr></thead><tbody>
<tr class="v2-hi"><th scope="row">주 5일 · 주 40시간</th><td>6일</td><td class="v2-net">30주</td><td>210일 · 약 6.9개월</td></tr>
<tr><th scope="row">주 4일 · 주 32시간</th><td>5일</td><td class="v2-net">36주</td><td>252일 · 약 8.3개월</td></tr>
<tr><th scope="row">주 3일 · 주 24시간</th><td>4일</td><td class="v2-net">45주</td><td>315일 · 약 10.4개월</td></tr>
<tr><th scope="row">주 2일 · 주 16시간</th><td>3일</td><td class="v2-net">60주</td><td>420일 · 약 13.8개월</td></tr>
<tr><th scope="row">주 2일 · 주 14시간</th><td>2일</td><td class="v2-net">90주</td><td>630일 · 약 20.7개월</td></tr>
</tbody></table></div>
<p class="v2-fn">유급 주휴일이 붙는지에 따라 한 주에 쌓이는 날이 달라져요. 주 15시간 미만은 주휴가 붙지 않아 근무일만 쌓여요.</p>
<div class="v2-note"><b>달력 기간은 결근이 없다고 볼 때예요</b> 중간에 무급으로 쉰 날이 있으면 그만큼 뒤로 밀려요. 기준기간 18개월 안에만 들어오면 되니 조금 늦어져도 괜찮아요.</div>

<h2 id="s4">주 3일이나 주 2일이면 얼마나 걸리나요<small>단시간 근로자는 15시간에서 갈려요</small></h2>
<p class="v2-lead"><span class="v2-ans">주 3일이면 10.4개월, 주 2일이고 15시간 미만이면 20.7개월이 걸려요.</span> 주 3일 근무자는 유급 주휴가 붙어 한 주에 4일이 쌓여요. 그런데 주 15시간 미만이 되면 주휴가 사라져 근무일만 쌓이기 때문에, 같은 주 2일이어도 기간이 크게 벌어져요.</p>
<p><span class="v2-ans">단시간 근로자가 15시간 미만이면 세는 구간이 24개월로 늘어나요.</span> 이직 당시 주 소정근로시간이 15시간 미만이고 주 소정근로일수가 2일 이하였고, 이직일 이전 24개월 동안 그런 근로를 90일 이상 했다면 기준기간이 24개월이 돼요. 18개월로 잘리면 채울 수 없는 사람을 위한 장치예요.</p>
<div class="v2-tbl v2-text"><table><caption>짧게 일하는 경우 확인할 것</caption><thead><tr><th>확인 항목</th><th>왜 중요한가요</th></tr></thead><tbody>
<tr><th scope="row">주 소정근로시간</th><td data-l="왜 중요한가요">15시간을 넘으면 유급 주휴가 붙어 한 주에 하루가 더 쌓여요</td></tr>
<tr><th scope="row">주 소정근로일수</th><td data-l="왜 중요한가요">2일 이하이면서 15시간 미만이면 기준기간 특례를 볼 수 있어요</td></tr>
<tr><th scope="row">24개월 중 90일</th><td data-l="왜 중요한가요">특례를 적용받으려면 그런 근로를 90일 이상 해야 해요</td></tr>
<tr><th scope="row">다른 회사 기간</th><td data-l="왜 중요한가요">기준기간 안이면 합산돼요. 짧은 일자리를 여러 곳 다녔어도 합쳐서 봐요</td></tr>
</tbody></table></div>
<p class="v2-fn">기준기간을 24개월로 보는 요건은 고용보험법 제40조제2항제2호예요. 두 요건을 모두 갖춰야 해요.</p>

<h2 id="s5">무급휴직과 결근도 180일에 들어가나요<small>보수가 나갔는지로 갈려요</small></h2>
<p class="v2-lead"><span class="v2-ans">보수가 나가지 않았다면 들어가지 않아요.</span> 무급휴직 기간과 결근해서 임금이 공제된 날은 보수 지급의 기초가 된 날이 아니라서 빠져요. 반면 유급으로 처리된 휴가나 휴일은 실제로 일하지 않았어도 들어가요. 판단 기준은 일했느냐가 아니라 보수가 나갔느냐예요.</p>
<p><span class="v2-ans">오래 쉰 경우에는 세는 구간이 늘어나요.</span> 질병이나 부상, 그 밖에 정해진 사유로 30일 이상 계속 보수를 받지 못했다면, 18개월에 그 일수를 더한 기간을 기준기간으로 봐요. 다만 3년을 넘길 수는 없어요.</p>
<div class="v2-note"><b>육아휴직도 확인해 보세요</b> 휴직 기간이 유급인지 무급인지에 따라 단위기간에 들어가는지가 달라져요. 회사에 어떻게 신고됐는지 확인하는 게 정확해요.</div>

<h2 id="s6">내 180일은 어디서 조회하나요<small>고용보험 홈페이지의 피보험자격 이력</small></h2>
<p class="v2-lead"><span class="v2-ans">고용보험 홈페이지에서 본인 인증을 하면 피보험자격 이력을 볼 수 있어요.</span> 회사별 취득일과 상실일이 나오기 때문에 기준기간 안에 어디를 얼마나 다녔는지 확인할 수 있어요. 다만 단위기간이 며칠인지는 회사가 낸 이직확인서에 적히기 때문에, 정확한 일수는 그 서류를 봐야 해요.</p>
<p><span class="v2-ans">이직확인서에 적힌 일수가 틀릴 수도 있어요.</span> 단위기간과 이직 전 소정근로시간이 잘못 적히면 수급자격뿐 아니라 금액과 일수까지 달라져요. 신청 전에 숫자를 꼭 확인하고, 다르면 회사에 정정을 요청하세요.</p>
<div class="v2-tbl v2-text"><table><caption>어디서 무엇을 확인하나요</caption><thead><tr><th>확인할 것</th><th>어디서 보나요</th></tr></thead><tbody>
<tr><th scope="row">다닌 회사와 기간</th><td data-l="어디서 보나요">고용보험 홈페이지 피보험자격 이력<a class="v2-go" href="https://www.ei.go.kr" target="_blank" rel="noopener">고용보험 홈페이지</a></td></tr>
<tr><th scope="row">피보험 단위기간 일수</th><td data-l="어디서 보나요">회사가 제출한 이직확인서</td></tr>
<tr><th scope="row">이직 전 소정근로시간</th><td data-l="어디서 보나요">이직확인서. 금액과 일수에 함께 영향을 줘요</td></tr>
<tr><th scope="row">최종 판단</th><td data-l="어디서 보나요">고용센터의 수급자격 인정</td></tr>
</tbody></table></div>
<p class="v2-fn">단위기간이 애매하면 혼자 판단하지 말고 신청해서 인정 여부를 받아 보는 편이 나아요.</p>

<h2 id="faq">자주 묻는 질문</h2>
<div class="v2-faqs">
<details class="v2-faq" open><summary><i>Q</i><span>실업급여 180일은 6개월인가요?</span></summary><div><i>A</i><p>아니에요. 달력 날짜가 아니라 보수가 나간 날을 세요. 주 5일 근무자는 30주, 달력으로 6.9개월이 걸려요.</p></div></details>
<details class="v2-faq"><summary><i>Q</i><span>실업급여 몇개월 일해야 하나요?</span></summary><div><i>A</i><p>근무일수에 따라 달라요. 주 5일이면 약 6.9개월, 주 3일이면 약 10.4개월을 일해야 180일이 채워져요.</p></div></details>
<details class="v2-faq"><summary><i>Q</i><span>주휴일도 180일에 들어가나요?</span></summary><div><i>A</i><p>유급으로 처리되는 주휴일은 피보험단위기간에 들어가요. 일하지 않았어도 보수가 나가는 날이기 때문이에요.</p></div></details>
<details class="v2-faq"><summary><i>Q</i><span>주 3일 근무면 얼마나 걸리나요?</span></summary><div><i>A</i><p>한 주에 4일씩 쌓여서 45주, 달력으로 약 10.4개월이 걸려요.</p></div></details>
<details class="v2-faq"><summary><i>Q</i><span>여러 회사를 합쳐서 180일을 채워도 되나요?</span></summary><div><i>A</i><p>기준기간 안에 있으면 합산해요. 각각은 짧아도 합쳐서 180일이면 조건을 채운 거예요.</p></div></details>
<details class="v2-faq"><summary><i>Q</i><span>무급휴직 기간도 세나요?</span></summary><div><i>A</i><p>무급휴직은 보수가 나가지 않아 피보험단위기간에서 빠져요. 다만 30일 이상 보수를 받지 못했다면 기준기간이 그만큼 늘어나요.</p></div></details>
<details class="v2-faq"><summary><i>Q</i><span>단시간 근로자도 180일을 채울 수 있나요?</span></summary><div><i>A</i><p>채울 수 있어요. 주 15시간 미만이면 주휴가 붙지 않아 오래 걸리는 대신, 기준기간을 24개월로 보는 특례가 있어요.</p></div></details>
<details class="v2-faq"><summary><i>Q</i><span>내 피보험 단위기간은 어디서 보나요?</span></summary><div><i>A</i><p>고용보험 홈페이지에서 회사별 이력을 볼 수 있어요. 정확한 일수는 회사가 낸 이직확인서에 적혀요.</p></div></details>
</div>
<section class="v2-sum" aria-label="정리"><div class="v2-hd"><small>이 글 한 줄 정리</small><b>정리</b></div><ul>
<li>180일은 다닌 날이 아니라 보수가 나간 날을 세요.</li>
<li>유급 주휴일이 들어가서 주 5일 근무자는 30주, 달력으로 6.9개월이면 채워져요.</li>
<li>주 15시간 미만이면 주휴가 붙지 않는 대신 기준기간이 24개월로 늘어나요.</li>
<li>여러 회사에서 일한 기간은 기준기간 안이면 합산해요.</li>
</ul></section>

<h2 id="src">출처</h2>
<div class="v2-src">
<b>법령</b>고용보험법 제40조(구직급여의 수급 요건과 기준기간), 제41조(피보험 단위기간).
<b>정부 도구</b>고용24 이직확인서 작성 안내의 피보험단위기간 설명과 대조했어요. 주 40시간 5일 근무는 주 6일로 계산한다고 나와 있어요 (2026-09-02 확인).
</div>
<div class="v2-rel"><a href="/unemployment/"><b>주제 홈</b>2026년 실업급여 얼마나 받나요</a><a href="/unemployment/eligibility/"><b>다음 질문</b>실업급여 수급자격 4가지 조건, 180일과 이직 사유 정리</a><a href="/unemployment/apply/"><b>다음 질문</b>실업급여 신청 방법 5단계, 고용24 구직신청부터 실업인정까지</a></div>
<div id="md-inter" role="dialog" aria-modal="true" aria-label="외부 사이트로 이동">
  <div class="v2-box"><div class="v2-t">공식 페이지로 이동해요</div><div class="v2-d" id="md-inter-d">새 창에서 열려요</div>
    <div class="v2-slot" id="md-ad-slot" data-ad="interstitial">광고 영역 (오퍼월·전면광고 SDK 슬롯)</div>
    <button class="v2-btn" id="md-inter-go">바로 이동</button></div>
</div>`;

export const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "실업급여 180일은 6개월인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "아니에요. 달력 날짜가 아니라 보수가 나간 날을 세요. 주 5일 근무자는 30주, 달력으로 6.9개월이 걸려요."
      }
    },
    {
      "@type": "Question",
      "name": "실업급여 몇개월 일해야 하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "근무일수에 따라 달라요. 주 5일이면 약 6.9개월, 주 3일이면 약 10.4개월을 일해야 180일이 채워져요."
      }
    },
    {
      "@type": "Question",
      "name": "주휴일도 180일에 들어가나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "유급으로 처리되는 주휴일은 피보험단위기간에 들어가요. 일하지 않았어도 보수가 나가는 날이기 때문이에요."
      }
    },
    {
      "@type": "Question",
      "name": "주 3일 근무면 얼마나 걸리나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "한 주에 4일씩 쌓여서 45주, 달력으로 약 10.4개월이 걸려요."
      }
    },
    {
      "@type": "Question",
      "name": "여러 회사를 합쳐서 180일을 채워도 되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "기준기간 안에 있으면 합산해요. 각각은 짧아도 합쳐서 180일이면 조건을 채운 거예요."
      }
    },
    {
      "@type": "Question",
      "name": "무급휴직 기간도 세나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "무급휴직은 보수가 나가지 않아 피보험단위기간에서 빠져요. 다만 30일 이상 보수를 받지 못했다면 기준기간이 그만큼 늘어나요."
      }
    },
    {
      "@type": "Question",
      "name": "단시간 근로자도 180일을 채울 수 있나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "채울 수 있어요. 주 15시간 미만이면 주휴가 붙지 않아 오래 걸리는 대신, 기준기간을 24개월로 보는 특례가 있어요."
      }
    },
    {
      "@type": "Question",
      "name": "내 피보험 단위기간은 어디서 보나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "고용보험 홈페이지에서 회사별 이력을 볼 수 있어요. 정확한 일수는 회사가 낸 이직확인서에 적혀요."
      }
    }
  ]
};

export const landing = {
  "hero": {
    "tag": "정부지원금",
    "line1": "실업급여 180일",
    "line2": "주 며칠 일해야 채워지나요",
    "sub1": "주 5일 근무자는 30주, 달력으로 6.9개월이면 채워져요",
    "sub2": "다닌 날이 아니라 보수가 나간 날을 세는 게 핵심이에요",
    "foot": "고용보험법 피보험 단위기간 원문 대조 · 2026-09-02 검증",
    "card": {
      "label": "주 5일 근무자",
      "big": "6.9",
      "unit": "개월",
      "l1": "30주 · 달력 210일",
      "l2": "유급 주휴일을 더해 주 6일씩 쌓여요"
    },
    "alt": "실업급여 180일 계산법. 주 5일 근무자는 6.9개월"
  },
  "badge": "고용보험법 피보험 단위기간 원문 대조 · 2026-09-02",
  "basis": "2026년 9월 기준",
  "readMinutes": 6,
  "quick": [
    {
      "chip": "주 5일 근무",
      "big": "6.9개월",
      "unit": "걸리는 기간",
      "sub": "30주 동안 주 6일씩 쌓여요",
      "selected": true
    },
    {
      "chip": "주 3일 근무",
      "big": "10.4개월",
      "unit": "걸리는 기간",
      "sub": "45주 동안 주 4일씩 쌓여요",
      "selected": false
    },
    {
      "chip": "주 2일 · 15시간 미만",
      "big": "20.7개월",
      "unit": "걸리는 기간",
      "sub": "주휴가 붙지 않아 기준기간 특례를 봐야 해요",
      "selected": false
    }
  ],
  "boxes": [
    {
      "title": "세는 건 보수가 나간 날이에요",
      "text": "법은 보수 지급의 기초가 된 날을 합해서 계산한다고 정해요"
    },
    {
      "title": "유급 주휴일도 들어가요",
      "text": "일하지 않아도 보수가 나가는 날이라 주 5일 근무자는 주 6일이 쌓여요"
    }
  ],
  "keyPoints": {
    "title": "한눈에 보는 180일",
    "rows": [
      [
        "세는 대상",
        "보수 지급의 기초가 된 날"
      ],
      [
        "들어가는 날",
        "실제 근무일수와 유급으로 처리되는 휴일"
      ],
      [
        "빠지는 날",
        "무급휴일, 무급휴직, 결근한 날"
      ],
      [
        "세는 구간",
        "원칙은 이직일 이전 18개월"
      ],
      [
        "주 5일 근무",
        "30주 · 달력 6.9개월"
      ],
      [
        "확인하는 곳",
        "고용보험 홈페이지의 피보험자격 이력"
      ]
    ]
  },
  "sections": [
    {
      "id": "s1",
      "h2": "실업급여 180일은 무엇을 세나요",
      "sub": "보수 지급의 기초가 된 날만 세요"
    },
    {
      "id": "s2",
      "h2": "180일 계산법은 어떻게 되나요",
      "sub": "주당 쌓이는 날을 세고 180으로 나눠요"
    },
    {
      "id": "s3",
      "h2": "주 5일 일하면 180일을 언제 채우나요",
      "sub": "30주, 달력으로 6.9개월"
    },
    {
      "id": "s4",
      "h2": "주 3일이나 주 2일이면 얼마나 걸리나요",
      "sub": "단시간 근로자는 15시간에서 갈려요"
    },
    {
      "id": "s5",
      "h2": "무급휴직과 결근도 180일에 들어가나요",
      "sub": "보수가 나갔는지로 갈려요"
    },
    {
      "id": "s6",
      "h2": "내 180일은 어디서 조회하나요",
      "sub": "고용보험 홈페이지의 피보험자격 이력"
    }
  ],
  "faq": [
    {
      "q": "실업급여 180일은 6개월인가요?",
      "a": "아니에요. 달력 날짜가 아니라 보수가 나간 날을 세요. 주 5일 근무자는 30주, 달력으로 6.9개월이 걸려요."
    },
    {
      "q": "실업급여 몇개월 일해야 하나요?",
      "a": "근무일수에 따라 달라요. 주 5일이면 약 6.9개월, 주 3일이면 약 10.4개월을 일해야 180일이 채워져요."
    },
    {
      "q": "주휴일도 180일에 들어가나요?",
      "a": "유급으로 처리되는 주휴일은 피보험단위기간에 들어가요. 일하지 않았어도 보수가 나가는 날이기 때문이에요."
    },
    {
      "q": "주 3일 근무면 얼마나 걸리나요?",
      "a": "한 주에 4일씩 쌓여서 45주, 달력으로 약 10.4개월이 걸려요."
    },
    {
      "q": "여러 회사를 합쳐서 180일을 채워도 되나요?",
      "a": "기준기간 안에 있으면 합산해요. 각각은 짧아도 합쳐서 180일이면 조건을 채운 거예요."
    },
    {
      "q": "무급휴직 기간도 세나요?",
      "a": "무급휴직은 보수가 나가지 않아 피보험단위기간에서 빠져요. 다만 30일 이상 보수를 받지 못했다면 기준기간이 그만큼 늘어나요."
    },
    {
      "q": "단시간 근로자도 180일을 채울 수 있나요?",
      "a": "채울 수 있어요. 주 15시간 미만이면 주휴가 붙지 않아 오래 걸리는 대신, 기준기간을 24개월로 보는 특례가 있어요."
    },
    {
      "q": "내 피보험 단위기간은 어디서 보나요?",
      "a": "고용보험 홈페이지에서 회사별 이력을 볼 수 있어요. 정확한 일수는 회사가 낸 이직확인서에 적혀요."
    }
  ],
  "related": [
    {
      "kind": "주제 홈",
      "label": "2026년 실업급여 얼마나 받나요",
      "href": "/unemployment/"
    },
    {
      "kind": "다음 질문",
      "label": "실업급여 수급자격 4가지 조건, 180일과 이직 사유 정리",
      "href": "/unemployment/eligibility/"
    },
    {
      "kind": "다음 질문",
      "label": "실업급여 신청 방법 5단계, 고용24 구직신청부터 실업인정까지",
      "href": "/unemployment/apply/"
    }
  ]
};
