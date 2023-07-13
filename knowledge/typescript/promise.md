---
title: Promise
---

## Promise statuses

| Status   | Value       |
| -------- | ----------- |
| Pending  | `undefined` |
| Resolved | value       |
| Rejected | `Error`     |

```js
const x = new Promise(resolve, reject) {
	[...]
}

x.then(result => { console.log(result) }, error => { console.log(error)}) // it still returns a promise to be handled by `catch`

// or
x.then(...).catch(...)
```

`catch` handles the error thrown by `then` function, not by Promise itself. If we won't handle the Promise error in `then`, it will be passed to `catch`.

In other words: `catch` catches **all** previously unhandled errors in the _chain_ (Promises can be chained)

## `Promise.all(array)`

Awaits all the promises in the array and returns the array of values of those promises. Is rejected if any of the passed promises is rejected.

## `Promise.race(array)`

Returns the value of the promise that resolved first. Is rejected **only if** one of the promises will reject **before** any other of promises resolve.

Useful for timeout to any promise. We can just pass another promise that will throw an exception after the timeout is reached.

# 💡`catch`

`catch` returns another Promise with the status of... `resolved`, lol. If the Promise value is assigned to the variable, and `catch` returns this value, then the variable will have this value. Quite [wat](Knowledge/JavaScript/wat.md), if you ask me.

## Resources

- [[knowledge/typescript/async-await|Async and Await]]
- [Promise @ MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [Using Promises @ MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
