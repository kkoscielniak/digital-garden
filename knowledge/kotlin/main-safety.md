The _main-safe_ code is the code that is asynchronous (e.g. fetching the data from the internet) and can be called from the MainActivity/main thread without **any** issues.

Libraries like Room and [[private/Kotlin/HTTP/Retrofit|Retrofit]] offer main-safety out of the box when using [[knowledge/kotlin/Coroutines|Coroutines]], so you don't need to manage threads to make network or database calls. This can often lead to substantially simpler code.

However, **blocking code** like sorting a list or reading from a file still requires explicit code to create **main-safety**, even when using coroutines.
