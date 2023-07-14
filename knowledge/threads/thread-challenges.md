---
title: Challenges with Threads
---
## They require lots of resources

Creating, switching, and managing [[knowledge/threads/thread|threads]] takes up system resources quickly. Time limiting the raw number of threads that can be managed at the same time. The costs of creation can really add up.

### The UI thread

While a running app will have multiple threads, each app will have one dedicated thread, specifically responsible for your app's UI (called the _main thread_ or _UI thread_).

Because this threads responsibility, it's important for it to be performant so that the app will run smoothly. Any long-running tasks will block it until completion and cause your app to be unresponsive.

## Race conditions

When working with multiple threads, you may run into what's called a [[knowledge/threads/race-condition]], when multiple threads try to access the same value in memory at the same time. Race conditions can result in hard to reproduce, random looking bugs, which may cause your app to crash, often unpredictably.
