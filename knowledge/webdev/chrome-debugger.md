---
title: Chrome Debugger
---

## `debugger;` function

- stops the execution of the app
- Opens _Sources_ pane in DevTools
		- the code in Sources pane is from before the Babel transform
		- its based on the source map
- the code executed by the browser **may differ** from the one that we see in Sources pane, as it is the one transformed by Babel
- it's basically a breakpoint

## DevTools buttons

- Resume script execution [`⌘ + \`]
- Step Over [`⌘ + '`]
	- executes the next line of code without getting into the implementation details
- Step Into [`⌘ + ;`]
	- executes the first line of code **inside** the implementation details

## Conditional breakpoints
- break the code only in certain conditions

## Log points

- They're like `console.log` but in DevTools panel. No code needed 👏
	- (MDN)[https://developer.mozilla.org/en-US/docs/Tools/Debugger/Set_a_logpoint#working_with_logpoints]

# Debugger: `watch`

We can watch the variable in the separate panes

## External resources

- [Chrome Debugger's docs](https://developers.google.com/web/tools/chrome-devtools/javascript/reference)
