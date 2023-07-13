# Native Modules in iOS

- [[knowledge/react-native/native-modules]]

1. Create custom Native Module header (`RCTCalendarModule.h`) and implementation (`RCTCalendarModule.m`) files:

```objectivec
// RCTCalendarModule.h
#import <React/RCTBridgeModule.h>
@interface RCTCalendarModule : NSObject <RCTBridgeModule>
@end
```

In iOS a native module is an Objective-C/Swift class that implements the `RCTBridgeModule` protocol.

> 💡 Since ObjC does not have language-level support for namespaces like Java or C++, convention is to prepend the class name with a substring.

```objectivec
// RCTCalendarModule.m
#import "RCTCalendarModule.h"

@implementation RCTCalendarModule

RCT_EXPORT_MODULE(CalendarModule); // <- "macro" with the name of the module

@end
```

The name of the Native Module is an argument to `RCT_EXPORT_MODULE` macro. This argument **is not a string literal**. (if you do not specify a name, the JavaScript module name will match the Objective-C class name, with any `RCT` or `RK` prefixes removed).

2. Explicitly export a Native Method to JS using `RCT_EXPORT_METHOD` macro.

> 💡 Methods written in the `RCT_EXPORT_METHOD` macro are asynchronous and the return type is therefore always void. In order to pass a result from a `RCT_EXPORT_METHOD` method to JavaScript you can use callbacks or emit events.

```objectivec
RCT_EXPORT_METHOD(createCalendarEvent:(NSString *)name location:(NSString *)location)
{
    // ...
}
```

> You can use `RCTLog` API from `<React/RCTLog.h>` to _consolellog_ the method, check if it's been invoked.

> You can export `RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD`s as well. The methods can only return `nil` or JSON values, like NSNumber, NSString, NSArray, NSDictionary. This is not recommended though, as it has strong performance penalties and disables Chrome Debugger.

3. (optional) Add Callbacks.

Native modules support callbacks to pass data from Obj-C to JS for async methods and to asynchronously execute JS from native part.

More on the topic [here](https://reactnative.dev/docs/native-modules-ios#callbacks).

4. Import the native module

```js
import { NativeModules } from "react-native";

const { CalendarModule } = NativeModules;
```

# Sending events to JS

Signaling events to JS without being invoked directly

1. Update your header class to import `RCTEventEmitter` and subclass `RCTEventEmitter`:

```
//  CalendarModule.h
#import <React/RCTBridgeModule.h>#import <React/RCTEventEmitter.h>
@interface CalendarModule : RCTEventEmitter <RCTBridgeModule>@end
```

2. Subscribe to these events via a new `NativeEventEmitter` instance on JS side.
3. Optimize the workload (e.g. by unsubscribing from upstream notifications or pausing background tasks), you can override `startObserving` and `stopObserving` in your `RCTEventEmitter` subclass).

```
@implementation CalendarManager{ bool hasListeners;} // Will be called when this module's first listener is added.-(void)startObserving { hasListeners = YES; // Set up any upstream listeners or background tasks as necessary} // Will be called when this module's last listener is removed, or on dealloc.-(void)stopObserving { hasListeners = NO; // Remove upstream listeners, stop unnecessary background tasks} - (void)calendarEventReminderReceived:(NSNotification *)notification{ NSString *eventName = notification.userInfo[@"name"]; if (hasListeners) { // Only send events if anyone is listening [self sendEventWithName:@"EventReminder" body:@{@"name": eventName}]; }}
```

Additional topics:

- Threading
- Dependency Injection
- Exporting in swift
  - a bit different, additional configuration is needed, but in general - the class and functions need to be exported properly to the Objective-C runtime (`@objc`)

# Promises

Native modules can also fulfill a promise, which can simplify your JavaScript, especially when using ES2016's `async/await` syntax. When the last parameter of a native module method is a `RCTPromiseResolveBlock` and `RCTPromiseRejectBlock`, its corresponding JS method will return a JS Promise object.
