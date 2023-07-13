To test [[knowledge/kotlin/Coroutines]] running on `Dispatchers.Main` you need [kotlinx-coroutines-test](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-test/) library.

> 💡 At the time of writing the `kotlinx-coroutines-test` library is marked as experimental. May have breaking changes.

## Example

```kotlin
package com.example.android.kotlincoroutines.main

/* ...imports */

class MainViewModelTest {
	@get:Rule
	val coroutineScope = MainCoroutineScopeRule()

	@get:Rule
	val instantTaskExecutorRule = InstantTaskExecutorRule()

	lateinit var subject: MainViewModel

	@Before
	fun setup() {
		subject = MainViewModel(
			TitleRepository(
				MainNetworkFake("OK"),
				TitleDaoFake("initial")
			)
		)
	}

	@Test
	fun whenMainClicked_updatesTaps() {
		subject.onMainViewClicked()
		Truth.assertThat(subject.taps.getValueForTest()).isEqualTo("0 taps")
		coroutineScope.advanceTimeBy(1000)
		Truth.assertThat(subject.taps.getValueForTest()).isEqualTo("1 taps")
	}
}
```

Two [[knowledge/kotlin/Testing/Rule|rules]] are used to allow us to test MainViewModel in an off-device test.

In the `setup` method, a new instance of `MainViewModel` is created using testing fakes of network and database.

For this test, the fakes are only needed to satisfy the dependencies of `MainViewModel`.

By calling `onMainViewClicked`, the [[knowledge/kotlin/Coroutines|coroutine]] will be launched. This test checks that the _taps text_ stays _"0 taps"_ right after `onMainViewClicked` is called, then 1 second later it gets updated to _"1 taps"_.

This test uses **virtual-time** to control the execution of the coroutine launched by `onMainViewClicked` thanks to the [[knowledge/kotlin/Testing/Rule#Different kinds of rules|MainCoroutineScopeRule]]. Here we're calling `advanceTimeBy(1_000)` which will cause the main dispatcher to immediately execute coroutines that are scheduled to resume 1 second later.

This test is fully deterministic. Because it has full control over the execution of coroutines launched on the `Dispatchers.Main` it doesn't have to wait one second for the value to be set.
