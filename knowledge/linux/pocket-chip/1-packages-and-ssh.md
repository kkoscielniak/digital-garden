---
title: Package manager and SSH
weight: 1
---

# Package Manager and SSH

## Setting up package manager

The Next Thing Co.'s package repository is dead for a long time, but one guy still mirrors them.

You can refer to [this page](http://chip.jfpossibilities.com/chip/debian/) to make the package manager work. Don't forget to `sudo apt-get update` (I wouldn't risk `upgrade` though).

## Setting up `ssh`

To install and enable SSH:

```sh
sudo apt-get install openssh-server
sudo systemctl enable ssh.socket
```

> You need `sudo` to use commands like `ifconfig`, `shutdown`, `reboot`. Without that **they won't even show up** 😲

Reboot, then check the IP using `sudo ifconfig` and issue `ssh chip@<ip>` on another host. By default the credentials are `chip`/`chip`.

## Packages

Right after setting up package manager and SSH access, I've installed these packages to make my life a bit easier.

- `vim` - instead of quirky `vi`
- `mc` - Midnight Commander is a must for me
