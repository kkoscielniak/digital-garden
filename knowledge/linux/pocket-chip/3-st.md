---
title: st
---

`st` is a lightweight terminal emulator that fits [[knowledge/linux/pocket-chip/pocket-chip|pocket-chip]] well.

## Installation

It has to be installed from source

```sh
sudo apt-get install gcc make
sudo apt-get install libx11-dev libxft-dev libxext-dev
git clone git://git.suckless.org/st
cd st
sudo make clean install
```

## Menu entry

```json
// /usr/share/pocket-home/config.json
{
  "defaultPage": "Apps",
  "pages": [
    {
      "name": "Apps",
      "items": [
        {
          "name": "Terminal",
          "icon": "appIcons/terminal.png",
          "shell": "st" // replace `vala-terminal` with `st`
        }
        // ...
      ]
    }
  ]
}
```

```
skill pocket-home
```

Now you can enjoy the uncluttered terminal experience on the C.H.I.P.
