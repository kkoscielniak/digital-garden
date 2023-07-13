---
title: Unified Modeling Language
---

_UML_ is a _language_ used to represent the classes and the relationship between them.

```uml
Shape
---
- positionX: int
---
+ render()
```

- `-` - private method/field
- `+` - public method/field

## Types of relationship

It's kinda tricky to describe with text only 😅 It's fine for now tho.

### Inheritance

Denoted with arrow (→)

The direction of the arrows head says what is the **parent class**.

```java
public class Rectangle extends Shape {}
// Rectangle -> Shape

```

### Composition

Denoted with diamond and arrow (◆→)

The class with diamond is _composed_ of the class pointed by the arrow head).

```java
public class Shape {

  private Size size;
}
// Shape ◆-> Size
// Car ◆-> Wheel

```

#### Aggregation

`/* [...] */`

### Dependency relationship

Denoted with the dashed arrow (⇢).

Means that somewhere in one class we have a reference (a dependency) to another class, but it's not composed of that class.

```java
public class Shape {

  public void render(Document doc) {
    // ...
  }
}
// Shape ---> Document

```

![](/public/uml-1.png)
