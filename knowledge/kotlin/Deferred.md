It is a cancelable [[knowledge/kotlin/Job]] that can hold a reference to a future value.

By using a `Deferred`, you can still call a function as if it immediately returns a value - a `Deferred` just serves as a placeholder, since you can't be certain when an asynchronous task will return.

A `Deferred` guarantees that a value will be returned to this object at a later time. An asynchronous task, on the other hand, will not block or wait for execution by default. To initiate that the current line of code needs to wait for the output of a `Deferred`, you can call `await()` on it. It will return the raw value.

It's similar to [[Knowledge/TypeScript/Promise]].
