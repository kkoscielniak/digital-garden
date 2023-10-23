---
title: Undeterministic nature of LLMs
---

Due to the non-deterministic nature of [[_inbox/llm]]s, executing the same instructions repeatedly may yield different results (unlike [[knowledge/others/pure-fn|pure-fn]]s).

This behavior is undesirable for application logic that performs specific tasks.

Additional challenges arise when modifying prompts and dealing with unpredictable input data (e.g., in chatbots, you can't predict what the user will type).

::: warning
You can only control the model's _behavior_, but you can't be sure that the generated result will always match your assumptions.
:::
