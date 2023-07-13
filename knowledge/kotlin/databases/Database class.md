[Database class](https://developer.android.com/reference/kotlin/androidx/room/Database) holds the database and is the main access point for the underlying connection to your app's database.

The Database Class uses the [[knowledge/kotlin/Databases/Entity class]] and [[knowledge/kotlin/Databases/DAO]] to define the list of entities and data access objects. It is also the main access point for the underlying connection.

The [`Database`](https://developer.android.com/reference/androidx/room/Database) class provides your app with instances of the DAOs you've defined. In turn, the app can use the DAOs to retrieve data from and save data in the database as instances of the associated data entity objects.

## Example

### Creating the database class

```kotlin
// Creating the database
import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase

@Database(entities = [Item::class], version = 1, exportSchema = true)
abstract class ItemRoomDatabase : RoomDatabase() {
	abstract fun itemDao(): ItemDao

	companion object {
		@Volatile
		private var INSTANCE: ItemRoomDatabase? = null

		fun getDatabase(ctx: Context): ItemRoomDatabase {
			return INSTANCE ?: synchronized(this) {
				val instance = Room.databaseBuilder(
					ctx.applicationContext,
					ItemRoomDatabase::class.java,
					"item_database"
				)
				.fallbackToDestructiveMigration()
				.build()

				INSTANCE = instance

				return instance
			}
		}
	}
}
```

The Database Class is an `abstract class` that acts as a database holder and it's annotated with `@Database`. Room will create an implementation of this class for you.

This class has one method that either creates an instance of the `RoomDatabase` if it doesn't exist, or returns the existing instance of the `RoomDatabase`.

Whenever you change the schema of the database table, you'll have to increase the `version` number.

`exportSchema = false`, prevents schema version history backups.

The [[knowledge/kotlin/volatile variable|volatile]] `INSTANCE` variable inside the [[knowledge/kotlin/Companion object]] will keep a reference to the database, when one has been created. This helps in maintaining a single instance of the database opened at a given time, which is an expensive resource to create and maintain.

The abstract `getDatabase(ctx)` function that returns a [[knowledge/kotlin/Databases/DAO]] is needed for Room to create the implementation for you. You can have multiple DAOs if needed.

Multiple threads can potentially run into a race condition and ask for a database instance at the same time, resulting in two databases instead of one. Wrapping the code to get the database inside a `synchronized` block means that only one thread of execution at a time can enter this block of code, which makes sure the database only gets initialized once. Pass in `this` the companion object, that you want to be locked inside the function block.

`Room.databaseBuilder()` builds the database connection. Needs an applicatoin context, the [[knowledge/kotlin/Databases/Database class]] and the database name. It also needs the [[knowledge/kotlin/Databases/migration strategy]] (`.fallbackToDestructiveMigration()` in this simple example).

### Using the DB class in the Application Class

```kotlin
// implementation of the Application class
import android.app.Application
import com.example.inventory.data.ItemRoomDatabase

class InventoryApplication : Application() {
	val database: ItemRoomDatabase by lazy {
		ItemRoomDatabase.getDatabase(this)
	}
}
```

Using `lazy` delegate so the instance `database` is lazily created when you first need/access the reference (rather than when the app starts). This will create the database (the physical database on the disk) on the first access ever.
