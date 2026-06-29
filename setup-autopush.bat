@echo off
REM ============================================================
REM  MoneyDoc - ONE-TIME setup. Double-click once, never again.
REM  Registers a task that auto git add+commit+push every 1 min,
REM  but only when files actually changed (no empty commits).
REM ============================================================

schtasks /create /tn "MoneyDocAutoPush" /tr "wscript.exe \"%~dp0run-hidden.vbs\"" /sc minute /mo 1 /f

echo.
echo ============================================================
echo  DONE. Auto-push is now active (every 1 minute).
echo  From now on: Claude writes files -^> your PC pushes by itself.
echo.
echo  Stop later:  schtasks /delete /tn "MoneyDocAutoPush" /f
echo  Run now:     schtasks /run /tn "MoneyDocAutoPush"
echo ============================================================
echo.
pause
