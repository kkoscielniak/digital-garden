As opposed to [[knowledge/kotlin/Testing/Local tests]] the Instrumentation Tests run on an actual Android device or emulator.

> 💡 Similarily to unit vs E2E tests

## Android Test Orchestrator

A tool provided by Android JUnit Runner. When you create an Android project, there is a line in the app module `build.gradle` file that specifies the instrumentation runner.

```kotlin
// build.gradle (Module)
defaultConfig {
	testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
}
```

Test Orchestrator allows you to run tests with [[knowledge/kotlin/Testing/Instrumentation]]
