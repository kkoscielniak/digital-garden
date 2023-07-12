---
title: "fd"
---

[`fd`](https://github.com/sharkdp/fd) is a supercharged `find` replacement. It has some additional features:

- it colors the output
- by default it ignores `.hidden` files and everything listed in `.gitignore`
- I can also define additionally excluded dirs, like `node_modules`

Also, it has the **smart case** feature, meaning that the input will be treated as case-insensitive unless the upper case character has been put.

I **never** use it _by hand_ - I use it as a default _search engine_ of [[tools/cli/fzf|fzf]] instead.
