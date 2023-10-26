---
title: ChatML
---

Chat Markup Language - the division of the conversation with [[knowledge/ai/llm/gpt|GPT]] into **`system`**, **`user`** and **`assistant`** [[knowledge/ai/llm/prompt|prompts]].

From the model's perspective, it's still one block of text described by metadata. We should consider it as a whole as well.

Due to that, we don't have to define each field every time. This perspective can help us to design prompts that fit the model's way of working, potentially improving overall model's effectiveness.

## Issues

The `gpt-3.5-turbo` occasionally has issues with following the `system` instructions. In such cases it's wiser to provide the instruction in the `user` field.
