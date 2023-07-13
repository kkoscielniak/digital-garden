---
title: Encapsulation
---

One of the core concepts of _Object Oriented Programming_.

_Encapsulation_ is about preventing the classes that create an instance of another class to change the state of this instance directly.

In other words it's about bundling the data and methods that operate on the data within one class and hiding the state inside the class. This way we prevent the objects to have the invalid state.

To encapsulate the state/data we declare fields as `private` and create getters/setters for accessing these fields (depending on what data we allow to change. The getters/setters can take form of methods that do more than just set/return the value, eg. The setters can also validate the values to be set etc.

```js
package pro.koscielniak;

public class Account {
	private float balance;

	public void deposit(float amount) {
		if (amount > 0) {
			this.balance += amount;
		}
	}

	public void withdraw(float amount) {
		if (balance > 0 && amount > 0 && balance > amount) {
			balance -= amount;
		}
	}
}
```

- [Lombok](https://projectlombok.org/) library (Java)
  - automatically implements getters and setters
