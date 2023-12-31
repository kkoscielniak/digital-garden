import type { PluginWithParams } from "markdown-it";
import { collection } from "./backlinksCollection.js";

export const regexp = /\[{2}\s*(.+?)\s*\]{2}/gi;

const linkMatcher = (cap: RegExpExecArray) => {
  const backlink = cap[1].split("|");
  const path = backlink[0];
  const title = backlink[backlink.length - 1];

  return { path, title };
};

export const backlinksMarkdownIt: PluginWithParams = (md, { vault }): void => {
  md.core.ruler.before("normalize", "backlinks", (state) => {
    // console.log(state);
    let relativePath = state.env.relativePath?.replace(".md", "");
    let selfTitle = state.env.frontmatter?.title;

    state.src = ((src) => {
      let cap: RegExpExecArray | null;
      while ((cap = regexp.exec(src))) {
        const { title, path } = linkMatcher(cap);

        if (selfTitle != undefined && relativePath != undefined) {
          let backlinks = collection.get(path) ?? [];

          // TODO: use set to exclude duplicate backlinks
          let found = false;
          for (const backlink of backlinks) {
            if (backlink.path == relativePath) {
              found = true;
              break;
            }
          }
          if (!found) {
            backlinks.push({
              title: selfTitle,
              path: relativePath,
            });
            collection.set(path, backlinks);
          }
        }

        // console.log(collection);
      }

      return src;
    })(state.src);
  });
};
