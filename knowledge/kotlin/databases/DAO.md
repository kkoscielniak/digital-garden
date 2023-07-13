[Data access object (DAO)](https://developer.android.com/training/data-storage/room/accessing-data) provides methods that the app uses to retrieve, update, insert, and delete data in the database.

The functionality of the DAO is to hide all the complexities involved in performing the database operations in the persistence layer that is separated from the rest of the application. This allows the data access layer to be changed independently of the code that uses the data. This isolation follows the [single responsibility principle](https://en.wikipedia.org/wiki/Single-responsibility_principle).

Data access objects are the main components of Room that are responsible for defining the interface that accesses the database. Room will generate an implementation of that interface at compile time.

![7a8480711f04b3ef.png](https://developer.android.com/codelabs/basic-android-kotlin-training-persisting-data-room/img/7a8480711f04b3ef.png)
_developer.android.com_

## Example

```kotlin
import androidx.room.*
import kotlinx.coroutines.flow.Flow

@Dao
interface ItemDao {
	@Insert(onConflict = OnConflictStrategy.IGNORE)
	suspend fun insert(item: Item)

	@Update
	suspend fun update(item: Item)

	@Delete
	suspend fun delete(item: Item)

	@Query("SELECT * FROM item WHERE id = :id")
	fun getItem(id: Int): Flow<Item>

	@Query("SELECT * FROM item ORDER BY name ASC")
	fun getItems(): Flow<List<Item>>
}
```

For common database operations, the `Room` library provides convenience annotations, such as `@Insert`, `@Delete`, and `@Update`. For everything else, there is the `@Query` annotation.

The `onConflict` argument tells Room what to do in case of a conflict. The `OnConflictStrategy.`_`IGNORE`_ strategy ignores a new item if it's primary key is already in the database ([documentation](https://developer.android.com/reference/androidx/room/OnConflictStrategy.html))

The database operations can take a long time to execute, so they should run on a separate thread. Make the function a [[knowledge/kotlin/suspend|suspend]], so that this function can be called from a [[knowledge/kotlin/Coroutines|Coroutines]].

Using `Flow` or `LiveData` as return type will ensure you get notified whenever the data in the database changes. It is recommended to use `Flow` in the persistence layer. Room keeps this `Flow` updated for you, which means you only need to explicitly get the data once. This is helpful to update the lists and else.

Because of the `Flow` return type, Room also runs the query on the background thread. You don't need to explicitly make it a `suspend` function and call inside a [[knowledge/kotlin/CoroutineScope|CoroutineScope]].
