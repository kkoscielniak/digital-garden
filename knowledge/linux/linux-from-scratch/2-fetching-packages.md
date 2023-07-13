---
title: Fetching necessary packages
---

I've began with obtaining the packages that are needed to build a basic Linux system.

I went with the `wget-list` way. First, I've downloaded the `wget-list` from the mirror, then I've `wget` all the listed packages (plus a `md5sums` file for verification):

```sh
wget https://lfs.opensource.foundation/lfs/downloads/stable/wget-list --directory-prefix=/mnt/lfs/sources
wget --input-file="/mnt/lfs/sources/wget-list" --continue --directory-prefix=/mnt/lfs/sources
wget https://lfs.opensource.foundation/lfs/downloads/stable/md5sums --directory-prefix=/mnt/lfs/sources
```

I checked the `md5sum`s to see if I'm good to go with that script:

```sh
# source-check.sh
pushd $LFS/sources
  md5sum -c md5sums
popd
```

That's how I knew I'm missing [`expat-2.4.8.tar.xz`](/https://github.com/libexpat/libexpat/releases/download/r_2_4_8/expat-2.4.8.tar.xz) (because it was moved from SourceForge to GitHub) and `zlib-1.2.12.tar.xz` (an update became available, so I've downloaded this particular version from [here](/https://www.zlib.net/fossils/); since no `xz` archive is available, I wasn't able to check the MD5 sum for this one. We'll see how it goes).
