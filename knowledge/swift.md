---
title: Swift
---

4 layers: From the user to the device

- Cocoa Touch
  - Multitouch, Alerts, core motion, View hierarchy, Localisation, Controls, Image Picker, Camera, Map Kit, Web View, Alerts
- Media
  - Core Audio, Open AL, Audio mixing etc, Video Playback etc. animations, 3d etc. Photos
- Core Services
  - [[Object-Oriented]] layer of acessing the Core OS layer
  - Collections, Networking, file access, SQLite, URL, Preferences, Threading, Net services, Location, Address book
- Core OS
  - OSX Kernel, power managerment, keychain, Bonjour, Security, Sockets, FS, BSD , Mach 3
  - In `C` programming language

In Swift frameworks are _collections of objects_ (UIKit, Map Kit etc.)

Design strategy -> [[MVC]]

You can mix Swift and Obj-c as much as you wish, they are interoperable, even in the scope of one App.

`Info.plist` needs to be in the root level of the project (for easiness).

UI is build in XCode graphically. By dragging and dropping. In `.storyboard` files.

Interface Builder.

- `alt` + mouse wheel => Zoom

Document Outline.

Two circles button -> Assistant Editor (storyboard + kod do storyboardu).
Outlet-> ?
Action -> Method. When the button is pressed (action), call a method.

- Argument: Sender argument (?)
- Type: UIButtont !!!! ⚠️

> Use CTRL to drag the button to the code (creating an action)

## names if the parameters

Plural.

`@IBAction touchCard(_ sender: UIButton) -> Int {}`

- Every argument has a name that you include when yoiu call the method
- It has two names. External name that the caller uses and the inside name that we use inside the implementation
- there are some good practices to learn yet.

Single names are alowed (same name for the caller and for the implemetation).
`_` - no argument. But we almost never do it. It's back from Objective-C

## XCode Behaviors

- automation of showing the debugger and else. Worth investigation.

`UIControlState` - what's that? Hold down `Option` and mouse, click on thing and the docs will be there. Noise.

Always read the `Overview` part in the docs.

Color literal => color picker in XCode XD CO ZA DZBANERIA

## `\(string)`

Copy -paste in intefrace builder copies and pastes the actions/outlets. **Right-click in Interface Builder** allows to _disconnect_ the outlets.

## Instance variable? -- class field?

Or _properties_.
`var name: Type`

The instance variables need to have value or be initialised in [[private/v1/Coding/Swift/_initialiser]].

Swift is **extremely** typed language. It has type for "unknown" but for the sake of maintaining compatibility.

It also has a strong types [[inference]]. It'll guess stuff. By clicking `option` and variable we can see what type Swift thinks the variable is. Most of the time, you'll be using typing in function arguments.

> Every time you're copying and pasting the code - you're doing it wrong.

`@IBOutlet` -> instance variable/property
`@IBAction` -> method
Outlet collection -> array of buttons/ui elements :D

`!` doesn't be initialised (or `weak`), I don't know yet.

[[private/v1/Coding/Swift/Property observer]]

`Cmd+click` -> Quick actions (rename variable itp.)

You can also drag from the View COntroller icon to the UI element to connect an element to an action/outlet/colloection of outlets.

`let` is constant in Swift // `let variable equal 1`
`var `is variable

Triangle fixes the errors in the code. Simple as that.

## Optional

`Int?`, means that the
Optional Int is an entirely different type than Int in Swift. In returned value it means the function _may_ return _something_.

Optional has only two states: **set** or **not set**. For each case in an enumeration you can have associated data. Set state means the Int is associated. Not set is `nil`.

`nil` => not set value of an Optional.
Putting the `!` means: assume the value is set and forcefully try to get the value (unwrap the value). May cause crashes.

You can do such construct to unwrap:

```swift
if let cardNumber = cardButtons.index(of: sender) {
	// ...cardNumber
} else {
	// print...
}
```

## Property observer

Any property can be observed and call `didSet {}` fn once the property has been changed

```swift
var flipCount = 0 {
	didSet {
		flipCountLabel.text = "Flips: \(flipCount)"
	}
}
```

`didSet` is observing changes of `flipCount`. Noice.

## Resources

- [Developing iOS Apps with Swift](https://itunes.apple.com/pk/course/developing-ios-11-apps-with-swift/id1309275316)
