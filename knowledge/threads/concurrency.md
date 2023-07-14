---
title: Concurrency
---
Allows multiple units of code to execute out of order or seemingly in parallel permitting more efficient use of resources. The operating system can use characteristics of the system, programming language, and concurrency unit to manage multitasking.

![[private/v6-old-obsidian-publish/_assets/concurrency.png]]
_developer.android.com_

In complex application it's important for code to be non-blocking. Performing a long-running task, such as a network request, can't stop the execution of other things in the app. Not properly implementing concurrency can make the app appear unresponsive to users.
