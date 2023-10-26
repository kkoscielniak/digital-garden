---
title: Self consistency
---

_Self consistency_ - involves classifying and selecting the best answer of the multiple answers for a given [[knowledge/ai/llm/prompt|prompt]].

Given the [[knowledge/ai/llm/undeterministic-nature|undeterministic-nature]] of [[_inbox/llm|LLMs]], this can be quite useful.

To generate multiple responses we can use the `n` parameter in the [[knowledge/ai/llm/gpt|GPT]] API

However, generating mutliple variants affects token consumption and increases costs.

## See also

- [Self-consistency for open-ended generations @ Arxiv](https://arxiv.org/abs/2307.06857)
