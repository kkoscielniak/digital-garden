Entity class defines a table, and each instance of this class represents a row in the database table. It has mappings to tell Room how it intends to present and interact with the information in the database.

![8c9f1659ee82ca43.png](https://developer.android.com/codelabs/basic-android-kotlin-training-persisting-data-room/img/8c9f1659ee82ca43.png)
_developer.android.com_

`@Entity` annotation marks a [[knowledge/kotlin/Data class]] as a database Entity class. For each Entity class a database table is created to hold the items. Each field of the Entity is represented as a column in the database (unless it is denoted otherwise, check [Entity](https://developer.android.com/reference/androidx/room/Entity) docs).

Every entity instance that is stored in the database must have a [[knowledge/databases/primary-key|primary-key]].

## Example

```kotlin

import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "item")
data class Item(
	@PrimaryKey(autoGenerate = true)
	val id: Int = 0,

	@ColumnInfo(name = "name")
  val itemName: String,

	@ColumnInfo(name = "price")
  val itemPrice: Double,

	@ColumnInfo(name = "quantity")
	val quantityInStock: Int
)

fun Item.getFormattedPrice(): String {
    return NumberFormat.getCurrencyInstance().format(itemPrice)
}
```

The default value of `id = 0` is necessary, since the `id` parameter serves as the [[knowledge/databases/primary-key|primary-key]].

The `@PrimaryKey` annotation is needed as well. `autoGenerate` makes Room to generate the ID for each entity.

The `@ColumnInfo` annotation is used to customise the column associated with the particular field (like specifying the custom column name).

`Item.getFormattedPrice()` is an [[knowledge/kotlin/Extension functions|extension function]] used to convert a double value to the desired currency format. Normally you don't want to change an entity class that represents data just to format the data ([SRP](https://en.wikipedia.org/wiki/Single-responsibility_principle)).
