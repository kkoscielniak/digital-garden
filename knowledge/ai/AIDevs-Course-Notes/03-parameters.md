When interacting with GPT-4 (excluding direct ChatGPT), you can adjust additional parameters that influence the generated response.

- **Temperature** - _output's creativity_, determines how often a lower-ranking token will be chosen. Lower values are recommended when you want to increase the chance of getting the same answer for the same data set, while higher values are suitable for generating text without rigid boundaries.

> higher temperature parameter = higher creativity and less predictability.

- **Top P** is another parameter that plays a similar role to temperature but limits the range from which the next token is chosen.
- OpenAI recommends only modifying one of \[topP, temperature\] these parameters at a time.
- **frequency penalty** and **presence penalty** parameters, which lower the probability of recurring tokens (frequency) and those that have already appeared in the text (presence), regardless of repetitions. Essentially, these parameters increase token diversity

## Prompt Format

When designing prompts for GPT-4, the way you mark different sections plays a significant role. By using special characters, you can directly suggest the expected answer format or guide the model towards a solution. So, while GPT-4 can handle poorly formatted text, proper formatting greatly aids in achieving the right results. Remember, the model doesn't pay much attention to text formatting and can handle even a directly pasted block of information well.

When creating prompts, OpenAI suggests starting with instructions and separating the context with unique separators like ###. This method can also be used to separate other parts of the prompt (examples, user question, additional data). The separator should be unique enough not to occur naturally during the conversation.

## Moderation API

A good practice when dealing with applications used by others is to pre-verify messages through the Moderation API. OpenAI will then describe the message with specific parameters. Based on these, you can determine whether the request should be executed, flagged, or rejected.
