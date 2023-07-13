In [[knowledge/kotlin/runBlocking#Example|`runBlocking()` example]], you may have noticed that the `getValue()` function is also defined with the `suspend` keyword.

The reason is that it calls `delay()`, which is also a `suspend` function. Whenever a function calls another `suspend`function, then it should also be a `suspend` function.

If this is the case, then why wouldn't the `main()` function in our example be marked with `suspend`? It does call `getValue()`, after all.

Not necessarily. `getValue()` is actually called in the function passed into `runBlocking()`, which is a `suspend` function, similar to the ones passed into `launch()` and `async()`. However, `getValue()` is not called in `main()` itself, nor is `runBlocking()` a `suspend` function, so `main()` is not marked with `suspend`.

If a function does not call a `suspend` function, then it does not need to be a `suspend` function itself.

## Tips

In Android Studio the suspend functions are have an ![716807c07961aacd.png](https://developer.android.com/codelabs/kotlin-coroutines/img/716807c07961aacd.png) icon in the left gutter.
