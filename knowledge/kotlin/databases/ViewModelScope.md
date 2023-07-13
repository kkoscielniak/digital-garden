A `ViewModelScope` is an extension property **defined for each [[knowledge/kotlin/Databases/ViewModel]] in the app**. Any [[knowledge/kotlin/Coroutines|coroutine]] launched in this scope is automatically canceled if the `ViewModel` is cleared.

On Android, you can use a scope to cancel all running coroutines when, for example, the user navigates away from an `Activity` or `Fragment`.

Scopes also allow you to specify a default dispatcher. A dispatcher controls which thread runs a coroutine.

For coroutines started by the UI, it is typically correct to start them on `Dispatchers.Main` which is the main thread on Android. They won't block the main thread while suspended. This saves extra thread switches, but it's possible to switch to another dispatcher if you need to do something fairly complex out of the main thread (e.g. JSON parsing).

## Example

The AndroidX `lifecycle-viewmodel-ktx` library adds a `viewModelScope` as an [[knowledge/kotlin/Extension functions|extension function]] to `ViewModel`s. This scope is bound to `Dispatchers.Main` and will get cancelled once the `ViewModel` is cleared.

```groovy
implementation "androidx.lifecycle:lifecycle-viewmodel-ktx:x.x.x"
```

### Switching from threads to coroutines

```kotlin
private fun updateTaps() {
	// Using Threads:
	//		tapCount++
	//		BACKGROUND.submit {
	//			Thread.sleep(1_000)
	//			_taps.postValue("${tapCount} taps")
	//		}

	// using ViewModelScope:
	viewModelScope.launch {
		tapCount++
		delay(1000) // suspends the coroutine for 1s
		_taps.postValue("$tapCount taps")
	}
}
```

`BACKGROUND ExecutorService` is an examplary implememnation of running in a background thread, not important here.

In the `viewModelScope` based code the default dispatcher of `Dispathers.Main` is used. The `delay` function is a [[knowledge/kotlin/suspend]] function.
