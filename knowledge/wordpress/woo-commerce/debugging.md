---
title: Debugging
---

## Enable debug messages

To enable displaying errors in WooCommerce in the output HTML, you need to add the following code snippet to your WordPress config file:

```php
define( 'WC_DEBUG_DISPLAY', true );
```

This will enable error reporting and display in the output HTML. Additionally, you can also enable logging to a file by defining the following constant:

```php
define( 'WC_LOG_ENABLED', true );
```

These settings should only be enabled in a development environment and not in production.
