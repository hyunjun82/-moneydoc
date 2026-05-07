@echo off
cd /d "%~dp0"

echo ===============================================
echo  MoneyDoc - Phase 3 push (fixed-deposit)
echo ===============================================
echo.

echo [1/4] Cleaning git lock...
if exist ".git\index.lock" del /f ".git\index.lock"

echo.
echo [2/4] Setting line-ending config...
git config core.autocrlf false
git config core.safecrlf false

echo.
echo [3/4] Staging Phase 3 files...
git add moneydoc-data/calculators/savings/fixed-deposit.json
git add lib/calc/engine.js
git add lib/calculators-index.ts
git add app/savings/fixed-deposit/page.tsx
git add push-savings-step3.bat

git diff --cached --name-only

echo.
echo [4/4] Commit and push...
git commit -m "feat(savings/fixed-deposit): non-taxable input + 4-section guide (deposit bracket table 15 rows + summary + FAQ + tips). 5 cases verified"
git push origin main

echo.
echo ===============================================
echo  DONE. Cloudflare rebuild in 1-3 min.
echo ===============================================
pause
