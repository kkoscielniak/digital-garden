---
title: BetterTouchTool
---

Useful when [[tools/automation/keyboard-maestro/keyboard-maestro|Keyboard Maestro]] does not work.

For instance, I use [[tools/apps/arc|Arc]] which takes precedence over [[Spotify]] when Play/Pause button on [[tools/hardware/macbook|Mac]] is pressed. For situations when I want to play music instead of playing the video in Arc, I've added `◆ + ⏯` ([[tools/automation/karabiner|Hyper Key]]) with this script:

```applescript
using terms from application "Spotify"
	tell application "Spotify" to playpause
end using terms from
```
