[Lifecycle-aware components](https://developer.android.com/topic/libraries/architecture/lifecycle) such as fragments, provide first-class coroutine support for logical scopes in your app along with an interoperability layer with [`LiveData`](https://developer.android.com/topic/libraries/architecture/livedata). A `LifecycleScope` is defined for each [`Lifecycle`](https://developer.android.com/topic/libraries/architecture/lifecycle) object. Any coroutine launched in this scope is canceled when the `Lifecycle` owner is destroyed.

`LifecycleScope` is a [[knowledge/kotlin/CoroutineScope]].

A rule is a way to run code before and after the execution of a test in JUnit.
