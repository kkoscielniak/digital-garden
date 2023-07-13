## Functional Components Lifecycle

Class components live as long as the class instance lives, so the state is preserved between the subsequent re-renders.

Functional Components live as long as the rendering takes time. **There is no instance**. Once they get mounted, the component function is deleted (it has fulfilled its purpose).

In that sense, functional components are basically the `render` functions of the [class components](/knowledge/react/class-components.md). They live **JUST** during the rendering. The variables are recreated on each render, so it's unable to keep the state, side effects, refs to HTML etc. without using [hooks](/knowledge/react/hooks.md).

- [[knowledge/react/hooks/React.useState]]
- [[knowledge/react/hooks/React.useEffect]]
- [[knowledge/react/hooks/React.useRef]]
- [[knowledge/react/hooks/React.useContext]]
- [[knowledge/react/hooks/React.useReducer]]
- [[knowledge/react/hooks/hook-rules]]
- [custom hooks](/knowledge/react/hooks/custom%20hooks.md)