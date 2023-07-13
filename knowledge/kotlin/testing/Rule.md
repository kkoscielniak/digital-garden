A _Rule_ is a way to run code before and after the execution of a test in JUnit.

## Different kinds of rules

- [`InstantTaskExecutorRule`](https://developer.android.com/reference/androidx/arch/core/executor/testing/InstantTaskExecutorRule) is a JUnit rule that configures `LiveData` to execute each task synchronously
- `MainCoroutineScopeRule` is a custom rule in this codebase that configures `Dispatchers.Main` to use a [`TestCoroutineDispatcher`](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-test/kotlinx.coroutines.test/-test-coroutine-dispatcher/) from `kotlinx-coroutines-test`. This allows tests to advance a _virtual-clock_ for testing, and allows code to use `Dispatchers.Main` in unit tests. The `MainCoroutineScopeRule` lets you pause, resume, or control the execution of coroutines that are launched on the `Dispatchers.Main`.
