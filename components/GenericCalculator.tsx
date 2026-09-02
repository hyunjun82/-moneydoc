"use client";

import { useState, useMemo } from "react";
import { calculators } from "@/lib/calc/engine";
import { krw, parseKrw } from "@/lib/format";

type InputDef = {
  id: string;
  label: string;
  type?: string;
  min?: number;
  max?: number;
  step?: number;
  default?: unknown;
  hint?: string;
  options?: { value: unknown; label: string }[] | string[];
  unit?: string;
};

type Spec = {
  slug: string;
  inputs: InputDef[];
  verification?: {
    cases?: { expected?: Record<string, unknown> }[];
  };
};

// 결과 키 → 한국어 라벨
const OUTPUT_LABELS: Record<string, string> = {
  // ltv/대출 — 누락분
  leaseDeductTotal: "임차보증금 공제",
  priorityClaim: "최우선변제 한도",
  feePct: "수수료율",
  rateInRange: "약정 범위 내",
  // 모드/구분
  mode: "상환방식",
  accountType: "ISA 유형",
  taxFree: "비과세 적용",
  category: "주택보유 상태",
  regionType: "지역 구분",
  area: "소액보증금 지역",
  roomDeduction: "방 공제",
  stressDSR: "스트레스 DSR",
  appliedRate: "적용 금리",
  // 급여 / 4대보험
  netMonthly: "월 실수령액",
  grossMonthly: "월 세전 급여",
  monthly: "월 환산",
  totalDeduction: "총 공제액",
  totalInsurance: "4대보험 합계",
  nationalPension: "국민연금",
  np: "국민연금",
  healthInsurance: "건강보험",
  hi: "건강보험",
  longTermCare: "장기요양보험",
  ltc: "장기요양보험",
  employmentInsurance: "고용보험",
  ei: "고용보험",
  wc: "산재보험",
  employeeNP: "근로자 국민연금",
  employerNP: "사업주 국민연금",
  employeeEI: "근로자 고용보험",
  employerEI: "사업주 고용보험",
  employee: "근로자 부담",
  employer: "사업주 부담",
  companyPay: "회사 부담",
  selfPay: "본인 부담",
  // 소득세 / 세액
  monthlyIncomeTax: "소득세 (월)",
  monthlyLocalTax: "지방소득세 (월)",
  annualIncomeTax: "연 소득세",
  totalIncomeTax: "총 소득세",
  incomeTax: "소득세",
  taxBeforeCredit: "산출세액",
  taxBeforeLocal: "결정세액 (지방세 전)",
  taxBeforeSeniorDed: "공제 전 세액",
  seniorDed: "고령자 공제",
  taxableIncome: "과세표준",
  taxable: "과세표준",
  taxableBase: "과세표준",
  taxableGain: "양도차익",
  earnedIncomeDeduction: "근로소득공제",
  personalDeduction: "인적공제",
  spouseDeduction: "배우자 공제",
  funeral: "장례비용 공제",
  appliedSalary: "산정 기준 통상임금 (최저임금 하한 적용)",
  homes: "주택 수",
  totalValue: "공시가격 합계",
  isOneHome: "1세대 1주택",
  ratePct: "적용 세율 (%)",
  heavy: "중과세율 적용",
  taxBeforePropertyCredit: "재산세공제 전 종부세",
  propertyTaxCredit: "공제할 재산세액",
  calcTax: "산출세액",
  ageCredit: "고령자 세액공제",
  holdingCredit: "장기보유 세액공제",
  creditTotal: "세액공제 합계 (80% 한도)",
  compPayable: "종부세 납부액 (농특세 포함)",
  propertyTaxTotal: "재산세 합계",
  taxableValue: "과세가액",
  filingCredit: "신고세액공제 (3%)",
  payableTax: "납부할 세액",
  incomeTax100: "간이세액표 소득세 (100%)",
  childAdjust: "자녀 조정 차감",
  earnedIncomeCredit: "근로소득세액공제",
  childCredit: "자녀세액공제",
  newbornCredit: "출산입양 공제",
  taxCredit: "세액공제",
  regularCredit: "기본 공제",
  decisionTax: "결정세액",
  localTax: "지방소득세",
  totalTax: "총 세금",
  marginalRate: "한계세율",
  taxRate: "세율",
  rate: "요율",
  baseRate: "기본 요율",
  ltbcRate: "장기보유특별공제율",
  reductionRate: "감면율",
  // 부동산 세금
  acquisitionTax: "취득세",
  registrationTax: "등록면허세",
  brokerageFee: "중개수수료",
  totalFee: "총 수수료",
  vat: "부가세",
  educationTax: "교육세",
  ruralTax: "농어촌특별세",
  propertyTax: "재산세",
  propertyEduTax: "지방교육세",
  compTax: "종합부동산세",
  generalTax: "일반세",
  transferTax: "양도세",
  longTermDeduction: "장기보유특별공제",
  yearsDed: "보유기간 공제",
  // 대출 / 금융
  monthlyPayment: "월 상환액",
  monthlyInterest: "월 이자",
  totalInterest: "총 이자",
  totalPayment: "총 상환액",
  totalRepayment: "총 상환액",
  maxLoan: "최대 대출 한도",
  depositRatio: "대출 가능 금액 (보증금 × 보증비율)",
  appliedLimit: "적용 한도 (보증한도 cap 적용)",
  ltvLimit: "LTV 한도",
  dsrLimitAmount: "DSR 한도 금액",
  dsrPct: "DSR",
  dtiPct: "DTI",
  ltvPct: "LTV",
  ltv: "LTV",
  graceMonthlyInterest: "거치 월 이자",
  totalGraceInterest: "거치기간 총 이자",
  phase1Monthly: "1단계 월액",
  phase2Monthly: "2단계 월액",
  newMonthly: "신규 월 상환",
  oldMonthly: "기존 월 상환",
  newTotal: "신규 총 상환",
  oldTotal: "기존 총 상환",
  diff: "차액",
  savings: "절감액",
  fee: "수수료",
  // 저축 / 만기
  maturityAmount: "만기 수령액",
  maturity: "만기액",
  compoundMaturity: "복리 만기",
  simpleMaturity: "단리 만기",
  totalDeposit: "총 납입액",
  totalContribution: "총 납입액",
  annualContribution: "연 납입액",
  monthlyContribution: "월 납입액",
  monthlyMatching: "월 매칭금",
  matchingTotal: "정부 기여금",
  govPay: "정부 지원금",
  ownTotal: "본인 납입",
  expectedBalance: "예상 잔액",
  totalNet: "세후 합계",
  netPayment: "세후 지급액",
  taxOnInterest: "이자소득세",
  netInterest: "세후 이자",
  interest: "이자",
  simpleInterest: "단리 이자",
  compoundInterest: "복리 이자",
  isaTax: "ISA 세금",
  taxSaving: "절세액",
  // 연금
  monthlyPension: "월 연금액",
  yearlyPension: "연 연금액",
  annualPension: "연 연금액",
  reducedPension: "감액 연금",
  yearsEarly: "조기수령 연수",
  dbAmount: "DB형 퇴직금",
  // 실업급여
  benefitDays: "수급 가능 일수",
  dailyBenefit: "일 수급액",
  totalBenefit: "총 수급액",
  rawBenefit: "기본 수급액",
  rawDailyWage: "평균임금",
  avgDailyWage: "평균임금",
  dailyAvgWage: "일평균임금",
  remainingDays: "잔여 일수",
  // 자격 판정
  isEligible: "자격",
  isExpired: "기한 경과",
  isNonTaxable: "비과세 여부",
  applied: "적용 여부",
  appliedAmount: "적용 금액",
  // 법률
  childSupport: "월 양육비",
  alimony: "위자료 예상액",
  severancePay: "퇴직금",
  severance: "퇴직금",
  hourlyWage: "시급",
  netDailyWage: "세후 일급",
  dailyTax: "일 소득세",
  dailyLocalTax: "일 지방세",
  totalDailyDeduct: "일 공제 합계",
  unpaidAmount: "미지급 금액",
  nonCustodianShare: "비양육자 부담 비율",
  standardSupport: "표준양육비",
  // 상속 / 증여
  inheritanceTax: "상속세",
  giftTax: "증여세",
  spouse: "배우자",
  child: "자녀",
  parent: "부모",
  sibling: "형제",
  // 부동산 수익
  rentalYield: "임대수익률",
  grossYieldPct: "표면수익률",
  netYieldPct: "실질수익률",
  monthlyRent: "월세",
  baseRent: "기본 임대료",
  jeonseEquivalent: "전세 환산",
  conversionAmount: "전월세 전환",
  annualRentIncome: "연 임대소득",
  netCost: "순 비용",
  netLoss: "순 손실",
  totalBuyCost: "총 매수 비용",
  totalJeonseCost: "총 전세 비용",
  totalCollegeCost: "총 대학 등록금",
  futureTuition: "미래 등록금",
  yearsToCollege: "대학 진학까지 연수",
  monthlyNeeded: "월 필요액",
  monthlySaving: "월 저축액",
  totalROI: "총 수익률",
  annualROI: "연 수익률",
  investedCapital: "투자 자본",
  profit: "수익",
  gain: "이익",
  // 정부지원금 / 복지
  livelihood: "생계급여",
  livelihoodBase: "생계급여 기준",
  medical: "의료급여",
  housing: "주거급여",
  education: "교육급여",
  median30: "중위 30%",
  median40: "중위 40%",
  median47: "중위 47%",
  median50: "중위 50%",
  median100: "중위 100%",
  threshold: "기준액",
  incomeAmount: "소득인정액",
  incomePct: "소득 백분위",
  monthlySupport: "월 지원금",
  annualSupport: "연 지원금",
  monthlyAvailable: "월 수령 가능",
  monthlyAvail: "월 수령 가능",
  parentalAllowance0: "부모급여 0세",
  parentalAllowance1: "부모급여 1세",
  childAllowance: "아동수당",
  newLevel: "변경 단계",
  tier: "단계",
  estimatedAmount: "예상 금액",
  // 보험
  monthlyPremium: "월 보험료",
  annualPremium: "연 보험료",
  adjustedPremium: "조정 보험료",
  ageMultiplier: "연령 배수",
  faultMultiplier: "할증 배수",
  ageGroup: "연령 그룹",
  reimbursement: "환급금",
  surrender: "해지환급금",
  payable: "지급액",
  surcharge: "할증료",
  // 청약
  totalPoints: "총 가점",
  noHomeOk: "무주택 자격",
  noHomeScore: "무주택 가점",
  accountOk: "통장 자격",
  accountScore: "통장 가점",
  familyScore: "부양가족 가점",
  depositOk: "납입 자격",
  // 시뮬레이션
  totalCost: "총 비용",
  totalSaving: "총 저축",
  totalPaid: "총 납부",
  totalPay: "총 지급",
  totalReturn: "총 환급",
  total: "총계",
  furniture: "가구",
  wedding: "예식",
  incentive: "인센티브",
  fundNet: "펀드 순수익",
  fixedNet: "예금 순수익",
  savingsNet: "적금 순수익",
  // 일반 / 기타
  refund: "환급액",
  expense: "지출",
  baseAmount: "기준 금액",
  baseTax: "기준 세액",
  principal: "원금",
  excess: "초과액",
  limit: "한도",
  maxAmount: "한도액",
  result: "결과",
  amount: "금액",
  // 날짜 / 기간
  days: "일수",
  months: "개월수",
  years: "연수",
  totalDays: "총 일수",
  threeMonthTotal: "3개월 합계",
  westAge: "만나이",
  koreanAge: "한국나이",
  zodiac: "띠",
  deadline: "기한",
  firstMeeting: "최초 면담일",
  firstPayment: "첫 달 상환",
  lastPayment: "마지막 달 상환",
  repayMonthly: "월 상환금",
  // 미분류
  netAnnualIncome: "연 순소득",
  discountRatePct: "할인율 (%)",
  userPct: "사용자 비율 (%)",
  year: "연도",
  support: "지원금",
  allowance: "수당",
  dailyWage: "일급",
  deduction: "공제액",
  tax: "세금",
  monthlyAvg: "월 평균",
  annualConverted: "연 환산",
};

function outputLabel(key: string): string {
  return OUTPUT_LABELS[key] ?? key;
}

function formatValue(v: unknown, unit?: string, key?: string): string {
  if (v === null || v === undefined) return "—";
  if (typeof v === "boolean") return v ? "O" : "X";
  if (typeof v === "number") {
    if (unit === "%") {
      // Pct 키 = 이미 percent 형태 (예: 17.1), Rate/Ratio 키 = 소수 형태 (예: 0.01)
      // Pct 키여도 절댓값 < 1이면 소수 형태로 간주 (예: feePct=0.012 → 1.2%)
      const isAlreadyPercent = key ? (/Pct|Pcnt/i.test(key) && Math.abs(v) >= 1) : v >= 1;
      const display = isAlreadyPercent ? v : v * 100;
      return `${display.toFixed(2)}%`;
    }
    if (unit === "년" || unit === "개월" || unit === "일") return `${v}${unit}`;
    // 단위 없는 카운트 키 (정확 매칭만)
    if (key && (/^(year|months|days|totalDays|yearsToCollege|yearsEarly|yearsDed|remainingDays|benefitDays|kids|dependents|tier|newLevel|westAge|koreanAge|ageGroup|ageMultiplier)$/.test(key) || /Score$/.test(key))) {
      return String(v);
    }
    return krw(v);
  }
  if (typeof v === "string") return v;
  if (typeof v === "object") return JSON.stringify(v);
  return String(v);
}

function isPercentKey(key: string): boolean {
  // 금액 키 (Rate/Ratio가 들어있어도 금액 — 명시적 예외)
  if (/^baseRate$|^hourlyRate$|^monthlyRate$|^dailyRate$|^baseAmount$|^depositRatio$/i.test(key)) return false;
  return /Pct|Rate(?!s)|Ratio|Pcnt|^ltv$|^dti$|^dsr$|^userPct/i.test(key);
}

function isDateKey(key: string): boolean {
  return /Date|date$/i.test(key);
}

function isBooleanKey(key: string, val: unknown): boolean {
  return typeof val === "boolean" || /^is[A-Z]/.test(key);
}

function pickPrimaryOutput(expected: Record<string, unknown>, inputs: InputDef[]): string {
  // 1. priority keys
  const priority = [
    "netMonthly",
    "inheritanceTax",
    "giftTax",
    "transferTax",
    "acquisitionTax",
    "totalTax",
    "brokerageFee",
    "totalCost",
    "maturityAmount",
    "monthlyPayment",
    "totalBenefit",
    "monthlyPension",
    "severancePay",
    "maxLoan",
    "totalDeduction",
    "refund",
    "taxCredit",
    "taxSaving",
    "estimatedAmount",
    "payable",
    "tax",
    "total",
    "totalSaving",
    "totalPay",
    "totalReturn",
    "result",
    "decisionTax",
    "annualPension",
    "yearlyPension",
    "rentalYield",
    "totalInsurance",
    "monthlyPremium",
    "annualPremium",
  ];
  for (const k of priority) {
    if (k in expected) return k;
  }
  // fallback: largest numeric value
  const numeric = Object.entries(expected).filter(([, v]) => typeof v === "number");
  if (numeric.length) {
    numeric.sort((a, b) => Math.abs(b[1] as number) - Math.abs(a[1] as number));
    return numeric[0][0];
  }
  return Object.keys(expected)[0];
}

export function GenericCalculator({ spec }: { spec: Spec }) {
  const [values, setValues] = useState<Record<string, unknown>>(() => {
    const v: Record<string, unknown> = {};
    for (const inp of spec.inputs ?? []) {
      v[inp.id] = inp.default ?? (inp.type === "stepper" || inp.type === "number" ? 0 : "");
    }
    return v;
  });

  const calcFn = calculators[spec.slug];
  const expected = spec.verification?.cases?.[0]?.expected ?? {};
  const primaryKey = pickPrimaryOutput(expected, spec.inputs ?? []);

  const result = useMemo(() => {
    if (!calcFn) return null;
    try {
      return calcFn(values, spec as unknown as Record<string, unknown>) as Record<string, unknown>;
    } catch (e) {
      return null;
    }
  }, [values, calcFn, spec]);

  if (!calcFn) {
    return (
      <section className="main">
        <div className="panel" style={{ padding: 32, textAlign: "center" }}>
          이 계산기는 곧 추가됩니다.
        </div>
      </section>
    );
  }

  const update = (id: string, v: unknown) => setValues((s) => ({ ...s, [id]: v }));

  const expectedKeys = Object.keys(expected);
  const breakdownKeys = expectedKeys.filter((k) => k !== primaryKey);
  const primaryVal = result?.[primaryKey];
  const primaryUnit = isPercentKey(primaryKey) ? "%" : isBooleanKey(primaryKey, primaryVal) ? "" : "원";
  const primaryDisplay = formatValue(primaryVal, primaryUnit, primaryKey);

  return (
    <section className="main">
      <div className="calc-grid">
        {/* INPUT */}
        <div className="panel">
          <div className="panel-head">
            <span className="panel-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4z" />
              </svg>
            </span>
            <h2 className="panel-title">정보 입력</h2>
          </div>

          {(spec.inputs ?? []).map((inp) => (
            <InputField key={inp.id} def={inp} value={values[inp.id]} onChange={(v) => update(inp.id, v)} />
          ))}
        </div>

        {/* RESULT */}
        <div className="panel">
          <div className="panel-head">
            <span className="panel-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3v18h18" />
                <path d="M18 17V9M13 17V5M8 17v-3" />
              </svg>
            </span>
            <h2 className="panel-title">계산 결과</h2>
          </div>

          {result ? (
            <>
              <div className="result-hero">
                <div className="result-label">{outputLabel(primaryKey)}</div>
                <div>
                  <span className="result-value">{primaryDisplay}</span>
                  {primaryUnit && primaryUnit !== "%" && primaryDisplay !== "O" && primaryDisplay !== "X" && (
                    <span className="result-unit">{primaryUnit}</span>
                  )}
                </div>
              </div>

              {breakdownKeys.length > 0 && (
                <div className="breakdown-list">
                  {breakdownKeys.map((key) => {
                    const v = result[key];
                    if (v === undefined || v === null) return null;
                    if (typeof v === "object" && !Array.isArray(v)) {
                      const obj = v as Record<string, unknown>;
                      return (
                        <div key={key} style={{ padding: "10px 0", borderBottom: "1px solid var(--line-soft)" }}>
                          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>
                            {outputLabel(key)}
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingLeft: 8 }}>
                            {Object.entries(obj).map(([k2, v2]) => {
                              if (v2 === null || v2 === undefined || typeof v2 === "object") return null;
                              return (
                                <div key={k2} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--text-2)" }}>
                                  <span>{outputLabel(k2)}</span>
                                  <span style={{ fontVariantNumeric: "tabular-nums", color: "var(--text)", fontWeight: 600 }}>
                                    {formatValue(v2, isPercentKey(k2) ? "%" : "", k2)}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    }
                    if (Array.isArray(v)) return null;
                    const unit = isPercentKey(key) ? "%" : "";
                    return (
                      <div key={key} className="b-row">
                        <span className="name">{outputLabel(key)}</span>
                        <span className="val">{formatValue(v, unit, key)}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          ) : (
            <div style={{ padding: 24, textAlign: "center", color: "var(--text-3)" }}>
              입력값을 확인해주세요.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function InputField({
  def,
  value,
  onChange,
}: {
  def: InputDef;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  const t = def.type ?? "number";

  if (t === "stepper") {
    const n = (value as number) ?? def.default ?? 0;
    return (
      <div className="input-row">
        <div className="input-label">
          <span className="name">{def.label}</span>
          {def.hint && <span className="hint">{def.hint}</span>}
        </div>
        <div className="stepper">
          <button
            type="button"
            onClick={() => onChange(Math.max(def.min ?? 0, n - 1))}
          >
            −
          </button>
          <span className="val">{n}</span>
          <button
            type="button"
            onClick={() => onChange(Math.min(def.max ?? 99, n + 1))}
          >
            +
          </button>
        </div>
      </div>
    );
  }

  if (t === "select" && def.options) {
    const opts = def.options.map((o) =>
      typeof o === "string" ? { value: o, label: o } : o
    );
    return (
      <div className="input-row">
        <div className="input-label">
          <span className="name">{def.label}</span>
          {def.hint && <span className="hint">{def.hint}</span>}
        </div>
        <div className="input-box">
          <select
            value={String(value ?? "")}
            onChange={(e) => {
              const raw = e.target.value;
              const matched = opts.find((o) => String(o.value) === raw);
              onChange(matched?.value ?? raw);
            }}
            style={{
              width: "100%",
              height: 46,
              padding: "0 16px",
              background: "var(--bg)",
              border: "1.5px solid var(--line)",
              borderRadius: 10,
              fontSize: 17,
              fontWeight: 600,
              color: "var(--text)",
              fontFamily: "inherit",
            }}
          >
            {opts.map((o) => (
              <option key={String(o.value)} value={String(o.value)}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  if (t === "boolean" || t === "checkbox") {
    return (
      <div className="input-row">
        <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={(e) => onChange(e.target.checked)}
            style={{ width: 18, height: 18 }}
          />
          <span style={{ fontSize: 14, fontWeight: 600 }}>{def.label}</span>
          {def.hint && <span className="hint">{def.hint}</span>}
        </label>
      </div>
    );
  }

  if (t === "date") {
    return (
      <div className="input-row">
        <div className="input-label">
          <span className="name">{def.label}</span>
          {def.hint && <span className="hint">{def.hint}</span>}
        </div>
        <div className="input-box">
          <input
            type="date"
            value={String(value ?? "")}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      </div>
    );
  }

  if (t === "text") {
    return (
      <div className="input-row">
        <div className="input-label">
          <span className="name">{def.label}</span>
          {def.hint && <span className="hint">{def.hint}</span>}
        </div>
        <div className="input-box">
          <input
            type="text"
            value={String(value ?? "")}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      </div>
    );
  }

  // currency or number (default)
  const isCurrency = t === "currency";
  const n = (value as number) ?? def.default ?? 0;
  return (
    <div className="input-row">
      <div className="input-label">
        <span className="name">{def.label}</span>
        {def.hint && <span className="hint">{def.hint}</span>}
      </div>
      <div className="input-box">
        <input
          type="text"
          inputMode="numeric"
          value={isCurrency ? n.toLocaleString("ko-KR") : String(n)}
          onChange={(e) => {
            const num = isCurrency ? parseKrw(e.target.value) : Number(String(e.target.value).replace(/[^0-9.\-]/g, "")) || 0;
            onChange(num);
          }}
        />
        <span className="input-suffix">{def.unit ?? (isCurrency ? "원" : "")}</span>
      </div>
      {def.min !== undefined && def.max !== undefined && (
        <input
          type="range"
          className="slider"
          min={def.min}
          max={def.max}
          step={def.step ?? 1}
          value={Math.min(Math.max(n, def.min), def.max)}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      )}
    </div>
  );
}
