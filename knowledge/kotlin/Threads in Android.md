Every Android app has a default "main" [[private/v1/Coding/Glossary/Threading/Thread]]. This is (usually) the UI thread.

## Creating and running multiple threads

```kt
fun main() {
	val states = arrayOf("Starting", "Doing Task 1", "Doing Task 2", "Ending")
	repeat(3) {
		Thread {
			println("${Thread.currentThread()} has started")
			for (i in states) {
				println("${Thread.currentThread()} - $i")
				Thread.sleep(50)
			}
		}.start()
	}
}
```

### Output

```
Thread[Thread-0,5,main] has started
Thread[Thread-1,5,main] has started
Thread[Thread-2,5,main] has started
Thread[Thread-1,5,main] - Starting
Thread[Thread-0,5,main] - Starting
Thread[Thread-2,5,main] - Starting
Thread[Thread-1,5,main] - Doing Task 1
Thread[Thread-0,5,main] - Doing Task 1
Thread[Thread-2,5,main] - Doing Task 1
Thread[Thread-0,5,main] - Doing Task 2
Thread[Thread-1,5,main] - Doing Task 2
Thread[Thread-2,5,main] - Doing Task 2
Thread[Thread-0,5,main] - Ending
Thread[Thread-2,5,main] - Ending
Thread[Thread-1,5,main] - Ending
```

You'll see varied output. Sometimes the threads will appear to run in sequence and other times the content will be interspersed.

This invariability is caused by how the threads are executed. The scheduler gives out a slice of time to each thread and it either completes in the time period or is suspended until it receives another time slice.
