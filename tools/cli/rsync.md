---
title: "rsync"
---

`rsync`, is a file synchronization tool. It uses an algorithm to minimize the amount of data copied by only moving the portions of files that have changed.

```
rsync -a dir1/ dir2
```

> [!tip] `/`
>
> Please note the trailing slash (`/`) at the end of the first argument in the syntax - this makes sure the **content** of the directory is synced, not the directory itself
