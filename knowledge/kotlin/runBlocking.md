Starts a new [[knowledge/kotlin/Coroutines|coroutine]] and **blocks the current [[private/v1/Coding/Glossary/Threading/Thread]]** until completion.

Mainly used to bridge between blocking and non-blocking code in the main functions and tests.

> 💡 used rather occasionally

## Example

```kt
import kotlinx.coroutines.*
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

val formatter = DateTimeFormatter.ISO_LOCAL_TIME
val time = {
	formatter.format(LocalDateTime.now())
}

suspend fun getValue(): Double {
	println("entering getValue() at ${time()}")
	delay(3000)
	println("leaving getValue() at ${time()}")
	return Math.random()
}

fun main() {
	runBlocking {
		val num1 = getValue()
		val num2 = getValue()
		println("result of num1 + num2 is ${num1 + num2}")
	}
}
```

The [[lambda]] passed to `runBlocking()` is a [[knowledge/kotlin/suspend]] function.

### Output

```
entering getValue() at 17:44:52.311
leaving getValue() at 17:44:55.319
entering getValue() at 17:44:55.32
leaving getValue() at 17:44:58.32
result of num1 + num2 is 1.4320332550421415
```

`getValue()` returns a random number after a set delay time. The main function calls `getValue()` twice and returns the sum.

> 💡 Doesn't return `Deferred`
