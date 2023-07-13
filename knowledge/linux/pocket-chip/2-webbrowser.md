---
title: Installing Web Browser
weight: 2
---

# Web browser

By default, Pocket C.H.I.P. is packed with `firefox-esr`, but right after starting it (which itself took, like, 30sec) the first tab crashed immediately, so probably it's not the way to go.

There's also something called `surf`, but it looks like it does not have any functionalities apart from displaying something, somehow.

## Installing and configuring `dwb`

`dwb` is a small, keyboard-driven browser based on WebKit, that I just heard of. Unlike `firefox-esr` it starts in few seconds and has a decent performance. It looks like Opera Mini back in 2006, which is perfect for a device like this. You can install it with:

```sh
sudo apt install dwb
```

By default, it will open webpages in _desktop mode_, but we can enforce mobile versions by editing `~/.config/dwb/settings`:

```
default-height=272
default-width=420
user-agent=Mozilla/5.0 (Linux; U; Android 4.0.3; en-us) AppleWebKit/999+ (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30
```

## Adding `dwb` to home screen

To make changes to C.H.I.P.s home screen, you need to edit `/usr/share/pocket-home/config.json`. There's `pages.items` array that defines what icons to show in the home screen (up to 6 of them). I've replaced the _Get help_ icon with:

```json
{
  "name": "Web Browser",
  "icon": "appIcons/webbrowser.png",
  "shell": "dwb"
},
```

Also, you need to restart `pocket-home` by killing it:

```sh
skill pocket-home
```

(I had also to restart the device once, as it didn't start again).

## Using `dwb`

- `ctrl + q` - quit
- `o` - open URL
- `j / ↑` - scroll up
- `k / ↓` - scroll down
- `h` - go back
- `l` - go forward
