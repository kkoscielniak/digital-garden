A `ViewModel` is needed to save the app's transient data and to also access the database.

ViewModel interacts with the database via the DAO, and provides data to the UI. All database operations will have to be run away from the main UI thread, you'll do that using coroutines and [`viewModelScope`](https://developer.android.com/topic/libraries/architecture/coroutines#viewmodelscope).

![91298a7c05e4f5e0.png](https://developer.android.com/codelabs/basic-android-kotlin-training-persisting-data-room/img/91298a7c05e4f5e0.png)
_developer.android.com_

## Example

```kotlin
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import com.example.inventory.data.Item
import com.example.inventory.data.ItemDao
import kotlinx.coroutines.launch

class InventoryViewModel(private val itemDao: ItemDao) : ViewModel() {
    private fun insertItem(item: Item) {
        viewModelScope.launch {
 itemDao.insert(item)
        }
 }

    private fun getNewItemEntry(name: String, price: String, count: String): Item {
        return Item(itemName = name, itemPrice = price.toDouble(), quantityInStock = count.toInt())
    }

    private fun addNewItem(name: String, price: String, count: String) {
        val newItem = getNewItemEntry(name, price, count)

        this.insertItem(newItem)
    }
}

class InventoryViewModelFactory(private val itemDao: ItemDao) : ViewModelProvider.Factory {
    override fun <T : ViewModel?> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(InventoryViewModel::class.java)) {
            @Suppress("UNCHECKED_CAST")
            return InventoryViewModel(itemDao) as T
 }
        throw IllegalAccessException("Unknown ViewModel class")
    }
}
```

The [[knowledge/kotlin/Databases/DAO]] object is needed as a parameter to the default constructor.

The `ViewModelFactory` class with the same constructor parameters is needed to instantiate the `ViewModel`. In this example The overriden `createMethod` checks if the `modelClass` is the same as `InventoryViewModel` class.

> The `ViewModelFactory` is mostly boilerplate code, so can be used without getting into the details in most cases. Yet I still need to learn more about the Factories 😅

The `insert()` method of the [[knowledge/kotlin/Databases/DAO]] is called from the [[knowledge/kotlin/Databases/ViewModelScope]].

Notice that you did not use `viewModelScope.launch` for `addNewItem()`, but it is needed above in `insertItem()` when you call a DAO method. The reason is that the [[knowledge/kotlin/suspend|suspend]] are only allowed to be called from a coroutine or another suspend function. The function `itemDao.insert(item)`is a suspend function.

### Initialisation of ViewModel with the Factory

In `Fragment`:

```kotlin
private val viewModel: InventoryViewModel by activityViewModels {
	InventoryViewModelFactory(
		(activity?.application as InventoryApplication).database.itemDao()
	)
}
```

### Calling the ViewModel methods

```kotlin
if (isEntryValid()) {
	viewModel.addNewItem(
		binding.itemName.text.toString(),
		binding.itemPrice.text.toString(),
		binding.itemCount.text.toString(),
	)
}
```
