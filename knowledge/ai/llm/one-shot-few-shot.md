---
title: One-shot / Few-shot
---

_One-shot_/_Few-shot Prompting_ is the [[_inbox/prompt-engineering|prompt-engineering]] technique where, you provide examples that demonstrate the desired behavior of the model.

## One-shot example 🇵🇱

```sh
# SYSTEM
Act as a JSON generator that has interests in books. For the book list provided respond with an array of {title, author: author of the given book}.

\#\#\# Examples
Book title: Romeo and Julia
JSON object:
{
    "title": "Romeo i Julia",
    "author": "William Shakespeare"
}
```

```sh
# USER
Romeo i Julia
Cień wiatru
Rok 1984
```

```json
// ASSISTANT
[
  {
    "title": "Romeo i Julia",
    "author": "William Shakespeare"
  },
  {
    "title": "Cień wiatru",
    "author": "Carlos Ruiz Zafón"
  },
  {
    "title": "Rok 1984",
    "author": "George Orwell"
  }
]
```

## Few-shot example 🇵🇱

```sh
# SYSTEM
Act as a JSON generator. For the given task description respond with the {"category": "<category>"}. Respond with JSON only.

\#\#\# Examples
Task description: kupić mleko
JSON Object: {category: "dom"}

Task description: napisz raport z ostatniego testu penetracyjnego
JSON Object: {category: "praca"}

Task description: zaktualizować iPhone\'a żony
JSON Object: {category: "inne"}
```
