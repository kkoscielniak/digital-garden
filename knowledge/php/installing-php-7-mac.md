---
title: Install PHP 7.4 in 2023
customHeader: true
---

# How to install `php@7.4` on macOS in 2023?

```sh
brew tap shivammathur/php
brew install shivammathur/php/php@7.4
brew link --overwrite --force shivammathur/php/php@7.4
```

## Composer

```sh
brew edit composer
```

Remove `depends_on "php"` (`:23`) and run:

```sh
HOMEBREW_NO_INSTALL_FROM_API=1 brew install composer
```
