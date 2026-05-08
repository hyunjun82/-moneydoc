@echo off
cd /d "%~dp0..\.."
node scripts/verify-live/run.mjs --calc=loan-amortization --show
pause
