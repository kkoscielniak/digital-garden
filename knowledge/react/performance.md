---
title: Performance optimisation in React
---

# Performance optimisation in [React](/knowledge/react/index.md)
- **minimize the number of updates**
- use [react.Fragment](/knowledge/react/react.fragment.md) to optimize both [virtual-dom](/knowledge/react/virtual-dom.md) and the [real one](/knowledge/webdev/dom.md)
- Virtualize long lists with [react-window](/knowledge/react/react-window.md) (or else)
- [Lazy-load](/knowledge/react/react.lazy().md) the components once they are needed
- use [code splitting](/knowledge/react/code%20splitting.md) to reduce initial load time
- [memoize](/knowledge/react/hooks/usememo.md) the [Pure Components](/knowledge/react/pure-component.md)
- use [key](/knowledge/react/key.md) prop properly
- use [useCallback](/knowledge/react/hooks/usecallback.md) hook to stop unnecessary re-renders 
- use Server-Side Rendering to reduce the Initial Page Load
- optimize Images Loading
	- compress them
	- use appropriate image formats
	- use responsive images
	- lazy load them
	- use CDN if possible
- avoid inline-styling, use pre-processors or CSS-in-JS libs instead
	- optimize CSS with PurgeCSS or PostCSS