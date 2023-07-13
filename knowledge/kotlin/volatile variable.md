The value of a `@Volatile`-denoted variable will never be cached, and all writes and reads will be done to and from the main memory.

This helps make sure the value of volatile variable is always up-to-date and the same for all execution threads. It also means that changes made by one thread to volatile variable are visible to all other threads immediately.

```kotlin
@Volatile private var INSTANCE: RoomDatabase? = null
```
