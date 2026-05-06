@echo off
cd /d "%~dp0"

echo ===============================================
echo  MoneyDoc - Cleanup savings category
echo ===============================================
echo.

echo [1/6] Cleaning git lock...
if exist ".git\index.lock" del /f ".git\index.lock"

echo.
echo [2/6] Setting line-ending config...
git config core.autocrlf false
git config core.safecrlf false

echo.
echo [3/6] Removing 4 obsolete savings calculators (git rm -rf)...
git rm -rf app/savings/compound-savings
git rm -rf app/savings/simple-vs-compound
git rm -rf app/savings/housing-subscription
git rm -rf app/savings/youth-leap-account
git rm moneydoc-data/calculators/savings/compound-savings.json
git rm moneydoc-data/calculators/savings/simple-vs-compound.json
git rm moneydoc-data/calculators/savings/housing-subscription.json
git rm moneydoc-data/calculators/savings/youth-leap-account.json

echo.
echo [4/6] Staging updated savings page + this bat...
git add app/savings/page.tsx
git add cleanup-savings.bat

echo.
echo [5/6] Showing staged changes...
git diff --cached --name-status

echo.
echo [6/6] Commit and push...
git commit -m "refactor(savings): remove 4 obsolete calcs (compound-savings/simple-vs-compound/housing-subscription/youth-leap-account), update category page to 5 cards"
git push origin main

echo.
echo ===============================================
echo  DONE. Cloudflare rebuild in 1-3 min.
echo  Live: https://moneydoc.kr/savings/ (5 cards)
echo ===============================================
pause
