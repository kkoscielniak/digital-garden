---
title: C.H.I.P. as conference badge
---

![](/public/chip-badge.png)

## Tools

- [[knowledge/linux/pocket-chip/3-st|st]]
- [[tools/cli/tmux|tmux]]
- `tmuxinator` (`0.9.0` as it's the last one supported by Ruby `2.1.5` that comes preinstalled on [[knowledge/linux/pocket-chip/pocket-chip|pocket-chip]])
  - Badge window - displays the conference logo and my name
    - The logo is generated with [`ascii-image-converter`](https://github.com/TheZoraiz/ascii-image-converter#debian-or-ubuntu-based-distros)
    - `ascii-image-converter -C info.png --color-bg`
  - QR Code window
    - I've created an ASCII QR code with [`qrcode-terminal`](https://www.npmjs.com/package/qrcode-terminal)
      - [CodeSandbox](https://codesandbox.io/p/sandbox/jovial-bogdan-mhtyqr?file=%2Findex.js%3A2%2C1), because I wanted it to be smaller to fit the display's height, and `qrcode-terminal` does not support this opt via CLI
- Disable the display timeout with `xset -dpms`
