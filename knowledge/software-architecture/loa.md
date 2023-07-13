---
title: Library Oriented Architecture
---

!["Library Oriented Architecture example diagram"](https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Library_Oriented_Architecture.png/220px-Library_Oriented_Architecture.png)
_Stolen from Wikipedia_

A set of principles and methodologies for designing and developing software in the form of reusable libraries under a specific [ontology domain](<https://en.wikipedia.org/wiki/Ontology_(information_science)> "Ontology (information science)").

Dictates the boundaries of a library that exposes business functionality through a set of public APIs. Encourages the maintenance of internal libraries and modules with **independent internal life-cycles**.

Promotes [Modular Programming](https://en.wikipedia.org/wiki/Modular_programming "Modular programming"), [Separation of Conterns](https://en.wikipedia.org/wiki/Separation_of_concerns "Separation of concerns") and designing to interfaces instead to implementations.

## Key principles

1. A library responsibility must be constrained to only one ontology domain.
2. A library that needs to use concepts/artifacts from a different ontology domain than the one it belongs to, must interface and reuse the library corresponding to that specific ontology domain.
3. All domain specific libraries must be maintained and supported with separate life-cycles.

## Benefits

While the above may seem constraining, adopting the Library Oriented Architecture gives you several benefits:

- Simplicity of configuration management
- Improvement of the system reliability
- Independence of technology
  - It's easy to replace a library implementation with another one without affecting the library _consumer_ (as long as the API is the same)
- Increase of the development speed
  - The development team doesn't have to know everything about the system. They just need to know the responsibilities of and the requirements for the library they are developing
  - Debugging is also easier
- Increment of the _[[knowledge/others/bus-factor]]_
  - The less complex system, the higher bus factor is 🤷‍♂️
- Minimized risk of [high coupling](https://en.wikipedia.org/wiki/Coupling_(computer_programming)
  - especially in big, distributed systems
