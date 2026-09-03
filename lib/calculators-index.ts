import { hubHref } from "@/lib/hub-map";
import basicLivelihoodEligibility from "@/data/calculators/government/basic-livelihood-eligibility.json";
import basicPension from "@/data/calculators/government/basic-pension.json";
import earnedIncomeTaxCredit from "@/data/calculators/government/earned-income-tax-credit.json";
import industrialAccidentPay from "@/data/calculators/government/industrial-accident-pay.json";
import maternityLeavePay from "@/data/calculators/government/maternity-leave-pay.json";
import medianIncome from "@/data/calculators/government/median-income.json";
import nationalScholarship from "@/data/calculators/government/national-scholarship.json";
import nearPoorEligibility from "@/data/calculators/government/near-poor-eligibility.json";
import parentalLeavePay from "@/data/calculators/government/parental-leave-pay.json";
import singleParentSupport from "@/data/calculators/government/single-parent-support.json";
import unemploymentBenefit from "@/data/calculators/government/unemployment-benefit.json";
import autoTax from "@/data/calculators/insurance/auto-tax.json";
import medicalInsurancePayout from "@/data/calculators/insurance/medical-insurance-payout.json";
import annualLeaveAllowance from "@/data/calculators/law/annual-leave-allowance.json";
import childSupport from "@/data/calculators/law/child-support.json";
import divorceAlimony from "@/data/calculators/law/divorce-alimony.json";
import inheritanceShare from "@/data/calculators/law/inheritance-share.json";
import severancePay from "@/data/calculators/law/severance-pay.json";
import unpaidWages from "@/data/calculators/law/unpaid-wages.json";
import creditLoan from "@/data/calculators/loan/credit-loan.json";
import dsrLimit from "@/data/calculators/loan/dsr-limit.json";
import dtiLimit from "@/data/calculators/loan/dti-limit.json";
import jeonseLoan from "@/data/calculators/loan/jeonse-loan.json";
import loanAmortization from "@/data/calculators/loan/loan-amortization.json";
import loanRefinance from "@/data/calculators/loan/loan-refinance.json";
import ltvLimit from "@/data/calculators/loan/ltv-limit.json";
import mortgageLoanLimit from "@/data/calculators/loan/mortgage-loan-limit.json";
import prepaymentFee from "@/data/calculators/loan/prepayment-fee.json";
import irpTaxCredit from "@/data/calculators/pension/irp-tax-credit.json";
import nationalPensionEarly from "@/data/calculators/pension/national-pension-early.json";
import nationalPension from "@/data/calculators/pension/national-pension.json";
import noranumbrellaTaxSaving from "@/data/calculators/pension/noranumbrella-tax-saving.json";
import acquisitionTax from "@/data/calculators/realestate/acquisition-tax.json";
import brokerageFee from "@/data/calculators/realestate/brokerage-fee.json";
import comprehensiveRealEstateTax from "@/data/calculators/realestate/comprehensive-real-estate-tax.json";
import holdingTaxTotal from "@/data/calculators/realestate/holding-tax-total.json";
import housingSubscriptionScore from "@/data/calculators/realestate/housing-subscription-score.json";
import jeonseMonthlyConversion from "@/data/calculators/realestate/jeonse-monthly-conversion.json";
import propertyTax from "@/data/calculators/realestate/property-tax.json";
import realEstateRoi from "@/data/calculators/realestate/real-estate-roi.json";
import rentalYield from "@/data/calculators/realestate/rental-yield.json";
import transferTax from "@/data/calculators/realestate/transfer-tax.json";
import fixedDeposit from "@/data/calculators/savings/fixed-deposit.json";
import freeSavings from "@/data/calculators/savings/free-savings.json";
import installmentSavings from "@/data/calculators/savings/installment-savings.json";
import isaTaxSaving from "@/data/calculators/savings/isa-tax-saving.json";
import businessIncomeTaxSimple from "@/data/calculators/tax/business-income-tax-simple.json";
import childTaxCredit from "@/data/calculators/tax/child-tax-credit.json";
import comprehensiveIncomeTax from "@/data/calculators/tax/comprehensive-income-tax.json";
import cryptoTransferTax from "@/data/calculators/tax/crypto-transfer-tax.json";
import dailyWageTax from "@/data/calculators/tax/daily-wage-tax.json";
import fourMajorInsurance from "@/data/calculators/tax/four-major-insurance.json";
import freelancerTax from "@/data/calculators/tax/freelancer-tax.json";
import giftTax from "@/data/calculators/tax/gift-tax.json";
import inheritanceTax from "@/data/calculators/tax/inheritance-tax.json";
import otherIncomeTax from "@/data/calculators/tax/other-income-tax.json";
import retirementIncomeTax from "@/data/calculators/tax/retirement-income-tax.json";
import salaryNetPay from "@/data/calculators/tax/salary-net-pay.json";
import stockTransferTax from "@/data/calculators/tax/stock-transfer-tax.json";
import vatGeneral from "@/data/calculators/tax/vat-general.json";
import vatSimplified from "@/data/calculators/tax/vat-simplified.json";
import ageCalculator from "@/data/calculators/util/age-calculator.json";
import cashServiceFee from "@/data/calculators/util/cash-service-fee.json";
import dateCalculator from "@/data/calculators/util/date-calculator.json";
import installmentFee from "@/data/calculators/util/installment-fee.json";
import percentCalculator from "@/data/calculators/util/percent-calculator.json";


export type CategorySlug =
  | "savings"
  | "loan"
  | "realestate"
  | "tax"
  | "insurance"
  | "pension"
  | "law"
  | "government"
  | "util";

export const CATEGORIES: Record<CategorySlug, { slug: CategorySlug; name: string; href: string }> = {
  savings: { slug: "savings", name: "저축", href: "/savings/" },
  loan: { slug: "loan", name: "대출", href: "/loan/" },
  realestate: { slug: "realestate", name: "부동산", href: "/realestate/" },
  tax: { slug: "tax", name: "세금", href: "/tax/" },
  insurance: { slug: "insurance", name: "보험", href: "/insurance/" },
  pension: { slug: "pension", name: "연금", href: "/pension/" },
  law: { slug: "law", name: "법률", href: "/law/" },
  government: { slug: "government", name: "정부지원금", href: "/gov/" },
  util: { slug: "util", name: "유틸", href: "/util/" },
};

export type CalcMeta = {
  slug: string;
  category: CategorySlug;
  categoryName: string;
  title: string;
  subtitle: string;
  href: string;
};

const ALL_SPECS: { slug: string; category: string; title: string; subtitle: string; }[] = [
  basicLivelihoodEligibility,
  basicPension,
  earnedIncomeTaxCredit,
  industrialAccidentPay,
  maternityLeavePay,
  medianIncome,
  nationalScholarship,
  nearPoorEligibility,
  parentalLeavePay,
  singleParentSupport,
  unemploymentBenefit,
  autoTax,
  medicalInsurancePayout,
  annualLeaveAllowance,
  childSupport,
  divorceAlimony,
  inheritanceShare,
  severancePay,
  unpaidWages,
  creditLoan,
  dsrLimit,
  dtiLimit,
  jeonseLoan,
  loanAmortization,
  loanRefinance,
  ltvLimit,
  mortgageLoanLimit,
  prepaymentFee,
  irpTaxCredit,
  nationalPensionEarly,
  nationalPension,
  noranumbrellaTaxSaving,
  acquisitionTax,
  brokerageFee,
  comprehensiveRealEstateTax,
  holdingTaxTotal,
  housingSubscriptionScore,
  jeonseMonthlyConversion,
  propertyTax,
  realEstateRoi,
  rentalYield,
  transferTax,
  fixedDeposit,
  freeSavings,
  installmentSavings,
  isaTaxSaving,
  businessIncomeTaxSimple,
  childTaxCredit,
  comprehensiveIncomeTax,
  cryptoTransferTax,
  dailyWageTax,
  fourMajorInsurance,
  freelancerTax,
  giftTax,
  inheritanceTax,
  otherIncomeTax,
  retirementIncomeTax,
  salaryNetPay,
  stockTransferTax,
  vatGeneral,
  vatSimplified,
  ageCalculator,
  cashServiceFee,
  dateCalculator,
  installmentFee,
  percentCalculator
];

export const CALCULATORS_INDEX: Record<string, CalcMeta> = Object.fromEntries(
  ALL_SPECS.map((spec) => [
    spec.slug,
    {
      slug: spec.slug,
      category: spec.category as CategorySlug,
      categoryName: CATEGORIES[spec.category as CategorySlug]?.name ?? spec.category,
      title: spec.title,
      subtitle: spec.subtitle,
      href: hubHref(spec.category, spec.slug),
    },
  ])
);

export const GUIDE_TABLE_TITLES: Record<string, string> = {
  insuranceRates2026: "4대보험 요율 (2026년 기준)",
  bracketTable: "월 납입금별 만기 수령액 (연 4% 복리, 세후)",
  depositBracketTable: "예치 원금별 만기 수령액 (연 4%, 세후)",
  isaBracketTable: "ISA 5년 누적 이자별 절세액 (일반형 vs 서민형)",
  freeSavingsBracketTable: "월 평균 납입금별 자유적금 만기액 (연 4%, 세후)",
  regionalLtvTable: "주택유형·지역별 LTV 비율 (2025.6.27 강화)",
  housingDepositTable: "주택 소액보증금 최우선변제금액 (2026.1.2 시행)",
  commercialDepositTable: "상가 소액보증금 최우선변제금액",
  modeComparison: "상환방식별 비교 (1억 / 30년 / 4% 기준)",
  amountExamples: "원금별 월 상환·총 이자 (30년 / 4% / 원리금균등)",
  dsrLimitTable: "금융권별 DSR 한도",
  stressDsrTable: "스트레스 DSR 단계별 가산금리",
  dtiLimitTable: "지역·구분별 DTI 한도",
  mortgageRulesTable: "주담대 규제 한눈에 (LTV·DSR·6억 cap)",
  creditTierTable: "신용점수 구간별 한도·금리",
  guaranteeTable: "전세자금대출 보증기관 비교 (HF·HUG·SGI)",
  refinanceTable: "대출 갈아타기 체크리스트",
  feeTable: "대출 종류별 중도상환수수료율",
  dsrIncomeTable: "연봉별 DSR 한도 (DSR 40% / 30년 / 4% / 미적용 vs 3단계)",
  dtiIncomeTable: "연봉별 DTI 한도 (30년 / 4% / DTI 50% vs 60%)",
  ltvPriceTable: "주택 가격별 LTV 한도 (지역·6억 cap 비교)",
  mortgageScenarioTable: "주담대 한도 시나리오 (LTV vs DSR 어느 것이 결정?)",
  creditIncomeTable: "연봉별 신용대출 한도 (1배 / 1.5배 / DSR 영향 후)",
  jeonseDepositTable: "전세 보증금별 대출 한도 (HF·HUG·SGI 80~90%)",
  refinanceSavingTable: "갈아타기 절약 시뮬 (잔액별 / 금리차별)",

  acquisitionRateTable: "취득세 케이스별 세율 (1주택·다주택·생애최초)",
  brokerageRateTable: "매매가격별 중개수수료 상한 요율",
  comprehensiveTaxTable: "종부세 공시가별 과세 (1주택·다주택)",
  holdingTaxTable: "공시가별 보유세 합계 (재산세+종부세+지방교육세)",
  subscriptionScoreTable: "무주택기간별 청약 가점",
  subscriptionFamilyTable: "부양가족별 청약 가점",
  conversionTable: "전월세 전환 케이스별 월세 (5% / 6%)",
  roiCaseTable: "부동산 ROI 시나리오 (자본이득 포함)",
  rentalYieldTable: "임대수익률 케이스별 (총·순수익률)",
  prepaymentBalanceTable: "잔액별 중도상환수수료 (1.0% / 1.4% / 3년 면제)",
  calcMethodTable: "계산 방식 비교 (표준 PMT vs HF 일할)",
  depositRateTable: "원금별 정기예금 만기액 (1년 / 단리 2.5~4%)",
  installmentMonthTable: "월 납입액별 적금 만기액 (12개월 / 단리 3.5%)",
  freeSavingsMonthTable: "월 평균 납입별 자유적금 만기액 (24개월 / 3.5%)",
  isaInterestTable: "5년 누적 이자별 ISA 절세액 (일반·서민형)",
  taxFreeEligibilityTable: "비과세종합저축 자격·한도·절세 효과",
  summary: "한눈에 보는 세금·보호 한도",
  eligibility: "비과세종합저축 가입 자격 (8개)",
};
