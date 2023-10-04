---
title: First contact with GPT
---
::: info
LLMs are evolving rapidly, making it hard to keep up. These notes might be outdated.
:::

## GPT

GPT-3.5 isn't the best, but GPT-4 outperforms it in many tasks and even shows signs of AGI. Both however, aren't perfect and won't excel in every task.

Understanding how the model works helps predict when GPT-4 will do well or poorly. The usefulness of GPT-4 and similar tools depends on your ability to use them.

If you expect AI to do most tasks, you might be let down. But some tasks will be automated, freeing you for tasks AI can't do.

AI can help solve tough problems that would take a long time to solve alone.

Like humans, GPT models make mistakes. For instance, it might struggle to multiply 54 × 61 instantly. But breaking down tasks and giving more time increases the chance of a correct answer.

This understanding is crucial for **setting expectations** for our tools. If your first experience with ChatGPT didn't meet your expectations, you might not continue using OpenAI's solution.

Ultimately, GPT-4 can be harnessed for complex tasks. Instead of trying to solve the prime number puzzle, find practical AI applications that can help you in your daily work.

## GPT's potential

Despite limitations, ChatGPT has potential for professional use due to its fast development and API access.

- ChatGPT's data ends in September 2021 and there's a limit to the conversation data (token window).
- It only works with text, has no internet access, and the application interface is limited.
- Each conversation is a new thread with no memory of previous information.

ChatGPT can _hallucinate_, so **responses need to be verified**. Despite this, GPT-4 is great for tasks like

- understanding natural text,
- text transformation,
- information search,
- sentiment analysis,
- data categorization,
- summarizing,
- code generation

API access makes GPT-4 a powerful, customizable tool. API use isn't just for coding but also for macros and automation scenarios.

The main challenge is the time and energy needed to implement these solutions, especially with rapid changes. [[tools/automation/automation|Automation]] and no-code tools can be a solution for that.

## Acting, not reacting

Instead of waiting for AI to change our lives, we should actively find ways to use it to our advantage.

AI is developing rapidly, already impacting 80% of jobs. But it's more about influence than replacement. GPT-4 can do simple tasks alone, but for complex tasks, it works best with humans.

Existing tools are great but often don't fit our needs. It's impractical to build everything from scratch, especially for personal projects. Programming lets us customize these tools without deep knowledge in Deep Learning.

There's a growing trend towards [offline LLMs](https://gpt4all.io/index.html) that operate on our devices, addressing many privacy concerns. This is especially sensitive for both personal and commercial use.

## Problem solving with GPT

Tools like ChatGPT can be a valuable addition to your problem-solving toolkit. When faced with a problem, you can use ChatGPT in several ways:

- Ask a general question about an unfamiliar topic to learn about it and potential techniques to apply.
- Request the implementation of specific logic without sharing your code. Describe the problem and requirements, and only share your ideas when necessary.
- When working with new or niche technology, provide **context** in the form of documentation snippets or specific examples.
- Share code snippets (when possible) to get suggestions, detect potential errors, or refactor your code with GPT-4.
- Discuss concepts and general problems when working on a client project, helping you structure your thoughts.
- Use GPT-4 to generate sample code that can help you develop your own version.

### Tailor the prompt 
However, it's important to tailor your prompt to get the most useful response. You could specify:

- the assistant's specialization,
- your experience level,
- the form of the answer,
- the topic,
- limitations.

These interactions can speed up learning, problem-solving, and concept development. They can help you go beyond your current knowledge, especially when it comes to unfamiliar framework functions or complex logic. **However, always ensure you fully understand the generated code.**

One key suggestion is to generate code in small chunks. Working with extensive AI-generated code can be inefficient as it takes more time to understand. There are exceptions where generating longer code snippets is justified, but legal aspects should be considered. If you're coding for a client, you need to write it yourself, but you can still be inspired by AI-generated code.

Remember, the generated code may not be perfect, but it can help you accomplish your task. Just don't blindly trust it, especially when delivering to clients.

## Security

Working with AI tools like ChatGPT and GPT-4 API requires **a high level of responsibility for data security**, as all queries are stored on OpenAI servers. **Always ensure you have explicit written permission from your employer before using AI tools at work**.

Remember, you can still work with these tools on your own, enhancing your learning efficiency, problem-solving, and task completion without processing sensitive information. Personalization and adaptation to your individual context, needs, and toolset are key.

- **Data leakage** - treat everything you paste into the chat window or send to the API as fully public or potentially public data. Be aware that asking ChatGPT to optimize code written for your company could inadvertently make it *open source*, potentially leading to unintended consequences.
- **Quality of responses** - it may vary. Whether you're using GPT for code generation or text generation, always verify what has been generated. In the case of code, ensure it's safe, optimal, and adheres to your company's coding standards. For text, be aware that ChatGPT may sometimes provide inaccurate or false information.
- **Prompt injection** - a potential threat when user data is directly pasted into your prompt. This could lead to prompt leakage or unauthorized action execution on the backend. Always be cautious and follow good practices to prevent such issues.
- The **unpredictability of the environment** and the execution time - OpenAI's API can be unstable, although it has improved over time. This instability makes the API suitable for private use or production applications that can handle potential downtime, but it may not be ideal for real-time user interaction.
- the **nondeterministic nature of the results**- even when you ask GPT-4 to generate a response in a specific JSON format, the output may not always match the expected structure. For example, asking the same question multiple times may yield different answers. Always assume that the response may not only be incorrect but could also be expressed in an entirely different way, regardless of the prompt structure and query settings.

## GPT-3.5-turbo, GPT-4 and ChatGPT

As a developer, focus on OpenAI's latest models: GPT-3.5-Turbo, GPT-4, Whisper, and ChatGPT. A ChatGPT Plus subscription is useful as it offers better service availability and access to GPT-4 in ChatGPT.

Note the interaction difference between earlier and current models. Earlier models used a question-answer format, making conversation difficult without conversation-simulating mechanisms. With models from GPT-3.5-Turbo onwards, you use *ChatML*, which puts you in a conversation context.

You can influence the conversation, including modifying previous answers. This is key from a programming perspective, as you can change GPT-4's behavior based on the discussion. This is possible because GPT-4 doesn't have a state, and each time you send the entire conversation content.

## Token window

Interaction with AI models involves the Token Window. 1 token is about 4 characters or 0.75 words in English. Each model has a token limit for the window, which includes user input and system-generated content. For GPT-4, it's about 8000 tokens (~6000 words in English).

If you exceed the token limit, the query won't be executed. Then you have options: start a new conversation with conclusions from the previous one, summarize the conversation, optimize the prompt to be more concise, or end the interaction.

The number of tokens affects costs and response time. Depending on the scale, optimizing even single prompts can result in significant savings due to a large number of queries.

## Resources

- [Sparks of AGI: Early experiments with GPT-4 @ Arxiv.org](https://arxiv.org/abs/2303.12712)
