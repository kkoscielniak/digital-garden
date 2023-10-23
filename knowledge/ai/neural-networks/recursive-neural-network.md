Recursive Neural Network - a type of [[_inbox/neural-network|neural network]].

RNNs are excellent for **processing sequences** due to their **feedback loop**.

This loop passes information from one network step to the next, allowing RNNs to **_remember_ previous steps**. This memory capability enables them to consider [[_inbox/prompt-context|context]] when processing new data. RNNs can remember, for example, that a previous sentence ended with a question and adjust the generated text accordingly.

RNNs are great for generating text, poetry, and even composing music pieces. They

However, a challenge with RNNs is their difficulty in retaining information for a long term. When a data sequence is too long, RNNs start to forget the initial segments. This is something to consider when working with extensive data sequences.

## See also

- [[knowledge/ai/llm/token-window|Token window]]
