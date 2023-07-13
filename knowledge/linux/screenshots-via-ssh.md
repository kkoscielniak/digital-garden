---
title: Screenshots via SSH
---

# Screenshots via SSH

To take a screenshot of another X session running:

```sh
DISPLAY=:0 scrot
```

To download the screenshot via `scp`:

```sh
scp username@hostname:/path/to/remote/file /path/to/local/file
```

Useful with [[knowledge/linux/pocket-chip/pocket-chip|Pocket CHIP]]
