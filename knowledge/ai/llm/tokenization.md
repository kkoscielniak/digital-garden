---
title: Tokenisation
---

Tokenization - converting text into numerical representation.

The most popular strategy today is _subword tokenization_ - encoding **parts of words** as numbers.

When generating responses, the model produces successive **tokens** (word fragments), answering the question: \*Given the current text, **what token continues it?\***

The decision on which word fragments become tokens depends on:

- the tokenization algorithm
- data set

Tokenization creates a vocabulary (a component of the language model). However, generating a vocabulary alone is not enough, as it's also necessary to consider additional information, such as word meanings, which also need to be converted into [[knowledge/ai/llm/embedding]].

## See also

- [OpenAI Tokenizer](https://platform.openai.com/tokenizer)
  - Successive tokens (parts of the words) are highlighted in different colors
  - This is how [[knowledge/ai/llm/gpt|GPT]] models see the text
- [OpenAI Playground](https://platform.openai.com/playground/p/3aygR2WOaEXgz6f4l2zA9Kbq?model=text-davinci-003)
  - for older models (e.g. `text-davinci-003`) Playground informs us which tokens were taken into account for generating the answer
