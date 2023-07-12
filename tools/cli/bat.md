---
title: "bat"
---

[`bat`](https://github.com/sharkdp/bat) is a supercharged `cat` clone. The main difference is that it highlights the syntax for nearly every programming language out there.

It also shows the modifications made in the `git` working copy (`diff`-like).

It can be easily aliased to replace `cat` system-wide:

```sh
alias cat='bat'
```

It also integrates perfectly with [[tools/cli/fzf|fzf]].