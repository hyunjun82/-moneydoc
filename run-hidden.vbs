' auto-push.bat 을 창 없이(숨김) 실행한다. 스케줄 작업이 이 vbs 를 호출.
Set sh = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
sh.CurrentDirectory = fso.GetParentFolderName(WScript.ScriptFullName)
sh.Run "auto-push.bat", 0, False
