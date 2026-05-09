/**
 * 인재채움뱅크 (고용노동부) 연봉 계산기 산식 — JS 그대로 복제
 * 출처: https://matchingbank.career.co.kr/js/user/cal_salCal.js
 * 4대보험 + 소득세 + 지방세
 */

function fn_cut_off(num, unit = 10) {
  return Math.floor(num / unit) * unit;
}

export function saraminCalc(annual_salary_input, dependency, tax_free = 0, retiring = 'separate') {
  // 1. monthly_salary (비과세 차감 후)
  let monthly_salary = Math.floor((annual_salary_input / (retiring === 'separate' ? 12 : 13)) - tax_free);
  if (monthly_salary < 0) monthly_salary = 0;

  // 2. 구간 검색 → monthly_section
  let period_min, period_max, period_range;
  let monthly_section = monthly_salary;
  let annual_salary = monthly_salary * 12;

  if (monthly_salary < 1500000) {
    period_min = 1060000; period_max = 1500000; period_range = 5000;
  } else if (monthly_salary < 3000000) {
    period_min = 1500000; period_max = 3000000; period_range = 10000;
  } else if (monthly_salary < 10000000) {
    period_min = 3000000; period_max = 10000000; period_range = 20000;
  } else if (monthly_salary === 10000000) {
    period_min = 10000000; period_max = 10000000; period_range = 0;
  } else {
    annual_salary = monthly_salary * 12;
    period_min = period_max = period_range = 0;
  }

  if (period_range > 0) {
    for (let ps = period_min; ps < period_max; ps += period_range) {
      const pe = ps + period_range;
      if (ps <= monthly_salary && monthly_salary < pe) {
        monthly_section = parseInt((ps + pe) / 2);
      }
      annual_salary = monthly_section * 12;
    }
  }

  // 3. 근로소득공제
  let earned_deduction;
  if (annual_salary < 5000000) earned_deduction = annual_salary * 0.7;
  else if (annual_salary <= 15000000) earned_deduction = 3500000 + (annual_salary - 5000000) * 0.4;
  else if (annual_salary <= 45000000) earned_deduction = 7500000 + (annual_salary - 15000000) * 0.15;
  else if (annual_salary <= 100000000) earned_deduction = 12000000 + (annual_salary - 45000000) * 0.05;
  else earned_deduction = 14750000 + (annual_salary - 100000000) * 0.02;

  // 4. 근로소득금액
  const earned_income = annual_salary - earned_deduction;

  // 5. 인적공제
  const personal_allowance = dependency * 1500000;

  // 6. 연금보험료공제 (연 단위)
  let pension_deduction;
  if (monthly_salary < 250000) pension_deduction = 250000 * 0.045 * 12;
  else if (monthly_salary > 3980000) pension_deduction = 3980000 * 0.045 * 12;
  else pension_deduction = fn_cut_off(fn_cut_off(monthly_section, 1000) * 0.045, 10) * 12;

  // 7. 특별공제 (구간별)
  let special_deduction = 0;
  const dep = dependency;
  if (annual_salary <= 30000000) {
    if (dep === 1) special_deduction = 3100000 + Math.floor(annual_salary * 4 / 100);
    else if (dep === 2) special_deduction = 3600000 + Math.floor(annual_salary * 4 / 100);
    else if (dep >= 3) special_deduction = 5000000 + Math.floor(annual_salary * 7 / 100);
  } else if (annual_salary <= 45000000) {
    if (dep === 1) special_deduction = 3100000 + Math.floor(annual_salary * 4 / 100) - Math.floor((annual_salary - 30000000) * 5 / 100);
    else if (dep === 2) special_deduction = 3600000 + Math.floor(annual_salary * 4 / 100) - Math.floor((annual_salary - 30000000) * 5 / 100);
    else if (dep >= 3) {
      if (annual_salary > 40000000) special_deduction = 5000000 + Math.floor(annual_salary * 7 / 100) - Math.floor((annual_salary - 30000000) * 5 / 100) + Math.floor((annual_salary - 40000000) * 4 / 100);
      else special_deduction = 5000000 + Math.floor(annual_salary * 7 / 100) - Math.floor((annual_salary - 30000000) * 5 / 100);
    }
  } else if (annual_salary <= 70000000) {
    if (dep === 1) special_deduction = 3100000 + Math.floor(annual_salary * 1.5 / 100);
    else if (dep === 2) special_deduction = 3600000 + Math.floor(annual_salary * 2 / 100);
    else if (dep >= 3) special_deduction = 5000000 + Math.floor(annual_salary * 5 / 100) + Math.floor((annual_salary - 40000000) * 4 / 100);
  } else if (annual_salary <= 120000000) {
    // 인재채움뱅크 7천만~1.2억 구간 정확 산식
    if (dep === 1) special_deduction = 3600000 + Math.floor(annual_salary * 50 / 100);
    else if (dep === 2) special_deduction = 3600000 + Math.floor(annual_salary * 1 / 100);
    else if (dep >= 3) special_deduction = 5000000 + Math.floor(annual_salary * 3 / 100) + Math.floor((annual_salary - 40000000) * 4 / 100);
  } else {
    // 1.2억 초과: 인재채움뱅크 코드 없음 → 0
    special_deduction = 0;
  }

  // 8. 과세표준
  const assessment_standard = earned_income - personal_allowance - pension_deduction - special_deduction;

  // 9. 산출세액 (옛 누진세율)
  let calculated_tax;
  if (assessment_standard < 1) calculated_tax = 0;
  else if (assessment_standard <= 12000000) calculated_tax = assessment_standard * 0.06;
  else if (assessment_standard <= 46000000) calculated_tax = 720000 + (assessment_standard - 12000000) * 0.15;
  else if (assessment_standard <= 88000000) calculated_tax = 5820000 + (assessment_standard - 46000000) * 0.24;
  else if (assessment_standard <= 150000000) calculated_tax = 15900000 + (assessment_standard - 88000000) * 0.35;
  else calculated_tax = 37600000 + (assessment_standard - 150000000) * 0.38;

  // 10. 근로소득세액공제
  let earned_income_tax_deduction_limit;
  if (annual_salary <= 55000000) earned_income_tax_deduction_limit = 660000;
  else if (annual_salary <= 70000000) earned_income_tax_deduction_limit = 630000;
  else earned_income_tax_deduction_limit = 500000;

  let earned_income_tax_deduction = (calculated_tax > 500000) ? (275000 + (calculated_tax - 500000) * 0.3) : (calculated_tax * 0.55);
  if (earned_income_tax_deduction > earned_income_tax_deduction_limit) earned_income_tax_deduction = earned_income_tax_deduction_limit;

  // 11. 결정세액
  const settled_tax = calculated_tax - Math.floor(earned_income_tax_deduction);

  // 12. 소득세 (월)
  let income_tax = fn_cut_off(Math.floor(settled_tax / 12), 10);
  if (income_tax < 0) income_tax = 0;

  // 13. 지방소득세
  const inhabitants_tax = income_tax > 0 ? fn_cut_off(income_tax / 10, 10) : 0;

  // 14. 4대보험
  const NP_CAP = 4210000;
  const NP_FLOOR = 270000;
  const npBaseM = monthly_salary < NP_FLOOR ? NP_FLOOR : (monthly_salary >= NP_CAP ? NP_CAP : monthly_salary);
  const national_pension = fn_cut_off(Math.floor(npBaseM * 0.045), 10);
  const health_insurance = fn_cut_off(Math.floor(monthly_salary * 0.0306), 10);
  const longterm_insurance = fn_cut_off(Math.floor(health_insurance * 0.0655), 10);
  const unemployment_insurance = fn_cut_off(Math.floor(monthly_salary * 0.0065), 10);

  const total_exemption = fn_cut_off(income_tax + inhabitants_tax + national_pension + health_insurance + longterm_insurance + unemployment_insurance, 10);
  const expected_receipt = fn_cut_off(monthly_salary + tax_free - total_exemption, 10);

  return {
    monthly_salary, monthly_section, annual_salary,
    national_pension, health_insurance, longterm_insurance, unemployment_insurance,
    income_tax, inhabitants_tax,
    total_exemption, expected_receipt
  };
}
