---
title: yup
---

Form validation package

## How to use

1. Define a [[validation schema]].

```jsx
import * as Yup from 'yup';

const schema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"), // no need for regexes <3
    password: Yup.string().required().min(4).label("Password")
}}
```

2. Add schema to [[Formik]] as a `validationSchema` prop
3. Add component for displaying the error

- `.label("Email")` - is used for displaying the validation errors.
- You can pass a second argument for each _method_ in schema definition to pass the exact error message that's going to be shown for that particular invalidation
  - `Yup.array().min(1, "at least one image is needed"`
