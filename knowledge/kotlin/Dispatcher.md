Manages which backing [[knowledge/threads/thread]] the [[knowledge/kotlin/Coroutines|coroutine]] will use for its execution, removing the responsibility of when and where to use a new thread from the developer. **The thread is chosen behind the scenes.**

`Dispatcher`s are one of the ways coroutines can be so performant. The `Dispatcher` avoids the performance cost of initializing new threads.

By default, Kotlin coroutines provides three Dispatchers:

- [`Main`](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/-dispatchers/-main.html)
- [`IO`](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/-dispatchers/-i-o.html) (optimized for IO work like reading from the network or disk)
- [`Default`](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/-dispatchers/-default.html) (optimized for CPU intensive tasks)
