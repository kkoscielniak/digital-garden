---
title: Kill with Exit Code != 0
customHeader: true
---

# Kill the app with Exit Code different than `0`

## With Task Manager

You can kill an app on Windows with a different exit code than 0 using the Task Manager utility.

- Open Task Manager
- Got to _Processes_/_Details_ tab (depends on the Windows version)
- Find the process and select _End Task_/_End Process_
  - it may prompt you with a dialog box asking if you want to end the process

## With `cmd.exe`

```bat
taskkill /F /IM <process name>
```

- `/F` forces the app to terminate
- `/IM` option specifies the name of the image file

## With PowerShell

```powershell
Stop-Process -Name <process name> -Force
```
