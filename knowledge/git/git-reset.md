---
title: git reset
---

`git reset` moves the current HEAD to the commit specified:

```sh
$ git reset --hard HEAD (going back to HEAD)
$ git reset --hard HEAD^ (going back to the commit before HEAD)
$ git reset --hard HEAD~1 (equivalent to "^")
$ git reset --hard HEAD~2 (going back two commits before HEAD)
```

`--hard` is used to reset the files of the index/staging area and of the working copy. `--hard` leaves the untracked files in peace, does not delete them.

## Resources

- https://devconnected.com/how-to-git-reset-to-head/
