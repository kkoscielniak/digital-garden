---
title: ScriptKit
---

[ScriptKit](https://www.scriptkit.com/) is a low-code tool for writing [[tools/automation/automation|automation scripts]] in TypeScript.

It has a convenient launcher for said scripts, available across the whole system with `⌘ + ;`.

## The good parts

- it's practically a Node.js runtime on steroids
- has access to the vast library of npm packages out-of-the-box
- provides the high-level APIs for interacting with OS
- provides ways for building widgets
  - has [[knowledge/tailwindCSS|tailwindCSS]] support out-of-the-box
- allows to register global keyboard shortcuts for triggering scripts
- has an active community

## The bad parts

- contrary to [[tools/automation/keyboard-maestro/keyboard-maestro|Keyboard Maestro]], scripts have to be called manually
  - as far as I know there's no way of triggering them automatically (e.g. when a USB device gets connected).
