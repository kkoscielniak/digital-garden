---
title: yabai
---

# `yabai`

::: warning
This post was written for [Ahoy Community](https://ahoy.so) and has been translated using the GPT API. Also, I've changed my configuration a lot when I was configuring my latest [MacBook Pro](Tools/hardware/index.md#workstation).
:::

Ahoy! 👋

In our community, we pay a lot of attention to tools that speed up our daily, mundane tasks. One such task for me is managing windows in macOS.

> I even once got a reprimand from a PM for publicly calling the default window manager in macOS "plain bollocks" 🥲

I know that working with windows can be done using BetterTouchTool or Magnet, but there is a tool that takes window management to the next level.

I have always been fascinated by the Tiling Window Managers known from Linux, which automatically organises windows into tiles and virtual desktops into dedicated "spaces" (e.g. for browsing the web, working in a code editor, and communicating). There is a huge magic in manipulating practically the entire desktop without using the cursor. And this magic can also be transferred to the Cupertino system.

## Introducing `yabai`+`skhd`!

[`yabai`](https://github.com/koekeishiya/yabai) is a window manager that extends Finder's capabilities by allowing you to manage windows, virtual desktops, and physical screens through CLI. It also lets you tile or stack windows and name virtual desktops according to their purpose. I've only tested a few features, but there are many more possibilities in practice.

[`skhd`](https://github.com/koekeishiya/skhd), on the other hand, is a system service that allows you to execute any CLI command using keyboard shortcuts and change keyboard behavior. You can use it to work with `yabai`, launch applications and scripts, and even map the `±` button to `Escape` on Macs with the infamous Touch Bar.

Unfortunately, `yabai` operates at a very low level, tightly integrating with macOS, which has some drawbacks that may disqualify it for some of you.

Firstly, it's a tool for power users due to its complicated installation and configuration process. Like its Linux counterparts, all configuration is stored in configuration files (`~/.config/[yabai|skhd]/...`), and the documentation is highly technical. So, I encourage you to read it carefully.

Secondly, to fully utilise its potential, you need to disable System Integrity Protection. I expect that some of you won't want to do this. And certainly, some employers won't allow it. On the other hand, there's probably a way to replace features that can't be used without disabling SIP with other tools.

And thirdly, there are occasional inconsistencies in its operation, with some windows not fitting into their tiles and others being stretched unnecessarily. Everything can be fixed, but it's worth mentioning. I don't want you to conclude that `yabai` is more of a hindrance than a help 😉How do I use `yabai`?

> From now on, when I say `yabai`, I will refer to the tandem of both tools 🤓

![](/public/yabai-1.png)

### Virtual desktops level

First and foremost, I see the greatest value in managing virtual desktops - I work on one [screen](Tools/hardware/index.md) and six virtual screens:

- `www` - Arc Browser
- `dev` - preview of the project I am currently working on, documentation, etc. (usually the second browser window)
- `code` - code editor (VS Code/IntelliJ IDEA)
- `term` - terminal (Alacritty)
- `msgs` (messages) - Discord, Slack, and iMessage
- `music` - Endel and Spotify, sometimes I throw a YouTube window there

My configuration file clearly defines which applications should open on which desktop. I also left 3 virtual desktops at hand for temporary _junk_ - like VPNs, database management programs, etc.

I switch between virtual windows using keyboard shortcuts `alt + 1..9`, and the absolute hit for me is the ability to move windows to another desktop using `shift + alt + 1..9`.

### Single desktop level

On a single desktop, I usually use the tiled mode. Newly opened windows automatically arrange themselves on the next tile. Although I usually don't open more than two windows per desktop, knowing where any potential subsequent window will appear gives me a sense of control.

I can jump between windows using shortcuts `⌘ + ⌥ + H|J|K|L`. Although, to be honest, I still reach for the mouse relatively often 😅

I don't want some applications in tiles - this mainly applies to those that I open briefly and then hide: iMessage, System Preferences, Mail, Cron, or Todoist - and this is also reflected in my configuration.

I also added the shortcut `CMD + ALT + Space`, which quickly switches the tiled mode to the standard one known from macOS - in case an application doesn't allow clicking the button because something has been scaled incorrectly (I'm looking at you, IntelliJ IDEA 🤬). It also allows me to reset the window positions if necessary.

Finally - I set a 10px space between windows. Because I can 🤓

## Swiftbar

I also want to briefly mention a third, optional tool called [Swiftbar](https://github.com/swiftbar/SwiftBar). It is a program that periodically runs shell scripts and displays their results in the macOS MenuBar.

![](/public/yabai-2.png)

Thanks to Swiftbar, I have a list of virtual desktops next to the clock, with an indication of which one I am currently on. After years of using `yabai`, I don't need such a preview because muscle memory does its job, but it's a gadget that I just wanted to have 🤓

> I wrote this script for Swiftbar myself and it's ugly, but I can share its code on request 😅

## In summary

`yabai` and `skhd` are the basic elements of my workflow on macOS. Although the first few weeks required a change in habits and frequent return to configuration files, I believe that the time spent learning has paid off multiple times.

The sense of control that these two tools provide and the joy of using the computer without pointless window dragging is something worth investing in.

If you are curious about how much you can redefine the use of your computer, I encourage you to browse the [documentation](https://github.com/koekeishiya/yabai/wiki) and sample [configuration files](https://github.com/kkoscielniak/d2/blob/master/config/yabai/yabairc) ([for skhd](https://github.com/kkoscielniak/d2/blob/master/config/skhd/skhdrc)). The latter are mine and also outdated because I still haven't cleaned up my `dotfiles` - but they can still help you understand this tool. And if you encounter difficulties, I am happy to help with my experience 😉

## PS.

Yes, your trained eyes see it right - I have a wallpaper from Windows XP. Something that was supposed to be a situational joke got out of control 😅
