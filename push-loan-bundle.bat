@echo off
cd /d "%~dp0"

echo ===============================================
echo  MoneyDoc - Loan 9 calc full depth push
echo ===============================================
echo.

echo [1/5] Cleaning git lock...
if exist ".git\index.lock" del /f ".git\index.lock"

echo.
echo [2/5] Setting line-ending config...
git config core.autocrlf false
git config core.safecrlf false

echo.
echo [3/5] Removing 3 obsolete loan calc folders + JSONs...
git rm -rf app/loan/balloon-payment
git rm -rf app/loan/loan-decline
git rm -rf app/loan/grace-period-loan
git rm moneydoc-data/calculators/loan/balloon-payment.json
git rm moneydoc-data/calculators/loan/loan-decline.json
git rm moneydoc-data/calculators/loan/grace-period-loan.json

echo.
echo [4/5] Staging 9 calcs + engine + index + 9 pages + category page...
git add moneydoc-data/calculators/loan/loan-amortization.json
git add moneydoc-data/calculators/loan/ltv-limit.json
git add moneydoc-data/calculators/loan/dsr-limit.json
git add moneydoc-data/calculators/loan/dti-limit.json
git add moneydoc-data/calculators/loan/mortgage-loan-limit.json
git add moneydoc-data/calculators/loan/credit-loan.json
git add moneydoc-data/calculators/loan/jeonse-loan.json
git add moneydoc-data/calculators/loan/loan-refinance.json
git add moneydoc-data/calculators/loan/prepayment-fee.json
git add lib/calc/engine.js
git add lib/calculators-index.ts
git add app/loan/page.tsx
git add app/loan/loan-amortization/page.tsx
git add app/loan/ltv-limit/page.tsx
git add app/loan/dsr-limit/page.tsx
git add app/loan/dti-limit/page.tsx
git add app/loan/mortgage-loan-limit/page.tsx
git add app/loan/credit-loan/page.tsx
git add app/loan/jeonse-loan/page.tsx
git add app/loan/loan-refinance/page.tsx
git add app/loan/prepayment-fee/page.tsx
git add push-loan-bundle.bat

git diff --cached --name-status

echo.
echo [5/5] Commit and push...
git commit -m "feat(loan): 12 to 9 calcs, integrate 4 modes (loan-amortization), full 4-section guides, 52/52 verified, 2026 regulations (stress DSR 3, 6eok cap, lease deduction, regional LTV)"
git push origin main

echo.
echo ===============================================
echo  DONE. Cloudflare rebuild in 1-3 min.
echo ===============================================
pause
