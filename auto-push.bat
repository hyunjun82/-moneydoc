@echo off
REM MoneyDoc auto-push - runs unattended via Task Scheduler. No pause.
cd /d "%~dp0"

if exist ".git\index.lock" del /f ".git\index.lock"
git config core.autocrlf false
git config core.safecrlf false

git add -A

REM exit quietly if nothing changed
git diff --cached --quiet
if %errorlevel%==0 (
  echo No changes to push.
  exit /b 0
)

for /f "tokens=*" %%i in ('powershell -NoProfile -Command "Get-Date -Format yyyy-MM-dd_HH-mm"') do set TS=%%i
git commit -m "content: auto-push %TS%"
git push origin main
exit /b %errorlevel%
