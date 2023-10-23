_hallucinations_- responses from [[_inbox/llm|llm]] that sound convincing but aren't true.

They don't contain correct information but appear as if they do, making them hard to spot at first glance.

It's crucial to validate the accuracy of the information provided by the [[_inbox/llm|LLM]].

## Risk mitigation

- deliberately telling the LLM that it should provide only truthfull information and admit the lack of knowledge if it doesn't have it

> SYSTEM: Hey! I'll answer all your questions ultra-briefly and as truthfully as possible. When I don't know the answer, I'll say, "I don't know."

- providing additional [[_inbox/prompt-context]] and emphasing that LLM should only use the knowledge provided by it:

> Hey! I'll answer all your questions ultra-briefly and as truthfully as possible using the context below, and nothing more. When I don't know the answer, I'll say, "I don't know."
>
> context###
>
> - Latest macOS Ventura 13.4.1 (c)
> - Current date: Wed 30.08.2023
>
> ###
