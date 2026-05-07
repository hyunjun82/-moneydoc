@echo off
cd /d "%~dp0"

echo ===============================================
echo  MoneyDoc - Loan Phase 7a (LTV deep + 4 integrate)
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
echo [4/5] Staging files...
git add moneydoc-data/calculators/loan/loan-amortization.json
git add moneydoc-data/calculators/loan/ltv-limit.json
git add moneydoc-data/calculators/loan/dsr-limit.json
git add moneydoc-data/calculators/loan/dti-limit.json
git add moneydoc-data/calculators/loan/mortgage-loan-limit.json
git add moneydoc-data/calculators/loan/credit-loan.json
git add moneydoc-data/calculators/loan/jeonse-loan.json
git add moneydoc-data/calculators/loan/loan-refinance.json
git add lib/calc/engine.js
git add lib/calculators-index.ts
git add app/loan/page.tsx
git add app/loan/loan-amortization/page.tsx
git add app/loan/ltv-limit/page.tsx
git add push-loan-phase7a.bat

git diff --cached --name-status

echo.
echo [5/5] Commit and push...
git commit -m "feat(loan): Phase 7a - 12->9 cards, integrate 4 modes into loan-amortization, LTV deep guide (regional table + room deduction + lease + 6eok cap), label cleanup"
git push origin main

echo.
echo ===============================================
echo  DONE. Cloudflare rebuild in 1-3 min.
echo ===============================================
pause
