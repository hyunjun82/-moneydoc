// 골든 스포크: 허브(youth-future-savings-guide)와 동일한 cardnews 컴포넌트 어휘로 리라이트.
// 클래스는 전부 components/cardnews.css 화이트리스트만 사용. 사실=검증 출처(금융위·국방부).

export const meta = {
  title: "군인도 청년미래적금 가입되나요? 군장병급여만 있어도 OK",
  description: "군인도 청년미래적금 가입 가능. 직전연도 소득 없는 병사도 군장병급여만 있으면 OK. 훈련소 내 비대면 가입, 장병내일준비적금 중복가입, 군인 만기 수령액(일반형 6%), 군필 나이 만 40세까지.",
  ogImage: "https://www.korea.kr/newsWeb/resources/attaches/2026.06/19/530fc8f08bdcb738a12044439f0130e2.jpg",
  datePublished: "2026-06-29",
  dateModified: "2026-06-29",
};

export const bodyHtml = `
<article class="wrap">

    <a class="applysticky" href="https://fill4young.kinfa.or.kr/yfs/main" target="_blank" rel="noopener">
      <span class="as-t">청년미래적금 신청하기</span>
      <span class="as-d">군 훈련소 내 비대면 신청 가능 · ~7월 3일</span>
      <span class="as-btn">신청 바로가기 →</span>
    </a>

    <div class="masthead">
      <div class="kicker">MoneyDoc · 청년 자산형성 가이드</div>
      <div class="src">자료 출처: 금융위원회 · 국방부 · 정책브리핑(korea.kr) · 서민금융진흥원</div>
    </div>

    <section class="card hero">
      <span class="tag">청년 자산형성 · 군인 편</span>
      <h1>군인도 청년미래적금 가입되나요? <br>군장병급여만 있어도 OK</h1>
      <p class="lead">결론부터 말하면 됩니다. 직전연도 소득이 없는 병사도 군장병급여만 있으면 되고, 입영해 훈련소에 있어도 부대 안에서 신청할 수 있어요.</p>
      <div class="topics">
        <span>군장병급여 인정</span>
        <span>훈련소 가입</span>
        <span>군 적금 중복가입</span>
        <span>만기 수령액</span>
      </div>
    </section>

    <div class="byline">
      <div class="ed"><span class="ava">지</span><span class="who">지원금 에디터</span></div>
      <div class="dates"><span>작성일 <time datetime="2026-06-29">2026. 06. 29.</time></span><span>수정일 <time datetime="2026-06-29">2026. 06. 29.</time></span></div>
    </div>

    <div class="facts">
      <div class="f"><div class="k">군인 가입</div><div class="v accent">가능</div></div>
      <div class="f"><div class="k">군인 유형</div><div class="v">대부분 일반형 6%</div></div>
      <div class="f"><div class="k">월 50만·3년</div><div class="v">원금+기여금 1,908만</div></div>
    </div>

    <div class="notice"><span class="ic">ⓘ</span><span>이 글은 <b>2026년 1차 신청(6월 22일~7월 3일)</b> 기준이에요. 신청 기간이 지난 뒤라면 다음 회차 일정과 최신 조건을 <a href="https://fill4young.kinfa.or.kr/yfs/main" target="_blank" rel="noopener">서민금융진흥원</a>에서 확인하세요.</span></div>

    <details class="toc" open>
      <summary><span class="ic">☰</span><span>목차</span><span class="tog">+</span></summary>
      <nav class="toc-nav">
        <a href="#sec-summary">군인 청년미래적금, 핵심만 먼저</a>
        <a href="#sec-why">군인도 되는 이유 (군장병급여가 소득으로 인정)</a>
        <a href="#sec-bootcamp">훈련소에서 가입하는 법</a>
        <a href="#sec-match">군인 정부기여금, 얼마나? (6% vs 12%)</a>
        <a href="#sec-payout">군인 만기 수령액 (일반형 6% 기준)</a>
        <a href="#sec-persona">나는 어떤 군인 유형일까?</a>
        <a href="#sec-overlap">군 적금과 중복가입 된다</a>
        <a href="#sec-age">군필자 나이 (만 40세까지)</a>
        <a href="#sec-apply">군인 청년미래적금 신청 방법 (3단계)</a>
        <a href="#sec-caution">신청 전 꼭 확인할 주의사항</a>
        <a href="#sec-faq">군인 청년미래적금 자주 묻는 질문 (FAQ)</a>
      </nav>
    </details>

    <section class="card" id="sec-summary">
      <div class="seclabel"><span class="num">!</span><span class="txt">한눈에 요약</span></div>
      <h2>군인 청년미래적금, 핵심만 먼저</h2>
      <div class="keypts" style="margin-top:var(--sp-6)">
        <div class="pt"><span class="n">1</span><span class="t"><b>됩니다.</b> 현역 병사·간부 모두 가입 가능. 직전연도 소득이 없어도 <b>군장병급여(비과세)</b>만 확인되면 가입돼요.</span></div>
        <div class="pt"><span class="n">2</span><span class="t">입영 후 <b>기초군사훈련 중에도</b> 부대 안에서 비대면 가입·계좌개설이 가능해요.</span></div>
        <div class="pt"><span class="n">3</span><span class="t">기존 <b>장병내일준비적금·장기간부도약적금과 중복가입</b>이 됩니다.</span></div>
        <div class="pt"><span class="n">4</span><span class="t">군인은 대부분 <b>일반형(6%)</b>. 월 50만 원씩 3년이면 원금+기여금 <b>약 1,908만 원</b>(+비과세 이자).</span></div>
      </div>
    </section>

    <a class="applybar" href="https://fill4young.kinfa.or.kr/yfs/main" target="_blank" rel="noopener">
      <span class="t">군 복무 중에도 신청하세요<small>훈련소 내 비대면 신청 가능 · 1차 신청 ~7월 3일</small></span>
      <span class="btn">신청 바로가기 →</span>
    </a>

    <section class="card" id="sec-why">
      <div class="seclabel"><span class="num">1</span><span class="txt">가입 가능 이유</span></div>
      <h2>군인도 되는 이유 — 군장병급여가 소득으로 인정</h2>
      <p class="secteaser">일반 가입자는 직전연도(2025년) 국세청 소득이 있어야 해요. 병사는 그 소득이 안 잡히는 경우가 많은데, 정부가 군인을 위해 예외를 뒀습니다.</p>
      <ul class="qa">
        <li>
          <span class="tri">▲</span>
          <div class="body">
            <b class="hl">군장병급여가 '자격 소득'으로 인정</b>
            병사 월급(군장병급여)은 비과세소득이지만, 청년미래적금에서는 <b>가입 자격 소득으로 인정</b>돼요. 그래서 직전연도 일반 소득이 없어도 가입할 수 있어요.
          </div>
        </li>
        <li>
          <span class="tri">▲</span>
          <div class="body">
            <b class="hl">복무 중 급여도 같은 방식</b>
            사관생도·사회복무요원 등 <b>복무 중 받는 급여</b>가 있으면 동일하게 인정됩니다.
            <div class="subnote">소득 증빙은 대부분 <b>국세청·행정정보로 자동 확인</b>돼 따로 낼 서류가 적어요.</div>
          </div>
        </li>
      </ul>
      <p class="secteaser" style="margin-top:var(--sp-3);font-size:var(--fs-caption)">근거: 금융위원회 — 직전년도 소득이 산정되지 않는 청년 군인의 적금 가입 진입 지원.</p>
    </section>

    <section class="card" id="sec-bootcamp">
      <div class="seclabel"><span class="num">2</span><span class="txt">훈련소 가입</span></div>
      <h2>훈련소에서 가입하는 법 (기초군사훈련 중에도)</h2>
      <p class="secteaser">입영했다고 놓치지 않아요. 금융위·국방부가 1차 신청기간에 맞춰 훈련소 내 비대면 가입을 지원합니다.</p>
      <ul class="docs">
        <li><span><b>기초군사훈련 중인 청년</b>도 부대 안에서 신청·계좌개설이 가능해요.</span></li>
        <li><span>방식은 일반과 동일 — <b>취급은행 앱 또는 서민금융진흥원 청년금융</b>에서 비대면으로 진행.</span></li>
        <li><span>반드시 <b>1차 신청기간(6월 22일~7월 3일)</b> 안에 신청하세요.</span></li>
      </ul>
      <p class="secteaser" style="margin-top:var(--sp-3);font-size:var(--fs-caption)">근거: 금융위·국방부 — 입영 후 기초군사훈련 중인 청년도 청년미래적금에 가입.</p>
    </section>

    <section class="card" id="sec-match">
      <div class="seclabel"><span class="num">3</span><span class="txt">정부기여금</span></div>
      <h2>군인 정부기여금, 얼마나 받나? (6% vs 12%)</h2>
      <p class="secteaser">정직하게 말하면, 군인은 보통 일반형(6%)입니다. 유형은 서민금융진흥원이 자동으로 정해줘요.</p>
      <div class="tiers">
        <div class="tier t0">
          <div class="name">비과세형</div>
          <div class="rate">0<small>%</small></div>
          <div class="desc">총급여 6,000만 초과~7,500만 구간 (기여금 없이 비과세만)</div>
        </div>
        <div class="tier t1">
          <div class="name">일반형 · 군인 대부분</div>
          <div class="rate">6<small>%</small></div>
          <div class="desc">소득요건을 충족한 장병 대부분이 여기예요</div>
        </div>
        <div class="tier t2">
          <div class="name">우대형</div>
          <div class="rate">12<small>%</small></div>
          <div class="desc">중소기업 재직·소상공인 등 별도 조건 (현역은 어려움)</div>
        </div>
      </div>
      <ul class="qa" style="margin-top:var(--sp-6)">
        <li><span class="tri">▲</span><div class="body"><b class="hl">현역은 보통 일반형(6%)</b>소득요건(총급여 7,500만 이하 등)만 맞으면 일반형으로 가입돼요. 우대형은 중소기업 재직 등 조건이라 <b>현역 복무 자체로는 되기 어려워요.</b></div></li>
        <li><span class="tri">▲</span><div class="body"><b class="hl">전역 후 길이 열릴 수 있어요</b>전역해 중소기업에 취업하는 등 조건이 바뀌면 <b>우대형(12%) 경로</b>가 열릴 수 있어요. 가입 후에도 유형은 자동 재심사돼요.</div></li>
      </ul>
      <p class="secteaser" style="margin-top:var(--sp-3);font-size:var(--fs-caption)">근거: 금융위원회 정부기여금 지급비율 — 일반형 月납입의 6%, 우대형 12% 지급.</p>
    </section>

    <section class="card" id="sec-payout">
      <div class="seclabel"><span class="num">4</span><span class="txt">만기 수령액</span></div>
      <h2>군인 만기 수령액 — 월 납입별 (일반형 6% 기준)</h2>
      <p class="secteaser">군인은 보통 일반형이라 매칭률 6%로 계산해요. 3년(36개월) 만기 기준입니다.</p>
      <table class="calc-tbl">
        <thead><tr><th>월 납입</th><th>원금(36개월)</th><th>정부기여금(6%)</th><th>원금+기여금</th></tr></thead>
        <tbody>
          <tr><td>50만 원</td><td>1,800만</td><td>108만</td><td class="em">1,908만</td></tr>
          <tr><td>30만 원</td><td>1,080만</td><td>64.8만</td><td class="em">1,144.8만</td></tr>
          <tr><td>20만 원</td><td>720만</td><td>43.2만</td><td class="em">763.2만</td></tr>
          <tr><td>10만 원</td><td>360만</td><td>21.6만</td><td class="em">381.6만</td></tr>
        </tbody>
      </table>
      <div class="subnote" style="margin-top:var(--sp-4)"><b>계산 기준</b> = 월 납입금 × 6% × 36개월. 여기에 <b>은행 이자(전액 비과세)</b>가 더해져요. 이자는 가입 은행·금리에 따라 달라 위 표에는 넣지 않았어요.</div>
      <a class="calcbar" href="/free-savings/">
        <span class="ct">내 월 납입·금리로 만기 수령액 계산하기</span>
        <span class="cbtn">자유적금 계산기 →</span>
      </a>
    </section>

    <section class="card" id="sec-persona">
      <div class="seclabel"><span class="num">5</span><span class="txt">내 유형 찾기</span></div>
      <h2>나는 어떤 군인 유형일까?</h2>
      <p class="secteaser">대표 경우로 빠르게 가늠해 보세요. (실제 유형은 서민금융진흥원 심사로 확정돼요.)</p>
      <div class="personas">
        <div class="persona">
          <div class="role">현역 병사</div>
          <div class="situ">군장병급여만 있는 의무복무 병사</div>
          <div class="rec"><span class="lab">추천</span><span class="badge b">일반형 6%</span></div>
        </div>
        <div class="persona">
          <div class="role">직업군인(간부)</div>
          <div class="situ">장기복무 부사관·장교 · 장기간부도약적금과 중복 가입</div>
          <div class="rec"><span class="lab">추천</span><span class="badge b">일반형 6%</span></div>
        </div>
        <div class="persona">
          <div class="role">훈련소 입영</div>
          <div class="situ">기초군사훈련 중인 신병</div>
          <div class="rec"><span class="lab">방법</span><span class="badge n">부대 내 비대면 가입</span></div>
        </div>
        <div class="persona">
          <div class="role">전역 예정</div>
          <div class="situ">곧 전역해 중소기업 취업 예정</div>
          <div class="rec"><span class="lab">가능</span><span class="badge g">우대형 12%</span></div>
        </div>
      </div>
    </section>

    <section class="card" id="sec-overlap">
      <div class="seclabel"><span class="num">6</span><span class="txt">중복가입</span></div>
      <h2>군 적금과 중복가입 된다</h2>
      <p class="secteaser">이미 군 적금을 들고 있어도 괜찮아요. 청년미래적금은 따로 또 가입할 수 있어요.</p>
      <ul class="qa">
        <li><span class="tri">▲</span><div class="body"><b class="hl">병사 — 장병내일준비적금과 중복 OK</b>장병내일준비적금을 들고 있어도 청년미래적금에 <b>추가로 가입</b>할 수 있어요.</div></li>
        <li><span class="tri">▲</span><div class="body"><b class="hl">간부 — 장기간부도약적금과 중복 OK</b>장기간부도약적금 가입자도 청년미래적금을 <b>중복으로</b> 들 수 있어요.</div></li>
        <li><span class="tri">▲</span><div class="body"><b class="hl">단, 청년도약계좌와는 중복 불가</b>청년미래적금과 청년도약계좌는 <b>둘 중 하나만</b> 가입할 수 있어요. 갈아타기는 2026년 6월에 단 한 번.</div></li>
      </ul>
      <p class="secteaser" style="margin-top:var(--sp-3);font-size:var(--fs-caption)">근거: 금융위원회 — 장병내일준비적금 또는 장기간부도약적금과 청년미래적금의 중복가입 가능.</p>
    </section>

    <section class="card" id="sec-age">
      <div class="seclabel"><span class="num">7</span><span class="txt">군필 나이</span></div>
      <h2>군필자 나이 — 병역기간만큼 늘어난다</h2>
      <p class="secteaser">"만 35세 전역인데 늦었나?" 걱정 마세요. 병역 기간은 나이 계산에서 빠집니다.</p>
      <ul class="docs">
        <li><span>기본 가입 연령은 <b>만 19~34세</b></span></li>
        <li><span><b>병역 이행기간(최대 6년)은 나이 계산에서 제외</b> → 군필 남성은 <b>최대 만 40세까지</b> 가입 가능</span></li>
        <li><span>증빙: <b>병적증명서</b> (병역 기간만큼 나이 한도가 늘어요)</span></li>
      </ul>
    </section>

    <section class="card" id="sec-apply">
      <div class="seclabel"><span class="num">8</span><span class="txt">신청 방법</span></div>
      <h2>군인 청년미래적금 신청 방법 (3단계)</h2>
      <p class="secteaser">대부분 비대면·자동 심사라 군 복무 중에도 간단해요.</p>
      <div class="steps">
        <div class="st"><span class="sn">1</span><div class="sb"><b>취급은행 앱 또는 서민금융진흥원에서 신청</b>취급은행 앱이나 서민금융진흥원 청년금융에서 비대면으로 신청해요. 훈련소 안에서도 가능합니다.</div></div>
        <div class="st"><span class="sn">2</span><div class="sb"><b>소득·요건 자동 심사</b>서민금융진흥원이 군장병급여 등을 확인하고 유형을 자동으로 정해줘요. 군인은 대부분 일반형(6%).</div></div>
        <div class="st"><span class="sn">3</span><div class="sb"><b>적금 개설 후 납입 시작</b>승인되면 계좌를 만들고 월 최대 50만 원을 자유롭게 넣으면 끝. 3년 뒤 원금 + 정부기여금 + 비과세 이자를 받아요.</div></div>
      </div>
    </section>

    <section class="card" id="sec-caution">
      <div class="seclabel"><span class="num">!</span><span class="txt">감액·해지 주의</span></div>
      <h2>군인 신청 전 꼭 확인할 주의사항</h2>
      <p class="secteaser">아래는 손해 보지 않으려면 미리 알아둘 점이에요.</p>
      <div class="warn">
        <div class="wi"><span class="ic">⚠️</span><div class="wt"><b>중도해지 시 정부기여금은 원칙적으로 반환</b> — 3년 만기 유지가 가장 유리해요. 단 사망·해외이주 등 특별중도해지 사유는 예외.</div></div>
        <div class="wi"><span class="ic">⚠️</span><div class="wt"><b>청년도약계좌와 중복 불가</b> — 둘 중 하나만 가입할 수 있어요. 갈아타기는 2026년 6월에 단 한 번.</div></div>
        <div class="wi"><span class="ic">⚠️</span><div class="wt"><b>월 50만 원·연 600만 원 한도</b> — 자유적립식이라 형편 되는 만큼만 넣어도 돼요. 적게 넣으면 6% 매칭도 그만큼 줄어요.</div></div>
      </div>
    </section>

    <section class="card" id="sec-faq">
      <div class="seclabel"><span class="num">?</span><span class="txt">자주 묻는 질문 FAQ</span></div>
      <h2>군인 청년미래적금 자주 묻는 질문 (FAQ)</h2>
      <div class="faq" style="margin-top:var(--sp-6)">
        <details open>
          <summary><span class="q">Q.</span><span>병사 월급(군장병급여)만 있는데 가입되나요?</span><span class="plus">+</span></summary>
          <div class="ans">네. 군장병급여가 비과세소득이지만 <b>가입 자격 소득으로 인정</b>돼, 직전연도 일반 소득이 없어도 가입할 수 있어요.</div>
        </details>
        <details>
          <summary><span class="q">Q.</span><span>군인 만기 수령액은 얼마인가요?</span><span class="plus">+</span></summary>
          <div class="ans">일반형(6%) 기준 월 50만 원씩 3년이면 원금 1,800만 + 정부기여금 108만 = <b>약 1,908만 원</b>. 여기에 비과세 은행 이자가 더해져요.</div>
        </details>
        <details>
          <summary><span class="q">Q.</span><span>장병내일준비적금이랑 같이 들어도 되나요?</span><span class="plus">+</span></summary>
          <div class="ans">됩니다. 병사는 장병내일준비적금, 간부는 장기간부도약적금과 <b>중복가입</b>이 가능해요.</div>
        </details>
        <details>
          <summary><span class="q">Q.</span><span>군인도 12% 받을 수 있나요?</span><span class="plus">+</span></summary>
          <div class="ans">현역 복무 자체로는 보통 <b>일반형(6%)</b>이에요. 우대형(12%)은 중소기업 재직 등 별도 조건이라, 전역 후 조건이 바뀌어야 가능성이 열려요.</div>
        </details>
        <details>
          <summary><span class="q">Q.</span><span>만 35세 전역인데 늦었나요?</span><span class="plus">+</span></summary>
          <div class="ans">병역기간(최대 6년)이 나이에서 빠지므로 군필 남성은 <b>최대 만 40세까지</b> 가능해요. 병적증명서로 증빙하세요.</div>
        </details>
        <details>
          <summary><span class="q">Q.</span><span>훈련소에 있는데 어떻게 신청하나요?</span><span class="plus">+</span></summary>
          <div class="ans">기초군사훈련 중에도 부대 안에서 <b>비대면</b>으로 신청·계좌개설이 가능해요. 취급은행 앱 또는 서민금융진흥원 청년금융에서 진행합니다.</div>
        </details>
        <details>
          <summary><span class="q">Q.</span><span>전역하면 적금은 어떻게 되나요?</span><span class="plus">+</span></summary>
          <div class="ans">3년 만기까지 유지하면 돼요. 전역해도 계좌는 그대로 두고 계속 납입하면 만기에 원금+정부기여금+비과세 이자를 받습니다.</div>
        </details>
        <details>
          <summary><span class="q">Q.</span><span>월급이 적은데 소액만 넣어도 되나요?</span><span class="plus">+</span></summary>
          <div class="ans">네. 자유적립식이라 매월 형편껏 넣고 최대 50만 원까지 가능해요. 많이 넣을수록 6% 매칭도 커집니다.</div>
        </details>
        <details>
          <summary><span class="q">Q.</span><span>군인도 비과세 혜택을 받나요?</span><span class="plus">+</span></summary>
          <div class="ans">네. 청년미래적금은 이자소득세가 전액 비과세예요. 군인도 동일하게 적용됩니다.</div>
        </details>
      </div>
    </section>

    <section class="card" id="sec-related">
      <div class="seclabel"><span class="num">↗</span><span class="txt">관련 계산기·가이드</span></div>
      <h2>가입 전, 내 숫자로 미리 확인하세요</h2>
      <p class="secteaser">군인은 보통 일반형 6%. 자격 판단부터 만기 수령액까지 머니닥 계산기로 바로 확인할 수 있어요.</p>
      <div class="rellinks">
        <a class="rel" href="/free-savings/"><span class="rt">자유적금 계산기 →</span><span class="rd">월 납입·금리별 3년 만기 수령액</span></a>
        <a class="rel" href="/gov/youth-future-savings-guide/"><span class="rt">청년미래적금 총정리 →</span><span class="rd">가입조건·정부기여금·신청일정 (허브)</span></a>
        <a class="rel" href="/median-income/"><span class="rt">중위소득 계산기 →</span><span class="rd">내 가구 중위소득 % 확인</span></a>
      </div>
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
  "mainEntity": [
    { "@type": "Question", "name": "병사 월급(군장병급여)만 있는데 가입되나요?", "acceptedAnswer": { "@type": "Answer", "text": "네. 군장병급여가 비과세소득이지만 가입 자격 소득으로 인정돼, 직전연도 일반 소득이 없어도 가입할 수 있어요." } },
    { "@type": "Question", "name": "군인 만기 수령액은 얼마인가요?", "acceptedAnswer": { "@type": "Answer", "text": "일반형(6%) 기준 월 50만 원씩 3년이면 원금 1,800만 + 정부기여금 108만 = 약 1,908만 원. 여기에 비과세 은행 이자가 더해져요." } },
    { "@type": "Question", "name": "장병내일준비적금이랑 같이 들어도 되나요?", "acceptedAnswer": { "@type": "Answer", "text": "됩니다. 병사는 장병내일준비적금, 간부는 장기간부도약적금과 중복가입이 가능해요." } },
    { "@type": "Question", "name": "군인도 12% 받을 수 있나요?", "acceptedAnswer": { "@type": "Answer", "text": "현역 복무 자체로는 보통 일반형(6%)이에요. 우대형(12%)은 중소기업 재직 등 별도 조건이라, 전역 후 조건이 바뀌어야 가능성이 열려요." } },
    { "@type": "Question", "name": "만 35세 전역인데 늦었나요?", "acceptedAnswer": { "@type": "Answer", "text": "병역기간(최대 6년)이 나이에서 빠지므로 군필 남성은 최대 만 40세까지 가능해요. 병적증명서로 증빙하세요." } },
    { "@type": "Question", "name": "훈련소에 있는데 어떻게 신청하나요?", "acceptedAnswer": { "@type": "Answer", "text": "기초군사훈련 중에도 부대 안에서 비대면으로 신청·계좌개설이 가능해요. 취급은행 앱 또는 서민금융진흥원 청년금융에서 진행합니다." } },
    { "@type": "Question", "name": "전역하면 적금은 어떻게 되나요?", "acceptedAnswer": { "@type": "Answer", "text": "3년 만기까지 유지하면 돼요. 전역해도 계좌는 그대로 두고 계속 납입하면 만기에 원금+정부기여금+비과세 이자를 받습니다." } },
    { "@type": "Question", "name": "월급이 적은데 소액만 넣어도 되나요?", "acceptedAnswer": { "@type": "Answer", "text": "네. 자유적립식이라 매월 형편껏 넣고 최대 50만 원까지 가능해요. 많이 넣을수록 6% 매칭도 커집니다." } },
    { "@type": "Question", "name": "군인도 비과세 혜택을 받나요?", "acceptedAnswer": { "@type": "Answer", "text": "네. 청년미래적금은 이자소득세가 전액 비과세예요. 군인도 동일하게 적용됩니다." } }
  ]
};
