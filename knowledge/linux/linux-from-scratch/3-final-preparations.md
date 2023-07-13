---
title: Final preparations
---

I've created the simple file system on my target partition with that script:

```sh
#!/bin/bash
export LFS=/mnt/lfs

mkdir -pv $LFS/{etc,var} $LFS/usr/{bin,lib,sbin}
for i in bin lib sbin; do
  ln -sv usr/$i $LFS/$i
done
case $(uname -m) in
  x86_64) mkdir -pv $LFS/lib64 ;;
esac

mkdir -pv $LFS/tools
```

> [!tip] `mkdir -v`
>
> I didn't know `mkdir` can be verbose. The same goes with `mv` (as I'll learn pretty soon).

Then I've added the `lfs` user to my Manjaro installation to reduce risk of destroying my host:

```sh
$ sudo groupadd lfs # create `lfs` group
$ sudo useradd -s /bin/bash -g lfs -m -k /dev/null lfs # create `lfs` user
$ sudo passwd lfs # set password for `lfs`

$ chown -v lfs $LFS/{usr{,/*},lib,lib64,var,etc,bin,sbin,tools} # set `/mnt/lfs` ownership to `lfs`

su - lfs # login as `lfs` (`-` stands for `login shell`, check `bash(1) manpage`)
```

I've cleaned up the environmental variables for `lfs` user with this `.bash_profile` and `.bashrc` configs:

```sh
# .bash_profile
exec env -i HOME=$HOME TERM=$TERM PS1='\u:\w\$ ' /bin/bash`
```

```sh
# .bashrc
set +h # make bash to always lookup $PATH when a program is about to run (disable bash's hash function)
umask 022  # ensure that created files are only writable by their owner, but are readable and executable by anyone
LFS=/mnt/lfs
LC_ALL=POSIX
LFS_TGT=$(uname -m)-lfs-linux-gnu
PATH=/usr/bin
if [ ! -L /bin ]; then PATH=/bin:$PATH; fi
PATH=$LFS/tools/bin:$PATH CONFIG_SITE=$LFS/usr/share/config.site
export LFS LC_ALL LFS_TGT PATH CONFIG_SITE
```

> [!tip] Emptying the environment
>
> When logging in the initial shell is usually a login shell which reads the `/etc/profile` of the host (probably containing some settings and environment variables) and then `.bash_profile`. The `exec env -i [...] /bin/bash` command replaces the running shell with a new one with a **completely empty environment**, except for what was set with that command.
>
> The new instance of the shell is a _non-login_ shell, which does not read, and execute, the contents of `/etc/profile`/`.bash_profile`, but rather reads, and executes, the `.bashrc`.

I've also renamed `/etc/bashrc` to `/etc/bashrc.NOUSE` to avoid preconfiguring `bash` with stuff that may interfere with the `lfs` (user) environment.

> [!tip] `/etc/bash.bashrc`
>
> Some distros add a non-documented instantiation of `/etc/bash.bashrc` to the initialization of `bash`. Manjaro does that for sure.
