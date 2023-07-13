In Kotlin, all [[knowledge/kotlin/Coroutines|Coroutines]] run inside a `CoroutineScope`.

A scope controls the lifetime of coroutines through its job. When you cancel the job of a scope, it cancels all coroutines started in that scope.

A context that enforces cancellation and other rules to its children ([[knowledge/kotlin/Job|Job]]s) and their children recursively.

Functions used to create new coroutines such as `launch()`and `async()` extend `CoroutineScope`.

> 💡 The pattern of [[knowledge/typescript/async-await|async-await]] from JS is similar to coroutines. The [[knowledge/kotlin/suspend|suspend]] keyword is similar to `async`. In Kotlin, `await()` is implicit when calling a `suspend` function.

Kotlin has a method `Deferred.await()` that is used to wait for the result from a coroutine started with the `async` builder.

<!--
Let's look at the full signature of `launch()` to understand the next important concept in coroutines.

```
fun CoroutineScope.launch {    context: CoroutineContext = EmptyCoroutineContext,    start: CoroutineStart = CoroutineStart.DEFAULT,    block: suspend CoroutineScope.() -> Unit}
```

Behind the scenes, the block of code you passed to launch is marked with the `suspend` keyword. Suspend signals that a block of code or function can be paused or resumed.
-->
