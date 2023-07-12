---
title: "fzf"
---

[`fzf`](https://github.com/junegunn/fzf) is a CLI [fuzzy-finder](https://en.wikipedia.org/wiki/Approximate_string_matching) (think: VS Code's Command Palette) for every list-type input:

```sh
git log --oneline | fzf
```

## Keyboard shortcuts

The most important feature for me is that `fzf` enhances [[tools/cli/zsh|zsh]] with fully featured searchable history (`Ctrl + R`). It also adds the interactive _File Search_ (`Ctrl + T`) and interactive directories traversal (`Alt + C`).

The best part is that due to its string matching feature I don't have to remember the full name of previously issued commands or files that I want to open.

## Integrations

### [[tools/cli/bat|bat]]

I use `bat` to preview files directly in File Search mode.

[ ] Screenshot

### [[tools/cli/fd|fd]]

I use `fd` as a default search engine due to its flexibility in terms of what I want to take into account during searching.

I've enabled looking for `.hidden` files and disabled going through `~/Library`, `.git` and `node_modules`.

## Resources

- [My `fzf` dotfile](https://github.com/kkoscielniak/d3/blob/master/.fzfrc)
