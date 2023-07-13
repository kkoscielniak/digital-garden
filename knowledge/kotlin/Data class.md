Data classes are primarily used to hold data in Kotlin. They are marked with the keyword `data`.

```kotlin
data class Item (
	val id: Int = 0,
	val itemName: String,
	val itemPrice: Double,
	val quantityInStock: Int
)
```

Kotlin data class objects have some extra benefits, the compiler automatically generates utilities for comparing, printing and copying such as `toString()`, [`copy()`](https://kotlinlang.org/docs/data-classes.html#copying), and `equals()`.

To ensure consistency and meaningful behavior of the generated code, data classes have to fulfill the following requirements:

- The primary constructor needs to have at least one parameter.
- All primary constructor parameters need to be marked as `val` or `var`.
- Data classes cannot be `abstract`, `open`, `sealed` or `inner`.

> ⚠️ The compiler only uses the properties defined inside the [[knowledge/kotlin/Primary constructor]] for the automatically generated functions. The properties declared inside the class body are excluded from the generated implementations.

To learn more about Data classes, check out the [documentation](https://kotlinlang.org/docs/data-classes.html).

## `copy()`

The [`copy()`](https://kotlinlang.org/docs/data-classes.html#copying) function is provided by default to all the instances of data classes. This function is used to copy an object for changing some of its properties, but keeping the rest of the properties unchanged.

```kotlin
val newItem = item.copy(quantityInStock = item.quantityInStock - 1)  
```
