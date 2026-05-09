@echo off
cd /d "%~dp0"

echo ===============================================
echo  MoneyDoc - Push (calculators full overhaul)
echo ===============================================
echo.

if exist ".git\index.lock" del /f ".git\index.lock"
git config core.autocrlf false
git config core.safecrlf false

echo [1/3] Staging all changes...
git add -A

echo.
echo [2/3] Commit...
git --no-pager commit -m "feat: 7 external 1:1 verifications + auto-tax new + insurance cleanup + 41 user-centric guides"

echo.
echo [3/3] Push...
git push origin main

echo.
echo ===============================================
echo  DONE. Cloudflare rebuild in 1-3 min.
echo ===============================================
echo.
pause
