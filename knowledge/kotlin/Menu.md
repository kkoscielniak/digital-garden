> Just some snippets for now 😅

## Redrawing the options menu

Once a menu is created, it's not redrawn every frame since it would be redundant to redraw the same menu every frame. The `invalidateOptionsMenu()` function tells Android to redraw the options menu.

```kotlin
activity?.invalidateOptionsMenu()
```
