---
title: "async/await"
---

It's basically sweeping the Promises under the carpet 🤷‍♂️.

Allows to prevent chaining hell if we need to make the async code behave a bit more synchronous.

```js
async function() {
	try {
		await // [...]
	} catch(err) {
		// handle Error
	}
}
```

Throwing an exception is the best method to deal with errors in asynchronous functions.

([[knowledge/typescript/Promise]]) `Promise.all()` & `Promise.race()` don't have the async-await-like counterparts.

In some cases mixing the methods makes sense.

## Example

```ts
const wait = (ms) =>
  new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });

const isEven = (num) => {
  return new Promise((resolve, reject) => {
    if (typeof num === "number") {
      resolve(num % 2 === 0 ? true : false);
    } else {
      reject(new Error("argument is not a number"));
    }
  });
};

const slowIsEven = async (num, ms = 1000) => {
  try {
    await wait(ms);
    const isReallyEven = await isEven(num);
    return isReallyEven;
  } catch (error) {
    console.error(error);
  }
};

(async () => {
  const x = await slowIsEven(2, 5000);
  console.log(x);
})();
```

## Resources

- [async/await tutorial on MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await)
- [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [await function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)
- [for await...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of)
