// 자동 생성: scripts/article-template/convert-v2.mjs — 직접 수정하지 말 것
// 원본: public/_preview/article-v2-unemployment-by-salary-guide.html
export const meta = {
  title: "실업급여 금액, 월급별 하루 얼마 받나요",
  description: "월급별로 실업급여 하루 얼마를 받는지 표로 정리했어요. 월 180만원이든 600만원이든 하루 차이는 2,052원뿐이에요. 상한과 하한에 걸리는 지점을 함께 봤어요.",
  datePublished: "2026-09-02",
  dateModified: "2026-09-02",
  url: "https://moneydoc.kr/government/unemployment-by-salary-guide/",
  image: "https://moneydoc.kr/og/unemployment-by-salary-guide.png",
  imageAlt: "월급별 실업급여 1일 수령액 표. 월 300만원이면 하루 66,048원",
};

export const scriptKey = "unemployment-by-salary-guide";

export const html = `<h1>실업급여 금액, 월급별 하루 얼마 받나요</h1>
<div class="v2-meta"><span>MoneyDoc 편집팀</span><span>·</span><span>2026년 9월 기준</span><span>·</span><span>6분</span><span class="v2-badge">고용보험법 구직급여일액 원문 대조 · 2026-09-02</span></div>
<img class="v2-hero" src="/og/unemployment-by-salary-guide.png" width="1200" height="630" alt="월급별 실업급여 1일 수령액 표. 월 300만원이면 하루 66,048원">
<p class="v2-lead v2-intro">실업급여가 하루 얼마인지는 평균임금으로 정해져요. 원칙은 평균임금의 60퍼센트인데, 위아래로 막아 둔 금액이 있어서 실제로는 좁은 범위에 몰려요. 월급별로 하루 얼마를 받는지 표로 만들었어요. 어느 구간에서 하한액에 걸리고 어디부터 상한액에 걸리는지 한눈에 보여요.</p>
<section class="v2-answer" aria-label="즉답">
  <div class="v2-lbl">내 월급대를 눌러 확인해 보세요</div>
  <div class="v2-chips" id="qchips" data-q='[{&quot;big&quot;:&quot;66,048원&quot;,&quot;unit&quot;:&quot;하루&quot;,&quot;sub&quot;:&quot;하한액이 적용돼요&quot;},{&quot;big&quot;:&quot;66,048원&quot;,&quot;unit&quot;:&quot;하루&quot;,&quot;sub&quot;:&quot;60퍼센트로는 60,000원이라 하한액이 적용돼요&quot;},{&quot;big&quot;:&quot;68,100원&quot;,&quot;unit&quot;:&quot;하루&quot;,&quot;sub&quot;:&quot;상한액이 적용돼요&quot;}]'><button type="button" data-i="0" aria-pressed="true">월 200만원</button><button type="button" data-i="1" aria-pressed="false">월 300만원</button><button type="button" data-i="2" aria-pressed="false">월 500만원</button></div>
  <div class="v2-big" id="qnet">66,048원<small>하루</small></div>
  <div class="v2-sub" id="qsub">하한액이 적용돼요</div>
  <div class="v2-split">
    <div class="v2-box"><b>월급 차이만큼 벌어지지 않아요</b><span>월급이 4,200,000원 차이 나도 하루 지급액은 2,052원 차이예요</span></div>
    <div class="v2-box"><b>평균임금이지 월급이 아니에요</b><span>이직 전 3개월 임금 총액을 그 기간 총 일수로 나눈 금액이 기준이에요</span></div>
  </div>
</section>
<!--CALC_START--><a class="v2-cta" href="/unemployment/calculator/">표에 없는 월급 계산해 보기</a><!--CALC_END-->
<details class="v2-toc"><summary>목차 (6개 질문)<span>열기</span></summary><ol><li><a href="#s1">실업급여 금액은 어떻게 정해지나요</a></li><li><a href="#s2">월급별로 하루 얼마를 받나요</a></li><li><a href="#s3">월급이 높아도 더 못 받는 구간이 있나요</a></li><li><a href="#s4">월급이 적으면 얼마를 보장받나요</a></li><li><a href="#s5">한 달에 실제로 얼마가 들어오나요</a></li><li><a href="#faq">자주 묻는 질문</a></li></ol></details>
<section class="v2-kk" aria-label="한눈에 보는 요약">
  <div class="v2-hd"><small>한눈에 보는 월급별 금액</small><b>핵심콕콕</b></div>
  <dl>
    <div class="v2-row"><dt>계산 원칙</dt><dd>기초일액의 100분의 60</dd></div>
    <div class="v2-row"><dt>기초일액</dt><dd>이직 전 3개월 임금 총액 ÷ 그 기간 총 일수</dd></div>
    <div class="v2-row"><dt>하한액</dt><dd>하루 66,048원</dd></div>
    <div class="v2-row"><dt>상한액</dt><dd>하루 68,100원</dd></div>
    <div class="v2-row"><dt>월 300만원이면</dt><dd>하루 66,048원</dd></div>
    <div class="v2-row"><dt>총액을 가르는 것</dt><dd>하루 금액이 아니라 소정급여일수</dd></div>
  </dl>
</section>

<h2 id="s1">실업급여 금액은 어떻게 정해지나요<small>기초일액의 60퍼센트</small></h2>
<p class="v2-lead"><span class="v2-ans">기초일액에 100분의 60을 곱한 금액이 구직급여일액이에요.</span> 기초일액은 이직 당시의 평균임금이에요. 이직 전 3개월간 지급된 임금 총액을 그 기간의 총 일수로 나눈 금액이라, 월급을 30으로 나눈 값과 비슷하게 나와요. 여기에 60퍼센트를 곱해요.</p>
<p><span class="v2-ans">위아래 한도가 하루 66,048원과 68,100원이에요.</span> 2026년 기준이고, 하한액은 최저임금에서 나오고 상한액은 대통령령으로 정해요. <a class="v2-go" href="/unemployment/amount/">상한액 하한액 자세히</a></p>
<p><span class="v2-ans">상한액이 실업급여 최대금액, 하한액이 최저금액이에요.</span> 검색할 때 최대 금액이나 최저 금액으로 부르는 게 이 두 값이에요.</p>
<p><span class="v2-ans">그 값이 하한보다 낮으면 하한액을 줘요.</span> 계산 결과가 최저구직급여일액보다 낮으면 최저구직급여일액을 지급해요. 반대로 기초일액이 정해진 상한을 넘으면 상한까지만 인정해요. 그래서 실제 금액은 두 값 사이에 몰려요.</p>
<div class="v2-note"><b>통상임금이 더 크면 그쪽을 써요</b> 산정한 평균임금이 통상임금보다 적으면 통상임금을 기초일액으로 해요. 마지막 이직 당시 일용근로자였다면 이 규정은 적용되지 않아요. <a class="v2-go" href="/unemployment/average-wage/">평균임금 산정법</a></div>

<h2 id="s2">월급별로 하루 얼마를 받나요<small>구간별로 정리했어요</small></h2>
<p class="v2-lead"><span class="v2-ans">월 180만원부터 600만원까지 하루 지급액을 계산했어요.</span> 표의 60퍼센트 값이 하한액보다 낮으면 하한액이 적용되고, 상한을 넘으면 상한액이 적용돼요. 어느 구간에서 갈리는지 표에서 바로 보여요.</p>
<div class="v2-tbl"><table><caption>월급별 실업급여 하루 지급액과 월 환산</caption><thead><tr><th>월 평균임금</th><th>60퍼센트로 계산</th><th>하루 지급액</th><th>30일 환산</th><th>적용</th></tr></thead><tbody>
<tr><th scope="row">180만원</th><td>36,000원</td><td class="v2-net">66,048원</td><td>1,981,440원</td><td>하한액</td></tr>
<tr><th scope="row">200만원</th><td>40,000원</td><td class="v2-net">66,048원</td><td>1,981,440원</td><td>하한액</td></tr>
<tr><th scope="row">220만원</th><td>44,000원</td><td class="v2-net">66,048원</td><td>1,981,440원</td><td>하한액</td></tr>
<tr><th scope="row">250만원</th><td>50,000원</td><td class="v2-net">66,048원</td><td>1,981,440원</td><td>하한액</td></tr>
<tr><th scope="row">280만원</th><td>56,000원</td><td class="v2-net">66,048원</td><td>1,981,440원</td><td>하한액</td></tr>
<tr class="v2-hi"><th scope="row">300만원</th><td>60,000원</td><td class="v2-net">66,048원</td><td>1,981,440원</td><td>하한액</td></tr>
<tr><th scope="row">330만원</th><td>66,000원</td><td class="v2-net">66,048원</td><td>1,981,440원</td><td>하한액</td></tr>
<tr><th scope="row">360만원</th><td>72,000원</td><td class="v2-net">68,100원</td><td>2,043,000원</td><td>상한액</td></tr>
<tr><th scope="row">400만원</th><td>80,000원</td><td class="v2-net">68,100원</td><td>2,043,000원</td><td>상한액</td></tr>
<tr><th scope="row">450만원</th><td>90,000원</td><td class="v2-net">68,100원</td><td>2,043,000원</td><td>상한액</td></tr>
<tr><th scope="row">500만원</th><td>100,000원</td><td class="v2-net">68,100원</td><td>2,043,000원</td><td>상한액</td></tr>
<tr><th scope="row">600만원</th><td>120,000원</td><td class="v2-net">68,100원</td><td>2,043,000원</td><td>상한액</td></tr>
</tbody></table></div>
<p class="v2-fn">구직급여일액은 기초일액의 100분의 60이고, 그 값이 최저구직급여일액보다 낮으면 최저구직급여일액을 지급해요. 30일 환산은 이해를 돕기 위한 값이고 실제로는 인정된 날수만큼 지급돼요.</p>
<div class="v2-note"><b>표에 없는 월급은 계산기로 보세요</b> 평균임금과 가입기간, 나이를 넣으면 하루 금액과 소정급여일수, 총액이 함께 나와요. 총액이 궁금하면 하루 금액에 소정급여일수를 곱하면 돼요. <a class="v2-go" href="/unemployment/total/">총 수령액 계산</a></div>

<h2 id="s3">월급이 높아도 더 못 받는 구간이 있나요<small>상한액에 걸려요</small></h2>
<p class="v2-lead"><span class="v2-ans">있어요. 일정 구간을 넘으면 월급이 아무리 올라도 하루 68,100원에서 멈춰요.</span> 기초일액 자체에 상한이 있어서 하루 113,500원까지만 인정해요. 그 위로는 계산에 반영되지 않아요. 표에서 상한액이라고 표시된 구간이 여기예요.</p>
<p><span class="v2-ans">그래서 고소득일수록 대체율이 낮아져요.</span> 월 400만원을 받던 사람도 월 600만원을 받던 사람도 하루 금액이 같아요. 실업급여는 생활을 최소한 받쳐 주는 제도라 위쪽을 막아 둔 거예요.</p>
<div class="v2-note"><b>퇴직 전에 월급을 올려도 소용없어요</b> 상한에 이미 걸리는 구간이라면 평균임금이 올라도 하루 금액은 그대로예요.</div>

<h2 id="s4">월급이 적으면 얼마를 보장받나요<small>하한액이 바닥을 받쳐요</small></h2>
<p class="v2-lead"><span class="v2-ans">계산값이 낮아도 하루 66,048원은 받아요.</span> 최저기초일액은 이직 전 1일 소정근로시간에 최저임금을 곱해 구하고, 여기에 100분의 80을 곱한 금액이 최저구직급여일액이에요. 60퍼센트로 계산한 값이 이보다 낮으면 이 금액이 적용돼요.</p>
<p><span class="v2-ans">다만 하루 8시간을 기준으로 한 금액이에요.</span> 하루 소정근로시간이 8시간보다 짧았다면 최저기초일액도 그만큼 작아져서 하한액이 낮아져요. 단시간으로 일했다면 표의 하한액보다 적게 나올 수 있어요.</p>
<div class="v2-note"><b>월급 대신 평균임금을 확인하세요</b> 기준은 세전 월급이 아니라 이직 전 3개월 평균임금이에요. 이직확인서에 적힌 값을 보는 게 정확해요.</div>

<h2 id="s5">한 달에 실제로 얼마가 들어오나요<small>인정된 날수만큼이에요</small></h2>
<p class="v2-lead"><span class="v2-ans">한 달치가 고정으로 나오는 게 아니라 인정된 날수에 하루 금액을 곱해서 나와요.</span> 실업인정일 간격이 28일이면 28일치가 들어와요. 첫 회차는 대기기간 7일이 빠져서 적고, 4차부터는 간격이 7일에서 28일 사이라 회차마다 달라져요. 표의 30일 환산은 감을 잡기 위한 값이에요.</p>
<p><span class="v2-ans">세금은 떼지 않아요.</span> 실업급여는 근로소득이 아니라서 소득세를 원천징수하지 않아요. 통장에 찍히는 금액이 그대로예요.</p>
<div class="v2-tbl v2-text"><table><caption>금액과 관련해 확인할 것</caption><thead><tr><th>확인할 것</th><th>어디서 보나요</th></tr></thead><tbody>
<tr><th scope="row">이직 전 평균임금</th><td data-l="어디서 보나요">회사가 낸 이직확인서<a class="v2-go" href="https://www.ei.go.kr" target="_blank" rel="noopener">고용보험 홈페이지</a></td></tr>
<tr><th scope="row">이직 전 1일 소정근로시간</th><td data-l="어디서 보나요">이직확인서. 하한액에 영향을 줘요</td></tr>
<tr><th scope="row">정해진 하루 지급액</th><td data-l="어디서 보나요">수급자격 인정 통지와 수급자격증</td></tr>
<tr><th scope="row">이번 회차 인정 일수</th><td data-l="어디서 보나요">실업인정 결과</td></tr>
<tr><th scope="row">총 수령액</th><td data-l="어디서 보나요">하루 금액 × 소정급여일수</td></tr>
</tbody></table></div>
<p class="v2-fn">이직확인서의 평균임금이나 소정근로시간이 잘못 적히면 금액이 달라져요. 신청 전에 확인하세요.</p>

<h2 id="faq">자주 묻는 질문</h2>
<div class="v2-faqs">
<details class="v2-faq" open><summary><i>Q</i><span>월 300만원이면 실업급여가 하루 얼마인가요?</span></summary><div><i>A</i><p>66,048원이에요. 60퍼센트로 계산하면 60,000원인데 하한액이 적용돼요.</p></div></details>
<details class="v2-faq"><summary><i>Q</i><span>월급이 두 배면 실업급여도 두 배인가요?</span></summary><div><i>A</i><p>아니에요. 월 180만원과 600만원의 하루 차이가 2,052원뿐이에요.</p></div></details>
<details class="v2-faq"><summary><i>Q</i><span>실업급여는 월급의 몇 퍼센트인가요?</span></summary><div><i>A</i><p>기초일액의 60퍼센트가 원칙이에요. 다만 상한과 하한에 걸리면 그 금액이 적용돼요.</p></div></details>
<details class="v2-faq"><summary><i>Q</i><span>월급이 적으면 얼마를 받나요?</span></summary><div><i>A</i><p>하루 66,048원이 하한이에요. 다만 하루 소정근로시간이 8시간보다 짧으면 더 낮아질 수 있어요.</p></div></details>
<details class="v2-faq"><summary><i>Q</i><span>한 달에 얼마가 들어오나요?</span></summary><div><i>A</i><p>인정된 날수에 하루 금액을 곱한 금액이에요. 회차마다 날수가 달라서 금액도 달라져요.</p></div></details>
<details class="v2-faq"><summary><i>Q</i><span>월급이 아니라 평균임금이라는 게 무슨 뜻인가요?</span></summary><div><i>A</i><p>이직 전 3개월 임금 총액을 그 기간 총 일수로 나눈 금액이에요. 이직확인서에 적혀 있어요.</p></div></details>
</div>
<section class="v2-sum" aria-label="정리"><div class="v2-hd"><small>이 글 한 줄 정리</small><b>정리</b></div><ul>
<li>구직급여일액은 기초일액의 60퍼센트이고 상한과 하한에 막혀요.</li>
<li>월 180만원과 600만원의 하루 차이가 2,052원뿐이에요.</li>
<li>기준은 세전 월급이 아니라 이직 전 3개월 평균임금이에요.</li>
<li>총액을 가르는 건 하루 금액이 아니라 소정급여일수예요.</li>
</ul></section>
<a class="v2-cta" href="/unemployment/calculator/">표에 없는 월급 계산해 보기</a>
<h2 id="src">출처</h2>
<div class="v2-src">
<b>법령</b>고용보험법 제45조(급여의 기초가 되는 임금일액), 제46조(구직급여일액), 고용보험법 시행령 제68조(기초일액의 상한액).
<b>정부 도구</b>고용24 실업급여 모의계산 결과와 월급 구간별 금액을 대조했어요 (2026-09-02 확인).
</div>
<div class="v2-rel"><a href="/unemployment/"><b>주제 홈</b>2026년 실업급여 얼마나 받나요</a><a href="/unemployment/calculator/"><b>계산기</b>실업급여 계산기</a><a href="/unemployment/amount/"><b>다음 질문</b>2026년 실업급여 상한액 하한액, 하루 얼마까지 받나요</a><a href="/unemployment/days/"><b>다음 질문</b>실업급여 소정급여일수 표, 나이와 가입기간별 며칠 받나</a></div>
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
      "name": "월 300만원이면 실업급여가 하루 얼마인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "66,048원이에요. 60퍼센트로 계산하면 60,000원인데 하한액이 적용돼요."
      }
    },
    {
      "@type": "Question",
      "name": "월급이 두 배면 실업급여도 두 배인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "아니에요. 월 180만원과 600만원의 하루 차이가 2,052원뿐이에요."
      }
    },
    {
      "@type": "Question",
      "name": "실업급여는 월급의 몇 퍼센트인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "기초일액의 60퍼센트가 원칙이에요. 다만 상한과 하한에 걸리면 그 금액이 적용돼요."
      }
    },
    {
      "@type": "Question",
      "name": "월급이 적으면 얼마를 받나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "하루 66,048원이 하한이에요. 다만 하루 소정근로시간이 8시간보다 짧으면 더 낮아질 수 있어요."
      }
    },
    {
      "@type": "Question",
      "name": "한 달에 얼마가 들어오나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "인정된 날수에 하루 금액을 곱한 금액이에요. 회차마다 날수가 달라서 금액도 달라져요."
      }
    },
    {
      "@type": "Question",
      "name": "월급이 아니라 평균임금이라는 게 무슨 뜻인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "이직 전 3개월 임금 총액을 그 기간 총 일수로 나눈 금액이에요. 이직확인서에 적혀 있어요."
      }
    }
  ]
};

export const landing = {
  "hero": {
    "tag": "정부지원금",
    "line1": "월급별 실업급여 1일 수령액",
    "line2": "내 월급이면 얼마인가요",
    "sub1": "월 180만원과 600만원의 하루 차이가 2,052원이에요",
    "sub2": "월급이 두 배 넘게 차이 나도 받는 돈은 비슷해요",
    "foot": "고용보험법 구직급여일액 원문 대조 · 2026-09-02 검증",
    "card": {
      "label": "월 300만원이면",
      "big": "66,048",
      "unit": "원",
      "l1": "하루 지급액",
      "l2": "한 달 30일이면 1,981,440원"
    },
    "alt": "월급별 실업급여 1일 수령액 표. 월 300만원이면 하루 66,048원"
  },
  "calc": {
    "href": "/unemployment/calculator/",
    "label": "표에 없는 월급 계산해 보기"
  },
  "badge": "고용보험법 구직급여일액 원문 대조 · 2026-09-02",
  "basis": "2026년 9월 기준",
  "readMinutes": 6,
  "quick": [
    {
      "chip": "월 200만원",
      "big": "66,048원",
      "unit": "하루",
      "sub": "하한액이 적용돼요",
      "selected": true
    },
    {
      "chip": "월 300만원",
      "big": "66,048원",
      "unit": "하루",
      "sub": "60퍼센트로는 60,000원이라 하한액이 적용돼요",
      "selected": false
    },
    {
      "chip": "월 500만원",
      "big": "68,100원",
      "unit": "하루",
      "sub": "상한액이 적용돼요",
      "selected": false
    }
  ],
  "boxes": [
    {
      "title": "월급 차이만큼 벌어지지 않아요",
      "text": "월급이 4,200,000원 차이 나도 하루 지급액은 2,052원 차이예요"
    },
    {
      "title": "평균임금이지 월급이 아니에요",
      "text": "이직 전 3개월 임금 총액을 그 기간 총 일수로 나눈 금액이 기준이에요"
    }
  ],
  "keyPoints": {
    "title": "한눈에 보는 월급별 금액",
    "rows": [
      [
        "계산 원칙",
        "기초일액의 100분의 60"
      ],
      [
        "기초일액",
        "이직 전 3개월 임금 총액 ÷ 그 기간 총 일수"
      ],
      [
        "하한액",
        "하루 66,048원"
      ],
      [
        "상한액",
        "하루 68,100원"
      ],
      [
        "월 300만원이면",
        "하루 66,048원"
      ],
      [
        "총액을 가르는 것",
        "하루 금액이 아니라 소정급여일수"
      ]
    ]
  },
  "sections": [
    {
      "id": "s1",
      "h2": "실업급여 금액은 어떻게 정해지나요",
      "sub": "기초일액의 60퍼센트"
    },
    {
      "id": "s2",
      "h2": "월급별로 하루 얼마를 받나요",
      "sub": "구간별로 정리했어요"
    },
    {
      "id": "s3",
      "h2": "월급이 높아도 더 못 받는 구간이 있나요",
      "sub": "상한액에 걸려요"
    },
    {
      "id": "s4",
      "h2": "월급이 적으면 얼마를 보장받나요",
      "sub": "하한액이 바닥을 받쳐요"
    },
    {
      "id": "s5",
      "h2": "한 달에 실제로 얼마가 들어오나요",
      "sub": "인정된 날수만큼이에요"
    }
  ],
  "faq": [
    {
      "q": "월 300만원이면 실업급여가 하루 얼마인가요?",
      "a": "66,048원이에요. 60퍼센트로 계산하면 60,000원인데 하한액이 적용돼요."
    },
    {
      "q": "월급이 두 배면 실업급여도 두 배인가요?",
      "a": "아니에요. 월 180만원과 600만원의 하루 차이가 2,052원뿐이에요."
    },
    {
      "q": "실업급여는 월급의 몇 퍼센트인가요?",
      "a": "기초일액의 60퍼센트가 원칙이에요. 다만 상한과 하한에 걸리면 그 금액이 적용돼요."
    },
    {
      "q": "월급이 적으면 얼마를 받나요?",
      "a": "하루 66,048원이 하한이에요. 다만 하루 소정근로시간이 8시간보다 짧으면 더 낮아질 수 있어요."
    },
    {
      "q": "한 달에 얼마가 들어오나요?",
      "a": "인정된 날수에 하루 금액을 곱한 금액이에요. 회차마다 날수가 달라서 금액도 달라져요."
    },
    {
      "q": "월급이 아니라 평균임금이라는 게 무슨 뜻인가요?",
      "a": "이직 전 3개월 임금 총액을 그 기간 총 일수로 나눈 금액이에요. 이직확인서에 적혀 있어요."
    }
  ],
  "related": [
    {
      "kind": "주제 홈",
      "label": "2026년 실업급여 얼마나 받나요",
      "href": "/unemployment/"
    },
    {
      "kind": "계산기",
      "label": "실업급여 계산기",
      "href": "/unemployment/calculator/"
    },
    {
      "kind": "다음 질문",
      "label": "2026년 실업급여 상한액 하한액, 하루 얼마까지 받나요",
      "href": "/unemployment/amount/"
    },
    {
      "kind": "다음 질문",
      "label": "실업급여 소정급여일수 표, 나이와 가입기간별 며칠 받나",
      "href": "/unemployment/days/"
    }
  ]
};
