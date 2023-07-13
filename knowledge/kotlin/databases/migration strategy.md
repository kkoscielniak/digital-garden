Normally, you would have to provide a [[knowledge/kotlin/Databases/migration object]] with a migration strategy for when the schema changes.

Or just use `.fallbackToDestructiveMigration()` to destroy and rebuild the database, losing all the data in the process.

Yet, there's a lot more to learn here 😅

## Resources

[Migration](https://medium.com/androiddevelopers/understanding-migrations-with-room-f01e04b07929)
