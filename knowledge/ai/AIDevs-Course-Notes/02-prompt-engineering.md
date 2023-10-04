---
title: Prompt Engineering
---

## Getting the Right Response: It's About Probability

The chance of receiving the desired response hinges on your question's phrasing, or **the prompt definition**.

GPT-4's non-deterministic nature means it doesn't always give the same answer for identical data. This **contradicts the predictability we expect in programming**. It's challenging to envision developing such software in a production environment, seemingly ruling out AI for tasks.

However, there's more to it.

When you ask a question, clearly defining the expected response format and supplying necessary data, you get a consistent answer. But, this doesn't guarantee a 100% chance of receiving it exactly as expected due to GPT-4's non-deterministic nature:

```
U: When is "now"?

AI: "Now" is the present moment, the current point in time. In this conversation, "now" is 2023-03-27. But, as time continuously moves forward, the concept of "now" is always changing to the latest moment.
```

```
U: When is "now"?

AI: "Now" is the present moment or the current point in time. As an AI language model, I can give you the current date, March 27, 2023. However, my perception of time differs from humans, as I don't experience time passage like you do.
```

These examples highlight a useful approach: instead of pitting GPT-4 against yourself, aim for it to return the correct result, you guide it to achieve the desired results.

### Why bother then?

```
U: Return new date, based on user (input) and current date in MMM dd HH:mm format.
Return date and nothing more.

Current date: Monday, 27 March, 18:33
{input): meeting in the morning

AI: Apr 28 09:00
```

You could use a few lines of JavaScript to alter the date format. But, coding a function that returns the correct result for _the day after tomorrow_, _next Friday_, or _after the meeting with Marta_ is much harder. Considering potential typos (e.g., from dictation) or alternative terms for "tomorrow" (e.g., "morning" when said in the evening), the code becomes more complex. For AI, this isn't a significant issue.

---

## Understanding GPT-4

GPT-4 is a potent tool, yet it's not fully comprehended. It operates on probability, selecting the next fitting token. The question's form, words, order, and other parameters influence the answer. GPT-4 doesn't have a distinct "knowledge" to pull from. It tailors its response to the question's context. It lacks reflection and fact retrieval, aiming to return the next token under certain conditions.

You might see the model's [[hallucination]], generating wrong info, limited counting ability, complex task-solving, and imprecise instruction execution. Despite these, GPT-4 can tackle complex problems.

Understanding the models' "unpredictability" and "uncertainty" is **vital** in AI work. We don't fully control GPT-4's behavior, and results need checking.

## Working with GPT-4

Working with GPT-4 differs from traditional programming. If we shift from "seeking certainty" to "boosting probability", we'll see the importance of merging programming with GPT-4.

Programming provides precision, control, and accuracy. GPT-4 enables interaction and solves complex code problems. Your job is to blend programming and GPT-4 effectively. We must accept that we're leaving the realm of certainty and predictability, focusing on maximizing probability and managing unpredictable exceptions.

## GPT-4 API vs Playground vs ChatGPT

Each has unique uses and suits different scenarios.

- **ChatGPT** is excellent for extended conversations. It's somewhat limited due to its public nature and might not always deliver desired answers. It only stores conversation history. Its main perk is the interface that enables long discussions and has virtually no entry barrier.

- **Playground** is ideal for creating and testing prompts. It lets you control all query parameters and save prompt history for easy future access. The latest Playground version supports ChatML and role division.

- **API** is perfect for advanced interactions and customization. It shines in dynamic context building and integration with independently created logic. Here, programming skills, data organization, prompt creation, and context building using search engines are key. It provides the most freedom and interaction possibilities with GPT-4.

---

## Prompt structure

When working with GPT-4, you need to craft a well-structured prompt, which is part of the process known as **Prompt Engineering**. The structure should include:

- An instruction defining general behavior (_As an AI assistant..._)
- A description of the task to be performed, sometimes broken down into steps
- Additional context with useful information (_today is {date}_)
- Examples showing the desired result
- A question or data set for the task

**Precision, brevity, and clarity are crucial**.

The response can be formatted as per your requirements described directly in the prompt.

For production applications, additional elements such as navigating dynamically selected context, content moderation, cost control, and data security are also important.
They present additional challenges that complicate the project and require more experience.

---

## _Debugging_

Debugging with GPT-4 is different from traditional code debugging. It involves identifying subtle language nuances (such as the wrong word order in a sentence) that may cause incorrect behavior.

This can be challenging, especially when changes impact previous modifications.

The process involves tweaking until satisfactory results are achieved for specific data sets.

You can validate your prompts using ChatGPT or by writing functions that verify the prompt's behavior for specific data sets.

### with ChatGPT

You can pass your prompt to it for analysis. For example, you can set a specific context (_act as a prompt engineer_), then ask for confirmation with "...", which saves conversation tokens as the model doesn't return unnecessary, elaborate confirmation of its new role.

Then, you can inform it that you'll pass the prompt soon and describe what you expect. It's important to emphasize the purpose of the prompt, your assumptions, and expected results.

The response you receive can highlight potential problems with your prompt. You can then ask for clarification of specific points or direct suggestions for changes to address them. This way, you can develop effective prompts that successfully achieve your goals.

### with code

It's also a good idea to write functions that verify the behavior of the prompt for specific data sets. Generated answers can be checked by code or by further queries to GPT-4.
For example, such a function checks the behavior of a specific prompt for a set of given messages, displaying the generated answers in the console.

You can save a lot of time by preparing such simple functions, as they save you from clicking through the interface or manually making all queries.

---

## Model training

To make GPT-4 more effective for your tasks, you might need to further train the model. This can be done through **in-context learning** or **fine-tuning**.

In-context learning involves providing additional context or examples

Fine-tuning, which may require large training data sets, permanently changes the model's behavior to suit your needs.

For classification tasks, OpenAI suggests ~100 data sets for each class. However, the effectiveness of the model increases significantly with the number of examples, up to a certain point. Fine-tuning is not simple due to the need for a set of examples in the correct format. Their generation can sometimes be done with GPT-4, but their correctness and diversity must be controlled by a human.

Training your own model from scratch is also an option. This gives you full control over almost every aspect, but it's an advanced topic.

---

## Instruction Design

Optimizing GPT model prompts requires concise, effective instructions. This is vital for efficiency and cost-effectiveness due to token limitations.

For content classification into two categories, you expect one of two results in a specific form. But exceptions can happen. If a phrase doesn't fit a category, the model might return an explanation instead of a category name, disrupting your application.

To manage this, modify the prompt to include a default value and stress that you only want the category name.

::: tip
The phrase _return x and nothing more_ can be very useful in most cases.
:::

Combine these instructions with other prompt design techniques to enhance their effectiveness.

### Zero-shot Learning

Zero-shot learning describes the task directly to the model. It seems simple, but designing zero-shot instructions is an effective, yet creativity-demanding strategy.

The challenge is to outline the desired effect while leaving room for its realization. This doesn't exclude specifying the expected response format.

When designing a prompt, consider its length, precision, and expected behaviors. For example, instead of explaining the entire role of an assistant in the prompt, you can simply say "_As a copywriter (…)_". The term "copywriter" implies many descriptions of a well-written text and allows the use of shortcuts and concepts from the field of copywriting.

Despite its simplicity, the zero-shot technique is not easy in practice. It doesn't mean that the written prompt has to be very short, as it can contain a detailed description of the task.

## One-shot Learning

```
SYSTEM:
Answer yes or no.
###
Example:
- Earth is flat?
- no

U: Are you AI?

AI: yes
```

When a task's solution isn't obvious from its description, one-shot learning can be beneficial. For instance, if you expect an answer in a very specific format, you could provide an example to clarify the desired result.

However, the choice of example can significantly influence the answer. If the example is poorly chosen, it can affect the result:

```
SYSTEM:
Answer yes or no.
###
Example:
- Am I Andrzej Kobra?
- yes

U: Am I Andrzej Kobra?

AI: yes

// In this case the model doesn't know me, yet the example given makes GPT to think I am Krystian.
```

To improve the returned answer's format, you could specify that _you want a direct response, in lowercase, and without additional comments_. Alternatively, you could provide an example that conveys this more precisely than a description.

## Few-Shot Learning

Few-shot learning includes an instruction and several examples of task execution. These prompts increase effectiveness but also increase the prompt's volume, thus increasing the time and cost of the response.

These issues can be reduced by using aliases for the user and assistant, which GPT-4 correctly interprets.

Also, developing a set of test data and using them for automatic verification is crucial for maintaining effectiveness. Regardless of the model, it seems logical to select the most representative examples, whose presence plays a role in the model's learning context. Indicating possible error cases with their help aids in _understanding_ the task being performed.

## Prompt Optimization

If you have a set of data, you can optimize your tasks by handling multiple requests in a single query, similar to executing multiple HTTP requests in parallel rather than sequentially, eg. if you want to convert multiple words into emojis, instead of making separate requests for each word, you can do it all in one prompt.

## JSON Returns

From a programming perspective, matching the responses can be a challenge. Returning the responses in JSON format can be much more convenient. In fact, you'll find that JSON formatted responses are practical for almost every interaction with GPT-4.

For instance, you could ask it to generate an invoice for a client for a specific amount. GPT-4 would generate a JSON object, and your script would make a request to the invoice API to issue the appropriate document.

## Resources

- [What Is ChatGPT Doing … and Why Does It Work?—Stephen Wolfram Writings](https://writings.stephenwolfram.com/2023/02/what-is-chatgpt-doing-and-why-does-it-work/)
- [ChatGPT Explained: A Normie's Guide To How It Works](https://www.jonstokes.com/p/chatgpt-explained-a-guide-for-normies?triedSigningIn=true)
- [Reflexion: Language Agents with Verbal Reinforcement Learning @ Arxiv.org](https://arxiv.org/abs/2303.11366)
- [Prompt Programming for Large Language Models: Beyond the Few-Shot Paradigm @ Arxiv.org](https://arxiv.org/pdf/2102.07350.pdf)
- [Calibrate Before Use: Improving Few-Shot Performance of Language Models](https://arxiv.org/abs/2102.09690)
