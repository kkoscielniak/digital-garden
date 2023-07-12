---
title: Arc Browser
---

# Arc Browser

Best browser in the world. Made by [The Browser Company](https://thebrowser.company/)

## Best parts

- Vertical tabs
  - I use [UltraWide display](/Tools/hardware/index.md) that makes using Arc even more convenient
- Spaces <3
  - I use each space for different areas of my life (Current Project, Current [[experiments/ideas|pet-project]])
- Automated tabs archiving
  - It closes unvisited tabs automatically (for me: after 7 days)
  - helps me to manage my [[adhd|ADHD]] since I open dozens of tabs daily
- Has a mobile app!
  - It's rather simple so occasionally I still use Safari
  - Still can't be set as a default one on iOS

## Fix Arc Browser for `yabai`

With default [[tools/apps/yabai|yabai]] settings some issues may occur:

- Starting _Picture In Picture_ makes `yabai` work in unpredictable ways
- Some windows (_Little Arc_, extensions) are rendered in the background

To make Arc working properly you need to add this command to `yabairc`:

```sh
yabai -m rule --add subrole="^AXSystemDialog$" manage=off mouse_follows_focus=off
```

## Fix Arc Browser for Keyboard Maestro

By default [[tools/apps/keyboard-maestro|Keyboard Maestro]] does not recognise Arc Browser for browser-related actions. This can be fixed with:

```sh
defaults write com.stairways.keyboardmaestro.engine AppleScriptGoogleChromeBundleID -string "company.thebrowser.Browser"
defaults write com.stairways.keyboardmaestro.engine BrowserGoogleChromeName -string "Arc Browser"
```

## Arc Browser and AppleScript

The Browser Company released basic AppleScript support for Arc, that can be used in [Keyboard Maestro](tools/apps/keyboard-maestro.md) macros:

```applescript
set KM_URL to ""

tell application "Arc"
	set currentURL to URL of active tab of window 1
	tell application "Keyboard Maestro Engine"
		setvariable "KM_URL" to currentURL
	end tell
end tell
```
