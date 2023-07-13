A way to extend a class with new functionality without having to inherit from the class or modify the existing definition of the class. That means you can add functions to an existing class without having to access its source code. This is done via special declarations called [_extensions_](https://kotlinlang.org/docs/extensions.html).

For example, you can write new functions for a class from a third-party library that you can't modify. Such functions are available for calling in the usual way, as if they were methods of the original class. These functions are called _extension functions_. (There are also _extension properties_ that let you define new properties for existing classes)

Extension functions don't actually modify the class, but allow you to use the dot-notation when calling the function on objects of that class.

## Example

```kotlin
class Square(val side: Double){
    fun area(): Double{
        return side * side;
 }
}

// Extension function to calculate the perimeter of the square
fun Square.perimeter(): Double{
    return 4 * side;
}

// Usage
fun main(args: Array<String>){
    val square = Square(5.5);
 val perimeterValue = square.perimeter()
    println("Perimeter: $perimeterValue")
    val areaValue = square.area()
    println("Area: $areaValue")
}
```

Inside the extension function, you can reference the public properties of the `Square` class.
