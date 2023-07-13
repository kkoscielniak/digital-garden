---
title: Hashing
---

Hashing is a one-way process that is used to transform data into a unique signature.

To be a hashing algorithm, the resulting output must be **impossible to reverse**.

A good hashing algorithm will ensure that every piece of data entered will have a completely unique hash.

Hashes are frequently used to verify the integrity of files and documents, as even a very small change to the file will result in the hashsum changing significantly.

> [!tip] MD5 is deprecated.
>
> ...and should not be used for modern applications.
>
> - [ ] Read why

Hashes are also used to securely store passwords as the passwords will be (relatively) secure even if the database is leaked.
