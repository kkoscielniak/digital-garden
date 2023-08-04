import MarkdownIt from "markdown-it";
import { backlinksMarkdownIt as mdBacklinks } from "./plugins/backlinks/backlinksMarkdownIt";
import { collection } from "./plugins/backlinks";
import fs from "fs";
import matter from "gray-matter";

const md = new MarkdownIt();
md.use(mdBacklinks, { vault: "/" });

export default {
  watch: "**/*.md", // TODO: Fix adding `private/` with fast-glob
  async load(files?: string[]) {
    if (!files) {
      return {
        data: [],
      };
    }

    for await (const file of files) {
      if (!file.endsWith(".md")) {
        continue;
      }

      const src = fs.readFileSync(file, "utf-8");
      const { data: frontmatter } = matter(src);

      await md.render(src, {
        relativePath: file,
        frontmatter,
      });
    }

    return {
      data: Object.fromEntries(collection),
    };
  },
};
