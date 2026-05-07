@echo off
cd /d "%~dp0"

echo ===============================================
echo  MoneyDoc - Savings 4 calc + dynamic guide title
echo ===============================================
echo.

echo [1/5] Cleaning git lock...
if exist ".git\index.lock" del /f ".git\index.lock"

echo.
echo [2/5] Setting line-ending config...
git config core.autocrlf false
git config core.safecrlf false

echo.
echo [3/5] Removing tax-free-savings (git rm)...
git rm -rf app/savings/tax-free-savings
git rm moneydoc-data/calculators/savings/tax-free-savings.json

echo.
echo [4/5] Staging files...
git add moneydoc-data/calculators/savings/fixed-deposit.json
git add moneydoc-data/calculators/savings/isa-tax-saving.json
git add moneydoc-data/calculators/savings/free-savings.json
git add lib/calc/engine.js
git add lib/calculators-index.ts
git add components/CalculatorShell.tsx
git add CLAUDE.md
git add app/savings/page.tsx
git add app/savings/fixed-deposit/page.tsx
git add app/savings/isa-tax-saving/page.tsx
git add app/savings/free-savings/page.tsx
git add push-savings-bundle.bat

git diff --cached --name-only

echo.
echo [5/5] Commit and push...
git commit -m "feat(savings): 4 calc rewrite + dynamic guide title (CalculatorShell auto-generates from spec.title) + remove tax-free-savings"
git push origin main

echo.
echo ===============================================
echo  DONE. Cloudflare rebuild in 1-3 min.
echo ===============================================
pause
