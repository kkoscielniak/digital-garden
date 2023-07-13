---
title: Linking libraries
---

Used to link the native components/modules to the React Native app. The native features are exposed as independent static libraries.

## Automatic linking

`npx react-native link` usually does the job. It goes through `dependencies`/`devDependencies` in `package.json` and links the libraries with native dependencies _automagically_.

### iOS

If the iOS project is using CocoaPods (contains `Podfile`) and the library has `podspec` file, `react-native link` will add the library to Podfile.

## Manual linking

### iOS

1. Drag the library's `.xcodeproj` file inside _Libraries_ in Xcode.
2. Go to _Project_ -> _Build Phases_
3. Drag the static library from _Libraries_ -> _library_ -> _Products_ to _Link Binary With Libraries_ section.
4. (optional) Include the path to the library in _Project_ -> _Build Settings_ -> _Header Search Paths_ (non-recursive) - this is needed if you need to call the native parts of the library from the native part of the app that you're developing.

### Android

1. Add dependency path to `settings.gradle`:

```gradle
include ':react-native-ble-manager'
project(':react-native-ble-manager').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-ble-manager/android')
```

2. Add `implementation <library_name>` to `app.build.gradle`:

```gradle
dependencies {
    compile project(':react-native-ble-manager')
}
```

3. Import the native package in `MainApplication.java`:

```java
import it.innove.BleManagerPackage;

public class MainApplication extends Application implements ReactApplication {
		@Override
		protected List<ReactPackage> getPackages() {
				return Arrays.<ReactPackage>asList(
						new MainReactPackage(),
						new BleManagerPackage()
				);
		}
}
```

## Resources

- https://reactnative.dev/docs/linking-libraries-ios
- https://medium.com/@srbkrishnan/react-native-auto-linking-on-android-65a850bb9ed9
