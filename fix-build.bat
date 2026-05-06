@echo off
cd /d "%~dp0"

echo ===============================================
echo  MoneyDoc - Fix build error and push
echo ===============================================
echo.

echo [1/4] Cleaning git lock...
if exist ".git\index.lock" del /f ".git\index.lock"

echo.
echo [2/4] Setting line-ending config...
git config core.autocrlf false
git config core.safecrlf false

echo.
echo [3/4] Staging fixed files...
git add lib/calculators-index.ts
git add app/savings/page.tsx
git add fix-build.bat

git diff --cached --name-only

echo.
echo [4/4] Commit and push...
git commit -m "fix(build): remove imports of deleted savings JSON files (compound-savings, simple-vs-compound, housing-subscription, youth-leap-account)"
git push origin main

echo.
echo ===============================================
echo  DONE. Cloudflare rebuild in 1-3 min.
echo ===============================================
pause
