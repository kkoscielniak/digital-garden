---
title: Using fake data in tests
---

It's actually better to generate data for tests than hardcoding it. The data itself is not important, so it doesn't matter if the hardcoded string is `Test title` from the tests standpoint. This bloats the test cases and may hint that the string is important, even if it isn't.

> [!tip] We need to know what we want to _communicate_ with our tests.

Thanks to `test-data-bot` library it's possible to _fake_ the data.

```tsx
import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { build, fake, sequence } from "test-data-bot";
import { savePost as mockSavePost } from "../api";
import { Editor } from "../post-editor";

const postBuilder = build("Post").fields({
  title: fake((f) => f.lorem.words()),
  content: fake((f) => f.lorem.paragraphs().replace(/\r/g, "")),
  tags: fake((f) => [f.lorem.word(), f.lorem.word(), f.lorem.word()]),
});

const userBuilder = build("User").fields({
  id: sequence((s) => `user-${s}`),
});

test("renders a form with title, content, tags, and a submit button", async () => {
  /* [...] */
  const fakeUser = userBuilder();
  const fakePost = postBuilder();
  render(<Editor user={fakeUser} />);

  screen.getByLabelText(/title/i).value = fakePost.title;
  screen.getByLabelText(/content/i).value = fakePost.content;
  screen.getByLabelText(/tags/i).value = fakePost.tags.join(", ");
  const submitButton = screen.getByText(/submit/i);
  userEvent.click(submitButton);

  expect(mockSavePost).toHaveBeenCalledWith({
    ...fakePost,
    date: expect.any(String),
    authorId: fakeUser.id,
  });
  /* [...] */
});
```
