---
title: Thread
---

A _thread_ is a bit of an abstract concept, but you can think of it as a single path of execution for code in your app.

Each instruction (i.e. a line of code) waits for the previous one to finish before the next line executes.

However, in a running app, usually there are more threads in addition to the main thread.

> Behind the scenes, the processor doesn't actually work with separate threads, but rather, switches back and forth between the different series of instructions to give the appearance of multitasking.

A thread is an abstraction that you can use when writing code to determine which path of execution each instruction should go. Working with threads other than the main thread, allows your app to perform complex tasks, such as downloading images, in the background while the app's user interface remains responsive. This is called concurrent code, or simply, [[private/v6-old-obsidian-publish/Concurrency]].

A thread is the smallest unit of code that can be scheduled and run in the confines of a program.
