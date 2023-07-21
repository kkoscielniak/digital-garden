import type { PluginWithParams } from "markdown-it";
import { PageData } from "vitepress";

const wikilinksRegexp = /\[{2}\s*(.+?)\s*\]{2}/gi;

export interface BacklinkPageInfo {
  title: string;
  path: string;
}

export const collection: Map<string, BacklinkPageInfo[]> = new Map();

const linkMatcher = (cap: RegExpExecArray) => {
  const backlink = cap[1].split("|");
  const path = backlink[0];
  const title = backlink[backlink.length - 1];

  return { path, title };
};

const backlinks: PluginWithParams = (md): void => {
  md.core.ruler.before("normalize", "bls", (state) => {
    const relativePath = state.env.relativePath?.replace(".md", "");
    const selfTitle = state.env.frontmatter?.title;

    if (!state.env.frontmatter) {
      return;
    }

    state.env.frontmatter.yourCustomData =
      "Hello, this is custom data from your plugin!";

    ((src) => {
      let cap: RegExpExecArray | null;

      while ((cap = wikilinksRegexp.exec(src))) {
        if (!selfTitle || !relativePath) {
          continue;
        }

        const { title, path } = linkMatcher(cap);

        const backlinks = collection.get(path) ?? [];

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
        }
        collection.set(path, backlinks);
      }
    })(state.src);
  });
};

export default backlinks;

export const getBacklinks = async (pageData: PageData) => {
  const relativePath = `${pageData.relativePath.replace(".md", "")}`;

  if (!collection.has(relativePath)) {
    return [];
  }
  return collection.get(relativePath);
};
