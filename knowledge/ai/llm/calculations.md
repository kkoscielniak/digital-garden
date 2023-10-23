---
title: LLMs and calculations
---

Due to the [[knowledge/ai/llm/undeterministic-nature|undeterministic-nature]] and [[knowledge/ai/llm/hallucinations|hallucinations]] of [[_inbox/llm|llm]]s it's not a great idea to use them for significant computations, especially with large numbers.

Language models simply weren't designed for that. The best way to handle such situations is to use or create a tool designed for such tasks.

## Maths

An example is the WolframAlpha model, which effortlessly provides correct answers to virtually any calculation. You could create a prompt that analyzes the user's query and extracts information about the task to be performed by another model. The returned answer can either be directly returned to the user or paraphrased in a readable way.

## Working with dates

Similar issues can be observed when converting dates (e.g., GPT-4 doesn't always know when "two weeks on Wednesday" is), which often comes in handy in practical LLM applications.

## See also

- [[function-calling]]
