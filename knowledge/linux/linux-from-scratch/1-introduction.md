---
title: Introduction
weight: 1
---

Initially I wanted to go through [[knowledge/linux/linux-from-scratch/linux-from-scratch|linux-from-scratch]] in a Virtual Machine. Unfortunately that didn't play well as:

- emulating `x86_64` architecture on Apple Silicon sucks
- I could use `arm64` distro image in [UTM](https://getutm.app/), but I'd probably need to figure out architecture-related details on my own, as LFS does not cover these
  - I've even installed Ubuntu Server for `arm64` in a VM and the experience was bad from the very beginning.

Instead of this, I opted for an older Dell Latitude E6400 computer lying around. I've installed [Manjaro Linux](https://manjaro.org/) as a host for building my LFS.

I've partitioned my SSD in such way:

- `/boot` (200MB) - recommended by LFS handbook
- `/` (30GB) - Manjaro Linux (the _build_ or _host_ partition)
- `/home` (50GB) - shared `home` to use in both Manjaro and LFS
- `/mnt/lfs` (30GB) - LFS _target_ partition

I've also installed and configured `openssh` so I can use my [Keychron](tools/hardware/keychron) instead of this clunky old laptop keyboard. Building LFS is done in CLI anyway.

## Key assumptions

What I want to build doesn't have to be usable. I'll be happy if it will boot at all. That being said, I won't look for community-driven security patches, GUIs, auditing the packages I'm adding to my build etc, etc.

Maybe, at some point, I'll take a look at [Beyond LFS](https://www.linuxfromscratch.org/blfs/), but not necessarily these Christmas.

Also, I won't describe every option for building the tools in the process, but if something catches my eye, I'll briefly explain it.
