---
title: Digital Garden
---

> For the most part I just wing it ad hoc and hope for the best. 😅
> ~ Joel Hooks

## _Digital_ what?

This site is a [digital garden](https://joelhooks.com/digital-garden/), not a blog. I keep it mostly for myself, but I suppose it might be helpful to others as well.

The goal of this project is to be a living reference of what I've learnt, what I am interested in and what skills I actually have.

The main value is not in the carefully crafted blog posts full of anectodes, graphs, opinions and else. Instead, it lies in _linking my thinking_. Recently I learn a lot and I want to find patterns that will help me to improve in my field of expertise.

## Non-linearity

Due to a _non-linear_ nature of this site, I might post here ideas, snippets, resources, thoughts, bits of knowledge, projects of mine or basically anything I find interesting and relating to the rest of the content here. It's basically my own, basic Wikipedia.

This also means not everything is going to be well-writen, perfectly organised, or even truthy. Things change, I change, JavaScript frameworks change. It's hard to keep up sometimes and people make mistakes.

The good part is that the whole thing is [open-source](https://github.com/kkoscielniak/the-garden-content), so if you stumble upon something evidently wrong, you can always open a PR or an issue.

## Technical nitpicks

::: warning
This is outdated.
:::

The page you are seeing is built using [VitePress](https://vitepress.dev) and kept on [GitHub](https://github.com/kkoscielniak/the-garden).

I write using [Obsidian](https://obdidian.md) and keep the Vault (content) in a [separate repo](https://github.com/kkoscielniak/the-garden-content) (referenced by VitePress as a `git submodule`). This should ensure that whenever I decide to use a different _gardening_ solution, the content will is more-or-less safe.

I crafted some scripts for maintaining Obsidian Vault in VitePress (e.g. transforming `[[Wikilinks]]` into `[Markdown](/ones.md)`) which I intend to publish at some point, perhaps in a form of Obsidian Plugin.

The page is hosted on [GitHub Pages](https://pages.github.com/).

## TODO

[ ] Fix Search functionality
[ ] Fix issues with Sidebar rendering
  - [ ] Perhaps with forking `vitepress-sidebar` plugin
[ ] Knowledge Graph
  - [ ] Would be nice as a plugin :)
