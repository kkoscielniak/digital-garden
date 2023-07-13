They are a [[knowledge/kotlin/kotlin|kotlin]] feature that allow writing clear, non-blocking [[private/v6-old-obsidian-publish/Concurrency|concurrent]] code by converting async callbacks for long-running tasks, such as database or network access, into _sequential_ code.

They provide a level of abstraction over using [[private/v6-old-obsidian-publish/Threads in Android|threads]] directly. A key feature of coroutines is the ability to store state, so that they can be halted/resumed. They also add number of features to assist multitasking.

A coroutine **may or may not** execute.

<iframe src="https://www.youtube.com/embed/ne6CD1ZhAI0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
## The state
- It's represented by _continuations_
- It allows portions of code to signal when they need to hand over control or wait for another coroutine to finish before resuming
	- this is called _cooperative multitasking_

## References

## Example

```kt
import kotlinx.coroutines.*

fun main() {
	repeat(3) {
		GlobalScope.launch {
			println("Hi from ${Thread.currentThread()}")
		}
	}
}
```

### Output

```
Hi from Thread[DefaultDispatcher-worker-2@coroutine#2,5,main]
Hi from Thread[DefaultDispatcher-worker-1@coroutine#1,5,main]
Hi from Thread[DefaultDispatcher-worker-1@coroutine#3`,5,main]
```

This code creates 3 coroutines in the [[knowledge/kotlin/GlobalScope]] using the default [[knowledge/kotlin/Dispatcher]].

The `launch()` fn creates a coroutine from the enclosed code wrapped in a cancellable [[knowledge/kotlin/Job]] object. `launch()` is used when a returned value is not needed outside the boundaries of the coroutine.

## _Sequential_ code

```kotlin
// Async callbacks
networkRequest { result ->
 // Successful network request
 databaseSave(result) { rows ->
	 // Result saved
 }
}
```

into

```kotlin
// The same code with coroutines
val result = networkRequest()
// Successful network request
databaseSave(result)
// Result saved
```
