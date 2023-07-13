# `React.useContext` hook

`useContext` hook takes the Context as param and returns values from that context. It's a suntax sugar on `<Context.Consumer />`

```js
const { currentMood } = useContext(MoodContext);
```

This is great, because allows us to separate the business logic (taking the value from the context) and rendering; there's no need to nest rendering in any `<Context.Consumer />`. How cool is that!

Instead of this:
![Screenshot 2021-05-31 at 22.05.12](//private/v6-old-obsidian-publish/_assets/screenshot%202021-05-31%20at%2022.05.12.png)

We have this:
![Screenshot 2021-05-31 at 22.05.31](//private/v6-old-obsidian-publish/_assets/screenshot%202021-05-31%20at%2022.05.31.png)

However, this is not possible to replace `<Context.Provider>` yet.
