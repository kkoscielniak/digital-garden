# `useReducer` hook
Provides basic Redux-like functionality to the component. 

```js
function cartReducer(prevCart, action) {
  if (action.type === "ADD_TO_CART") {
    const { product } = action;
    const newCartItem = createCartItem(product);
    const newCartItems = [...prevCart.cartItems, newCartItem];
    const newTotalValue = calculateCartTotalValue(newCartItems);
    return {
      cartItems: newCartItems,
      totalValue: newTotalValue,
    };
  }
  if (action.type === "REMOVE_FROM_CART") {
    const { cartItem } = action;
    const newCartItems = prevCart.cartItems.filter(
      (item) => item.id !== cartItem.id,
    );
    const newTotalValue = calculateCartTotalValue(newCartItems);
    return {
      cartItems: newCartItems,
      totalValue: newTotalValue,
    };
  }
  if (action.type === "BUY_ALL_ITEMS") {
    return INITIAL_CART;
  }
  return prevCart;
}
```

i

```js
const [state, dispatch] = useReducer(cartReducer);
```
