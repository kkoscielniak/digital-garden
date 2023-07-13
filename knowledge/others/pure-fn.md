---
title: Pure function
---

In [computer programming](https://en.wikipedia.org/wiki/Computer_programming "Computer programming"), a **pure function** is a [function](https://en.wikipedia.org/wiki/Subroutine "Subroutine") that has the following properties:

1.  The function [return values](https://en.wikipedia.org/wiki/Return_statement "Return statement") are [identical](https://en.wikipedia.org/wiki/Relational_operator#Location_equality_vs._content_equality "Relational operator") for identical [arguments](https://en.wikipedia.org/wiki/Argument_of_a_function "Argument of a function") (no variation with local [static variables](https://en.wikipedia.org/wiki/Static_variable "Static variable"), [non-local variables](https://en.wikipedia.org/wiki/Non-local_variable "Non-local variable"), mutable [reference arguments](https://en.wikipedia.org/wiki/Value_type_and_reference_type "Value type and reference type") or [input streams](https://en.wikipedia.org/wiki/Input/output "Input/output")).
2.  The function [application](https://en.wikipedia.org/wiki/Function_application "Function application") has no [[knowledge/others/side-effects]]
    - no mutation of local static variables, non-local variables, mutable reference arguments or input/output streams

The **pure functions** are functions which will always return the same output for a given input and not change the state of the world around them.
