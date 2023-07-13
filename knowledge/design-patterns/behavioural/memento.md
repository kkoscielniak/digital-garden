---
title: Memento
---

We use the _Memento_ pattern when we want to be able to revert the object to one of its previous states, eg:

- the _Undo_ mechanism in the application (e.g. text editor).
- saving the game state and reverting back to it once the player wants to

The Memento pattern has 2 objectives:

- Saving the important data of the key object in the system
- [encapsulation](/knowledge/oop/encapsulation.md) of this key object

## Implementation

```ts
/**
 * The Memento. A state of the object at one point of time
 */
class EditorState {
  private readonly _content: string;
  public get content(): string {
    return this._content;
  }

  constructor(content: string) {
    this._content = content;
  }
}
```

```ts
/**
 * The Caretaker. Maintains the history of the editor
 */
class EditorHistory {
  private _editorStates: EditorState[] = [];

  public push(state: EditorState) {
    console.log(this._editorStates);
    this._editorStates.push(state);
  }

  public pop(): EditorState | undefined {
    return this._editorStates.pop();
  }
}
```

```ts
/**
 * The Originator
 * Handles the Editor _window_ (textarea) and provides its own state
 */
class Editor {
  private _content: string;

  public get content(): string {
    return this._content;
  }

  public set content(value: string) {
    this._content = value;
  }

  public createState(): EditorState {
    return new EditorState(this._content);
  }

  public restoreState(state?: EditorState): void {
    if (state) {
      this.content = state.content;
    }
  }
}
```

```ts
/**
 * index.ts
 * This could be something named _EditorManager_
 */
const editor = new Editor();
const editorHistory = new EditorHistory();

editor.content = "A";
editorHistory.push(editor.createState());

editor.content = "B";
editorHistory.push(editor.createState());

editor.content = "C";
editor.restoreState(editorHistory.pop());
console.log(editor.content); // "B"

editor.restoreState(editorHistory.pop());
console.log(editor.content); // "A"
```

## Advantages/Disadvantages

### Advantages

- keeping the saved state of the object outside of the object
- [encapsulation](/knowledge/oop/encapsulation.md) of the data of that object
- providing the easy to implement way of returning the object to its previous state

### Disadvantages

- saving and restoring data might be time consuming
  - we might consider usage of serialization to remediate this issue
