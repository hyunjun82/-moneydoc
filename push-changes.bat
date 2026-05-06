@echo off
cd /d "%~dp0"

echo ===============================================
echo  MoneyDoc - Direct Push (no stash)
echo ===============================================
echo.

echo [1/5] Cleaning git lock...
if exist ".git\index.lock" del /f ".git\index.lock"

echo.
echo [2/5] Setting line-ending config...
git config core.autocrlf false
git config core.safecrlf false

echo.
echo [3/5] Staging calculator files...
git add moneydoc-data/calculators/tax/salary-net-pay.json
git add moneydoc-data/calculators/tax/comprehensive-income-tax.json
git add moneydoc-data/verify/verify-salary-calc.js
git add app/tax/salary-net-pay/SalaryNetPayClient.tsx
git add app/pension/irp-tax-credit/page.tsx
git add app/layout.tsx
git add lib/calc/salary-net-pay.ts
git add lib/calc/engine.js

echo.
echo [4/5] Showing staged files...
git diff --cached --name-only

echo.
echo [5/5] Commit and push...
git commit -m "fix(salary): restore truncated files, TS build error fixed"
git push origin main

echo.
echo ===============================================
echo  DONE. Cloudflare rebuild in 1-3 min.
echo ===============================================
pause
