---
title: Embedding
---

Embedding - a process (similar to [[knowledge/ai/llm/tokenization|tokenization]]) of converting the **representation of words to vectors**

## Word embedding

[[_inbox/llm|LLMs]] use _word embedding_ to understand the meaning of words, which is utilized in (inter alia) generating responses.

Embedding is a way to describe the relationships between words using numbers.

The GPT-3 model uses 768 dimensions to describe words.

## Sentence embedding

_Sentence embedding_ - process of describing **the meaning** of longer content. This process takes into account:

- meaning of the words (like in [[#Word embedding]]
- **the context in which they were used**

In this setup the similarity of vector values is basically the similarity of the information associated with them.

This type of embedding will be used when working with [[_inbox/vector-databases]], which can serve us to:

- find related data (e.g. recommendations)
- find deviations (e.g. for analysis).

Sentence embedding often also features a larger number of dimensions

- for `text-embedding-ada-002` model there are 1536 dimensions
