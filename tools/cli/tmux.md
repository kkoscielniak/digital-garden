---
title: tmux
---

`tmux` allows to create a _session_ that runs seperate from the existing terminal session. It's pretty handy for leaving sessions alive on the SSH server.

```
tmux new -s mysession
```

## Leave the session

**⌃ + B** then **D**

## Rejoin the session

```
tmux attach -t mysession
```

## Resources

- [tmux cheatsheet](http://hyperpolyglot.org/multiplexers)
