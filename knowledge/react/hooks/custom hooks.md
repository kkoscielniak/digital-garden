# Custom hooks

Composes the advanced logic based on hooks into one hook.

For the custom hook to be defined correctly it has to have a name starting with `use...` ([[knowledge/react/hooks/hook-rules]])

## Resources

- [Docs](https://reactjs.org/docs/hooks-custom.html)

## Example: `useFibonacci`

```js
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 2) + fib(n - 1);
}

function fib2(n) {
  if (n <= 1) {
    return [n - 1, n];
  }
  const [fNminus2, fNminus1] = fib2(n - 1);
  return [fNminus1, fNminus2 + fNminus1];
}

function useFibonacci(initialN) {
  const [fibs, setFibs] = useState(getInitialFibs);
  const [n, setN] = useState(initialN);
  const currentFibonacciNumber = fibs.current;

  function getInitialFibs() {
    const [prev, current] = fib2(initialN);
    return {
      prev,
      current,
      next: prev + current,
    };
  }

  function incrementN() {
    setN((prevN) => {
      const newN = prevN + 1;
      setFibs((prevFibs) => ({
        prev: prevFibs.current,
        current: prevFibs.next,
        next: prevFibs.current + prevFibs.next,
      }));
      return newN;
    });
  }

  function decrementN() {
    setN((prevN) => {
      const newN = prevN - 1;
      setFibs((prevFibs) => ({
        prev: prevFibs.current - prevFibs.prev,
        current: prevFibs.prev,
        next: prevFibs.current,
      }));
      return newN;
    });
  }

  function resetN() {
    setN(initialN);
    setFibs(getInitialFibs);
  }

  return {
    n,
    currentFibonacciNumber,
    incrementN,
    decrementN,
    resetN,
  };
}
```
