Preferences DataStore is ideal for small, simple datasets, such as storing login details, the dark mode setting etc. The DataStore is not suitable for complex datasets. If you need to store large or complex datasets, use Room instead.

Preferences DataStore accesses and stores data based on **key-value pairs**, without defining a schema (database model) upfront.

## Dependency

```groovy
// build.gradle(Module: *.app)
implementation "androidx.datastore:datastore-preferences:1.0.0"
implementation "androidx.lifecycle:lifecycle-livedata-ktx:2.3.1"
```

## Example of implementation

```kotlin
class SettingsDataStore(ctx: Context) {
	private val IS_LINEAR_LAYOUT_MANAGER = booleanPreferencesKey("is_linear_layout_manager")

	suspend fun saveLayoutToPreferencesStore(isLinearLayoutManager: Boolean, ctx: Context) {
		ctx.dataStore.edit { preferences ->
			preferences[IS_LINEAR_LAYOUT_MANAGER] = isLinearLayoutManager
		}
	}

	val preferenceFlow: Flow<Boolean> = ctx.dataStore.data
		.catch {
			if (it is IOException) {
				it.printStackTrace()
				emit(emptyPreferences())
			} else {
				throw it
			}
		}
		.map { preferences ->
			preferences[IS_LINEAR_LAYOUT_MANAGER] ?: true
		}
}
```

`LAYOUT_PREFERENCES_NAME` is the name of the instantiated Preferences DataStore.

The `DataStore` instance is created using the `preferencesDataStore` delegate. Since you are using Preferences Datastore, you need to pass `Preferences` as a datastore type.

> 💡 Create the DataStore instance at the top level of your Kotlin file once, and access it through this property throughout the rest of your application. This makes it easier to keep your DataStore as a singleton.

Preferences DataStore does not use a predefined schema. It uses corresponding key type functions to define a key for each value that you store in the `DataStore<Preferences>` instance, e.g., to define a key for an `int` value, use [`intPreferencesKey()`](https://developer.android.com/reference/kotlin/androidx/datastore/preferences/core/package-summary#intPreferencesKey), and for a `string` value use [`stringPreferencesKey()`](https://developer.android.com/reference/kotlin/androidx/datastore/preferences/core/package-summary#stringpreferenceskey). In general, these function names are prefixed with the type of data you want to store against the key.

### Editing the values in DataStore

Preferences DataStore provides an `edit()` suspend function that transactionally updates the data in `DataStore`. The function's transform parameter accepts a block of code where you can update the values as needed. All of the code in the transform block is treated as a single transaction.

### Reading from DataStore

Preferences DataStore exposes the data stored in a `Flow<Preferences>` that emits every time a preference has changed. You don't want to expose the entire `Preferences` object, just the `Boolean` value. To do this, we map the `Flow<Preferences>`, and get the `Boolean` value you're interested in.

As DataStore reads and writes data from files, `IOExceptions` may occur when accessing the data, therefore `.catch`.

Since the Datastore is empty on the first run, return `true` by default.

## Example of usage

In `Fragment`:

```kotlin
import androidx.fragment.app.Fragment
import androidx.lifecycle.asLiveData
import androidx.lifecycle.lifecycleScope
import kotlinx.coroutines.launch

class LetterListFragment : Fragment() {
	private var isLinearLayoutManager: Boolean = true

	private lateinit var SettingsDataStore: SettingsDataStore

	// [...]

	override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
		// [...]

		// Initialising
		SettingsDataStore = SettingsDataStore(requireContext())

		// Reading
		SettingsDataStore.preferenceFlow.asLiveData().observe(viewLifecycleOwner, { value ->
			isLinearLayoutManager = value
			chooseLayout()

			activity?.invalidateOptionsMenu()
		})
	}

	override fun onOptionsItemSelected(item: MenuItem): Boolean {
		// [...]

		// Writing
		lifecycleScope.launch {
			SettingsDataStore.saveLayoutToPreferencesStore(
				isLinearLayoutManager,
				requireContext()
			)
		}

		// [...]
	}
}
```

At the end of the `onViewCreated()` function, initialize the new variable and pass in the `requireContext()` to the `SettingsDataStore` constructor.

Writing data to the preference datastore should be performed asynchronously inside a [[knowledge/kotlin/Coroutines|coroutine]]. To perform this inside a fragment, use the [[knowledge/kotlin/LifecycleScope]].
