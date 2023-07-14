---
title: Automate grayscale for apps
customHeader: true
---

# Automate enabling/disabling grayscale mode for particular apps

I use [[tools/hardware/iPhone|iPhone]] in grayscale mode most of the time. There are, however, apps for which I want the grayscale to be disabled, like:

- Camera
- YouTube
- Instagram (on demand)
- [[tools/apps/arc|Arc]] browser (on demand)

## Accessibility Shortcut

This way is great for enabling/disabling the grayscale mode on demand. Thanks to the Accessibility Shortcut I can do it by pressing the Side Button 3 times.

[This article](https://intercom.help/flipdapp/en/articles/1970782-how-to-set-up-a-grayscale-shortcut) describes how to setup this Shortcut.

## Personal Automation

::: warning
This feature requires iOS 16 AFAIK.
:::

For the some apps, like the aforementioned Camera, I've set a Personal Automation in [[tools/automation/shortcuts/shortcuts|Shortcuts]] that disables grayscale when I open them and reverts back to greyscale once I close them.

I also have another Personal Automation that resets to grayscale each morning.

Here's an example on how to make a Personal Automation for Camera:

::: info
Due to iOS limitations you have to set the Personal Automation for each app separately.
:::

![](/public/iphone-grayscale.png)

![](/public/iphone-grayscale-2.jpeg)
