---
title: Native Modules (Android)
---

- [[knowledge/react-native/native-modules]]

1. Create native module Java Class in `android/app/src/main/java/com/<your-app-name>/<class-name>.java`:

```java
package com.your-app-name; // replace com.your-app-name with your app’s nameimport com.facebook.react.bridge.NativeModule;import com.facebook.react.bridge.ReactApplicationContext;import com.facebook.react.bridge.ReactContext;import com.facebook.react.bridge.ReactContextBaseJavaModule;import com.facebook.react.bridge.ReactMethod;import java.util.Map;import java.util.HashMap; public class CalendarModule extends ReactContextBaseJavaModule { CalendarModule(ReactApplicationContext context) { super(context); }}
```

2. Implement `getName()` method. It returns the name of the native module as a `String`:

```java
@Override
public String getName() {
	 return "CalendarModule";
}
```

3. Add a method to the native module with `@ReactMethod` annotation:

```java
@ReactMethod
public void createCalendarEvent(String name, String location) {
    // ...
}
```

> You can pass `@ReactMethod(isBlockingSynchronousMethod = true)` to a native method to mark it as a synchronous method. It is not recommended though because of performance penalties. Also, this disables Chrome Debugger.

4. Register the module to a `ReactPackage` by creating new Java Class that implements `ReactPackage` in `android/app/src/main/java/com/<your-app-name>/`:

```java
package com.your-app-name; // replace your-app-name with your app’s name
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class MyAppPackage implements ReactPackage {
	 @Override
	 public List<ViewManager> createViewManagers(ReactApplicationContext reactContext)   {
			 return Collections.emptyList();
	 }

	 @Override
	 public List<NativeModule> createNativeModules(
					 ReactApplicationContext reactContext) {
			 List<NativeModule> modules = new ArrayList<>();

			 modules.add(new CalendarModule(reactContext));

			 return modules;
	 }
}
```

> 💡 It is worth noting that this way of registering native modules initializes all native modules when the application starts, which adds to the startup time.

5. Register the Package (from point 4) to the list of packages returned. Open `android/app/src/main/java/com/your-app-name/MainApplication.java`:

```java
@Override
protected List<ReactPackage> getPackages() {
    @SuppressWarnings("UnnecessaryLocalVariable")
    List<ReactPackage> packages = new PackageList(this).getPackages();
    // below MyAppPackage is added to the list of packages returned
    packages.add(new MyAppPackage());
    return packages;
}
```

6. Import the Native Module:

```js
import { NativeModules } from "react-native";

const { CalendarModule } = NativeModules;
```

> As you iterate on your native module, you will need to do a native rebuild of your application to access your most recent changes from JavaScript. Native counterpart can't be compiled on the fly. Rebuild by using the `npx react-native run-android`.

## Resources

- [React Native Docs](https://reactnative.dev/docs/native-modules-android) - more on the topic of Native Modules.

## Callbacks

first import the `Callback` interface, and then add a new parameter to your native module method of type `Callback`.

> First off, you can only have two callbacks in your function arguments- a successCallback and a failureCallback. In addition, the last argument to a native module method call, if it's a function, is treated as the successCallback, and the second to last argument to a native module method call, if it's a function, is treated as the failure callback.

You can invoke the callback in your Java method, providing whatever data you want to pass to JavaScript. Please note that you can only pass serializable data from native code to JavaScript.

## Promises

When the last parameter of a native module Java method is a Promise, its corresponding JS method will return a JS Promise object.

The JavaScript counterpart of this method returns a Promise. This means you can use the `await`keyword within an async function to call it and wait for its result

## Sending events to JS

The easiest way to do this is to use the `RCTDeviceEventEmitter` which can be obtained from the `ReactContext`

JavaScript modules can then register to receive events by `addListener` on the [NativeEventEmitter](https://github.com/facebook/react-native/blob/master/Libraries/EventEmitter/NativeEventEmitter.js) class.
