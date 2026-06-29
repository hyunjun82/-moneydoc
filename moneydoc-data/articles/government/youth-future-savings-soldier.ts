// 스포크: 군인도 청년미래적금 가입되나요 (sourceQuery: "청년미래적금 군인 가입" — 구글 실측)
// 디자인: 허브와 동일한 .cardnews 스코프. 본문은 정적 HTML. 사실은 실측 출처만.

export const meta = {
  title: "군인도 청년미래적금 가입되나요? 군장병급여만 있어도 OK",
  description:
    "현역 군인·병사도 청년미래적금 가입 가능. 군장병급여만 있어도 OK, 훈련소 내 비대면 가입, 장병내일준비적금·장기간부도약적금 중복가입, 군필 나이 만 40세, 군인은 일반형 6%까지 정리했어요.",
  ogImage:
    "https://www.korea.kr/newsWeb/resources/attaches/2026.06/19/530fc8f08bdcb738a12044439f0130e2.jpg",
  datePublished: "2026-06-29",
  dateModified: "2026-06-29",
};

export const bodyHtml = `
<article class="wrap">

    <!-- 상단 고정: 허브 funnel (같은 탭) -->
    <a class="applysticky" href="/government/youth-future-savings-guide/">
      <span class="as-t">청년미래적금 전체 정리</span>
      <span class="as-d">가입조건·정부기여금·신청일정 한눈에</span>
      <span class="as-btn">허브 보기 →</span>
    </a>

    <div class="masthead">
      <div class="kicker">MoneyDoc · 청년 자산형성 가이드</div>
      <div class="src">자료 출처: 금융위원회 · 국방부 · 정책브리핑(korea.kr) · 서민금융진흥원</div>
    </div>

    <!-- 히어로 -->
    <section class="card hero">
      <span class="tag">청년 자산형성 · 군인 편</span>
      <h1>군인도 청년미래적금 가입되나요? <br>군장병급여만 있어도 OK</h1>
      <p class="lead">현역 병사·간부, 훈련소 입영 중인 청년까지 — 군인 입장에서 가입 가능 여부와 방법, 유형(6%), 중복가입을 끝까지 정리했어요.</p>
      <div class="topics">
        <span>군장병급여 인정</span>
        <span>훈련소 가입</span>
        <span>중복가입</span>
        <span>일반형 6%</span>
      </div>
    </section>

    <!-- 바이라인 -->
    <div class="byline">
      <div class="ed">
        <span class="ava">지</span>
        <span class="who">지원금 에디터</span>
      </div>
      <div class="dates">
        <span>작성일 <time datetime="2026-06-29">2026. 06. 29.</time></span>
        <span>수정일 <time datetime="2026-06-29">2026. 06. 29.</time></span>
      </div>
    </div>

    <!-- 핵심 정보 스트립 -->
    <div class="facts">
      <div class="f"><div class="k">군인 가입</div><div class="v accent">가능</div></div>
      <div class="f"><div class="k">군인 유형</div><div class="v">대부분 일반형 6%</div></div>
      <div class="f"><div class="k">콜센터</div><a class="v" href="tel:1397" style="text-decoration:none">☎ 1397 → 3</a></div>
    </div>

    <!-- 시점 안내 -->
    <div class="notice"><span class="ic">ⓘ</span><span>이 글은 <b>2026년 1차 신청(6월 22일~7월 3일)</b> 기준이에요. 신청 기간이 지난 뒤라면 다음 회차 일정과 최신 조건을 <a href="https://fill4young.kinfa.or.kr/yfs/main">서민금융진흥원</a>에서 확인하세요.</span></div>

    <!-- 목차 -->
    <details class="toc" open>
      <summary><span class="ic">☰</span><span>목차</span><span class="tog">+</span></summary>
      <nav class="toc-nav">
        <a href="#sec-summary">군인 청년미래적금, 핵심만 먼저</a>
        <a href="#sec-why">군인도 되는 이유 (군장병급여 인정)</a>
        <a href="#sec-bootcamp">훈련소에서 가입하는 법</a>
        <a href="#sec-type">군인의 가입 유형 (일반형 6%)</a>
        <a href="#sec-overlap">군 적금과 중복가입</a>
        <a href="#sec-age">군필자 나이 (병역기간 차감)</a>
        <a href="#sec-caution">군인 신청 전 주의사항</a>
        <a href="#sec-faq">군인 자주 묻는 질문 (FAQ)</a>
      </nav>
    </details>

    <!-- 핵심만 먼저 -->
    <section class="card" id="sec-summary">
      <div class="seclabel"><span class="num">!</span><span class="txt">한눈에 요약</span></div>
      <h2>군인 청년미래적금, 핵심만 먼저</h2>
      <div class="keypts" style="margin-top:var(--sp-6)">
        <div class="pt"><span class="n">1</span><span class="t"><b>됩니다.</b> 현역 병사·간부 모두 가입 가능. 직전연도 소득이 없어도 <b>군장병급여(비과세)</b>만 확인되면 가입돼요.</span></div>
        <div class="pt"><span class="n">2</span><span class="t">입영 후 <b>기초군사훈련 중에도</b> 부대 안에서 비대면 가입·계좌개설이 가능해요.</span></div>
        <div class="pt"><span class="n">3</span><span class="t">기존 <b>장병내일준비적금·장기간부도약적금과 중복가입</b>이 됩니다. 군 적금은 그대로 두고 추가로 들 수 있어요.</span></div>
      </div>
      <p class="secteaser" style="margin-top:var(--sp-4)">단, 군인은 대부분 <b>일반형(정부기여금 6%)</b>이에요. 내가 6%일 때 3년 뒤 얼마 받는지 1분 만에 확인 → <a href="/savings/free-savings/">자유적금 계산기</a></p>
    </section>

    <!-- 중간 CTA: 신청(외부, 같은 탭) -->
    <a class="applybar" href="https://fill4young.kinfa.or.kr/yfs/main">
      <span class="t">군 복무 중에도 신청하세요<small>훈련소 내 비대면 신청 가능 · 1차 신청 ~7월 3일</small></span>
      <span class="btn">신청 바로가기 →</span>
    </a>

    <!-- 1. 군장병급여 인정 -->
    <section class="card" id="sec-why">
      <div class="seclabel"><span class="num">1</span><span class="txt">가입 가능 이유</span></div>
      <h2>군인도 되는 이유 — 군장병급여가 소득으로 인정</h2>
      <p class="secteaser">일반 가입자는 직전연도(2025년) 국세청 소득이 있어야 해요. 그런데 병사는 직전연도 소득이 안 잡히는 경우가 많죠. 정부가 이걸 예외로 인정했습니다.</p>
      <ul class="docs">
        <li><span><b>군장병급여(병사 월급)</b>는 비과세소득이지만 <b>가입 자격 소득으로 인정</b>돼요.</span></li>
        <li><span>그래서 <b>직전연도 일반 소득이 없어도</b> 군장병급여만 확인되면 가입할 수 있어요.</span></li>
        <li><span>사관생도·사회복무요원 등 <b>복무 중 급여</b>도 같은 방식으로 인정됩니다.</span></li>
      </ul>
      <p class="secteaser" style="margin-top:var(--sp-3);font-size:var(--fs-caption)">근거: 금융위원회 — "직전년도 소득이 산정되지 않는 청년 군인들의 적금 가입 진입 지원".</p>
    </section>

    <!-- 2. 훈련소 가입 -->
    <section class="card" id="sec-bootcamp">
      <div class="seclabel"><span class="num">2</span><span class="txt">훈련소 가입</span></div>
      <h2>훈련소에서 가입하는 법 (기초군사훈련 중에도)</h2>
      <p class="secteaser">입영했다고 놓치지 않아요. 금융위·국방부가 훈련소 내 비대면 가입을 지원합니다.</p>
      <ul class="docs">
        <li><span><b>기초군사훈련 중인 청년</b>도 부대 안에서 신청·계좌개설 가능</span></li>
        <li><span>방식은 일반과 동일 — <b>취급은행 앱 또는 서민금융진흥원 청년금융</b>에서 비대면</span></li>
        <li><span>1차 신청기간(6월 22일~7월 3일) 안에 진행</span></li>
      </ul>
      <p class="secteaser" style="margin-top:var(--sp-3);font-size:var(--fs-caption)">근거: 금융위·국방부 — "軍 입영 후 기초군사훈련 중인 청년들도 청년미래적금에 가입".</p>
    </section>

    <!-- 3. 가입 유형 -->
    <section class="card" id="sec-type">
      <div class="seclabel"><span class="num">3</span><span class="txt">가입 유형</span></div>
      <h2>군인의 가입 유형 — 대부분 일반형 6%</h2>
      <p class="secteaser">가장 헷갈리는 부분이에요. 정직하게, 군인은 보통 일반형(6%)입니다.</p>
      <ul class="docs">
        <li><span><b>일반형(6%)</b> — 소득요건(총급여 7,500만 이하 등)만 충족하면 적용. 대부분의 장병이 여기예요.</span></li>
        <li><span><b>우대형(12%)</b> — 중소기업 재직·소상공인 등 별도 조건이라, <b>현역 복무 자체로는 우대형이 되기 어렵습니다.</b></span></li>
        <li><span>다만 <b>전역 후 중소기업 취업</b> 등 조건이 바뀌면 우대형 경로가 열릴 수 있어요. (유형은 서민금융진흥원이 자동 심사)</span></li>
      </ul>
      <p class="secteaser" style="margin-top:var(--sp-3);font-size:var(--fs-caption)">근거: 한겨레 — "소득요건을 충족한 장병은 청년미래적금 '일반형'에 가입할 수 있다. 일반형은 정부가 납입액의 6%를 매칭".</p>
    </section>

    <!-- 4. 중복가입 -->
    <section class="card" id="sec-overlap">
      <div class="seclabel"><span class="num">4</span><span class="txt">중복가입</span></div>
      <h2>군 적금과 중복가입 된다</h2>
      <p class="secteaser">이미 군 적금을 들고 있어도 괜찮아요.</p>
      <ul class="docs">
        <li><span><b>병사</b> — 장병내일준비적금 + 청년미래적금 <b>중복가입 가능</b></span></li>
        <li><span><b>간부</b> — 장기간부도약적금 + 청년미래적금 <b>중복가입 가능</b></span></li>
        <li><span>군 적금 혜택은 그대로 두고 청년미래적금을 <b>추가로</b> 들 수 있어요.</span></li>
      </ul>
      <p class="secteaser" style="margin-top:var(--sp-3);font-size:var(--fs-caption)">근거: 금융위원회 — "장병내일준비적금 또는 장기간부도약적금과 청년미래적금을 중복가입하는 것이 가능".</p>
    </section>

    <!-- 5. 군필 나이 -->
    <section class="card" id="sec-age">
      <div class="seclabel"><span class="num">5</span><span class="txt">군필 나이</span></div>
      <h2>군필자 나이 — 병역기간만큼 늘어난다</h2>
      <ul class="docs">
        <li><span>기본 가입 연령은 <b>만 19~34세</b></span></li>
        <li><span><b>병역 이행기간(최대 6년)은 나이 계산에서 제외</b> → 군필 남성은 <b>최대 만 40세까지</b> 가입 가능</span></li>
        <li><span>증빙: <b>병적증명서</b> (병역 기간만큼 나이 한도가 늘어요)</span></li>
      </ul>
    </section>

    <!-- 6. 주의 -->
    <section class="card" id="sec-caution">
      <div class="seclabel"><span class="num">6</span><span class="txt">신청 전 주의</span></div>
      <h2>군인 신청 전 꼭 확인할 주의사항</h2>
      <ul class="docs">
        <li><span><b>중도해지 시 정부기여금은 원칙적으로 반환</b> — 전역·이동이 잦아도 3년 만기 유지가 가장 유리. 단 사망·해외이주 등 특별중도해지 사유는 예외.</span></li>
        <li><span><b>청년도약계좌와 중복 불가</b> — 둘 중 하나만. 갈아타기는 2026년 6월 단 한 번.</span></li>
        <li><span><b>유형은 자동 심사</b> — 일반형·우대형은 따로 신청 안 해도 서민금융진흥원이 정해줘요.</span></li>
      </ul>
    </section>

    <!-- FAQ -->
    <section class="card" id="sec-faq">
      <div class="seclabel"><span class="num">?</span><span class="txt">자주 묻는 질문 FAQ</span></div>
      <h2>군인 청년미래적금 자주 묻는 질문 (FAQ)</h2>
      <div class="faq" style="margin-top:var(--sp-6)">
        <details open>
          <summary><span class="q">Q.</span><span>병사 월급(군장병급여)만 있는데 가입되나요?</span><span class="plus">+</span></summary>
          <div class="ans">네. 군장병급여가 비과세소득이지만 <b>가입 자격 소득으로 인정</b>돼, 직전연도 일반 소득이 없어도 가입할 수 있어요.</div>
        </details>
        <details>
          <summary><span class="q">Q.</span><span>장병내일준비적금이랑 같이 들어도 되나요?</span><span class="plus">+</span></summary>
          <div class="ans">됩니다. 병사는 장병내일준비적금, 간부는 장기간부도약적금과 <b>중복가입</b>이 가능해요.</div>
        </details>
        <details>
          <summary><span class="q">Q.</span><span>군인도 12% 받을 수 있나요?</span><span class="plus">+</span></summary>
          <div class="ans">현역 복무 자체로는 보통 <b>일반형(6%)</b>이에요. 우대형(12%)은 중소기업 재직·소상공인 등 별도 조건이라, 전역 후 조건이 바뀌어야 가능성이 열려요.</div>
        </details>
        <details>
          <summary><span class="q">Q.</span><span>만 35세 전역인데 늦었나요?</span><span class="plus">+</span></summary>
          <div class="ans">병역기간(최대 6년)이 나이에서 빠지므로 군필 남성은 <b>최대 만 40세까지</b> 가능해요. 병적증명서로 증빙하세요.</div>
        </details>
        <details>
          <summary><span class="q">Q.</span><span>훈련소에 있는데 어떻게 신청하나요?</span><span class="plus">+</span></summary>
          <div class="ans">기초군사훈련 중에도 부대 안에서 <b>비대면</b>으로 신청·계좌개설이 가능해요. 취급은행 앱 또는 서민금융진흥원 청년금융에서 진행합니다.</div>
        </details>
      </div>
    </section>

    <!-- 관련 -->
    <section class="card" id="sec-related">
      <div class="seclabel"><span class="num">↗</span><span class="txt">관련</span></div>
      <h2>가입 전, 내 숫자로 미리 확인</h2>
      <p class="secteaser">군인은 보통 일반형 6%. 월 납입·금리로 만기 수령액을 바로 계산해 보세요.</p>
      <div class="rellinks">
        <a class="rel" href="/savings/free-savings/"><span class="rt">자유적금 계산기 →</span><span class="rd">월 납입·금리별 3년 만기 수령액</span></a>
        <a class="rel" href="/government/youth-future-savings-guide/"><span class="rt">청년미래적금 총정리 →</span><span class="rd">가입조건·정부기여금·신청일정 한눈에 (허브)</span></a>
        <a class="rel" href="/government/median-income/"><span class="rt">중위소득 계산기 →</span><span class="rd">내 가구 중위소득 % 확인</span></a>
      </div>
      <a class="pillbtn" href="https://fill4young.kinfa.or.kr/yfs/main">청년미래적금 신청하기 →</a>
    </section>

    <div class="foot">
      <div class="org">MoneyDoc 편집팀</div>
      <div style="margin-top:6px">자료 출처: 금융위원회 · 국방부 · 정책브리핑(korea.kr) · 서민금융진흥원 — 정책은 변동될 수 있으니 신청 전 공식 채널에서 확인하세요.</div>
    </div>

  </article>
`;

export const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "병사 월급(군장병급여)만 있어도 청년미래적금에 가입되나요?", acceptedAnswer: { "@type": "Answer", text: "네. 군장병급여가 비과세소득이지만 가입 자격 소득으로 인정돼, 직전연도 일반 소득이 없어도 가입할 수 있어요." } },
    { "@type": "Question", name: "장병내일준비적금과 청년미래적금을 같이 들어도 되나요?", acceptedAnswer: { "@type": "Answer", text: "됩니다. 병사는 장병내일준비적금, 간부는 장기간부도약적금과 청년미래적금을 중복가입할 수 있어요." } },
    { "@type": "Question", name: "군인도 청년미래적금 12%를 받을 수 있나요?", acceptedAnswer: { "@type": "Answer", text: "현역 복무 자체로는 보통 일반형(정부기여금 6%)이에요. 우대형(12%)은 중소기업 재직·소상공인 등 별도 조건이라, 전역 후 조건이 바뀌어야 가능성이 열립니다." } },
    { "@type": "Question", name: "만 35세 전역인데 청년미래적금에 가입할 수 있나요?", acceptedAnswer: { "@type": "Answer", text: "병역 이행기간(최대 6년)이 연령 계산에서 제외되므로 군필 남성은 최대 만 40세까지 가입할 수 있어요. 병적증명서로 증빙하면 됩니다." } },
    { "@type": "Question", name: "훈련소에 있는데 청년미래적금을 어떻게 신청하나요?", acceptedAnswer: { "@type": "Answer", text: "기초군사훈련 중에도 부대 안에서 비대면으로 신청·계좌개설이 가능해요. 취급은행 앱 또는 서민금융진흥원 청년금융에서 진행합니다." } },
  ],
};
