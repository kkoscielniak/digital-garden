---
title: Building the Cross Compilation Toolchain
weight: 4
draft: true
---

The overall goal of Chapter 5 and Chapter 6 is to produce a temporary area that contains a known-good set of tools that can be isolated from the host system. By using chroot, the commands in the remaining chapters will be contained within that environment, ensuring a clean, trouble-free build of the target LFS system. The build process has been designed to minimize the risks for new readers and to provide the most educational value at the same time.

The build process is based on the process of cross-compilation. Cross-compilation is normally used for building a compiler and its toolchain for a machine different from the one that is used for the build. This is not strictly needed for LFS, since the machine where the new system will run is the same as the one used for the build. But cross-compilation has the great advantage that anything that is cross-compiled cannot depend on the host environment.

Note

## Machine triplets

Almost all the build systems use names of the form `cpu-vendor-kernel-os` referred to as the **machine triplet** (even tho there are 4 factors, the word _triplet_ remained).

To determine the machine triplet of mine, I ran the `config.guess` from `binutils` sources:

```sh
$ tar -xf binutils-2.39.tar.xz
$ cd binutils-2.39
$ ./config.guess

x86_64-pc-linux-gnu
```

## Dynamic linker

During the process of building Linux From Scratch, we also need the platform's _dynamic linker_ (or _dynamic loader_).

The dynamic linker provided by `Glibc` finds and loads the shared libraries needed by a program, prepares the program to run, and then runs it.

To determine the linker name, I've inspected `bash` binary with `readelf`:

```sh
$ readelf -l /bin/bash | grep interpreter

[Requesting program interpreter: /lib64/ld-linux-x86-64.so.2]
```

---

The cross-compiler will be installed in a separate $LFS/tools directory, since it will not be part of the final system.

---

## Compiling the cross-compiler (Cross Compilation Toolchain, Cross Toolchain)

> The programs compiled in this chapter will be installed under the $LFS/tools directory to keep them separate from the files installed in the following chapters. The libraries, on the other hand, are installed into their final place, since they pertain to the system we want to build.

### `binutils-2.39` (pass 1)

- Approx. build time: 1 SBU
- Real build time: 4m49.102s

- [ ] Why multiple passes? (cros scompilation description)

> The Binutils package contains a linker, an assembler, and other tools for handling object files. It's important to install it first since both Glibc and GCC perform various tests on the available linker and assembler to determine which of their own features to enable.

Here, btw, I am checking how long the compilation of `binutils` took, to use it as a reference value for ... with `time` command.

> [!tip] Key takeaways
>
> SBUs
>
> - [ ] Describe them

```sh
$ tar -xf binutils-2.39.tar.xf && cd binutils-2.39
$ mkdir build && cd build
$ time {
    ../configure --prefix=$LFS/tools \
        --with-sysroot=$LFS \
        --target=$LFS_TGT \
        --disable-nls \
        --enable-gprofng=no \
        --disable-werror;
    make;
    make install;
}
```

> [!tip] `make` and `make install` > `make` compiles the package. `make install` installs it in the system.

### `gcc-12.2.0` (Pass 1)

- Approx. build time: `12 SBU`
- Real build time: `58m27.602s`

This one is tricky. To compile and install `gcc`, I needed `gmp`, `mpfr` and `mpc` packages unpacked first:

```sh
$ tar -xf gcc-12.2.0.tar.xz && cd gcc-12.2.0
$ tar -xf ../mpfr-4.1.0.tar.xz && mv mpfr-4.1.0 mpfr
$ tar -xf ../gmp-6.2.1.tar.xz && mv gmp-6.2.1 gmp
$ tar -xf ../mpc-1.2.1.tar.gz && mv mpc-1.2.1 mpc
```

Then, because I am using a 64bit host, I had to set the default directory for 64-bit libraries to `lib`:

```sh
case $(uname -m) in
  x86_64)
    sed -e '/m64=/s/lib64/lib/' \
        -i.orig gcc/config/i386/t-linux64
;; esac
```

Finally I've compiled and built `gcc`:

```sh
$ mkdir build && cd build
$ time {
    ../configure                  \
        --target=$LFS_TGT         \
        --prefix=$LFS/tools       \
        --with-glibc-version=2.36 \
        --with-sysroot=$LFS       \
        --with-newlib             \
        --without-headers         \
        --disable-nls             \
        --disable-shared          \
        --disable-multilib        \
        --disable-decimal-float   \
        --disable-threads         \
        --disable-libatomic       \
        --disable-libgomp         \
        --disable-libquadmath     \
        --disable-libssp          \
        --disable-libvtv          \
        --disable-libstdcxx       \
        --enable-languages=c,c++;
    make;
    make install;
}
```

I've disabed features I won't need to cross-compile `libc`. The `--without-headers` option is interesting, as when building a _real_ cross-compiler, I'd need the headers compatible with the target architecture. LFS works on the same machine, so I don't need them.

Ulltimately I've had to create a full version of the internal header (as what was compiled until now was partial):

```sh
$ cat gcc/limitx.h gcc/glimits.h gcc/limity.h > \

  `dirname $($LFS_TGT-gcc -print-libgcc-file-name)`/install-tools/include/limits.h
```

## `linux-5.19.2` API Headers

- Approx build time: 0.1 SBU
- Real build time:

To expose an API for `glibc` in LFS I had to sanitaze headers in the tarball:

```sh
$ tar -xf linux-5.19.2.tar.xz && cd linux-5.19.2

$ make mrproper # make sure no stale files are embedded in the package
$ make headers
$ find usr/include -type f ! -name '*.h' -delete
$ cp -rv usr/include $LFS/usr
```

Last two commands are necessary, as we need to copy just the user-visible kernel headers to `/mnt/lfs/usr/include/`:

```sh
$ ls /mnt/lfs/usr/include/

asm  asm-generic  drm  linux  misc  mtd  rdma  scsi  sound  video  xen
```

### `glibc-2.36`

- approx build time: 4.4SBU
- real build time:

> [!tip] `glibc`
>
> The `glibc` package contains the main C library.

First, I needed to create a symbolic link for dynamic library loader:

```sh
$ tar -xf glibc-2.36.tar.xz && cd glibc-2.36
$ case $(uname -m) in
    i?86)
    ln -sfv ld-linux.so.2 $LFS/lib/ld-lsb.so.3
    ;;
    x86_64)
        ln -sfv ../lib/ld-linux-x86-64.so.2 $LFS/lib64
        ln -sfv ../lib/ld-linux-x86-64.so.2 $LFS/lib64/ld-lsb-x86-64.so.3
    ;;
esac
```

I've also had to apply a patch to make sure programs store their data in FHS (Filesystem Hierarchy Standard) compliant way and ensure `ldconfig` and `sln` are installed into `/usr/bin`.

```sh
$ patch -Np1 -i ../glibc-2.36-fhs-1.patch
$ mkdir build && cd build
$ echo "rootsbindir=/usr/sbin" > configparms
```

I configured `glibc`:

```sh
$ ../configure                             \
    --prefix=/usr                      \
    --host=$LFS_TGT                    \
    --build=$(../scripts/config.guess) \
    --enable-kernel=3.2                \
    --with-headers=$LFS/usr/include    \
    libc_cv_slibdir=/usr/lib
```

- `--host=$LFS_TGT, --build=$(../scripts/config.guess)` - these switches ensure `glibc`'s build system configures itself to be **cross-compiled**, using the cross-linker and cross-compiler in `$LFS/tools`.
- `--enable-kernel=3.2` - minimum version of the Linux kernels to support
- `--with-headers=$LFS/usr/include` - makes `glibc` compile itself against the headers recently installed to the `$LFS/usr/include directory`

Finally I compiled and installed the package:

```sh
$ make
$ make DESTDIR=$LFS install
```

> [!tip] `DESTDIR` variable
>
> It's used by almost all packages to defined where the package should be installed. If not set, it defaults to `/`. This way we ensure `glibc` is going to install itself to where I'll `chroot` later.

For `glibc` it was also necessary to fix hardoced path to executable loader in `ldd` script:

```sh
sed '/RTLDLIST=/s@/usr@@g' -i $LFS/usr/bin/ldd
```

#### Verification

At this point the Handbook explicitly told me to stop and see if the basic functions of the new toolchain work as expected:

```sh
$ echo 'int main(){}' | gcc -xc -
$ readelf -l a.out | grep ld-linux

[Requesting program interpreter: /lib64/ld-linux-x86-64.so.2]

$ rm -v a.out
```

> [!info] So far so good?
>
> So far, everything wen't okay. But, it was also mentioned that following from now, if something fails to build, it may indicate that something went wrong with building `binutils`, `gcc` or `glibc`.

Ultimately, since the cross-toolchain installation is complete, I needed to finalize the installation of the `limits.h` header:

```sh
$LFS/tools/libexec/gcc/$LFS_TGT/12.2.0/install-tools/mkheaders
```

### `libstdc++` from `gcc-12.2.0`

> [!info]
>
> `libstdc++` is part of `gcc`, so I needed to untar this one
> `tar -xf gcc-12.2.0 && cd gcc-12.2.0`

```sh
$ mkdir -v build && cd build
$ ../libstdc++-v3/configure           \
    --host=$LFS_TGT                 \
    --build=$(../config.guess)      \
    --prefix=/usr                   \
    --disable-multilib              \
    --disable-nls                   \
    --disable-libstdcxx-pch         \
    --with-gxx-include-dir=/tools/$LFS_TGT/include/c++/12.2.0
$ make
$ make DESTDIR=$LFS install

```

--host=...

Specifies that the cross compiler we have just built should be used instead of the one in /usr/bin. --disable-libstdcxx-pch

This switch prevents the installation of precompiled include files, which are not needed at this stage.

    --with-gxx-include-dir=/tools/$LFS_TGT/include/c++/12.2.0

This specifies the installation directory for include files. Because libstdc++ is the standard C++ library for LFS, this directory should match the location where the C++ compiler ($LFS_TGT-g++) would search for the standard C+ + include files. In a normal build, this information is automatically passed to the libstdc++ configure options from the top level directory. In our case, this information must be explicitly given. The C++ compiler will prepend the sysroot path $LFS (specified building GCC pass 1) to the include file search path, so it will actually search in $LFS/ tools/$LFS_TGT/include/c++/12.2.0. The combination of the DESTDIR variable (in the make install command below) and this switch ensures to install the headers there.

---

That concludes building the Cross Compilation Toolchain
