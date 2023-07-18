---
title: Keyboard Maestro
---

[Keyboard Maestro](https://www.keyboardmaestro.com) is an app that allows to automate tasks within macOS. Think: [[tools/automation/shortcuts/shortcuts|Shortcuts]] on steroids.

I call the Keyboard Maestro macros with hotkeys, from [[tools/hardware/stream-deck|Stream Deck]] or with an extension for [[tools/apps/raycast|Raycast]], but some triggers can be automated as well, eg. connecting an USB device.

## Things I automate

- [[tools/automation/keyboard-maestro/macros/arc-url-md|copying currently opened URL]] in Markdown format
- [[tools/automation/keyboard-maestro/macros/favorite-km-macro|copying samples to my MPC Live]] once I connect it to my computer
- googling the selected text with **⌘ ⇧ 1**
- opening Google Maps with the route and ETA to provided destination
- text expanding and manipulation
  - e.g. by typing `;invoice` I make KM to type full message of my typical invoice e-mail
  - typing `;php` to include `<?php ... ?>`
- translating the selected text
- opening my favorites directories in Finder from everywhere
- etc. etc.

Even though these examples are basic, it feels right to automate these activities. I've learnt a lot about the application itself when I was making these scenarios.

## Useful shortcuts

- `⌃ + ⌘ + A` - Insert Action by name

## Text expander fix

By default KM will process escaped HTML characters when expanding a text (via _Insert Text by Typing_ action). You can fix this in the action settings:

![](/public/km-text-expander-fix.png)
[ ] Add image for Text Expander

## Resources

- [Keyboard Maestro Basics course](https://eduweb.pl/marketing-i-biznes/biznes/keyboard-maestro-automatyzacja-macos) 🇵🇱
